import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircleIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import SEO, { pageSEO } from '../components/SEO';

const idealClients = [
    'Early-stage startups validating an MVP and preparing for seed/Series A',
    'Bootstrapped founders shipping their first paid SaaS product',
    'B2B operators turning an internal tool into a sellable product',
    'Vertical SaaS teams (legal, healthcare, logistics, real-estate) that need domain-aware UX',
    'Agencies and consultancies replacing spreadsheets with a multi-tenant client portal',
];

const whatsIncluded = [
    'Multi-tenant architecture with row-level security and tenant isolation',
    'Auth, RBAC, SSO (Google, Microsoft, Okta) and audit logging',
    'Stripe / Razorpay billing — subscriptions, metered usage, trials, dunning',
    'Admin dashboard, customer dashboard, and internal-ops tooling',
    'Webhooks, public REST API, and partner integrations',
    'Background jobs, queues, scheduled tasks, and outbound email pipelines',
    'Observability: error tracking (Sentry), product analytics, and uptime monitoring',
    'CI/CD, automated testing, staging + production environments',
];

const techStack = [
    { area: 'Frontend', items: ['React', 'Next.js (SSR + ISR)', 'TypeScript', 'Tailwind CSS', 'shadcn/ui'] },
    { area: 'Backend', items: ['Node.js', 'NestJS / Express', 'Prisma', 'tRPC or REST', 'BullMQ + Redis'] },
    { area: 'Database', items: ['PostgreSQL', 'MongoDB', 'Redis', 'Pinecone / pgvector for AI features'] },
    { area: 'Billing & Auth', items: ['Stripe', 'Razorpay', 'Auth.js', 'Clerk', 'WorkOS for SSO/SCIM'] },
    { area: 'Infra', items: ['Vercel', 'AWS (ECS, RDS, S3)', 'Cloudflare', 'Docker', 'GitHub Actions'] },
    { area: 'AI add-ons', items: ['OpenAI', 'Anthropic Claude', 'LangChain', 'RAG pipelines'] },
];

const process = [
    { step: '01', title: 'Discovery sprint (3–5 days)', detail: 'We map your domain, primary jobs-to-be-done, monetization model, and the riskiest assumptions to test first.' },
    { step: '02', title: 'Design & architecture (1 week)', detail: 'Wireframes, schema design, multi-tenant model, and an explicit list of v1 features versus deferred.' },
    { step: '03', title: 'Build sprints (2-week cadence)', detail: 'You see working software in your environment every two weeks — no big-bang reveals at the end.' },
    { step: '04', title: 'Hardening (1 week)', detail: 'Security review, load testing, rate limits, audit logs, on-call runbook, and backup/restore drill.' },
    { step: '05', title: 'Launch & iterate', detail: 'Production launch with observability dashboards, then a retainer for features, scale, and AI capabilities.' },
];

const pricingTiers = [
    { name: 'MVP SaaS', price: '₹1,20,000', timeline: '6–8 weeks', best: 'Validate an idea with paying users', features: ['Single-tenant or basic multi-tenant', 'Auth + Stripe subscriptions', 'Core feature set (≤ 5 screens)', '1 admin dashboard'] },
    { name: 'Production SaaS', price: '₹3,00,000', timeline: '10–14 weeks', best: 'Post-MVP teams scaling to first 100 customers', features: ['Multi-tenant with RBAC', 'Stripe + metered billing', 'Admin + customer + ops dashboards', 'Public API + webhooks', 'CI/CD + staging'] },
    { name: 'Enterprise SaaS', price: 'From ₹6,00,000', timeline: '4–6 months', best: 'B2B SaaS with SSO, audit, and compliance needs', features: ['SSO/SCIM via WorkOS', 'SOC 2-ready logging', 'Dedicated infra / VPC', 'Custom integrations', 'Dedicated success engineer'] },
];

