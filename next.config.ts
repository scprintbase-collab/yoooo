import type { NextConfig } from "next";

const staticExport = process.env.STATIC_EXPORT === "true";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  allowedDevOrigins: ["127.0.0.1"],
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
  ...(staticExport ? {
    output: "export",
    trailingSlash: true,
    images: { unoptimized: true },
  } : {}),
};

export default nextConfig;
