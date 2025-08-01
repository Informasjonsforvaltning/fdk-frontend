# SEO Implementation for Dataset Pages

This document outlines the SEO implementation for making dataset pages discoverable by Google and other search engines.

## Overview

With over 9000 datasets that are dynamically generated, we've implemented a comprehensive SEO strategy that includes:

1. **SEO-Friendly URLs** - Descriptive URLs with dataset titles as slugs
2. **Dynamic Sitemap Generation** - Automatically includes all dataset pages
3. **Enhanced Metadata** - Rich metadata for each dataset page
4. **Structured Data** - Schema.org markup for better search engine understanding
5. **Robots.txt** - Proper crawling instructions
6. **Internationalization Support** - SEO for all supported languages (nb, en, nn)

## Implementation Details

### 1. SEO-Friendly URLs with Slugs

- **Implementation**: Automatic slug generation from dataset titles
- **URL Pattern**: `/{locale}/datasets/{id}/{slug}`
- **Example**: `/nb/datasets/123/my-dataset-title`
- **Features**:
    - **Automatic slug generation**: Uses `getDatasetSlug()` utility function
    - **Locale-specific slugs**: Different slugs for different languages
    - **Backward compatibility**: Old URLs redirect to new SEO-friendly URLs
    - **Query parameter preservation**: All query parameters preserved during redirects
    - **Canonical URLs**: Ensures consistent URL structure across the site
    - **Internal link updates**: All internal links use the new URL format

#### **URL Structure**

**Old Format**: `/nb/datasets/123`
**New Format**: `/nb/datasets/123/my-dataset-title`

#### **Implementation Details**

**Route Structure**:

- `[id]/page.tsx` - Handles old URLs and redirects to canonical slug
- `[id]/[slug]/page.tsx` - Handles new URLs with slug validation

**Slug Generation**:

```typescript
// Uses slugify and printLocaleValue for clean, readable URLs
const slug = getDatasetSlug(dataset, locale);
// Example: "My Dataset Title" → "my-dataset-title"
```

**Redirect Logic**:

```typescript
// Old route redirects to canonical slug
const canonicalSlug = getDatasetSlug(dataset, locale);
const queryString = new URLSearchParams(searchParams).toString();
const redirectUrl = queryString
    ? `/${locale}/datasets/${params.id}/${canonicalSlug}?${queryString}`
    : `/${locale}/datasets/${params.id}/${canonicalSlug}`;
redirect(redirectUrl);
```

**Slug Validation**:

```typescript
// New route validates slug and redirects if incorrect
const canonicalSlug = getDatasetSlug(dataset, locale);
if (params.slug !== canonicalSlug) {
    // Preserve query parameters during redirect
    const queryString = new URLSearchParams(searchParams).toString();
    const redirectUrl = queryString
        ? `/${locale}/datasets/${params.id}/${canonicalSlug}?${queryString}`
        : `/${locale}/datasets/${params.id}/${canonicalSlug}`;
    redirect(redirectUrl);
}
```

#### **SEO Benefits**

- **Descriptive URLs**: URLs describe the content, improving click-through rates
- **Keyword-rich URLs**: Dataset titles in URLs help with search rankings
- **User-friendly**: Clean, readable URLs improve user experience
- **Consistent structure**: All dataset URLs follow the same pattern
- **Language-specific**: Different slugs for different languages improve international SEO

#### **Internal Link Updates**

All internal links have been updated to use the new URL format:

- **Structured data**: JSON-LD URLs include slugs
- **Metadata**: Open Graph and canonical URLs include slugs
- **References**: Dataset reference links use slug URLs
- **Search results**: LLM search results link to slug URLs
- **Sitemap**: All sitemap entries use slug URLs

### 2. Dynamic Sitemap (`/sitemap.xml/route.ts`)

