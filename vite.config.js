import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import fs from "fs";
import { config } from "dotenv";
config();

export default defineConfig({
  plugins: [
    react(),
    {
      name: "serve-forms-and-api",
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          // Servir archivos .jform locales
          if (req.url && req.url.startsWith("/forms/") && req.url.endsWith(".jform")) {
            const filePath = resolve(__dirname, req.url.slice(1));
            if (fs.existsSync(filePath)) {
              res.setHeader("Content-Type", "application/json");
              res.end(fs.readFileSync(filePath, "utf-8"));
              return;
            }
          }

          // Proxy de API functions para desarrollo local
          if (req.url && req.url.startsWith("/api/")) {
            const apiName = req.url.split("?")[0].replace("/api/", "");
            const apiFile = resolve(__dirname, `api/${apiName}.js`);
            if (fs.existsSync(apiFile)) {
              const chunks = [];
              req.on("data", (chunk) => chunks.push(chunk));
              req.on("end", async () => {
                try {
                  const rawBody = Buffer.concat(chunks);
                  const ct = req.headers["content-type"] || "";
                  if (ct.includes("application/json")) {
                    try { req.body = JSON.parse(rawBody.toString("utf-8")); } catch { req.body = {}; }
                  } else {
                    // Para multipart y otros, pasar el Buffer crudo
                    req.body = rawBody;
                  }
                  const mod = await import(`${apiFile}?t=${Date.now()}`);
                  const handler = mod.default;
                  if (!res.status) {
                    res.status = (code) => { res.statusCode = code; return res; };
                  }
                  if (!res.json) {
                    res.json = (data) => {
                      if (!res.headersSent) {
                        res.setHeader("Content-Type", "application/json");
                        res.end(JSON.stringify(data));
                      }
                    };
                  }
                  await handler(req, res);
                } catch (err) {
                  if (!res.headersSent) {
                    res.statusCode = 500;
                    res.setHeader("Content-Type", "application/json");
                    res.end(JSON.stringify({ error: err.message }));
                  }
                }
              });
              return;
            }
          }

          next();
        });
      },
    },
  ],
});
