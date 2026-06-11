/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // Sanity asset CDN serves post images (auto WebP/AVIF, resized via urlFor).
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.sanity.io',
                pathname: '/images/**',
            },
        ],
    },
    pageExtensions: ["tsx", "ts"],
    turbopack: {
        rules: {
            '*.svg': {
                loaders: ["@svgr/webpack"],
                as: '*.js'
            },
            '*.yml': {
                loaders: ["yaml-loader"],
                as: "*.json",
            }
        }
    }
};

module.exports = nextConfig;
