# How to add real client reviews

Google flags review markup that isn't visible to users as deceptive. So the rule
is: **reviews must be on the page AND in JSON-LD, with matching content**. Don't
add JSON-LD reviews that don't appear visibly somewhere on the site.

## Step 1 — Build a visible Testimonials section on the homepage

Create a `Testimonials` component with at least 3–5 real client quotes. Each
needs the reviewer's full name, role/company, and a date. Display them between
the existing `Services` and `CoreValues` sections in `HomePage.tsx`.

Minimum data per review:
- Reviewer's full name (with permission)
- Role and company
- Date the review was given
- 5-star rating (or honest rating)
- Quote text (≥ 20 words to be useful)
- Optional: photo, logo, or LinkedIn link

## Step 2 — Add JSON-LD that matches what's visible

Once the section is on the page, paste this into the Organization @graph node
inside `Frontend/public/index.html`, right before the closing `}` of the
Organization object. Adjust counts and content to match your real reviews.

```json
"aggregateRating": {
  "@type": "AggregateRating",
  "ratingValue": "5.0",
  "bestRating": "5",
  "worstRating": "1",
  "ratingCount": "5",
  "reviewCount": "5"
},
"review": [
  {
    "@type": "Review",
    "author": { "@type": "Person", "name": "[Real Client Full Name]" },
    "datePublished": "2026-04-01",
    "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
    "reviewBody": "[Real client quote — at least 20 words. Must match what's on the page exactly.]",
    "publisher": { "@type": "Organization", "name": "Chatterify" }
  }
]
```

## Why we removed the placeholder rating

The earlier markup claimed `aggregateRating: 4.9 / 27 reviews` with no real
reviews on the page. Google's rich-results guidelines disallow that and may
trigger a manual action. The rating block has been removed and replaced with a
`knowsLanguage` field. Add the rating back as soon as you have real, visible
reviews.

## Where to gather reviews

- Google Business Profile (the most valuable; do this first)
- Clutch.co
- Trustpilot
- LinkedIn recommendations on the company page
- Direct testimonials from clients (with written permission to publish)
