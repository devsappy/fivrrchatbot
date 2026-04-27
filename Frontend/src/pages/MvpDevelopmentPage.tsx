import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircleIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import SEO, { pageSEO } from '../components/SEO';

const idealClients = [
    'Solo founders preparing to raise pre-seed or seed capital',
    'Operators leaving a job to build the product they always wished existed',
    'Two-person teams with a strong design or domain advantage but no engineer',
    'Established companies validating a new product line without committing internal headcount',
    'Accelerator and incubator participants on a tight cohort timeline',
];

const whatsIncluded = [
    'A working web product, not a prototype, that real users can sign up for and pay for',
    'Auth, basic billing (Stripe or Razorpay), email, and an admin view',
    'Up to 5 core flows scoped from your job-stories — no feature bloat',
    'Hosted on infrastructure you own (Vercel, Render, AWS — your account)',
    'Analytics so you can see what users actually do (PostHog or Mixpanel)',
    'A 1-page architecture document so any future engineer can pick it up',
    'A 30-minute walkthrough recording for investors and demos',
    'Code in your GitHub org with a clean commit history and README',
];

const techStack = [
    { area: 'Frontend', items: ['Next.js + TypeScript', 'Tailwind CSS', 'shadcn/ui'] },
    { area: 'Backend', items: ['Node.js', 'tRPC or Next.js API routes', 'Prisma'] },
    { area: 'Database', items: ['PostgreSQL (Supabase or Neon)', 'Redis for queues'] },
    { area: 'Auth & payments', items: ['Auth.js or Clerk', 'Stripe / Razorpay'] },
    { area: 'Infra', items: ['Vercel', 'Resend (email)', 'PostHog (analytics)'] },
    { area: 'AI optional', items: ['OpenAI or Claude', 'Vector store via pgvector'] },
];

const process = [
    { step: '01', title: 'Day 1: 90-minute scoping call', detail: 'We pull apart your idea into job-stories and pick the 3–5 that have to ship in v1. Everything else gets parked for v2.' },
    { step: '02', title: 'Week 1: design & wire', detail: 'Wireframes, the schema, a clickable Figma flow, and a written kill-list of features we are NOT building.' },
    { step: '03', title: 'Weeks 2–5: build', detail: 'You see a deployed staging environment by end of week 2. We demo every Friday. You can poke at the product all weekend.' },
    { step: '04', title: 'Week 6: launch', detail: 'Domain on, payments on, analytics on, founders trained. We hand off code, infra access, and a runbook.' },
];

const pricingTiers = [
    { name: 'Solo founder MVP', price: '₹60,000', timeline: '4 weeks', best: 'A single-purpose product with one core loop', features: ['Up to 3 user-facing screens', 'Auth + Stripe checkout', 'Email magic links', 'Deployed to your Vercel'] },
    { name: 'Funded MVP', price: '₹1,20,000', timeline: '6 weeks', best: 'Pre-seed startups with 5–10 design partners lined up', features: ['Up to 5 user-facing screens', 'Auth + subscriptions', 'Admin dashboard', 'Analytics + error tracking', '1-month post-launch support'] },
    { name: 'Investor-demo MVP', price: '₹2,00,000', timeline: '8 weeks', best: 'Founders raising and need to show traction', features: ['Multi-tenant or B2B-ready', 'Stripe subscriptions + trials', 'Admin + customer dashboards', 'Public landing page included', '2-month post-launch retainer'] },
];

