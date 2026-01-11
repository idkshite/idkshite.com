/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [],
        // Optional: configure remotePatterns if you need to load images from external domains
        // remotePatterns: [
        //   {
        //     protocol: 'https',
        //     hostname: 'example.com',
        //     pathname: '/images/**',
        //   },
        // ],
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
