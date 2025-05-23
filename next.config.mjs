/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {},
    reactStrictMode: false,
    eslint: {
        ignoreDuringBuilds: true,
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
}

export default nextConfig
