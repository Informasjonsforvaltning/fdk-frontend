import { NextRequest, NextResponse } from 'next/server';
import { isCanonicalDomain } from '../../utils/domain';

export const dynamic = 'force-dynamic';

export const GET = async (request: NextRequest) => {
    let robotsContent: string;

    if (isCanonicalDomain()) {
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
