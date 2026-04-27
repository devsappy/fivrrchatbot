// Notify IndexNow (Bing, Yandex, Seznam, Naver, and downstream including
// ChatGPT/Copilot search) that the site has been updated. Run after each
// production deploy:  npm run indexnow
//
// IndexNow key is hosted at https://www.chatterify.in/<KEY>.txt and verified
// by the IndexNow API on every submission.

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.resolve(__dirname, '..', 'public');

const HOST = 'www.chatterify.in';
const KEY = '978ca135024b22680ff242588389e915';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const ENDPOINT = 'https://api.indexnow.org/IndexNow';

async function readSitemapUrls() {
  const sitemap = await fs.readFile(path.join(PUBLIC_DIR, 'sitemap.xml'), 'utf8');
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  return [...new Set(urls)];
}

async function main() {
  const urls = await readSitemapUrls();
  if (urls.length === 0) {
    console.error('[indexnow] No URLs found in sitemap.xml');
    process.exit(1);
  }
  console.log(`[indexnow] Submitting ${urls.length} URLs to ${ENDPOINT}`);

  const body = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  };

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  });

  const text = await res.text();
  console.log(`[indexnow] HTTP ${res.status} ${res.statusText}`);
  if (text) console.log(`[indexnow] Response: ${text.slice(0, 500)}`);

  // 200 = accepted; 202 = received but key still being verified.
  if (res.status >= 400) {
    console.error('[indexnow] Submission failed.');
    process.exit(1);
  }
  console.log('[indexnow] Done.');
}

main().catch((err) => {
  console.error('[indexnow] Error:', err.message || err);
  process.exit(1);
});
