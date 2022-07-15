/** @type {import('next').NextConfig} */
const nextConfig = async () => ({
    reactStrictMode: true,
    experimental: {
        images: {
            allowFutureImage: true,
        },
    },
    images: {
        domains: ['picsum.photos', 'raw.githubusercontent.com'],
    },
});

module.exports = nextConfig;
