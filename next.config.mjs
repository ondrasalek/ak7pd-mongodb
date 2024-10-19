/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        DATA_API_KEY: process.env.DATA_API_KEY,
        DATA_API_URL: process.env.DATA_API_URL,
        MONGODB_URI: process.env.MONGODB_URI,
        GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
        GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    },
};

export default nextConfig;
