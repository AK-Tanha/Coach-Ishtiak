'use client';

import * as React from 'react';
import { Save, Compass, Users } from 'lucide-react';
import { content as contentApi } from '@/lib/api';
import ImageUploader from '@/components/admin/ImageUploader';
import ConfirmDialog from '@/components/admin/ConfirmDialog';

const defaultHeroSettings = {
  badge: "REGISTRATION OPEN • ELITE DIVISION",
  subheading: "MASTERING THE",
  title: "ART OF COMBAT",
  name: "COACH ISHTIAK",
  description: "A Coach, A Student & An Athlete. Over a decade forging champions in MMA, BJJ, and Boxing. Founder of core combat sport institutions in Bangladesh.",
  images: [
    { url: "/images/placeholder.svg", caption: "First WBC Referee BD", title: "BANGLADESH" },
    { url: "/images/placeholder.svg", caption: "Head Coach", title: "INVICTUS" },
    { url: "/images/placeholder.svg", caption: "Founder", title: "BMMAA" }
  ]
};

const defaultAboutSettings = {
  badge: "PROFILE • LEAD COACH",
  heading: "Philosophy",
  subheading: "Building champions inside and outside the cage.",
  para1: "Recognized as Bangladesh's first WBC-certified boxing referee, my journey has been defined by a relentless pursuit of excellence and the development of combat sports on a national level. As the Founder and General Secretary of the Bangladesh Mixed Martial Arts Association (BMMAA), I have pioneered the first organized MMA events in our nation.",
  para2: "My coaching methodology combines technical precision with mental fortitude. From tactical boxing instructions for the Bangladesh Army to leading high-performance training at Invictus BJJ, I focus on the holistic development of my athletes.",
  image: "/images/placeholder-portrait.svg"
};

