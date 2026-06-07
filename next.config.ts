import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 768, 1024, 1280, 1536],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  output: 'standalone',
  transpilePackages: ['motion'],
  productionBrowserSourceMaps: false,
  compiler: {
    removeConsole: {
      exclude: ['error', 'warn'],
    },
  },
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'Link',
          value: '</fonts/Inter-Variable.woff2>; rel=preload; as=font; type=font/woff2; crossorigin=anonymous',
        },
      ],
    },
  ],
  webpack: (config, {dev}) => {
    if (dev && process.env.DISABLE_HMR === 'true') {
      config.watchOptions = {
        ignored: /.*/,
      };
    }
    return config;
  },
};

export default nextConfig;
