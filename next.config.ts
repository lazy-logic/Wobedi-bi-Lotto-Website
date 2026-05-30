import type { NextConfig } from "next";

const config: NextConfig = {
  // Self-contained server build for VM deploys. Output goes to
  // .next/standalone/ — copy that + .next/static + public/ to the server
  // and run `node server.js`. See deploy/README.md.
  output: "standalone",
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default config;
