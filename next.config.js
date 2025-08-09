/** @type {import('next').NextConfig} */
const nextConfig = {
    /* config options here */
    output: "standalone",
    images: {
        unoptimized: true,
        domains: ["lh3.googleusercontent.com", "avatars.githubusercontent.com"],
    },
};

export default nextConfig;