export default function ContentPage() {
  const [heroForm, setHeroForm] = React.useState(defaultHeroSettings);
  const [aboutForm, setAboutForm] = React.useState(defaultAboutSettings);
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
        const heroRes = await contentApi.getHero();
        if (heroRes && heroRes.data) {
          setHeroForm(heroRes.data);
          syncToStorage('invictus_hero_settings', heroRes.data);
        } else {
          throw new Error('no hero data');
        }
      } catch {
        const stored = localStorage.getItem('invictus_hero_settings');
        if (stored) {
          setHeroForm(JSON.parse(stored));
        } else {
          syncToStorage('invictus_hero_settings', defaultHeroSettings);
        }
      }

      try {
        const aboutRes = await contentApi.getAbout();
        if (aboutRes && aboutRes.data) {
          setAboutForm(aboutRes.data);
          syncToStorage('invictus_about_settings', aboutRes.data);
        } else {
          throw new Error('no about data');
        }
      } catch {
        const stored = localStorage.getItem('invictus_about_settings');
        if (stored) {
          setAboutForm(JSON.parse(stored));
        } else {
          syncToStorage('invictus_about_settings', defaultAboutSettings);
        }
      }
    };
    load();
  }, []);

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
          <Compass className="w-4 h-4 shrink-0 animate-pulse text-brand-accent" />
          <div className="text-xs font-mono font-bold uppercase tracking-wider">{toast.text}</div>
        </div>
      )}

      <main className="p-4 sm:p-8 max-w-7xl w-full mx-auto">
        <div className="space-y-8 animate-in fade-in duration-300">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-brand-border/40 pb-5">
            <div>
              <h3 className="text-base font-bold uppercase text-white tracking-widest">Homepage Brand Section Content Manager</h3>
              <p className="text-xs text-brand-muted mt-1 font-sans">Make immediate changes to your hero slides and biography philosophy sections.</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6 p-6 bg-brand-secondary/40 border border-brand-border/80 rounded-[2rem] space-y-6 shadow-lg">
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white border-b border-brand-border/40 pb-4 mb-2 flex items-center gap-2 font-display">
                <Compass className="w-4 h-4 text-brand-accent h-fit shrink-0" /> Edit Hero Section Content
              </h4>

              <div className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="text-brand-muted font-bold tracking-wider uppercase text-[10px]">Pill Badge Title</label>
                  <input
                    type="text"
                    value={heroForm.badge}
                    onChange={(e) => setHeroForm({...heroForm, badge: e.target.value})}
                    className="w-full bg-brand-primary border border-brand-border p-3 rounded-xl text-white text-sm focus:border-brand-accent focus:outline-none transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-brand-muted font-bold tracking-wider uppercase text-[10px]">Subheading</label>
                  <input
                    type="text"
                    value={heroForm.subheading}
                    onChange={(e) => setHeroForm({...heroForm, subheading: e.target.value})}
                    className="w-full bg-brand-primary border border-brand-border p-3 rounded-xl text-white text-sm focus:border-brand-accent focus:outline-none transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-brand-muted font-bold tracking-wider uppercase text-[10px]">Main Bold Title</label>
                    <input
                      type="text"
                      value={heroForm.title}
                      onChange={(e) => setHeroForm({...heroForm, title: e.target.value})}
                      className="w-full bg-brand-primary border border-brand-border p-3 rounded-xl text-white text-sm focus:border-brand-accent focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-brand-muted font-bold tracking-wider uppercase text-[10px]">Coach Name Accent Button</label>
                    <input
                      type="text"
                      value={heroForm.name}
                      onChange={(e) => setHeroForm({...heroForm, name: e.target.value})}
                      className="w-full bg-brand-primary border border-brand-border p-3 rounded-xl text-white text-sm focus:border-brand-accent focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-brand-muted font-bold tracking-wider uppercase text-[10px]">Brief Core Description</label>
                  <textarea
                    rows={4}
                    value={heroForm.description}
                    onChange={(e) => setHeroForm({...heroForm, description: e.target.value})}
                    className="w-full bg-brand-primary border border-brand-border p-3 rounded-xl text-white text-sm focus:border-brand-accent focus:outline-none transition-colors font-sans"
                  />
                </div>

                <div className="border-t border-brand-border/40 pt-4 space-y-4">
                  <h5 className="text-[10px] font-bold tracking-widest text-[#BFFF00] uppercase">Slide Show Carousel Images</h5>

                  {heroForm.images.map((img: any, idx: number) => (
                    <div key={idx} className="p-4 bg-brand-primary/50 border border-brand-border/60 rounded-2xl space-y-3">
                      <div className="text-[9px] font-mono font-bold text-brand-muted uppercase">Slide #{idx + 1} Settings</div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-brand-muted uppercase text-[9px]">Title</label>
                          <input
                            type="text"
                            value={img.title}
                            onChange={(e) => {
                              const updatedImages = [...heroForm.images];
                              updatedImages[idx] = { ...updatedImages[idx], title: e.target.value };
                              setHeroForm({ ...heroForm, images: updatedImages });
                            }}
                            className="w-full bg-brand-primary border border-brand-border p-2 rounded-lg text-white text-xs focus:border-brand-accent focus:outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-brand-muted uppercase text-[9px]">Caption</label>
                          <input
                            type="text"
                            value={img.caption}
                            onChange={(e) => {
                              const updatedImages = [...heroForm.images];
                              updatedImages[idx] = { ...updatedImages[idx], caption: e.target.value };
                              setHeroForm({ ...heroForm, images: updatedImages });
                            }}
                            className="w-full bg-brand-primary border border-brand-border p-2 rounded-lg text-white text-xs focus:border-brand-accent focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-brand-muted uppercase text-[9px]">Image URL</label>
                        <input
                          type="text"
                          value={img.url}
                          onChange={(e) => {
                            const updatedImages = [...heroForm.images];
                            updatedImages[idx] = { ...updatedImages[idx], url: e.target.value };
                            setHeroForm({ ...heroForm, images: updatedImages });
                          }}
                          className="w-full bg-brand-primary border border-brand-border p-2 rounded-lg text-white text-xs focus:border-brand-accent focus:outline-none"
                        />
                      </div>

                      <ImageUploader
                        id={`hero-slide-uploader-${idx}`}
                        value={img.url}
                        onChange={(val) => {
                          const updatedImages = [...heroForm.images];
                          updatedImages[idx] = { ...updatedImages[idx], url: val };
                          setHeroForm({ ...heroForm, images: updatedImages });
                        }}
                      />
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={async () => {
                    syncToStorage('invictus_hero_settings', heroForm);
                    const heroResult = await contentApi.updateHero(heroForm);
                    if (!heroResult.success) {
                      triggerNotification('Failed to sync hero to server: ' + (heroResult.error || 'error'), 'error');
                    } else {
                      triggerNotification('Hero content segment has been pushed to live production portal!');
                    }
                  }}
                  className="w-full py-4 bg-brand-accent text-black font-black uppercase tracking-wider text-xs rounded-xl hover:bg-brand-accent-hover transition-colors min-h-[44px] cursor-pointer shadow-lg shadow-brand-accent/15 flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4 text-black" /> Save Hero Section
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 p-6 bg-brand-secondary/40 border border-brand-border/80 rounded-[2rem] space-y-6 shadow-lg">
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white border-b border-brand-border/40 pb-4 mb-2 flex items-center gap-2 font-display">
                <Users className="w-4 h-4 text-brand-accent h-fit shrink-0" /> Edit About Ishtiak Section Content
              </h4>

              <div className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="text-brand-muted font-bold tracking-wider uppercase text-[10px]">Small Prefix Badge Title</label>
                  <input
                    type="text"
                    value={aboutForm.badge}
                    onChange={(e) => setAboutForm({...aboutForm, badge: e.target.value})}
                    className="w-full bg-brand-primary border border-brand-border p-3 rounded-xl text-white text-sm focus:border-brand-accent focus:outline-none transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-brand-muted font-bold tracking-wider uppercase text-[10px]">Section Category Heading</label>
                    <input
                      type="text"
                      value={aboutForm.heading}
                      onChange={(e) => setAboutForm({...aboutForm, heading: e.target.value})}
                      className="w-full bg-brand-primary border border-brand-border p-3 rounded-xl text-white text-sm focus:border-brand-accent focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-brand-muted font-bold tracking-wider uppercase text-[10px]">Main Biography Headline</label>
                    <input
                      type="text"
                      value={aboutForm.subheading}
                      onChange={(e) => setAboutForm({...aboutForm, subheading: e.target.value})}
                      className="w-full bg-brand-primary border border-brand-border p-3 rounded-xl text-white text-sm focus:border-brand-accent focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-brand-muted font-bold tracking-wider uppercase text-[10px]">Primary Biography Paragraph (Para 1)</label>
                  <textarea
                    rows={4}
                    value={aboutForm.para1}
                    onChange={(e) => setAboutForm({...aboutForm, para1: e.target.value})}
                    className="w-full bg-brand-primary border border-brand-border p-3 rounded-xl text-white text-sm focus:border-brand-accent focus:outline-none transition-colors font-sans"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-brand-muted font-bold tracking-wider uppercase text-[10px]">Secondary Philosophy Paragraph (Para 2)</label>
                  <textarea
                    rows={4}
                    value={aboutForm.para2}
                    onChange={(e) => setAboutForm({...aboutForm, para2: e.target.value})}
                    className="w-full bg-brand-primary border border-brand-border p-3 rounded-xl text-white text-sm focus:border-brand-accent focus:outline-none transition-colors font-sans"
                  />
                </div>

                <div className="space-y-1.5 pt-2">
                  <label className="text-brand-muted font-bold tracking-wider uppercase text-[10px]">Coach Action Image (Paste URL or Upload)</label>
                  <input
                    type="text"
                    value={aboutForm.image}
                    onChange={(e) => setAboutForm({...aboutForm, image: e.target.value})}
                    className="w-full bg-brand-primary border border-brand-border p-3 rounded-xl text-white text-sm focus:border-brand-accent focus:outline-none transition-colors mb-2"
                    placeholder="https://..."
                  />

                  <ImageUploader
                    id="about-bio-uploader"
                    value={aboutForm.image}
                    onChange={(val) => setAboutForm({...aboutForm, image: val})}
                  />
                </div>

                <button
                  type="button"
                  onClick={async () => {
                    syncToStorage('invictus_about_settings', aboutForm);
                    const aboutResult = await contentApi.updateAbout(aboutForm);
                    if (!aboutResult.success) {
                      triggerNotification('Failed to sync about to server: ' + (aboutResult.error || 'error'), 'error');
                    } else {
                      triggerNotification('About Coach biography segment successfully updated!');
                    }
                  }}
                  className="w-full py-4 bg-brand-accent text-black font-black uppercase tracking-wider text-xs rounded-xl hover:bg-brand-accent-hover transition-colors min-h-[44px] cursor-pointer shadow-lg shadow-brand-accent/15 flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4 text-black" /> Save Biography Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {confirmDelete && (
        <ConfirmDialog
          title="Confirm"
          message="Are you sure?"
          onConfirm={() => setConfirmDelete(null)}
          onCancel={() => setConfirmDelete(null)}
        />
      )}
    </div>
  );
}
