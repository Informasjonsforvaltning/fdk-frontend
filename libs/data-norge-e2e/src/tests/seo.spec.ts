import { escapeRegExp } from 'lodash';
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
    console.log('Fetching sitemap...');

    // Set a longer timeout specifically for sitemap requests
    const response = await page.goto('/sitemap.xml', {
        timeout: 90000, // 90 seconds for sitemap generation
    });

    if (!response) {
        throw new Error('Failed to get sitemap response');
    }

    if (response.status() !== 200) {
        throw new Error(`Sitemap request failed with status: ${response.status()}`);
    }

    const content = await response.text();

    if (!content) {
        throw new Error('Sitemap content is empty');
    }

    console.log('Sitemap fetched successfully');
    return { response, content };
};

test.describe('SEO Tests', () => {
    // Configure retries for better stability with multiple workers
    // This allows tests to run in parallel while handling transient failures
    test.describe.configure({ retries: 3 });
    // Use a unique test isolation approach
    test.beforeEach(async ({ page, context }) => {
        // Clear any existing state and ensure clean start
        await page.goto('about:blank');
        // Clear cookies and storage for better isolation
        await context.clearCookies();
        // Add a small delay to ensure clean state
        await page.waitForTimeout(100);
    });

    test.describe('robots.txt', () => {
        test('should block crawling on non-canonical domains', async ({ page }) => {
            const response = await page.goto('/robots.txt');
            expect(response?.status()).toBe(200);

            const content = await response?.text();

            // Always should have User-agent directive
            expect(content).toContain('User-agent: *');

            // Test environment is never canonical domain, so should block all crawling
            expect(content).toContain('Disallow: /');
            expect(content).toContain('This is not the canonical domain');

            // Should not contain canonical domain specific content
            expect(content).not.toContain('Allow: /');
            expect(content).not.toContain('Sitemap: https://data.norge.no/sitemap.xml');
            expect(content).not.toContain('Disallow: /api/');
            expect(content).not.toContain('Disallow: /_next/');
        });
    });

    test.describe.skip('sitemap.xml', () => {
        // Configure longer timeout for sitemap tests due to potential long generation time
        test.describe.configure({ timeout: 120000 }); // 2 minutes for sitemap tests

        test.beforeEach(async () => {
            console.log('Starting sitemap test...');
        });

        test('should be accessible and contain valid XML structure', async ({ page }) => {
            const response = await page.goto('/sitemap.xml', {
                timeout: 90000, // 90 seconds for sitemap generation
            });
            expect(response?.status()).toBe(200);

            const content = await response?.text();
            expect(content).toContain('<?xml version="1.0" encoding="UTF-8"?>');
            expect(content).toContain('<urlset');
            expect(content).toContain('</urlset>');
        });

        test('should contain static pages for all locales', async ({ page }) => {
            console.log('Starting sitemap static pages test...');
            const { content } = await fetchSitemap(page);
            console.log(`Sitemap fetched successfully, content length: ${content.length}`);

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
            console.log('Starting dataset pages test...');
            const { content } = await fetchSitemap(page);
            console.log(`Dataset pages test - sitemap content length: ${content.length}`);

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
                ['nb', 'en', 'nn'].forEach((locale) => {
                    expect(content).toContain(`<loc>https://data.norge.no/${locale}/${section}</loc>`);
                });
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
                ['nb', 'en', 'nn'].forEach((locale) => {
                    expect(content).toContain(`<loc>https://data.norge.no/${locale}/${subpage}</loc>`);
                });
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
                ['nb', 'en', 'nn'].forEach((locale) => {
                    expect(content).toContain(`<loc>https://data.norge.no/${locale}/${subpage}</loc>`);
                });
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
                const localeChecks = ['nb', 'en', 'nn'].map((locale) => {
                    const urlPattern = new RegExp(
                        `<url>\\s*<loc>https://data\\.norge\\.no/${locale}/${priorityTest.path}</loc>\\s*<lastmod>[^<]+</lastmod>\\s*<changefreq>weekly</changefreq>\\s*<priority>${priorityTest.expectedPriority}</priority>\\s*</url>`,
                        's',
                    );
                    expect(content).toMatch(urlPattern);
                });
                // Execute all locale checks for this priority test
                localeChecks.forEach((check) => check);
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
                const localeChecks = ['nb', 'en', 'nn'].map((locale) => {
                    const urlPattern = new RegExp(
                        `<url>\\s*<loc>https://data\\.norge\\.no/${locale}/${priorityTest.path}</loc>\\s*<lastmod>[^<]+</lastmod>\\s*<changefreq>weekly</changefreq>\\s*<priority>${priorityTest.expectedPriority}</priority>\\s*</url>`,
                        's',
                    );
                    expect(content).toMatch(urlPattern);
                });
                // Execute all locale checks for this priority test
                localeChecks.forEach((check) => check);
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
                const localeChecks = ['nb', 'en', 'nn'].map((locale) => {
                    const urlPattern = new RegExp(
                        `<url>\\s*<loc>https://data\\.norge\\.no/${locale}/${section}</loc>\\s*<lastmod>[^<]+</lastmod>\\s*<changefreq>weekly</changefreq>\\s*<priority>[^<]+</priority>\\s*</url>`,
                        's',
                    );
                    expect(content).toMatch(urlPattern);
                });
                // Execute all locale checks for this section
                localeChecks.forEach((check) => check);
            }
        });

        test('should have proper lastmod dates for content pages', async ({ page }) => {
            const { content } = await fetchSitemap(page);

            // Test that content pages have valid lastmod dates
            const contentSections = ['about', 'contact', 'catalogs', 'docs', 'technical'];

            for (const section of contentSections) {
                const localeChecks = ['nb', 'en', 'nn'].map((locale) => {
                    const urlPattern = new RegExp(
                        `<url>\\s*<loc>https://data\\.norge\\.no/${locale}/${section}</loc>\\s*<lastmod>\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z</lastmod>\\s*<changefreq>weekly</changefreq>\\s*<priority>[^<]+</priority>\\s*</url>`,
                        's',
                    );
                    expect(content).toMatch(urlPattern);
                });
                // Execute all locale checks for this section
                localeChecks.forEach((check) => check);
            }
        });

        test('should have data-hunter as core static page, not content page', async ({ page }) => {
            const { content } = await fetchSitemap(page);

            // data-hunter should be included as a core static page
            ['nb', 'en', 'nn'].forEach((locale) => {
                expect(content).toContain(`<loc>https://data.norge.no/${locale}/data-hunter</loc>`);
            });

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

            const descriptionLocator = page.locator('meta[name="description"]');
            await expect(descriptionLocator).toHaveAttribute('content');
            // eslint-disable-next-line playwright/prefer-web-first-assertions
            await expect(descriptionLocator.getAttribute('content')).toBeTruthy();

            // Check for Open Graph tags
            await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content');
            await expect(page.locator('meta[property="og:description"]')).toHaveAttribute('content');
            const ogUrlLocator = page.locator('meta[property="og:url"]');
            await expect(ogUrlLocator).toHaveAttribute('content');
            await expect(ogUrlLocator).toHaveAttribute('content', /data\.norge\.no/);
        });

        test('should have proper language alternates', async ({ page }) => {
            const datasetId = process.env.E2E_DATASET_ID || 'test-dataset';
            const success = await navigateToDataset(page, datasetId);
            if (!success) return;

            // Check for hreflang tags
            await expect(page.locator('link[rel="alternate"][hreflang]')).toHaveCount(3);
            const canonicalLocator = page.locator('link[rel="canonical"]');
            await expect(canonicalLocator).toHaveCount(1);
            await expect(canonicalLocator).toHaveAttribute('href', /data\.norge\.no/);
        });

        test('should have proper Twitter Card meta tags', async ({ page }) => {
            const datasetId = process.env.E2E_DATASET_ID || 'test-dataset';
            const success = await navigateToDataset(page, datasetId);
            if (!success) return;

            await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute('content', 'summary_large_image');
            await expect(page.locator('meta[name="twitter:title"]')).toHaveAttribute('content');
            await expect(page.locator('meta[name="twitter:description"]')).toHaveAttribute('content');
        });

        test('should have canonical URL from page metadata', async ({ page }) => {
            // Test on home page to check page metadata behavior
            await page.goto('/nb');

            // Home page provides canonical URL via metadata
            const canonicalLocator = page.locator('link[rel="canonical"]');
            await expect(canonicalLocator).toHaveCount(1);
            await expect(canonicalLocator).toHaveAttribute('href', /data\.norge\.no/);
        });
    });

    test.describe('SEO-Friendly URLs and Redirects', () => {
        test('should redirect old URLs to new slug URLs', async ({ page }) => {
            const datasetId = process.env.E2E_DATASET_ID || 'test-dataset';

            // Navigate to old URL format and wait for redirect with retry logic
            await page.goto(`/nb/datasets/${datasetId}`, {
                waitUntil: 'load',
                timeout: 30000,
            });

            // Wait for redirect to complete with retry logic
            await page.waitForFunction(
                () => {
                    // eslint-disable-next-line no-undef
                    const url = window.location.href;
                    const urlObj = new URL(url);
                    return urlObj.pathname.includes('/datasets/') && urlObj.pathname.split('/').length >= 4;
                },
                { timeout: 10000 },
            );

            // Should redirect to new URL with slug
            expect(page.url()).toMatch(/\/nb\/datasets\/[^/]+\/[^/]+$/);

            // URL should contain the dataset ID
            expect(page.url()).toContain(datasetId);

            // Should not be the old format
            expect(page.url()).not.toBe(`/nb/datasets/${datasetId}`);
        });

        test('should preserve query parameters during redirects', async ({ page }) => {
            const datasetId = process.env.E2E_DATASET_ID || 'test-dataset';

            // Navigate to old URL with query parameters and wait for redirect
            await page.goto(`/nb/datasets/${datasetId}?tab=distributions&highlight=api`, {
                waitUntil: 'load',
                timeout: 30000,
            });

            // Wait for redirect to complete with retry logic
            await page.waitForFunction(
                () => {
                    // eslint-disable-next-line no-undef
                    const url = window.location.href;
                    const urlObj = new URL(url);
                    return urlObj.pathname.includes('/datasets/') && urlObj.pathname.split('/').length >= 4;
                },
                { timeout: 10000 },
            );

            // Should redirect to new URL with slug and preserved query parameters
            expect(page.url()).toMatch(/\/nb\/datasets\/[^/]+\/[^/]+\?tab=distributions&highlight=api$/);

            // Should contain the dataset ID
            expect(page.url()).toContain(datasetId);

            // Should preserve all query parameters
            expect(page.url()).toContain('tab=distributions');
            expect(page.url()).toContain('highlight=api');
        });

        test('should redirect invalid slugs to correct slugs', async ({ page }) => {
            const datasetId = process.env.E2E_DATASET_ID || 'test-dataset';

            // Navigate to URL with invalid slug and wait for redirect
            await page.goto(`/nb/datasets/${datasetId}/wrong-slug`, {
                waitUntil: 'load',
                timeout: 30000,
            });

            // Wait for redirect to complete with retry logic
            await page.waitForFunction(
                () => {
                    // eslint-disable-next-line no-undef
                    const url = window.location.href;
                    const urlObj = new URL(url);
                    return urlObj.pathname.includes('/datasets/') && urlObj.pathname.split('/').length >= 4;
                },
                { timeout: 10000 },
            );

            // Should redirect to correct slug
            expect(page.url()).toMatch(/\/nb\/datasets\/[^/]+\/[^/]+$/);

            // Should not contain the wrong slug
            expect(page.url()).not.toContain('wrong-slug');

            // Should contain the dataset ID
            expect(page.url()).toContain(datasetId);
        });

        test('should preserve query parameters when redirecting invalid slugs', async ({ page }) => {
            const datasetId = process.env.E2E_DATASET_ID || 'test-dataset';

            // Navigate to URL with invalid slug and query parameters and wait for redirect
            await page.goto(`/nb/datasets/${datasetId}/wrong-slug?tab=details&highlight=concept`, {
                waitUntil: 'load',
                timeout: 30000,
            });

            // Wait for redirect to complete with retry logic
            await page.waitForFunction(
                () => {
                    // eslint-disable-next-line no-undef
                    const url = window.location.href;
                    const urlObj = new URL(url);
                    return urlObj.pathname.includes('/datasets/') && urlObj.pathname.split('/').length >= 4;
                },
                { timeout: 10000 },
            );

            // Should redirect to correct slug with preserved query parameters
            expect(page.url()).toMatch(/\/nb\/datasets\/[^/]+\/[^/]+\?tab=details&highlight=concept$/);

            // Should preserve all query parameters
            expect(page.url()).toContain('tab=details');
            expect(page.url()).toContain('highlight=concept');

            // Should not contain the wrong slug
            expect(page.url()).not.toContain('wrong-slug');
        });

        test('should have proper slug format in URLs', async ({ page }) => {
            const datasetId = process.env.E2E_DATASET_ID || 'test-dataset';

            // Navigate to dataset page
            const success = await navigateToDataset(page, datasetId);
            if (!success) return;

            // URL should follow the pattern: /locale/datasets/id/slug
            const url = page.url();
            const urlObj = new URL(url);
            const pathParts = urlObj.pathname.split('/').filter((part) => part.length > 0);
            console.log('SEO Tests - pathParts', pathParts);

            // Should have at least 4 parts: locale/datasets/id/slug
            expect(pathParts.length).toBeGreaterThanOrEqual(4);

            // Should contain locale
            expect(['nb', 'en', 'nn']).toContain(pathParts[0]);

            // Should contain 'datasets'
            expect(pathParts[1]).toBe('datasets');

            // Should contain dataset ID
            expect(pathParts[2]).toBe(datasetId);

            // Should have a slug (not empty)
            expect(pathParts[3]).toBeTruthy();
            expect(pathParts[3].length).toBeGreaterThan(0);

            // Slug should be URL-friendly (no spaces, special chars)
            const slug = pathParts[3].split('?')[0]; // Remove query params
            expect(slug).toMatch(/^[a-z0-9-]+$/);
        });

        test('should have different slugs for different locales', async ({ page }) => {
            const datasetId = process.env.E2E_DATASET_ID || 'test-dataset';

            // Navigate to dataset in Norwegian and wait for redirect
            await page.goto(`/nb/datasets/${datasetId}`, {
                waitUntil: 'load',
                timeout: 30000,
            });
            await page.waitForFunction(
                () => {
                    // eslint-disable-next-line no-undef
                    const url = window.location.href;
                    const urlObj = new URL(url);
                    return urlObj.pathname.includes('/datasets/') && urlObj.pathname.split('/').length >= 4;
                },
                { timeout: 10000 },
            );
            const nbUrl = page.url();
            const nbUrlObj = new URL(nbUrl);
            const nbPathParts = nbUrlObj.pathname.split('/').filter((part) => part.length > 0);
            console.log('SEO Tests - pathParts', nbPathParts);
            // Ensure we have enough path parts before accessing index 3
            expect(nbPathParts.length).toBeGreaterThanOrEqual(4);
            const nbSlug = nbPathParts[3].split('?')[0];

            // Navigate to dataset in English and wait for redirect
            await page.goto(`/en/datasets/${datasetId}`, {
                waitUntil: 'load',
                timeout: 30000,
            });
            await page.waitForFunction(
                () => {
                    // eslint-disable-next-line no-undef
                    const url = window.location.href;
                    const urlObj = new URL(url);
                    return urlObj.pathname.includes('/datasets/') && urlObj.pathname.split('/').length >= 4;
                },
                { timeout: 10000 },
            );
            const enUrl = page.url();
            const enUrlObj = new URL(enUrl);
            const enPathParts = enUrlObj.pathname.split('/').filter((part) => part.length > 0);
            console.log('SEO Tests - pathParts', enPathParts);
            // Ensure we have enough path parts before accessing index 3
            expect(enPathParts.length).toBeGreaterThanOrEqual(4);
            const enSlug = enPathParts[3].split('?')[0];

            // Navigate to dataset in Nynorsk and wait for redirect
            await page.goto(`/nn/datasets/${datasetId}`, {
                waitUntil: 'load',
                timeout: 30000,
            });
            await page.waitForFunction(
                () => {
                    // eslint-disable-next-line no-undef
                    const url = window.location.href;
                    const urlObj = new URL(url);
                    return urlObj.pathname.includes('/datasets/') && urlObj.pathname.split('/').length >= 4;
                },
                { timeout: 10000 },
            );
            const nnUrl = page.url();
            const nnUrlObj = new URL(nnUrl);
            const nnPathParts = nnUrlObj.pathname.split('/').filter((part) => part.length > 0);
            console.log('SEO Tests - pathParts', nnPathParts);
            // Ensure we have enough path parts before accessing index 3
            expect(nnPathParts.length).toBeGreaterThanOrEqual(4);
            const nnSlug = nnPathParts[3].split('?')[0];

            // All slugs should exist
            expect(nbSlug).toBeTruthy();
            expect(enSlug).toBeTruthy();
            expect(nnSlug).toBeTruthy();

            // Slugs should be URL-friendly
            expect(nbSlug).toMatch(/^[a-z0-9-]+$/);
            expect(enSlug).toMatch(/^[a-z0-9-]+$/);
            expect(nnSlug).toMatch(/^[a-z0-9-]+$/);
        });

        test('should have SEO-friendly URLs in sitemap', async ({ page }) => {
            const { content } = await fetchSitemap(page);

            // Should contain dataset URLs with slugs
            expect(content).toMatch(/https:\/\/data\.norge\.no\/[a-z]{2}\/datasets\/[^/]+\/[^/]+/);

            // Should not contain old format URLs (without slugs)
            expect(content).not.toMatch(/https:\/\/data\.norge\.no\/[a-z]{2}\/datasets\/[^/]+<\/loc>/);
        });

        test('should have proper canonical URLs with slugs', async ({ page }) => {
            const datasetId = process.env.E2E_DATASET_ID || 'test-dataset';
            const success = await navigateToDataset(page, datasetId);
            if (!success) return;

            // Test environment is never canonical domain, so canonical URL should not be present
            const canonicalLocator = page.locator('link[rel="canonical"]');
            await expect(canonicalLocator).toHaveCount(1);
            await expect(canonicalLocator).toHaveAttribute('href', /data\.norge\.no/);
        });

        test('should have proper Open Graph URLs with slugs', async ({ page }) => {
            const datasetId = process.env.E2E_DATASET_ID || 'test-dataset';
            const success = await navigateToDataset(page, datasetId);
            if (!success) return;

            // Check Open Graph URL
            const ogUrlLocator = page.locator('meta[property="og:url"]');
            await expect(ogUrlLocator).toHaveAttribute('content');

            // Should contain slug
            await expect(ogUrlLocator).toHaveAttribute('content', /\/datasets\/[^/]+\/[^/]+$/);

            // Should not be old format
            await expect(ogUrlLocator).not.toHaveAttribute('content', /\/datasets\/[^/]+$/);

            // Should contain dataset ID
            await expect(ogUrlLocator).toHaveAttribute('content', new RegExp(escapeRegExp(datasetId)));
        });

        test('should have proper language alternates with slugs', async ({ page }) => {
            const datasetId = process.env.E2E_DATASET_ID || 'test-dataset';
            const success = await navigateToDataset(page, datasetId);
            if (!success) return;

            // Check hreflang tags
            const hreflangLocator = page.locator('link[rel="alternate"][hreflang]');
            await expect(hreflangLocator).toHaveCount(3); // nb, en, nn

            // Get all href attributes concurrently
            const hrefPromises = (await hreflangLocator.all()).map(async (tag) => {
                // eslint-disable-next-line playwright/prefer-web-first-assertions
                return await tag.getAttribute('href');
            });
            const hrefs = await Promise.all(hrefPromises);

            // Validate all hrefs
            hrefs.forEach((href: any) => {
                expect(href).toBeTruthy();

                // Should contain slug
                expect(href).toMatch(/\/datasets\/[^/]+\/[^/]+$/);

                // Should not be old format
                expect(href).not.toMatch(/\/datasets\/[^/]+$/);

                // Should contain dataset ID
                expect(href).toContain(datasetId);
            });
        });

        test('should have proper structured data URLs with slugs', async ({ page }) => {
            const datasetId = process.env.E2E_DATASET_ID || 'test-dataset';
            const success = await navigateToDataset(page, datasetId);
            if (!success) return;

            // Check JSON-LD structured data
            const jsonLdScript = await page
                .locator('script[id="dataset-structured-data"][type="application/ld+json"]')
                .first();
            const jsonLdContent = await jsonLdScript.textContent();
            const structuredData = JSON.parse(jsonLdContent!);

            // Should have URL with slug
            expect(structuredData.url).toMatch(/\/datasets\/[^/]+\/[^/]+$/);

            // Should not be old format
            expect(structuredData.url).not.toMatch(/\/datasets\/[^/]+$/);

            // Should contain dataset ID
            expect(structuredData.url).toContain(datasetId);
        });

        test('should have proper breadcrumb URLs with slugs', async ({ page }) => {
            const datasetId = process.env.E2E_DATASET_ID || 'test-dataset';
            const success = await navigateToDataset(page, datasetId);
            if (!success) return;

            // Check breadcrumb structured data
            const breadcrumbScript = await page
                .locator('script[id="breadcrumb-structured-data"][type="application/ld+json"]')
                .first();
            const breadcrumbContent = await breadcrumbScript.textContent();
            const breadcrumbData = JSON.parse(breadcrumbContent!);

            // Last breadcrumb item should have URL with slug
            const lastItem = breadcrumbData.itemListElement[breadcrumbData.itemListElement.length - 1];
            expect(lastItem.item).toMatch(/\/datasets\/[^/]+\/[^/]+$/);

            // Should not be old format
            expect(lastItem.item).not.toMatch(/\/datasets\/[^/]+$/);

            // Should contain dataset ID
            expect(lastItem.item).toContain(datasetId);
        });

        test('should handle edge cases in slug generation', async ({ page }) => {
            // Test with special characters in dataset title
            const datasetId = process.env.E2E_DATASET_ID || 'test-dataset';
            const success = await navigateToDataset(page, datasetId);
            if (!success) return;

            const url = page.url();
            const urlObj = new URL(url);
            const pathParts = urlObj.pathname.split('/').filter((part) => part.length > 0);
            const slug = pathParts[3].split('?')[0];

            // Slug should be URL-safe
            expect(slug).toMatch(/^[a-z0-9-]+$/);

            // Should not contain special characters
            expect(slug).not.toMatch(/[^a-z0-9-]/);

            // Should not be empty
            expect(slug.length).toBeGreaterThan(0);
        });

        test('should maintain consistent URL structure for Norwegian locale', async ({ page }) => {
            const datasetId = process.env.E2E_DATASET_ID || 'test-dataset';
            const locale = 'nb';

            await page.goto(`/${locale}/datasets/${datasetId}`, {
                waitUntil: 'load',
                timeout: 30000,
            });
            await page.waitForFunction(
                () => {
                    // eslint-disable-next-line no-undef
                    const url = window.location.href;
                    const urlObj = new URL(url);
                    return urlObj.pathname.includes('/datasets/') && urlObj.pathname.split('/').length >= 4;
                },
                { timeout: 10000 },
            );

            const url = page.url();
            const urlObj = new URL(url);
            const pathParts = urlObj.pathname.split('/').filter((part) => part.length > 0);

            console.log('SEO Tests - pathParts', pathParts);
            // Should have consistent structure
            expect(pathParts.length).toBeGreaterThanOrEqual(4);
            expect(pathParts[0]).toBe(locale);
            expect(pathParts[1]).toBe('datasets');
            expect(pathParts[2]).toBe(datasetId);
            expect(pathParts[3]).toBeTruthy(); // slug

            // Slug should be URL-friendly
            const slug = pathParts[3].split('?')[0];
            expect(slug).toMatch(/^[a-z0-9-]+$/);
        });

        test('should maintain consistent URL structure for English locale', async ({ page }) => {
            const datasetId = process.env.E2E_DATASET_ID || 'test-dataset';
            const locale = 'en';

            await page.goto(`/${locale}/datasets/${datasetId}`, {
                waitUntil: 'load',
                timeout: 30000,
            });
            await page.waitForFunction(
                () => {
                    // eslint-disable-next-line no-undef
                    const url = window.location.href;
                    const urlObj = new URL(url);
                    return urlObj.pathname.includes('/datasets/') && urlObj.pathname.split('/').length >= 4;
                },
                { timeout: 10000 },
            );

            const url = page.url();
            const urlObj = new URL(url);
            const pathParts = urlObj.pathname.split('/').filter((part) => part.length > 0);

            console.log('SEO Tests - pathParts', pathParts);
            // Should have consistent structure
            expect(pathParts.length).toBeGreaterThanOrEqual(4);
            expect(pathParts[0]).toBe(locale);
            expect(pathParts[1]).toBe('datasets');
            expect(pathParts[2]).toBe(datasetId);
            expect(pathParts[3]).toBeTruthy(); // slug

            // Slug should be URL-friendly
            const slug = pathParts[3].split('?')[0];
            expect(slug).toMatch(/^[a-z0-9-]+$/);
        });

        test('should maintain consistent URL structure for Nynorsk locale', async ({ page }) => {
            const datasetId = process.env.E2E_DATASET_ID || 'test-dataset';
            const locale = 'nn';

            await page.goto(`/${locale}/datasets/${datasetId}`, {
                waitUntil: 'load',
                timeout: 30000,
            });
            await page.waitForFunction(
                () => {
                    // eslint-disable-next-line no-undef
                    const url = window.location.href;
                    const urlObj = new URL(url);
                    return urlObj.pathname.includes('/datasets/') && urlObj.pathname.split('/').length >= 4;
                },
                { timeout: 10000 },
            );

            const url = page.url();
            const urlObj = new URL(url);
            const pathParts = urlObj.pathname.split('/').filter((part) => part.length > 0);

            console.log('SEO Tests - pathParts', pathParts);
            // Should have consistent structure
            expect(pathParts.length).toBeGreaterThanOrEqual(4);
            expect(pathParts[0]).toBe(locale);
            expect(pathParts[1]).toBe('datasets');
            expect(pathParts[2]).toBe(datasetId);
            expect(pathParts[3]).toBeTruthy(); // slug

            // Slug should be URL-friendly
            const slug = pathParts[3].split('?')[0];
            expect(slug).toMatch(/^[a-z0-9-]+$/);
        });
    });
});