const faqs = [
    { q: 'What is the difference between an MVP and a prototype?', a: 'A prototype demonstrates an idea — it usually has fake data, broken flows, and is not safe for real users. An MVP is a real product: signup works, payments work, data persists, and users can complete the core job end-to-end. We build MVPs, not prototypes, because investors and design partners can tell the difference.' },
    { q: 'How do you keep MVP scope from blowing up?', a: 'Two rules. First, in the scoping call we write an explicit "not building" list — every feature we cut goes on it, in writing. Second, we ship every Friday. If a feature is not done by Friday, it gets cut, descoped, or moved to v2. This pressure forces honest tradeoffs early instead of a death-march at week 7.' },
    { q: 'Can I keep working with you after the MVP launches?', a: 'Yes. After launch, founders typically move onto a monthly retainer — features, bug fixes, AI add-ons, and scaling work as you sign customers. The product code lives in your GitHub org so you can also bring on your own team and we step back to advisory.' },
    { q: 'What if my MVP needs AI features?', a: 'AI features fit cleanly into MVPs as long as the LLM call has a clear evaluation criterion. We add OpenAI or Claude integrations, RAG pipelines, and AI-assisted flows in MVPs all the time. We are honest about which parts of an idea need real engineering and which can be a clever prompt.' },
    { q: 'How much input do you need from me as a non-technical founder?', a: 'About 3 hours per week. One Friday demo (45 min), one mid-week async product review on Loom (30 min), and async messages on Slack the rest of the time. Domain expertise is the one thing we cannot substitute for, so we want yours.' },
];

const MvpDevelopmentPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#FCFCFC] text-gray-900">
            <SEO {...pageSEO.mvpDevelopment} />

            <section className="pt-36 pb-20 px-6">
                <div className="container mx-auto max-w-5xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold uppercase tracking-wider mb-6">
                        MVP Development
                    </div>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] mb-6">
                        MVP development for founders &mdash; live in 4 to 8 weeks.
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 max-w-3xl leading-relaxed mb-10">
                        We build real, payable products &mdash; not prototypes &mdash; that founders launch to their first design partners. Auth, billing, analytics, deployed. Friday demos every week. Fixed price.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <button onClick={() => navigate('/contact')} className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-7 py-3.5 rounded-full font-semibold transition-all">
                            Book a 90-minute MVP scoping call <ArrowRightIcon className="w-4 h-4" />
                        </button>
                        <Link to="/services/saas-development" className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-900 px-7 py-3.5 rounded-full font-semibold border border-gray-200 transition-all">
                            See SaaS development
                        </Link>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-white border-y border-gray-100">
                <div className="container mx-auto px-6 max-w-5xl">
                    <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">Who hires us to build their MVP</h2>
                    <p className="text-lg text-gray-600 mb-10 max-w-3xl">We work best with founders who can describe the pain they&rsquo;re solving in one sentence and who have an opinion about the first 5 users.</p>
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
                    <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">What every MVP build includes</h2>
                    <p className="text-lg text-gray-600 mb-10 max-w-3xl">Everything a real product needs on day 1. No features bolted on later for &ldquo;production readiness.&rdquo;</p>
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
                    <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">MVP tech stack</h2>
                    <p className="text-lg text-gray-600 mb-10 max-w-3xl">Modern, boring, and easy to hand off. The kind of stack a future engineer can read in an afternoon.</p>
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

            <section className="py-20">
                <div className="container mx-auto px-6 max-w-5xl">
                    <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-10">How we build MVPs</h2>
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
                    <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">MVP development pricing</h2>
                    <p className="text-lg text-gray-600 mb-10 max-w-3xl">Fixed price, fixed scope, fixed timeline. International clients can pay in USD, EUR, or GBP.</p>
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
                    <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-10">MVP development FAQ</h2>
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
                    <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">90 minutes. Honest scoping. No pitch.</h2>
                    <p className="text-lg text-gray-300 mb-8">Tell us what you&rsquo;re building. We&rsquo;ll tell you what&rsquo;s 4 weeks, what&rsquo;s 6 months, and what should never be built.</p>
                    <button onClick={() => navigate('/contact')} className="inline-flex items-center gap-2 bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold transition-all">
                        Book a free MVP scoping call <ArrowRightIcon className="w-4 h-4" />
                    </button>
                </div>
            </section>
        </div>
    );
};

export default MvpDevelopmentPage;
