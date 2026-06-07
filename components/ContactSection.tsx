'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, Send, CheckCircle2 } from 'lucide-react';
import { MmaCageDecal, MmaGloveGraphic } from './CombatGraphics';

interface ContactSectionProps {
  formData: { name: string; email: string; message: string };
  setFormData: (d: { name: string; email: string; message: string }) => void;
  formErrors: { name?: string; email?: string; message?: string };
  setFormErrors: (e: { name?: string; email?: string; message?: string }) => void;
  isSubmitting: boolean;
  successToast: boolean;
  setSuccessToast: (v: boolean) => void;
  handleContactSubmit: (e: React.FormEvent) => Promise<void>;
}

export default function ContactSection({
  formData,
  setFormData,
  formErrors,
  setFormErrors,
  isSubmitting,
  successToast,
  setSuccessToast,
  handleContactSubmit,
}: ContactSectionProps) {
  return (
    <section id="contact" className="py-10 px-4 sm:px-12 lg:px-24 bg-brand-secondary/10 border-t border-brand-border relative overflow-hidden">
      <div className="absolute top-[30%] left-[10%] w-[450px] h-[450px] bg-brand-accent/5 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-red-600/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <MmaCageDecal className="absolute -left-36 bottom-[-20%] w-[600px] h-[600px] text-brand-accent/15 rotate-[15deg] pointer-events-none select-none" />

      <div className="container max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-brand-accent mb-4 sm:mb-6 font-display">Get Started</h2>
            <h3 className="text-3xl sm:text-5xl md:text-7xl font-display font-black tracking-tighter mb-6 sm:mb-8 text-white uppercase leading-none">
              COMMIT TO <br />
              <span className="text-brand-accent italic">BE FIT.</span>
            </h3>
            <p className="text-base sm:text-lg md:text-xl text-brand-muted max-w-md leading-relaxed mb-8 sm:mb-12">
              Have questions about our classes or looking for private mentorship? Send us a message and start your journey today.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-secondary border border-brand-border flex items-center justify-center text-brand-accent">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-brand-muted">Email Us</div>
                  <div className="text-lg font-bold text-white">coachishtiak@gmail.com</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-secondary border border-brand-border flex items-center justify-center text-brand-accent">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-brand-muted">Call Directly</div>
                  <div className="text-lg font-bold text-white">016-2233-9080</div>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-5 sm:p-8 md:p-12 rounded-[1.5rem] sm:rounded-[2.5rem] bg-brand-secondary border border-brand-border shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
              <Send className="w-32 h-32 text-brand-accent" />
            </div>
            <div className="absolute -right-20 -bottom-20 opacity-[0.14] pointer-events-none">
              <MmaGloveGraphic className="w-80 h-80 text-brand-accent !static" />
            </div>

            <form className="space-y-6 relative z-10" onSubmit={handleContactSubmit}>
              {successToast && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="p-4 bg-brand-accent/10 border border-brand-accent text-brand-accent rounded-2xl text-xs font-black uppercase tracking-wider flex items-center gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-brand-accent shrink-0" />
                  <span>Message sent! We&apos;ll reply within 24 hours.</span>
                </motion.div>
              )}
              <div className="space-y-2">
                <label htmlFor="name" className="text-xs font-black uppercase tracking-widest text-brand-muted ml-1">Full Name</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({...formData, name: e.target.value});
                    if (formErrors.name) setFormErrors({...formErrors, name: undefined});
                  }}
                  placeholder="John Doe"
                  className={`w-full bg-brand-primary border rounded-2xl py-4 px-6 focus:outline-none focus:border-brand-accent transition-colors text-white placeholder:text-white/20 text-base min-h-[44px] ${
                    formErrors.name ? 'border-red-500/60' : 'border-brand-border'
                  }`}
                  required
                  minLength={2}
                />
                {formErrors.name && (
                  <p className="text-red-400 text-xs font-medium mt-1 ml-1">{formErrors.name}</p>
                )}
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-xs font-black uppercase tracking-widest text-brand-muted ml-1">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({...formData, email: e.target.value});
                    if (formErrors.email) setFormErrors({...formErrors, email: undefined});
                  }}
                  placeholder="john@example.com"
                  className={`w-full bg-brand-primary border rounded-2xl py-4 px-6 focus:outline-none focus:border-brand-accent transition-colors text-white placeholder:text-white/20 text-base min-h-[44px] ${
                    formErrors.email ? 'border-red-500/60' : 'border-brand-border'
                  }`}
                  required
                />
                {formErrors.email && (
                  <p className="text-red-400 text-xs font-medium mt-1 ml-1">{formErrors.email}</p>
                )}
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-xs font-black uppercase tracking-widest text-brand-muted ml-1">Your Message</label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => {
                    setFormData({...formData, message: e.target.value});
                    if (formErrors.message) setFormErrors({...formErrors, message: undefined});
                  }}
                  placeholder="I'm interested in the 3-month MMA course..."
                  className={`w-full bg-brand-primary border rounded-2xl py-4 px-6 focus:outline-none focus:border-brand-accent transition-colors text-white placeholder:text-white/20 text-base min-h-[120px] ${
                    formErrors.message ? 'border-red-500/60' : 'brand-border'
                  }`}
                  required
                  minLength={10}
                />
                {formErrors.message && (
                  <p className="text-red-400 text-xs font-medium mt-1 ml-1">{formErrors.message}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-5 bg-brand-accent text-black font-black uppercase tracking-widest text-sm rounded-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-brand-accent/20 flex items-center justify-center gap-3 group cursor-pointer disabled:opacity-60 disabled:hover:scale-100 min-h-[48px]"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
