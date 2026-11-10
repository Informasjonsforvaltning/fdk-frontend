import { NextResponse } from "next/server";
import { isCanonicalDomain } from "../../utils/domain";
import { getSite } from "../../utils/site";

export const dynamic = "force-dynamic";

export const GET = async () => {
  let robotsContent: string;

  if (isCanonicalDomain()) {
    const site = await getSite();

    // Allow crawling on canonical domain
    robotsContent = `# Allow crawling of all public pages
User-agent: *
Allow: /

# Block API and Next.js internal paths
Disallow: /api/
Disallow: /_next/
Disallow: /admin/
Disallow: /internal/

# Faceted search URLs. Query parameters combine into an unbounded URL space
# with no unique content. The canonical pages are the server-rendered detail
# pages listed in the sitemap below.
Disallow: /*?

# Sitemap
Sitemap: ${site.origin}/sitemap.xml

# Crawl delay (be respectful to your servers)
Crawl-delay: 1`;
  } else {
    // Block all crawling on non-canonical domains (staging, demo, development)
    robotsContent = `# Block all crawling on non-canonical domain
User-agent: *
Disallow: /

# This is not the canonical domain
# Only the production sites should be crawled by search engines`;
  }

  return new NextResponse(robotsContent, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=300, s-maxage=600",
    },
  });
};
