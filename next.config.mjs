import path from 'path'

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    productionBrowserSourceMaps: false,
    eslint: {
        ignoreDuringBuilds: true,
    },
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'fpt.com',
                port: '',
            },
            {
                protocol: 'https',
                hostname: '**',
                port: '',
            },
        ],
    },
    webpack: (config) => {
        config.cache = {
            type: 'filesystem',
            cacheDirectory: path.resolve('.next/cache/webpack'),
            maxMemoryGenerations: 1,
        };
        return config;
    },
}

export default nextConfig
