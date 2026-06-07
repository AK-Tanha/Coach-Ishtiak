'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Mail, Phone, Calendar, Edit3, Send, ChevronRight, Zap, Loader2 } from 'lucide-react';
import { students as studentsApi } from '@/lib/api';
import MessageDialog from '@/components/admin/MessageDialog';

interface StudentDetail {
  id: string;
  name: string;
  email: string;
  phone: string;
  course: string;
  status: string;
  enrolledDate: string;
  image: string;
}

const defaultStudent: StudentDetail = {
  id: '', name: 'Unknown Athlete', email: 'N/A', phone: 'N/A',
  course: 'N/A', status: 'Pending', enrolledDate: '', image: ''
};

export default function StudentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [student, setStudent] = React.useState<StudentDetail | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [messageDialog, setMessageDialog] = React.useState<{ recipients: { id: string; name: string; phone: string; email: string }[] } | null>(null);
  const [toast, setToast] = React.useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [deleting, setDeleting] = React.useState(false);

  const triggerToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToast({ text, type });
    setTimeout(() => setToast(null), 3000);
  };

  React.useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await studentsApi.list();
        if (res.success && res.data) {
          const found = res.data.find((s: any) => s.id === id);
          if (found) { setStudent(found); setLoading(false); return; }
        }
      } catch {}
      const stored = localStorage.getItem('invictus_students');
      if (stored) {
        const parsed = JSON.parse(stored);
        const found = parsed.find((s: any) => s.id === id);
        if (found) { setStudent(found); setLoading(false); return; }
      }
      setStudent(defaultStudent);
      setLoading(false);
    };
    load();
  }, [id]);

  const handleDelete = async () => {
    if (!confirm('Remove this athlete from the database?')) return;
    setDeleting(true);
    const res = await studentsApi.remove(id);
    if (res.success) {
      const stored = localStorage.getItem('invictus_students');
      if (stored) {
        const parsed = JSON.parse(stored);
        localStorage.setItem('invictus_students', JSON.stringify(parsed.filter((s: any) => s.id !== id)));
      }
      router.push('/admin/students');
    } else {
      triggerToast('Failed to delete: ' + (res.error || 'server error'), 'error');
      setDeleting(false);
    }
  };

  const statusColors: Record<string, string> = {
    Active: 'bg-[#52fa7c]/10 text-[#2ee159] border-[#2ee159]/30',
    Pending: 'bg-amber-400/10 text-amber-500 border-amber-400/30',
    Canceled: 'bg-neutral-800 text-brand-muted border-brand-border',
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-primary flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-brand-accent animate-spin" />
      </div>
    );
  }

  if (!student || !student.id) {
    return (
      <div className="min-h-screen bg-brand-primary flex flex-col items-center justify-center gap-4 p-4">
        <div className="text-brand-muted font-mono text-xs uppercase tracking-wider">Athlete not found</div>
        <Link href="/admin/students" className="px-4 py-2 bg-brand-accent text-black font-bold text-xs rounded-xl uppercase tracking-wider">
          ← Back to Athletes
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-primary text-white font-sans antialiased relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#141417_1px,transparent_1px),linear-gradient(to_bottom,#141417_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-25 pointer-events-none -z-50" />
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand-accent/40 to-transparent z-50 pointer-events-none" />

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

      <div className="max-w-4xl mx-auto p-4 sm:p-8 space-y-6">

        {/* Back + Actions header */}
        <div className="flex items-center justify-between">
          <Link
            href="/admin/students"
            className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold text-brand-muted hover:text-brand-accent transition-colors uppercase tracking-wider"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMessageDialog({ recipients: [{ id: student.id, name: student.name, phone: student.phone, email: student.email }] })}
              className="px-3 py-2 bg-brand-primary border border-brand-border text-[9px] font-bold uppercase tracking-widest rounded-xl text-brand-accent hover:border-brand-accent transition-colors min-h-[36px] cursor-pointer flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" /> MESSAGE
            </button>
            <Link
              href={`/admin/students?id=${student.id}`}
              className="px-3 py-2 bg-brand-primary border border-brand-border text-[9px] font-bold uppercase tracking-widest rounded-xl text-white hover:border-brand-accent hover:text-brand-accent transition-colors min-h-[36px] flex items-center gap-1.5"
            >
              <Edit3 className="w-3.5 h-3.5" /> EDIT
            </Link>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="px-3 py-2 border border-red-500/20 text-[9px] font-bold uppercase tracking-widest rounded-xl text-red-400 hover:bg-red-500 hover:text-black transition-colors min-h-[36px] cursor-pointer disabled:opacity-50"
            >
              {deleting ? 'DELETING...' : 'DELETE'}
            </button>
          </div>
        </div>

        {/* Profile card */}
        <div className="bg-brand-secondary/40 border border-brand-border/80 rounded-[2rem] p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
            {/* Avatar */}
            <div className="relative w-20 h-20 sm:w-28 sm:h-28 rounded-full overflow-hidden shrink-0 border-2 border-brand-border bg-brand-primary">
              {student.image ? (
                <img src={student.image} alt={student.name} className="object-cover w-full h-full" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xl sm:text-2xl font-black text-brand-accent uppercase">
                  {student.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 text-center sm:text-left space-y-3">
              <div>
                <h1 className="text-xl sm:text-2xl font-display font-black text-white uppercase tracking-tight">{student.name}</h1>
                <div className="flex items-center justify-center sm:justify-start gap-2 mt-1.5">
                  <span className={`px-3 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${statusColors[student.status] || 'bg-neutral-800 text-brand-muted border-brand-border'}`}>
                    {student.status}
                  </span>
                  <span className="text-[9px] font-mono text-brand-muted uppercase tracking-wider">ID: {student.id}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-brand-border/40">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-brand-primary border border-brand-border rounded-lg text-brand-accent">
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-[8px] font-mono text-brand-muted uppercase tracking-wider">Phone</div>
                    <div className="text-xs font-mono font-bold text-white">{student.phone}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-brand-primary border border-brand-border rounded-lg text-brand-accent">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-[8px] font-mono text-brand-muted uppercase tracking-wider">Email</div>
                    <div className="text-xs font-sans text-white truncate">{student.email}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-brand-primary border border-brand-border rounded-lg text-brand-accent">
                    <Calendar className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-[8px] font-mono text-brand-muted uppercase tracking-wider">Enrolled</div>
                    <div className="text-xs font-mono font-bold text-white">{student.enrolledDate || 'N/A'}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Course & Details card */}
        <div className="bg-brand-secondary/40 border border-brand-border/80 rounded-[2rem] p-6 sm:p-8 shadow-xl">
          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-white border-b border-brand-border/40 pb-4 mb-5 font-display">
            Enrollment Details
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-brand-primary/50 border border-brand-border/40 rounded-xl">
              <span className="text-[10px] font-mono font-bold text-brand-muted uppercase tracking-wider">Course Plan</span>
              <span className="text-sm font-bold text-brand-accent">{student.course}</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-brand-primary/50 border border-brand-border/40 rounded-xl">
              <span className="text-[10px] font-mono font-bold text-brand-muted uppercase tracking-wider">Registration Date</span>
              <span className="text-sm font-mono font-bold text-white">{student.enrolledDate || 'N/A'}</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-brand-primary/50 border border-brand-border/40 rounded-xl">
              <span className="text-[10px] font-mono font-bold text-brand-muted uppercase tracking-wider">Membership Status</span>
              <span className={`px-3 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${statusColors[student.status] || 'bg-neutral-800 text-brand-muted border-brand-border'}`}>
                {student.status}
              </span>
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-2 gap-3">
          <Link
            href={`/admin/students`}
            className="flex items-center justify-between p-4 bg-brand-secondary/40 border border-brand-border/80 rounded-xl hover:border-brand-accent/40 transition-all group"
          >
            <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-brand-muted group-hover:text-brand-accent">All Athletes</span>
            <ChevronRight className="w-4 h-4 text-brand-muted group-hover:text-brand-accent" />
          </Link>
          <Link
            href={`/admin/schedule`}
            className="flex items-center justify-between p-4 bg-brand-secondary/40 border border-brand-border/80 rounded-xl hover:border-brand-accent/40 transition-all group"
          >
            <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-brand-muted group-hover:text-brand-accent">View Schedule</span>
            <ChevronRight className="w-4 h-4 text-brand-muted group-hover:text-brand-accent" />
          </Link>
        </div>
      </div>

      <MessageDialog
        open={!!messageDialog}
        recipients={messageDialog?.recipients || []}
        onClose={() => setMessageDialog(null)}
        onSent={(result) => {
          if (result.success) {
            triggerToast(`Message sent via ${result.channel.toUpperCase()}!`);
          } else {
            triggerToast('Failed to send message.', 'error');
          }
          setMessageDialog(null);
        }}
      />
    </div>
  );
}