- **Location**: `apps/data-norge/src/app/sitemap.xml/route.ts`
- **Function**: Automatically generates a sitemap with all dataset pages and content pages
- **Features**:
    - **Concurrent pagination**: Efficiently fetches all datasets using `Promise.all()`
    - **Batch processing**: Handles 1000 datasets per request for optimal performance
    - **Dynamic content scanning**: Automatically discovers content pages from folder structure
    - **Server-side caching**: 5-minute in-memory cache for improved performance
    - **Route handler approach**: Uses Next.js API route for better control over headers and caching
    - **Comprehensive coverage**: Includes all static pages, content pages, and dataset pages for all locales
- **SEO-friendly URLs**: All dataset entries use the new slug-based URLs
    - **Smart prioritization**: Sets appropriate `changeFrequency` and `priority` values based on content type and depth
    - **Internationalization**: Generates URLs for all supported languages (nb, en, nn)
    - **Automatic maintenance**: New content pages are automatically included when folders are added

### 2. Enhanced Metadata Generation

- **Location**: `apps/data-norge/src/app/[lang]/datasets/[id]/page.tsx`
- **Features**:
    - Dynamic title and description based on dataset content
    - Open Graph tags for social media sharing
    - Twitter Card support
    - Canonical URLs and language alternates
    - Structured data in metadata

### 3. Structured Data Implementation

- **Location**: `apps/data-norge/src/app/components/details-page/dataset/index.tsx`
- **Schema**: Uses Schema.org Dataset markup
- **Features**:
    - **Dataset structured data**: Complete Schema.org Dataset markup with sanitization
    - **Breadcrumb structured data**: Schema.org BreadcrumbList for navigation
    - **Safe JSON serialization**: XSS-protected structured data generation
    - **Comprehensive metadata**: Publisher, dates, keywords, accessibility, distributions
    - **Multiple structured data types**: Both dataset and breadcrumb JSON-LD scripts

#### Structured Data Components

- **DatasetStructuredData**: Sanitized JSON-LD for dataset information
- **BreadcrumbStructuredData**: Navigation breadcrumb markup
- **Safe JSON stringification**: Prevents XSS attacks in structured data

### 4. Route Handler Implementation

The sitemap uses a Next.js API route handler (`/sitemap.xml/route.ts`) instead of the traditional sitemap.ts approach for several benefits:

- **Better caching control**: Direct control over HTTP headers and caching behavior
- **Improved performance**: Server-side caching with 5-minute duration
- **Proper content-type**: Explicit XML content-type headers
- **Error handling**: Better error responses and logging
- **Flexibility**: Can add custom logic for different environments
- **No route conflicts**: Avoids conflicts with other sitemap implementations

### 5. Robots.txt

- **Location**: `apps/data-norge/public/robots.txt`
- **Features**:
    - Allows crawling of all public pages
    - References sitemap location
    - Blocks admin and internal pages
    - Includes crawl delay for server protection

## Environment Variables

Add the following environment variable to your deployment:

```bash
NEXT_PUBLIC_BASE_URL=https://data.norge.no
```

## Performance Considerations

### Sitemap Generation

The sitemap generation uses efficient concurrent pagination to fetch all datasets and dynamic content scanning. The implementation:

#### **Dataset Pagination**

1. **Fetches first page (page 0)** to determine total page count
2. **Sequential pagination** to avoid overwhelming the search service
3. **Batch size of 1000** datasets per request for optimal performance

```typescript
// Efficient sequential pagination implementation
const allDatasets: any[] = [];
const size = 1000;

// First, get the first page (page 0) to determine total count
const firstPageResponse = await getAllDatasets(0, size);
const totalPages = firstPageResponse.page.totalPages || 0;

// Add first page results
allDatasets.push(...(firstPageResponse.hits || []));

// Process remaining pages sequentially to avoid "all shards failed"
if (totalPages > 1) {
    for (let page = 1; page < totalPages; page++) {
        const result = await getAllDatasets(page, size);
        allDatasets.push(...(result.hits || []));
    }
}
```

#### **Dynamic Content Scanning**