const faqs = [
    { q: 'How long does it take to build a SaaS product?', a: 'A real MVP with auth, billing, and a core feature set takes us 6–8 weeks. A production-grade multi-tenant SaaS with admin tooling, public API, and a customer dashboard takes 10–14 weeks. Enterprise builds with SSO, audit logging, and compliance scaffolding run 4–6 months.' },
    { q: 'Do you handle Stripe and subscription billing?', a: 'Yes. We integrate Stripe (or Razorpay for India-focused products) including subscriptions, metered/usage-based billing, free trials, proration, dunning emails, tax (Stripe Tax / GST), and invoice receipts. Your customers can self-serve upgrades, downgrades, and payment-method changes.' },
    { q: 'Can you build the AI features inside our SaaS?', a: 'Yes — chat copilots, document Q&A (RAG), classification, summarization, and AI-assisted workflows. We use OpenAI, Anthropic Claude, or open-source models depending on cost, privacy, and latency requirements. AI features are versioned, evaluated, and observable like any other code path.' },
    { q: 'Do you provide hosting and ongoing maintenance?', a: 'We deploy to your AWS, Vercel, or Render account so you own the infrastructure. Post-launch we offer monthly retainers covering uptime monitoring, dependency upgrades, feature additions, and security patches.' },
    { q: 'How do you price SaaS development?', a: 'Fixed price for clearly-scoped MVPs (typically ₹1,20,000–₹3,00,000) and milestone-based pricing for production builds. Enterprise engagements are time-and-materials with a not-to-exceed cap. Quotes always include a written scope, deliverables, and acceptance criteria.' },
];

const SaasDevelopmentPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#FCFCFC] text-gray-900">
            <SEO {...pageSEO.saasDevelopment} />

            {/* Hero */}
            <section className="pt-36 pb-20 px-6">
                <div className="container mx-auto max-w-5xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold uppercase tracking-wider mb-6">
                        SaaS Development
                    </div>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] mb-6">
                        SaaS development services for founders who need to ship.
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 max-w-3xl leading-relaxed mb-10">
                        We build production-ready, multi-tenant SaaS products end-to-end &mdash; auth, billing, dashboards, public API, observability. Two-week sprints. You see working software every fortnight, not a big reveal at the end.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <button onClick={() => navigate('/contact')} className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-7 py-3.5 rounded-full font-semibold transition-all">
                            Get a free SaaS scoping call <ArrowRightIcon className="w-4 h-4" />
                        </button>
                        <Link to="/services/web-development" className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-900 px-7 py-3.5 rounded-full font-semibold border border-gray-200 transition-all">
                            See full-stack web development
                        </Link>
                    </div>
                </div>
            </section>

            {/* Ideal clients */}
            <section className="py-20 bg-white border-y border-gray-100">
                <div className="container mx-auto px-6 max-w-5xl">
                    <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">Who hires us for SaaS development</h2>
                    <p className="text-lg text-gray-600 mb-10 max-w-3xl">We work best with founders and operators who already know the pain they&rsquo;re solving and need a senior team to turn it into software.</p>
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

            {/* What's included */}
            <section className="py-20">
                <div className="container mx-auto px-6 max-w-5xl">
                    <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">What every SaaS build includes</h2>
                    <p className="text-lg text-gray-600 mb-10 max-w-3xl">No upsells, no &ldquo;phase 2&rdquo; surprises. The plumbing every real SaaS needs ships in v1.</p>
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

            {/* Tech stack */}
            <section className="py-20 bg-white border-y border-gray-100">
                <div className="container mx-auto px-6 max-w-5xl">
                    <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">SaaS tech stack</h2>
                    <p className="text-lg text-gray-600 mb-10 max-w-3xl">Pragmatic, modern, and battle-tested. We pick boring infrastructure so the interesting work stays in your product.</p>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {techStack.map((t) => (
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

            {/* Process */}
            <section className="py-20">
                <div className="container mx-auto px-6 max-w-5xl">
                    <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-10">How we build SaaS</h2>
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

            {/* Pricing */}
            <section className="py-20 bg-white border-y border-gray-100">
                <div className="container mx-auto px-6 max-w-5xl">
                    <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">SaaS development pricing</h2>
                    <p className="text-lg text-gray-600 mb-10 max-w-3xl">Fixed-price MVPs and milestone-based production builds. International clients can pay in USD/EUR/GBP.</p>
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

            {/* FAQ */}
            <section className="py-20">
                <div className="container mx-auto px-6 max-w-3xl">
                    <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-10">SaaS development FAQ</h2>
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

            {/* CTA */}
            <section className="py-20 bg-gray-900 text-white">
                <div className="container mx-auto px-6 max-w-3xl text-center">
                    <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">Have a SaaS idea? Let&rsquo;s scope it.</h2>
                    <p className="text-lg text-gray-300 mb-8">Free 30-minute call. We&rsquo;ll tell you honestly whether the build is 6 weeks or 6 months.</p>
                    <button onClick={() => navigate('/contact')} className="inline-flex items-center gap-2 bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold transition-all">
                        Book a SaaS scoping call <ArrowRightIcon className="w-4 h-4" />
                    </button>
                </div>
            </section>
        </div>
    );
};

export default SaasDevelopmentPage;
