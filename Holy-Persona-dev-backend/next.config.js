/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Disable the Next.js button in the bottom-left corner
  devIndicators: {
    buildActivity: false,
    buildActivityPosition: 'bottom-right',
  },
};

module.exports = nextConfig; 