'use client';

import * as React from 'react';
import { CheckCircle2, Edit3, Save, Sliders, Zap, Plus, Trash2 } from 'lucide-react';
import { pricing as pricingApi } from '@/lib/api';
import ConfirmDialog from '@/components/admin/ConfirmDialog';

interface PricingPlan {
  id: string;
  title: string;
  price: string;
  features: string[];
  highlight: boolean;
  badge?: string;
  originalPrice?: string;
}

const defaultPricing: PricingPlan[] = [
  {
    id: "plan-monthly",
    title: "Monthly Plan",
    price: "3,000/-",
    features: ["No Admission Fee", "All Standard Classes", "Access to MMA & Boxing"],
    highlight: false,
    badge: ""
  },
  {
    id: "plan-quarterly",
    title: "3 Months Course",
    price: "8,000/-",
    originalPrice: "9,000/-",
    features: ["Muay Thai & Boxing Focus", "Intensive Training Course", "Special Discounted Rate"],
    highlight: true,
    badge: "Most Popular"
  }
];

export default function PricingPage() {
  const [pricingData, setPricingData] = React.useState<PricingPlan[]>(defaultPricing);
  const [editingPlanId, setEditingPlanId] = React.useState<string | null>(null);
  const [creatingNew, setCreatingNew] = React.useState(false);
  const [newPlanForm, setNewPlanForm] = React.useState({ title: '', price: '', originalPrice: '', highlight: false, badge: '', features: '' });
  const [editingPlanForm, setEditingPlanForm] = React.useState({ title: '', price: '', originalPrice: '', highlight: false, badge: '', features: '' });
  const [confirmDelete, setConfirmDelete] = React.useState<string | null>(null);
  const [toast, setToast] = React.useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const triggerToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToast({ text, type });
    setTimeout(() => setToast(null), 3000);
  };

  React.useEffect(() => {
    const load = async () => {
      const res = await pricingApi.list();
      if (res.success && res.data) {
        setPricingData(res.data);
        localStorage.setItem('invictus_pricing', JSON.stringify(res.data));
      } else {
        const stored = localStorage.getItem('invictus_pricing');
        if (stored) {
          try { setPricingData(JSON.parse(stored)); } catch {}
        }
      }
    };
    load();
  }, []);

  const startEditingPlan = (plan: PricingPlan) => {
    setEditingPlanId(plan.id);
    setEditingPlanForm({
      title: plan.title,
      price: plan.price,
      originalPrice: plan.originalPrice || '',
      highlight: plan.highlight,
      badge: plan.badge || '',
      features: plan.features.join('\n')
    });
  };

  const handleAddPlan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlanForm.title || !newPlanForm.price) {
      triggerToast('Title and price are required.', 'error');
      return;
    }
    const newPlan: PricingPlan = {
      id: 'plan-' + Date.now().toString(36),
      title: newPlanForm.title,
      price: newPlanForm.price,
      originalPrice: newPlanForm.originalPrice || undefined,
      highlight: newPlanForm.highlight,
      badge: newPlanForm.badge || undefined,
      features: newPlanForm.features.split('\n').map(f => f.trim()).filter(Boolean)
    };
    const updated = [newPlan, ...pricingData];
    setPricingData(updated);
    localStorage.setItem('invictus_pricing', JSON.stringify(updated));
    const res = await pricingApi.create(newPlan);
    if (!res.success) triggerToast('Failed to sync: ' + (res.error || 'server error'), 'error');
    setCreatingNew(false);
    setNewPlanForm({ title: '', price: '', originalPrice: '', highlight: false, badge: '', features: '' });
    triggerToast('New pricing plan created successfully!');
  };

  const handleDeletePlan = (id: string) => {
    setConfirmDelete(id);
  };

  const confirmDeletePlan = async () => {
    if (!confirmDelete) return;
    const updated = pricingData.filter(p => p.id !== confirmDelete);
    setPricingData(updated);
    localStorage.setItem('invictus_pricing', JSON.stringify(updated));
    const res = await pricingApi.remove(confirmDelete);
    if (!res.success) triggerToast('Failed to sync: ' + (res.error || 'server error'), 'error');
    setConfirmDelete(null);
    triggerToast('Pricing plan removed.');
  };

  const saveEditedPlan = async (id: string) => {
    const updatedPlan = {
      id,
      title: editingPlanForm.title,
      price: editingPlanForm.price,
      originalPrice: editingPlanForm.originalPrice || undefined,
      highlight: editingPlanForm.highlight,
      badge: editingPlanForm.badge || undefined,
      features: editingPlanForm.features.split('\n').map(f => f.trim()).filter(Boolean)
    };
    const updated = pricingData.map(p => p.id === id ? { ...p, ...updatedPlan } : p);
    setPricingData(updated);
    localStorage.setItem('invictus_pricing', JSON.stringify(updated));
    const pricingRes = await pricingApi.update(updatedPlan);
    if (!pricingRes.success) triggerToast('Failed to sync: ' + (pricingRes.error || 'server error'), 'error');
    setEditingPlanId(null);
    triggerToast('Course pricing plan configured successfully!');
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

      <header className="hidden md:flex items-center justify-between p-7 bg-brand-secondary/30 border-b border-brand-border/40 -mx-8 -mt-8 mb-8">
        <div>
          <h1 className="text-sm font-black uppercase tracking-wider text-white flex items-center gap-2.5">
            <Sliders className="w-5 h-5 text-brand-accent" /> Configure Package Plans
          </h1>
          <p className="text-xs text-brand-muted mt-0.5 font-sans">Dynamic package pricing configuration panel.</p>
        </div>
        <div className="flex items-center gap-3 select-none">
          <span className="w-2.5 h-2.5 rounded-full bg-[#52fa7c] animate-ping shrink-0" />
          <span className="text-[10px] font-mono text-brand-muted uppercase tracking-wider">BMMAA ACTIVE SYSTEM</span>
        </div>
      </header>

      <ConfirmDialog
        open={confirmDelete !== null}
        title="Delete Plan"
        message="Are you sure you want to remove this pricing plan?"
        onConfirm={confirmDeletePlan}
        onCancel={() => setConfirmDelete(null)}
      />

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold uppercase text-white tracking-widest">Dynamic Package Pricing Plans</h3>
          {!creatingNew && (
            <button
              onClick={() => { setCreatingNew(true); setEditingPlanId(null); }}
              className="px-4 py-2 bg-brand-accent text-black font-bold uppercase tracking-wider text-xs rounded-xl hover:bg-brand-accent-hover transition-all min-h-[40px] cursor-pointer flex items-center gap-2 shadow-lg shadow-brand-accent/15"
            >
              <Plus className="w-4 h-4" /> Add New Plan
            </button>
          )}
        </div>

        {creatingNew && (
          <div className="p-6 sm:p-8 border border-brand-accent/50 rounded-[2rem] bg-brand-secondary/45 space-y-4 shadow-xl">
            <div className="flex items-center gap-2.5 border-b border-brand-border/40 pb-4">
              <span className="px-2.5 py-1 bg-brand-accent text-black uppercase font-bold text-[9px] rounded-full">NEW PLAN</span>
              <span className="text-white/80 font-bold text-sm">Enter details below</span>
            </div>
            <form onSubmit={handleAddPlan} className="space-y-4 text-xs font-mono">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-brand-muted uppercase tracking-wider font-bold">Plan Name *</label>
                  <input
                    type="text"
                    value={newPlanForm.title}
                    onChange={(e) => setNewPlanForm({...newPlanForm, title: e.target.value})}
                    placeholder="e.g. Annual Plan"
                    className="w-full bg-brand-primary border border-brand-border p-2.5 rounded-lg text-white font-sans text-sm focus:outline-none focus:border-brand-accent transition-colors"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-brand-muted uppercase tracking-wider font-bold">Price *</label>
                  <input
                    type="text"
                    value={newPlanForm.price}
                    onChange={(e) => setNewPlanForm({...newPlanForm, price: e.target.value})}
                    placeholder="e.g. 12,000/-"
                    className="w-full bg-brand-primary border border-brand-border p-2.5 rounded-lg text-brand-accent font-sans text-sm focus:outline-none focus:border-brand-accent transition-colors"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-brand-muted uppercase tracking-wider font-bold">Original Strikeout Price</label>
                  <input
                    type="text"
                    value={newPlanForm.originalPrice}
                    onChange={(e) => setNewPlanForm({...newPlanForm, originalPrice: e.target.value})}
                    placeholder="e.g. 15,000/-"
                    className="w-full bg-brand-primary border border-brand-border p-2.5 rounded-lg text-white font-sans text-xs focus:outline-none focus:border-brand-accent transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-brand-muted uppercase tracking-wider font-bold">Ribbon Badge Banner</label>
                  <input
                    type="text"
                    value={newPlanForm.badge}
                    onChange={(e) => setNewPlanForm({...newPlanForm, badge: e.target.value})}
                    placeholder="e.g. Best Value"
                    className="w-full bg-brand-primary border border-brand-border p-2.5 rounded-lg text-white font-sans text-xs focus:outline-none focus:border-brand-accent transition-colors"
                  />
                </div>
              </div>
              <div className="flex items-center gap-3 py-2.5 px-3 bg-brand-primary border border-brand-border rounded-xl">
                <input
                  type="checkbox"
                  id="new-plan-highlight"
                  checked={newPlanForm.highlight}
                  onChange={(e) => setNewPlanForm({...newPlanForm, highlight: e.target.checked})}
                  className="w-4 h-4 text-brand-accent accent-brand-accent shrink-0 rounded cursor-pointer"
                />
                <label htmlFor="new-plan-highlight" className="font-bold text-white uppercase tracking-wider cursor-pointer font-sans text-[11px]">
                  Highlight & Recommend
                </label>
              </div>
              <div className="space-y-1.5">
                <label className="text-brand-muted uppercase tracking-wider font-bold">Features (one bullet highlight per row)</label>
                <textarea
                  rows={4}
                  value={newPlanForm.features}
                  onChange={(e) => setNewPlanForm({...newPlanForm, features: e.target.value})}
                  placeholder="Bullet Points..."
                  className="w-full bg-brand-primary border border-brand-border p-3 rounded-lg font-sans text-sm tracking-normal focus:outline-none focus:border-brand-accent duration-200"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-brand-accent text-black font-bold uppercase text-xs rounded-xl flex items-center justify-center gap-2 hover:bg-brand-accent-hover transition-all min-h-[44px] cursor-pointer shadow-md shadow-brand-accent/15"
                >
                  <Save className="w-4 h-4" /> CREATE PLAN
                </button>
                <button
                  type="button"
                  onClick={() => { setCreatingNew(false); setNewPlanForm({ title: '', price: '', originalPrice: '', highlight: false, badge: '', features: '' }); }}
                  className="px-4 py-3 bg-brand-primary border border-brand-border text-brand-muted hover:text-white font-mono text-xs rounded-xl min-h-[44px] cursor-pointer"
                >
                  CANCEL
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6 items-start">
          {pricingData.map((plan) => (
            <div
              key={plan.id}
              className={`p-6 sm:p-8 border rounded-[2rem] bg-brand-secondary/45 relative space-y-6 transition-all duration-500 shadow-xl ${
                plan.highlight
                  ? 'border-brand-accent/50 shadow-[0_0_30px_rgba(204,255,0,0.06)]'
                  : 'border-brand-border/80'
              }`}
            >
              {editingPlanId === plan.id ? (
                <div className="space-y-4 text-xs font-mono">
                  <div className="flex gap-2.5 items-center">
                    <span className="px-2.5 py-1 bg-brand-accent text-black uppercase font-bold text-[9px] rounded-full">
                      EDIT FORMAT
                    </span>
                    <span className="text-white/80 font-bold">{plan.title}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pb-2 border-b border-brand-border/40">
                    <div className="space-y-1.5">
                      <label className="text-brand-muted uppercase tracking-wider font-bold">Plan Name</label>
                      <input
                        type="text"
                        value={editingPlanForm.title}
                        onChange={(e) => setEditingPlanForm({...editingPlanForm, title: e.target.value})}
                        className="w-full bg-brand-primary border border-brand-border p-2.5 rounded-lg text-white font-sans text-sm focus:outline-none focus:border-brand-accent transition-colors"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-brand-muted uppercase tracking-wider font-bold">Price Option</label>
                      <input
                        type="text"
                        value={editingPlanForm.price}
                        onChange={(e) => setEditingPlanForm({...editingPlanForm, price: e.target.value})}
                        className="w-full bg-brand-primary border border-brand-border p-2.5 rounded-lg text-brand-accent font-sans text-sm focus:outline-none focus:border-brand-accent transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pb-2 border-b border-brand-border/40">
                    <div className="space-y-1.5">
                      <label className="text-brand-muted uppercase tracking-wider font-bold">Original Strikeout Price</label>
                      <input
                        type="text"
                        value={editingPlanForm.originalPrice}
                        onChange={(e) => setEditingPlanForm({...editingPlanForm, originalPrice: e.target.value})}
                        placeholder="e.g. 9,000/-"
                        className="w-full bg-brand-primary border border-brand-border p-2.5 rounded-lg text-white font-sans text-xs focus:outline-none focus:border-brand-accent transition-colors"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-brand-muted uppercase tracking-wider font-bold">Ribbon Badge Banner</label>
                      <input
                        type="text"
                        value={editingPlanForm.badge}
                        onChange={(e) => setEditingPlanForm({...editingPlanForm, badge: e.target.value})}
                        placeholder="e.g. Most Popular"
                        className="w-full bg-brand-primary border border-brand-border p-2.5 rounded-lg text-white font-sans text-xs focus:outline-none focus:border-brand-accent transition-colors"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3 py-2.5 px-3 bg-brand-primary border border-brand-border rounded-xl">
                    <input
                      type="checkbox"
                      id={`hl-${plan.id}`}
                      checked={editingPlanForm.highlight}
                      onChange={(e) => setEditingPlanForm({...editingPlanForm, highlight: e.target.checked})}
                      className="w-4 h-4 text-brand-accent accent-brand-accent shrink-0 rounded cursor-pointer"
                    />
                    <label htmlFor={`hl-${plan.id}`} className="font-bold text-white uppercase tracking-wider cursor-pointer font-sans text-[11px]">
                      Highlight & Recommend
                    </label>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-brand-muted uppercase tracking-wider font-bold">
                      Features (one bullet highlight per row)
                    </label>
                    <textarea
                      rows={4}
                      value={editingPlanForm.features}
                      onChange={(e) => setEditingPlanForm({...editingPlanForm, features: e.target.value})}
                      placeholder="Bullet Points..."
                      className="w-full bg-brand-primary border border-brand-border p-3 rounded-lg font-sans text-sm tracking-normal focus:outline-none focus:border-brand-accent duration-200"
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => saveEditedPlan(plan.id)}
                      className="flex-1 py-3 bg-brand-accent text-black font-bold uppercase text-xs rounded-xl flex items-center justify-center gap-2 hover:bg-brand-accent-hover transition-all min-h-[44px] cursor-pointer shadow-md shadow-brand-accent/15"
                    >
                      <Save className="w-4 h-4" /> SAVE CONFIG
                    </button>
                    <button
                      onClick={() => setEditingPlanId(null)}
                      className="px-4 py-3 bg-brand-primary border border-brand-border text-brand-muted hover:text-white font-mono text-xs rounded-xl min-h-[44px] cursor-pointer"
                    >
                      CANCEL
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-5">
                  <div className="flex justify-between items-start">
                    <div>
                      {plan.badge && (
                        <span className="inline-block px-3 py-1 bg-brand-accent text-black font-bold uppercase text-[9px] tracking-widest rounded-full mb-3 shadow-sm">
                          {plan.badge}
                        </span>
                      )}
                      <h4 className="text-xl font-display font-black text-white uppercase tracking-tight">{plan.title}</h4>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => startEditingPlan(plan)}
                        className="p-2.5 border border-brand-border hover:border-brand-accent hover:text-brand-accent rounded-xl text-brand-muted transition-all flex items-center justify-center gap-1.5 font-mono text-[9px] font-bold uppercase tracking-widest cursor-pointer min-h-[38px]"
                      >
                        <Edit3 className="w-3.5 h-3.5" /> EDIT
                      </button>
                      <button
                        onClick={() => handleDeletePlan(plan.id)}
                        className="p-2.5 border border-brand-border hover:border-red-500 hover:text-red-500 rounded-xl text-brand-muted transition-all flex items-center justify-center min-h-[38px] cursor-pointer"
                        title="Delete plan"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-baseline gap-2">
                    {plan.originalPrice && (
                      <span className="text-sm line-through text-brand-muted/70 font-bold">{plan.originalPrice}</span>
                    )}
                    <span className="text-3xl font-display font-black text-brand-accent">{plan.price}</span>
                    <span className="text-xs text-brand-muted uppercase font-bold">/ Course</span>
                  </div>

                  <ul className="space-y-3 pt-5 border-t border-brand-border/40 text-sm">
                    {plan.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-3 text-white/90">
                        <CheckCircle2 className="w-4.5 h-4.5 text-brand-accent shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {plan.highlight && (
                    <div className="p-3 bg-brand-accent/5 border border-brand-accent/20 rounded-xl text-center text-brand-accent text-[10px] font-bold uppercase tracking-widest">
                      ★ Featured Showcase package
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
