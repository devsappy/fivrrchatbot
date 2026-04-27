import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircleIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import SEO, { pageSEO } from '../components/SEO';

const idealClients = [
    'D2C brands moving off Shopify themes onto a fully custom storefront',
    'Premium brands where the storefront is the brand &mdash; speed, fonts, and craft matter',
    'Manufacturers and exporters going direct to global buyers in INR/USD/EUR',
    'Marketplaces with multi-vendor catalogs, vendor onboarding, and split payouts',
    'B2B sellers needing quote requests, tiered pricing, and approval workflows',
];

const whatsIncluded = [
    'Catalog with variants, bundles, kits, and inventory tracking',
    'Cart, checkout, multi-currency pricing, and tax/GST configuration',
    'Stripe, Razorpay, PayPal, and COD with Shiprocket / Delhivery / EasyPost shipping',
    'Order management, fulfillment dashboard, and packing-slip / invoice templates',
    'Customer accounts, wishlists, reviews, and lifecycle email (Klaviyo or Customer.io)',
    'Discount engine: codes, BOGO, automatic discounts, gift cards, and abandoned-cart recovery',
    'SEO foundations: clean URLs, structured data, server-rendered product pages, sitemap',
    'Analytics: GA4, server-side conversion events, and Meta/Google Ads pixel parity',
];

const platforms = [
    { area: 'Headless commerce', items: ['Shopify Hydrogen', 'Medusa.js', 'Saleor', 'Commerce.js'] },
    { area: 'Custom build', items: ['Next.js + TypeScript', 'Tailwind CSS', 'shadcn/ui'] },
    { area: 'Backend & data', items: ['Node.js', 'Prisma', 'PostgreSQL', 'Redis'] },
    { area: 'Payments', items: ['Stripe', 'Razorpay', 'PayPal', 'COD with Shiprocket'] },
    { area: 'Shipping', items: ['Shiprocket', 'Delhivery', 'EasyPost', 'ShipStation'] },
    { area: 'Marketing', items: ['Klaviyo', 'Customer.io', 'Meta Pixel', 'GA4 + GTM'] },
];

const process = [
    { step: '01', title: 'Brand & catalog audit', detail: 'We map your product catalog, attributes, variants, and the merchandising rules your brand actually needs &mdash; before a single line of code.' },
    { step: '02', title: 'Design sprint', detail: 'High-fidelity Figma for home, listing, product detail, cart, and checkout. We design from real product photos and copy, not stock content.' },
    { step: '03', title: 'Build & integrate', detail: 'Storefront, payments, shipping, taxes, and email pipelines wired up against your real Stripe/Razorpay account. Staging URL from day 7.' },
    { step: '04', title: 'Pre-launch hardening', detail: 'Performance audit (target Lighthouse 95+), payment edge cases, refund flows, returns, fraud rules, and a launch-day runbook.' },
    { step: '05', title: 'Launch & optimize', detail: 'Go-live with tracking and AB-test scaffolding. Month 2 onwards: CRO sprints on cart, checkout, and product detail.' },
];

const pricingTiers = [
    { name: 'Headless Shopify storefront', price: '₹80,000', timeline: '4–5 weeks', best: 'Shopify merchants who want a custom storefront on top of Shopify&rsquo;s back office', features: ['Hydrogen / Next.js front-end', 'Reuses your Shopify catalog & checkout', 'Custom product detail & cart UX', 'Lighthouse 95+ performance'] },
    { name: 'Custom e-commerce', price: '₹2,50,000', timeline: '8–10 weeks', best: 'Brands needing fully custom UX, custom flows, or moving off SaaS commerce', features: ['Custom catalog, cart, checkout', 'Stripe + Razorpay + COD', 'Order/inventory dashboard', 'Lifecycle email + reviews', 'GA4 + ads pixel parity'] },
    { name: 'Multi-vendor marketplace', price: 'From ₹4,50,000', timeline: '12–16 weeks', best: 'Marketplaces with multiple sellers, commissions, and split payouts', features: ['Vendor onboarding & dashboards', 'Stripe Connect / Razorpay Route', 'Commission rules & invoicing', 'Search, filters, ranking', 'Disputes & moderation tools'] },
];

