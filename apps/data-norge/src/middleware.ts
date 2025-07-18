import { NextRequest, NextResponse } from 'next/server';
import { i18n, Locale } from '@fdk-frontend/dictionaries';

export const middleware = (request: NextRequest) => {
    // Get the pathname and remove basePath
    const basePath = '/';
    const pathname = request.nextUrl.pathname;

    if (
        [
            '/manifest.json',
            '/favicon.ico',
            '/favicon.png',
            '/favicon-16x16.png',
            '/favicon-32x32.png',
            '/favicon-48x48.png',
            '/apple-touch-icon.png',
            '/robots.txt',
            '/sitemap.xml',
            // Your other files in `public`
        ].includes(pathname)
    ) {
        return null;
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
