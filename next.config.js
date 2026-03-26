/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
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
    'apnic-pharmaceutical-rev-transition.trycloudflare.com'
  ],

  // 配置内容安全策略（移除严格限制以支持隧道访问）
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob: https:",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob: https: 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline' https:",
              "img-src 'self' data: blob: https: http:",
              "font-src 'self' data: https:",
              "connect-src 'self' data: blob: https: http: ws: wss: 'unsafe-inline'",
              "worker-src 'self' blob:",
              "frame-src 'self' https:",
              "base-uri 'self' https:",
            ].join('; ')
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
