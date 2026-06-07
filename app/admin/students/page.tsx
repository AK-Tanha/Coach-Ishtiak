'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Users, Mail, Phone, Edit3, Trash2, Search, UserPlus, CheckCircle2, Clock, DollarSign, Zap, Plus, ArrowLeft, X, Send, MessageSquare, CheckCheck } from 'lucide-react';
import { auth as authApi, students as studentsApi } from '@/lib/api';
import ImageUploader from '@/components/admin/ImageUploader';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import MessageDialog from '@/components/admin/MessageDialog';

const defaultStudents = [
  { id: "st-1", name: "Tanvir Rahman", email: "tanvir@gmail.com", phone: "01711223344", course: "3 Months Course", status: "Active", enrolledDate: "2026-05-10", image: "/images/placeholder.svg" },
  { id: "st-2", name: "Fahim Ahmed", email: "fahim.ah@gmail.com", phone: "01822445566", course: "Monthly Plan", status: "Pending", enrolledDate: "2026-05-18", image: "/images/placeholder.svg" },
  { id: "st-3", name: "Imtiaz Hassan", email: "imtiaz@hassan.info", phone: "01677338899", course: "3 Months Course", status: "Active", enrolledDate: "2026-04-12", image: "" },
  { id: "st-4", name: "Anika Bushra", email: "anika.bushra@outlook.com", phone: "01944112233", course: "3 Months Course", status: "Active", enrolledDate: "2026-05-02", image: "" },
  { id: "st-5", name: "Raihan Kabir", email: "raihan@kabir.net", phone: "01588667744", course: "Monthly Plan", status: "Canceled", enrolledDate: "2026-05-15", image: "" }
];

