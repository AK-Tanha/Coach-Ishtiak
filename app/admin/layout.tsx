'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Shield, Users, Calendar, Sliders, Mail, ShoppingBag, Package, Briefcase, Compass,
  ArrowLeft, Zap, CircleAlert, X, Menu, ChevronRight
} from 'lucide-react';
import { auth as authApi } from '@/lib/api';

interface Toast {
  text: string;
  type: 'success' | 'error';
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [authLoading, setAuthLoading] = React.useState(true);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loginError, setLoginError] = React.useState('');
  const [toast, setToast] = React.useState<Toast | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const triggerToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToast({ text, type });
    setTimeout(() => setToast(null), 3000);
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Shield, href: '/admin/dashboard' },
    { id: 'students', label: 'Athlete Leads', icon: Users, href: '/admin/students' },
    { id: 'schedule', label: 'Weekly Schedule', icon: Calendar, href: '/admin/schedule' },
    { id: 'pricing', label: 'Configure Plans', icon: Sliders, href: '/admin/pricing' },
    { id: 'inquiries', label: 'Client Inbox', icon: Mail, href: '/admin/inquiries' },
    { id: 'products', label: 'Manage Shop', icon: ShoppingBag, href: '/admin/products' },
    { id: 'orders', label: 'Shop Orders', icon: Package, href: '/admin/orders' },
    { id: 'experience', label: 'Experience Timeline', icon: Briefcase, href: '/admin/experience' },
    { id: 'content', label: 'Hero & About CMS', icon: Compass, href: '/admin/content' },
  ];

  const activeTab = pathname.split('/')[2] || 'dashboard';

  React.useEffect(() => {
    const checkAuth = async () => {
      const result = await authApi.verify();
      if (result.success) {
        setIsAuthenticated(true);
      }
      setAuthLoading(false);
    };
    checkAuth();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    if (!email || !password) {
      setLoginError('Email and password are required.');
      return;
    }
    const result = await authApi.login(email, password);
    if (result.success) {
      setIsAuthenticated(true);
      setLoginError('');
      triggerToast('Access Granted. Session Initialized.');
    } else {
      setLoginError(result.error || 'Invalid credentials. Access Denied.');
    }
  };

  const handleLogout = async () => {
    await authApi.logout();
    setIsAuthenticated(false);
    setEmail('');
    setPassword('');
    router.push('/admin');
    triggerToast('Security Lock Enabled. Logged out.');
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-brand-primary flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-brand-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-brand-muted text-xs font-mono">Verifying session...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-brand-primary flex items-center justify-center p-4 relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#141417_1px,transparent_1px),linear-gradient(to_bottom,#141417_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-25 pointer-events-none" />
        <div className="absolute top-4 left-4 sm:top-12 sm:left-12">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-mono font-bold text-brand-muted hover:text-brand-accent transition-colors">
            <ArrowLeft className="w-4 h-4" /> ← BACK TO HOME
          </Link>
        </div>

        <div className="w-full max-w-md p-8 sm:p-10 bg-brand-secondary/80 backdrop-blur-xl border border-brand-border/80 hover:border-brand-accent/20 transition-all duration-500 relative shadow-2xl rounded-[2.5rem]">
          <div className="mb-8 text-center sm:text-left">
            <div className="inline-flex p-4 rounded-full bg-brand-accent/10 border border-brand-accent/25 text-brand-accent mb-4">
              <Shield className="w-6 h-6 animate-pulse" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-black uppercase tracking-tight text-white mb-1.5">
              COACH <span className="text-brand-accent">CONSOLE</span>
            </h1>
            <p className="text-xs font-bold text-brand-muted tracking-widest uppercase">
              INVICTUS ATHLETICS SECURE AUDIT
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-brand-muted ml-1">ADMIN EMAIL</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@coachishtiak.com"
                className="w-full h-[48px] bg-brand-primary border border-brand-border/80 rounded-xl px-4 font-mono focus:border-brand-accent focus:outline-none text-white transition-all text-sm"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-brand-muted ml-1">PASSWORD</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full h-[48px] bg-brand-primary border border-brand-border/80 rounded-xl px-4 font-mono focus:border-brand-accent focus:outline-none text-white tracking-[0.2em] transition-all text-sm"
                required
              />
            </div>

            {loginError && (
              <div className="p-3.5 bg-red-950/25 border border-red-500/30 text-red-200 text-xs font-mono font-bold flex items-center gap-2.5 rounded-xl">
                <CircleAlert className="w-4 h-4 shrink-0 text-red-400" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-4 bg-brand-accent text-black font-black uppercase tracking-wider text-xs rounded-xl hover:bg-brand-accent-hover transition-colors min-h-[48px] cursor-pointer shadow-lg shadow-brand-accent/15"
            >
              SIGN IN
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-brand-border/60 text-center text-xs text-brand-muted leading-relaxed">
            Designed for intuitive mobile-and-desktop coaching workflows. Instantly modify training plans, schedules, and approve athlete logs.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-primary text-white font-sans antialiased relative flex flex-col md:flex-row">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#141417_1px,transparent_1px),linear-gradient(to_bottom,#141417_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-25 pointer-events-none -z-50" />
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand-accent/40 to-transparent z-50 pointer-events-none" />

      {toast && (
        <div className={`fixed md:top-6 md:right-6 bottom-24 md:bottom-auto left-1/2 -translate-x-1/2 md:translate-x-0 z-50 p-3 md:p-4 rounded-2xl border backdrop-blur-md max-w-sm w-[90vw] md:w-auto shadow-xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 md:slide-in-from-top-4 duration-300 ${
          toast.type === 'success'
            ? 'bg-neutral-900/90 border-brand-accent/30 text-brand-accent shadow-brand-accent/5'
            : 'bg-red-950/90 border-red-500/30 text-red-100 shadow-red-500/5'
        }`}>
          <Zap className="w-4 h-4 shrink-0 animate-pulse text-brand-accent" />
          <div className="text-xs font-mono font-bold uppercase tracking-wider">{toast.text}</div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-72 h-screen sticky top-0 bg-brand-secondary border-r border-brand-border/50 p-6 shrink-0 justify-between z-40">
        <div className="space-y-8">
          <div className="px-2">
            <Link href="/admin" className="inline-block group">
              <span className="text-xl font-display font-black tracking-tight text-white group-hover:text-brand-accent transition-colors">
                INVICTUS <span className="text-brand-accent font-extrabold text-2xl">.</span>
              </span>
              <span className="block text-[10px] uppercase tracking-widest font-mono text-brand-muted mt-1 font-bold">
                COACH ADMIN PORTAL
              </span>
            </Link>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-wider rounded-xl transition-all ${
                    isActive
                      ? 'bg-brand-accent text-black font-black shadow-lg shadow-brand-accent/15'
                      : 'text-brand-muted hover:text-white hover:bg-white/[0.02]'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-black' : ''}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-brand-border/60">
          <div className="flex items-center gap-3 px-2 mb-5">
            <div className="w-10 h-10 rounded-full bg-brand-accent/10 border border-brand-accent/25 flex items-center justify-center text-brand-accent font-black text-sm">
              CI
            </div>
            <div>
              <div className="text-xs font-bold text-white uppercase tracking-wider">Coach Ishtiak</div>
              <div className="text-[9px] font-mono text-brand-muted uppercase">WBC Boxer & Coach</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <Link
              href="/"
              className="px-3 py-2 border border-brand-border/60 hover:border-brand-accent/30 text-[9px] font-mono font-extrabold uppercase tracking-widest text-center text-brand-muted hover:text-white rounded-lg transition-all flex items-center justify-center min-h-[36px]"
            >
              GO BACK
            </Link>
            <button
              onClick={handleLogout}
              className="px-3 py-2 bg-red-500/10 border border-red-500/20 hover:bg-red-500 hover:border-red-500 hover:text-black text-[9px] font-mono font-extrabold uppercase tracking-widest text-center text-red-400 rounded-lg transition-all min-h-[36px] cursor-pointer"
            >
              SEC_EXIT
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Top Bar — compact branding + active page title */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-brand-secondary border-b border-brand-border/50 sticky top-0 z-40">
        <div className="flex items-center gap-3 min-w-0">
          <Link href="/admin" className="font-display font-black text-base tracking-tight text-white uppercase shrink-0">
            INVICTUS <span className="text-brand-accent">.</span>
          </Link>
          <span className="text-[10px] font-mono text-brand-muted uppercase tracking-wider truncate">
            {activeTab === 'dashboard' && 'Overview'}
            {activeTab === 'students' && 'Athlete Leads'}
            {activeTab === 'schedule' && 'Schedule'}
            {activeTab === 'pricing' && 'Pricing'}
            {activeTab === 'inquiries' && 'Inbox'}
            {activeTab === 'products' && 'Shop'}
            {activeTab === 'orders' && 'Orders'}
            {activeTab === 'experience' && 'Experience'}
            {activeTab === 'content' && 'CMS'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="px-2.5 py-1.5 border border-brand-border text-[9px] font-mono font-bold text-brand-muted rounded-lg hover:text-white uppercase transition-all"
          >
            Site
          </Link>
          <button
            onClick={handleLogout}
            className="px-2.5 py-1.5 border border-red-500/20 text-[9px] font-mono font-bold text-red-400 rounded-lg hover:bg-red-500 hover:text-black uppercase transition-all"
          >
            Exit
          </button>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-brand-secondary/95 backdrop-blur-xl border-t border-brand-border/50 safe-area-inset-bottom">
        <div className="flex items-center">
          {[
            { id: 'dashboard', label: 'Home', icon: Shield, href: '/admin/dashboard' },
            { id: 'students', label: 'Leads', icon: Users, href: '/admin/students' },
            { id: 'schedule', label: 'Schedule', icon: Calendar, href: '/admin/schedule' },
            { id: 'inquiries', label: 'Inbox', icon: Mail, href: '/admin/inquiries' },
            { id: 'products', label: 'Shop', icon: ShoppingBag, href: '/admin/products' },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`flex flex-1 flex-col items-center gap-0.5 py-1.5 rounded-xl transition-all ${
                  isActive
                    ? 'text-brand-accent'
                    : 'text-brand-muted hover:text-white'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'drop-shadow-[0_0_8px_rgba(204,255,0,0.4)]' : ''}`} />
                <span className={`text-[8px] leading-[10px] font-mono font-bold uppercase tracking-wider ${isActive ? 'text-brand-accent' : ''}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}

          {/* More button — opens a popup for remaining sections */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex flex-1 flex-col items-center gap-0.5 py-1.5 rounded-xl transition-all text-brand-muted hover:text-white"
          >
            <Menu className="w-5 h-5" />
            <span className="text-[8px] leading-[10px] font-mono font-bold uppercase tracking-wider">More</span>
          </button>
        </div>
      </nav>

      {/* More Drawer (slides up from bottom) */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex flex-col justify-end" onClick={() => setMobileMenuOpen(false)}>
          <div className="bg-black/50 absolute inset-0" />
          <div
            className="relative bg-brand-secondary border-t border-brand-border/50 rounded-t-3xl p-5 pb-24 space-y-1 animate-in slide-in-from-bottom-8 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-10 h-1 rounded-full bg-brand-border mx-auto mb-5" />
            <div className="text-[10px] font-mono font-bold text-brand-muted uppercase tracking-wider mb-3 px-1">All Sections</div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`w-full flex items-center gap-3 px-3 py-3 text-xs font-bold uppercase tracking-wider rounded-xl transition-all ${
                    isActive
                      ? 'bg-brand-accent text-black font-black'
                      : 'text-brand-muted hover:text-white hover:bg-white/[0.03]'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-black' : ''}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            <div className="pt-3 mt-3 border-t border-brand-border/40">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center gap-3 px-3 py-3 text-xs font-bold uppercase tracking-wider rounded-xl text-brand-muted hover:text-white hover:bg-white/[0.03] transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Go to Main Site</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 min-w-0 flex flex-col pb-16 md:pb-0">
        {children}
      </div>
    </div>
  );
}
