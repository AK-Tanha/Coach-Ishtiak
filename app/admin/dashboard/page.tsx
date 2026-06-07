'use client';

export default function DashboardPage() {
  return (
    <main className="flex-1 p-4 sm:p-8 space-y-8 max-w-7xl w-full mx-auto">
      <header className="hidden md:flex items-center justify-between p-7 bg-brand-secondary/30 border-b border-brand-border/40 -mx-8 -mt-8 mb-8">
        <div>
          <h1 className="text-sm font-black uppercase tracking-wider text-white">📊 Overview Dashboard</h1>
          <p className="text-xs text-brand-muted mt-0.5 font-sans">Active directory synchronized directly to client modules.</p>
        </div>
        <div className="flex items-center gap-3 select-none">
          <span className="w-2.5 h-2.5 rounded-full bg-[#52fa7c] animate-ping shrink-0" />
          <span className="text-[10px] font-mono text-brand-muted uppercase tracking-wider">BMMAA ACTIVE SYSTEM</span>
        </div>
      </header>

      <div className="text-center py-20 text-brand-muted">
        <p className="text-sm font-mono">Select a section from the sidebar to manage data.</p>
        <p className="text-xs text-brand-muted/60 mt-2">Dashboard metrics coming soon.</p>
      </div>
    </main>
  );
}
