import { defineConfig } from "astro/config";
import preact from '@astrojs/preact';
import vercel from "@astrojs/vercel";
import sitemap from "@astrojs/sitemap";
import { DOMAIN } from "./src/global/constants";
import { isPreviewDeployment } from "./src/utils/is-preview-deployment";
import redirects from "./redirects";

export default defineConfig({
  site: DOMAIN,
  integrations: [
    preact({ compat: true }),
    sitemap(),
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
  output: "server",
  adapter: vercel({
    ...(!isPreviewDeployment && {
      isr: {
        bypassToken: process.env.VERCEL_DEPLOYMENT_ID,
      }
    })
  }),
});
