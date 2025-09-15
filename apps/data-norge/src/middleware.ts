import { NextRequest, NextResponse } from 'next/server';
import { i18n, Locale } from '@fdk-frontend/dictionaries';
import { isCanonicalDomain } from './utils/domain';

export const middleware = (request: NextRequest) => {
    // Get the pathname and remove basePath
    const basePath = '/';
    const pathname = request.nextUrl.pathname;

    if (
        [
            '/manifest.json',
            '/favicon.ico',
            '/icon0.svg',
            '/icon1.png',
            '/apple-icon.png',
            '/web-app-manifest-192x192.png',
            '/web-app-manifest-512x512.png',
            '/robots.txt',
            '/sitemap.xml',
            // Your other files in `public`
        ].includes(pathname)
    ) {
        return NextResponse.next();
    }

    // Check if there is any supported locale in the pathname
    const pathnameIsMissingLocale = i18n.locales.every(
        (locale: Locale) => !pathname.startsWith(`/${locale.code}/`) && pathname !== `/${locale.code}`,
    );

    // Redirect if there is no locale
    if (pathnameIsMissingLocale) {
        return NextResponse.redirect(
            new URL(`${basePath}${i18n.defaultLocale}${pathname.startsWith('/') ? '' : '/'}${pathname}`, request.url),
        );
    }

    // Add X-Robots-Tag header based on domain logic (same as robots.txt)
    const response = NextResponse.next();

    if (isCanonicalDomain()) {
        // Allow crawling on canonical domain
        response.headers.set('X-Robots-Tag', 'index, follow');
    } else {
        // Block crawling on non-canonical domains (staging, demo, development)
        response.headers.set('X-Robots-Tag', 'noindex, nofollow');
    }

    return response;
};

export const config = {
    // Matcher ignoring `/_next/` and `/api/`
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.png|favicon-16x16.png|favicon-32x32.png|apple-touch-icon.png).*)',
        { source: '/' },
    ],
    missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
    ],
};
