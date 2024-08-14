import { NextRequest, NextResponse } from 'next/server';
import { i18n, Locale } from '@fdk-frontend/dictionaries';

export const middleware = (request: NextRequest) => {
    // Get the pathname and remove basePath
    const basePath = '/forms';
    const pathname = request.nextUrl.pathname;
    if (
        [
            '/manifest.json',
            '/favicon.ico',
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
            new URL(basePath + `/${i18n.defaultLocale}${pathname.startsWith('/') ? '' : '/'}${pathname}`, request.url),
        );
    }
    return null;
};

export const config = {
    // Matcher ignoring `/_next/` and `/api/`
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)', { source: '/' }],
};
