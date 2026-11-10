import { NextResponse } from "next/server";
import { MetadataRoute } from "next";
import { LanguageCodes, type TextLanguage } from "@fellesdatakatalog/types";
import { i18n } from "@fdk-frontend/localization";
import { getAllDatasets, getAllServices, searchEntitiesByPath } from "@fdk-frontend/data-access/server";
import { readdir, stat } from "fs/promises";
import { join } from "path";
import { getSlug } from "@fdk-frontend/utils";
import { type Profile } from "@fdk-frontend/types";
import { type Site, getSite } from "../../utils/site";

export const dynamic = "force-dynamic";

const SITEMAP_CACHE_DURATION = 5 * 60 * 1000;
const TRANSPORT_SEARCH_PROFILE = "TRANSPORT";
const TRANSPORT_CONTENT_ROOT = "om-transportportal";

type SitemapCacheEntry = {
  sitemap: string;
  timestamp: number;
};

// Separate cache per site so one host cannot serve the other's sitemap.
const SITEMAP_CACHE = new Map<Profile, SitemapCacheEntry>();

const readCachedSitemap = (profile: Profile, now: number): SitemapCacheEntry | undefined => {
  const entry = SITEMAP_CACHE.get(profile);
  if (!entry || now - entry.timestamp >= SITEMAP_CACHE_DURATION) return undefined;
  return entry;
};

const storeSitemap = (profile: Profile, sitemap: string): SitemapCacheEntry => {
  const now = Date.now();
  const current = readCachedSitemap(profile, now);
  if (current) return current;

  const entry = { sitemap, timestamp: now };
  SITEMAP_CACHE.set(profile, entry);
  return entry;
};

// Function to fetch and parse specification links
const fetchSpecificationLinks = async (baseUrl: string): Promise<MetadataRoute.Sitemap> => {
  const specificationPages: MetadataRoute.Sitemap = [];

  try {
    const fdkBaseUri = process.env.FDK_BASE_URI;
    if (!fdkBaseUri) {
      console.warn("FDK_BASE_URI not configured, skipping specification links");
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
        changeFrequency: "monthly" as const,
        priority: 0.5,
      });
    }

    console.log(`Added ${specificationPages.length} specification pages to sitemap`);
  } catch (error) {
    console.error("Error fetching specification links:", error);
  }

  return specificationPages;
};

// Utility function to recursively scan content directories
const scanContentDirectory = async (dirPath: string, basePath = ""): Promise<string[]> => {
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
const generateContentPages = async (baseUrl: string, roots?: readonly string[]): Promise<MetadataRoute.Sitemap> => {
  const contentDir = join(process.cwd(), "public/content");
  const pages: MetadataRoute.Sitemap = [];

  try {
    // Get all content paths
    const contentPaths = (await scanContentDirectory(contentDir)).filter((path) =>
      roots ? roots.some((root) => path === root || path.startsWith(`${root}/`)) : true,
    );

    // Define priority mappings for different content types
    const priorityMap: Record<string, number> = {
      about: 0.6,
      contact: 0.5,
      docs: 0.7,
      technical: 0.6,
    };

    // Generate entries for each path and locale
    for (const path of contentPaths) {
      const pathParts = path.split("/");
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
          changeFrequency: "weekly" as const,
          priority,
        });
      }
    }
  } catch (error) {
    console.error("Error generating content pages:", error);
  }

  return pages;
};

const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === "object" && value !== null;

const readLocalizedTitle = (value: unknown): string | Partial<TextLanguage> | undefined => {
  if (typeof value === "string") return value;
  if (!isRecord(value)) return undefined;

  const title: Partial<TextLanguage> = {};
  for (const code of Object.values(LanguageCodes)) {
    if (!code) continue;
    const entry = value[code];
    if (typeof entry === "string") title[code] = entry;
  }

  return Object.keys(title).length > 0 ? title : undefined;
};

type SitemapDataset = {
  id: string;
  modified?: string;
  title?: string | Partial<TextLanguage>;
};

const readDatasetPage = (value: unknown): { hits: SitemapDataset[]; totalPages: number } => {
  if (!isRecord(value)) return { hits: [], totalPages: 0 };

  const hits = Array.isArray(value.hits)
    ? value.hits.flatMap((hit): SitemapDataset[] => {
        if (!isRecord(hit) || typeof hit.id !== "string") return [];
        return [
          {
            id: hit.id,
            modified: typeof hit.modified === "string" ? hit.modified : undefined,
            title: readLocalizedTitle(hit.title),
          },
        ];
      })
    : [];

  const totalPages = isRecord(value.page) && typeof value.page.totalPages === "number" ? value.page.totalPages : 0;
  return { hits, totalPages };
};

