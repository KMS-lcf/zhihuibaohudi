import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // 设置非常宽松的CSP以支持Cloudflare Tunnel和所有JavaScript功能
  const cspHeader = [
    "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob: https: http: ws: wss: *",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob: https: http: ws: wss: *",
    "style-src 'self' 'unsafe-inline' https: http: data: *",
    "img-src 'self' data: blob: https: http: *",
    "font-src 'self' data: https: http: *",
    "connect-src 'self' data: blob: https: http: ws: wss: *",
    "worker-src 'self' blob: *",
    "frame-src 'self' https: http: *",
    "object-src 'none'",
    "base-uri 'self' https: http: *",
    "form-action 'self' https: http: *",
  ].join('; ')

  const response = NextResponse.next()

  // 设置CSP header
  response.headers.set('Content-Security-Policy', cspHeader)

  // 设置CORS headers以支持所有域名
  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
