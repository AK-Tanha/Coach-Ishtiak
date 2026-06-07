'use client';

import * as React from 'react';
import { Trash2, Package } from 'lucide-react';
import { orders as ordersApi } from '@/lib/api';
import ConfirmDialog from '@/components/admin/ConfirmDialog';

const defaultOrders = [
  { id: "ord-1", athleteName: "Saadman Sakib", phone: "01819283746", email: "saadman.sk@gmail.com", address: "Dhanmondi Rd 27, Dhaka", items: "Invictus Elite Boxing Gloves (Qty: 1)", totalPrice: 89.99, status: "Pending", paymentMethod: "bKash", date: "2026-05-22" },
  { id: "ord-2", athleteName: "Zarin Subah", phone: "01722883399", email: "zarin.sb@gmail.com", address: "Gulshan-1, Dhaka", items: "WBC Referee Commemorative Tee (Qty: 2)", totalPrice: 69.98, status: "Shipped", paymentMethod: "Nagad", date: "2026-05-20" }
];

export default function OrdersPage() {
  const [orders, setOrders] = React.useState<any[]>([]);
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
        const res = await ordersApi.list();
        if (res && res.data) {
          setOrders(res.data);
          syncToStorage('invictus_orders', res.data);
          return;
        }
      } catch {}
      const stored = localStorage.getItem('invictus_orders');
      if (stored) {
        setOrders(JSON.parse(stored));
      } else {
        setOrders(defaultOrders);
        syncToStorage('invictus_orders', defaultOrders);
      }
    };
    load();
  }, []);

  const handleToggleOrderStatus = async (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'Pending' ? 'Shipped' : currentStatus === 'Shipped' ? 'Delivered' : currentStatus === 'Delivered' ? 'Canceled' : 'Pending';
    const updated = orders.map(o => {
      if (o.id === id) return { ...o, status: nextStatus };
      return o;
    });
    setOrders(updated);
    syncToStorage('invictus_orders', updated);
    const res = await ordersApi.updateStatus(id, nextStatus);
    if (!res.success) { triggerNotification('Failed to sync: ' + (res.error || 'server error'), 'error'); return; }
    triggerNotification(`Order ${id} status updated to ${nextStatus}.`);
  };

  const handleDeleteOrder = async (id: string) => {
    const res = await ordersApi.remove(id);
    if (!res.success) { triggerNotification('Failed to delete: ' + (res.error || 'server error'), 'error'); return; }
    const updated = orders.filter(o => o.id !== id);
    setOrders(updated);
    syncToStorage('invictus_orders', updated);
    setConfirmDelete(null);
    triggerNotification(`Order ${id} record removed.`);
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
          <Package className="w-4 h-4 shrink-0 animate-pulse text-brand-accent" />
          <div className="text-xs font-mono font-bold uppercase tracking-wider">{toast.text}</div>
        </div>
      )}

      <main className="p-4 sm:p-8 max-w-7xl w-full mx-auto">
        <div className="space-y-6">
          <div>
            <h3 className="text-base font-bold uppercase text-white tracking-widest">Store Checkout Stream orders</h3>
          </div>

          <div className="space-y-4">
            {orders.length === 0 ? (
              <div className="p-16 text-center text-sm font-sans uppercase text-brand-muted bg-brand-secondary/40 border border-brand-border border-dashed rounded-2xl">
                No orders have been submitted yet. Build connections inside.
              </div>
            ) : (
              orders.map((ord) => (
                <div
                  key={ord.id}
                  className={`p-6 bg-brand-secondary/45 border rounded-[2rem] space-y-4 transition-all duration-500 relative shadow-md ${
                    ord.status === 'Pending'
                      ? 'border-amber-400/40 shadow-amber-400/5'
                      : ord.status === 'Shipped'
                        ? 'border-sky-500/30 shadow-sky-500/5'
                        : ord.status === 'Delivered'
                          ? 'border-[#52fa7c]/30'
                          : 'border-brand-border/80 opacity-75'
                  }`}
                >
                  <div className="absolute top-5 right-5 flex items-center gap-2">
                    <span className={`font-mono font-black text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md select-none ${
                      ord.status === 'Pending'
                        ? 'bg-amber-400 text-black'
                        : ord.status === 'Shipped'
                          ? 'bg-sky-400 text-black'
                          : ord.status === 'Delivered'
                            ? 'bg-emerald-400 text-black'
                            : 'bg-zinc-800 text-zinc-400'
                    }`}>
                      {ord.status}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-brand-border/40 pb-4">
                    <div>
                      <div className="flex items-center gap-2.5">
                        <span className="font-bold text-white text-base">{ord.athleteName}</span>
                        <span className="text-[10px] font-mono text-brand-muted uppercase font-bold">({ord.date})</span>
                      </div>
                      <div className="text-xs text-brand-muted font-sans mt-0.5">Phone: <span className="font-mono text-white">{ord.phone}</span> &bull; Email: {ord.email}</div>
                      <div className="text-[11px] text-brand-muted tracking-tight font-sans mt-1">Shipping: <span className="text-white">{ord.address}</span></div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0">
                      <button
                        onClick={() => handleToggleOrderStatus(ord.id, ord.status)}
                        className="px-4 py-2 font-mono text-[9px] font-bold uppercase tracking-wider rounded-xl border border-brand-border hover:border-brand-accent text-brand-muted hover:text-brand-accent transition-colors cursor-pointer min-h-[34px]"
                      >
                        Cycle Status
                      </button>

                      <button
                        onClick={() => setConfirmDelete(ord.id)}
                        className="p-2 border border-brand-border text-brand-muted hover:text-red-500 hover:border-red-500 rounded-xl transition-colors min-w-[34px] min-h-[34px] flex items-center justify-center cursor-pointer"
                        title="Delete Order"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4 bg-brand-primary/40 p-4 rounded-xl border border-brand-border/20">
                    <div className="text-xs font-mono font-bold text-brand-muted uppercase">
                      Purchased Items: <span className="text-white normal-case font-sans tracking-normal ml-1.5">{ord.items}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-[9px] font-mono text-brand-muted uppercase">Total Paid ({ord.paymentMethod})</div>
                      <div className="text-base font-display font-black text-brand-accent">৳{(ord.totalPrice || 0).toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      {confirmDelete && (
        <ConfirmDialog
          title="Delete Order"
          message={`Are you sure you want to remove order ${confirmDelete}?`}
          onConfirm={() => handleDeleteOrder(confirmDelete)}
          onCancel={() => setConfirmDelete(null)}
        />
      )}
    </div>
  );
}
