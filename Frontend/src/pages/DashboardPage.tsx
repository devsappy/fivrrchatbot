import React, { useCallback, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  Website,
  addWebsite,
  deleteWebsite,
  getWebsites,
  updateWebsite,
} from '../services/websitesApi';

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */
type ActiveView = 'dashboard' | 'websites';

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
    { label: 'Dashboard', icon: <DashboardIcon />, view: 'dashboard' },
    { label: 'My Websites', icon: <WebsiteIcon />, view: 'websites' },
  ];

  return (
    <div className="min-h-screen flex w-full font-sans overflow-hidden" style={{ background: '#0D0D12' }}>

      {/* ── Sidebar ── */}
      <motion.div
        initial={false}
        animate={{ width: isSidebarExpanded ? 260 : 72 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        onMouseEnter={() => setIsSidebarExpanded(true)}
        onMouseLeave={() => setIsSidebarExpanded(false)}
        className="flex flex-col justify-between py-6 px-3 shrink-0 relative z-20 h-screen overflow-hidden"
        style={{
          background: '#16161F',
          borderRight: '1px solid rgba(255,255,255,0.06)',
          boxShadow: '4px 0 24px rgba(0,0,0,0.4)',
        }}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 px-2 mb-10 h-12 overflow-hidden shrink-0">
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
                  style={isActive ? { background: 'rgba(82,39,255,0.2)', border: '1px solid rgba(82,39,255,0.3)' } : { border: '1px solid transparent' }}
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
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#5227FF] to-[#FF9FFC] flex items-center justify-center font-bold text-white text-sm shrink-0">
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
        </AnimatePresence>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Dashboard Overview
───────────────────────────────────────────── */
const DashboardOverview: React.FC<{ user: any; onNavigate: (v: ActiveView) => void }> = ({ user, onNavigate }) => {
  const [websites, setWebsites] = useState<Website[]>([]);
  const [loading, setLoading] = useState(true);
  const firstName = user?.user_metadata?.first_name || user?.email?.split('@')[0] || 'there';
  const initial = firstName.charAt(0).toUpperCase();

  // GSAP refs
  const greetRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const recentRef = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    getWebsites().then(setWebsites).catch(() => {}).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const targets = {
      greet:   greetRef.current,
      stats:   statsRef.current   ? gsap.utils.toArray(statsRef.current.children)   : [],
      actions: actionsRef.current ? gsap.utils.toArray(actionsRef.current.children) : [],
      recent:  recentRef.current,
    };

    // Pre-hide before first paint to avoid flash
    gsap.set([targets.greet, ...targets.stats, ...targets.actions, targets.recent], { opacity: 0 });
    gsap.set([targets.greet], { y: 40 });
    gsap.set(targets.stats,   { y: 50 });
    gsap.set(targets.actions, { x: -30 });
    gsap.set([targets.recent], { y: 30 });

    // Entrance timeline
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    if (targets.greet)            tl.to(targets.greet,            { opacity: 1, y: 0, duration: 0.7 }, 0);
    if (targets.stats.length)     tl.to(targets.stats,            { opacity: 1, y: 0, stagger: 0.1, duration: 0.6 }, 0.15);
    if (targets.actions.length)   tl.to(targets.actions,          { opacity: 1, x: 0, stagger: 0.08, duration: 0.5 }, 0.35);
    if (targets.recent)           tl.to(targets.recent,           { opacity: 1, y: 0, duration: 0.5 }, 0.5);

    // Floating orbs
    const orb1Anim = orb1Ref.current
      ? gsap.to(orb1Ref.current, { y: -30, x: 20, duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut' })
      : null;
    const orb2Anim = orb2Ref.current
      ? gsap.to(orb2Ref.current, { y: 25, x: -15, duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1 })
      : null;

    return () => {
      tl.kill();
      orb1Anim?.kill();
      orb2Anim?.kill();
    };
  }, []);

  // Animate counters when data loads
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

  const stats = [
    { label: 'Total Websites', value: websites.length, suffix: '', accent: '#5227FF', desc: 'Vercel deployments linked' },
    { label: 'Active Previews', value: websites.length, suffix: '', accent: '#5227FF', desc: 'Live iframe previews' },
    { label: 'Uptime', value: 99, suffix: '%', accent: '#5227FF', desc: 'Service availability' },
    { label: 'Account', value: null, suffix: '', accent: '#5227FF', desc: 'Fully activated', text: 'Active' },
  ];

  return (
    <div className="relative w-full h-full overflow-y-auto overflow-x-hidden min-h-0" style={{ background: '#0D0D12' }}>

      {/* Ambient orbs */}
      <div ref={orb1Ref} className="pointer-events-none absolute top-0 right-0 w-[500px] h-[500px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(82,39,255,0.18) 0%, transparent 65%)' }} />
      <div ref={orb2Ref} className="pointer-events-none absolute bottom-20 left-0 w-80 h-80 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(255,159,252,0.08) 0%, transparent 70%)' }} />

      <div className="relative z-10 px-10 py-10 w-full">

        {/* Greeting */}
        <div ref={greetRef} className="mb-12">
          <p className="text-sm font-semibold tracking-widest uppercase mb-2" style={{ color: '#5227FF' }}>
            {new Date().getHours() < 12 ? 'Good morning' : new Date().getHours() < 18 ? 'Good afternoon' : 'Good evening'}
          </p>
          <h1 className="text-5xl font-extrabold tracking-tight leading-none mb-3 text-white">
            Hey, {firstName}.
          </h1>
          <p className="text-base" style={{ color: '#4A4A5A' }}>Here's what's going on with your workspace today.</p>
        </div>

        {/* Stats grid */}
        <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {stats.map((s, idx) => (
            <div
              key={s.label}
              className="relative rounded-2xl p-6 flex flex-col justify-between overflow-hidden cursor-default"
              style={{
                minHeight: 180,
                background: '#16161F',
                border: '1px solid rgba(255,255,255,0.06)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
              }}
              onMouseEnter={(e) => gsap.to(e.currentTarget, {
                y: -4, boxShadow: '0 12px 36px rgba(82,39,255,0.2)', border: '1px solid rgba(82,39,255,0.3)',
                duration: 0.25, ease: 'power2.out',
              })}
              onMouseLeave={(e) => gsap.to(e.currentTarget, {
                y: 0, boxShadow: '0 4px 24px rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.06)',
                duration: 0.25, ease: 'power2.out',
              })}
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl"
                style={{ background: 'linear-gradient(90deg, #5227FF, #9F73FF)' }} />

              <div className="pt-3">
                <div className="text-5xl font-black tabular-nums tracking-tight text-white">
                  {s.text ? (
                    <span style={{ color: '#7C5CFF' }}>{s.text}</span>
                  ) : loading ? (
                    <span style={{ color: '#2A2A35' }}>—</span>
                  ) : (
                    <>
                      <span ref={(el) => { counterRefs.current[idx] = el; }} data-target={s.value}>{s.value}</span>
                      <span className="text-3xl ml-0.5" style={{ color: '#7C5CFF' }}>{s.suffix}</span>
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

        {/* Bottom two-col */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] xl:grid-cols-[1.1fr_0.9fr] gap-6">

          {/* Quick Actions */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
              <p className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: '#3A3A4A' }}>Quick Actions</p>
              <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
            </div>

            <div ref={actionsRef} className="flex flex-col gap-3">
              {[
                { label: 'Add a website', sub: 'Link a Vercel deployment', onClick: () => onNavigate('websites'), icon: <PlusIcon /> },
                { label: 'Browse previews', sub: 'View all linked sites', onClick: () => onNavigate('websites'), icon: <WebsiteIcon /> },
                { label: 'Visit Chatterify', sub: 'Go back to main site', href: '/', icon: <ExternalLinkIcon /> },
              ].map((a) => {
                const inner = (
                  <>
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 font-bold text-lg"
                      style={{ color: '#7C5CFF', background: 'rgba(82,39,255,0.12)', border: '1px solid rgba(82,39,255,0.2)' }}>
                      {a.icon}
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-sm font-semibold text-white">{a.label}</p>
                      <p className="text-xs mt-0.5" style={{ color: '#4A4A5A' }}>{a.sub}</p>
                    </div>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                      style={{ color: '#3A3A4A', background: 'rgba(255,255,255,0.04)' }}>
                      →
                    </div>
                  </>
                );
                const baseStyle = { background: '#16161F', border: '1px solid rgba(255,255,255,0.06)', boxShadow: '0 2px 12px rgba(0,0,0,0.3)' };
                return a.href ? (
                  <Link key={a.label} to={a.href}
                    className="flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-200 w-full group"
                    style={baseStyle}
                    onMouseEnter={(e) => gsap.to(e.currentTarget, { y: -2, boxShadow: '0 8px 28px rgba(82,39,255,0.18)', duration: 0.2 })}
                    onMouseLeave={(e) => gsap.to(e.currentTarget, { y: 0, boxShadow: '0 2px 12px rgba(0,0,0,0.3)', duration: 0.2 })}>
                    {inner}
                  </Link>
                ) : (
                  <button key={a.label} onClick={a.onClick}
                    className="flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-200 w-full text-left group"
                    style={baseStyle}
                    onMouseEnter={(e) => gsap.to(e.currentTarget, { y: -2, boxShadow: '0 8px 28px rgba(82,39,255,0.18)', duration: 0.2 })}
                    onMouseLeave={(e) => gsap.to(e.currentTarget, { y: 0, boxShadow: '0 2px 12px rgba(0,0,0,0.3)', duration: 0.2 })}>
                    {inner}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Recent Websites */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
              <p className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: '#3A3A4A' }}>Recent Websites</p>
              <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
            </div>

            <div ref={recentRef} className="rounded-2xl overflow-hidden"
              style={{ background: '#16161F', border: '1px solid rgba(255,255,255,0.06)', boxShadow: '0 4px 24px rgba(0,0,0,0.4)' }}>
              {loading ? (
                <div className="flex items-center justify-center py-14 gap-2">
                  {[0, 1, 2].map((i) => (
                    <motion.div key={i} className="w-2 h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.15)' }}
                      animate={{ opacity: [0.2, 0.8, 0.2] }}
                      transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.2 }} />
                  ))}
                </div>
              ) : websites.length === 0 ? (
                <div className="py-14 text-center px-6">
                  <div className="w-12 h-12 rounded-2xl mx-auto mb-3 flex items-center justify-center"
                    style={{ background: 'rgba(82,39,255,0.1)', color: '#5227FF' }}>
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
                  {websites.slice(0, 5).map((w, i) => (
                    <div key={w.id}
                      className="flex items-center gap-4 px-4 py-3 group transition-colors hover:bg-white/[0.02]"
                      style={{ borderBottom: i < Math.min(websites.length, 5) - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                      {/* Screenshot thumbnail */}
                      <div className="w-20 h-14 rounded-lg overflow-hidden shrink-0 relative"
                        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                        <img
                          src={`https://api.microlink.io/?url=${encodeURIComponent(w.url)}&screenshot=true&meta=false&embed=screenshot.url`}
                          alt={w.name}
                          className="w-full h-full object-cover object-top"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).style.display = 'none';
                            const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                            if (fallback) fallback.style.display = 'flex';
                          }}
                        />
                        {/* Fallback globe icon */}
                        <div className="absolute inset-0 items-center justify-center hidden"
                          style={{ color: '#3A3A4A' }}>
                          <GlobeIcon />
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-white truncate">{w.name}</p>
                        <p className="text-[11px] truncate mt-0.5" style={{ color: '#4A4A5A' }}>{w.url}</p>
                      </div>

                      <button onClick={() => onNavigate('websites')}
                        className="text-xs font-semibold shrink-0 px-3 py-1.5 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                        style={{ color: '#7C5CFF', background: 'rgba(82,39,255,0.1)' }}>
                        open →
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

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
    <div className="flex h-full" style={{ background: '#0D0D12' }}>
      {/* Left panel — list */}
      <div className="w-72 shrink-0 flex flex-col h-full" style={{ background: '#16161F', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="p-4 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <h2 className="text-sm font-semibold text-white">My Websites</h2>
          <button
            onClick={() => { setShowForm(true); setEditTarget(null); }}
            className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
            style={{ background: 'rgba(82,39,255,0.15)', color: '#7C5CFF' }}
            title="Add website"
          >
            <PlusIcon />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-2">
          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="w-5 h-5 border-2 rounded-full animate-spin" style={{ borderColor: 'rgba(255,255,255,0.1)', borderTopColor: '#5227FF' }} />
            </div>
          )}
          {!loading && error && <div className="text-red-400 text-xs text-center py-8 px-4">{error}</div>}
          {!loading && !error && websites.length === 0 && (
            <div className="text-xs text-center py-12 px-4 leading-relaxed" style={{ color: '#4A4A5A' }}>
              No websites yet.<br />Click <span style={{ color: '#7C5CFF' }}>+</span> to add your first Vercel URL.
            </div>
          )}
          {!loading && websites.map((w) => (
            <button
              key={w.id}
              onClick={() => { setSelected(w); setIframeError(false); }}
              className="w-full text-left px-3 py-2.5 rounded-xl mb-1 transition-all group flex items-center gap-3"
              style={selected?.id === w.id
                ? { background: 'rgba(82,39,255,0.2)', border: '1px solid rgba(82,39,255,0.35)' }
                : { background: 'transparent', border: '1px solid transparent' }}
              onMouseEnter={(e) => { if (selected?.id !== w.id) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'; }}
              onMouseLeave={(e) => { if (selected?.id !== w.id) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
            >
              <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: selected?.id === w.id ? 'rgba(82,39,255,0.3)' : 'rgba(255,255,255,0.06)', color: selected?.id === w.id ? '#9F80FF' : '#4A4A5A' }}>
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
                  onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = '#9F80FF'}
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
      <div className="flex-1 flex flex-col overflow-hidden" style={{ background: '#0D0D12' }}>
        {selected ? (
          <>
            {/* Toolbar */}
            <div className="h-12 flex items-center gap-3 px-4 shrink-0"
              style={{ background: '#16161F', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
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
            <div className="flex-1 relative" style={{ background: '#0D0D12' }}>
              {iframeError ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8" style={{ background: '#0D0D12' }}>
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: '#4A4A5A' }}>
                    <BlockIcon />
                  </div>
                  <h3 className="text-white font-semibold mb-2">Preview blocked</h3>
                  <p className="text-sm mb-5 max-w-sm leading-relaxed" style={{ color: '#4A4A5A' }}>
                    This site blocked embedding. Add the following to its <code style={{ color: '#7C5CFF' }}>vercel.json</code>:
                  </p>
                  <pre className="rounded-xl px-5 py-4 text-xs text-left w-full max-w-md overflow-x-auto"
                    style={{ background: '#16161F', border: '1px solid rgba(255,255,255,0.06)', color: '#7C5CFF' }}>
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
                    style={{ background: 'linear-gradient(135deg, #6B3FFF, #5227FF)', boxShadow: '0 4px 14px rgba(82,39,255,0.4)' }}>
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
                style={{ background: 'rgba(82,39,255,0.1)', border: '1px solid rgba(82,39,255,0.2)', color: '#5227FF' }}>
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
        style={{ background: '#1C1C27', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 24px 60px rgba(0,0,0,0.7)' }}
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
              onFocus={(e) => (e.currentTarget.style.borderColor = '#5227FF')}
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
              onFocus={(e) => (e.currentTarget.style.borderColor = '#5227FF')}
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
              style={{ background: 'linear-gradient(135deg, #6B3FFF, #5227FF)', boxShadow: '0 4px 14px rgba(82,39,255,0.4)' }}
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
const EyeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
);
const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
