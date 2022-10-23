/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.NEXT_PUBLIC_BASE_URL,
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
  }
};

module.exports = nextConfig;
