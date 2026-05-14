import { createServer } from 'http';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;

// Import the worker
const workerModule = await import('./dist/server/index.js');
const worker = workerModule.default;

// Simple request adapter for Cloudflare Worker to Node.js
const server = createServer(async (req, res) => {
  try {
    // Create a Request object (Web API)
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

    // Call the worker
    const response = await worker.fetch(request, {
      // Mock Cloudflare env
    });

    // Send response back
    res.statusCode = response.status;

    // Copy headers
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    // Send body
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
    console.error('Error:', error);
    res.statusCode = 500;
    res.end('Internal Server Error');
  }
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
