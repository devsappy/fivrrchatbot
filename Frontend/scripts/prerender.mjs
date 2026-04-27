// Prerender every public route to static HTML so that crawlers (Googlebot,
// GPTBot, PerplexityBot, ClaudeBot, etc.) receive fully-rendered pages
// instead of an empty <div id="root">.
//
// Pipeline:
//   1. Spin up a tiny static server pointed at build/.
//   2. Use Puppeteer to load each route, wait for React to render.
//   3. Strip dynamic chrome (open chatbot, focused inputs) and snapshot HTML.
//   4. Write build/<route>/index.html so Vercel serves it directly.

import http from 'node:http';
import path from 'node:path';
import fs from 'node:fs';
import fsp from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BUILD_DIR = path.resolve(__dirname, '..', 'build');
const PORT = 4173;
const HOST = `http://127.0.0.1:${PORT}`;

const ROUTES = [
  '/',
  '/services',
  '/services/web-development',
  '/services/chatbot-integration',
  '/services/voice-agents',
  '/services/app-development',
  '/services/video-editing',
  '/services/saas-development',
  '/services/mvp-development',
  '/services/ecommerce-development',
  '/templates',
  '/about',
  '/contact',
  '/blog',
  '/blog/1',
  '/blog/2',
  '/blog/3',
  '/blog/4',
  '/blog/5',
  '/blog/6',
  '/team/dipanjan',
  '/team/rajatava',
  '/team/saptarshi',
];

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
};

function startServer() {
  return new Promise((resolve, reject) => {
    const server = http.createServer(async (req, res) => {
      try {
        const urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
        let filePath = path.join(BUILD_DIR, urlPath);
        if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
          const candidate = path.join(filePath, 'index.html');
          filePath = fs.existsSync(candidate) ? candidate : path.join(BUILD_DIR, 'index.html');
        }
        const ext = path.extname(filePath).toLowerCase();
        const contentType = MIME[ext] || 'application/octet-stream';
        const data = await fsp.readFile(filePath);
        res.writeHead(200, { 'Content-Type': contentType, 'Cache-Control': 'no-store' });
        res.end(data);
      } catch (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not found');
      }
    });
    server.on('error', reject);
    server.listen(PORT, '127.0.0.1', () => resolve(server));
  });
}

async function snapshotRoute(browser, route) {
  const page = await browser.newPage();
  await page.setUserAgent('Chatterify-Prerender/1.0 (+puppeteer)');
  await page.setViewport({ width: 1280, height: 900 });

  await page.goto(`${HOST}${route}`, { waitUntil: 'networkidle0', timeout: 45000 });

  // Wait for React tree to mount.
  await page.waitForSelector('#root > *', { timeout: 15000 });

  // Let framer-motion / GSAP entrance animations settle so the snapshot
  // captures the post-animation DOM rather than the off-screen initial state.
  await new Promise((r) => setTimeout(r, 1800));

  // Force any open overlays (chatbot, modals) closed so the snapshot reflects
  // the default first-paint state for organic visitors.
  await page.evaluate(() => {
    document.body.style.overflow = '';
    document.querySelectorAll('[data-chatbot-open="true"]').forEach((el) => {
      el.removeAttribute('data-chatbot-open');
    });
  });

  // Mark this HTML as a prerender so React hydration can decide how to behave.
  await page.evaluate(() => {
    document.documentElement.setAttribute('data-prerendered', 'true');
  });

  const html = await page.content();
  await page.close();
  return html;
}

async function writeRoute(route, html) {
  const outDir = route === '/' ? BUILD_DIR : path.join(BUILD_DIR, route);
  await fsp.mkdir(outDir, { recursive: true });
  await fsp.writeFile(path.join(outDir, 'index.html'), html, 'utf8');
}

async function main() {
  if (!fs.existsSync(BUILD_DIR)) {
    console.error('[prerender] build/ does not exist. Run `npm run build` first.');
    process.exit(1);
  }

  const server = await startServer();
  console.log(`[prerender] Serving build/ on ${HOST}`);

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
    });
    console.log(`[prerender] Snapshotting ${ROUTES.length} routes...`);

    let ok = 0;
    let failed = 0;
    for (const route of ROUTES) {
      const start = Date.now();
      try {
        const html = await snapshotRoute(browser, route);
        await writeRoute(route, html);
        const ms = Date.now() - start;
        console.log(`[prerender] OK   ${route.padEnd(40)} ${ms}ms ${html.length} bytes`);
        ok++;
      } catch (err) {
        failed++;
        console.error(`[prerender] FAIL ${route} — ${err.message}`);
      }
    }
    console.log(`[prerender] Done. ${ok} ok, ${failed} failed.`);
    if (failed > 0) process.exitCode = 1;
  } finally {
    if (browser) await browser.close();
    server.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
