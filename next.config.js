/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,

  // 允许所有域名访问开发服务器（用于 Cloudflare Tunnel 和 ngrok）
  allowedDevOrigins: [
    'https://*.trycloudflare.com',
    'https://*.ngrok-free.app',
    'https://*.ngrok.io',
    'http://*.ngrok.io',
    'http://192.168.1.*',
    'genius-truck-camp-file.trycloudflare.com',
    'amp-environmental-declare-animals.trycloudflare.com',
    'kodak-bridge-friends-due.trycloudflare.com'
  ],

  // 配置内容安全策略（移除严格限制以支持隧道访问）
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value:
              "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob: https: http: ws: wss: *; " +
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob: https: http: ws: wss: *; " +
              "style-src 'self' 'unsafe-inline' https: http: data: *; " +
              "img-src 'self' data: blob: https: http: *; " +
              "font-src 'self' data: https: http: *; " +
              "connect-src 'self' data: blob: https: http: ws: wss: *; " +
              "worker-src 'self' blob: *; " +
              "frame-src 'self' https: http: *; " +
              "base-uri 'self' https: http: *; " +
              "form-action 'self' https: http: *; " +
              "object-src 'none'; " +
              "base-uri 'self';"
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: '*'
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS'
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization'
          }
        ],
      },
    ];
  },

  // 禁用严格的安全策略以支持 Turbopack 和隧道
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
};

module.exports = nextConfig;
