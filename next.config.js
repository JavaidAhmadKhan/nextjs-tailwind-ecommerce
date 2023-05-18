/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      // {
      //   protocol: "https",
      //   hostname: "5.imimg.com",
      //   port: "",
      //   pathname: "/account123/**",
      // },
      {
        protocol: "https",
        hostname: "5.imimg.com",
      },
      {
        protocol: "https",
        hostname: "assets.ajio.com",
      },
      {
        protocol: "https",
        hostname: "images.meesho.com",
      },
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
      },
    ],
  },
};

module.exports = nextConfig;
