import { test, expect } from '../fixtures/basePage';

// Declare process for TypeScript
declare const process: {
    env: {
        E2E_DATASET_ID?: string;
    };
};

// Helper function to navigate to dataset page with error handling
const navigateToDataset = async (page: any, datasetId: string): Promise<boolean> => {
    const response = await page.goto(`/nb/datasets/${datasetId}`);

    // Skip test if dataset doesn't exist (404)
    if (response?.status() === 404) {
        test.skip(true, `Dataset ${datasetId} not found, skipping test`);
        return false;
    }

    return true;
};

// Helper function to fetch sitemap
const fetchSitemap = async (page: any): Promise<{ response: any; content: string }> => {
    const response = await page.goto('/sitemap.xml');
    const content = await response?.text();

    return { response, content };
};

test.describe('SEO Tests', () => {
    test.describe('robots.txt', () => {
        test('should be accessible and contain correct directives', async ({ page }) => {
            const response = await page.goto('/robots.txt');
            expect(response?.status()).toBe(200);

            const content = await response?.text();
            expect(content).toContain('User-agent: *');
            expect(content).toContain('Host: https://data.norge.no');
            expect(content).toContain('Sitemap: https://data.norge.no/sitemap.xml');
            expect(content).toContain('Disallow: /api/');
            expect(content).toContain('Disallow: /_next/');
        });

        test('should disallow crawling by default and only allow on correct domain', async ({ page }) => {
            const response = await page.goto('/robots.txt');
            const content = await response?.text();

            // Should have default disallow
            expect(content).toContain('Disallow: /');

            // Should specify correct host
            expect(content).toContain('Host: https://data.norge.no');
        });
    });

    test.describe('sitemap.xml', () => {
        test('should be accessible and contain valid XML structure', async ({ page }) => {
            const response = await page.goto('/sitemap.xml');
            expect(response?.status()).toBe(200);

            const content = await response?.text();
            expect(content).toContain('<?xml version="1.0" encoding="UTF-8"?>');
            expect(content).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
            expect(content).toContain('</urlset>');
        });

        test('should contain static pages for all locales', async ({ page }) => {
            const { content } = await fetchSitemap(page);

            // Check for home pages in all locales
            expect(content).toContain('<loc>https://data.norge.no/nb</loc>');
            expect(content).toContain('<loc>https://data.norge.no/en</loc>');
            expect(content).toContain('<loc>https://data.norge.no/nn</loc>');

            // Check for dataset pages in all locales
            expect(content).toContain('<loc>https://data.norge.no/nb/datasets</loc>');
            expect(content).toContain('<loc>https://data.norge.no/en/datasets</loc>');
            expect(content).toContain('<loc>https://data.norge.no/nn/datasets</loc>');

            // Check for about pages in all locales
            expect(content).toContain('<loc>https://data.norge.no/nb/about</loc>');
            expect(content).toContain('<loc>https://data.norge.no/en/about</loc>');
            expect(content).toContain('<loc>https://data.norge.no/nn/about</loc>');

            // Check for contact pages in all locales
            expect(content).toContain('<loc>https://data.norge.no/nb/contact</loc>');
            expect(content).toContain('<loc>https://data.norge.no/en/contact</loc>');
            expect(content).toContain('<loc>https://data.norge.no/nn/contact</loc>');

            // Check for catalogs pages in all locales
            expect(content).toContain('<loc>https://data.norge.no/nb/catalogs</loc>');
            expect(content).toContain('<loc>https://data.norge.no/en/catalogs</loc>');
            expect(content).toContain('<loc>https://data.norge.no/nn/catalogs</loc>');

            // Check for docs pages in all locales
            expect(content).toContain('<loc>https://data.norge.no/nb/docs</loc>');
            expect(content).toContain('<loc>https://data.norge.no/en/docs</loc>');
            expect(content).toContain('<loc>https://data.norge.no/nn/docs</loc>');

            // Check for technical pages in all locales
            expect(content).toContain('<loc>https://data.norge.no/nb/technical</loc>');
            expect(content).toContain('<loc>https://data.norge.no/en/technical</loc>');
            expect(content).toContain('<loc>https://data.norge.no/nn/technical</loc>');

            // Check for data-hunter pages in all locales
            expect(content).toContain('<loc>https://data.norge.no/nb/data-hunter</loc>');
            expect(content).toContain('<loc>https://data.norge.no/en/data-hunter</loc>');
            expect(content).toContain('<loc>https://data.norge.no/nn/data-hunter</loc>');
        });

        test('should contain dataset pages for all locales', async ({ page }) => {
            const { content } = await fetchSitemap(page);

            // Should contain dataset URLs for all locales
            expect(content).toMatch(/https:\/\/data\.norge\.no\/nb\/datasets\/[^<]+/);
            expect(content).toMatch(/https:\/\/data\.norge\.no\/en\/datasets\/[^<]+/);
            expect(content).toMatch(/https:\/\/data\.norge\.no\/nn\/datasets\/[^<]+/);
        });

        test('should have proper XML structure with required elements', async ({ page }) => {
            const { content } = await fetchSitemap(page);
            expect(content).toBeTruthy();

            // Check for proper URL structure
            const urlMatches = content!.match(/<url>/g);
            const locMatches = content!.match(/<loc>/g);
            const lastmodMatches = content!.match(/<lastmod>/g);

            expect(urlMatches).toBeTruthy();
            expect(locMatches).toBeTruthy();
            expect(lastmodMatches).toBeTruthy();

            // Should have same number of opening and closing tags
            expect(urlMatches?.length).toBeGreaterThan(0);
            expect(content!.match(/<\/url>/g)?.length).toBe(urlMatches?.length);
        });

        test('should have content pages in sitemap for all locales', async ({ page }) => {
            const { content } = await fetchSitemap(page);

            // Test main content sections
            const contentSections = ['about', 'contact', 'catalogs', 'docs', 'technical'];

            for (const section of contentSections) {
                for (const locale of ['nb', 'en', 'nn']) {
                    expect(content).toContain(`<loc>https://data.norge.no/${locale}/${section}</loc>`);
                }
            }
        });

        test('should have content subpages in sitemap', async ({ page }) => {
            const { content } = await fetchSitemap(page);

            // Test some key subpages that should exist
            const subpages = [
                'catalogs/information-models',
                'catalogs/concepts',
                'catalogs/data-services',
                'catalogs/datasets',
                'catalogs/public-services-and-events',
                'docs/community',
                'docs/resources',
                'docs/records-of-processing-activities',
                'docs/finding-data',
                'docs/sharing-data',
                'docs/metadata-quality',
                'technical/architecture',
                'technical/follow-our-work',
                'technical/infrastructure',
                'technical/api',
            ];

            for (const subpage of subpages) {
                for (const locale of ['nb', 'en', 'nn']) {
                    expect(content).toContain(`<loc>https://data.norge.no/${locale}/${subpage}</loc>`);
                }
            }
        });

        test('should have deep content subpages in sitemap', async ({ page }) => {
            const { content } = await fetchSitemap(page);

            // Test deeper subpages
            const deepSubpages = [
                'docs/records-of-processing-activities/how-to-login',
                'docs/records-of-processing-activities/how-to-export-data',
                'docs/finding-data/assisted-search',
                'docs/finding-data/access-data',
                'docs/finding-data/sparql',
                'docs/finding-data/ai-search',
                'docs/sharing-data/how-to-dataset',
                'docs/sharing-data/rdf',
                'docs/sharing-data/publishing-data-descriptions',
                'docs/sharing-data/login-and-access',
                'technical/api/search',
                'technical/api/catalog-view',
                'technical/api/sparql',
            ];

            for (const subpage of deepSubpages) {
                for (const locale of ['nb', 'en', 'nn']) {
                    expect(content).toContain(`<loc>https://data.norge.no/${locale}/${subpage}</loc>`);
                }
            }
        });

        test('should have proper priority values for content pages', async ({ page }) => {
            const { content } = await fetchSitemap(page);

            // Test priority values for different content types
            const priorityTests = [
                { path: 'catalogs', expectedPriority: '0.8' },
                { path: 'docs', expectedPriority: '0.7' },
                { path: 'technical', expectedPriority: '0.6' },
                { path: 'about', expectedPriority: '0.6' },
                { path: 'contact', expectedPriority: '0.5' },
            ];

            for (const priorityTest of priorityTests) {
                for (const locale of ['nb', 'en', 'nn']) {
                    const urlPattern = new RegExp(
                        `<url>\\s*<loc>https://data\\.norge\\.no/${locale}/${priorityTest.path}</loc>\\s*<lastmod>[^<]+</lastmod>\\s*<changefreq>weekly</changefreq>\\s*<priority>${priorityTest.expectedPriority}</priority>\\s*</url>`,
                        's',
                    );
                    expect(content).toMatch(urlPattern);
                }
            }
        });

        test('should have proper priority values for content subpages', async ({ page }) => {
            const { content } = await fetchSitemap(page);

            // Test priority values for subpages (should be lower than main pages)
            const subpagePriorityTests = [
                { path: 'catalogs/information-models', expectedPriority: '0.5' },
                { path: 'docs/community', expectedPriority: '0.5' },
                { path: 'technical/architecture', expectedPriority: '0.5' },
                { path: 'docs/finding-data/assisted-search', expectedPriority: '0.4' },
                { path: 'docs/sharing-data/how-to-dataset', expectedPriority: '0.4' },
                { path: 'technical/api/search', expectedPriority: '0.4' },
            ];

            for (const priorityTest of subpagePriorityTests) {
                for (const locale of ['nb', 'en', 'nn']) {
                    const urlPattern = new RegExp(
                        `<url>\\s*<loc>https://data\\.norge\\.no/${locale}/${priorityTest.path}</loc>\\s*<lastmod>[^<]+</lastmod>\\s*<changefreq>weekly</changefreq>\\s*<priority>${priorityTest.expectedPriority}</priority>\\s*</url>`,
                        's',
                    );
                    expect(content).toMatch(urlPattern);
                }
            }
        });

        test('should not include .mdx files in sitemap', async ({ page }) => {
            const { content } = await fetchSitemap(page);

            // Should not contain any .mdx file references
            expect(content).not.toContain('.mdx');
            expect(content).not.toContain('.nb.mdx');
            expect(content).not.toContain('.en.mdx');
            expect(content).not.toContain('.nn.mdx');
        });

        test('should have weekly change frequency for content pages', async ({ page }) => {
            const { content } = await fetchSitemap(page);

            // Test that content pages have weekly change frequency
            const contentSections = ['about', 'contact', 'catalogs', 'docs', 'technical'];

            for (const section of contentSections) {
                for (const locale of ['nb', 'en', 'nn']) {
                    const urlPattern = new RegExp(
                        `<url>\\s*<loc>https://data\\.norge\\.no/${locale}/${section}</loc>\\s*<lastmod>[^<]+</lastmod>\\s*<changefreq>weekly</changefreq>\\s*<priority>[^<]+</priority>\\s*</url>`,
                        's',
                    );
                    expect(content).toMatch(urlPattern);
                }
            }
        });

        test('should have proper lastmod dates for content pages', async ({ page }) => {
            const { content } = await fetchSitemap(page);

            // Test that content pages have valid lastmod dates
            const contentSections = ['about', 'contact', 'catalogs', 'docs', 'technical'];

            for (const section of contentSections) {
                for (const locale of ['nb', 'en', 'nn']) {
                    const urlPattern = new RegExp(
                        `<url>\\s*<loc>https://data\\.norge\\.no/${locale}/${section}</loc>\\s*<lastmod>\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z</lastmod>\\s*<changefreq>weekly</changefreq>\\s*<priority>[^<]+</priority>\\s*</url>`,
                        's',
                    );
                    expect(content).toMatch(urlPattern);
                }
            }
        });

        test('should have data-hunter as core static page, not content page', async ({ page }) => {
            const { content } = await fetchSitemap(page);

            // data-hunter should be included as a core static page
            for (const locale of ['nb', 'en', 'nn']) {
                expect(content).toContain(`<loc>https://data.norge.no/${locale}/data-hunter</loc>`);
            }

            // Should not be treated as a content directory (no subpages)
            expect(content).not.toContain('data-hunter/');
        });
    });

    test.describe('JSON-LD Structured Data', () => {
        test('should contain valid JSON-LD structured data on dataset pages', async ({ page }) => {
            // Navigate to a dataset page (using environment variable)
            const datasetId = process.env.E2E_DATASET_ID || 'test-dataset';
            const response = await page.goto(`/nb/datasets/${datasetId}`);

            // Skip test if dataset doesn't exist (404)
            if (response?.status() === 404) {
                test.skip(true, 'Dataset not found, skipping JSON-LD test');
                return;
            }

            // Check for JSON-LD script tag
            await expect(page.locator('script[id="dataset-structured-data"][type="application/ld+json"]')).toHaveCount(
                1,
            );

            // Get the JSON-LD content
            const jsonLdScript = await page
                .locator('script[id="dataset-structured-data"][type="application/ld+json"]')
                .first();
            await expect(jsonLdScript).toHaveText(/.*/);
            const jsonLdContent = await jsonLdScript.textContent();
            // eslint-disable-next-line playwright/prefer-web-first-assertions
            expect(jsonLdContent).toBeTruthy();

            // Parse and validate JSON-LD structure
            const structuredData = JSON.parse(jsonLdContent!);
            expect(structuredData['@context']).toBe('https://schema.org');
            expect(structuredData['@type']).toBe('Dataset');
            expect(structuredData.name).toBeTruthy();
            expect(structuredData.description).toBeTruthy();
            expect(structuredData.url).toBeTruthy();
            expect(structuredData.identifier).toBeTruthy();
        });

        test('should have proper Schema.org Dataset structure', async ({ page }) => {
            const datasetId = process.env.E2E_DATASET_ID || 'test-dataset';
            const success = await navigateToDataset(page, datasetId);
            if (!success) return;

            const jsonLdScript = await page
                .locator('script[id="dataset-structured-data"][type="application/ld+json"]')
                .first();
            await expect(jsonLdScript).toHaveText(/.*/);
            const jsonLdContent = await jsonLdScript.textContent();
            const structuredData = JSON.parse(jsonLdContent!);

            // Check required Schema.org Dataset properties
            expect(structuredData['@context']).toBe('https://schema.org');
            expect(structuredData['@type']).toBe('Dataset');
            expect(typeof structuredData.name).toBe('string');
            expect(typeof structuredData.description).toBe('string');
            expect(typeof structuredData.url).toBe('string');
            expect(typeof structuredData.identifier).toBe('string');

            // Check optional properties if they exist
            if (structuredData.publisher) {
                expect(structuredData.publisher['@type']).toBe('Organization');
                expect(typeof structuredData.publisher.name).toBe('string');
            }

            if (structuredData.dateModified) {
                expect(typeof structuredData.dateModified).toBe('string');
            }

            if (structuredData.datePublished) {
                expect(typeof structuredData.datePublished).toBe('string');
            }
        });

        test('should have distribution information when available', async ({ page }) => {
            const datasetId = process.env.E2E_DATASET_ID || 'test-dataset';
            const success = await navigateToDataset(page, datasetId);
            if (!success) return;

            const jsonLdScript = await page
                .locator('script[id="dataset-structured-data"][type="application/ld+json"]')
                .first();
            await expect(jsonLdScript).toHaveText(/.*/);
            const jsonLdContent = await jsonLdScript.textContent();
            const structuredData = JSON.parse(jsonLdContent!);

            // If distributions exist, they should have proper structure
            if (structuredData.distribution && Array.isArray(structuredData.distribution)) {
                structuredData.distribution.forEach((dist: any) => {
                    expect(dist['@type']).toBe('DataDownload');
                    expect(typeof dist.contentUrl).toBe('string');
                });
            }
        });

        test('should not contain XSS vulnerabilities in JSON-LD', async ({ page }) => {
            const datasetId = process.env.E2E_DATASET_ID || 'test-dataset';
            const success = await navigateToDataset(page, datasetId);
            if (!success) return;

            const jsonLdScript = await page
                .locator('script[id="dataset-structured-data"][type="application/ld+json"]')
                .first();
            await expect(jsonLdScript).toHaveText(/.*/);
            const jsonLdContent = await jsonLdScript.textContent();

            // Check for potential XSS patterns
            expect(jsonLdContent).not.toContain('<script>');
            expect(jsonLdContent).not.toContain('javascript:');
            expect(jsonLdContent).not.toContain('onerror=');
            expect(jsonLdContent).not.toContain('onload=');

            // Should be valid JSON
            expect(() => JSON.parse(jsonLdContent!)).not.toThrow();
        });

        test('should contain breadcrumb structured data', async ({ page }) => {
            const datasetId = process.env.E2E_DATASET_ID || 'test-dataset';
            const success = await navigateToDataset(page, datasetId);
            if (!success) return;

            // Check for breadcrumb JSON-LD script tag
            const breadcrumbScript = await page
                .locator('script[id="breadcrumb-structured-data"][type="application/ld+json"]')
                .first();
            await expect(breadcrumbScript).toHaveText(/.*/);
            const breadcrumbContent = await breadcrumbScript.textContent();
            // eslint-disable-next-line playwright/prefer-web-first-assertions
            expect(breadcrumbContent).toBeTruthy();

            // Parse and validate breadcrumb structure
            const breadcrumbData = JSON.parse(breadcrumbContent!);
            expect(breadcrumbData['@context']).toBe('https://schema.org');
            expect(breadcrumbData['@type']).toBe('BreadcrumbList');
            expect(breadcrumbData.itemListElement).toBeTruthy();
            expect(Array.isArray(breadcrumbData.itemListElement)).toBe(true);
            expect(breadcrumbData.itemListElement.length).toBeGreaterThan(0);

            // Validate each breadcrumb item
            breadcrumbData.itemListElement.forEach((item: any, index: number) => {
                expect(item['@type']).toBe('ListItem');
                expect(item.position).toBe(index + 1);
                expect(item.name).toBeTruthy();
                expect(typeof item.name).toBe('string');

                // Check that items have proper URLs (except last item which might not have URL)
                if (index < breadcrumbData.itemListElement.length - 1) {
                    expect(item.item).toBeTruthy();
                    expect(typeof item.item).toBe('string');
                    expect(item.item).toContain('staging.fellesdatakatalog.digdir.no');
                }
            });

            // Validate breadcrumb hierarchy
            const breadcrumbItems = breadcrumbData.itemListElement;
            expect(breadcrumbItems.length).toBeGreaterThanOrEqual(2); // At least home + current page

            // First item should be home
            expect(breadcrumbItems[0].name).toMatch(/home|start|data\.norge\.no/i);

            // Last item should be the current dataset
            const lastItem = breadcrumbItems[breadcrumbItems.length - 1];
            expect(lastItem.name).toBeTruthy();
            expect(lastItem.name.length).toBeGreaterThan(0);
        });
    });

    test.describe('Meta Tags and Headers', () => {
        test('should have proper meta tags for SEO', async ({ page }) => {
            const datasetId = process.env.E2E_DATASET_ID || 'test-dataset';
            const success = await navigateToDataset(page, datasetId);
            if (!success) return;

            // Check for essential meta tags
            const title = await page.title();
            expect(title).toBeTruthy();
            expect(title.length).toBeGreaterThan(0);

            await expect(page.locator('meta[name="description"]')).toHaveAttribute('content');
            const description = await page.locator('meta[name="description"]').getAttribute('content');
            expect(description!.length).toBeGreaterThan(0);

            // Check for Open Graph tags
            await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content');
            await expect(page.locator('meta[property="og:description"]')).toHaveAttribute('content');
            await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content');

            const ogUrl = await page.locator('meta[property="og:url"]').getAttribute('content');
            expect(ogUrl).toContain('data.norge.no');
        });

        test('should have proper language alternates', async ({ page }) => {
            const datasetId = process.env.E2E_DATASET_ID || 'test-dataset';
            const success = await navigateToDataset(page, datasetId);
            if (!success) return;

            // Check for hreflang tags
            await expect(page.locator('link[rel="alternate"][hreflang]')).toHaveCount(3);

            // Check for canonical URL
            await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href');
            const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
            expect(canonical).toContain('data.norge.no');
        });

        test('should have proper Twitter Card meta tags', async ({ page }) => {
            const datasetId = process.env.E2E_DATASET_ID || 'test-dataset';
            const success = await navigateToDataset(page, datasetId);
            if (!success) return;

            await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute('content', 'summary_large_image');
            await expect(page.locator('meta[name="twitter:title"]')).toHaveAttribute('content');
            await expect(page.locator('meta[name="twitter:description"]')).toHaveAttribute('content');
        });
    });
});
