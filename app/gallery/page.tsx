'use client'

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Maximize2, X } from 'lucide-react';
import { gallery as galleryApi, loadWithFallback } from '@/lib/api';
import type { GalleryImage } from '@/lib/types';

const galleryImages = [
  { id: 1, url: "https://picsum.photos/seed/mma1/800/1000", title: "WBC Refereeing", category: "Events" },
  { id: 2, url: "https://picsum.photos/seed/mma2/1000/800", title: "Sparring Session", category: "Training" },
  { id: 3, url: "https://picsum.photos/seed/mma3/800/800", title: "Championship Belt", category: "Awards" },
  { id: 4, url: "https://picsum.photos/seed/mma4/1000/1200", title: "Heavy Bag Work", category: "Training" },
  { id: 5, url: "https://picsum.photos/seed/mma5/1200/800", title: "Team Photo", category: "Events" },
  { id: 6, url: "https://picsum.photos/seed/mma6/800/1000", title: "Grappling Drill", category: "Training" },
  { id: 7, url: "https://picsum.photos/seed/mma7/1000/1000", title: "WBC Certification", category: "Awards" },
  { id: 8, url: "https://picsum.photos/seed/mma8/800/1200", title: "Cornering a Fight", category: "Events" },
  { id: 9, url: "https://picsum.photos/seed/mma9/1200/1000", title: "Youth Program", category: "Training" },
];

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = React.useState<null | typeof galleryImages[0]>(null);
  const [filter, setFilter] = React.useState('All');
  const [images, setImages] = React.useState<GalleryImage[]>(galleryImages);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const load = async () => {
      setLoading(true);
      const result = await loadWithFallback(
        () => galleryApi.list(),
        'invictus_gallery',
        galleryImages
      );
      if (Array.isArray(result) && result.length > 0) {
        setImages(result);
      }
      setLoading(false);
    };
    load();
  }, []);

  const categories = ['All', ...Array.from(new Set(images.map(img => img.category)))];
  const filteredImages = filter === 'All' ? images : images.filter(img => img.category === filter);

  return (
    <main className="min-h-screen bg-brand-primary text-white py-12 px-4 sm:py-20 sm:px-8 lg:px-24">
      {/* Header */}
      <div className="container max-w-7xl mx-auto mb-10 sm:mb-16">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-brand-muted hover:text-brand-accent transition-colors mb-6 sm:mb-8 group text-sm font-semibold"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-black tracking-tight mb-4 sm:mb-6 text-white leading-none">
          VISUAL <span className="text-brand-accent italic">JOURNEY</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-brand-muted max-w-2xl leading-relaxed">
          Moments from the ring, training sessions, and international events documenting the evolution of combat sports in Bangladesh.
        </p>
      </div>

      {/* Filter */}
      <div className="container max-w-7xl mx-auto mb-8 sm:mb-12 flex flex-wrap gap-2 sm:gap-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 sm:px-6 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider border transition-all cursor-pointer min-h-[40px] flex items-center justify-center ${
              filter === cat 
                ? 'bg-brand-accent text-black border-brand-accent' 
                : 'bg-transparent text-brand-muted border-brand-border hover:border-brand-accent/50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="container max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <AnimatePresence mode="popLayout">
          {filteredImages.map((image, idx) => (
            <motion.div
              layout
              key={image.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="relative aspect-[4/5] rounded-2xl overflow-hidden group cursor-pointer border border-brand-border"
              onClick={() => setSelectedImage(image)}
            >
              <Image
                src={image.url}
                alt={image.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale hover:grayscale-0"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-brand-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 border border-brand-accent/20">
                <div className="text-white">
                  <p className="text-xs font-bold uppercase tracking-widest text-brand-accent mb-1">{image.category}</p>
                  <p className="text-xl font-display font-bold text-white">{image.title}</p>
                </div>
                <div className="absolute top-6 right-6 p-2 rounded-full bg-black/40 backdrop-blur-sm">
                  <Maximize2 className="w-4 h-4 text-brand-accent" />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-brand-primary/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-12"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-8 right-8 p-3 rounded-full bg-brand-accent text-black z-[110] hover:bg-brand-accent-hover transition-colors shadow-lg shadow-brand-accent/20"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-6 h-6" />
            </button>
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl aspect-[4/3] md:aspect-video rounded-2xl overflow-hidden border border-brand-border shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage.url}
                alt={selectedImage.title}
                fill
                className="object-contain"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
              <p className="text-brand-accent text-sm uppercase tracking-[0.2em] mb-1 font-bold">{selectedImage.category}</p>
              <p className="text-white text-2xl font-display font-bold tracking-tight">{selectedImage.title}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