const fetchTransportDatasets = async (): Promise<SitemapDataset[]> => {
  const size = 1000;
  const datasets: SitemapDataset[] = [];
  const first = readDatasetPage(
    await searchEntitiesByPath("datasets", {
      pagination: { size, page: 0 },
      profile: TRANSPORT_SEARCH_PROFILE,
    }),
  );
  datasets.push(...first.hits);

  for (let page = 1; page < first.totalPages; page++) {
    try {
      // eslint-disable-next-line no-await-in-loop
      const pageResult = await searchEntitiesByPath("datasets", {
        pagination: { size, page },
        profile: TRANSPORT_SEARCH_PROFILE,
      });
      datasets.push(...readDatasetPage(pageResult).hits);
    } catch (error) {
      console.error(`Failed to fetch transport dataset page ${page}:`, error);
    }
  }

  return datasets;
};

const localizedPage = (
  baseUrl: string,
  path: string,
  changeFrequency: "daily" | "weekly",
  priority: number,
): MetadataRoute.Sitemap =>
  i18n.locales.map((locale) => ({
    url: `${baseUrl}/${locale.code}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));

const generateTransportportalSitemapEntries = async (baseUrl: string): Promise<MetadataRoute.Sitemap> => {
  const datasets = await fetchTransportDatasets();
  const contentPages = await generateContentPages(baseUrl, [TRANSPORT_CONTENT_ROOT]);
  const datasetPages = datasets.flatMap((dataset) => {
    const lastModified = dataset.modified ? new Date(dataset.modified) : new Date();
    return i18n.locales.map((locale) => ({
      url: `${baseUrl}/${locale.code}/datasets/${dataset.id}/${getSlug(dataset, locale.code)}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));
  });

  return [
    ...localizedPage(baseUrl, "", "daily", 1),
    ...localizedPage(baseUrl, "/search", "daily", 0.8),
    ...contentPages,
    ...datasetPages,
  ];
};

// Internal function to generate sitemap entries
const generateSitemapEntries = async (site: Site): Promise<MetadataRoute.Sitemap> => {
  const baseUrl = site.profile === "transportportal" ? site.origin : process.env.NEXT_PUBLIC_BASE_URL || site.origin;

  if (site.profile === "transportportal") {
    return generateTransportportalSitemapEntries(baseUrl);
  }

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
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/en`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/nn`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },

    // Dataset pages for all locales
    {
      url: `${baseUrl}/nb/datasets`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/en/datasets`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/nn/datasets`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },

    // Data hunter pages for all locales
    {
      url: `${baseUrl}/nb/data-hunter`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/en/data-hunter`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/nn/data-hunter`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },

    // Legacy pages
    {
      url: `${baseUrl}/search-all`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/dataservices`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/concepts`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/informationmodels`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/public-services-and-events`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/organizations`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/reports`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/sparql`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/publishing`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/publishing/service-messages`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
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
        changeFrequency: "weekly" as const,
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
        changeFrequency: "weekly" as const,
        priority: 0.6,
      };
    });
  });

  return [...coreStaticPages, ...contentPages, ...specificationPages, ...datasetPages, ...servicePages];
};

// Export the sitemap generation function for use in route handler
const generateSitemap = async (site: Site): Promise<string> => {
  const sitemapEntries = await generateSitemapEntries(site);

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
  .join("\n")}
</urlset>`;

  return xml;
};

const sitemapResponse = (sitemap: string, timestamp: number) =>
  new NextResponse(sitemap, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=300, s-maxage=600",
      ETag: `sitemap-${timestamp}`,
    },
  });

export const GET = async () => {
  const site = await getSite();
  const now = Date.now();
  const cached = readCachedSitemap(site.profile, now);

  if (cached) {
    return sitemapResponse(cached.sitemap, cached.timestamp);
  }

  try {
    const sitemap = await generateSitemap(site);
    const stored = storeSitemap(site.profile, sitemap);
    if (stored.sitemap === sitemap) {
      console.log(`Sitemap cache updated for ${site.profile}`);
    }

    return sitemapResponse(stored.sitemap, stored.timestamp);
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return new NextResponse("Error generating sitemap", { status: 500 });
  }
};
