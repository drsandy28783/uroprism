import { createServer } from 'http';
import { readFileSync, existsSync, statSync } from 'fs';
import { join, extname, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;
const clientDir = join(__dirname, 'dist', 'client');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.json': 'application/json',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
};

// Serve a file directly from dist/client; returns true if served.
function tryServeStatic(urlPath, res) {
  try {
    const filePath = join(clientDir, decodeURIComponent(urlPath));
    if (existsSync(filePath) && statSync(filePath).isFile()) {
      const content = readFileSync(filePath);
      const ext = extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';
      // Hashed assets can be cached forever; HTML should revalidate
      const cacheControl =
        ext === '.html' ? 'no-cache' : 'public, max-age=31536000, immutable';
      res.writeHead(200, { 'Content-Type': contentType, 'Cache-Control': cacheControl });
      res.end(content);
      return true;
    }
  } catch {
    // fall through to SSR
  }
  return false;
}

// Mock Cloudflare ASSETS binding so the worker can resolve static files
const mockAssets = {
  fetch: async (input) => {
    const reqUrl = typeof input === 'string' ? input : input.url;
    const pathname = new URL(reqUrl).pathname;
    const filePath = join(clientDir, decodeURIComponent(pathname));
    if (existsSync(filePath) && statSync(filePath).isFile()) {
      const content = readFileSync(filePath);
      const ext = extname(filePath).toLowerCase();
      return new Response(content, {
        headers: { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' },
      });
    }
    return new Response('Not Found', { status: 404 });
  },
};

// Import the worker
const workerModule = await import('./dist/server/index.js');
const worker = workerModule.default;

// Adapter: Cloudflare Worker → Node.js HTTP
const server = createServer(async (req, res) => {
  try {
    const urlPath = (req.url || '/').split('?')[0];

    // 1. Serve static assets directly (JS, CSS, fonts, images…)
    if (tryServeStatic(urlPath, res)) return;

    // 2. Forward everything else to the SSR worker
    const url = `http://${req.headers.host}${req.url}`;

    let body = null;
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      body = await new Promise((resolve) => {
        const chunks = [];
        req.on('data', (chunk) => chunks.push(chunk));
        req.on('end', () => resolve(Buffer.concat(chunks)));
      });
    }

    const request = new Request(url, {
      method: req.method,
      headers: req.headers,
      body,
    });

    // Pass mock env with ASSETS binding
    const response = await worker.fetch(request, { ASSETS: mockAssets });

    res.statusCode = response.status;
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    if (response.body) {
      const reader = response.body.getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        res.write(value);
      }
    }
    res.end();
  } catch (error) {
    console.error('Server error:', error);
    res.statusCode = 500;
    res.end('Internal Server Error');
  }
});

// Listen on 0.0.0.0 so Render can reach the port
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
