/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'zioubtrogrffardzmvag.supabase.co',
        pathname: '/storage/v1/object/public/image/**', // This should match the "images" folder in Supabase
      },
    ],
    unoptimized: true
  },
};

module.exports = nextConfig;
