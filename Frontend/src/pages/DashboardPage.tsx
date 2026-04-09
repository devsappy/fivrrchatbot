import React, { useCallback, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  Website,
  ActivityEvent,
  InsightItem,
  AnalyticsData,
  WebsiteInsights,
  addWebsite,
  deleteWebsite,
  getWebsites,
  updateWebsite,
  getInsights,
  getActivity,
  getAnalytics,
} from '../services/websitesApi';
import ProfilePage from './ProfilePage';

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */
type ActiveView = 'dashboard' | 'websites' | 'seo' | 'panel' | 'activity' | 'profile';

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [activeView, setActiveView] = useState<ActiveView>('dashboard');

  const handleLogout = async () => {
    try { await logout(); } finally { navigate('/login'); }
  };

  const navItems: { label: string; icon: React.ReactNode; view: ActiveView }[] = [
    { label: 'Overview', icon: <DashboardIcon />, view: 'dashboard' },
    { label: 'My Websites', icon: <WebsiteIcon />, view: 'websites' },
    { label: 'SEO', icon: <BarChartIcon />, view: 'seo' },
    { label: 'Panel', icon: <SparkleIcon />, view: 'panel' },
    { label: 'Activity', icon: <ActivityIcon />, view: 'activity' },
    { label: 'Profile', icon: <ProfileIcon />, view: 'profile' },
  ];

  return (
    <div className="h-screen flex w-full font-sans overflow-hidden" style={{ background: '#111111' }}>

      {/* ── Sidebar ── */}
      <motion.div
        initial={false}
        animate={{ width: isSidebarExpanded ? 260 : 72 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        onMouseEnter={() => setIsSidebarExpanded(true)}
        onMouseLeave={() => setIsSidebarExpanded(false)}
        className="sticky top-0 flex flex-col justify-between py-6 px-3 shrink-0 self-start relative z-20 h-screen overflow-hidden"
        style={{
          background: '#171717',
          borderRight: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 px-2 mb-4 h-12 overflow-hidden shrink-0">
            <div className="w-10 h-10 flex items-center justify-center shrink-0">
              <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain" />
            </div>
            <AnimatePresence>
              {isSidebarExpanded && (
                <motion.span
                  initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }} transition={{ duration: 0.15 }}
                  className="font-bold text-xl text-white whitespace-nowrap logo-rubik"
                >
                  Chatterify
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          {/* Nav */}
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = activeView === item.view;
              return (
                <button
                  key={item.view}
                  onClick={() => setActiveView(item.view)}
                  title={!isSidebarExpanded ? item.label : undefined}
                  className={`flex items-center gap-3 px-2.5 py-2.5 rounded-xl transition-all text-sm font-medium w-full text-left overflow-hidden h-11 ${
                    isActive ? 'text-white' : 'text-[#4A4A5A] hover:text-white hover:bg-white/5'
                  }`}
                  style={isActive ? { background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' } : { border: '1px solid transparent' }}
                >
                  <div className="shrink-0 w-5 flex items-center justify-center">{item.icon}</div>
                  <AnimatePresence>
                    {isSidebarExpanded && (
                      <motion.span
                        initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -8 }} transition={{ duration: 0.15 }}
                        className="whitespace-nowrap"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              );
            })}
          </nav>

          {/* Bottom: logout + user */}
          <div className="mt-auto flex flex-col gap-2">
            <button
              onClick={handleLogout}
              title={!isSidebarExpanded ? 'Logout' : undefined}
              className="flex items-center gap-3 px-2.5 py-2.5 rounded-xl transition-all text-sm font-medium text-[#4A4A5A] hover:text-white hover:bg-white/5 w-full text-left overflow-hidden h-11"
            >
              <div className="shrink-0 w-5 flex items-center justify-center"><LogoutIcon /></div>
              <AnimatePresence>
                {isSidebarExpanded && (
                  <motion.span
                    initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }} transition={{ duration: 0.15 }}
                    className="whitespace-nowrap"
                  >
                    Logout
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <div className={`flex items-center gap-3 py-2.5 overflow-hidden rounded-xl transition-all duration-200 ${isSidebarExpanded ? 'px-2.5 border' : 'px-1 border border-transparent'}`}
              style={isSidebarExpanded ? { background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.07)' } : {}}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-sm shrink-0" style={{ background: '#303030' }}>
                {user?.user_metadata?.first_name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'U'}
              </div>
              <AnimatePresence>
                {isSidebarExpanded && (
                  <motion.div
                    initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }} transition={{ duration: 0.15 }}
                    className="flex flex-col overflow-hidden"
                  >
                    <span className="text-sm font-semibold text-white truncate">
                      {user?.user_metadata?.first_name} {user?.user_metadata?.last_name}
                    </span>
                    <span className="text-[11px] truncate" style={{ color: '#4A4A5A' }}>{user?.email}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Main Content ── */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <AnimatePresence mode="wait">
          {activeView === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}
              className="flex-1 overflow-hidden"
            >
              <DashboardOverview user={user} onNavigate={setActiveView} />
            </motion.div>
          )}

          {activeView === 'websites' && (
            <motion.div
              key="websites"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}
              className="flex-1 overflow-hidden"
            >
              <WebsitesView />
            </motion.div>
          )}

          {activeView === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}
              className="flex-1 overflow-hidden"
            >
              <ProfilePage />
            </motion.div>
          )}

          {activeView === 'seo' && (
            <motion.div
              key="seo"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}
              className="flex-1 overflow-y-auto"
            >
              <SEOView />
            </motion.div>
          )}

          {activeView === 'panel' && (
            <motion.div
              key="panel"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}
              className="flex-1 overflow-y-auto"
            >
              <PanelView />
            </motion.div>
          )}

          {activeView === 'activity' && (
            <motion.div
              key="activity"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}
              className="flex-1 overflow-y-auto"
            >
              <ActivityView />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Site Selector (shared)
───────────────────────────────────────────── */
const SiteSelector: React.FC<{
  websites: Website[];
  selected: string | null;
  onChange: (id: string | null) => void;
}> = ({ websites, selected, onChange }) => {
  if (websites.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <button
        onClick={() => onChange(null)}
        className="px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all"
        style={selected === null
          ? { background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.18)' }
          : { background: 'transparent', color: '#4A4A5A', border: '1px solid rgba(255,255,255,0.07)' }}
      >
        All Sites
      </button>
      {websites.map((w) => (
        <button
          key={w.id}
          onClick={() => onChange(w.id)}
          className="px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all max-w-[160px] truncate"
          style={selected === w.id
            ? { background: 'rgba(82,39,255,0.18)', color: '#A78BFF', border: '1px solid rgba(82,39,255,0.35)' }
            : { background: 'transparent', color: '#4A4A5A', border: '1px solid rgba(255,255,255,0.07)' }}
        >
          {w.name}
        </button>
      ))}
    </div>
  );
};

/* ─────────────────────────────────────────────
   Dashboard Overview
───────────────────────────────────────────── */
const DashboardOverview: React.FC<{ user: any; onNavigate: (v: ActiveView) => void }> = ({ user, onNavigate }) => {
  const [websites, setWebsites] = useState<Website[]>([]);
  const [activity, setActivity] = useState<ActivityEvent[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [insightsMap, setInsightsMap] = useState<Record<string, InsightItem[]>>({});
  const [scoresMap, setScoresMap] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [selectedSite, setSelectedSite] = useState<string | null>(null);
  const firstName = user?.user_metadata?.first_name || user?.email?.split('@')[0] || 'there';

  const greetRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const recentRef = useRef<HTMLDivElement>(null);
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    getWebsites().then(setWebsites).catch(() => {}).finally(() => setLoading(false));
    getActivity(10).then(setActivity).catch(() => {});
    getAnalytics().then(setAnalytics).catch(() => {});
  }, []);

  useEffect(() => {
    if (websites.length === 0) return;
    websites.forEach((w) => {
      getInsights(w.id).then((data) => {
        setInsightsMap((prev) => ({ ...prev, [w.id]: data.insights }));
        if (data.scores) {
          const perf = data.scores.performance;
          if (perf != null) setScoresMap((prev) => ({ ...prev, [w.id]: perf }));
        }
      }).catch(() => {});
    });
  }, [websites]);

  useEffect(() => {
    const targets = {
      greet:   greetRef.current,
      stats:   statsRef.current   ? gsap.utils.toArray(statsRef.current.children)   : [],
      actions: actionsRef.current ? gsap.utils.toArray(actionsRef.current.children) : [],
      recent:  recentRef.current,
    };

    gsap.set([targets.greet, ...targets.stats, ...targets.actions, targets.recent], { opacity: 0 });
    gsap.set([targets.greet], { y: 40 });
    gsap.set(targets.stats,   { y: 50 });
    gsap.set(targets.actions, { x: -30 });
    gsap.set([targets.recent], { y: 30 });

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    if (targets.greet)            tl.to(targets.greet,            { opacity: 1, y: 0, duration: 0.7 }, 0);
    if (targets.stats.length)     tl.to(targets.stats,            { opacity: 1, y: 0, stagger: 0.1, duration: 0.6 }, 0.15);
    if (targets.actions.length)   tl.to(targets.actions,          { opacity: 1, x: 0, stagger: 0.08, duration: 0.5 }, 0.35);
    if (targets.recent)           tl.to(targets.recent,           { opacity: 1, y: 0, duration: 0.5 }, 0.5);

    return () => { tl.kill(); };
  }, []);

  useEffect(() => {
    if (loading) return;
    counterRefs.current.forEach((el) => {
      if (!el) return;
      const target = parseInt(el.dataset.target || '0', 10);
      if (isNaN(target)) return;
      const obj = { val: 0 };
      gsap.to(obj, {
        val: target, duration: 1.2, ease: 'power2.out',
        onUpdate: () => { if (el) el.textContent = String(Math.round(obj.val)); },
      });
    });
  }, [loading]);

  const activeSite = websites.find(w => w.id === selectedSite) ?? null;
  const stats = activeSite ? [
    { label: 'Site Name', value: null, suffix: '', accent: '#E5E5E5', desc: activeSite.url, text: activeSite.name },
    { label: 'Performance', value: scoresMap[activeSite.id] ?? null, suffix: '', accent: '#E5E5E5', desc: 'PageSpeed score', text: scoresMap[activeSite.id] != null ? undefined : 'N/A' },
    { label: 'Uptime', value: 99, suffix: '%', accent: '#E5E5E5', desc: 'Service availability' },
    { label: 'Account', value: null, suffix: '', accent: '#E5E5E5', desc: 'Fully activated', text: 'Active' },
  ] : [
    { label: 'Total Websites', value: websites.length, suffix: '', accent: '#E5E5E5', desc: 'Vercel deployments linked' },
    { label: 'Active Previews', value: websites.length, suffix: '', accent: '#E5E5E5', desc: 'Live iframe previews' },
    { label: 'Uptime', value: 99, suffix: '%', accent: '#E5E5E5', desc: 'Service availability' },
    { label: 'Account', value: null, suffix: '', accent: '#E5E5E5', desc: 'Fully activated', text: 'Active' },
  ];

  return (
    <div className="relative w-full h-full overflow-y-auto overflow-x-hidden min-h-0" style={{ background: '#111111' }}>
      <div className="relative z-10 px-8 py-8 w-full">

        {/* Greeting + SiteSelector in one row */}
        <div ref={greetRef} className="flex items-start justify-between gap-4 mb-8">
          <div>
            <p className="text-sm font-semibold tracking-widest uppercase mb-2" style={{ color: '#A3A3A3' }}>
              {new Date().getHours() < 12 ? 'Good morning' : new Date().getHours() < 18 ? 'Good afternoon' : 'Good evening'}
            </p>
            <h1 className="text-5xl font-extrabold tracking-tight leading-none mb-3 text-white">
              Hey, {firstName}.
            </h1>
            <p className="text-base" style={{ color: '#4A4A5A' }}>Here's what's going on with your workspace today.</p>
          </div>
          <div className="shrink-0 pt-1">
            <SiteSelector websites={websites} selected={selectedSite} onChange={setSelectedSite} />
          </div>
        </div>

        {/* Stats grid */}
        <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {stats.map((s, idx) => (
            <div
              key={s.label}
              className="relative rounded-2xl p-6 flex flex-col justify-between overflow-hidden cursor-default"
              style={{ minHeight: 180, background: '#1A1A1A', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 8px 24px rgba(0,0,0,0.22)' }}
              onMouseEnter={(e) => gsap.to(e.currentTarget, { y: -2, boxShadow: '0 12px 30px rgba(0,0,0,0.28)', border: '1px solid rgba(255,255,255,0.14)', duration: 0.25, ease: 'power2.out' })}
              onMouseLeave={(e) => gsap.to(e.currentTarget, { y: 0, boxShadow: '0 8px 24px rgba(0,0,0,0.22)', border: '1px solid rgba(255,255,255,0.08)', duration: 0.25, ease: 'power2.out' })}
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl" style={{ background: '#3A3A3A' }} />
              <div className="pt-3">
                <div className="text-5xl font-black tabular-nums tracking-tight text-white">
                  {s.text ? (
                    <span>{s.text}</span>
                  ) : loading ? (
                    <span style={{ color: '#2A2A35' }}>—</span>
                  ) : (
                    <>
                      <span ref={(el) => { counterRefs.current[idx] = el; }} data-target={s.value}>{s.value}</span>
                      <span className="text-3xl ml-0.5" style={{ color: '#D4D4D4' }}>{s.suffix}</span>
                    </>
                  )}
                </div>
              </div>
              <div className="mt-auto pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <p className="text-sm font-semibold text-white">{s.label}</p>
                <p className="text-xs mt-0.5" style={{ color: '#4A4A5A' }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* AI Insights Panel */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }} className="mb-8">
          <div className="flex items-center gap-3 mb-5">
            <SparkleIcon />
            <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
            <p className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: '#3A3A4A' }}>AI Insights</p>
            <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
          </div>
          {(() => {
            const allInsights = selectedSite
              ? (insightsMap[selectedSite] ?? [])
              : Object.values(insightsMap).flat();
            const displayInsights = allInsights.length > 0 ? allInsights.slice(0, 5) : defaultInsights;
            return (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {displayInsights.map((insight, i) => {
                  const accent = tagColors[insight.tag] || '#4A4A5A';
                  const icon = tagIcons[insight.tag] || <ZapIcon />;
                  return (
                    <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.7 + i * 0.08 }}
                      className="rounded-2xl p-5 relative overflow-hidden cursor-default"
                      style={{ background: '#1A1A1A', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 6px 18px rgba(0,0,0,0.18)' }}
                      onMouseEnter={(e) => gsap.to(e.currentTarget, { y: -2, boxShadow: '0 10px 24px rgba(0,0,0,0.24)', duration: 0.2 })}
                      onMouseLeave={(e) => gsap.to(e.currentTarget, { y: 0, boxShadow: '0 6px 18px rgba(0,0,0,0.18)', duration: 0.2 })}>
                      <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: accent }} />
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${accent}18`, color: accent }}>{icon}</div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-white">{insight.title}</p>
                          <p className="text-xs mt-0.5 leading-relaxed" style={{ color: '#4A4A5A' }}>{insight.desc}</p>
                        </div>
                      </div>
                      <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full" style={{ background: `${accent}15`, color: accent }}>{insight.tag}</span>
                    </motion.div>
                  );
                })}
              </div>
            );
          })()}
          <button className="mt-4 text-xs font-semibold px-4 py-2.5 rounded-lg transition-all" style={{ color: '#7C5CFF', background: 'rgba(82,39,255,0.08)', border: '1px solid rgba(82,39,255,0.12)' }}
            onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.03, duration: 0.15 })} onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1, duration: 0.15 })}>
            View Full Report →
          </button>
        </motion.div>

        {/* Main content + Activity sidebar */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-6 mb-8">

          {/* Left column */}
          <div className="space-y-6">

            {/* Quick Actions + Analytics row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6">

              {/* Enhanced Quick Actions */}
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: '#3A3A4A' }}>Quick Actions</p>
                  <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
                </div>

                <div ref={actionsRef} className="flex flex-col gap-3">
                  {/* Primary CTA — Add Website */}
                  <button onClick={() => onNavigate('websites')}
                    className="flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-200 w-full text-left"
                    style={{ background: 'linear-gradient(135deg, rgba(82,39,255,0.12), rgba(107,63,255,0.06))', border: '1px solid rgba(82,39,255,0.2)', boxShadow: '0 4px 20px rgba(82,39,255,0.15)' }}
                    onMouseEnter={(e) => gsap.to(e.currentTarget, { y: -2, boxShadow: '0 8px 28px rgba(82,39,255,0.28)', duration: 0.2 })}
                    onMouseLeave={(e) => gsap.to(e.currentTarget, { y: 0, boxShadow: '0 4px 20px rgba(82,39,255,0.15)', duration: 0.2 })}>
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'linear-gradient(135deg, #6B3FFF, #5227FF)', boxShadow: '0 2px 8px rgba(82,39,255,0.3)' }}>
                      <PlusIcon />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-sm font-bold text-white">Add a Website</p>
                      <p className="text-xs mt-0.5" style={{ color: '#A3A3A3' }}>Link a Vercel deployment</p>
                    </div>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{ color: '#7C5CFF', background: 'rgba(82,39,255,0.12)' }}>→</div>
                  </button>
                  {/* Secondary actions */}
                  {[
                    { label: 'Browse previews', sub: 'View all linked sites', onClick: () => onNavigate('websites'), icon: <WebsiteIcon /> },
                    { label: 'Visit Chatterify', sub: 'Go back to main site', href: '/', icon: <ExternalLinkIcon /> },
                  ].map((a) => {
                    const inner = (
                      <>
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 font-bold text-lg" style={{ color: '#E5E5E5', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>{a.icon}</div>
                        <div className="flex-1 text-left">
                          <p className="text-sm font-semibold text-white">{a.label}</p>
                          <p className="text-xs mt-0.5" style={{ color: '#4A4A5A' }}>{a.sub}</p>
                        </div>
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{ color: '#3A3A4A', background: 'rgba(255,255,255,0.04)' }}>→</div>
                      </>
                    );
                    const baseStyle = { background: '#1A1A1A', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 6px 18px rgba(0,0,0,0.18)' };
                    return a.href ? (
                      <Link key={a.label} to={a.href} className="flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-200 w-full group" style={baseStyle}
                        onMouseEnter={(e) => gsap.to(e.currentTarget, { y: -2, boxShadow: '0 10px 24px rgba(0,0,0,0.24)', duration: 0.2 })}
                        onMouseLeave={(e) => gsap.to(e.currentTarget, { y: 0, boxShadow: '0 6px 18px rgba(0,0,0,0.18)', duration: 0.2 })}>
                        {inner}
                      </Link>
                    ) : (
                      <button key={a.label} onClick={a.onClick} className="flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-200 w-full text-left group" style={baseStyle}
                        onMouseEnter={(e) => gsap.to(e.currentTarget, { y: -2, boxShadow: '0 10px 24px rgba(0,0,0,0.24)', duration: 0.2 })}
                        onMouseLeave={(e) => gsap.to(e.currentTarget, { y: 0, boxShadow: '0 6px 18px rgba(0,0,0,0.18)', duration: 0.2 })}>
                        {inner}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Analytics Snapshot */}
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: '#3A3A4A' }}>Analytics</p>
                  <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
                </div>

                <div className="rounded-2xl p-5 relative overflow-hidden" style={{ background: '#1A1A1A', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 6px 18px rgba(0,0,0,0.18)' }}>
                  <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg, #5227FF, #7C5CFF)' }} />

                  {/* Sparkline */}
                  <div className="mb-4">
                    <p className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: '#4A4A5A' }}>Traffic Trend (7d)</p>
                    <svg viewBox="0 0 200 50" className="w-full h-12" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#5227FF" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#5227FF" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      {(() => {
                        const pts = analytics?.sparkline && analytics.sparkline.length >= 2 ? analytics.sparkline : [20, 35, 28, 40, 32, 45, 50];
                        const max = Math.max(...pts);
                        const min = Math.min(...pts);
                        const range = max - min || 1;
                        const coords = pts.map((v, i) => {
                          const x = (i / Math.max(pts.length - 1, 1)) * 200;
                          const y = 48 - ((v - min) / range) * 40;
                          return `${x},${y}`;
                        });
                        const linePath = `M${coords.join(' L')}`;
                        const areaPath = `${linePath} L200,50 L0,50Z`;
                        return (
                          <>
                            <path d={areaPath} fill="url(#sparkGrad)" />
                            <path d={linePath} fill="none" stroke="#5227FF" strokeWidth="2" />
                          </>
                        );
                      })()}
                    </svg>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <p className="text-[10px] uppercase tracking-wider mb-1" style={{ color: '#4A4A5A' }}>Top Site</p>
                      <p className="text-sm font-semibold text-white truncate">{analytics?.top_website?.name || (loading ? '—' : 'None yet')}</p>
                      <p className="text-[11px] mt-0.5" style={{ color: '#22C55E' }}>↑ Most visited</p>
                    </div>
                    <div className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <p className="text-[10px] uppercase tracking-wider mb-1" style={{ color: '#4A4A5A' }}>Sites Tracked</p>
                      <p className="text-sm font-semibold text-white">{analytics?.total_websites ?? '—'}</p>
                      <p className="text-[11px] mt-0.5" style={{ color: '#22C55E' }}>{analytics?.total_deployments ?? 0} deployments</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Websites with Performance Scores */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
                <p className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: '#3A3A4A' }}>Recent Websites</p>
                <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
              </div>

              <div ref={recentRef} className="rounded-2xl overflow-hidden" style={{ background: '#16161F', border: '1px solid rgba(255,255,255,0.06)', boxShadow: '0 4px 24px rgba(0,0,0,0.4)' }}>
                {loading ? (
                  <div className="flex items-center justify-center py-14 gap-2">
                    {[0, 1, 2].map((i) => (
                      <motion.div key={i} className="w-2 h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.15)' }}
                        animate={{ opacity: [0.2, 0.8, 0.2] }} transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.2 }} />
                    ))}
                  </div>
                ) : websites.length === 0 ? (
                  <div className="py-14 text-center px-6">
                    <div className="w-12 h-12 rounded-2xl mx-auto mb-3 flex items-center justify-center" style={{ background: 'rgba(82,39,255,0.1)', color: '#5227FF' }}>
                      <GlobeIcon />
                    </div>
                    <p className="text-sm font-semibold text-white mb-1">No websites yet</p>
                    <p className="text-xs mb-5" style={{ color: '#4A4A5A' }}>Add your first Vercel deployment.</p>
                    <button onClick={() => onNavigate('websites')}
                      className="text-xs font-bold px-5 py-2.5 rounded-full transition-all text-white"
                      style={{ background: 'linear-gradient(135deg, #6B3FFF, #5227FF)', boxShadow: '0 4px 14px rgba(82,39,255,0.4)' }}>
                      + Add website
                    </button>
                  </div>
                ) : (
                  <div>
                    {(selectedSite ? websites.filter(w => w.id === selectedSite) : websites.slice(0, 5)).map((w, i, arr) => {
                      const score = w.id in scoresMap ? scoresMap[w.id] : getPerformanceScore(w.name);
                      return (
                        <div key={w.id} className="flex items-center gap-4 px-5 py-4 group transition-colors hover:bg-white/[0.02]"
                          style={{ borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                          <div className="w-20 h-14 rounded-lg overflow-hidden shrink-0 relative" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                            <img src={`https://api.microlink.io/?url=${encodeURIComponent(w.url)}&screenshot=true&meta=false&embed=screenshot.url`} alt={w.name}
                              className="w-full h-full object-cover object-top"
                              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; const fb = e.currentTarget.nextElementSibling as HTMLElement; if (fb) fb.style.display = 'flex'; }} />
                            <div className="absolute inset-0 items-center justify-center hidden" style={{ color: '#3A3A4A' }}><GlobeIcon /></div>
                            <div className="absolute top-1 right-1 px-1.5 py-0.5 rounded text-[9px] font-bold"
                              style={{ background: score >= 80 ? 'rgba(34,197,94,0.2)' : score >= 60 ? 'rgba(234,179,8,0.2)' : 'rgba(239,68,68,0.2)',
                                color: score >= 80 ? '#22C55E' : score >= 60 ? '#EAB308' : '#EF4444',
                                border: `1px solid ${score >= 80 ? 'rgba(34,197,94,0.3)' : score >= 60 ? 'rgba(234,179,8,0.3)' : 'rgba(239,68,68,0.3)'}` }}>
                              {score}
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-white truncate">{w.name}</p>
                            <p className="text-[11px] truncate mt-0.5" style={{ color: '#4A4A5A' }}>{w.url}</p>
                          </div>
                          <button onClick={() => onNavigate('websites')}
                            className="text-xs font-semibold shrink-0 px-3 py-1.5 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                            style={{ color: '#7C5CFF', background: 'rgba(82,39,255,0.1)' }}>open →</button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Right column — Activity Feed */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
              <p className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: '#3A3A4A' }}>Activity</p>
              <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
            </div>

            <div className="rounded-2xl overflow-hidden" style={{ background: '#16161F', border: '1px solid rgba(255,255,255,0.06)', boxShadow: '0 4px 24px rgba(0,0,0,0.4)' }}>
              {(() => {
                const displayActivity = selectedSite
                  ? activity.filter(a =>
                      (a.metadata as any)?.website_id === selectedSite ||
                      websites.find(w => w.id === selectedSite && (a.title.includes(w.name) || a.description.includes(w.name)))
                    )
                  : activity;
                return displayActivity.length === 0 ? (
                <div className="py-10 text-center px-6">
                  <div className="w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.04)', color: '#3A3A4A' }}><ActivityIcon /></div>
                  <p className="text-xs" style={{ color: '#4A4A5A' }}>{selectedSite ? 'No activity for this site' : 'No activity yet'}</p>
                </div>
              ) : displayActivity.map((act, i) => {
                const cfg = activityTypeConfig[act.type] || activityTypeConfig.update;
                const iconEl = cfg.icon;
                const timeAgo = formatTimeAgo(act.created_at);
                return (
                  <div key={act.id} className="flex items-start gap-3.5 px-5 py-4 group transition-colors hover:bg-white/[0.02]"
                    style={{ borderBottom: i < displayActivity.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ background: `${cfg.color}15`, color: cfg.color }}>
                      {iconEl}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white">{act.title}</p>
                      <p className="text-xs mt-0.5" style={{ color: '#4A4A5A' }}>{act.description}</p>
                    </div>
                    <span className="text-[10px] shrink-0 mt-0.5" style={{ color: '#3A3A4A' }}>{timeAgo}</span>
                  </div>
                );
              });
              })()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   SEO View
───────────────────────────────────────────── */
const seoChecklist = [
  { label: 'Meta Title', desc: 'Each page should have a unique, descriptive title under 60 characters.' },
  { label: 'Meta Description', desc: 'Write compelling summaries under 160 characters to improve click-through rates.' },
  { label: 'Canonical URLs', desc: 'Use canonical tags to prevent duplicate content penalties.' },
  { label: 'Structured Data', desc: 'Add JSON-LD schema markup so search engines understand your content.' },
  { label: 'Mobile-Friendly', desc: 'Ensure responsive design and a viewport meta tag are present.' },
  { label: 'Page Speed', desc: 'Faster pages rank higher — compress images and defer non-critical JS.' },
  { label: 'HTTPS', desc: 'Serve all pages over HTTPS; mixed content will suppress rankings.' },
  { label: 'Sitemap & Robots.txt', desc: 'Submit an XML sitemap and configure robots.txt to guide crawlers.' },
];

const SEOView: React.FC = () => {
  const [dataMap, setDataMap] = useState<Record<string, WebsiteInsights>>({});
  const [websites, setWebsites] = useState<Website[]>([]);
  const [selectedSite, setSelectedSite] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getWebsites().then((ws) => {
      setWebsites(ws);
      ws.forEach((w) => {
        getInsights(w.id).then((data) => {
          setDataMap((prev) => ({ ...prev, [w.id]: data }));
        }).catch(() => {});
      });
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const sitesWithData = websites.filter(w => dataMap[w.id]);
  const activeSiteData = selectedSite ? dataMap[selectedSite] : null;

  const seoScore = activeSiteData?.scores.seo ?? (() => {
    const vals = sitesWithData.map(w => dataMap[w.id].scores.seo).filter((v): v is number => v != null);
    return vals.length ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length) : null;
  })();

  const seoInsights = (() => {
    if (selectedSite) return (dataMap[selectedSite]?.insights ?? []).filter(i => i.tag === 'SEO');
    return sitesWithData.flatMap(w => (dataMap[w.id]?.insights ?? []).filter(i => i.tag === 'SEO'));
  })();

  const scoreColor = seoScore == null ? '#3A3A4A' : seoScore >= 90 ? '#22C55E' : seoScore >= 50 ? '#F59E0B' : '#EF4444';
  const scoreLabel = seoScore == null ? 'No data' : seoScore >= 90 ? 'Excellent' : seoScore >= 50 ? 'Needs Work' : 'Poor';

  return (
    <div className="w-full h-full overflow-y-auto" style={{ background: '#111111' }}>
      <div className="px-8 py-8 w-full">
        {/* Header row */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-white mb-1">SEO</h1>
            <p className="text-sm" style={{ color: '#4A4A5A' }}>Search engine optimization health across your websites.</p>
          </div>
          <div className="shrink-0">
            <SiteSelector websites={websites} selected={selectedSite} onChange={setSelectedSite} />
          </div>
        </div>

        {/* Top row: Score ring + site breakdown side by side, full width */}
        <div className="flex gap-5 mb-6" style={{ minHeight: 180 }}>
          {/* Big SEO score card */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}
            className="rounded-2xl p-6 flex flex-col items-center justify-center relative overflow-hidden shrink-0"
            style={{ background: '#1A1A1A', border: '1px solid rgba(255,255,255,0.08)', width: 200 }}>
            <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: scoreColor }} />
            <ScoreRing score={seoScore} label="SEO Score" size={100} />
            <p className="text-xs mt-3 font-semibold" style={{ color: scoreColor }}>{scoreLabel}</p>
            <p className="text-[10px] mt-1 text-center" style={{ color: '#3A3A4A' }}>
              {activeSiteData ? activeSiteData.website_name : `Avg. across ${sitesWithData.length} site${sitesWithData.length !== 1 ? 's' : ''}`}
            </p>
          </motion.div>

          {/* Per-site SEO scores — fills remaining width */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.06 }}
            className="flex-1 rounded-2xl overflow-hidden"
            style={{ background: '#1A1A1A', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="px-5 py-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#3A3A4A' }}>Site Breakdown</p>
            </div>
            {loading ? (
              <div className="flex items-center gap-2 px-5 py-8">
                {[0,1,2].map(i => <motion.div key={i} className="w-2 h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.15)' }} animate={{ opacity: [0.2,0.8,0.2] }} transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.2 }} />)}
              </div>
            ) : sitesWithData.length === 0 ? (
              <p className="px-5 py-8 text-xs" style={{ color: '#3A3A4A' }}>Add websites to see SEO data.</p>
            ) : (
              <div className="grid grid-cols-1 xl:grid-cols-2 divide-x divide-white/[0.03]">
                {(sitesWithData.filter(w => !selectedSite || w.id === selectedSite)).map((w, i, arr) => {
                  const score = dataMap[w.id].scores.seo;
                  const c = score == null ? '#3A3A4A' : score >= 90 ? '#22C55E' : score >= 50 ? '#F59E0B' : '#EF4444';
                  const pct = score != null ? score : 0;
                  return (
                    <div key={w.id} className="px-5 py-3 transition-colors hover:bg-white/[0.02]"
                      style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <div className="flex items-center justify-between mb-1.5">
                        <p className="text-sm font-semibold text-white">{w.name}</p>
                        <span className="text-sm font-bold" style={{ color: c }}>{score ?? '—'}</span>
                      </div>
                      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                        <motion.div className="h-full rounded-full" style={{ background: c }}
                          initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.8, ease: 'easeOut' }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>
        </div>

        {/* Bottom row: Detected Issues + Checklist side by side */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          {/* SEO Insights from API */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest mb-4" style={{ color: '#3A3A4A' }}>Detected Issues</p>
            {seoInsights.length === 0 ? (
              <div className="rounded-2xl p-6 flex items-center justify-center" style={{ background: '#1A1A1A', border: '1px solid rgba(255,255,255,0.07)', minHeight: 120 }}>
                <p className="text-xs" style={{ color: '#3A3A4A' }}>No SEO issues detected{selectedSite ? ' for this site' : ''}.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                {seoInsights.map((insight, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="rounded-xl p-4 relative overflow-hidden"
                    style={{ background: '#1A1A1A', border: '1px solid rgba(255,255,255,0.07)' }}>
                    <div className="absolute left-0 top-0 bottom-0 w-[3px]" style={{ background: '#F59E0B' }} />
                    <p className="text-sm font-semibold text-white pl-2 mb-1">{insight.title}</p>
                    <p className="text-xs leading-relaxed pl-2" style={{ color: '#6A6A7A' }}>{insight.desc}</p>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* SEO Checklist */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest mb-4" style={{ color: '#3A3A4A' }}>SEO Checklist</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {seoChecklist.map((item, i) => (
                <motion.div key={item.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 + i * 0.04 }}
                  className="rounded-xl px-4 py-3 flex items-start gap-3"
                  style={{ background: '#1A1A1A', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.25)' }}>
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                      <polyline points="2,6 5,9 10,3" stroke="#22C55E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{item.label}</p>
                    <p className="text-xs mt-0.5 leading-relaxed" style={{ color: '#6A6A7A' }}>{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Score Ring
───────────────────────────────────────────── */
const ScoreRing: React.FC<{ score: number | null; label: string; size?: number }> = ({ score, label, size = 72 }) => {
  const r = size * 0.38;
  const cx = size / 2;
  const cy = size / 2;
  const circ = 2 * Math.PI * r;
  const pct = score != null ? Math.min(100, Math.max(0, score)) : 0;
  const offset = circ * (1 - pct / 100);
  const color = score == null ? '#2A2A35' : score >= 90 ? '#22C55E' : score >= 50 ? '#F59E0B' : '#EF4444';
  const label2 = score == null ? '—' : score >= 90 ? 'Good' : score >= 50 ? 'Needs Work' : 'Poor';
  return (
    <div className="flex flex-col items-center gap-2">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={size * 0.1} />
        {score != null && (
          <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth={size * 0.1}
            strokeDasharray={circ} strokeDashoffset={offset}
            strokeLinecap="round" style={{ transform: 'rotate(-90deg)', transformOrigin: `${cx}px ${cy}px`, transition: 'stroke-dashoffset 0.8s ease' }} />
        )}
        <text x={cx} y={cy + 1} textAnchor="middle" dominantBaseline="middle"
          fill="white" fontSize={size * 0.22} fontWeight="800" fontFamily="inherit">
          {score != null ? score : '—'}
        </text>
      </svg>
      <div className="text-center">
        <p className="text-xs font-semibold text-white">{label}</p>
        <p className="text-[10px] mt-0.5" style={{ color }}>{label2}</p>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Traffic Chart
───────────────────────────────────────────── */
function smoothBezier(pts: { x: number; y: number }[]): string {
  if (pts.length < 2) return '';
  let d = `M${pts[0].x.toFixed(2)},${pts[0].y.toFixed(2)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(pts.length - 1, i + 2)];
    const cp1x = p1.x + (p2.x - p0.x) / 5;
    const cp1y = p1.y + (p2.y - p0.y) / 5;
    const cp2x = p2.x - (p3.x - p1.x) / 5;
    const cp2y = p2.y - (p3.y - p1.y) / 5;
    d += ` C${cp1x.toFixed(2)},${cp1y.toFixed(2)} ${cp2x.toFixed(2)},${cp2y.toFixed(2)} ${p2.x.toFixed(2)},${p2.y.toFixed(2)}`;
  }
  return d;
}

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const TrafficChart: React.FC<{ data: number[]; siteName: string; loading: boolean }> = ({ data, siteName, loading }) => {
  const [tooltip, setTooltip] = React.useState<{ x: number; y: number; val: number; day: string } | null>(null);
  const [period, setPeriod] = React.useState<'7d'>('7d');
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = React.useState(800);

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(entries => {
      const w = entries[0]?.contentRect.width;
      if (w) setContainerWidth(w);
    });
    ro.observe(el);
    setContainerWidth(el.clientWidth);
    return () => ro.disconnect();
  }, []);

  // Chart geometry — uses real container width so text is never stretched
  const VW = containerWidth; const VH = 200;
  const pad = { top: 20, right: 20, bottom: 40, left: 52 };
  const cW = VW - pad.left - pad.right;
  const cH = VH - pad.top - pad.bottom;

  const dMin = Math.min(...data);
  const dMax = Math.max(...data);
  const dRange = dMax - dMin || 1;

  const xOf = (i: number) => pad.left + (i / (data.length - 1)) * cW;
  const yOf = (v: number) => pad.top + cH - ((v - dMin) / dRange) * cH;

  const points = data.map((v, i) => ({ x: xOf(i), y: yOf(v) }));
  const curvePath = smoothBezier(points);
  const areaClose = ` L${xOf(data.length - 1).toFixed(2)},${(pad.top + cH).toFixed(2)} L${xOf(0).toFixed(2)},${(pad.top + cH).toFixed(2)} Z`;
  const areaPath = curvePath + areaClose;

  // Y-axis: 4 evenly spaced labels
  const yTicks = [0, 0.33, 0.67, 1].map(t => ({
    val: Math.round(dMin + t * dRange),
    y: pad.top + cH - t * cH,
  }));

  // Change %
  const change = data.length >= 2
    ? (((data[data.length - 1] - data[0]) / (data[0] || 1)) * 100).toFixed(1)
    : null;
  const isUp = change !== null && Number(change) >= 0;

  const days = data.map((_, i) => DAYS[i % DAYS.length]);

  return (
    <motion.div ref={containerRef} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}
      className="rounded-2xl mb-6 relative overflow-hidden"
      style={{ background: '#1A1A1A', border: '1px solid rgba(255,255,255,0.08)' }}>

      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg, #5227FF, #7C5CFF, #A78BFF)' }} />

      {/* Header */}
      <div className="flex items-start justify-between px-6 pt-5 pb-4">
        <div>
          <div className="flex items-center gap-2.5 mb-0.5">
            <p className="text-base font-bold text-white">Traffic Trend</p>
            {change !== null && !loading && (
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full"
                style={{
                  background: isUp ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.12)',
                  color: isUp ? '#22C55E' : '#EF4444',
                  border: `1px solid ${isUp ? 'rgba(34,197,94,0.25)' : 'rgba(239,68,68,0.25)'}`,
                }}>
                {isUp ? '↑' : '↓'} {Math.abs(Number(change))}%
              </span>
            )}
          </div>
          <p className="text-xs" style={{ color: '#4A4A5A' }}>{siteName} — last 7 days</p>
        </div>
        {/* Period tabs */}
        <div className="flex gap-1 rounded-xl p-1" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
          {(['7d'] as const).map(p => (
            <button key={p} onClick={() => setPeriod(p)}
              className="px-3 py-1 rounded-lg text-[11px] font-bold transition-all"
              style={period === p
                ? { background: 'rgba(82,39,255,0.25)', color: '#A78BFF', border: '1px solid rgba(82,39,255,0.3)' }
                : { background: 'transparent', color: '#4A4A5A', border: '1px solid transparent' }}>
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="relative px-0 pb-0">
        <svg width={VW} height={VH + 20} viewBox={`0 0 ${VW} ${VH}`}
          onMouseLeave={() => setTooltip(null)}>
          <defs>
            <linearGradient id="trafficArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#5227FF" stopOpacity="0.18" />
              <stop offset="60%" stopColor="#5227FF" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#5227FF" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="trafficLine" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#5227FF" />
              <stop offset="100%" stopColor="#A78BFF" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Horizontal grid lines + Y labels */}
          {yTicks.map((tick, i) => (
            <g key={i}>
              <line x1={pad.left} x2={VW - pad.right} y1={tick.y} y2={tick.y}
                stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="4 4" />
              <text x={pad.left - 8} y={tick.y + 4} textAnchor="end"
                fill="#3A3A4A" fontSize="11" fontFamily="inherit">{tick.val}</text>
            </g>
          ))}

          {/* Vertical guide lines at each data point */}
          {points.map((p, i) => (
            <line key={i} x1={p.x} x2={p.x} y1={pad.top} y2={pad.top + cH}
              stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
          ))}

          {/* Area fill */}
          <path d={areaPath} fill="url(#trafficArea)" />

          {/* Glow line (blurred duplicate) */}
          <motion.path d={curvePath} fill="none" stroke="#5227FF" strokeWidth="4"
            strokeOpacity="0.25" filter="url(#glow)"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 1.4, ease: 'easeInOut' }} />

          {/* Main line */}
          <motion.path d={curvePath} fill="none" stroke="url(#trafficLine)" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 1.4, ease: 'easeInOut' }} />

          {/* X-axis day labels */}
          {points.map((p, i) => (
            <text key={i} x={p.x} y={VH - 8} textAnchor="middle"
              fill="#3A3A4A" fontSize="11" fontFamily="inherit">{days[i]}</text>
          ))}

          {/* Hover targets + dots */}
          {points.map((p, i) => (
            <g key={i}>
              {/* Invisible wide hit area */}
              <rect x={p.x - cW / (2 * (data.length - 1))} y={pad.top} width={cW / (data.length - 1)} height={cH}
                fill="transparent"
                onMouseEnter={() => setTooltip({ x: p.x, y: p.y, val: data[i], day: days[i] })} />
              {/* Dot ring */}
              <circle cx={p.x} cy={p.y} r="5" fill="#1A1A1A" stroke="rgba(82,39,255,0.4)" strokeWidth="1.5" />
              <circle cx={p.x} cy={p.y} r="2.5" fill="#7C5CFF" />
            </g>
          ))}

          {/* Tooltip */}
          {tooltip && (() => {
            const TW = 72; const TH = 40; const TR = 6;
            const tx = Math.min(Math.max(tooltip.x - TW / 2, pad.left), VW - pad.right - TW);
            const ty = tooltip.y - TH - 12;
            return (
              <g>
                {/* Stem */}
                <line x1={tooltip.x} x2={tooltip.x} y1={tooltip.y - 5} y2={tooltip.y - 14}
                  stroke="rgba(82,39,255,0.5)" strokeWidth="1" strokeDasharray="2 2" />
                {/* Box */}
                <rect x={tx} y={ty} width={TW} height={TH} rx={TR} ry={TR}
                  fill="#242430" stroke="rgba(82,39,255,0.4)" strokeWidth="1" />
                <text x={tx + TW / 2} y={ty + 14} textAnchor="middle"
                  fill="#A78BFF" fontSize="10" fontWeight="600" fontFamily="inherit">{tooltip.day}</text>
                <text x={tx + TW / 2} y={ty + 28} textAnchor="middle"
                  fill="white" fontSize="13" fontWeight="800" fontFamily="inherit">{tooltip.val}</text>
              </g>
            );
          })()}
        </svg>
      </div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────
   Panel View (Traffic)
───────────────────────────────────────────── */
const PanelView: React.FC = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [dataMap, setDataMap] = useState<Record<string, WebsiteInsights>>({});
  const [websites, setWebsites] = useState<Website[]>([]);
  const [selectedSite, setSelectedSite] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getAnalytics(), getWebsites()]).then(([a, ws]) => {
      setAnalytics(a);
      setWebsites(ws);
      ws.forEach((w) => {
        getInsights(w.id).then((data) => {
          setDataMap((prev) => ({ ...prev, [w.id]: data }));
        }).catch(() => {});
      });
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const sitesWithData = websites.filter(w => dataMap[w.id]);
  const activeSite = websites.find(w => w.id === selectedSite) ?? null;

  const rawSparkline = analytics?.sparkline ?? [];
  const pts = (() => {
    if (rawSparkline.length >= 7) return rawSparkline.slice(-7);
    if (rawSparkline.length >= 2) {
      // Interpolate sparse data to 7 points for a full-looking chart
      const out: number[] = [];
      for (let i = 0; i < 7; i++) {
        const t = i / 6;
        const srcIdx = t * (rawSparkline.length - 1);
        const lo = Math.floor(srcIdx);
        const hi = Math.min(rawSparkline.length - 1, lo + 1);
        out.push(Math.round(rawSparkline[lo] + (rawSparkline[hi] - rawSparkline[lo]) * (srcIdx - lo)));
      }
      return out;
    }
    return [20, 35, 28, 40, 32, 45, 50];
  })();

  // Scores for selected or avg
  const scores = (() => {
    if (activeSite && dataMap[activeSite.id]) return dataMap[activeSite.id].scores;
    const all = Object.values(dataMap);
    if (!all.length) return null;
    const avg = (key: keyof WebsiteInsights['scores']) => {
      const vals = all.map(d => d.scores[key]).filter((v): v is number => v != null);
      return vals.length ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length) : null;
    };
    return { performance: avg('performance'), accessibility: avg('accessibility'), best_practices: avg('best_practices'), seo: avg('seo') };
  })();

  const statCards = activeSite ? [
    { label: 'Site', value: activeSite.name, sub: activeSite.url.replace(/^https?:\/\//, '') },
    { label: 'Performance', value: dataMap[activeSite.id]?.scores.performance ?? '—', sub: 'PageSpeed score' },
    { label: 'Accessibility', value: dataMap[activeSite.id]?.scores.accessibility ?? '—', sub: 'A11y score' },
    { label: 'Best Practices', value: dataMap[activeSite.id]?.scores.best_practices ?? '—', sub: 'Quality score' },
  ] : [
    { label: 'Total Sites', value: analytics?.total_websites ?? websites.length, sub: 'Linked deployments' },
    { label: 'Deployments', value: analytics?.total_deployments ?? 0, sub: 'All time' },
    { label: 'Top Site', value: analytics?.top_website?.name ?? '—', sub: 'Most visited' },
    { label: 'Uptime', value: '99%', sub: 'Service availability' },
  ];

  return (
    <div className="w-full h-full overflow-y-auto" style={{ background: '#111111' }}>
      <div className="px-8 py-8 w-full">

        {/* Header row */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-white mb-1">Panel</h1>
            <p className="text-sm" style={{ color: '#4A4A5A' }}>Website traffic overview and performance metrics.</p>
          </div>
          <div className="shrink-0">
            <SiteSelector websites={websites} selected={selectedSite} onChange={setSelectedSite} />
          </div>
        </div>

        {/* Stat cards — always 4 columns filling full width */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
          {statCards.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }}
              className="relative rounded-2xl p-5" style={{ background: '#1A1A1A', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl" style={{ background: 'linear-gradient(90deg, #5227FF, #7C5CFF)' }} />
              <p className="text-2xl font-black text-white truncate mb-1">{loading ? '—' : s.value}</p>
              <p className="text-xs font-semibold text-white">{s.label}</p>
              <p className="text-[11px] mt-0.5 truncate" style={{ color: '#4A4A5A' }}>{s.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Traffic chart — full width */}
        <TrafficChart data={pts} siteName={activeSite?.name ?? 'All sites'} loading={loading} />

        {/* Score rings + site breakdown side by side, full width */}
        <div className="flex gap-5">

          {/* Score rings card */}
          {scores && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 }}
              className="rounded-2xl p-6 relative overflow-hidden shrink-0"
              style={{ background: '#1A1A1A', border: '1px solid rgba(255,255,255,0.08)', width: 320 }}>
              <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg, #5227FF, #7C5CFF, #A78BFF)' }} />
              <p className="text-sm font-bold text-white mb-1">
                {activeSite ? activeSite.name : 'Workspace Average'}
              </p>
              <p className="text-xs mb-5" style={{ color: '#4A4A5A' }}>
                {activeSite ? activeSite.url : `Avg. across ${sitesWithData.length} site${sitesWithData.length !== 1 ? 's' : ''}`}
              </p>
              <div className="grid grid-cols-2 gap-6">
                <ScoreRing score={scores.performance} label="Performance" size={72} />
                <ScoreRing score={scores.accessibility} label="Accessibility" size={72} />
                <ScoreRing score={scores.best_practices} label="Best Practices" size={72} />
                <ScoreRing score={scores.seo} label="SEO" size={72} />
              </div>
            </motion.div>
          )}

          {/* Per-site score table — fills remaining width */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}
            className="flex-1 rounded-2xl overflow-hidden"
            style={{ background: '#1A1A1A', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="px-5 py-3 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#3A3A4A' }}>Site Performance</p>
              <div className="flex items-center gap-4">
                {(['Performance','Accessibility','SEO'] as const).map(k => (
                  <span key={k} className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#3A3A4A' }}>{k}</span>
                ))}
              </div>
            </div>
            {loading ? (
              <div className="flex items-center gap-2 px-5 py-8">
                {[0,1,2].map(i => <motion.div key={i} className="w-2 h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.15)' }} animate={{ opacity: [0.2,0.8,0.2] }} transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.2 }} />)}
              </div>
            ) : websites.length === 0 ? (
              <p className="px-5 py-8 text-xs" style={{ color: '#3A3A4A' }}>Add websites to see traffic data.</p>
            ) : (sitesWithData.filter(w => !selectedSite || w.id === selectedSite)).map((w, i, arr) => {
              const s = dataMap[w.id].scores;
              const perf = s.performance;
              const c = perf == null ? '#3A3A4A' : perf >= 90 ? '#22C55E' : perf >= 50 ? '#F59E0B' : '#EF4444';
              return (
                <div key={w.id} className="px-5 py-3.5 transition-colors hover:bg-white/[0.02]"
                  style={{ borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-white truncate">{w.name}</p>
                      <p className="text-[11px] truncate" style={{ color: '#3A3A4A' }}>{w.url.replace(/^https?:\/\//, '')}</p>
                    </div>
                    <div className="flex items-center gap-6 shrink-0 ml-4">
                      {(['performance','accessibility','seo'] as const).map(key => {
                        const v = s[key]; const col = v == null ? '#3A3A4A' : v >= 90 ? '#22C55E' : v >= 50 ? '#F59E0B' : '#EF4444';
                        return <span key={key} className="text-sm font-bold w-8 text-right" style={{ color: col }}>{v ?? '—'}</span>;
                      })}
                    </div>
                  </div>
                  <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                    <motion.div className="h-full rounded-full" style={{ background: c }}
                      initial={{ width: 0 }} animate={{ width: `${perf ?? 0}%` }} transition={{ duration: 0.8, ease: 'easeOut' }} />
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Activity View
───────────────────────────────────────────── */
const ActivityView: React.FC = () => {
  const [activity, setActivity] = useState<ActivityEvent[]>([]);
  const [websites, setWebsites] = useState<Website[]>([]);
  const [selectedSite, setSelectedSite] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getActivity(50), getWebsites()])
      .then(([acts, ws]) => { setActivity(acts); setWebsites(ws); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filteredActivity = selectedSite
    ? activity.filter((a) =>
        (a.metadata as any)?.website_id === selectedSite ||
        websites.find((w) => w.id === selectedSite && (a.title.includes(w.name) || a.description.includes(w.name)))
      )
    : activity;

  return (
    <div className="w-full h-full overflow-y-auto" style={{ background: '#111111' }}>
      <div className="px-10 py-10">
        <h1 className="text-3xl font-extrabold text-white mb-1">Activity</h1>
        <p className="text-sm mb-6" style={{ color: '#4A4A5A' }}>A full log of actions and events in your workspace.</p>

        <SiteSelector websites={websites} selected={selectedSite} onChange={setSelectedSite} />

        <div className="rounded-2xl overflow-hidden" style={{ background: '#16161F', border: '1px solid rgba(255,255,255,0.06)' }}>
          {loading ? (
            <div className="flex items-center justify-center gap-2 py-14">
              {[0,1,2].map(i => <motion.div key={i} className="w-2 h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.15)' }} animate={{ opacity: [0.2,0.8,0.2] }} transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.2 }} />)}
            </div>
          ) : filteredActivity.length === 0 ? (
            <div className="py-14 text-center px-6">
              <div className="w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.04)', color: '#3A3A4A' }}><ActivityIcon /></div>
              <p className="text-xs" style={{ color: '#4A4A5A' }}>{selectedSite ? 'No activity for this site yet' : 'No activity yet'}</p>
            </div>
          ) : filteredActivity.map((act, i) => {
            const cfg = activityTypeConfig[act.type] || activityTypeConfig.update;
            return (
              <div key={act.id} className="flex items-start gap-3.5 px-5 py-4 transition-colors hover:bg-white/[0.02]"
                style={{ borderBottom: i < filteredActivity.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ background: `${cfg.color}15`, color: cfg.color }}>
                  {cfg.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white">{act.title}</p>
                  <p className="text-xs mt-0.5" style={{ color: '#4A4A5A' }}>{act.description}</p>
                </div>
                <span className="text-[10px] shrink-0 mt-0.5" style={{ color: '#3A3A4A' }}>{formatTimeAgo(act.created_at)}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Helpers
───────────────────────────────────────────── */
function getPerformanceScore(name: string): number {
  let hash = 0;
  for (let i = 0; i < name.length; i++) { hash = ((hash << 5) - hash) + name.charCodeAt(i); hash |= 0; }
  return 55 + (Math.abs(hash) % 41);
}

function formatTimeAgo(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diff = Math.max(0, now - then);
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

const WebsitesView: React.FC = () => {
  const [websites, setWebsites] = useState<Website[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<Website | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editTarget, setEditTarget] = useState<Website | null>(null);
  const [iframeError, setIframeError] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getWebsites();
      setWebsites(data);
      if (data.length > 0 && !selected) setSelected(data[0]);
    } catch (e: any) {
      setError(e.message || 'Failed to load websites.');
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleAdd = (w: Website) => {
    setWebsites((prev) => [w, ...prev]);
    setSelected(w);
    setShowForm(false);
  };

  const handleUpdate = (w: Website) => {
    setWebsites((prev) => prev.map((x) => (x.id === w.id ? w : x)));
    if (selected?.id === w.id) setSelected(w);
    setEditTarget(null);
  };

  const handleDelete = async (id: string) => {
    await deleteWebsite(id);
    const remaining = websites.filter((w) => w.id !== id);
    setWebsites(remaining);
    if (selected?.id === id) setSelected(remaining[0] ?? null);
  };

  return (
    <div className="flex h-full" style={{ background: '#111111' }}>
      {/* Left panel — list */}
      <div className="w-72 shrink-0 flex flex-col h-full" style={{ background: '#171717', borderRight: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="p-4 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <h2 className="text-sm font-semibold text-white">My Websites</h2>
          <button
            onClick={() => { setShowForm(true); setEditTarget(null); }}
            className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
            style={{ background: 'rgba(255,255,255,0.08)', color: '#E5E5E5' }}
            title="Add website"
          >
            <PlusIcon />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-2">
          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="w-5 h-5 border-2 rounded-full animate-spin" style={{ borderColor: 'rgba(255,255,255,0.1)', borderTopColor: '#E5E5E5' }} />
            </div>
          )}
          {!loading && error && <div className="text-red-400 text-xs text-center py-8 px-4">{error}</div>}
          {!loading && !error && websites.length === 0 && (
            <div className="text-xs text-center py-12 px-4 leading-relaxed" style={{ color: '#4A4A5A' }}>
              No websites yet.<br />Click <span style={{ color: '#E5E5E5' }}>+</span> to add your first Vercel URL.
            </div>
          )}
          {!loading && websites.map((w) => (
            <button
              key={w.id}
              onClick={() => { setSelected(w); setIframeError(false); }}
              className="w-full text-left px-3 py-2.5 rounded-xl mb-1 transition-all group flex items-center gap-3"
              style={selected?.id === w.id
                ? { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.14)' }
                : { background: 'transparent', border: '1px solid transparent' }}
              onMouseEnter={(e) => { if (selected?.id !== w.id) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'; }}
              onMouseLeave={(e) => { if (selected?.id !== w.id) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
            >
              <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: selected?.id === w.id ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.06)', color: selected?.id === w.id ? '#FFFFFF' : '#4A4A5A' }}>
                <GlobeIcon />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate text-white">{w.name}</p>
                <p className="text-[11px] truncate" style={{ color: '#4A4A5A' }}>{w.url}</p>
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                <span role="button" onClick={(e) => { e.stopPropagation(); setEditTarget(w); setShowForm(true); }}
                  className="w-6 h-6 flex items-center justify-center rounded transition-colors"
                  style={{ color: '#4A4A5A' }}
                  onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = '#FFFFFF'}
                  onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = '#4A4A5A'}
                  title="Edit"><EditIcon /></span>
                <span role="button" onClick={(e) => { e.stopPropagation(); handleDelete(w.id); }}
                  className="w-6 h-6 flex items-center justify-center rounded transition-colors text-red-500"
                  title="Delete"><TrashIcon /></span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Right panel — viewer */}
      <div className="flex-1 flex flex-col overflow-hidden" style={{ background: '#111111' }}>
        {/* Site selector strip */}
        {websites.length > 0 && (
          <div className="px-4 py-2 flex items-center gap-2 flex-wrap shrink-0"
            style={{ background: '#171717', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            {websites.map((w) => (
              <button key={w.id} onClick={() => { setSelected(w); setIframeError(false); }}
                className="px-3 py-1 rounded-full text-xs font-semibold transition-all max-w-[140px] truncate"
                style={selected?.id === w.id
                  ? { background: 'rgba(82,39,255,0.18)', color: '#A78BFF', border: '1px solid rgba(82,39,255,0.35)' }
                  : { background: 'transparent', color: '#4A4A5A', border: '1px solid rgba(255,255,255,0.07)' }}>
                {w.name}
              </button>
            ))}
          </div>
        )}
        {selected ? (
          <>
            {/* Toolbar */}
            <div className="h-12 flex items-center gap-3 px-4 shrink-0"
              style={{ background: '#171717', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                <div className="w-3 h-3 rounded-full bg-[#28C840]" />
              </div>
              <div className="flex-1 rounded-lg px-3 py-1 text-xs truncate"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)', color: '#4A4A5A' }}>
                {selected.url}
              </div>
              <a href={selected.url} target="_blank" rel="noopener noreferrer"
                className="w-7 h-7 flex items-center justify-center rounded-lg transition-colors shrink-0"
                style={{ color: '#4A4A5A' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.07)'; (e.currentTarget as HTMLElement).style.color = '#fff'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#4A4A5A'; }}
                title="Open in new tab"><ExternalLinkIcon /></a>
              <button onClick={() => setIframeError(false)}
                className="w-7 h-7 flex items-center justify-center rounded-lg transition-colors shrink-0"
                style={{ color: '#4A4A5A' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.07)'; (e.currentTarget as HTMLElement).style.color = '#fff'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#4A4A5A'; }}
                title="Reload"><RefreshIcon /></button>
            </div>

            {/* iFrame */}
            <div className="flex-1 relative" style={{ background: '#111111' }}>
              {iframeError ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8" style={{ background: '#111111' }}>
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: '#4A4A5A' }}>
                    <BlockIcon />
                  </div>
                  <h3 className="text-white font-semibold mb-2">Preview blocked</h3>
                  <p className="text-sm mb-5 max-w-sm leading-relaxed" style={{ color: '#4A4A5A' }}>
                    This site blocked embedding. Add the following to its <code style={{ color: '#E5E5E5' }}>vercel.json</code>:
                  </p>
                  <pre className="rounded-xl px-5 py-4 text-xs text-left w-full max-w-md overflow-x-auto"
                    style={{ background: '#16161F', border: '1px solid rgba(255,255,255,0.06)', color: '#E5E5E5' }}>
{`{
  "headers": [{
    "source": "/(.*)",
    "headers": [{
      "key": "X-Frame-Options",
      "value": "SAMEORIGIN"
    }]
  }]
}`}
                  </pre>
                  <a href={selected.url} target="_blank" rel="noopener noreferrer"
                    className="mt-5 px-5 py-2 text-white text-sm font-semibold rounded-full transition-colors"
                    style={{ background: '#242424', border: '1px solid rgba(255,255,255,0.1)' }}>
                    Open in new tab
                  </a>
                </div>
              ) : (
                <iframe key={selected.id} src={selected.url} title={selected.name}
                  className="w-full h-full border-0"
                  onError={() => setIframeError(true)}
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups" />
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-center px-8">
            <div>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: '#E5E5E5' }}>
                <GlobeIcon />
              </div>
              <p className="text-white font-medium mb-1">No website selected</p>
              <p className="text-sm" style={{ color: '#4A4A5A' }}>Add a website from the panel to preview it here.</p>
            </div>
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      <AnimatePresence>
        {showForm && (
          <WebsiteFormModal
            existing={editTarget}
            onClose={() => { setShowForm(false); setEditTarget(null); }}
            onSave={editTarget ? handleUpdate : handleAdd}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Add / Edit Modal
───────────────────────────────────────────── */
interface WebsiteFormModalProps {
  existing: Website | null;
  onClose: () => void;
  onSave: (w: Website) => void;
}

const WebsiteFormModal: React.FC<WebsiteFormModalProps> = ({ existing, onClose, onSave }) => {
  const [name, setName] = useState(existing?.name ?? '');
  const [url, setUrl] = useState(existing?.url ?? '');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => { nameRef.current?.focus(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    let finalUrl = url.trim();
    if (finalUrl && !/^https?:\/\//i.test(finalUrl)) finalUrl = `https://${finalUrl}`;

    if (!name.trim()) { setError('Name is required.'); return; }
    if (!finalUrl) { setError('URL is required.'); return; }

    setSaving(true);
    try {
      const result = existing
        ? await updateWebsite(existing.id, { name: name.trim(), url: finalUrl })
        : await addWebsite({ name: name.trim(), url: finalUrl });
      onSave(result!);
    } catch (err: any) {
      setError(err.message || 'Failed to save website.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }} transition={{ duration: 0.15 }}
        className="rounded-2xl p-6 w-full max-w-md mx-4"
        style={{ background: '#1C1C27', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 24px 60px rgba(0,0,0,0.45)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-white font-semibold text-base mb-5">
          {existing ? 'Edit Website' : 'Add Website'}
        </h3>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-xs mb-1.5 block" style={{ color: '#4A4A5A' }}>Name</label>
            <input
              ref={nameRef}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="My Portfolio"
              className="w-full rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none transition-colors"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
              onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.24)')}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
            />
          </div>

          <div>
            <label className="text-xs mb-1.5 block" style={{ color: '#4A4A5A' }}>Vercel URL</label>
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://my-app.vercel.app"
              className="w-full rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none transition-colors"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
              onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.24)')}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
            />
          </div>

          {error && <p className="text-red-400 text-xs">{error}</p>}

          <div className="flex gap-3 mt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors"
              style={{ border: '1px solid rgba(255,255,255,0.08)', color: '#6B6B7A' }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 py-2.5 rounded-xl text-white text-sm font-semibold disabled:opacity-50 transition-all"
              style={{ background: '#242424', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              {saving ? 'Saving…' : existing ? 'Update' : 'Add Website'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default DashboardPage;

/* ─────────────────────────────────────────────
   Icons
───────────────────────────────────────────── */
const BarChartIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" x2="18" y1="20" y2="10"/><line x1="12" x2="12" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="14"/>
  </svg>
);
const DashboardIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/>
    <rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/>
  </svg>
);
const WebsiteIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="2" x2="22" y1="12" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);
const GlobeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="2" x2="22" y1="12" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);
const LogoutIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/>
  </svg>
);
const ProfileIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);
const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="12" x2="12" y1="5" y2="19"/><line x1="5" x2="19" y1="12" y2="12"/>
  </svg>
);
const EditIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);
const TrashIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
    <path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
  </svg>
);
const ExternalLinkIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/>
  </svg>
);
const RefreshIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 4 23 10 17 10"/>
    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
  </svg>
);
const BlockIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
    <circle cx="12" cy="12" r="10"/><line x1="4.93" x2="19.07" y1="4.93" y2="19.07"/>
  </svg>
);
const SparkleIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#7C5CFF' }}>
    <path d="M12 3l1.912 5.813L20 10l-6.088 1.187L12 17l-1.912-5.813L4 10l6.088-1.187L12 3z"/>
    <path d="M19 15l.703 2.297L22 18l-2.297.703L19 21l-.703-2.297L16 18l2.297-.703L19 15z"/>
  </svg>
);
const ZapIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);
const LayoutIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="18" x="3" y="3" rx="2"/><line x1="3" x2="21" y1="9" y2="9"/><line x1="9" x2="9" y1="9" y2="21"/>
  </svg>
);
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/>
  </svg>
);
const ShieldIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);
const RocketIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
    <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
  </svg>
);
const AlertIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/>
  </svg>
);
const CheckCircleIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);
const ActivityIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
  </svg>
);

const tagColors: Record<string, string> = {
  Performance: '#22C55E',
  UX: '#3B82F6',
  SEO: '#F59E0B',
  Security: '#EF4444',
};

const tagIcons: Record<string, React.ReactNode> = {
  Performance: <ZapIcon />,
  UX: <LayoutIcon />,
  SEO: <SearchIcon />,
  Security: <ShieldIcon />,
};

const defaultInsights: InsightItem[] = [
  { title: 'Add your first website', desc: 'Link a deployment to get AI-powered insights about performance, SEO, and accessibility.', tag: 'Performance' },
  { title: 'Check back for analysis', desc: "Once you add websites, we'll analyze them and show actionable recommendations.", tag: 'UX' },
  { title: 'Mobile responsiveness', desc: "We'll check your sites for mobile viewport configuration and tap target sizing.", tag: 'UX' },
];

const activityTypeConfig: Record<string, { color: string; icon: React.ReactNode }> = {
  deployment: { color: '#22C55E', icon: <RocketIcon /> },
  update: { color: '#3B82F6', icon: <EditIcon /> },
  delete: { color: '#EF4444', icon: <TrashIcon /> },
  alert: { color: '#F59E0B', icon: <AlertIcon /> },
  system: { color: '#22C55E', icon: <CheckCircleIcon /> },
};


