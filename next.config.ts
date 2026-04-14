import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

/**
 * Next.js 설정 파일
 * 
 * @description
 * Next.js 애플리케이션의 구성을 정의합니다.
 * 
 * 주요 설정:
 * - next-intl 플러그인 통합: 다국어(i18n) 지원을 위한 플러그인
 *   - 설정 파일: ./src/i18n/request.ts
 * 
 * @see https://nextjs.org/docs/app/api-reference/next-config-js
 */
const withNextIntl = createNextIntlPlugin('./src/i18n/config.ts');

const nextConfig: NextConfig = {
  skipTrailingSlashRedirect: true,
  output: 'standalone',




  async headers() {
    return [
      {
        // WebP 이미지에 올바른 Content-Type 헤더 설정
        source: '/:path*.webp',
        headers: [
          {
            key: 'Content-Type',
            value: 'image/webp',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // 다른 이미지 포맷도 명시적으로 설정
        source: '/:path*.jpg',
        headers: [
          {
            key: 'Content-Type',
            value: 'image/jpeg',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*.jpeg',
        headers: [
          {
            key: 'Content-Type',
            value: 'image/jpeg',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*.png',
        headers: [
          {
            key: 'Content-Type',
            value: 'image/png',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*.svg',
        headers: [
          {
            key: 'Content-Type',
            value: 'image/svg+xml',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  async redirects() {
    return [
      {
        source: '/blanche',
        destination: '/special/laminate',
        permanent: true,
      },
      {
        source: '/blanche/',
        destination: '/special/laminate',
        permanent: true,
      },
      {
        source: '/price.php',
        destination: '/price',
        permanent: true,
      },
      {
        source: '/bbs/content.php',
        has: [
          {
            type: 'query',
            key: 'co_id',
            value: 'privacy',
          },
        ],
        destination: '/privacy',
        permanent: true,
      },
    ];
  },

  images: {
    unoptimized: true,
    qualities: [75],
    formats: ['image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.blanche.kr',
        pathname: '/wp-content/**',
      },
      {
        protocol: 'https',
        hostname: 'www.blanche.kr',
        pathname: '/blog/wp-content/**',
      },
      {
        protocol: 'https',
        hostname: 'blanche.kr',
        pathname: '/wp-content/**',
      },
      {
        protocol: 'https',
        hostname: 'blanche.kr',
        pathname: '/blog/wp-content/**',
      },
      {
        protocol: 'https',
        hostname: 'blanche-backend--blanche-backend-d9526.asia-east1.hosted.app',
        pathname: '/wp-content/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/wp-content/**',
      },
      {
        protocol: 'https',
        hostname: 'wp.blanche.kr',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'wp.blanche.kr',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'blanche-backend--blanche-backend-d9526.asia-east1.hosted.app',
        pathname: '/**',
      },
    ],
  },
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  experimental: {
    optimizePackageImports: [
      '@tabler/icons-react',
      'framer-motion',
      'lucide-react',
    ],
  },
  webpack: (config, { isServer, dev }) => {
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push({
        'firebase/app': 'commonjs firebase/app',
        'firebase/firestore': 'commonjs firebase/firestore',
      });
    }

    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        moduleIds: 'deterministic',
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              priority: 10,
              reuseExistingChunk: true,
            },
            common: {
              minChunks: 2,
              priority: 5,
              reuseExistingChunk: true,
            },
          },
        },
      };
    }

    return config;
  },
};

export default withNextIntl(nextConfig);
