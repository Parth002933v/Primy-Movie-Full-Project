// middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { globalFetcher2 } from './utils/fetcher';
import { gql } from '@apollo/client';
import { cookies } from 'next/headers';


export function middleware(request: NextRequest) {
    // Extract _auth cookie
    const authCookie = request.cookies.get('_auth');

    // Log the current URL for debugging
    // console.log('Current URL:', request.url);

    // If the request is for the /login page, allow it without further checks
    if (request.nextUrl.pathname === '/login') {
        // console.log('Accessing /login, no auth check required.');
        return NextResponse.next();
    }

    // If no _auth cookie, redirect to the login page
    if (!authCookie) {
        // console.log('No _auth cookie found. Redirecting to /login.');
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // If the _auth cookie is present, allow access to the requested page
    // console.log('Valid _auth cookie found. Proceeding to requested page.');
    return NextResponse.next();
}


export const config = {
    // Apply middleware to all routes
    matcher: '/((?!api|_next|static|favicon.ico).*)',
};
