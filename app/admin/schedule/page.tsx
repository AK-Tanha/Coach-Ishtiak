'use client';

import * as React from 'react';
import Link from 'next/link';
import { Trash2, Edit3, Save, X, Calendar, Zap } from 'lucide-react';
import { schedule as scheduleApi } from '@/lib/api';
import ConfirmDialog from '@/components/admin/ConfirmDialog';

const defaultSchedule = [
  { day: "Saturday", classes: [{ id: "sat-1", time: "4:30 - 5:30 PM", activity: "Personal Training (PT)" }] },
  { day: "Sunday", classes: [{ id: "sun-1", time: "4:00 - 5:00 PM", activity: "Muay Thai" }, { id: "sun-2", time: "5:30 - 7:00 PM", activity: "MMA" }, { id: "sun-3", time: "7:30 - 8:30 PM", activity: "Boxing" }] },
  { day: "Tuesday", classes: [{ id: "tue-1", time: "3:00 - 4:30 PM", activity: "Afternoon Class (AFT)" }, { id: "tue-2", time: "5:30 - 7:00 PM", activity: "MMA" }, { id: "tue-3", time: "7:30 - 8:30 PM", activity: "Boxing" }] },
  { day: "Wednesday", classes: [{ id: "wed-1", time: "4:00 - 5:15 PM", activity: "Personal Training (PT)" }] },
  { day: "Thursday", classes: [{ id: "thu-1", time: "4:00 - 5:00 PM", activity: "Muay Thai" }, { id: "thu-2", time: "5:30 - 7:00 PM", activity: "MMA" }] }
];