const faqs = [
    { q: 'Should I build custom or just use Shopify / WooCommerce?', a: 'For most stores under ₹1 crore in annual GMV, a Shopify or WooCommerce theme is the right answer. We tell people that honestly. You should consider custom (or headless) when your storefront UX is part of the brand, when Shopify checkout limitations are hurting conversion, when you need workflows the platform cannot do, or when you have a marketplace model that none of the off-the-shelf platforms support cleanly.' },
    { q: 'What is "headless" e-commerce and do I need it?', a: 'Headless means your storefront (the customer-facing UI) is decoupled from the commerce engine (catalog, cart, payments). You get a fast, fully-custom front-end while keeping Shopify / Medusa / Saleor handling the boring commerce plumbing. It is the right call for brands who want a unique storefront without rebuilding payments, taxes, and inventory from scratch.' },
    { q: 'Can you migrate me from Shopify or WooCommerce without losing SEO?', a: 'Yes. Migration plans always include a URL audit, 301 redirects mapped from old to new URLs, structured data parity, sitemap regeneration, and a 30-day post-migration ranking watch. We have done migrations where organic traffic recovered to baseline within 3 weeks.' },
    { q: 'Do you handle payments and tax for international sales?', a: 'Yes &mdash; Stripe with Stripe Tax for global, Razorpay for India, PayPal where needed. We configure currency rounding, GST for Indian sales, and US sales tax via Stripe Tax / TaxJar. Your accountant gets clean monthly reports.' },
    { q: 'How do you make e-commerce sites fast?', a: 'Server-rendered product pages, image optimization (AVIF/WebP with proper widths and lazy loading), CDN-first asset delivery, code-splitting, and an obsessive eye on third-party scripts. Target is Lighthouse mobile performance 95+ and LCP under 1.8s on 4G.' },
];

const EcommerceDevelopmentPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#FCFCFC] text-gray-900">
            <SEO {...pageSEO.ecommerceDevelopment} />

            <section className="pt-36 pb-20 px-6">
                <div className="container mx-auto max-w-5xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold uppercase tracking-wider mb-6">
                        E-commerce Development
                    </div>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] mb-6">
                        E-commerce development for brands that won&rsquo;t settle for a theme.
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 max-w-3xl leading-relaxed mb-10">
                        Custom storefronts and headless e-commerce builds. Stripe, Razorpay, PayPal. Lighthouse 95+. SEO baked in. From premium D2C brands to multi-vendor marketplaces.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <button onClick={() => navigate('/contact')} className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-7 py-3.5 rounded-full font-semibold transition-all">
                            Get an e-commerce quote <ArrowRightIcon className="w-4 h-4" />
                        </button>
                        <Link to="/services/web-development" className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-900 px-7 py-3.5 rounded-full font-semibold border border-gray-200 transition-all">
                            See full-stack web development
                        </Link>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-white border-y border-gray-100">
                <div className="container mx-auto px-6 max-w-5xl">
                    <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">Who hires us for e-commerce</h2>
                    <p className="text-lg text-gray-600 mb-10 max-w-3xl">We&rsquo;re a fit for brands and operators who already understand merchandising and need a senior team to translate that into a fast, custom storefront.</p>
                    <ul className="grid md:grid-cols-2 gap-x-10 gap-y-4">
                        {idealClients.map((c, i) => (
                            <li key={i} className="flex items-start gap-3 text-gray-700">
                                <CheckCircleIcon className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" />
                                <span>{c}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <section className="py-20">
                <div className="container mx-auto px-6 max-w-5xl">
                    <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">What every e-commerce build includes</h2>
                    <p className="text-lg text-gray-600 mb-10 max-w-3xl">Real commerce plumbing on day 1: inventory, taxes, shipping, refunds, and abandoned cart. Nothing held back as a phase-2 upsell.</p>
                    <ul className="grid md:grid-cols-2 gap-x-10 gap-y-4">
                        {whatsIncluded.map((c, i) => (
                            <li key={i} className="flex items-start gap-3 text-gray-700">
                                <CheckCircleIcon className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" />
                                <span>{c}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <section className="py-20 bg-white border-y border-gray-100">
                <div className="container mx-auto px-6 max-w-5xl">
                    <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">Platforms and stack</h2>
                    <p className="text-lg text-gray-600 mb-10 max-w-3xl">We build on whichever stack fits the catalog size, brand ambitions, and team capability &mdash; not whichever stack we like best this quarter.</p>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {platforms.map((t) => (
                            <div key={t.area} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                                <h3 className="font-bold text-lg mb-3">{t.area}</h3>
                                <ul className="space-y-1.5 text-sm text-gray-600">
                                    {t.items.map((i) => <li key={i}>{i}</li>)}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20">
                <div className="container mx-auto px-6 max-w-5xl">
                    <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-10">How we ship e-commerce</h2>
                    <ol className="space-y-6">
                        {process.map((p) => (
                            <li key={p.step} className="flex gap-6 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                                <div className="text-3xl font-black text-amber-500 flex-shrink-0">{p.step}</div>
                                <div>
                                    <h3 className="font-bold text-lg mb-1">{p.title}</h3>
                                    <p className="text-gray-600">{p.detail}</p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            <section className="py-20 bg-white border-y border-gray-100">
                <div className="container mx-auto px-6 max-w-5xl">
                    <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">E-commerce pricing</h2>
                    <p className="text-lg text-gray-600 mb-10 max-w-3xl">Fixed-price headless storefronts, milestone-based custom builds. International clients can pay in USD/EUR/GBP.</p>
                    <div className="grid md:grid-cols-3 gap-6">
                        {pricingTiers.map((t) => (
                            <div key={t.name} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col">
                                <div className="text-sm font-semibold uppercase tracking-wider text-amber-600 mb-2">{t.name}</div>
                                <div className="text-3xl font-black mb-1">{t.price}</div>
                                <div className="text-sm text-gray-500 mb-4">{t.timeline}</div>
                                <p className="text-sm text-gray-600 mb-4 italic">{t.best}</p>
                                <ul className="space-y-2 text-sm text-gray-700 flex-1">
                                    {t.features.map((f) => (
                                        <li key={f} className="flex items-start gap-2">
                                            <CheckCircleIcon className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                                            <span>{f}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20">
                <div className="container mx-auto px-6 max-w-3xl">
                    <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-10">E-commerce FAQ</h2>
                    <div className="space-y-4">
                        {faqs.map((f, i) => (
                            <details key={i} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm group">
                                <summary className="font-bold text-lg cursor-pointer list-none flex justify-between items-center">
                                    {f.q}
                                    <span className="text-amber-500 text-2xl group-open:rotate-45 transition-transform">+</span>
                                </summary>
                                <p className="text-gray-600 mt-4 leading-relaxed">{f.a}</p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 bg-gray-900 text-white">
                <div className="container mx-auto px-6 max-w-3xl text-center">
                    <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">Got a brand. Need a storefront.</h2>
                    <p className="text-lg text-gray-300 mb-8">Tell us your catalog size, current stack, and ambition. We&rsquo;ll come back with a quote and a plan inside 48 hours.</p>
                    <button onClick={() => navigate('/contact')} className="inline-flex items-center gap-2 bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold transition-all">
                        Get an e-commerce quote <ArrowRightIcon className="w-4 h-4" />
                    </button>
                </div>
            </section>
        </div>
    );
};

export default EcommerceDevelopmentPage;
