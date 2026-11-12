import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import netlify from "@netlify/vite-plugin-tanstack-start";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function devStylesMimeFix(): Plugin {
  return {
    name: "dev-styles-mime-fix",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (
          req.url &&
          req.url.startsWith("/src/styles.css") &&
          !req.url.includes("?direct") &&
          !req.url.includes("?import") &&
          !req.url.includes("?html-proxy")
        ) {
          req.url = req.url.includes("?") ? `${req.url}&direct` : `${req.url}?direct`;
        }
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [
    devStylesMimeFix(),
    tailwindcss(),
    tanstackStart({
      server: { entry: "server" },
      importProtection: {
        behavior: "error",
        client: {
          files: ["**/server/**"],
          specifiers: ["server-only"],
        },
      },
    }),
    react(),
    netlify(),
  ],
  resolve: {
    tsconfigPaths: true,
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "@tanstack/react-query",
      "@tanstack/query-core",
    ],
  },
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-dom/client",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
    ],
    ignoreOutdatedRequests: true,
  },
  server: {
    host: true,
    port: 8080,
  },
});
