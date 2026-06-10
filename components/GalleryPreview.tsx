'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { Images } from 'lucide-react';
import { gallery as galleryApi } from '@/lib/api';

export default function GalleryPreview() {
  const [images, setImages] = React.useState<any[]>([]);

  React.useEffect(() => {
    const load = async () => {
      const res = await galleryApi.list();
      if (res.success && res.data && res.data.length > 0) {
        setImages(res.data.filter((i: any) => !i.url.includes('picsum.photos')).slice(0, 4));
      }
    };
    load();
  }, []);

  if (images.length === 0) return null;

  return (
    <section className="py-10 px-4 sm:py-32 sm:px-12 lg:px-24 bg-brand-secondary/30">
      <div className="container max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 gap-6 sm:gap-8">
          <div>
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-display font-black tracking-tight mb-4 sm:mb-6 text-white leading-none">
              MOMENTS <span className="text-brand-accent italic">IN MOTION</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-brand-muted max-w-xl leading-relaxed">
              Take a look at our highlight events, training sessions, and the journey of combat sports in Bangladesh.
            </p>
          </div>
          <Link
            href="/gallery"
            className="inline-flex items-center gap-3 bg-brand-accent text-black px-6 py-3.5 sm:px-8 sm:py-4 rounded-full font-bold hover:bg-brand-accent-hover transition-all group shadow-lg shadow-brand-accent/20 text-sm self-start md:self-auto"
          >
            View Full Gallery
            <Images className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:h-[600px]">
          <motion.div
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            viewport={{ once: true }}
            whileHover={{ scale: 0.98 }}
            className="md:col-span-2 relative h-[250px] md:h-full rounded-2xl sm:rounded-3xl overflow-hidden group border border-brand-border shadow-xl"
          >
            <Image
              src={images[0]?.url || '/images/placeholder.svg'}
              alt={images[0]?.title || 'Gallery'}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
              quality={75}
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/20 via-transparent to-transparent" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4 md:h-full">
            <motion.div
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 0.98 }}
              className="relative h-[180px] sm:h-[220px] md:h-full rounded-2xl sm:rounded-3xl overflow-hidden group border border-brand-border shadow-lg"
            >
              <Image
                src={images[1]?.url || '/images/placeholder.svg'}
                alt={images[1]?.title || 'Gallery'}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
                quality={75}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/20 via-transparent to-transparent" />
            </motion.div>
            <motion.div
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 0.98 }}
              className="relative h-[180px] sm:h-[220px] md:h-full rounded-2xl sm:rounded-3xl overflow-hidden group border border-brand-border shadow-lg"
            >
              <Image
                src={images[2]?.url || '/images/placeholder.svg'}
                alt={images[2]?.title || 'Gallery'}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
                quality={75}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/20 via-transparent to-transparent" />
            </motion.div>
          </div>

          <motion.div
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 0.98 }}
            className="relative h-[250px] sm:h-[350px] md:h-full rounded-2xl sm:rounded-3xl overflow-hidden group border border-brand-border shadow-xl col-span-1 sm:col-span-2 md:col-span-1"
          >
            <Image
              src={images[3]?.url || '/images/placeholder.svg'}
              alt={images[3]?.title || 'Gallery'}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
              quality={75}
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/20 via-transparent to-transparent" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
