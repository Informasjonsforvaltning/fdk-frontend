import { NextRequest, NextResponse } from 'next/server';
import { i18n, Locale } from '@fdk-frontend/dictionaries';

export const middleware = (request: NextRequest) => {
    const devMode = process.env.NODE_ENV === 'development';

    // Get the pathname and remove basePath
    const basePath = '/next/home';
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
    const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
    const cspHeader = `
        default-src 'self';
        script-src 'self' 'nonce-${nonce}' 'strict-dynamic' 'unsafe-eval';
        style-src 'self' 'nonce-${nonce}';
        img-src 'self' blob: data: https://cache.kartverket.no;
        font-src 'self';
        connect-src 'self' ${process.env.FDK_LLM_SEARCH_BASE_URI || ''};
        object-src 'none';
        base-uri 'self';
        form-action 'self';
        frame-ancestors 'none';
        ${devMode ? '' : 'upgrade-insecure-requests'};
    `;
    // Replace newline characters and spaces
    const contentSecurityPolicyHeaderValue = cspHeader.replace(/\s{2,}/g, ' ').trim();

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-nonce', nonce);
    requestHeaders.set('Content-Security-Policy', contentSecurityPolicyHeaderValue);

    const response = NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });
    response.headers.set('Content-Security-Policy', contentSecurityPolicyHeaderValue);
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