export default function SchedulePage() {
  const [scheduleData, setScheduleData] = React.useState<typeof defaultSchedule>([]);
  const [selectedDay, setSelectedDay] = React.useState('Sunday');
  const [newClassStartTime, setNewClassStartTime] = React.useState('');
  const [newClassEndTime, setNewClassEndTime] = React.useState('');
  const [newClassActivity, setNewClassActivity] = React.useState('');
  const [editingClassDay, setEditingClassDay] = React.useState<string | null>(null);
  const [editingClassId, setEditingClassId] = React.useState<string | null>(null);
  const [editingClassStartTime, setEditingClassStartTime] = React.useState('');
  const [editingClassEndTime, setEditingClassEndTime] = React.useState('');
  const [editingClassActivity, setEditingClassActivity] = React.useState('');
  const [confirmDelete, setConfirmDelete] = React.useState<{ day: string; classId: string; activity: string } | null>(null);
  const [systemNotification, setSystemNotification] = React.useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [showNewActivityPortal, setShowNewActivityPortal] = React.useState(false);
  const [portalNewActivity, setPortalNewActivity] = React.useState('');
  const [pendingActivities, setPendingActivities] = React.useState<string[]>([]);

  const allActivities = React.useMemo(() => {
    const set = new Set(pendingActivities);
    scheduleData.forEach(d => d.classes.forEach(c => set.add(c.activity)));
    return Array.from(set).sort();
  }, [scheduleData, pendingActivities]);

  const to24h = (t: string) => {
    const m = t.match(/(\d+):(\d+)\s*(AM|PM)/i);
    if (!m) return '';
    let h = +m[1]; const p = m[3].toUpperCase();
    if (p === 'PM' && h !== 12) h += 12;
    if (p === 'AM' && h === 12) h = 0;
    return `${String(h).padStart(2, '0')}:${m[2]}`;
  };

  const to12h = (t: string) => {
    if (!t) return '';
    const [h, min] = t.split(':').map(Number);
    const p = h >= 12 ? 'PM' : 'AM';
    return `${h % 12 || 12}:${String(min).padStart(2, '0')} ${p}`;
  };

  const combineTime = (s: string, e: string) =>
    s && e ? `${to12h(s)} - ${to12h(e)}` : '';

  const splitTime = (range: string) => {
    const parts = range.split(' - ');
    return parts.length === 2
      ? { start: to24h(parts[0]), end: to24h(parts[1]) }
      : { start: '', end: '' };
  };

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
        const res = await scheduleApi.list();
        if (res.success && res.data) {
          setScheduleData(res.data);
          syncToStorage('invictus_schedule', res.data);
          return;
        }
      } catch {}
      const stored = localStorage.getItem('invictus_schedule');
      if (stored) {
        setScheduleData(JSON.parse(stored));
      } else {
        setScheduleData(defaultSchedule);
        syncToStorage('invictus_schedule', defaultSchedule);
      }
    };
    load();
  }, []);

  const handleAddNewActivityFromPortal = () => {
    const name = portalNewActivity.trim();
    if (!name) return;
    setNewClassActivity(name);
    setPendingActivities(prev => prev.includes(name) ? prev : [...prev, name]);
    setShowNewActivityPortal(false);
    setPortalNewActivity('');
  };

  const handleAddClass = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClassStartTime || !newClassEndTime || !newClassActivity) {
      triggerNotification('Provide start time, end time, and title.', 'error');
      return;
    }
    const formattedTime = combineTime(newClassStartTime, newClassEndTime);
    const updated = scheduleData.map(dayObj => {
      if (dayObj.day === selectedDay) {
        return {
          ...dayObj,
          classes: [...dayObj.classes, { id: "cls-" + Date.now(), time: formattedTime, activity: newClassActivity }]
        };
      }
      return dayObj;
    });
    const dayExists = scheduleData.some(d => d.day === selectedDay);
    let finalSchedule = updated;
    if (!dayExists) {
      finalSchedule = [...scheduleData, {
        day: selectedDay,
        classes: [{ id: "cls-" + Date.now(), time: formattedTime, activity: newClassActivity }]
      }];
    }
    setScheduleData(finalSchedule);
    syncToStorage('invictus_schedule', finalSchedule);
    const addRes = await scheduleApi.update(finalSchedule);
    if (!addRes.success) triggerNotification('Failed to sync: ' + (addRes.error || 'server error'), 'error');
    setNewClassStartTime('');
    setNewClassEndTime('');
    setNewClassActivity('');
    triggerNotification(`Added class info under ${selectedDay}.`);
  };

  const handleDeleteClass = async (day: string, classId: string) => {
    const updated = scheduleData.map(dayObj => {
      if (dayObj.day === day) {
        return {
          ...dayObj,
          classes: dayObj.classes.filter(c => c.id !== classId)
        };
      }
      return dayObj;
    }).filter(dayObj => dayObj.classes.length > 0);
    setScheduleData(updated);
    syncToStorage('invictus_schedule', updated);
    const deleteRes = await scheduleApi.update(updated);
    if (!deleteRes.success) triggerNotification('Failed to sync: ' + (deleteRes.error || 'server error'), 'error');
    triggerNotification('Session timing removed from schedule.');
  };

  const startEditingClass = (day: string, cls: { id: string; time: string; activity: string }) => {
    const { start, end } = splitTime(cls.time);
    setEditingClassDay(day);
    setEditingClassId(cls.id);
    setEditingClassStartTime(start);
    setEditingClassEndTime(end);
    setEditingClassActivity(cls.activity);
  };

  const cancelEditingClass = () => {
    setEditingClassDay(null);
    setEditingClassId(null);
    setEditingClassStartTime('');
    setEditingClassEndTime('');
    setEditingClassActivity('');
  };

  const saveEditedClass = async () => {
    if (!editingClassDay || !editingClassId || !editingClassStartTime || !editingClassEndTime || !editingClassActivity) {
      triggerNotification('Start time, end time, and activity are required.', 'error');
      return;
    }
    const formattedTime = combineTime(editingClassStartTime, editingClassEndTime);
    const updated = scheduleData.map(dayObj => {
      if (dayObj.day === editingClassDay) {
        return {
          ...dayObj,
          classes: dayObj.classes.map(c =>
            c.id === editingClassId
              ? { ...c, time: formattedTime, activity: editingClassActivity }
              : c
          ),
        };
      }
      return dayObj;
    });
    setScheduleData(updated);
    syncToStorage('invictus_schedule', updated);
    const editRes = await scheduleApi.update(updated);
    if (!editRes.success) triggerNotification('Failed to sync: ' + (editRes.error || 'server error'), 'error');
    cancelEditingClass();
    triggerNotification('Class updated successfully.');
  };

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
              📅 Class & Timing Timetable
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

        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4 p-6 bg-brand-secondary/40 border border-brand-border/80 rounded-[2rem] shadow-lg">
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-white border-b border-brand-border/40 pb-4 mb-5 flex items-center gap-2 font-display">
                <Calendar className="w-4 h-4 text-brand-accent" /> ADD SESSION RECORD
              </h2>
              <form onSubmit={handleAddClass} className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="text-brand-muted font-bold tracking-wider uppercase text-[10px]">Day of the Week</label>
                  <select value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)} className="w-full bg-brand-primary border border-brand-border p-3 rounded-xl text-white focus:outline-none focus:border-brand-accent h-[44px]">
                    <option value="Saturday">Saturday</option>
                    <option value="Sunday">Sunday</option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-brand-muted font-bold tracking-wider uppercase text-[10px]">Session Time Frame</label>
                  <div className="flex items-center gap-2">
                    <input type="time" value={newClassStartTime} onChange={(e) => setNewClassStartTime(e.target.value)} className="flex-1 bg-brand-primary border border-brand-border p-3 rounded-xl text-white text-sm focus:outline-none focus:border-brand-accent transition-colors [color-scheme:dark]" required />
                    <span className="text-brand-muted text-xs font-bold">—</span>
                    <input type="time" value={newClassEndTime} onChange={(e) => setNewClassEndTime(e.target.value)} className="flex-1 bg-brand-primary border border-brand-border p-3 rounded-xl text-white text-sm focus:outline-none focus:border-brand-accent transition-colors [color-scheme:dark]" required />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-brand-muted font-bold tracking-wider uppercase text-[10px]">Activity / Module</label>
                  <div className="flex gap-2">
                    <select value={newClassActivity} onChange={(e) => {
                      if (e.target.value === '__add_new__') {
                        setShowNewActivityPortal(true);
                      } else {
                        setNewClassActivity(e.target.value);
                      }
                    }} className="flex-1 bg-brand-primary border border-brand-border p-3 rounded-xl text-white text-sm focus:outline-none focus:border-brand-accent transition-colors h-[44px] appearance-none">
                      <option value="" disabled>Select activity</option>
                      {allActivities.map(a => (
                        <option key={a} value={a}>{a}</option>
                      ))}
                      <option value="__add_new__" className="text-brand-accent">+ Add New</option>
                    </select>
                  </div>
                </div>
                <button type="submit" className="w-full py-4 bg-brand-accent text-black font-bold uppercase tracking-widest rounded-xl hover:bg-brand-accent-hover transition-colors min-h-[44px] cursor-pointer shadow-md shadow-brand-accent/15">
                  ADD TO TIMETABLE
                </button>
              </form>
            </div>

            <div className="lg:col-span-8 space-y-6">
              <div>
                <h3 className="text-base font-bold uppercase text-white tracking-widest">Active Class Timetable</h3>
              </div>
              <div className="space-y-4">
                {scheduleData.length === 0 ? (
                  <p className="p-10 text-center text-xs text-brand-muted border border-brand-border border-dashed rounded-2xl">
                    No scheduled class hours set. Add a session record to begin.
                  </p>
                ) : (
                  scheduleData.map((dayGroup) => (
                    <div key={dayGroup.day} className="p-6 bg-brand-secondary/40 border border-brand-border/80 rounded-[1.8rem] space-y-3.5 shadow-md">
                      <div className="font-display font-black text-brand-accent text-sm border-b border-brand-border/40 pb-3 flex justify-between items-center uppercase tracking-wider">
                        <span>{dayGroup.day} Classes</span>
                      </div>
                      <div className="divide-y divide-brand-border/30">
                        {dayGroup.classes.map((cls) => (
                          <div key={cls.id} className="flex items-center justify-between py-3.5 hover:bg-white/[0.01]">
                            {editingClassDay === dayGroup.day && editingClassId === cls.id ? (
                              <div className="flex-1 flex flex-col gap-2">
                                <div className="flex items-center gap-2">
                                  <input type="time" value={editingClassStartTime} onChange={(e) => setEditingClassStartTime(e.target.value)} className="flex-1 min-w-0 bg-brand-primary border border-brand-accent p-2 rounded-lg text-white text-xs focus:outline-none [color-scheme:dark]" />
                                  <span className="text-brand-muted text-[10px] shrink-0">—</span>
                                  <input type="time" value={editingClassEndTime} onChange={(e) => setEditingClassEndTime(e.target.value)} className="flex-1 min-w-0 bg-brand-primary border border-brand-accent p-2 rounded-lg text-white text-xs focus:outline-none [color-scheme:dark]" />
                                </div>
                                <div className="flex items-center gap-2">
                                  <select value={editingClassActivity} onChange={(e) => {
                                    if (e.target.value === '__add_new__') {
                                      setShowNewActivityPortal(true);
                                    } else {
                                      setEditingClassActivity(e.target.value);
                                    }
                                  }} className="flex-1 bg-brand-primary border border-brand-accent p-2 rounded-lg text-white text-xs focus:outline-none appearance-none">
                                    {allActivities.map(a => (
                                      <option key={a} value={a}>{a}</option>
                                    ))}
                                    <option value="__add_new__" className="text-brand-accent">+ Add New</option>
                                  </select>
                                  <button onClick={saveEditedClass} className="p-2 bg-brand-accent text-black rounded-lg hover:bg-brand-accent-hover transition-colors min-w-[34px] min-h-[34px] flex items-center justify-center cursor-pointer shrink-0" title="Save">
                                    <Save className="w-3.5 h-3.5" />
                                  </button>
                                  <button onClick={cancelEditingClass} className="p-2 border border-brand-border text-brand-muted hover:text-white rounded-lg transition-colors min-w-[34px] min-h-[34px] flex items-center justify-center cursor-pointer shrink-0" title="Cancel">
                                    <X className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                                <div className="flex gap-4.5 items-center">
                                  <div className="w-2 h-2 rounded-full bg-brand-accent shrink-0 shadow-[0_0_8px_rgba(204,255,0,0.5)]" />
                                  <div className="min-w-0">
                                    <div className="text-xs font-mono text-brand-muted leading-none truncate">{cls.time}</div>
                                    <div className="text-base font-bold text-white mt-1.5 truncate">{cls.activity}</div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2 self-end sm:self-auto">
                                  <button onClick={() => startEditingClass(dayGroup.day, cls)} className="p-2.5 border border-brand-border hover:border-brand-accent hover:text-brand-accent rounded-xl transition-all min-w-[38px] min-h-[38px] flex items-center justify-center cursor-pointer text-brand-muted" title="Edit class">
                                    <Edit3 className="w-3.5 h-3.5" />
                                  </button>
                                  <button onClick={() => setConfirmDelete({ day: dayGroup.day, classId: cls.id, activity: cls.activity })} className="p-2.5 border border-brand-border hover:border-red-500 hover:text-red-500 rounded-xl transition-all min-w-[38px] min-h-[38px] flex items-center justify-center cursor-pointer text-brand-muted" title="Remove timing option">
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </main>

        <footer className="py-6 border-t border-brand-border bg-brand-secondary/30 text-center text-[10px] font-mono text-brand-muted select-none">
          <div className="container max-w-7xl mx-auto px-4">
            INVICTUS ATHLETICS HQ DHAKA • COMPILABLE LOCAL CLIENT CONSOLE SECURE ROOT
          </div>
        </footer>
      </div>

      {showNewActivityPortal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => { setShowNewActivityPortal(false); setPortalNewActivity(''); }} />
          <div className="relative bg-brand-secondary border border-brand-border/80 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white mb-4">New Activity</h3>
            <input type="text" value={portalNewActivity} onChange={(e) => setPortalNewActivity(e.target.value)} placeholder="e.g. MMA / Tactical Muay Thai" className="w-full bg-brand-primary border border-brand-border p-3 rounded-xl text-white text-sm focus:outline-none focus:border-brand-accent mb-4" autoFocus />
            <div className="flex gap-3">
              <button onClick={handleAddNewActivityFromPortal} className="flex-1 py-3 bg-brand-accent text-black font-bold uppercase tracking-widest rounded-xl hover:bg-brand-accent-hover transition-colors text-xs cursor-pointer">
                Add
              </button>
              <button onClick={() => { setShowNewActivityPortal(false); setPortalNewActivity(''); }} className="flex-1 py-3 border border-brand-border text-brand-muted hover:text-white rounded-xl transition-colors text-xs cursor-pointer">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={!!confirmDelete}
        title="Delete Class"
        message={`Are you sure you want to remove "${confirmDelete?.activity}" from ${confirmDelete?.day}?`}
        onConfirm={() => {
          if (confirmDelete) handleDeleteClass(confirmDelete.day, confirmDelete.classId);
          setConfirmDelete(null);
        }}
        onCancel={() => setConfirmDelete(null)}
      />
    </div>
  );
}
