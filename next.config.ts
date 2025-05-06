import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/Source_Skyboxes_NextJS",
  assetPrefix: "/Source_Skyboxes_NextJS",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
