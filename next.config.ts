import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/cat-simulator/:path*",
        destination: "/lab/cat-simulator/:path*",
        permanent: true,
      },
      {
        source: "/cat-bkn/:path*",
        destination: "/lab/cat-simulator/:path*",
        permanent: true,
      },
      {
        source: "/cpns/:path*",
        destination: "/lab/cat-simulator/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
