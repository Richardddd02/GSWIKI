import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const port = Number(process.env.PORT || 4174);
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml"
};

createServer(async (request, response) => {
  try {
    const url = new URL(request.url || "/", "http://localhost");
    const requested = decodeURIComponent(url.pathname === "/" ? "/index.html" : url.pathname);
    const safePath = normalize(requested).replace(/^(\.\.(\/|\\|$))+/, "");
    const file = join(root, safePath);
    if (!file.startsWith(root)) throw new Error("invalid path");
    const info = await stat(file);
    if (!info.isFile()) throw new Error("not a file");
    response.writeHead(200, {
      "Content-Type": types[extname(file).toLowerCase()] || "application/octet-stream",
      "Cache-Control": "no-cache"
    });
    createReadStream(file).pipe(response);
  } catch {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
  }
}).listen(port, "127.0.0.1", () => {
  console.log(`古神编年史：http://127.0.0.1:${port}`);
});
