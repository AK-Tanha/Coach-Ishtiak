'use client';

import * as React from 'react';
import { Briefcase, Edit3, Trash2, Save } from 'lucide-react';
import { experience as experienceApi } from '@/lib/api';
import ConfirmDialog from '@/components/admin/ConfirmDialog';

const defaultExperience = [
  { id: "exp-1", role: "Owner / Head Coach", company: "Xtreme MMA", period: "2014 - Present", description: "Driving elite combat sports training and organizational growth since inception." },
  { id: "exp-2", role: "Owner / Head Coach", company: "Invictus BJJ & MMA", period: "2018 - Present", description: "Leading a premier academy for Brazilian Jiu-Jitsu and Mixed Martial Arts in Bangladesh." },
  { id: "exp-3", role: "Boxing Coach", company: "Bangladesh Army", period: "February 1, 2021 - Present", description: "Providing tactical boxing instructions and training for military personnel." },
  { id: "exp-4", role: "Professional Boxing Referee", company: "World Boxing Council (WBC)", period: "September 8, 2022 - Present", description: "WBC Ring Official Panel registered and certified as an Official Referee Level 1." },
  { id: "exp-5", role: "Official / Assistant Coach", company: "Bangladesh Amateur Boxing Federation", period: "2018 - 2025", description: "Former Assistant Coach (March 2018) and continues contributing to national boxing development." },
  { id: "exp-6", role: "Fighter Manager", company: "One Warrior Series", period: "2018", description: "Managed professional fighters in Singapore for the One Warrior Series." },
  { id: "exp-7", role: "Fighter Manager", company: "ONE Championship", period: "2017", description: "Managed professional athletes for ONE Championship in Bangkok, Thailand." },
  { id: "exp-8", role: "Second (Cornerman)", company: "ONE Championship", period: "2016", description: "Served as a professional seconds/cornerman in Myanmar events." }
];