export default function StudentsPage() {
  const [students, setStudents] = React.useState<typeof defaultStudents>([]);
  const [athleteSubTab, setAthleteSubTab] = React.useState<'list' | 'form'>('list');
  const [editingStudentId, setEditingStudentId] = React.useState<string | null>(null);
  const [editingStudentForm, setEditingStudentForm] = React.useState({ name: '', email: '', phone: '', course: '3 Months Course', status: 'Pending', image: '' });
  const [newStudent, setNewStudent] = React.useState({ name: '', email: '', phone: '', course: '3 Months Course', status: 'Pending', image: '' });
  const [studentSearch, setStudentSearch] = React.useState('');
  const [studentFilter, setStudentFilter] = React.useState('All');
  const [confirmDelete, setConfirmDelete] = React.useState<{ id: string; name: string } | null>(null);
  const [systemNotification, setSystemNotification] = React.useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set());
  const [messageDialog, setMessageDialog] = React.useState<{ recipients: { id: string; name: string; phone: string; email: string }[] } | null>(null);

  const triggerNotification = (text: string, type: 'success' | 'error' = 'success') => {
    setSystemNotification({ text, type });
    setTimeout(() => setSystemNotification(null), 3000);
  };

  const syncToStorage = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  React.useEffect(() => {
    const load = async () => {
      try {
        const res = await studentsApi.list();
        if (res.success && res.data) {
          setStudents(res.data);
          syncToStorage('invictus_students', res.data);
          return;
        }
      } catch {}
      const stored = localStorage.getItem('invictus_students');
      if (stored) {
        setStudents(JSON.parse(stored));
      } else {
        setStudents(defaultStudents);
        syncToStorage('invictus_students', defaultStudents);
      }
    };
    load();
  }, []);

  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudent.name || !newStudent.phone) {
      triggerNotification('Name and Phone are mandatory.', 'error');
      return;
    }
    const newlyCreated = {
      id: "st-" + Date.now(),
      name: newStudent.name,
      email: newStudent.email || "N/A",
      phone: newStudent.phone,
      course: newStudent.course,
      status: newStudent.status as 'Active' | 'Pending' | 'Canceled',
      enrolledDate: new Date().toISOString().split('T')[0],
      image: newStudent.image || ""
    };
    const updated = [newlyCreated, ...students];
    setStudents(updated);
    syncToStorage('invictus_students', updated);
    const createRes = await studentsApi.create(newlyCreated);
    if (!createRes.success) triggerNotification('Failed to sync: ' + (createRes.error || 'server error'), 'error');
    setNewStudent({ name: '', email: '', phone: '', course: '3 Months Course', status: 'Pending', image: '' });
    setAthleteSubTab('list');
    triggerNotification(`Athlete ${newlyCreated.name} successfully registered!`);
  };

  const startEditingStudent = (student: any) => {
    setEditingStudentId(student.id);
    setEditingStudentForm({
      name: student.name,
      email: student.email === 'N/A' || !student.email ? '' : student.email,
      phone: student.phone,
      course: student.course,
      status: student.status,
      image: student.image || ''
    });
    setAthleteSubTab('form');
    triggerNotification(`Editing record of: ${student.name}`);
  };

  const saveEditedStudent = async (id: string) => {
    if (!editingStudentForm.name || !editingStudentForm.phone) {
      triggerNotification('Name and Phone are required.', 'error');
      return;
    }
    const updated = students.map(s => {
      if (s.id === id) {
        return {
          ...s,
          name: editingStudentForm.name,
          email: editingStudentForm.email || 'N/A',
          phone: editingStudentForm.phone,
          course: editingStudentForm.course,
          status: editingStudentForm.status,
          image: editingStudentForm.image
        };
      }
      return s;
    });
    setStudents(updated);
    syncToStorage('invictus_students', updated);
    const updateRes = await studentsApi.update(id, { ...editingStudentForm, status: editingStudentForm.status as 'Active' | 'Pending' | 'Canceled' });
    if (!updateRes.success) triggerNotification('Failed to sync: ' + (updateRes.error || 'server error'), 'error');
    setEditingStudentId(null);
    setAthleteSubTab('list');
    triggerNotification(`Athlete ${editingStudentForm.name} updated successfully.`);
  };

  const handleDeleteStudent = async (id: string, name: string) => {
    const updated = students.filter(s => s.id !== id);
    setStudents(updated);
    syncToStorage('invictus_students', updated);
    const removeRes = await studentsApi.remove(id);
    if (!removeRes.success) triggerNotification('Failed to sync: ' + (removeRes.error || 'server error'), 'error');
    triggerNotification(`Removed record lock for ${name}.`);
  };

  const handleToggleStudentStatus = async (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'Pending' ? 'Active' : currentStatus === 'Active' ? 'Canceled' : 'Pending';
    const updated = students.map(s => {
      if (s.id === id) {
        return { ...s, status: nextStatus };
      }
      return s;
    });
    setStudents(updated);
    syncToStorage('invictus_students', updated);
    const toggleRes = await studentsApi.update(id, { status: nextStatus });
    if (!toggleRes.success) triggerNotification('Failed to sync: ' + (toggleRes.error || 'server error'), 'error');
    triggerNotification(`Updated status to ${nextStatus}.`);
  };

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === filteredStudents.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredStudents.map(s => s.id)));
    }
  };

  const filteredStudents = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
                          s.phone.includes(studentSearch) ||
                          s.email.toLowerCase().includes(studentSearch.toLowerCase());
    const matchesFilter = studentFilter === 'All' || s.status === studentFilter;
    return matchesSearch && matchesFilter;
  });

  const totalLeads = students.length;
  const activeStudentsCount = students.filter(s => s.status === 'Active').length;
  const pendingStudentsCount = students.filter(s => s.status === 'Pending').length;

  const estimatedRevenue = students.reduce((acc, current) => {
    if (current.status !== 'Active') return acc;
    if (current.course === 'Monthly Plan') return acc + 3000;
    if (current.course === '3 Months Course') return acc + (8000 / 3);
    return acc;
  }, 0);

  return (
    <div className="min-h-screen bg-brand-primary text-white font-sans antialiased relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#141417_1px,transparent_1px),linear-gradient(to_bottom,#141417_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-25 pointer-events-none -z-50" />
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand-accent/40 to-transparent z-50 pointer-events-none" />

      {systemNotification && (
        <div className={`fixed top-6 right-6 z-50 p-4 rounded-2xl border backdrop-blur-md max-w-sm shadow-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300 ${
          systemNotification.type === 'success'
            ? 'bg-neutral-900/90 border-brand-accent/30 text-brand-accent shadow-brand-accent/5'
            : 'bg-red-950/90 border-red-500/30 text-red-100 shadow-red-500/5'
        }`}>
          <Zap className="w-4 h-4 shrink-0 animate-pulse text-brand-accent" />
          <div className="text-xs font-mono font-bold uppercase tracking-wider">{systemNotification.text}</div>
        </div>
      )}

      <div className="min-h-screen w-full flex flex-col bg-brand-primary">
        <header className="hidden md:flex items-center justify-between p-7 bg-brand-secondary/30 border-b border-brand-border/40">
          <div>
            <h1 className="text-sm font-black uppercase tracking-wider text-white">
              👥 Athlete Leads Center
            </h1>
            <p className="text-xs text-brand-muted mt-0.5 font-sans">
              Active directory synchronized directly to client modules.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/admin/dashboard" className="px-4 py-2 border border-brand-border/60 hover:border-brand-accent/30 text-[9px] font-mono font-extrabold uppercase tracking-widest text-center text-brand-muted hover:text-white rounded-lg transition-all">
              ← BACK
            </Link>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-8 space-y-8 max-w-7xl w-full mx-auto">
          <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            <div className="p-5 bg-brand-secondary/40 border border-brand-border/80 rounded-2xl flex items-center gap-4 hover:border-brand-accent/30 hover:shadow-[0_0_20px_rgba(204,255,0,0.02)] transition-all duration-300 group">
              <div className="p-3 bg-brand-accent/5 border border-brand-accent/20 text-brand-accent rounded-xl hidden sm:block group-hover:scale-105 transition-transform duration-300">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[9px] font-mono font-bold text-brand-muted uppercase tracking-widest">Athlete Inquiries</div>
                <div className="text-xl sm:text-2xl font-display font-black text-white leading-none mt-1 sm:mt-1.5">{totalLeads}</div>
              </div>
            </div>
            <div className="p-5 bg-brand-secondary/40 border border-brand-border/80 rounded-2xl flex items-center gap-4 hover:border-brand-accent/30 hover:shadow-[0_0_20px_rgba(204,255,0,0.02)] transition-all duration-300 group">
              <div className="p-3 bg-[#52fa7c]/5 border border-[#52fa7c]/20 text-[#52fa7c] rounded-xl hidden sm:block group-hover:scale-105 transition-transform duration-300">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[9px] font-mono font-bold text-brand-muted uppercase tracking-widest">Active Approved</div>
                <div className="text-xl sm:text-2xl font-display font-black text-[#52fa7c] leading-none mt-1 sm:mt-1.5">{activeStudentsCount}</div>
              </div>
            </div>
            <div className="p-5 bg-brand-secondary/40 border border-brand-border/80 rounded-2xl flex items-center gap-4 hover:border-brand-accent/30 hover:shadow-[0_0_20px_rgba(204,255,0,0.02)] transition-all duration-300 group">
              <div className="p-3 bg-amber-400/5 border border-amber-400/20 text-amber-400 rounded-xl hidden sm:block group-hover:scale-105 transition-transform duration-300">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[9px] font-mono font-bold text-brand-muted uppercase tracking-widest">Pending Review</div>
                <div className="text-xl sm:text-2xl font-display font-black text-amber-400 leading-none mt-1 sm:mt-1.5">{pendingStudentsCount}</div>
              </div>
            </div>
            <div className="p-5 bg-brand-secondary/40 border border-brand-border/80 rounded-2xl flex items-center gap-4 hover:border-brand-accent/30 hover:shadow-[0_0_20px_rgba(204,255,0,0.02)] transition-all duration-300 group flex-wrap">
              <div className="p-3 bg-[#ccff00]/5 border border-[#ccff00]/20 text-brand-accent rounded-xl hidden sm:block group-hover:scale-105 transition-transform duration-300">
                <DollarSign className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <div className="text-[9px] font-mono font-bold text-brand-muted uppercase tracking-widest">Aggregate Income Stream</div>
                <div className="text-xl sm:text-2xl font-display font-black text-brand-accent leading-none mt-1 sm:mt-1.5">৳{estimatedRevenue.toLocaleString()}</div>
                <div className="text-[9px] font-mono text-brand-muted mt-1 font-bold">Gym: ৳{estimatedRevenue.toLocaleString()}</div>
              </div>
            </div>
          </section>

          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-brand-border/40 pb-5 mb-6">
              <div>
                <h3 className="text-xl font-display font-black uppercase text-white tracking-tight">
                  {athleteSubTab === 'list' ? 'Athlete Directory & Leads' : editingStudentId ? 'Edit Athlete Record' : 'Enroll New Athlete'}
                </h3>
                <p className="text-xs text-brand-muted font-mono tracking-wider mt-0.5 animate-pulse text-brand-accent">
                  {athleteSubTab === 'list' ? 'PROFILES AND ACTIVE REGISTRATION TIMINGS' : 'CRM DATABASE RECORD GENERATOR'}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setAthleteSubTab('list');
                    setEditingStudentId(null);
                  }}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all border min-h-[40px] cursor-pointer ${
                    athleteSubTab === 'list'
                      ? 'bg-brand-accent text-black font-black border-brand-accent shadow-sm shadow-brand-accent/20'
                      : 'bg-brand-secondary/80 border-brand-border text-brand-muted hover:text-white'
                  }`}
                >
                  Athlete List
                </button>
                <button
                  onClick={() => {
                    setAthleteSubTab('form');
                    setEditingStudentId(null);
                    setNewStudent({ name: '', email: '', phone: '', course: '3 Months Course', status: 'Pending', image: '' });
                  }}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all border min-h-[40px] cursor-pointer ${
                    athleteSubTab === 'form' && !editingStudentId
                      ? 'bg-brand-accent text-black font-black border-brand-accent shadow-sm shadow-brand-accent/20'
                      : 'bg-brand-secondary/80 border-brand-border text-brand-muted hover:text-white'
                  }`}
                >
                  + Register New
                </button>
              </div>
            </div>

            {athleteSubTab === 'form' ? (
              <div className="max-w-2xl mx-auto w-full p-8 bg-brand-secondary/40 border border-brand-border/85 rounded-[2.5rem] relative shadow-2xl">
                {editingStudentId ? (
                  <>
                    <div className="flex items-center justify-between border-b border-brand-border/40 pb-4 mb-6">
                      <h2 className="text-sm font-black uppercase tracking-[0.2em] text-white flex items-center gap-2.5 font-display">
                        <Edit3 className="w-5 h-5 text-brand-accent animate-pulse" /> Edit Athlete Record
                      </h2>
                      <button
                        onClick={() => { setAthleteSubTab('list'); setEditingStudentId(null); }}
                        className="text-xs text-brand-muted hover:text-white font-mono uppercase tracking-widest flex items-center gap-1 cursor-pointer"
                      >
                        ← Back to List
                      </button>
                    </div>
                    <form onSubmit={(e) => { e.preventDefault(); saveEditedStudent(editingStudentId); }} className="space-y-6 text-xs">
                      <div className="space-y-2">
                        <label className="text-brand-muted font-bold tracking-wider uppercase text-[10px]">Full Name *</label>
                        <input type="text" value={editingStudentForm.name} onChange={(e) => setEditingStudentForm({...editingStudentForm, name: e.target.value})} placeholder="e.g. Tanvir Rahman" className="w-full bg-brand-primary border border-brand-border p-3.5 rounded-xl text-white text-sm focus:border-brand-accent focus:outline-none transition-colors" required />
                      </div>
                      <div className="space-y-2">
                        <label className="text-brand-muted font-bold tracking-wider uppercase text-[10px]">Contact Phone *</label>
                        <input type="text" value={editingStudentForm.phone} onChange={(e) => setEditingStudentForm({...editingStudentForm, phone: e.target.value})} placeholder="e.g. 017-XXXX-XXXX" className="w-full bg-brand-primary border border-brand-border p-3.5 rounded-xl text-white text-sm font-mono focus:border-brand-accent focus:outline-none transition-colors" required />
                      </div>
                      <div className="space-y-2">
                        <label className="text-brand-muted font-bold tracking-wider uppercase text-[10px]">Email Address</label>
                        <input type="email" value={editingStudentForm.email} onChange={(e) => setEditingStudentForm({...editingStudentForm, email: e.target.value})} placeholder="e.g. fighter@gmail.com" className="w-full bg-brand-primary border border-brand-border p-3.5 rounded-xl text-white text-sm focus:border-brand-accent focus:outline-none transition-colors" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-brand-muted font-bold tracking-wider uppercase text-[10px]">Target Course</label>
                          <select value={editingStudentForm.course} onChange={(e) => setEditingStudentForm({...editingStudentForm, course: e.target.value})} className="w-full bg-brand-primary border border-brand-border p-3.5 rounded-xl text-white focus:border-brand-accent focus:outline-none h-[48px] text-xs cursor-pointer">
                            <option value="3 Months Course">3 Months Core</option>
                            <option value="Monthly Plan">Monthly Plan</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-brand-muted font-bold tracking-wider uppercase text-[10px]">Status</label>
                          <select value={editingStudentForm.status} onChange={(e) => setEditingStudentForm({...editingStudentForm, status: e.target.value})} className="w-full bg-brand-primary border border-brand-border p-3.5 rounded-xl text-white focus:border-brand-accent focus:outline-none h-[48px] text-xs cursor-pointer">
                            <option value="Pending">Pending</option>
                            <option value="Active">Active</option>
                            <option value="Canceled">Canceled</option>
                          </select>
                        </div>
                      </div>
                      <ImageUploader id="edit-athlete-img" value={editingStudentForm.image} onChange={(val) => setEditingStudentForm({...editingStudentForm, image: val})} />
                      <div className="flex gap-3 pt-4">
                        <button type="submit" className="flex-1 py-4 bg-brand-accent text-black font-extrabold uppercase tracking-widest rounded-xl hover:bg-brand-accent-hover transition-colors min-h-[48px] cursor-pointer shadow-md shadow-brand-accent/15 text-xs">SAVE CHANGES</button>
                        <button type="button" onClick={() => { setAthleteSubTab('list'); setEditingStudentId(null); }} className="px-6 py-4 bg-brand-primary border border-brand-border text-brand-muted hover:text-white font-mono text-xs rounded-xl min-h-[48px] cursor-pointer">CANCEL</button>
                      </div>
                    </form>
                  </>
                ) : (
                  <>
                    <div className="flex items-center justify-between border-b border-brand-border/40 pb-4 mb-6">
                      <h2 className="text-sm font-black uppercase tracking-[0.2em] text-white flex items-center gap-2.5 font-display">
                        <UserPlus className="w-5 h-5 text-brand-accent" /> Register Athlete
                      </h2>
                      <button onClick={() => setAthleteSubTab('list')} className="text-xs text-brand-muted hover:text-white font-mono uppercase tracking-widest flex items-center gap-1 cursor-pointer">← Back to List</button>
                    </div>
                    <form onSubmit={handleAddStudent} className="space-y-6 text-xs">
                      <div className="space-y-2">
                        <label className="text-brand-muted font-bold tracking-wider uppercase text-[10px]">Full Name *</label>
                        <input type="text" value={newStudent.name} onChange={(e) => setNewStudent({...newStudent, name: e.target.value})} placeholder="e.g. Shakib Al Hasan" className="w-full bg-brand-primary border border-brand-border p-3.5 rounded-xl text-white text-sm focus:border-brand-accent focus:outline-none transition-colors" required />
                      </div>
                      <div className="space-y-2">
                        <label className="text-brand-muted font-bold tracking-wider uppercase text-[10px]">Contact Phone *</label>
                        <input type="text" value={newStudent.phone} onChange={(e) => setNewStudent({...newStudent, phone: e.target.value})} placeholder="e.g. 017-XXXX-XXXX" className="w-full bg-brand-primary border border-brand-border p-3.5 rounded-xl text-white text-sm font-mono focus:border-brand-accent focus:outline-none transition-colors" required />
                      </div>
                      <div className="space-y-2">
                        <label className="text-brand-muted font-bold tracking-wider uppercase text-[10px]">Email Address</label>
                        <input type="email" value={newStudent.email} onChange={(e) => setNewStudent({...newStudent, email: e.target.value})} placeholder="e.g. fighter@gmail.com" className="w-full bg-brand-primary border border-brand-border p-3.5 rounded-xl text-white text-sm focus:border-brand-accent focus:outline-none transition-colors" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-brand-muted font-bold tracking-wider uppercase text-[10px]">Target Course</label>
                          <select value={newStudent.course} onChange={(e) => setNewStudent({...newStudent, course: e.target.value})} className="w-full bg-brand-primary border border-brand-border p-3.5 rounded-xl text-white focus:border-brand-accent focus:outline-none h-[48px] text-xs cursor-pointer">
                            <option value="3 Months Course">3 Months Core</option>
                            <option value="Monthly Plan">Monthly Plan</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-brand-muted font-bold tracking-wider uppercase text-[10px]">Initial Status</label>
                          <select value={newStudent.status} onChange={(e) => setNewStudent({...newStudent, status: e.target.value})} className="w-full bg-brand-primary border border-brand-border p-3.5 rounded-xl text-white focus:border-brand-accent focus:outline-none h-[48px] text-xs cursor-pointer">
                            <option value="Pending">Pending</option>
                            <option value="Active">Active</option>
                            <option value="Canceled">Canceled</option>
                          </select>
                        </div>
                      </div>
                      <ImageUploader id="new-athlete-img" value={newStudent.image} onChange={(val) => setNewStudent({...newStudent, image: val})} />
                      <button type="submit" className="w-full py-4 mt-2 bg-brand-accent text-black font-extrabold uppercase tracking-widest rounded-xl hover:bg-brand-accent-hover transition-colors min-h-[48px] cursor-pointer shadow-md shadow-brand-accent/15 text-xs">CONFIRM ENROLLMENT</button>
                    </form>
                  </>
                )}
              </div>
            ) : (
              <div className="w-full space-y-4">
                <div className="p-4 bg-brand-secondary/40 border border-brand-border rounded-xl flex flex-col sm:flex-row gap-3 justify-between items-center shadow-md animate-in fade-in duration-300">
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <div className="relative w-full sm:max-w-xs">
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
                      <input type="text" placeholder="Search athletes..." value={studentSearch} onChange={(e) => setStudentSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-brand-primary border border-brand-border rounded-xl text-xs text-white placeholder:text-brand-muted/70 focus:border-brand-accent focus:outline-none transition-colors" />
                    </div>
                    {selectedIds.size > 0 && (
                      <button
                        onClick={() => {
                          const recipients = students.filter(s => selectedIds.has(s.id)).map(s => ({ id: s.id, name: s.name, phone: s.phone, email: s.email }));
                          setMessageDialog({ recipients });
                        }}
                        className="px-3 py-2 bg-brand-accent text-black font-bold uppercase tracking-wider text-[9px] rounded-xl hover:bg-brand-accent-hover transition-all min-h-[36px] cursor-pointer flex items-center gap-1.5 shadow-lg shadow-brand-accent/15 shrink-0"
                      >
                        <Send className="w-3.5 h-3.5" /> BULK ({selectedIds.size})
                      </button>
                    )}
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto overflow-x-auto select-none no-scrollbar">
                    {['All', 'Active', 'Pending', 'Canceled'].map((filterVal) => (
                      <button key={filterVal} onClick={() => setStudentFilter(filterVal)} className={`px-3.5 py-2 text-[10px] font-bold uppercase tracking-wider rounded-lg border transition-colors cursor-pointer min-h-[36px] ${
                        studentFilter === filterVal ? 'bg-brand-accent text-black border-brand-accent font-extrabold shadow-sm' : 'bg-brand-primary/80 border-brand-border text-brand-muted hover:text-white hover:border-white/20'
                      }`}>
                        {filterVal}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="hidden md:block overflow-hidden bg-brand-secondary/40 border border-brand-border rounded-2xl shadow-xl animate-in fade-in duration-300">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-brand-secondary/90 border-b border-brand-border text-brand-muted text-[10px] font-bold uppercase tracking-wider">
                        <th className="p-4 w-10">
                          <div className="flex items-center justify-center">
                            <input
                              type="checkbox"
                              checked={filteredStudents.length > 0 && selectedIds.size === filteredStudents.length}
                              onChange={toggleSelectAll}
                              className="w-4 h-4 accent-brand-accent rounded cursor-pointer"
                            />
                          </div>
                        </th>
                        <th className="p-4">Athlete Core details</th>
                        <th className="p-4">Contact Info</th>
                        <th className="p-4">Enrolled Course</th>
                        <th className="p-4">Approved Status</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-border/40 text-sm">
                      {filteredStudents.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="p-12 text-center text-brand-muted font-mono text-xs">
                            No records found in database.
                          </td>
                        </tr>
                      ) : (
                        filteredStudents.map((athlete) => (
                          <tr key={athlete.id} className="hover:bg-brand-secondary/20 transition-colors">
                            <td className="p-4">
                              <div className="flex items-center justify-center">
                                <input
                                  type="checkbox"
                                  checked={selectedIds.has(athlete.id)}
                                  onChange={() => toggleSelect(athlete.id)}
                                  className="w-4 h-4 accent-brand-accent rounded cursor-pointer"
                                />
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                <div className="relative w-9 h-9 rounded-full overflow-hidden shrink-0 border border-brand-border bg-brand-primary flex items-center justify-center">
                                  {athlete.image ? (
                                    <Image src={athlete.image} alt={athlete.name} width={36} height={36} className="object-cover w-full h-full" />
                                  ) : (
                                    <span className="text-[10px] font-mono tracking-wider font-extrabold text-brand-accent uppercase">
                                      {athlete.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                                    </span>
                                  )}
                                </div>
                                <div>
                                  <Link href={`/admin/students/${athlete.id}`} className="font-bold text-white text-sm hover:text-brand-accent transition-colors">
                                    {athlete.name}
                                  </Link>
                                  <div className="text-[10px] text-brand-muted font-mono mt-0.5">REGISTERED: {athlete.enrolledDate}</div>
                                </div>
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="font-mono text-xs text-brand-muted">{athlete.phone}</div>
                              <div className="text-xs text-brand-muted/75">{athlete.email}</div>
                            </td>
                            <td className="p-4">
                              <span className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-brand-primary border border-brand-border/60 text-white/90">
                                {athlete.course}
                              </span>
                            </td>
                            <td className="p-4">
                              <button onClick={() => handleToggleStudentStatus(athlete.id, athlete.status)} className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest transition-all border shrink-0 cursor-pointer ${
                                athlete.status === 'Active' ? 'bg-[#52fa7c]/10 text-[#2ee159] border-[#2ee159]/30' :
                                athlete.status === 'Pending' ? 'bg-amber-400/10 text-amber-500 border-amber-400/30' :
                                'bg-neutral-800 text-brand-muted border-brand-border'
                              }`}>
                                {athlete.status}
                              </button>
                            </td>
                            <td className="p-4 text-right">
                              <div className="flex justify-end gap-2">
                                <button
                                  onClick={() => setMessageDialog({ recipients: [{ id: athlete.id, name: athlete.name, phone: athlete.phone, email: athlete.email }] })}
                                  className="p-2.5 rounded-xl border border-brand-border hover:border-brand-accent hover:text-brand-accent transition-colors text-brand-muted cursor-pointer min-h-[38px] min-w-[38px] flex items-center justify-center"
                                  title="Send Message"
                                >
                                  <Send className="w-4 h-4" />
                                </button>
                                <button onClick={() => startEditingStudent(athlete)} className="p-2.5 rounded-xl border border-brand-border hover:border-brand-accent hover:text-brand-accent transition-colors text-brand-muted cursor-pointer min-h-[38px] min-w-[38px] flex items-center justify-center animate-in zoom-in-75 duration-300" title="Edit Athlete Record">
                                  <Edit3 className="w-4 h-4" />
                                </button>
                                <button onClick={() => setConfirmDelete({ id: athlete.id, name: athlete.name })} className="p-2.5 rounded-xl border border-brand-border hover:bg-red-500/10 hover:border-red-500 hover:text-red-500 transition-colors text-brand-muted group cursor-pointer min-h-[38px] min-w-[38px] flex items-center justify-center" title="Delete Record">
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="md:hidden space-y-4 animate-in fade-in duration-305">
                  {filteredStudents.length === 0 ? (
                    <div className="p-10 text-center text-brand-muted bg-brand-secondary border border-brand-border rounded-xl font-mono text-xs">
                      No records matching filter settings.
                    </div>
                  ) : (
                    filteredStudents.map((athlete) => (
                      <div key={athlete.id} className={`p-5 bg-brand-secondary/40 border rounded-[1.5rem] space-y-4 shadow-sm transition-colors ${
                        selectedIds.has(athlete.id) ? 'border-brand-accent/50' : 'border-brand-border'
                      }`}>
                        <div className="flex justify-between items-start gap-3">
                          <div className="flex items-center gap-2.5">
                            <input
                              type="checkbox"
                              checked={selectedIds.has(athlete.id)}
                              onChange={() => toggleSelect(athlete.id)}
                              className="w-4 h-4 accent-brand-accent rounded cursor-pointer shrink-0"
                            />
                            <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 border border-brand-border bg-brand-primary flex items-center justify-center">
                              {athlete.image ? (
                                <Image src={athlete.image} alt={athlete.name} width={36} height={36} className="object-cover w-full h-full" />
                              ) : (
                                <span className="text-[9px] font-mono tracking-wider font-extrabold text-brand-accent uppercase">
                                  {athlete.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                                </span>
                              )}
                            </div>
                            <div>
                              <Link href={`/admin/students/${athlete.id}`} className="font-bold text-white leading-tight hover:text-brand-accent transition-colors">
                                {athlete.name}
                              </Link>
                              <div className="text-[9px] text-brand-muted font-mono mt-0.5">ENROLLED: {athlete.enrolledDate}</div>
                            </div>
                          </div>
                          <button onClick={() => handleToggleStudentStatus(athlete.id, athlete.status)} className={`px-3 py-0.5 rounded-full text-[9px] font-bold uppercase border cursor-pointer ${
                            athlete.status === 'Active' ? 'bg-[#52fa7c]/10 text-[#2ee159] border-[#52fa7c]/30' :
                            athlete.status === 'Pending' ? 'bg-amber-400/10 text-amber-500 border-amber-400/30' :
                            'bg-neutral-800 text-brand-muted border-brand-border'
                          }`}>
                            {athlete.status}
                          </button>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-xs bg-brand-primary/40 border border-brand-border/40 p-3 rounded-xl">
                          <div>
                            <div className="text-[8px] text-brand-muted uppercase tracking-wider mb-0.5">PHONE</div>
                            <div className="text-white font-mono font-bold">{athlete.phone}</div>
                          </div>
                          <div>
                            <div className="text-[8px] text-brand-muted uppercase tracking-wider mb-0.5">COURSE</div>
                            <div className="text-brand-accent font-bold truncate">{athlete.course}</div>
                          </div>
                          <div className="col-span-2 border-t border-brand-border/30 pt-2 shrink-0">
                            <div className="text-[8px] text-brand-muted uppercase tracking-wider mb-0.5">EMAIL ID</div>
                            <div className="text-white/80 truncate font-sans">{athlete.email}</div>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <button
                            onClick={() => setMessageDialog({ recipients: [{ id: athlete.id, name: athlete.name, phone: athlete.phone, email: athlete.email }] })}
                            className="py-2.5 bg-brand-primary border border-brand-border text-[9px] font-bold tracking-widest text-brand-accent rounded-xl uppercase hover:border-brand-accent transition-colors min-h-[40px] cursor-pointer flex items-center justify-center gap-1"
                          >
                            <Send className="w-3 h-3" /> MSG
                          </button>
                          <button onClick={() => startEditingStudent(athlete)} className="py-2.5 bg-brand-primary border border-brand-border text-[9px] font-bold tracking-widest text-white rounded-xl uppercase hover:text-brand-accent hover:border-brand-accent transition-colors min-h-[40px] cursor-pointer">
                            EDIT
                          </button>
                          <button onClick={() => setConfirmDelete({ id: athlete.id, name: athlete.name })} className="py-2.5 bg-brand-primary border border-brand-border text-[#ff4c4c] rounded-xl hover:bg-red-500/10 hover:border-red-500 transition-colors min-h-[40px] cursor-pointer text-[9px] font-bold uppercase tracking-widest">
                            DELETE
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </main>

        <footer className="py-6 border-t border-brand-border bg-brand-secondary/30 text-center text-[10px] font-mono text-brand-muted select-none">
          <div className="container max-w-7xl mx-auto px-4">
            INVICTUS ATHLETICS HQ DHAKA • COMPILABLE LOCAL CLIENT CONSOLE SECURE ROOT
          </div>
        </footer>
      </div>

      <ConfirmDialog
        open={!!confirmDelete}
        title="Delete Athlete Record"
        message={`Are you sure you want to remove ${confirmDelete?.name} from the athlete database?`}
        onConfirm={() => {
          if (confirmDelete) handleDeleteStudent(confirmDelete.id, confirmDelete.name);
          setConfirmDelete(null);
        }}
        onCancel={() => setConfirmDelete(null)}
      />

      <MessageDialog
        open={!!messageDialog}
        recipients={messageDialog?.recipients || []}
        onClose={() => setMessageDialog(null)}
        onSent={(result) => {
          if (result.success) {
            triggerNotification(`Message sent via ${result.channel.toUpperCase()} to ${result.count} athlete${result.count > 1 ? 's' : ''}!`);
          } else {
            triggerNotification('Failed to send message.', 'error');
          }
          setMessageDialog(null);
        }}
      />
    </div>
  );
}
