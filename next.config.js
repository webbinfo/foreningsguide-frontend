/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cms.foreningsguide.studentlivet.se',
                port: '',
                pathname: '/uploads/**',
            },
            {
                protocol: 'https',
                hostname: 'www.cms.foreningsguide.studentlivet.se',
                port: '',
                pathname: '/uploads/**',
            },
            {
                protocol: 'http',
                hostname: '68.183.241.6',
                port: '',
                pathname: '/uploads/**',
            },
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '1337',
                pathname: '/uploads/**'
            }
        ],
    },
};

module.exports = nextConfig;