```typescript
// Recursively scan content directories
async function scanContentDirectory(dirPath: string, basePath: string = ''): Promise<string[]> {
    const paths: string[] = [];

    try {
        const items = await readdir(dirPath);

        for (const item of items) {
            const fullPath = join(dirPath, item);
            const relativePath = basePath ? `${basePath}/${item}` : item;
            const stats = await stat(fullPath);

            if (stats.isDirectory()) {
                // Add the directory path itself
                paths.push(relativePath);

                // Recursively scan subdirectories
                const subPaths = await scanContentDirectory(fullPath, relativePath);
                paths.push(...subPaths);
            }
            // Skip .mdx files - only include directory paths
        }
    } catch (error) {
        console.warn(`Could not read directory ${dirPath}:`, error);
    }

    return paths;
}
```

**Benefits of this approach:**

- **Concurrent fetching**: All pages are fetched simultaneously, not sequentially
- **Memory efficient**: Processes datasets in batches of 1000
- **Scalable**: Handles large datasets (>10,000) efficiently
- **Dynamic rendering**: Uses `force-dynamic` to ensure fresh data
- **Automatic content discovery**: New content folders are automatically included
- **Clean structure**: Only includes directory paths, not individual content files

### Priority Structure

The sitemap uses a carefully designed priority hierarchy to guide search engine crawling and indexing:

#### **🏠 Home & Core Pages (1.0)**

- **Home pages** (`/nb`, `/en`, `/nn`): **1.0** - Main entry points for all users

#### **📊 Data & Catalog Pages (0.8-0.9)**

- **Dataset listing pages** (`/datasets`): **0.9** - Core functionality and primary user destination
- **Catalogs main pages** (`/catalogs`): **0.8** - Important data discovery functionality
- **Legacy data pages** (`/dataservices`, `/concepts`, etc.): **0.9** - High-value data resources

#### **📚 Documentation & Tools (0.6-0.7)**

- **Documentation main pages** (`/docs`): **0.7** - Important for user adoption and data usage
- **Data hunter** (`/data-hunter`): **0.7** - Core tool functionality for data discovery
- **Technical documentation** (`/technical`): **0.6** - Supporting content for technical users

#### **ℹ️ Information Pages (0.5-0.6)**

- **About pages** (`/about`): **0.6** - Important but not core functionality
- **Contact pages** (`/contact`): **0.5** - Utility pages for user support

#### **📄 Content Subpages (0.3-0.5)**

- **First-level subpages**: **0.5** - Important subcontent within sections
- **Second-level subpages**: **0.4** - Detailed content and guides
- **Deep subpages**: **0.3** - Specialized content for specific use cases

#### **Rationale for Priority Structure**

**1. Data-First Approach**

- Prioritizes data discovery and access as the core value proposition
- Catalogs and datasets get higher priority than documentation
- Reflects the primary user journey: find → understand → use data

**2. User Journey Optimization**

- Home pages (1.0): Entry point for all users
- Dataset pages (0.9): Primary user destination and core functionality
- Catalogs (0.8): Secondary data discovery and exploration
- Documentation (0.7): Help users understand and effectively use data

**3. SEO Best Practices**

- Clear hierarchy with meaningful differences (0.1 increments)
- Avoids over-optimization (no 0.95, 0.97, etc.)
- Realistic priorities that search engines can trust
- Progressive reduction based on content depth

**4. Content Depth Strategy**

- Shallow content gets higher priority (easier to find and use)
- Deep content gets lower priority (specialized, fewer users)
- Each level deeper reduces priority by 0.1 for logical progression

#### **Benefits of This Priority Structure**

**🎯 SEO Benefits**

- **Clear crawl priority**: Search engines understand content hierarchy
- **Efficient crawling**: Focuses on most important pages first
- **Better indexing**: Important pages get crawled more frequently
- **Improved rankings**: High-priority pages get better ranking signals

**👥 User Experience**

- **Logical navigation**: Priority reflects user importance and journey
- **Content discovery**: Important content gets higher visibility
- **Search relevance**: Better matches user search intent and behavior

**⚡ Performance**

