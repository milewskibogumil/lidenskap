import { defineConfig } from "astro/config";
import preact from '@astrojs/preact';
import vercel from "@astrojs/vercel";
import { DOMAIN } from "./src/global/constants";
import redirects from "./redirects";
import { isProductionDeployment } from "./src/utils/is-production-deployment";

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
  output: 'server',
  adapter: vercel({
    ...(isProductionDeployment && {
      isr: {
        bypassToken: process.env.VERCEL_DEPLOYMENT_ID,
        exclude: ['/api/contact']
      }
    })
  }),
});
