'use client';

import * as React from 'react';
import Image from 'next/image';
import { Image as ImageIcon, Trash2, Upload, Link, Zap, X, Loader2 } from 'lucide-react';
import { gallery as galleryApi } from '@/lib/api';
import { upload as uploadApi } from '@/lib/api';
import ConfirmDialog from '@/components/admin/ConfirmDialog';

interface GalleryImage {
  id: number;
  url: string;
  title: string;
  category: string;
}

export default function GalleryPage() {
  const [images, setImages] = React.useState<GalleryImage[]>([]);
  const [subTab, setSubTab] = React.useState<'list' | 'add'>('list');
  const [addMode, setAddMode] = React.useState<'single' | 'bulk'>('single');
  const [newImage, setNewImage] = React.useState({ url: '', title: '', category: 'Events' });
  const [bulkCategory, setBulkCategory] = React.useState('Events');
  const [bulkFiles, setBulkFiles] = React.useState<File[]>([]);
  const [bulkPreviews, setBulkPreviews] = React.useState<string[]>([]);
  const [uploading, setUploading] = React.useState(false);
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const [confirmDelete, setConfirmDelete] = React.useState<{ id: number; title: string } | null>(null);
  const [toast, setToast] = React.useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [loading, setLoading] = React.useState(true);

  const triggerToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToast({ text, type });
    setTimeout(() => setToast(null), 3000);
  };

  const filterPicsum = (items: GalleryImage[]) => items.filter(i => !i.url.includes('picsum.photos'));

  React.useEffect(() => {
    const load = async () => {
      setLoading(true);
      const res = await galleryApi.list();
      if (res.success && res.data) {
        const filtered = filterPicsum(res.data);
        setImages(filtered);
        localStorage.setItem('invictus_gallery', JSON.stringify(filtered));
      } else {
        const stored = localStorage.getItem('invictus_gallery');
        if (stored) {
          try { setImages(filterPicsum(JSON.parse(stored))); } catch {}
        }
      }
      setLoading(false);
    };
    load();
  }, []);

  const handleAddSingle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImage.title || !newImage.url) {
      triggerToast('Title and Image URL are required.', 'error');
      return;
    }
    const created = {
      id: Date.now(),
      url: newImage.url,
      title: newImage.title,
      category: newImage.category,
    };
    const updated = [created, ...images];
    setImages(updated);
    localStorage.setItem('invictus_gallery', JSON.stringify(updated));
    const res = await galleryApi.create({ url: created.url, title: created.title, category: created.category });
    if (!res.success) triggerToast('Failed to sync: ' + (res.error || 'server error'), 'error');
    setNewImage({ url: '', title: '', category: 'Events' });
    setSubTab('list');
    triggerToast(`Added gallery image: ${created.title}`);
  };

  const handleBulkUpload = async () => {
    if (bulkFiles.length === 0) {
      triggerToast('Select at least one image file.', 'error');
      return;
    }
    setUploading(true);
    setUploadProgress(0);
    let uploaded = 0;
    const results: GalleryImage[] = [];

    for (let i = 0; i < bulkFiles.length; i++) {
      const file = bulkFiles[i];
      try {
        const uploadRes = await uploadApi.image(file);
        if (uploadRes.success && uploadRes.data?.url) {
          const name = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
          const entry = {
            id: Date.now() + i,
            url: uploadRes.data.url,
            title: name,
            category: bulkCategory,
          };
          await galleryApi.create({ url: entry.url, title: entry.title, category: entry.category });
          results.push(entry);
        }
      } catch {
        // skip failed file
      }
      uploaded++;
      setUploadProgress(Math.round((uploaded / bulkFiles.length) * 100));
    }

    if (results.length > 0) {
      const updated = [...results, ...images];
      setImages(updated);
      localStorage.setItem('invictus_gallery', JSON.stringify(updated));
      triggerToast(`Uploaded ${results.length} of ${bulkFiles.length} images.`);
    } else {
      triggerToast('Upload failed. Check files and try again.', 'error');
    }

    setBulkFiles([]);
    setBulkPreviews([]);
    setUploading(false);
    setUploadProgress(0);
    setSubTab('list');
  };

  const handleBulkFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setBulkFiles(files);
    const previews = files.map(f => URL.createObjectURL(f));
    setBulkPreviews(previews);
  };

  const removeBulkFile = (idx: number) => {
    setBulkFiles(prev => prev.filter((_, i) => i !== idx));
    setBulkPreviews(prev => {
      URL.revokeObjectURL(prev[idx]);
      return prev.filter((_, i) => i !== idx);
    });
  };

  const handleDelete = async (id: number) => {
    const res = await galleryApi.remove(id);
    if (!res.success) {
      triggerToast('Failed to delete: ' + (res.error || 'server error'), 'error');
      return;
    }
    const target = images.find(img => img.id === id);
    const updated = images.filter(img => img.id !== id);
    setImages(updated);
    localStorage.setItem('invictus_gallery', JSON.stringify(updated));
    setConfirmDelete(null);
    triggerToast(`Removed ${target?.title} from gallery.`);
  };

  return (
    <main className="flex-1 flex flex-col min-h-0">
      {toast && (
        <div className={`fixed top-6 right-6 z-50 p-4 rounded-2xl border backdrop-blur-md max-w-sm shadow-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300 ${
          toast.type === 'success'
            ? 'bg-neutral-900/90 border-brand-accent/30 text-brand-accent shadow-brand-accent/5'
            : 'bg-red-950/90 border-red-500/30 text-red-100 shadow-red-500/5'
        }`}>
          <Zap className="w-4 h-4 shrink-0" />
          <div className="text-xs font-mono font-bold uppercase tracking-wider">{toast.text}</div>
        </div>
      )}

      <ConfirmDialog
        open={!!confirmDelete}
        title="Delete Image"
        message={`Are you sure you want to remove ${confirmDelete?.title} from gallery?`}
        onConfirm={() => confirmDelete && handleDelete(confirmDelete.id)}
        onCancel={() => setConfirmDelete(null)}
      />

      <header className="sticky top-0 z-10 bg-brand-primary/95 backdrop-blur-xl border-b border-brand-border/50 px-4 py-3 md:px-8 md:py-5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-brand-accent/10 border border-brand-accent/25 flex items-center justify-center shrink-0">
              <ImageIcon className="w-4 h-4 text-brand-accent" />
            </div>
            <div className="min-w-0">
              <h1 className="text-sm font-black uppercase tracking-wider text-white truncate">
                Gallery
              </h1>
              <p className="text-[10px] text-brand-muted font-mono truncate">
                {images.length} {images.length === 1 ? 'IMAGE' : 'IMAGES'} ARCHIVED
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setSubTab(subTab === 'list' ? 'add' : 'list');
              setAddMode('single');
              setBulkFiles([]);
              setBulkPreviews([]);
            }}
            className={`shrink-0 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all border min-h-[44px] cursor-pointer ${
              subTab === 'add'
                ? 'bg-brand-accent text-black font-black border-brand-accent shadow-sm shadow-brand-accent/20'
                : 'bg-brand-secondary/80 border-brand-border text-brand-muted hover:text-white'
            }`}
          >
            {subTab === 'add' ? 'Close' : '+ Add'}
          </button>
        </div>
      </header>

      {subTab === 'add' ? (
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-2xl mx-auto w-full space-y-6">
            <div className="flex gap-1 p-1 bg-brand-secondary/60 border border-brand-border/60 rounded-xl w-fit">
              <button
                onClick={() => setAddMode('single')}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all min-h-[44px] cursor-pointer ${
                  addMode === 'single'
                    ? 'bg-brand-accent text-black shadow-sm'
                    : 'text-brand-muted hover:text-white'
                }`}
              >
                <Link className="w-3.5 h-3.5" />
                URL
              </button>
              <button
                onClick={() => setAddMode('bulk')}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all min-h-[44px] cursor-pointer ${
                  addMode === 'bulk'
                    ? 'bg-brand-accent text-black shadow-sm'
                    : 'text-brand-muted hover:text-white'
                }`}
              >
                <Upload className="w-3.5 h-3.5" />
                Bulk Upload
              </button>
            </div>

            {addMode === 'single' ? (
              <form onSubmit={handleAddSingle} className="p-5 md:p-8 bg-brand-secondary/40 border border-brand-border/85 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl space-y-6 text-xs">
                <h2 className="text-xs font-black uppercase tracking-[0.2em] text-white flex items-center gap-2.5">
                  <Link className="w-4 h-4 text-brand-accent" /> Add Image via URL
                </h2>

                <div className="space-y-2">
                  <label className="text-brand-muted font-bold tracking-wider uppercase text-[10px]">Image Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Championship Victory"
                    value={newImage.title}
                    onChange={(e) => setNewImage({...newImage, title: e.target.value})}
                    className="w-full bg-brand-primary border border-brand-border p-3.5 rounded-xl text-white text-sm focus:border-brand-accent focus:outline-none transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-brand-muted font-bold tracking-wider uppercase text-[10px]">Category *</label>
                  <select
                    value={newImage.category}
                    onChange={(e) => setNewImage({...newImage, category: e.target.value})}
                    className="w-full bg-brand-primary border border-brand-border p-3.5 rounded-xl text-white text-xs focus:border-brand-accent focus:outline-none transition-colors cursor-pointer h-[48px]"
                  >
                    <option value="Events">Events</option>
                    <option value="Training">Training</option>
                    <option value="Fights">Fights</option>
                    <option value="Team">Team</option>
                    <option value="Media">Media</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-brand-muted font-bold tracking-wider uppercase text-[10px]">Image URL</label>
                  <input
                    type="text"
                    placeholder="https://example.com/image.jpg"
                    value={newImage.url}
                    onChange={(e) => setNewImage({...newImage, url: e.target.value})}
                    className="w-full bg-brand-primary border border-brand-border p-3.5 rounded-xl text-white text-sm focus:border-brand-accent focus:outline-none transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-brand-muted font-bold tracking-wider uppercase text-[10px]">Or Upload File</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const res = await uploadApi.image(file);
                      if (res.success && res.data?.url) {
                        setNewImage(prev => ({ ...prev, url: res.data!.url }));
                        triggerToast('Image uploaded successfully.');
                      } else {
                        triggerToast('Upload failed.', 'error');
                      }
                    }}
                    className="w-full bg-brand-primary border border-brand-border rounded-xl text-white text-sm file:mr-3 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-brand-accent file:text-black file:cursor-pointer cursor-pointer file:uppercase file:tracking-wider h-[48px] pt-3 file:min-h-[44px]"
                  />
                </div>

                {newImage.url && (
                  <div className="relative w-full h-40 rounded-xl overflow-hidden border border-brand-border bg-brand-primary">
                    <Image src={newImage.url} alt="Preview" width={400} height={160} className="object-cover w-full h-full" />
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-4 bg-brand-accent text-black font-extrabold uppercase tracking-widest text-xs rounded-xl hover:bg-brand-accent-hover transition-colors min-h-[48px] cursor-pointer shadow-lg shadow-brand-accent/10"
                >
                  ADD TO GALLERY
                </button>
              </form>
            ) : (
              <div className="p-5 md:p-8 bg-brand-secondary/40 border border-brand-border/85 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl space-y-6 text-xs">
                <h2 className="text-xs font-black uppercase tracking-[0.2em] text-white flex items-center gap-2.5">
                  <Upload className="w-4 h-4 text-brand-accent" /> Bulk Upload Images
                </h2>

                <div className="space-y-2">
                  <label className="text-brand-muted font-bold tracking-wider uppercase text-[10px]">Category for All</label>
                  <select
                    value={bulkCategory}
                    onChange={(e) => setBulkCategory(e.target.value)}
                    className="w-full bg-brand-primary border border-brand-border p-3.5 rounded-xl text-white text-xs focus:border-brand-accent focus:outline-none transition-colors cursor-pointer h-[48px]"
                  >
                    <option value="Events">Events</option>
                    <option value="Training">Training</option>
                    <option value="Fights">Fights</option>
                    <option value="Team">Team</option>
                    <option value="Media">Media</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-brand-muted font-bold tracking-wider uppercase text-[10px]">
                    Select Images ({bulkFiles.length} selected)
                  </label>
                  <label className="flex flex-col items-center justify-center w-full min-h-[120px] border-2 border-dashed border-brand-border hover:border-brand-accent/55 rounded-xl bg-brand-primary cursor-pointer transition-all group">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleBulkFileSelect}
                      className="hidden"
                    />
                    <div className="flex flex-col items-center py-6 px-4 text-center">
                      <Upload className="w-6 h-6 text-brand-muted group-hover:text-brand-accent mb-2" />
                      <span className="text-xs font-mono font-bold text-brand-muted group-hover:text-brand-accent uppercase tracking-wider">
                        Tap to select images
                      </span>
                      <span className="text-[9px] text-brand-muted mt-1 font-mono">
                        PNG, JPG, WEBP — select multiple
                      </span>
                    </div>
                  </label>
                </div>

                {bulkPreviews.length > 0 && (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {bulkPreviews.map((preview, idx) => (
                      <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-brand-border bg-brand-primary group">
                        <Image src={preview} alt={`File ${idx + 1}`} width={200} height={200} className="object-cover w-full h-full" />
                        <button
                          type="button"
                          onClick={() => removeBulkFile(idx)}
                          className="absolute top-1 right-1 w-6 h-6 bg-black/70 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                        >
                          <X className="w-3 h-3 text-white" />
                        </button>
                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-1.5 py-1">
                          <span className="text-[8px] text-white font-mono truncate block">
                            {bulkFiles[idx].name}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {uploading && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-mono text-brand-muted">
                      <span className="flex items-center gap-2">
                        <Loader2 className="w-3 h-3 animate-spin" />
                        Uploading...
                      </span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-brand-primary rounded-full overflow-hidden border border-brand-border">
                      <div
                        className="h-full bg-brand-accent rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                <button
                  onClick={handleBulkUpload}
                  disabled={uploading || bulkFiles.length === 0}
                  className="w-full py-4 bg-brand-accent text-black font-extrabold uppercase tracking-widest text-xs rounded-xl hover:bg-brand-accent-hover transition-colors min-h-[48px] cursor-pointer shadow-lg shadow-brand-accent/10 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {uploading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      UPLOADING...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      UPLOAD {bulkFiles.length > 0 ? `${bulkFiles.length} IMAGE${bulkFiles.length > 1 ? 'S' : ''}` : 'FILES'}
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto w-full space-y-4">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-5 h-5 text-brand-accent animate-spin" />
              </div>
            ) : images.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <ImageIcon className="w-10 h-10 text-brand-muted/40 mb-4" />
                <p className="text-sm font-mono text-brand-muted font-bold uppercase tracking-wider">
                  Gallery is empty
                </p>
                <p className="text-[10px] text-brand-muted/60 mt-1 font-mono">
                  Add your first image to get started
                </p>
              </div>
            ) : (
              <>
                {/* Mobile-first: cards visible on mobile, hidden on desktop */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:hidden">
                  {images.map((img) => (
                    <div key={img.id} className="group relative bg-brand-secondary/40 border border-brand-border rounded-xl overflow-hidden">
                      <div className="aspect-square relative">
                        <Image src={img.url} alt={img.title} width={400} height={400} className="object-cover w-full h-full" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-2.5">
                        <h3 className="text-[11px] font-bold text-white leading-tight truncate">{img.title}</h3>
                        <span className="inline-block mt-1 px-1.5 py-0.5 bg-brand-accent/20 border border-brand-accent/30 text-[7px] font-mono font-bold uppercase rounded text-brand-accent">
                          {img.category}
                        </span>
                      </div>
                      <button
                        onClick={() => setConfirmDelete({ id: img.id, title: img.title })}
                        className="absolute top-2 right-2 w-8 h-8 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-red-400" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Desktop table: only visible on md+ */}
                <div className="hidden md:block p-6 bg-brand-secondary/40 border border-brand-border/80 rounded-[2rem] shadow-xl">
                  <h3 className="text-xs font-black uppercase tracking-widest text-white border-b border-brand-border/40 pb-4 mb-4 font-display">
                    Gallery Archive ({images.length})
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="border-b border-brand-border/60 text-brand-muted uppercase font-mono tracking-wider">
                          <th className="pb-3 p-2 font-bold">Image</th>
                          <th className="pb-3 p-2 font-bold">Title</th>
                          <th className="pb-3 p-2 font-bold">Category</th>
                          <th className="pb-3 p-2 font-bold text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-brand-border/30">
                        {images.map((img) => (
                          <tr key={img.id} className="hover:bg-white/[0.01]">
                            <td className="py-4 p-2">
                              <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0 border border-brand-border bg-brand-primary">
                                <Image src={img.url} alt={img.title} width={56} height={56} className="object-cover w-full h-full" />
                              </div>
                            </td>
                            <td className="py-4 p-2">
                              <div className="font-bold text-white text-sm">{img.title}</div>
                              <div className="text-[10px] font-mono text-brand-muted mt-0.5">ID: {img.id}</div>
                            </td>
                            <td className="py-4 p-2">
                              <span className="px-2 py-0.5 bg-brand-primary border border-brand-border text-[9px] font-mono font-bold uppercase rounded text-brand-accent">
                                {img.category}
                              </span>
                            </td>
                            <td className="py-4 p-2 text-right">
                              <button
                                onClick={() => setConfirmDelete({ id: img.id, title: img.title })}
                                className="p-2 border border-brand-border text-brand-muted hover:text-red-500 hover:border-red-500 rounded-lg transition-colors cursor-pointer shrink-0"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
