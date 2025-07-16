import { NextRequest, NextResponse } from 'next/server';
import { MetadataRoute } from 'next';
import { i18n } from '@fdk-frontend/dictionaries';
import { getAllDatasets } from '@fdk-frontend/data-access/server';
import { readdir, stat } from 'fs/promises';
import { join } from 'path';
import { getDatasetSlug } from '@fdk-frontend/utils';

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

    // Fetch all datasets with pagination - using a more efficient approach
    const allDatasets: any[] = [];
    const size = 1000;

    // First, get the first page to determine total count
    const firstPageResponse = await getAllDatasets(1, size);
    const totalPages = firstPageResponse.page.totalPages || 0;

    // Add first page results
    allDatasets.push(...(firstPageResponse.hits || []));

    // Fetch remaining pages concurrently (if more than 1 page)
    if (totalPages > 1) {
        const remainingPages = Array.from({ length: totalPages - 1 }, (_, i) => i + 2);
        const pagePromises = remainingPages.map((page) => getAllDatasets(page, size));
        const pageResults = await Promise.all(pagePromises);

        pageResults.forEach((result) => {
            allDatasets.push(...(result.hits || []));
        });
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

    // Generate dataset pages for all supported locales
    const datasetPages = allDatasets.flatMap((dataset: any) => {
        const lastModified = dataset.modified ? new Date(dataset.modified) : new Date();
        return i18n.locales.map((locale) => {
            const slug = getDatasetSlug(dataset, locale.code);
            return {
                url: `${baseUrl}/${locale.code}/datasets/${dataset.id}/${slug}`,
                lastModified,
                changeFrequency: 'weekly' as const,
                priority: 0.6,
            };
        });
    });

    return [...coreStaticPages, ...contentPages, ...datasetPages];
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
