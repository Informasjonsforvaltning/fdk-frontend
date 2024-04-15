
import { NextRequest, NextResponse } from 'next/server';
import { i18n, getLocale, Locale } from '@fdk-frontend/dictionaries';

export const middleware = (request: NextRequest) => {
  const pathname = request.nextUrl.pathname;
  // // `/_next/` and `/api/` are ignored by the watcher, but we need to ignore files in `public` manually.
  // // If you have one
  // if (
  //   [
  //     '/manifest.json',
  //     '/favicon.ico',
  //     // Your other files in `public`
  //   ].includes(pathname)
  // )
  //   return

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale: Locale) => (!pathname.startsWith(`/${locale.code}/`) && pathname !== `/${locale.code}`),
  );
  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return NextResponse.redirect(new URL(`/${locale?.code}${pathname.startsWith('/') ? '' : '/'}${pathname}`, request.url));
  }
  return null;
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
