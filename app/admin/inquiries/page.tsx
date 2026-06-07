'use client';

import * as React from 'react';
import { Trash2, Mail, CircleAlert, Zap } from 'lucide-react';
import { inquiries as inquiriesApi } from '@/lib/api';
import ConfirmDialog from '@/components/admin/ConfirmDialog';

interface Inquiry {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
  read: boolean;
}

const defaultInquiries: Inquiry[] = [
  { id: "inq-1", name: "Sadman Sakib", email: "sadman@live.com", message: "Is private one-on-one training with Coach Ishtiak available on Fridays? I want to focus purely on WBC boxing prep.", date: "2026-05-20", read: false },
  { id: "inq-2", name: "Zarin Subah", email: "zarin@gmail.com", message: "Do you have any female-only batches or is it completely co-ed? I'm standard beginner at Muay Thai.", date: "2026-05-19", read: true },
  { id: "inq-3", name: "Sajid Karim", email: "sajid.kar@yahoo.com", message: "Joined boxing federation earlier, interested in MMA high-performance session starting next month. Please share registration details.", date: "2026-05-18", read: true }
];

export default function InquiriesPage() {
  const [inquiries, setInquiries] = React.useState<Inquiry[]>(defaultInquiries);
  const [confirmDelete, setConfirmDelete] = React.useState<{ id: string; name: string } | null>(null);
  const [toast, setToast] = React.useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const triggerToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToast({ text, type });
    setTimeout(() => setToast(null), 3000);
  };

  React.useEffect(() => {
    const load = async () => {
      const res = await inquiriesApi.list();
      if (res.success && res.data) {
        setInquiries(res.data);
        localStorage.setItem('invictus_inquiries', JSON.stringify(res.data));
      } else {
        const stored = localStorage.getItem('invictus_inquiries');
        if (stored) {
          try { setInquiries(JSON.parse(stored)); } catch {}
        }
      }
    };
    load();
  }, []);

  const handleToggleInquiryRead = async (id: string) => {
    const target = inquiries.find(i => i.id === id);
    const newRead = !target?.read;
    const updated = inquiries.map(i => {
      if (i.id === id) {
        return { ...i, read: newRead };
      }
      return i;
    });
    setInquiries(updated);
    localStorage.setItem('invictus_inquiries', JSON.stringify(updated));
    const res = await inquiriesApi.toggleRead(id, newRead);
    if (!res.success) triggerToast('Failed to sync: ' + (res.error || 'server error'), 'error');
  };

  const handleDeleteInquiry = async (id: string) => {
    const res = await inquiriesApi.remove(id);
    if (!res.success) {
      triggerToast('Failed to delete: ' + (res.error || 'server error'), 'error');
      return;
    }
    const updated = inquiries.filter(i => i.id !== id);
    setInquiries(updated);
    localStorage.setItem('invictus_inquiries', JSON.stringify(updated));
    setConfirmDelete(null);
    triggerToast('Inquiry record deleted.');
  };

  return (
    <main className="flex-1 p-4 sm:p-8 space-y-8 max-w-7xl w-full mx-auto">
      {toast && (
        <div className={`fixed top-6 right-6 z-50 p-4 rounded-2xl border backdrop-blur-md max-w-sm shadow-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300 ${
          toast.type === 'success'
            ? 'bg-neutral-900/90 border-brand-accent/30 text-brand-accent shadow-brand-accent/5'
            : 'bg-red-950/90 border-red-500/30 text-red-100 shadow-red-500/5'
        }`}>
          <Zap className="w-4 h-4 shrink-0 animate-pulse text-brand-accent" />
          <div className="text-xs font-mono font-bold uppercase tracking-wider">{toast.text}</div>
        </div>
      )}

      <ConfirmDialog
        open={!!confirmDelete}
        title="Delete Inquiry"
        message={`Are you sure you want to delete the inquiry from ${confirmDelete?.name}?`}
        onConfirm={() => confirmDelete && handleDeleteInquiry(confirmDelete.id)}
        onCancel={() => setConfirmDelete(null)}
      />

      <header className="hidden md:flex items-center justify-between p-7 bg-brand-secondary/30 border-b border-brand-border/40 -mx-8 -mt-8 mb-8">
        <div>
          <h1 className="text-sm font-black uppercase tracking-wider text-white flex items-center gap-2.5">
            <Mail className="w-5 h-5 text-brand-accent" /> Dynamic Mail Inbox
          </h1>
          <p className="text-xs text-brand-muted mt-0.5 font-sans">Client contact messages and inquiries board.</p>
        </div>
        <div className="flex items-center gap-3 select-none">
          <span className="w-2.5 h-2.5 rounded-full bg-[#52fa7c] animate-ping shrink-0" />
          <span className="text-[10px] font-mono text-brand-muted uppercase tracking-wider">BMMAA ACTIVE SYSTEM</span>
        </div>
      </header>

      <div className="space-y-6">
        <div>
          <h3 className="text-base font-bold uppercase text-white tracking-widest">Client Contact Board Messages</h3>
        </div>

        <div className="space-y-4">
          {inquiries.length === 0 ? (
            <div className="p-16 text-center text-sm font-sans uppercase text-brand-muted bg-brand-secondary/40 border border-brand-border border-dashed rounded-2xl">
              Your mailbox is currently clean. No new inquiries.
            </div>
          ) : (
            inquiries.map((inq) => (
              <div
                key={inq.id}
                className={`p-6 bg-brand-secondary/45 border rounded-[2rem] space-y-4 transition-all duration-500 relative shadow-md ${
                  inq.read ? 'border-brand-border/80' : 'border-brand-accent/50 shadow-brand-accent/5'
                }`}
              >
                {!inq.read && (
                  <div className="absolute top-5 right-5 bg-brand-accent text-black font-mono font-black text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md select-none">
                    UNREAD MESSAGE
                  </div>
                )}

                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-brand-border/40 pb-4">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <span className="font-bold text-white text-base">{inq.name}</span>
                      <span className="text-[10px] font-mono text-brand-muted uppercase font-bold">({inq.date})</span>
                    </div>
                    <div className="text-xs text-brand-muted font-sans mt-0.5">{inq.email}</div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleToggleInquiryRead(inq.id)}
                      className={`px-4 py-2 font-mono text-[9px] font-bold uppercase tracking-wider rounded-xl border transition-colors cursor-pointer min-h-[34px] ${
                        inq.read
                          ? 'bg-brand-primary border-brand-border text-brand-muted hover:text-white hover:border-white/20'
                          : 'bg-brand-accent/10 border-brand-accent text-brand-accent hover:bg-brand-accent/20'
                      }`}
                    >
                      {inq.read ? 'UNREAD' : 'MARK READ'}
                    </button>

                    <button
                      onClick={() => setConfirmDelete({ id: inq.id, name: inq.name })}
                      className="p-2 border border-brand-border text-brand-muted hover:text-red-500 hover:border-red-500 rounded-xl transition-colors min-w-[34px] min-h-[34px] flex items-center justify-center cursor-pointer"
                      title="Delete Message"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <p className="text-sm text-brand-muted leading-relaxed font-sans bg-brand-primary/40 border border-brand-border/20 p-5 rounded-2xl italic">
                  &ldquo;{inq.message}&rdquo;
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
