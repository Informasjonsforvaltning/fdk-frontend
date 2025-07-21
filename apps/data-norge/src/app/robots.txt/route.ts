import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
    const { FDK_BASE_URI } = process.env;
    // Even though the canonical domain is https://data.norge.no, we will use FDK_BASE_URI to allow crawling of all public pages
    const isCanonicalDomain = FDK_BASE_URI === 'https://fellesdatakatalog.digdir.no';

    // Log for debugging (remove in production)
    console.log(`Robots.txt requested - FDK_BASE_URI: ${FDK_BASE_URI}, isCanonicalDomain: ${isCanonicalDomain}`);

    let robotsContent: string;

    if (isCanonicalDomain) {
        // Allow crawling on canonical domain
        robotsContent = `# Allow crawling of all public pages
User-agent: *
Allow: /

# Block API and Next.js internal paths
Disallow: /api/
Disallow: /_next/
Disallow: /admin/
Disallow: /internal/

# Sitemap
Sitemap: https://data.norge.no/sitemap.xml

# Crawl delay (be respectful to your servers)
Crawl-delay: 1`;
    } else {
        // Block all crawling on non-canonical domains (staging, demo, development)
        robotsContent = `# Block all crawling on non-canonical domain
User-agent: *
Disallow: /

# This is not the canonical domain
# Only https://data.norge.no should be crawled by search engines`;
    }

    return new NextResponse(robotsContent, {
        status: 200,
        headers: {
            'Content-Type': 'text/plain',
            'Cache-Control': 'public, max-age=300, s-maxage=600',
        },
    });
};
