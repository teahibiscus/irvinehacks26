/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mvdxavqigmpftylclfjb.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/postcard-images/**",
      },
    ],
  },
};

export default nextConfig;