export default function ExperiencePage() {
  const [experienceData, setExperienceData] = React.useState<any[]>([]);
  const [experienceSubTab, setExperienceSubTab] = React.useState<'list' | 'form'>('list');
  const [editingExperienceId, setEditingExperienceId] = React.useState<string | null>(null);
  const [editingExperienceForm, setEditingExperienceForm] = React.useState({ role: '', company: '', period: '', description: '' });
  const [newExperience, setNewExperience] = React.useState({ role: '', company: '', period: '', description: '' });
  const [confirmDelete, setConfirmDelete] = React.useState<string | null>(null);
  const [toast, setToast] = React.useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const triggerNotification = (text: string, type: 'success' | 'error' = 'success') => {
    setToast({ text, type });
    setTimeout(() => setToast(null), 3000);
  };

  const syncToStorage = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  React.useEffect(() => {
    const load = async () => {
      try {
        const res = await experienceApi.list();
        if (res && res.data) {
          setExperienceData(res.data);
          syncToStorage('invictus_experience', res.data);
          return;
        }
      } catch {}
      const stored = localStorage.getItem('invictus_experience');
      if (stored) {
        setExperienceData(JSON.parse(stored));
      } else {
        setExperienceData(defaultExperience);
        syncToStorage('invictus_experience', defaultExperience);
      }
    };
    load();
  }, []);

  const handleAddExperience = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExperience.role || !newExperience.company || !newExperience.period) {
      triggerNotification('Please fill in Role, Company, and Period.', 'error');
      return;
    }
    const newRecord = {
      id: 'exp-' + Date.now(),
      role: newExperience.role,
      company: newExperience.company,
      period: newExperience.period,
      description: newExperience.description || ''
    };
    const updated = [newRecord, ...experienceData];
    setExperienceData(updated);
    syncToStorage('invictus_experience', updated);
    const createResult = await experienceApi.create(newRecord);
    if (!createResult.success) {
      triggerNotification('Failed to sync: ' + (createResult.error || 'server error'), 'error');
      return;
    }
    setNewExperience({ role: '', company: '', period: '', description: '' });
    setExperienceSubTab('list');
    triggerNotification('New Professional Experience record registered successfully!');
  };

  const startEditingExperience = (exp: any) => {
    setEditingExperienceId(exp.id);
    setEditingExperienceForm({
      role: exp.role || '',
      company: exp.company || '',
      period: exp.period || '',
      description: exp.description || ''
    });
    setExperienceSubTab('form');
  };

  const saveEditedExperience = async (id: string) => {
    if (!editingExperienceForm.role || !editingExperienceForm.company || !editingExperienceForm.period) {
      triggerNotification('Please fill in Role, Company, and Period.', 'error');
      return;
    }
    const updated = experienceData.map(exp => {
      if (exp.id === id) {
        return {
          ...exp,
          role: editingExperienceForm.role,
          company: editingExperienceForm.company,
          period: editingExperienceForm.period,
          description: editingExperienceForm.description
        };
      }
      return exp;
    });
    setExperienceData(updated);
    syncToStorage('invictus_experience', updated);
    const updateResult = await experienceApi.update(id, editingExperienceForm);
    if (!updateResult.success) {
      triggerNotification('Failed to sync: ' + (updateResult.error || 'server error'), 'error');
      return;
    }
    setEditingExperienceId(null);
    setExperienceSubTab('list');
    triggerNotification('Professional Experience details updated successfully!');
  };

  const handleDeleteExperience = async (id: string) => {
    const updated = experienceData.filter(exp => exp.id !== id);
    setExperienceData(updated);
    syncToStorage('invictus_experience', updated);
    const removeResult = await experienceApi.remove(id);
    if (!removeResult.success) {
      triggerNotification('Failed to sync: ' + (removeResult.error || 'server error'), 'error');
      return;
    }
    setConfirmDelete(null);
    triggerNotification('Professional Experience record deleted successfully!');
  };

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
          <Briefcase className="w-4 h-4 shrink-0 animate-pulse text-brand-accent" />
          <div className="text-xs font-mono font-bold uppercase tracking-wider">{toast.text}</div>
        </div>
      )}

      <main className="p-4 sm:p-8 max-w-7xl w-full mx-auto">
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-brand-border/40 pb-5 mb-6">
            <div>
              <h3 className="text-xl font-display font-black uppercase text-white tracking-tight">
                {experienceSubTab === 'list' ? 'Professional Experience Timeline' : editingExperienceId ? 'Edit Experience Record' : 'Register New Experience'}
              </h3>
              <p className="text-xs text-[#cbcbcb] font-mono tracking-wider mt-0.5 animate-pulse text-brand-accent">
                {experienceSubTab === 'list' ? 'DYNAMIC HOMEPAGE EXPERIENCES TIMELINE' : 'CREATE HIGH-END WORK RECORD'}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setExperienceSubTab('list');
                  setEditingExperienceId(null);
                }}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all border min-h-[40px] cursor-pointer ${
                  experienceSubTab === 'list'
                    ? 'bg-brand-accent text-black font-black border-brand-accent shadow-sm shadow-brand-accent/20'
                    : 'bg-brand-secondary/80 border-brand-border text-brand-muted hover:text-white'
                }`}
              >
                Experience Records
              </button>
              <button
                onClick={() => {
                  setExperienceSubTab('form');
                  setEditingExperienceId(null);
                  setNewExperience({ role: '', company: '', period: '', description: '' });
                }}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all border min-h-[40px] cursor-pointer ${
                  experienceSubTab === 'form' && !editingExperienceId
                    ? 'bg-brand-accent text-black font-black border-brand-accent shadow-sm shadow-brand-accent/20'
                    : 'bg-brand-secondary/80 border-brand-border text-brand-muted hover:text-white'
                }`}
              >
                + Add Experience
              </button>
            </div>
          </div>

          {experienceSubTab === 'form' ? (
            <div className="max-w-2xl mx-auto w-full p-4 sm:p-8 bg-brand-secondary/40 border border-brand-border/85 rounded-[2rem] sm:rounded-[2.5rem] relative shadow-2xl">
              {editingExperienceId ? (
                <>
                  <div className="flex items-center justify-between border-b border-brand-border/40 pb-4 mb-6">
                    <h2 className="text-xs sm:text-sm font-black uppercase tracking-[0.2em] text-white flex items-center gap-2.5 font-display2">
                      <Edit3 className="w-4 h-5 text-brand-accent animate-pulse" /> Edit Experience Profile
                    </h2>
                    <button
                      onClick={() => { setExperienceSubTab('list'); setEditingExperienceId(null); }}
                      className="text-xs text-brand-muted hover:text-white font-mono uppercase tracking-widest flex items-center gap-1 cursor-pointer"
                    >
                      &larr; Back
                    </button>
                  </div>

                  <form onSubmit={(e) => { e.preventDefault(); saveEditedExperience(editingExperienceId); }} className="space-y-6 text-xs">
                    <div className="space-y-2">
                      <label className="text-brand-muted font-bold tracking-wider uppercase text-[10px]">Role / Designation *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Professional Boxing Referee"
                        value={editingExperienceForm.role}
                        onChange={(e) => setEditingExperienceForm({...editingExperienceForm, role: e.target.value})}
                        className="w-full bg-brand-primary border border-brand-border p-3.5 rounded-xl text-white text-sm focus:border-brand-accent focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-brand-muted font-bold tracking-wider uppercase text-[10px]">Company / Organization *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. World Boxing Council (WBC)"
                          value={editingExperienceForm.company}
                          onChange={(e) => setEditingExperienceForm({...editingExperienceForm, company: e.target.value})}
                          className="w-full bg-brand-primary border border-brand-border p-3.5 rounded-xl text-white text-sm focus:border-brand-accent focus:outline-none transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-brand-muted font-bold tracking-wider uppercase text-[10px]">Time Period *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. 2018 - Present"
                          value={editingExperienceForm.period}
                          onChange={(e) => setEditingExperienceForm({...editingExperienceForm, period: e.target.value})}
                          className="w-full bg-brand-primary border border-brand-border p-3.5 rounded-xl text-white text-sm focus:border-brand-accent focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-brand-muted font-bold tracking-wider uppercase text-[10px]">Short Description / Highlights</label>
                      <textarea
                        rows={4}
                        placeholder="Details about coaching, achievements, reference events, etc."
                        value={editingExperienceForm.description}
                        onChange={(e) => setEditingExperienceForm({...editingExperienceForm, description: e.target.value})}
                        className="w-full bg-brand-primary border border-brand-border p-3.5 rounded-xl text-white text-sm focus:border-brand-accent focus:outline-none transition-colors font-sans"
                      />
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button
                        type="submit"
                        className="flex-1 py-4 bg-brand-accent text-black font-extrabold uppercase tracking-widest rounded-xl hover:bg-brand-accent-hover transition-colors min-h-[48px] cursor-pointer shadow-md shadow-brand-accent/15 text-xs"
                      >
                        SAVE CHANGES
                      </button>
                      <button
                        type="button"
                        onClick={() => { setExperienceSubTab('list'); setEditingExperienceId(null); }}
                        className="px-6 py-4 bg-brand-primary border border-brand-border text-brand-muted hover:text-white font-mono text-xs rounded-xl min-h-[48px] cursor-pointer"
                      >
                        CANCEL
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-between border-b border-brand-border/40 pb-4 mb-6">
                    <h2 className="text-xs sm:text-sm font-black uppercase tracking-[0.2em] text-white flex items-center gap-2.5 font-display2">
                      <Briefcase className="w-4 h-5 text-brand-accent" /> Register Experience Record
                    </h2>
                    <button
                      onClick={() => setExperienceSubTab('list')}
                      className="text-xs text-brand-muted hover:text-white font-mono uppercase tracking-widest flex items-center gap-1 cursor-pointer"
                    >
                      &larr; Back
                    </button>
                  </div>

                  <form onSubmit={handleAddExperience} className="space-y-6 text-xs">
                    <div className="space-y-2">
                      <label className="text-brand-muted font-bold tracking-wider uppercase text-[10px]">Role / Designation *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Owner / Head Coach"
                        value={newExperience.role}
                        onChange={(e) => setNewExperience({...newExperience, role: e.target.value})}
                        className="w-full bg-brand-primary border border-brand-border p-3.5 rounded-xl text-white text-sm focus:border-brand-accent focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-brand-muted font-bold tracking-wider uppercase text-[10px]">Company / Organization *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Invictus BJJ & MMA"
                          value={newExperience.company}
                          onChange={(e) => setNewExperience({...newExperience, company: e.target.value})}
                          className="w-full bg-brand-primary border border-brand-border p-3.5 rounded-xl text-white text-sm focus:border-brand-accent focus:outline-none transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-brand-muted font-bold tracking-wider uppercase text-[10px]">Time Period *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. 2018 - Present"
                          value={newExperience.period}
                          onChange={(e) => setNewExperience({...newExperience, period: e.target.value})}
                          className="w-full bg-brand-primary border border-brand-border p-3.5 rounded-xl text-white text-sm focus:border-brand-accent focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-brand-muted font-bold tracking-wider uppercase text-[10px]">Short Description / Highlights</label>
                      <textarea
                        rows={4}
                        placeholder="Details about coaching, achievements, reference events, etc."
                        value={newExperience.description}
                        onChange={(e) => setNewExperience({...newExperience, description: e.target.value})}
                        className="w-full bg-brand-primary border border-brand-border p-3.5 rounded-xl text-white text-sm focus:border-brand-accent focus:outline-none transition-colors font-sans"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 bg-brand-accent text-black font-extrabold uppercase tracking-widest text-xs rounded-xl hover:bg-brand-accent-hover transition-colors min-h-[48px] cursor-pointer shadow-lg shadow-brand-accent/10"
                    >
                      REGISTER RECORD
                    </button>
                  </form>
                </>
              )}
            </div>
          ) : (
            <div className="w-full space-y-4">
              {/* Desktop table */}
              <div className="hidden md:block p-6 bg-brand-secondary/40 border border-brand-border/80 rounded-[2rem] shadow-xl animate-in fade-in duration-300">
                <h3 className="text-xs font-black uppercase tracking-widest text-white border-b border-brand-border/40 pb-4 mb-4 font-display flex items-center gap-2">
                  Experience Timeline Stocklist ({experienceData.length})
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-brand-border/60 text-brand-muted uppercase font-mono tracking-wider font-bold">
                        <th className="pb-3 p-2 font-bold">Role / Job Title</th>
                        <th className="pb-3 p-2 font-bold">Company / Organization</th>
                        <th className="pb-3 p-2 font-bold">Period</th>
                        <th className="pb-3 p-2 font-bold">Highlights Summary</th>
                        <th className="pb-3 p-2 font-bold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-border/30">
                      {experienceData.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="py-8 text-center text-brand-muted font-mono uppercase tracking-wider">
                            No experiences indexed. Register a record today!
                          </td>
                        </tr>
                      ) : (
                        experienceData.map((exp) => (
                          <tr key={exp.id} className="hover:bg-white/[0.01]">
                            <td className="py-4 p-2 font-bold text-white text-sm leading-tight">
                              {exp.role}
                            </td>
                            <td className="py-4 p-2">
                              <span className="px-2.5 py-1 bg-brand-primary border border-brand-border text-[9px] font-mono font-bold uppercase rounded text-brand-accent">
                                {exp.company}
                              </span>
                            </td>
                            <td className="py-4 p-2 font-mono text-brand-muted">{exp.period}</td>
                            <td className="py-4 p-2 text-brand-muted max-w-xs truncate">{exp.description || "(No description)"}</td>
                            <td className="py-4 p-2 text-right">
                              <div className="flex justify-end gap-2">
                                <button
                                  onClick={() => startEditingExperience(exp)}
                                  className="p-2 border border-brand-border hover:border-brand-accent text-brand-muted hover:text-brand-accent rounded-xl transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center cursor-pointer"
                                  title="Edit Entry"
                                >
                                  <Edit3 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => setConfirmDelete(exp.id)}
                                  className="p-2 border border-brand-border hover:border-red-500 text-brand-muted hover:text-red-500 rounded-xl transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center cursor-pointer"
                                  title="Delete Entry"
                                >
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
              </div>

              {/* Mobile cards */}
              <div className="md:hidden space-y-4 animate-in fade-in duration-305">
                {experienceData.length === 0 ? (
                  <div className="p-10 text-center text-brand-muted bg-brand-secondary border border-brand-border rounded-xl font-mono text-xs">
                    No experiences indexed. Register a record today!
                  </div>
                ) : (
                  experienceData.map((exp) => (
                    <div key={exp.id} className="p-5 bg-brand-secondary/40 border border-brand-border rounded-[1.5rem] space-y-4 shadow-sm">
                      <div className="flex justify-between items-start gap-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-white text-sm leading-tight">{exp.role}</h3>
                          <span className="inline-block mt-1 px-2.5 py-0.5 bg-brand-primary border border-brand-border text-[8px] font-mono font-bold uppercase rounded text-brand-accent">
                            {exp.company}
                          </span>
                        </div>
                        <div className="flex gap-1.5 shrink-0">
                          <button
                            onClick={() => startEditingExperience(exp)}
                            className="w-9 h-9 border border-brand-border text-brand-muted hover:text-brand-accent hover:border-brand-accent rounded-xl transition-colors flex items-center justify-center cursor-pointer"
                            title="Edit Entry"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setConfirmDelete(exp.id)}
                            className="w-9 h-9 border border-brand-border text-brand-muted hover:text-red-500 hover:border-red-500 rounded-xl transition-colors flex items-center justify-center cursor-pointer"
                            title="Delete Entry"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="text-[10px] font-mono text-brand-muted font-bold uppercase tracking-wider">
                        {exp.period}
                      </div>

                      <p className="text-xs text-brand-muted leading-relaxed">
                        {exp.description || "(No description)"}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      {confirmDelete && (
        <ConfirmDialog
          title="Delete Experience"
          message="Are you sure you want to delete this experience record?"
          onConfirm={() => handleDeleteExperience(confirmDelete)}
          onCancel={() => setConfirmDelete(null)}
        />
      )}
    </div>
  );
}
