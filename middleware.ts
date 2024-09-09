
// See "Matching Paths" below to learn more
export const config = {
  matcher: [ '/employee/:path*', '/customer/:path*'],
}

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
// import { Storage } from './services/storage'
import { jwtDecode } from 'jwt-decode';
import { UserDataType } from '@/contexts/types';
// import { UserDataType } from './contexts/types';

export function middleware(request: NextRequest) {
    // const storage = Storage.getInstance()
    // const expString = storage.getExpire()
    // console.log(expString)
    const token = request.cookies.get('token'); // Assuming the token is stored in cookies
    if (!token) {
        // Token not present, redirect to home or login page
        return NextResponse.redirect(new URL('/', request.url));
    }
    let userInfo = jwtDecode(String(token.value)) as UserDataType

    // Decode the token to get expiration time
    // const decodedToken = jwt_decode(token);
    // const exp = token.value * 1000; // Convert to milliseconds
    // Check if token has expired
    const currentTime = Date.now();
    // console.log("currentTime: ", currentTime)
    // console.log("userInfo.exp: ", userInfo.exp*1000)

    if (userInfo.exp*1000 <= currentTime) {
        // Token has expired, redirect to home
        return NextResponse.redirect(new URL('/', request.url));
    }

    // Token is valid, allow request to proceed
    return NextResponse.next();
}
