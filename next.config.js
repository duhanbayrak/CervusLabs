/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
    ],
    // Fallback for older Next.js versions
    domains: ["lh3.googleusercontent.com"],
  },
};

module.exports = nextConfig;
