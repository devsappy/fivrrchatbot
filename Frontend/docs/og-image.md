# Open Graph image — what to create and where it goes

The site currently uses `/logo.png` (square, 512×512) as the social share image.
That's the wrong shape and wastes real estate on Facebook, LinkedIn, X, Slack,
WhatsApp, and Discord — they all crop to a 1.91:1 (≈1200×630) landscape card.
A proper OG image typically lifts share-CTR by 30–60% based on internal A/B
tests across SaaS sites.

## Specs

- **Dimensions:** 1200 × 630 px (Facebook, LinkedIn, Slack, WhatsApp default)
- **Format:** PNG (preferred) or JPG with quality ≥ 85
- **Max file size:** 8 MB hard limit, target ≤ 300 KB
- **Safe zone:** keep all critical text inside the centered 1080 × 540 region —
  some platforms crop ~5% on each edge
- **Min text size:** 60 px so the headline reads at thumbnail scale

## What to put on it

1. **The headline:** "Web Development & AI Agency" or
   "Custom Websites · AI Chatbots · Voice Agents"
2. **The brand:** Chatterify wordmark (top-left or bottom-right)
3. **Visual anchor:** product screenshot, abstract gradient, or mascot
4. **A trust signal (optional):** "Trusted by 120+ teams" or "From ₹5,000"
5. **Avoid:** small text, low-contrast colors, watermarked stock photos

## Where to drop it

Save as **`Frontend/public/og-image.png`**. The build pipeline copies
`public/*` to `build/*` automatically, so it will be served at
`https://www.chatterify.in/og-image.png`.

## Then update these references

In `Frontend/public/index.html`, find these three meta tags and change
`logo.png` → `og-image.png`:

```html
<meta property="og:image" content="https://www.chatterify.in/og-image.png" />
<meta property="og:image:secure_url" content="https://www.chatterify.in/og-image.png" />
<meta name="twitter:image" content="https://www.chatterify.in/og-image.png" />
```

Also update width/height:
```html
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
```

## Per-page OG images (next-level)

Each high-value page (services, blog posts, team pages) should ideally have its
own OG image. The `SEO` component already accepts an `ogImage` prop — pass a
unique URL per page once the assets are created. Recommended files:

- `og-home.png`
- `og-services.png`
- `og-saas.png`, `og-mvp.png`, `og-ecommerce.png`
- `og-web-development.png`, `og-chatbot.png`, `og-voice-agents.png`
- `og-blog.png` (default for blog posts; per-post is better)

## Tools to make these fast

- **Figma** — free template at figma.com/community search "Open Graph 1200x630"
- **Canva** — has OG presets in the Designs menu
- **Vercel OG** — generate dynamically from React JSX:
  https://vercel.com/docs/functions/og-image-generation
- **og-impact.com** — paste a URL, generate cards with templates

## Verify after deploy

- Facebook Sharing Debugger: https://developers.facebook.com/tools/debug/
- LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/
- X (Twitter) Card Validator: https://cards-dev.twitter.com/validator
- OpenGraph.xyz: https://www.opengraph.xyz/

The first two cache aggressively — paste your URL and click "Scrape Again" or
"Inspect" to refresh after you change the image.
