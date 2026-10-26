/** @type {import('next').NextConfig} */
// Enable static HTML export only when NEXT_EXPORT=true (keeps dev server behavior normal)
const path = require("node:path");
const projectRoot = path.dirname(require.resolve("./package.json"));

const nextConfig = {
  ...(process.env.NEXT_EXPORT === 'true' ? { output: 'export' } : {}),
  devIndicators: false,

  turbopack: {
    root: projectRoot,
  },

  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/photo-*",
      },
    ],
  },
};

module.exports = nextConfig;