import { NextRequest, NextResponse } from 'next/server';
import { MetadataRoute } from 'next';
import { i18n } from '@fdk-frontend/localization';
import { getAllDatasets, getAllServices } from '@fdk-frontend/data-access/server';
import { readdir, stat } from 'fs/promises';
import { join } from 'path';
import { getSlug } from '@fdk-frontend/utils';

export const dynamic = 'force-dynamic';

// Atomic cache for sitemap
const SITEMAP_CACHE = {
    sitemap: null as string | null,
    timestamp: 0,
    duration: 5 * 60 * 1000,
};

// Atomic update function
const atomicUpdateSitemapCache = (newSitemap: string): boolean => {
    const now = Date.now();

    // Atomic check and update
    if (!SITEMAP_CACHE.sitemap || now - SITEMAP_CACHE.timestamp >= SITEMAP_CACHE.duration) {
        SITEMAP_CACHE.sitemap = newSitemap;
        SITEMAP_CACHE.timestamp = now;
        return true; // Updated
    }

    return false; // Not updated
};

// Function to fetch and parse specification links
const fetchSpecificationLinks = async (baseUrl: string): Promise<MetadataRoute.Sitemap> => {
    const specificationPages: MetadataRoute.Sitemap = [];

    try {
        const fdkBaseUri = process.env.FDK_BASE_URI;
        if (!fdkBaseUri) {
            console.warn('FDK_BASE_URI not configured, skipping specification links');
            return specificationPages;
        }

        const specificationUrl = `${fdkBaseUri}/specification`;
        const response = await fetch(specificationUrl);

        if (!response.ok) {
            console.warn(`Failed to fetch specification page: ${response.status}`);
            return specificationPages;
        }

        const html = await response.text();

        // Parse the HTML to extract links from the table
        // Using regex to extract href attributes from anchor tags in table rows
        const linkRegex = /<a href="specification\/([^"]+)">([^<]+)<\/a>/g;
        let match;

        while ((match = linkRegex.exec(html)) !== null) {
            const [, path] = match;
            const fullPath = `specification/${path}`;

            // Add entry at root level without locale prefix
            specificationPages.push({
                url: `${baseUrl}/${fullPath}`,
                lastModified: new Date(),
                changeFrequency: 'monthly' as const,
                priority: 0.5,
            });
        }

        console.log(`Added ${specificationPages.length} specification pages to sitemap`);
    } catch (error) {
        console.error('Error fetching specification links:', error);
    }

    return specificationPages;
};

// Utility function to recursively scan content directories
const scanContentDirectory = async (dirPath: string, basePath = ''): Promise<string[]> => {
    const paths: string[] = [];

    try {
        const items = await readdir(dirPath);

        // Process all items concurrently
        const itemPromises = items.map(async (item) => {
            const fullPath = join(dirPath, item);
            const relativePath = basePath ? `${basePath}/${item}` : item;
            const stats = await stat(fullPath);

            if (stats.isDirectory()) {
                // Add the directory path itself
                const directoryPaths = [relativePath];

                // Recursively scan subdirectories
                const subPaths = await scanContentDirectory(fullPath, relativePath);
                directoryPaths.push(...subPaths);

                return directoryPaths;
            }
            // Skip .mdx files - only include directory paths
            return [];
        });

        // Wait for all items to be processed concurrently
        const results = await Promise.all(itemPromises);

        // Flatten the results
        results.forEach((pathsArray) => {
            paths.push(...pathsArray);
        });
    } catch (error) {
        console.warn(`Could not read directory ${dirPath}:`, error);
    }

    return paths;
};

// Generate sitemap entries for content pages
const generateContentPages = async (baseUrl: string): Promise<MetadataRoute.Sitemap> => {
    const contentDir = join(process.cwd(), 'public/content');
    const pages: MetadataRoute.Sitemap = [];

    try {
        // Get all content paths
        const contentPaths = await scanContentDirectory(contentDir);

        // Define priority mappings for different content types
        const priorityMap: Record<string, number> = {
            about: 0.6,
            contact: 0.5,
            catalogs: 0.8,
            docs: 0.7,
            technical: 0.6,
        };

        // Generate entries for each path and locale
        for (const path of contentPaths) {
            const pathParts = path.split('/');
            const mainSection = pathParts[0];

            // Determine priority based on path depth and content type
            let priority = 0.5; // Default for subpages
            if (pathParts.length === 1) {
                // Main section pages
                priority = priorityMap[mainSection] || 0.6;
            } else if (pathParts.length === 2) {
                // First level subpages
                priority = 0.5;
            } else if (pathParts.length === 3) {
                // Second level subpages
                priority = 0.4;
            } else {
                // Deep subpages
                priority = 0.3;
            }

            // Generate entries for all locales
            for (const locale of i18n.locales) {
                pages.push({
                    url: `${baseUrl}/${locale.code}/${path}`,
                    lastModified: new Date(),
                    changeFrequency: 'weekly' as const,
                    priority,
                });
            }
        }
    } catch (error) {
        console.error('Error generating content pages:', error);
    }

    return pages;
};

