'use client';

import * as React from 'react';
import Image from 'next/image';
import { ShoppingBag, Edit3, Trash2, Save, Search, Zap } from 'lucide-react';
import { products as productsApi } from '@/lib/api';
import ImageUploader from '@/components/admin/ImageUploader';
import ConfirmDialog from '@/components/admin/ConfirmDialog';

const defaultProducts = [
  {
    id: 1,
    name: "Invictus Elite Boxing Gloves",
    price: 89.99,
    category: "Equipment",
    image: "/images/shop/placeholder.svg",
    rating: 4.9,
    description: "Professional grade leather gloves used by Coach Ishtiaq in training sessions."
  },
  {
    id: 2,
    name: "WBC Referee Commemorative Tee",
    price: 34.99,
    category: "Apparel",
    image: "/images/shop/placeholder.svg",
    rating: 4.8,
    description: "Limited edition t-shirt celebrating Bangladesh's first WBC referee."
  },
  {
    id: 3,
    name: "Invictus MMA Shinguards",
    price: 59.99,
    category: "Equipment",
    image: "/images/shop/placeholder.svg",
    rating: 4.7,
    description: "Triple-density foam for maximum protection during sparring."
  }
];

export default function ProductsPage() {
  const [products, setProducts] = React.useState<any[]>(defaultProducts);
  const [productSubTab, setProductSubTab] = React.useState<'list' | 'form'>('list');
  const [editingProductId, setEditingProductId] = React.useState<number | null>(null);
  const [editingProductForm, setEditingProductForm] = React.useState({ name: '', price: '', category: 'Equipment', description: '', image: '', rating: '5.0' });
  const [newProduct, setNewProduct] = React.useState({ name: '', price: '', category: 'Equipment', description: '', image: '', rating: '5.0' });
  const [confirmDelete, setConfirmDelete] = React.useState<{ id: number; name: string } | null>(null);
  const [toast, setToast] = React.useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const triggerToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToast({ text, type });
    setTimeout(() => setToast(null), 3000);
  };

  React.useEffect(() => {
    const load = async () => {
      const res = await productsApi.list();
      if (res.success && res.data) {
        setProducts(res.data);
        localStorage.setItem('invictus_products', JSON.stringify(res.data));
      } else {
        const stored = localStorage.getItem('invictus_products');
        if (stored) {
          try { setProducts(JSON.parse(stored)); } catch {}
        }
      }
    };
    load();
  }, []);

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) {
      triggerToast('Product Name and Price are required.', 'error');
      return;
    }
    const newlyCreated = {
      id: Date.now(),
      name: newProduct.name,
      price: parseFloat(newProduct.price) || 0,
      category: newProduct.category,
      description: newProduct.description || "Elite training product.",
      image: newProduct.image || "/images/shop/placeholder.svg",
      rating: parseFloat(newProduct.rating) || 5.0
    };
    const updated = [newlyCreated, ...products];
    setProducts(updated);
    localStorage.setItem('invictus_products', JSON.stringify(updated));
    const res = await productsApi.create({ ...newlyCreated, price: newlyCreated.price, rating: newlyCreated.rating });
    if (!res.success) triggerToast('Failed to sync: ' + (res.error || 'server error'), 'error');
    setNewProduct({ name: '', price: '', category: 'Equipment', description: '', image: '', rating: '5.0' });
    setProductSubTab('list');
    triggerToast(`Successfully registered product: ${newlyCreated.name}`);
  };

  const startEditingProduct = (product: any) => {
    setEditingProductId(product.id);
    setEditingProductForm({
      name: product.name,
      price: product.price.toString(),
      category: product.category,
      description: product.description,
      image: product.image,
      rating: product.rating.toString()
    });
    setProductSubTab('form');
    triggerToast(`Editing product: ${product.name}`);
  };

  const saveEditedProduct = async (id: number) => {
    if (!editingProductForm.name || !editingProductForm.price) {
      triggerToast('Product Name and Price are required.', 'error');
      return;
    }
    const updated = products.map(p => {
      if (p.id === id) {
        return {
          ...p,
          name: editingProductForm.name,
          price: parseFloat(editingProductForm.price) || 0,
          category: editingProductForm.category,
          description: editingProductForm.description || "Elite training product.",
          image: editingProductForm.image || "/images/shop/placeholder.svg",
          rating: parseFloat(editingProductForm.rating) || 5.0
        };
      }
      return p;
    });
    setProducts(updated);
    localStorage.setItem('invictus_products', JSON.stringify(updated));
    const res = await productsApi.update(id, { ...editingProductForm, price: parseFloat(editingProductForm.price), rating: parseFloat(editingProductForm.rating) });
    if (!res.success) triggerToast('Failed to sync: ' + (res.error || 'server error'), 'error');
    setEditingProductId(null);
    setProductSubTab('list');
    triggerToast(`Successfully updated product: ${editingProductForm.name}`);
  };

  const handleDeleteProduct = async (id: number) => {
    const res = await productsApi.remove(id);
    if (!res.success) {
      triggerToast('Failed to delete: ' + (res.error || 'server error'), 'error');
      return;
    }
    const target = products.find(p => p.id === id);
    const updated = products.filter(p => p.id !== id);
    setProducts(updated);
    localStorage.setItem('invictus_products', JSON.stringify(updated));
    setConfirmDelete(null);
    triggerToast(`Removed ${target?.name} from store inventory.`);
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
        title="Delete Product"
        message={`Are you sure you want to remove ${confirmDelete?.name} from shop?`}
        onConfirm={() => confirmDelete && handleDeleteProduct(confirmDelete.id)}
        onCancel={() => setConfirmDelete(null)}
      />

      <header className="hidden md:flex items-center justify-between p-7 bg-brand-secondary/30 border-b border-brand-border/40 -mx-8 -mt-8 mb-8">
        <div>
          <h1 className="text-sm font-black uppercase tracking-wider text-white flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-brand-accent" /> Shop Inventory Manager
          </h1>
          <p className="text-xs text-brand-muted mt-0.5 font-sans">Manage store products and gear catalog.</p>
        </div>
        <div className="flex items-center gap-3 select-none">
          <span className="w-2.5 h-2.5 rounded-full bg-[#52fa7c] animate-ping shrink-0" />
          <span className="text-[10px] font-mono text-brand-muted uppercase tracking-wider">BMMAA ACTIVE SYSTEM</span>
        </div>
      </header>

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-brand-border/40 pb-5 mb-6">
          <div>
            <h3 className="text-xl font-display font-black uppercase text-white tracking-tight">
              {productSubTab === 'list' ? 'Store Catalog & Inventory' : editingProductId ? 'Edit Product Details' : 'Register New Gear'}
            </h3>
            <p className="text-xs text-brand-muted font-mono tracking-wider mt-0.5 animate-pulse text-brand-accent">
              {productSubTab === 'list' ? 'STOREFRONT GEAR INVENTORY STOCKLIST' : 'CREATE HIGH-END PRODUCT DISPLAY'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setProductSubTab('list');
                setEditingProductId(null);
              }}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all border min-h-[40px] cursor-pointer ${
                productSubTab === 'list'
                  ? 'bg-brand-accent text-black font-black border-brand-accent shadow-sm shadow-brand-accent/20'
                  : 'bg-brand-secondary/80 border-brand-border text-brand-muted hover:text-white'
              }`}
            >
              Product Catalog
            </button>
            <button
              onClick={() => {
                setProductSubTab('form');
                setEditingProductId(null);
                setNewProduct({ name: '', price: '', category: 'Equipment', description: '', image: '', rating: '5.0' });
              }}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all border min-h-[40px] cursor-pointer ${
                productSubTab === 'form' && !editingProductId
                  ? 'bg-brand-accent text-black font-black border-brand-accent shadow-sm shadow-brand-accent/20'
                  : 'bg-brand-secondary/80 border-brand-border text-brand-muted hover:text-white'
              }`}
            >
              + Add Gear
            </button>
          </div>
        </div>

        {productSubTab === 'form' ? (
          <div className="max-w-2xl mx-auto w-full p-4 sm:p-8 bg-brand-secondary/40 border border-brand-border/85 rounded-[2rem] sm:rounded-[2.5rem] relative shadow-2xl">
            {editingProductId ? (
              <>
                <div className="flex items-center justify-between border-b border-brand-border/40 pb-4 mb-6">
                  <h2 className="text-xs sm:text-sm font-black uppercase tracking-[0.2em] text-white flex items-center gap-2.5 font-display2">
                    <Edit3 className="w-4 h-5 text-brand-accent animate-pulse" /> Edit Shop Product
                  </h2>
                  <button
                    onClick={() => { setProductSubTab('list'); setEditingProductId(null); }}
                    className="text-xs text-brand-muted hover:text-white font-mono uppercase tracking-widest flex items-center gap-1 cursor-pointer"
                  >
                    ← Back
                  </button>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); saveEditedProduct(editingProductId); }} className="space-y-6 text-xs">
                  <div className="space-y-2">
                    <label className="text-brand-muted font-bold tracking-wider uppercase text-[10px]">Product Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Invictus Rashguard"
                      value={editingProductForm.name}
                      onChange={(e) => setEditingProductForm({...editingProductForm, name: e.target.value})}
                      className="w-full bg-brand-primary border border-brand-border p-3.5 rounded-xl text-white text-sm focus:border-brand-accent focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-brand-muted font-bold tracking-wider uppercase text-[10px]">Price (৳) *</label>
                      <input
                        type="number"
                        required
                        step="0.01"
                        placeholder="e.g. 1200"
                        value={editingProductForm.price}
                        onChange={(e) => setEditingProductForm({...editingProductForm, price: e.target.value})}
                        className="w-full bg-brand-primary border border-brand-border p-3.5 rounded-xl text-white text-sm font-mono focus:border-brand-accent focus:outline-none transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-brand-muted font-bold tracking-wider uppercase text-[10px]">Category *</label>
                      <select
                        value={editingProductForm.category}
                        onChange={(e) => setEditingProductForm({...editingProductForm, category: e.target.value})}
                        className="w-full bg-brand-primary border border-brand-border p-3.5 rounded-xl text-white text-xs focus:border-brand-accent focus:outline-none transition-colors cursor-pointer h-[48px]"
                      >
                        <option value="Apparel">Apparel</option>
                        <option value="Equipment">Equipment</option>
                        <option value="Digital">Digital</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-brand-muted font-bold tracking-wider uppercase text-[10px]">Rating Code *</label>
                      <input
                        type="text"
                        placeholder="e.g. 4.9"
                        value={editingProductForm.rating}
                        onChange={(e) => setEditingProductForm({...editingProductForm, rating: e.target.value})}
                        className="w-full bg-brand-primary border border-brand-border p-3.5 rounded-xl text-white text-sm font-mono focus:border-brand-accent focus:outline-none transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-brand-muted font-bold tracking-wider uppercase text-[10px]">Product Image URL</label>
                      <input
                        type="text"
                        placeholder="e.g. https://picsum.photos/..."
                        value={editingProductForm.image}
                        onChange={(e) => setEditingProductForm({...editingProductForm, image: e.target.value})}
                        className="w-full bg-brand-primary border border-brand-border p-3.5 rounded-xl text-white text-sm focus:border-brand-accent focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <ImageUploader
                    id="edit-product-img"
                    value={editingProductForm.image}
                    onChange={(val) => setEditingProductForm({...editingProductForm, image: val})}
                  />

                  <div className="space-y-2">
                    <label className="text-brand-muted font-bold tracking-wider uppercase text-[10px]">Short Description</label>
                    <textarea
                      rows={3}
                      placeholder="Briefly summarize what makes this gear standard elite..."
                      value={editingProductForm.description}
                      onChange={(e) => setEditingProductForm({...editingProductForm, description: e.target.value})}
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
                      onClick={() => { setProductSubTab('list'); setEditingProductId(null); }}
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
                    <ShoppingBag className="w-4 h-5 text-brand-accent" /> Register Store Product
                  </h2>
                  <button
                    onClick={() => setProductSubTab('list')}
                    className="text-xs text-brand-muted hover:text-white font-mono uppercase tracking-widest flex items-center gap-1 cursor-pointer"
                  >
                    ← Back
                  </button>
                </div>

                <form onSubmit={handleAddProduct} className="space-y-6 text-xs">
                  <div className="space-y-2">
                    <label className="text-brand-muted font-bold tracking-wider uppercase text-[10px]">Product Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Invictus Rashguard"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                      className="w-full bg-brand-primary border border-brand-border p-3.5 rounded-xl text-white text-sm focus:border-brand-accent focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-brand-muted font-bold tracking-wider uppercase text-[10px]">Price (৳) *</label>
                      <input
                        type="number"
                        required
                        step="0.01"
                        placeholder="e.g. 1200"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                        className="w-full bg-brand-primary border border-brand-border p-3.5 rounded-xl text-white text-sm focus:border-brand-accent focus:outline-none transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-brand-muted font-bold tracking-wider uppercase text-[10px]">Category *</label>
                      <select
                        value={newProduct.category}
                        onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                        className="w-full bg-brand-primary border border-brand-border p-3.5 rounded-xl text-white text-xs focus:border-brand-accent focus:outline-none transition-colors cursor-pointer h-[48px]"
                      >
                        <option value="Apparel">Apparel</option>
                        <option value="Equipment">Equipment</option>
                        <option value="Digital">Digital</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-brand-muted font-bold tracking-wider uppercase text-[10px]">Rating Code *</label>
                      <input
                        type="text"
                        placeholder="e.g. 4.9"
                        value={newProduct.rating}
                        onChange={(e) => setNewProduct({...newProduct, rating: e.target.value})}
                        className="w-full bg-brand-primary border border-brand-border p-3.5 rounded-xl text-white text-sm font-mono focus:border-brand-accent focus:outline-none transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-brand-muted font-bold tracking-wider uppercase text-[10px]">Product Image URL</label>
                      <input
                        type="text"
                        placeholder="e.g. https://picsum.photos/..."
                        value={newProduct.image}
                        onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                        className="w-full bg-brand-primary border border-brand-border p-3.5 rounded-xl text-white text-sm focus:border-brand-accent focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <ImageUploader
                    id="new-product-img"
                    value={newProduct.image}
                    onChange={(val) => setNewProduct({...newProduct, image: val})}
                  />

                  <div className="space-y-2">
                    <label className="text-brand-muted font-bold tracking-wider uppercase text-[10px]">Short Description</label>
                    <textarea
                      rows={3}
                      placeholder="Briefly summarize what makes this gear standard elite..."
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                      className="w-full bg-brand-primary border border-brand-border p-3.5 rounded-xl text-white text-sm focus:border-brand-accent focus:outline-none transition-colors font-sans"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-brand-accent text-black font-extrabold uppercase tracking-widest text-xs rounded-xl hover:bg-brand-accent-hover transition-colors min-h-[48px] cursor-pointer shadow-lg shadow-brand-accent/10"
                  >
                    REGISTER PRODUCT RECORD
                  </button>
                </form>
              </>
            )}
          </div>
        ) : (
          <div className="w-full space-y-4">
            {/* Desktop table */}
            <div className="hidden md:block p-6 bg-brand-secondary/40 border border-brand-border/80 rounded-[2rem] shadow-xl animate-in fade-in duration-300">
              <h3 className="text-xs font-black uppercase tracking-widest text-white border-b border-brand-border/40 pb-4 mb-4 font-display">
                Store Inventory Directory ({products.length})
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-brand-border/60 text-brand-muted uppercase font-mono tracking-wider">
                      <th className="pb-3 p-2 font-bold">Product ID / Item Name</th>
                      <th className="pb-3 p-2 font-bold">Category</th>
                      <th className="pb-3 p-2 font-bold">Price</th>
                      <th className="pb-3 p-2 font-bold">Rating</th>
                      <th className="pb-3 p-2 font-bold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-border/30">
                    {products.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-12 text-center text-brand-muted uppercase font-mono">
                          No products found in stock.
                        </td>
                      </tr>
                    ) : (
                      products.map((prod) => (
                        <tr key={prod.id} className="hover:bg-white/[0.01]">
                          <td className="py-4 p-2">
                            <div className="flex items-center gap-3">
                              <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-brand-border bg-brand-primary">
                                <Image src={prod.image} alt={prod.name} width={40} height={40} className="object-cover w-full h-full grayscale" />
                              </div>
                              <div>
                                <div className="font-bold text-white text-sm">{prod.name}</div>
                                <div className="text-[10px] font-mono text-brand-muted mt-0.5">ID: {prod.id}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 p-2">
                            <span className="px-2 py-0.5 bg-brand-primary border border-brand-border text-[9px] font-mono font-bold uppercase rounded text-brand-accent">
                              {prod.category}
                            </span>
                          </td>
                          <td className="py-4 p-2 font-bold text-white">৳{(prod.price || 0).toLocaleString()}</td>
                          <td className="py-4 p-2 font-mono text-amber-400 font-bold">★ {prod.rating || "5.0"}</td>
                          <td className="py-4 p-2 text-right">
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => startEditingProduct(prod)}
                                className="p-2 border border-brand-border text-brand-muted hover:border-brand-accent hover:text-brand-accent rounded-lg transition-colors cursor-pointer"
                                title="Edit Product Details"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => setConfirmDelete({ id: prod.id, name: prod.name })}
                                className="p-2 border border-brand-border text-brand-muted hover:text-red-500 hover:border-red-500 rounded-lg transition-colors cursor-pointer shrink-0"
                                title="Delete Product"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
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
              {products.length === 0 ? (
                <div className="p-10 text-center text-brand-muted bg-brand-secondary border border-brand-border rounded-xl font-mono text-xs">
                  No products found in stock.
                </div>
              ) : (
                products.map((prod) => (
                  <div key={prod.id} className="p-5 bg-brand-secondary/40 border border-brand-border rounded-[1.5rem] space-y-4 shadow-sm">
                    <div className="flex items-start gap-3">
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-brand-border bg-brand-primary">
                        <Image src={prod.image} alt={prod.name} width={56} height={56} className="object-cover w-full h-full grayscale" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-white text-sm leading-tight truncate">{prod.name}</h3>
                        <div className="text-[9px] font-mono text-brand-muted mt-0.5">ID: {prod.id}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="px-2 py-0.5 bg-brand-primary border border-brand-border text-[8px] font-mono font-bold uppercase rounded text-brand-accent">
                            {prod.category}
                          </span>
                          <span className="font-mono text-[10px] text-amber-400 font-bold">★ {prod.rating || "5.0"}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between bg-brand-primary/40 border border-brand-border/40 p-3 rounded-xl">
                      <span className="text-[9px] font-mono text-brand-muted uppercase">Price</span>
                      <span className="text-base font-display font-black text-brand-accent">৳{(prod.price || 0).toLocaleString()}</span>
                    </div>

                    {prod.description && (
                      <p className="text-xs text-brand-muted leading-relaxed">{prod.description}</p>
                    )}

                    <div className="flex gap-2">
                      <button
                        onClick={() => startEditingProduct(prod)}
                        className="flex-1 py-2.5 bg-brand-primary border border-brand-border text-[9px] font-bold tracking-widest text-white rounded-xl uppercase hover:text-brand-accent hover:border-brand-accent transition-colors min-h-[40px] cursor-pointer"
                      >
                        EDIT
                      </button>
                      <button
                        onClick={() => setConfirmDelete({ id: prod.id, name: prod.name })}
                        className="py-2.5 px-4 bg-brand-primary border border-brand-border text-[#ff4c4c] rounded-xl hover:bg-red-500/10 hover:border-red-500 transition-colors min-h-[40px] cursor-pointer text-[9px] font-bold uppercase tracking-widest"
                      >
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
  );
}