- **Crawl efficiency**: Search engines spend time on high-value pages
- **Index quality**: Better overall site indexing and coverage
- **Resource optimization**: Efficient use of crawl budget

### Caching Strategy

The sitemap implements server-side caching for improved performance:

```typescript
// Server-side caching implementation with atomic updates
const SITEMAP_CACHE = {
    sitemap: null as string | null,
    timestamp: 0,
    duration: 5 * 60 * 1000, // 5 minutes
};

const atomicUpdateSitemapCache = (newSitemap: string): boolean => {
    const now = Date.now();
    if (!SITEMAP_CACHE.sitemap || now - SITEMAP_CACHE.timestamp >= SITEMAP_CACHE.duration) {
        SITEMAP_CACHE.sitemap = newSitemap;
        SITEMAP_CACHE.timestamp = now;
        return true; // Updated
    }
    return false; // Not updated
};

export async function GET(request: NextRequest) {
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
}
```

**Benefits of this caching approach:**

- **5-minute cache duration**: Perfect balance between freshness and performance
- **In-memory caching**: Fast access between requests
- **Automatic cache invalidation**: Fresh data after 5 minutes
- **Proper HTTP headers**: Cache-Control and ETag for browser/CDN caching
- **Performance improvement**: First request ~8s, subsequent requests ~50-100ms
- **Error handling**: Graceful fallback if generation fails

## Performance Improvements

### Caching Performance

The new caching implementation provides significant performance improvements:

- **First request**: ~8 seconds (generates fresh sitemap)
- **Subsequent requests**: ~50-100ms (serves from cache)
- **Cache duration**: 5 minutes (optimal for test scenarios)
- **Memory efficient**: In-memory caching with automatic cleanup

### Testing Performance

The e2e tests have been optimized to work with the caching system:

- **Sitemap tests run serially**: Ensures consistent caching behavior
- **Helper functions**: `fetchSitemap()` for consistent test access
- **Cache-aware testing**: Tests validate both fresh and cached responses
- **Performance monitoring**: Console logs show cache hits/misses

## Monitoring

### Google Search Console

1. **Submit Sitemap**: Add your sitemap to Google Search Console
2. **Monitor Coverage**: Track indexed pages and any crawl errors
3. **Performance**: Monitor search performance for dataset pages

## Best Practices

### 1. Content Optimization

- Ensure dataset titles are descriptive and keyword-rich
- Write comprehensive descriptions for each dataset
- Use relevant keywords in dataset metadata

### 2. Technical SEO

- All dataset pages are server-side rendered for optimal crawling
- Proper heading structure (H1, H2, H3)
- Fast loading times (optimize images and resources)
- Mobile-friendly design

### 3. International SEO

- Proper hreflang tags for language alternatives
- Locale-specific URLs and content
- Translated metadata for all supported languages

## Testing

### Automated E2E Tests

- **Location**: `libs/data-norge-e2e/src/tests/seo.spec.ts`
- **Coverage**: Comprehensive SEO testing including:
    - **Robots.txt validation and content**
    - **Sitemap.xml structure and dataset inclusion**
    - **Content pages validation** (main sections, subpages, deep subpages)
    - **Priority value validation** for all content types and depths
    - **JSON-LD structured data validation**
    - **Meta tags and Open Graph tags**
    - **Language alternates (hreflang)**
    - **Twitter Card metadata**
    - **Breadcrumb structured data**
    - **Content file exclusion** (ensures no .mdx files in sitemap)
    - **Change frequency validation** for content pages
    - **Last modified date validation** for all pages

#### **Content Pages Test Suite**

The comprehensive content pages test suite validates:

- **Main content sections**: `about`, `contact`, `catalogs`, `docs`, `technical`
- **Content subpages**: First-level subpages like `catalogs/information-models`
- **Deep subpages**: Multi-level content like `docs/finding-data/assisted-search`
- **Priority validation**: Ensures correct priority assignment based on content type and depth
- **File exclusion**: Confirms no `.mdx` files are included in sitemap
- **Change frequency**: Validates weekly change frequency for content pages
- **Last modified dates**: Ensures proper ISO date format for all pages
- **Data-hunter classification**: Verifies it's treated as core static page, not content