// Internal function to generate sitemap entries
const generateSitemapEntries = async (): Promise<MetadataRoute.Sitemap> => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://data.norge.no';

    // Fetch all datasets and services with pagination - using a more efficient approach
    const allDatasets: any[] = [];
    const allServices: any[] = [];
    const size = 1000;

    // First, get the first page (page 0) to determine total count
    const [datasets, services] = await Promise.all([getAllDatasets(0, size), getAllServices(0, size)]);
    const datasetsTotalPages = datasets.page.totalPages || 0;
    const servicesTotalPages = services.page.totalPages || 0;

    // Add first page results
    allDatasets.push(...(datasets.hits || []));
    allServices.push(...(services.hits || []));

    // Process remaining pages sequentially
    if (datasetsTotalPages > 1) {
        for (let page = 1; page < datasetsTotalPages; page++) {
            try {
                // eslint-disable-next-line no-await-in-loop
                const result = await getAllDatasets(page, size);
                allDatasets.push(...(result.hits || []));
                console.log(`Processed dataset page ${page}/${datasetsTotalPages - 1}`);
            } catch (error) {
                console.error(`Failed to fetch page ${page}:`, error);
                // Continue with other pages
            }
        }
    }

    if (servicesTotalPages > 1) {
        for (let page = 1; page < servicesTotalPages; page++) {
            try {
                // eslint-disable-next-line no-await-in-loop
                const result = await getAllServices(page, size);
                allServices.push(...(result.hits || []));
                console.log(`Processed service page ${page}/${servicesTotalPages - 1}`);
            } catch (error) {
                console.error(`Failed to fetch page ${page}:`, error);
                // Continue with other pages
            }
        }
    }

    // Core static pages (not in content directory)
    const coreStaticPages = [
        // Home pages for all locales
        {
            url: `${baseUrl}/nb`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 1,
        },
        {
            url: `${baseUrl}/en`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 1,
        },
        {
            url: `${baseUrl}/nn`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 1,
        },

        // Dataset pages for all locales
        {
            url: `${baseUrl}/nb/datasets`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/en/datasets`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/nn/datasets`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 0.9,
        },

        // Data hunter pages for all locales
        {
            url: `${baseUrl}/nb/data-hunter`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.7,
        },
        {
            url: `${baseUrl}/en/data-hunter`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.7,
        },
        {
            url: `${baseUrl}/nn/data-hunter`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.7,
        },

        // Legacy pages
        {
            url: `${baseUrl}/search-all`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/dataservices`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/concepts`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/informationmodels`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/public-services-and-events`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/organizations`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/reports`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 0.6,
        },
        {
            url: `${baseUrl}/sparql`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.6,
        },
        {
            url: `${baseUrl}/publishing`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.6,
        },
        {
            url: `${baseUrl}/publishing/terms-of-use`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.6,
        },
        {
            url: `${baseUrl}/publishing/service-messages`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 0.5,
        },
    ];

    // Generate content pages dynamically
    const contentPages = await generateContentPages(baseUrl);

    // Fetch specification pages
    const specificationPages = await fetchSpecificationLinks(baseUrl);

    // Generate dataset pages for all supported locales
    const datasetPages = allDatasets.flatMap((dataset: any) => {
        const lastModified = dataset.modified ? new Date(dataset.modified) : new Date();
        return i18n.locales.map((locale) => {
            const slug = getSlug(dataset, locale.code);
            return {
                url: `${baseUrl}/${locale.code}/datasets/${dataset.id}/${slug}`,
                lastModified,
                changeFrequency: 'weekly' as const,
                priority: 0.6,
            };
        });
    });

    // Generate service pages for all supported locales
    const servicePages = allServices.flatMap((service: any) => {
        const lastModified = service.harvest?.modified ? new Date(service.harvest.modified) : new Date();
        return i18n.locales.map((locale) => {
            const slug = getSlug(service, locale.code);
            return {
                url: `${baseUrl}/${locale.code}/services/${service.id}/${slug}`,
                lastModified,
                changeFrequency: 'weekly' as const,
                priority: 0.6,
            };
        });
    });

    return [...coreStaticPages, ...contentPages, ...specificationPages, ...datasetPages, ...servicePages];
};

// Export the sitemap generation function for use in route handler
const generateSitemap = async (): Promise<string> => {
    const sitemapEntries = await generateSitemapEntries();

    // Convert to XML format
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries
    .map((entry) => {
        const lastmod = entry.lastModified
            ? entry.lastModified instanceof Date
                ? entry.lastModified.toISOString()
                : new Date(entry.lastModified).toISOString()
            : new Date().toISOString();
        return `  <url>
    <loc>${entry.url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${entry.changeFrequency}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`;
    })
    .join('\n')}
</urlset>`;

    return xml;
};

export const GET = async (request: NextRequest) => {
    const now = Date.now();

    // Return cached version if still valid
    if (SITEMAP_CACHE.sitemap && now - SITEMAP_CACHE.timestamp < SITEMAP_CACHE.duration) {
        return new NextResponse(SITEMAP_CACHE.sitemap, {
            status: 200,
            headers: {
                'Content-Type': 'application/xml',
                'Cache-Control': 'public, max-age=300, s-maxage=600',
                ETag: `sitemap-${SITEMAP_CACHE.timestamp}`,
            },
        });
    }

    try {
        // Generate fresh sitemap
        const sitemap = await generateSitemap();

        // Atomic update
        const wasUpdated = atomicUpdateSitemapCache(sitemap);
        if (wasUpdated) {
            console.log('Sitemap cache updated');
        }

        return new NextResponse(sitemap, {
            status: 200,
            headers: {
                'Content-Type': 'application/xml',
                'Cache-Control': 'public, max-age=300, s-maxage=600',
                ETag: `sitemap-${SITEMAP_CACHE.timestamp}`,
            },
        });
    } catch (error) {
        console.error('Error generating sitemap:', error);
        return new NextResponse('Error generating sitemap', { status: 500 });
    }
};
