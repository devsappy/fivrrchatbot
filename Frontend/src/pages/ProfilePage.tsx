import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(user?.user_metadata?.first_name || '');
  const [lastName, setLastName] = useState(user?.user_metadata?.last_name || '');
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState<string | null>(null);
  const [copyMsg, setCopyMsg] = useState<'idle' | 'copied'>('idle');

  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;
    const tiles = Array.from(gridRef.current.children) as HTMLDivElement[];
    gsap.set(tiles, { opacity: 0, y: 30, scale: 0.97 });
    gsap.to(tiles, { opacity: 1, y: 0, scale: 1, stagger: 0.05, duration: 0.5, ease: 'power3.out' });
  }, []);

  useEffect(() => {
    if (!gridRef.current || !isEditing) return;
    const formEls = gridRef.current.querySelectorAll('.edit-animate');
    gsap.set(formEls, { opacity: 0, x: -10 });
    gsap.to(formEls, { opacity: 1, x: 0, stagger: 0.04, duration: 0.35, ease: 'power2.out' });
  }, [isEditing]);

  const handleLogout = async () => {
    try { await logout(); } finally { navigate('/login'); }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveMsg(null);
    try {
      setIsEditing(false);
      setSaveMsg('Profile updated successfully.');
      setTimeout(() => setSaveMsg(null), 3000);
    } catch {
      setSaveMsg('Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  const handleCopyId = async () => {
    if (!user?.id) return;
    try {
      await navigator.clipboard.writeText(user.id);
      setCopyMsg('copied');
      setTimeout(() => setCopyMsg('idle'), 1600);
    } catch {
      setCopyMsg('idle');
    }
  };

  const initials = `${user?.user_metadata?.first_name?.charAt(0) || ''}${user?.user_metadata?.last_name?.charAt(0) || ''}` || user?.email?.charAt(0).toUpperCase() || 'U';
  const displayName = [user?.user_metadata?.first_name, user?.user_metadata?.last_name].filter(Boolean).join(' ') || user?.email?.split('@')[0] || 'User';
  const memberSince = (user as any)?.created_at ? new Date((user as any).created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '—';

  const tile = (tone: 'default' | 'muted' | 'danger' = 'default'): React.CSSProperties => ({
    background: tone === 'muted' ? '#14141B' : '#101017',
    border: tone === 'danger' ? '1px solid rgba(239,68,68,0.16)' : '1px solid rgba(255,255,255,0.06)',
    borderRadius: 22,
    boxShadow: '0 8px 24px rgba(0,0,0,0.16)',
    overflow: 'hidden',
  });

  const accent = '#1C1C25';

  const hoverLift = (e: React.MouseEvent<HTMLElement>) => {
    gsap.to(e.currentTarget, { y: -2, boxShadow: '0 14px 30px rgba(0,0,0,0.22)', borderColor: 'rgba(255,255,255,0.1)', duration: 0.22, ease: 'power2.out' });
  };
  const hoverLeave = (e: React.MouseEvent<HTMLElement>) => {
    gsap.to(e.currentTarget, { y: 0, boxShadow: '0 8px 24px rgba(0,0,0,0.16)', borderColor: 'rgba(255,255,255,0.06)', duration: 0.22, ease: 'power2.out' });
  };

  return (
    <div className="relative w-full h-full overflow-y-auto overflow-x-hidden" style={{ background: '#0B0B10' }}>
      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1480px] flex-col px-5 py-6 lg:px-8 lg:py-8">
        <div className="mb-6 flex items-start justify-between gap-4 shrink-0">
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: '#B8B8CC' }}>Account</p>
            <h1 className="text-3xl font-semibold tracking-tight text-white lg:text-[2.6rem]">Profile</h1>
            <p className="mt-2 text-sm" style={{ color: '#8A8AA0' }}>Minimal account overview with quick actions and identity details.</p>
          </div>
          <button onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#A1A1B8' }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'; e.currentTarget.style.color = '#F3F4F6'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = '#A1A1B8'; }}>
            <ArrowLeftIcon /> Dashboard
          </button>
        </div>

        <div
          ref={gridRef}
          className="grid flex-1 auto-rows-[minmax(120px,auto)] grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-12 xl:gap-5"
        >

          <div className="relative md:col-span-2 xl:col-span-5 xl:row-span-3" style={tile()}
            onMouseEnter={hoverLift} onMouseLeave={hoverLeave}>
            <div className="relative flex h-full flex-col justify-between p-6 lg:p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.24em]" style={{ color: '#8A8AA0' }}>Primary Identity</p>
                  <p className="mt-2 text-sm leading-6" style={{ color: '#B5B6C8' }}>Everything important on one canvas with less chrome and clearer grouping.</p>
                </div>
                <div className="rounded-full px-3 py-1 text-[11px] font-semibold" style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.22)', color: '#86EFAC' }}>
                  Active
                </div>
              </div>

              <div className="mt-10 flex flex-col items-start">
                <div className="relative mb-5">
                  <div className="flex h-20 w-20 items-center justify-center rounded-[26px] text-2xl font-semibold text-white lg:h-24 lg:w-24"
                    style={{ background: '#1B1B24', border: '1px solid rgba(255,255,255,0.07)' }}>
                    {initials}
                  </div>
                  <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full"
                    style={{ background: '#22C55E', border: '3px solid #101017' }}>
                    <CheckIcon />
                  </div>
                </div>
                <h2 className="max-w-full truncate text-2xl font-semibold text-white lg:text-[2rem]">{displayName}</h2>
                <p className="mt-2 max-w-full truncate text-sm" style={{ color: '#8A8AA0' }}>{user?.email}</p>
              </div>
            </div>
          </div>

          <div className="relative flex items-center p-5 md:col-span-1 xl:col-span-3 xl:row-span-1" style={tile('muted')}
            onMouseEnter={hoverLift} onMouseLeave={hoverLeave}>
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 mr-4"
              style={{ background: 'rgba(139,92,246,0.14)', color: '#C4B5FD' }}>
              <CalendarIcon />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em]" style={{ color: '#73738A' }}>Member Since</p>
              <p className="mt-2 text-base font-semibold text-white truncate">{memberSince}</p>
            </div>
          </div>

          <div className="relative flex items-center p-5 md:col-span-1 xl:col-span-4 xl:row-span-1" style={tile('muted')}
            onMouseEnter={hoverLift} onMouseLeave={hoverLeave}>
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 mr-4"
              style={{ background: 'rgba(244,114,182,0.10)', color: '#F9A8D4' }}>
              <FingerprintIcon />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em]" style={{ color: '#73738A' }}>User ID</p>
              <p className="mt-2 text-sm font-mono truncate" style={{ color: '#DDD6FE' }}>{user?.id ? `${user.id.slice(0, 12)}…${user.id.slice(-4)}` : '—'}</p>
            </div>
            <button onClick={handleCopyId}
              className="shrink-0 rounded-full px-3 py-2 text-xs font-medium transition-colors"
              style={{ color: copyMsg === 'copied' ? '#F3F4F6' : '#B5B6C8', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
              title="Copy ID">
              <span className="flex items-center gap-2">
                <CopyIcon />
                {copyMsg === 'copied' ? 'Copied' : 'Copy'}
              </span>
            </button>
          </div>

          <div className="relative md:col-span-2 xl:col-span-7 xl:row-span-3" style={tile()}>
            <div className="h-full flex flex-col p-5 lg:p-6">
              <div className="mb-5 flex items-center justify-between gap-4 shrink-0">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em]" style={{ color: '#73738A' }}>Details</p>
                  <h3 className="mt-2 text-lg font-semibold text-white">Personal Information</h3>
                </div>
                {!isEditing && (
                  <button onClick={() => setIsEditing(true)}
                    className="flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-all"
                    style={{ color: '#E5E7EB', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}>
                    <EditIcon /> Edit
                  </button>
                )}
              </div>

              {isEditing ? (
                <form onSubmit={handleSave} className="flex-1 flex flex-col gap-3 min-h-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 edit-animate">
                    <div>
                      <label className="text-[11px] font-semibold block mb-1.5" style={{ color: '#73738A' }}>First Name</label>
                      <input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First name"
                        className="w-full rounded-2xl px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.16)')}
                        onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')} />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold block mb-1.5" style={{ color: '#73738A' }}>Last Name</label>
                      <input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last name"
                        className="w-full rounded-2xl px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.16)')}
                        onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')} />
                    </div>
                  </div>
                  <div className="edit-animate">
                    <label className="text-[11px] font-semibold block mb-1.5" style={{ color: '#73738A' }}>Email</label>
                    <input value={user?.email || ''} disabled readOnly
                      className="w-full rounded-2xl px-4 py-3 text-sm text-white opacity-50 cursor-not-allowed"
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }} />
                    <p className="mt-2 text-[11px]" style={{ color: '#73738A' }}>Email cannot be changed here.</p>
                  </div>
                  {saveMsg && (
                    <p className={`edit-animate text-xs font-medium ${saveMsg.includes('success') ? 'text-green-400' : 'text-red-400'}`}>{saveMsg}</p>
                  )}
                  <div className="edit-animate flex gap-3 mt-auto pt-2">
                    <button type="button" onClick={() => { setIsEditing(false); setSaveMsg(null); }}
                      className="px-4 py-2 rounded-full text-sm font-medium transition-colors"
                      style={{ border: '1px solid rgba(255,255,255,0.08)', color: '#6B6B7A' }}
                      onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)')}
                      onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}>
                      Cancel
                    </button>
                    <button type="submit" disabled={saving}
                      className="px-4 py-2 rounded-full text-white text-sm font-semibold disabled:opacity-50"
                      style={{ background: accent, border: '1px solid rgba(255,255,255,0.08)' }}>
                      {saving ? 'Saving…' : 'Save Changes'}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2">
                  {[
                    { label: 'First Name', value: user?.user_metadata?.first_name || '—' },
                    { label: 'Last Name', value: user?.user_metadata?.last_name || '—' },
                    { label: 'Email', value: user?.email || '—' },
                    { label: 'Full Name', value: [user?.user_metadata?.first_name, user?.user_metadata?.last_name].filter(Boolean).join(' ') || '—' },
                  ].map((f) => (
                    <div key={f.label} className="rounded-[20px] p-4" style={{ background: '#14141B', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <p className="mb-2 text-[11px] uppercase tracking-[0.22em] font-semibold" style={{ color: '#73738A' }}>{f.label}</p>
                      <p className="text-sm text-white break-words">{f.value}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <button className="relative flex min-h-[180px] flex-col justify-between p-5 text-left md:col-span-1 xl:col-span-3 xl:row-span-2"
            style={tile('muted')}
            onMouseEnter={hoverLift} onMouseLeave={hoverLeave}
            onClick={() => navigate('/dashboard')}>
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.05)', color: '#D4D4E0' }}>
              <GlobeIconBig />
            </div>
            <div className="mt-10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em]" style={{ color: '#73738A' }}>Workspace</p>
              <p className="mt-2 text-lg font-semibold text-white">My Websites</p>
              <p className="mt-2 text-sm leading-6" style={{ color: '#8A8AA0' }}>Jump back to your linked previews and site management.</p>
            </div>
          </button>

          <div className="relative flex min-h-[180px] flex-col justify-between p-5 md:col-span-1 xl:col-span-2 xl:row-span-2" style={tile('muted')}
            onMouseEnter={hoverLift} onMouseLeave={hoverLeave}>
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.05)', color: '#86EFAC' }}>
              <ShieldIcon />
            </div>
            <div className="mt-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em]" style={{ color: '#73738A' }}>Security</p>
              <p className="mt-2 text-lg font-semibold text-white">Protected</p>
              <p className="mt-2 text-sm leading-6" style={{ color: '#8A8AA0' }}>Your current account session looks healthy.</p>
            </div>
            <div className="mt-4 w-fit rounded-full px-3 py-1 text-[10px] font-bold"
              style={{ background: 'rgba(34,197,94,0.15)', color: '#22C55E', border: '1px solid rgba(34,197,94,0.25)' }}>
              Protected
            </div>
          </div>

          <button className="relative flex min-h-[140px] flex-col justify-between p-5 text-left md:col-span-1 xl:col-span-2 xl:row-span-1"
            style={tile('muted')}
            onMouseEnter={hoverLift} onMouseLeave={hoverLeave}>
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.05)', color: '#D8B4FE' }}>
              <KeyIcon />
            </div>
            <div className="mt-6">
              <p className="text-base font-semibold text-white">Password</p>
              <p className="mt-2 text-sm" style={{ color: '#8A8AA0' }}>Change credentials</p>
            </div>
          </button>

          <button className="relative flex min-h-[140px] flex-col justify-between p-5 text-left md:col-span-1 xl:col-span-3 xl:row-span-1"
            style={tile('danger')}
            onMouseEnter={(e) => gsap.to(e.currentTarget, { y: -2, boxShadow: '0 14px 30px rgba(0,0,0,0.22)', borderColor: 'rgba(239,68,68,0.24)', duration: 0.22, ease: 'power2.out' })}
            onMouseLeave={(e) => gsap.to(e.currentTarget, { y: 0, boxShadow: '0 8px 24px rgba(0,0,0,0.16)', borderColor: 'rgba(239,68,68,0.16)', duration: 0.22, ease: 'power2.out' })}
            onClick={handleLogout}>
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center"
              style={{ background: 'rgba(239,68,68,0.1)', color: '#EF4444' }}>
              <LogoutIcon />
            </div>
            <div className="mt-6">
              <p className="text-base font-semibold text-red-400">Sign Out</p>
              <p className="mt-2 text-sm" style={{ color: '#8A8AA0' }}>End the current session</p>
            </div>
          </button>

          <div className="relative flex flex-col gap-4 px-5 py-4 md:col-span-2 xl:col-span-12 xl:row-span-1 xl:flex-row xl:items-center xl:justify-between" style={tile('muted')}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.05)', color: '#D4D4E0' }}>
                <ActivityIcon />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Session Active</p>
                <p className="text-sm" style={{ color: '#8A8AA0' }}>Your session is secure and up to date.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-full px-4 py-2" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs font-semibold text-green-300">Online</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Icons
───────────────────────────────────────────── */
const CheckIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const EditIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);
const ArrowLeftIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
  </svg>
);
const GlobeIconBig = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="2" x2="22" y1="12" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);
const KeyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
  </svg>
);
const LogoutIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" x2="9" y1="12" y2="12" />
  </svg>
);
const CalendarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);
const FingerprintIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12C2 6.5 6.5 2 12 2a10 10 0 0 1 8 4" /><path d="M5 19.5C5.5 18 6 15 6 12c0-.7.12-1.37.34-2" /><path d="M17.29 21.02c.12-.6.43-2.3.7-4.02a16.5 16.5 0 0 0 .01-4.58" /><path d="M12 10a2 2 0 0 0 0 4" /><path d="M2 16c.6 1.5 1.8 3 3 3" /><path d="M19 5c1 1.5 2 3.5 2 5" />
  </svg>
);
const CopyIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);
const ShieldIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const ActivityIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

export default ProfilePage;