### Manual Testing

#### URL Testing

1. **Test Old URLs**: Verify old URLs redirect to new slug URLs
2. **Test Invalid Slugs**: Verify incorrect slugs redirect to correct slugs
3. **Test Query Parameters**: Verify query parameters are preserved during redirects
4. **Test Internal Links**: Verify all internal links use new URL format

#### Sitemap Testing

1. **Validate Sitemap**: Use online sitemap validators
2. **Check Coverage**: Verify all dataset pages and content pages are included
3. **Check URL Format**: Verify all dataset URLs use the new slug format
4. **Test Crawling**: Use Google Search Console's URL inspection tool
5. **Content Discovery**: Verify new content folders are automatically included

#### Structured Data Testing

1. **Google Rich Results Test**: Test structured data markup
2. **Schema.org Validator**: Validate schema markup
3. **Google Search Console**: Monitor rich results performance

### Test Execution

```bash
# Run SEO tests
npm run e2e:seo

# Run all e2e tests
npm run e2e
```

## Deployment Checklist

- [ ] Add `NEXT_PUBLIC_BASE_URL` environment variable
- [ ] Deploy updated code with SEO enhancements
- [ ] Run e2e tests to verify SEO implementation: `npm run e2e:seo`
- [ ] Test URL redirects and slug functionality
- [ ] Verify old URLs redirect to new slug URLs
- [ ] Test query parameter preservation during redirects
- [ ] Verify all internal links use new URL format
- [ ] Submit sitemap to Google Search Console
- [ ] Test sitemap accessibility at `/sitemap.xml`
- [ ] Verify robots.txt at `/robots.txt`
- [ ] Test structured data with Google's testing tools
- [ ] Monitor initial indexing progress
- [ ] Verify dataset pages are properly indexed in search engines
- [ ] Verify content pages are properly indexed in search engines
- [ ] Test content page accessibility and SEO performance

## Expected Results

With this implementation, you should see:

1. **SEO-Friendly URLs**: Clean, descriptive URLs improve click-through rates and search rankings
2. **Improved Indexing**: All dataset pages and content pages should be discoverable by search engines
3. **Rich Snippets**: Dataset pages may appear with enhanced information in search results
4. **Better Rankings**: Improved visibility for dataset-related and content-related searches
5. **International Traffic**: Proper indexing for all supported languages
6. **Automatic Content Discovery**: New content pages automatically included in sitemap when folders are added
7. **Optimized Crawling**: Search engines focus on high-priority content first
8. **Comprehensive Coverage**: All content types (data, documentation, technical) properly indexed
9. **Backward Compatibility**: Old URLs continue to work and redirect properly
10. **User Experience**: Clean, readable URLs improve user experience and sharing

## Monitoring

Regular monitoring should include:

- **Index Coverage**: Track how many dataset pages and content pages are indexed
- **Search Performance**: Monitor click-through rates and rankings for both data and content
- **Crawl Stats**: Monitor crawl efficiency and errors
- **Content Discovery**: Verify new content is automatically discovered and indexed
- **Priority Effectiveness**: Monitor if high-priority pages are crawled more frequently
- **Content Performance**: Track performance of documentation and technical pages

## Future Enhancements

Consider implementing:

1. **Dataset-specific sitemaps**: Separate sitemaps for different dataset categories
2. **Content-specific sitemaps**: Separate sitemaps for different content types (docs, technical, catalogs)
3. **RSS feeds**: For dataset updates and new additions
4. **Enhanced structured data**: Add more specific dataset properties
5. **Performance optimization**: Implement ISR (Incremental Static Regeneration) for popular datasets and content
6. **Content analytics**: Track which content pages perform best in search
7. **Dynamic priority adjustment**: Automatically adjust priorities based on user engagement
8. **Content freshness tracking**: Monitor content update frequency and adjust change frequency accordingly
