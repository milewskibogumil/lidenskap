import { defineConfig } from "astro/config";
import preact from '@astrojs/preact';
import vercel from "@astrojs/vercel";
import { DOMAIN } from "./src/global/constants";
import { isPreviewDeployment } from "./src/utils/is-preview-deployment";
import redirects from "./redirects";

export default defineConfig({
  site: DOMAIN,
  integrations: [
    preact({ compat: true }),
  ],
  image: {
    remotePatterns: [{
      protocol: "https",
      hostname: "cdn.sanity.io"
    }],
  },
  vite: {
    ssr: {
      noExternal: ['react-hook-form', 'fslightbox']
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern",
        }
      }
    }
  },
  prefetch: {
    prefetchAll: true
  },
  redirects: redirects,
  output: isPreviewDeployment ? "server" : "static",
  adapter: vercel({}),
});
