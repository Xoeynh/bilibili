/** @type {import('next').NextConfig} */

const securityHeaders = [
  // xxs保护
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  }
];

const nextConfig = {
  basePath: process.env.NEXT_PUBLIC_BASE_URL,
  // 资产资源前缀
  assetPrefix: process.env.NEXT_PUBLIC_BASE_URL,
  reactStrictMode: true,
  swcMinify: true,
  // 图片基础路径
  images: {
    domains: ['www.xlz122.cn']
  },
  // 跨域
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_BASE_URL}/:path*`
      }
    ]
  },
  // 删除所有console.*
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? true : false
  },
  // 安全标头
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  }
};

module.exports = nextConfig;
