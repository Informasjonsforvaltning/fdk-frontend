import { NextRequest, NextResponse } from 'next/server';
import { i18n, Locale } from '@fdk-frontend/dictionaries';

export const middleware = (request: NextRequest) => {
    const devMode = process.env.NODE_ENV === 'development';

    // Get the pathname and remove basePath
    const basePath = '';
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

    // Content Security Policy    
    const requestHeaders = new Headers(request.headers);
    const response = NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });
    const nonce = request.headers.get('x-nonce') ?? ''
    response.cookies.set('nonce', nonce, { httpOnly: false, secure: !devMode, sameSite: 'strict' });

    return response;
};

export const config = {
    // Matcher ignoring `/_next/` and `/api/`
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)', { source: '/' }],
    missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
    ],
};
