/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: '68.183.241.6',
                port: '',
                pathname: '/uploads/**',
            },
        ],
    },
};

module.exports = nextConfig;
