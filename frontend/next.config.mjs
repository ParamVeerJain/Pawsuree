/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'placedog.net' },
      { protocol: 'https', hostname: 'cataas.com' },
    ],
  },
};
export default nextConfig;
