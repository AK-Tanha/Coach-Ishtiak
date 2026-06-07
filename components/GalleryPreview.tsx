'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { Images } from 'lucide-react';

export default function GalleryPreview() {
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
              src="/images/placeholder.svg"
              alt="WBC Refereeing"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
              quality={75}
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/95 via-transparent to-transparent p-6 sm:p-8 flex flex-col justify-end">
              <p className="text-[10px] font-bold uppercase tracking-widest text-brand-accent mb-1">International Presence</p>
              <p className="text-xl sm:text-2xl font-bold font-display text-white">WBC Global Refereeing</p>
            </div>
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
                src="/images/placeholder.svg"
                alt="Training Workshop"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
                quality={75}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/95 via-transparent to-transparent p-5 sm:p-6 flex flex-col justify-end">
                <p className="text-lg sm:text-xl font-bold font-display leading-tight text-white">Elite Workshops</p>
              </div>
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
                src="/images/placeholder.svg"
                alt="Championship Night"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
                quality={75}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/95 via-transparent to-transparent p-5 sm:p-6 flex flex-col justify-end">
                <p className="text-lg sm:text-xl font-bold font-display leading-tight text-white">Championship Nights</p>
              </div>
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
              src="/images/placeholder.svg"
              alt="Personal Training"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
              quality={75}
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/95 via-transparent to-transparent p-6 sm:p-8 flex flex-col justify-end">
              <p className="text-xl sm:text-2xl font-bold font-display leading-tight text-white">Private Mentorship</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
