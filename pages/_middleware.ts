// checks cookie to see if the user has a valid access token and redirects to the sign in page if no token is found.
import { NextResponse } from 'next/server'

const signedinPages = ['/', '/playlist', '/library']

export default function middleware(req) {
  if (signedinPages.find((p) => p === req.nextUrl.pathname)) {
    const token = req.cookies.MP_ACCESS_TOKEN

    if (!token) {
      return NextResponse.redirect(new URL('/signin', req.url))
    }
  }
}
