'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { 
  Trophy, 
  MapPin, 
  Mail, 
  Phone, 
  Instagram, 
  ChevronRight, 
  ChevronLeft,
  Award, 
  Shield, 
  Sword, 
  Users, 
  Star,
  ExternalLink,
  Clock,
  Calendar,
  Zap,
  CheckCircle2,
  Images,
  ShoppingBag,
  Send,
  Menu,
  X,
  Facebook,
  Linkedin
} from 'lucide-react';
import { AnimatePresence } from 'motion/react';
import { 
  MmaCageDecal, 
  BoxingRingDecal, 
  BoxingGloveGraphic, 
  MmaGloveGraphic 
} from '../components/CombatGraphics';

const heroImages = [
  {
    url: "https://picsum.photos/seed/coach-ishtiaq/1000/1000",
    caption: "First WBC Referee BD",
    title: "BANGLADESH"
  },
  {
    url: "https://picsum.photos/seed/mma-training-1/1000/1000",
    caption: "Head Coach",
    title: "INVITCTUS"
  },
  {
    url: "https://picsum.photos/seed/boxing-match-1/1000/1000",
    caption: "Founder",
    title: "BMMAA"
  }
];

const schedule = [
  { 
    day: "Saturday", 
    classes: [
      { time: "4:30 - 5:30 PM", activity: "Personal Training (PT)" }
    ]
  },
  { 
    day: "Sunday", 
    classes: [
      { time: "4:00 - 5:00 PM", activity: "Muay Thai" },
      { time: "5:30 - 7:00 PM", activity: "MMA" },
      { time: "7:30 - 8:30 PM", activity: "Boxing" }
    ]
  },
  { 
    day: "Tuesday", 
    classes: [
      { time: "3:00 - 4:30 PM", activity: "Afternoon Class (AFT)" },
      { time: "5:30 - 7:00 PM", activity: "MMA" },
      { time: "7:30 - 8:30 PM", activity: "Boxing" }
    ]
  },
  { 
    day: "Wednesday", 
    classes: [
      { time: "4:00 - 5:15 PM", activity: "Personal Training (PT)" }
    ]
  },
  { 
    day: "Thursday", 
    classes: [
      { time: "4:00 - 5:00 PM", activity: "Muay Thai" },
      { time: "5:30 - 7:00 PM", activity: "MMA" }
    ]
  }
];

const pricing = [
  {
    title: "Monthly Plan",
    price: "3,000/-",
    features: ["No Admission Fee", "All Standard Classes", "Access to MMA & Boxing"],
    highlight: false
  },
  {
    title: "3 Months Course",
    price: "8,000/-",
    originalPrice: "9,000/-",
    features: ["Muay Thai & Boxing Focus", "Intensive Training Course", "Special Discounted Rate"],
    highlight: true,
    badge: "Most Popular"
  }
];

const achievements = [
  {
    title: "BJJ Blue Belt",
    description: "Awarded by Chad Reiner, UFC & Bellator veteran",
    year: "2024",
    icon: Shield
  },
  {
    title: "National Jiu-Jitsu Coach & Referee",
    description: "Received from Bangladesh Jiu Jitsu Association",
    year: "2021",
    icon: Award
  },
  {
    title: "Boxing Coach Award",
    description: "Honored by Box Boxing Promotion, Kolkata, India",
    year: "2022",
    icon: Trophy
  },
  {
    title: "Bronze Medalist",
    description: "India Open International BJJ Championship",
    year: "2022",
    icon: Star
  }
];

const experience = [
  {
    role: "Owner / Head Coach",
    company: "Xtreme MMA",
    period: "2014 - Present",
    description: "Driving elite combat sports training and organizational growth since inception."
  },
  {
    role: "Owner / Head Coach",
    company: "Invictus BJJ & MMA",
    period: "2018 - Present",
    description: "Leading a premier academy for Brazilian Jiu-Jitsu and Mixed Martial Arts in Bangladesh."
  },
  {
    role: "Boxing Coach",
    company: "Bangladesh Army",
    period: "February 1, 2021 - Present",
    description: "Providing tactical boxing instructions and training for military personnel."
  },
  {
    role: "Professional Boxing Referee",
    company: "World Boxing Council (WBC)",
    period: "September 8, 2022 - Present",
    description: "WBC Ring Official Panel registered and certified as an Official Referee Level 1."
  },
  {
    role: "Official / Assistant Coach",
    company: "Bangladesh Amateur Boxing Federation",
    period: "2018 - 2025",
    description: "Former Assistant Coach (March 2018) and continues contributing to national boxing development."
  },
  {
    role: "Fighter Manager",
    company: "One Warrior Series",
    period: "2018",
    description: "Managed professional fighters in Singapore for the One Warrior Series."
  },
  {
    role: "Fighter Manager",
    company: "ONE Championship",
    period: "2017",
    description: "Managed professional athletes for ONE Championship in Bangkok, Thailand."
  },
  {
    role: "Second (Cornerman)",
    company: "ONE Championship",
    period: "2016",
    description: "Served as a professional seconds/cornerman in Myanmar events."
  }
];

const skills = [
  { name: "Boxing", level: 95 },
  { name: "Brazilian Jiu Jitsu", level: 90 },
  { name: "Wrestling", level: 85 },
  { name: "Personal Program", level: 95 },
  { name: "Leadership", level: 95 }
];

export default function PortfolioPage() {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);

  return (
    <main className="min-h-screen bg-brand-primary text-white overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-brand-border/50 bg-brand-primary/80 backdrop-blur-md px-4 sm:px-6">
        <div className="container max-w-7xl mx-auto h-16 sm:h-20 flex items-center justify-between gap-4">
          <Link href="/" className="font-display font-bold text-base sm:text-xl tracking-tighter shrink-0 hover:text-brand-accent transition-colors">
            COACH <span className="text-brand-muted">ISHTIAK</span>
          </Link>
          <div className="hidden lg:flex gap-6 xl:gap-8 text-xs sm:text-sm font-medium text-brand-muted">
            <a href="#about" className="hover:text-brand-accent transition-colors">About</a>
            <a href="#schedule" className="hover:text-brand-accent transition-colors">Schedule</a>
            <Link href="/gallery" className="hover:text-brand-accent transition-colors">Gallery</Link>
            <Link href="/shop" className="hover:text-brand-accent transition-colors flex items-center gap-1.5">
              Shop
              <span className="text-[8px] bg-brand-accent text-black px-1.5 py-0.5 rounded-full font-black">NEW</span>
            </Link>
            <a href="#contact" className="hover:text-brand-accent transition-colors">Contact</a>
            <a href="#pricing" className="hover:text-brand-accent transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Direct Shop/Gallery Links on mobile navbar */}
            <Link href="/shop" className="hidden sm:inline-block lg:hidden text-xs font-bold text-brand-accent border border-brand-accent/30 bg-brand-secondary/50 px-2.5 py-1.5 rounded-full hover:bg-brand-accent hover:text-black transition-colors">
              Shop
            </Link>
            <a 
              href="mailto:coachishtiak@gmail.com"
              className="px-3.5 py-1.5 sm:px-5 sm:py-2 bg-brand-accent text-black text-[10px] sm:text-sm font-black rounded-full hover:bg-brand-accent-hover transition-colors shadow-lg shadow-brand-accent/20 uppercase"
            >
              Contact
            </a>

            {/* Hamburger Button */}
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 text-brand-muted hover:text-brand-accent transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center border border-brand-border/30 rounded-full bg-brand-secondary/50"
              aria-label="Toggle Menu"
            >
              {menuOpen ? <X className="w-5 h-5 text-brand-accent animate-in spin-in-90 duration-250" /> : <Menu className="w-5 h-5 text-white animate-in spin-in-180 duration-250" />}
            </button>
          </div>
        </div>

        {/* Mobile slide-down navigation menu options */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="lg:hidden overflow-hidden border-t border-brand-border/50 bg-brand-primary/95 backdrop-blur-md"
            >
              <div className="px-4 py-6 space-y-4 flex flex-col font-display font-bold uppercase tracking-widest text-xs">
                <a 
                  href="#about" 
                  onClick={() => setMenuOpen(false)}
                  className="py-2.5 border-b border-brand-border/30 text-white hover:text-brand-accent transition-colors flex items-center justify-between"
                >
                  <span>About Coach</span>
                  <ChevronRight className="w-4 h-4 text-brand-accent/60" />
                </a>
                <a 
                  href="#schedule" 
                  onClick={() => setMenuOpen(false)}
                  className="py-2.5 border-b border-brand-border/30 text-white hover:text-brand-accent transition-colors flex items-center justify-between"
                >
                  <span>Class Schedule</span>
                  <ChevronRight className="w-4 h-4 text-brand-accent/60" />
                </a>
                <Link 
                  href="/gallery" 
                  onClick={() => setMenuOpen(false)}
                  className="py-2.5 border-b border-brand-border/30 text-white hover:text-brand-accent transition-colors flex items-center justify-between"
                >
                  <span>Gallery</span>
                  <ChevronRight className="w-4 h-4 text-brand-accent/60" />
                </Link>
                <Link 
                  href="/shop" 
                  onClick={() => setMenuOpen(false)}
                  className="py-2.5 border-b border-brand-border/30 text-white hover:text-brand-accent transition-colors flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    Shop
                    <span className="text-[8px] bg-brand-accent text-black px-1.5 py-0.5 rounded-full font-black tracking-normal uppercase">NEW</span>
                  </span>
                  <ChevronRight className="w-4 h-4 text-brand-accent/60" />
                </Link>
                <a 
                  href="#pricing" 
                  onClick={() => setMenuOpen(false)}
                  className="py-2.5 border-b border-brand-border/30 text-white hover:text-brand-accent transition-colors flex items-center justify-between"
                >
                  <span>Pricing plans</span>
                  <ChevronRight className="w-4 h-4 text-brand-accent/60" />
                </a>
                <a 
                  href="#contact" 
                  onClick={() => setMenuOpen(false)}
                  className="py-2.5 text-white hover:text-brand-accent transition-colors flex items-center justify-between"
                >
                  <span>Get In Touch</span>
                  <ChevronRight className="w-4 h-4 text-brand-accent/60" />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-28 pb-12 sm:pt-44 sm:pb-20 px-4 sm:px-6 overflow-hidden border-b-2 border-brand-border bg-black">
        {/* Ambient Dark-Glow Cyberpunk Gradients */}
        <div className="absolute top-1/4 left-[-10%] w-[500px] h-[500px] rounded-full bg-brand-accent/15 blur-[120px] pointer-events-none -z-20 animate-pulse duration-[8s]" />
        <div className="absolute bottom-10 right-[-10%] w-[600px] h-[600px] rounded-full bg-brand-accent/10 blur-[150px] pointer-events-none -z-20" />
        <div className="absolute top-10 right-1/4 w-[300px] h-[300px] rounded-full bg-red-600/5 blur-[100px] pointer-events-none -z-20" />

        {/* Industrial Diagonal Caution Stripe Accents */}
        <div className="absolute top-0 left-0 w-full h-[6px] bg-[repeating-linear-gradient(45deg,#FCFF00_0,#FCFF00_15px,#000000_15px,#000000_30px)] opacity-100 pointer-events-none -z-10" />
        <div className="absolute -top-6 -right-6 w-32 h-32 bg-[repeating-linear-gradient(-45deg,#FCFF00_0,#FCFF00_8px,transparent_8px,transparent_16px)] opacity-[0.07] pointer-events-none rotate-12 -z-10" />
        <div className="absolute bottom-4 left-4 w-48 h-12 bg-[repeating-linear-gradient(45deg,#FCFF00_0,#FCFF00_6px,transparent_6px,transparent_12px)] opacity-[0.05] pointer-events-none -z-10" />

        {/* Massive Outline Brutalist Backdrop Text */}
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-[14vw] font-display font-black leading-none text-transparent select-none pointer-events-none -z-10 tracking-widest uppercase opacity-[0.04] whitespace-nowrap" style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.8)' }}>
          INVICTUS
        </div>
        <div className="absolute bottom-[-10%] left-[10%] text-[8vw] font-display font-black leading-none text-transparent select-none pointer-events-none -z-10 tracking-wider uppercase opacity-[0.02] whitespace-nowrap" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.6)' }}>
          FIGHT LAB
        </div>

        {/* Brutalist Grid Pattern Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#2a2a2a_1px,transparent_1px),linear-gradient(to_bottom,#2a2a2a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_65%_50%_at_50%_40%,#000_80%,transparent_100%)] opacity-35 pointer-events-none -z-10" />
        
        {/* Decorative Technical Crosshairs / Coordinates / Corner Decals */}
        <div className="absolute top-28 left-8 text-[9px] font-mono text-brand-muted uppercase tracking-widest hidden xl:block select-none">
          [ SYS_ACTIVE: COORD_23.7509.DHAKA ]
        </div>
        <div className="absolute top-28 right-8 text-[9px] font-mono text-brand-muted uppercase tracking-widest hidden xl:block select-none flex items-center gap-2">
          <span>[ PANEL_OFFICIAL_WBC_REFS_LEVEL_1 ]</span>
          <span className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-ping" />
        </div>

        {/* Tech Corner brackets */}
        <div className="absolute top-24 left-6 w-3 h-3 border-t-2 border-l-2 border-brand-border hidden lg:block" />
        <div className="absolute top-24 right-6 w-3 h-3 border-t-2 border-r-2 border-brand-border hidden lg:block" />
        <div className="absolute bottom-6 left-6 w-3 h-3 border-b-2 border-l-2 border-brand-border hidden lg:block" />
        <div className="absolute bottom-6 right-6 w-3 h-3 border-b-2 border-r-2 border-brand-border hidden lg:block" />

        <div className="container max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Brutalist Stamp badge */}
              <div className="hidden sm:inline-flex items-center gap-3 px-4 py-2 bg-brand-secondary border-2 border-brand-accent text-[11px] font-mono font-black tracking-widest text-brand-accent mb-8 uppercase transform hover:-translate-y-0.5 transition-transform">
                <span className="w-2.5 h-2.5 bg-brand-accent animate-[ping_1.5s_infinite] shrink-0" />
                [ REGISTRATION OPEN // ELITE DIVISION ]
              </div>

              <h1 className="font-display mb-6 sm:mb-8">
                <span className="block text-xs sm:text-sm font-mono font-black tracking-[0.25em] text-brand-muted uppercase mb-2">
                  MASTERING THE
                </span>
                <span className="block text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tighter uppercase leading-[0.95] mb-4">
                  ART OF COMBAT
                </span>
                <span className="block mt-5 sm:mt-7 text-[10px] sm:text-xs font-mono font-bold text-brand-muted uppercase tracking-widest leading-none mb-2">
                  {"// WITH"}
                </span>
                <span className="relative inline-block text-black bg-brand-accent px-4 py-2 sm:px-6 sm:py-3.5 transform -skew-x-6 hover:-translate-x-1 hover:-translate-y-1 transition-transform duration-200 cursor-default select-none shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] sm:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] text-3xl sm:text-5xl md:text-7xl font-display font-black leading-none uppercase">
                  COACH ISHTIAK
                </span>
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-brand-muted max-w-xl mb-8 sm:mb-12 leading-relaxed font-sans border-l-4 border-brand-border pl-4">
                A Coach, A Student & An Athlete. <br />
                Over a decade forging champions in MMA, BJJ, and Boxing. Founder of core combat sport institutions in Bangladesh.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-8 sm:mb-12">
                <a 
                  href="#contact" 
                  className="px-6 py-4 sm:px-8 sm:py-5 bg-brand-accent text-black font-black uppercase tracking-wider text-xs sm:text-sm border-2 border-black font-mono transition-all duration-150 shadow-[4px_4px_0px_0px_#FFFFFF] sm:shadow-[6px_6px_0px_0px_#FFFFFF] relative hover:-translate-x-[3px] hover:-translate-y-[3px] flex items-center justify-center gap-3 group text-center min-h-[48px]"
                >
                  Join Training
                  <Zap className="w-4 h-4 fill-black group-hover:scale-110 transition-transform" />
                </a>
                <a 
                  href="#schedule" 
                  className="px-6 py-4 sm:px-8 sm:py-5 bg-brand-primary text-white font-black uppercase tracking-wider text-xs sm:text-sm border-2 border-brand-border font-mono transition-all duration-150 shadow-[4px_4px_0px_0px_#27272a] sm:shadow-[6px_6px_0px_0px_#27272a] relative hover:-translate-x-[3px] hover:-translate-y-[3px] flex items-center justify-center gap-3 text-center min-h-[48px]"
                >
                  View Schedule
                </a>
              </div>

              <div className="hidden sm:grid grid-cols-2 max-w-md border-2 border-brand-border bg-brand-secondary divide-x-2 divide-brand-border">
                <div className="p-3 sm:p-4 flex flex-col justify-between hover:bg-brand-border/20 transition-colors">
                  <div className="text-[8px] sm:text-[9px] font-mono text-brand-muted tracking-widest font-black uppercase mb-1 sm:mb-2">[ LOCATION ]</div>
                  <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-bold text-white">
                    <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-accent shrink-0" />
                    <span>KALABAGAN, DHAKA</span>
                  </div>
                </div>
                <div className="p-3 sm:p-4 flex flex-col justify-between hover:bg-brand-border/20 transition-colors">
                  <div className="text-[8px] sm:text-[9px] font-mono text-brand-muted tracking-widest font-black uppercase mb-1 sm:mb-2">[ HEADQUARTERS ]</div>
                  <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-bold text-white">
                    <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-accent shrink-0" />
                    <span>INVICTUS BJJ & MMA</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative aspect-square rounded-none bg-brand-secondary border-4 border-white group select-none shadow-[8px_8px_0px_0px_#FCFF00] md:shadow-[12px_12px_0px_0px_#FCFF00] w-full max-w-md lg:max-w-none mx-auto"
            >
              {/* Mechanical / Tactical Frame Overlays */}
              <div className="absolute top-4 left-4 z-40 bg-black/80 px-3 py-1 text-[8px] font-mono text-brand-accent tracking-widest uppercase border border-brand-accent select-none">
                [ CAMERA FEED // {`0${currentSlide + 1}_REF`} ]
              </div>
              
              <div className="absolute top-4 right-4 z-40 bg-black/80 px-3 py-1 text-[8px] font-mono text-brand-accent tracking-widest uppercase border border-brand-accent select-none flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse" />
                REC_LIVE
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, filter: "brightness(0%) contrast(150%)" }}
                  animate={{ opacity: 1, filter: "brightness(65%) contrast(110%)" }}
                  exit={{ opacity: 0, filter: "brightness(0%) contrast(150%)" }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
                  <Image 
                    src={heroImages[currentSlide].url} 
                    alt={heroImages[currentSlide].caption} 
                    fill
                    className="w-full h-full object-cover grayscale transition-transform duration-700"
                    priority
                  />
                  <div className="absolute bottom-8 left-8 z-20">
                    <div className="text-[10px] font-mono font-black uppercase tracking-widest text-[#FCFF00] mb-2">[ {heroImages[currentSlide].caption} ]</div>
                    <div className="text-4xl font-display font-black tracking-tighter text-white uppercase">{heroImages[currentSlide].title}</div>
                  </div>
                </motion.div>
              </AnimatePresence>
 
              {/* Navigation Controls */}
              <div className="absolute bottom-6 right-6 z-30 flex">
                <button 
                  onClick={prevSlide}
                  className="p-4 bg-brand-primary border-2 border-brand-border text-white hover:bg-[#FCFF00] hover:text-black transition-all hover:-translate-y-1 cursor-pointer"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button 
                  onClick={nextSlide}
                  className="p-4 bg-brand-primary border-y-2 border-r-2 border-brand-border text-white hover:bg-[#FCFF00] hover:text-black transition-all hover:-translate-y-1 cursor-pointer"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
 
              {/* Progress Indicators */}
              <div className="absolute bottom-6 left-6 z-30 flex gap-1.5">
                {heroImages.map((_, idx) => (
                  <div 
                    key={idx}
                    className={`h-1.5 transition-all duration-500 rounded-none ${idx === currentSlide ? 'w-8 bg-brand-accent' : 'w-2 bg-white/20'}`}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats/Highlight Section */}
      <section className="py-8 sm:py-16 border-y border-brand-border bg-black/40 relative overflow-hidden">
        {/* Decorative background grid effect */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-20" />
        
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="group relative p-5 sm:p-8 bg-brand-secondary/40 border border-brand-border/60 hover:border-brand-accent/50 transition-all duration-300 flex flex-col justify-center items-center text-center overflow-hidden shadow-[4px_4px_0px_0px_#111111] hover:shadow-[4px_4px_0px_0px_rgba(252,255,0,0.15)] hover:-translate-y-0.5 min-h-[120px] sm:min-h-[160px]">
              {/* Tactical Corner brackets */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-brand-border/40 group-hover:border-brand-accent/60 transition-colors" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-brand-border/40 group-hover:border-brand-accent/60 transition-colors" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-brand-border/40 group-hover:border-brand-accent/60 transition-colors" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-brand-border/40 group-hover:border-brand-accent/60 transition-colors" />
              
              <div className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-brand-accent tracking-tighter mb-2 leading-none">10+</div>
              <div className="text-[10px] sm:text-xs uppercase font-extrabold text-brand-muted tracking-widest leading-tight">Years Experience</div>
            </div>

            <div className="group relative p-5 sm:p-8 bg-brand-secondary/40 border border-brand-border/60 hover:border-brand-accent/50 transition-all duration-300 flex flex-col justify-center items-center text-center overflow-hidden shadow-[4px_4px_0px_0px_#111111] hover:shadow-[4px_4px_0px_0px_rgba(252,255,0,0.15)] hover:-translate-y-0.5 min-h-[120px] sm:min-h-[160px]">
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-brand-border/40 group-hover:border-brand-accent/60 transition-colors" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-brand-border/40 group-hover:border-brand-accent/60 transition-colors" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-brand-border/40 group-hover:border-brand-accent/60 transition-colors" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-brand-border/40 group-hover:border-brand-accent/60 transition-colors" />
              
              <div className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-brand-accent tracking-tighter mb-2 leading-none">500+</div>
              <div className="text-[10px] sm:text-xs uppercase font-extrabold text-brand-muted tracking-widest leading-tight">Total Students</div>
            </div>

            <div className="group relative p-5 sm:p-8 bg-brand-secondary/40 border border-brand-border/60 hover:border-brand-accent/50 transition-all duration-300 flex flex-col justify-center items-center text-center overflow-hidden shadow-[4px_4px_0px_0px_#111111] hover:shadow-[4px_4px_0px_0px_rgba(252,255,0,0.15)] hover:-translate-y-0.5 min-h-[120px] sm:min-h-[160px]">
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-brand-border/40 group-hover:border-brand-accent/60 transition-colors" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-brand-border/40 group-hover:border-brand-accent/60 transition-colors" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-brand-border/40 group-hover:border-brand-accent/60 transition-colors" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-brand-border/40 group-hover:border-brand-accent/60 transition-colors" />
              
              <div className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-brand-accent tracking-tighter mb-2 leading-none">1st</div>
              <div className="text-[10px] sm:text-xs uppercase font-extrabold text-brand-muted tracking-widest leading-tight">WBC Referee BD</div>
            </div>

            <div className="group relative p-5 sm:p-8 bg-brand-secondary/40 border border-brand-border/60 hover:border-brand-accent/50 transition-all duration-300 flex flex-col justify-center items-center text-center overflow-hidden shadow-[4px_4px_0px_0px_#111111] hover:shadow-[4px_4px_0px_0px_rgba(252,255,0,0.15)] hover:-translate-y-0.5 min-h-[120px] sm:min-h-[160px]">
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-brand-border/40 group-hover:border-brand-accent/60 transition-colors" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-brand-border/40 group-hover:border-brand-accent/60 transition-colors" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-brand-border/40 group-hover:border-brand-accent/60 transition-colors" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-brand-border/40 group-hover:border-brand-accent/60 transition-colors" />
              
              <div className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-brand-accent tracking-tighter mb-2 leading-none uppercase">Founder</div>
              <div className="text-[10px] sm:text-xs uppercase font-extrabold text-brand-muted tracking-widest leading-tight">BMMAA Bangladesh</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 sm:py-24 px-4 sm:px-6 overflow-hidden bg-brand-primary relative">
        {/* Subtle Background Glow Spot */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[350px] h-[350px] bg-brand-accent/5 rounded-full blur-[80px] pointer-events-none -z-10" />
        
        {/* MMA Cage Wireframe Background Decal */}
        <MmaCageDecal className="absolute -right-28 -top-28 w-[500px] h-[500px] text-brand-accent/25 rotate-12 pointer-events-none select-none" />
        <MmaCageDecal className="absolute -left-36 -bottom-36 w-[600px] h-[600px] text-brand-muted/20 -rotate-12 pointer-events-none select-none" />

        <div className="container max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
            <div className="lg:col-span-5">
              <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-brand-accent mb-4 sm:mb-6 font-display">Philosophy</h2>
              <h3 className="text-2xl sm:text-4xl md:text-5xl font-display font-black leading-tight tracking-tighter mb-6 sm:mb-8 text-white">
                Building champions inside and outside the cage.
              </h3>
            </div>
            <div className="lg:col-span-7">
              <div className="space-y-6 sm:space-y-8 text-brand-muted text-sm sm:text-base md:text-lg leading-relaxed">
                <p>
                  Recognized as Bangladesh&apos;s first WBC-certified boxing referee, my journey has been defined by a relentless 
                  pursuit of excellence and the development of combat sports on a national level. 
                  As the Founder and General Secretary of the <span className="text-brand-accent font-medium">Bangladesh Mixed Martial Arts Association (BMMAA)</span>, 
                  I have pioneered the first organized MMA events in our nation.
                </p>
                <p>
                  My coaching methodology combines technical precision with mental fortitude. From tactical boxing instructions 
                  for the Bangladesh Army to leading high-performance training at Invictus BJJ, I focus on the holistic 
                  development of my athletes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Grid */}
      <section id="achievements" className="py-12 sm:py-24 px-4 sm:px-6 bg-brand-secondary/50 relative overflow-hidden border-t border-b border-brand-border/30">
        {/* Deep Yellow Glow Background Gradient */}
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-brand-accent/5 rounded-full blur-[100px] pointer-events-none -z-10" />

        {/* Technical Glove Decals to anchor the layout */}
        <BoxingGloveGraphic className="absolute -left-16 -bottom-16 w-80 h-80 text-brand-accent/25 rotate-12 pointer-events-none select-none" />
        <MmaGloveGraphic className="absolute -right-20 -top-20 w-80 h-80 text-brand-muted/20 -rotate-12 pointer-events-none select-none" />

        <div className="container max-w-7xl mx-auto text-center mb-10 sm:mb-16 relative z-10">
          <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-brand-accent mb-4 sm:mb-6 font-display">Recognition</h2>
          <h3 className="text-3xl sm:text-5xl font-display font-black tracking-tighter uppercase text-white">Key Achievements</h3>
        </div>
        <div className="container max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {achievements.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <motion.div 
                key={idx}
                whileHover={{ y: -10, scale: 1.02 }}
                className="p-8 rounded-[1.5rem] bg-brand-secondary border-2 border-brand-border hover:border-brand-accent transition-all duration-300 group shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] hover:shadow-[6px_6px_0px_0px_#FCFF00] cursor-default"
              >
                <div className="mb-6 inline-block p-3 rounded-xl bg-brand-primary border border-brand-border text-brand-accent group-hover:scale-110 group-hover:bg-brand-accent group-hover:text-black transition-all duration-300">
                  <IconComponent className="w-6 h-6 transition-colors duration-300" />
                </div>
                <div className="text-2xl font-display font-bold mb-2 leading-tight text-white group-hover:text-brand-accent transition-colors duration-300">{item.title}</div>
                <p className="text-brand-muted text-sm mb-4 leading-relaxed">{item.description}</p>
                <div className="text-xs font-black tracking-widest text-brand-accent/80 uppercase italic">Year: {item.year}</div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Class Schedule Section */}
      <section id="schedule" className="py-12 sm:py-24 px-4 sm:px-6 border-y border-brand-border bg-brand-primary relative overflow-hidden">
        {/* Subtle Backdrop Gradients */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[120px] pointer-events-none -z-10" />
        
        {/* Boxing Ring Rope Decal stretching behind schedule */}
        <BoxingRingDecal className="absolute left-1/2 -translate-x-1/2 top-[15%] w-full max-w-6xl text-brand-accent/20 pointer-events-none select-none" />

        <div className="container max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 sm:gap-8 mb-8 sm:mb-16">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-brand-accent mb-3 sm:mb-4 font-display">Training Hours</h2>
              <h3 className="text-3xl sm:text-5xl font-display font-black tracking-tighter text-white uppercase leading-none">WEEKLY CLASS SCHEDULE</h3>
            </div>
            <div className="p-4 rounded-xl bg-brand-secondary border border-brand-accent/30 flex items-center gap-4">
              <div className="p-2 rounded-full bg-brand-accent text-black">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-brand-muted">Status</div>
                <div className="text-sm font-black text-white">ENROLLMENT OPEN</div>
              </div>
            </div>
          </div>
 
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {schedule.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 rounded-3xl bg-brand-secondary/95 backdrop-blur-sm border border-brand-border hover:border-brand-accent transition-colors"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-brand-accent" />
                  </div>
                  <h4 className="text-xl font-display font-black tracking-tight text-white">{item.day}</h4>
                </div>
                <div className="space-y-4">
                  {item.classes.map((cls, cIdx) => (
                    <div key={cIdx} className="group cursor-default">
                      <div className="text-xs font-mono text-brand-muted mb-1">{cls.time}</div>
                      <div className="text-lg font-bold text-white group-hover:text-brand-accent transition-colors">{cls.activity}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
            {/* Sunday has more classes, maybe highlight it */}
            <div className="hidden lg:block p-8 rounded-3xl border border-dashed border-brand-border flex items-center justify-center text-center">
               <div className="space-y-4">
                  <Zap className="w-8 h-8 text-brand-accent/40 mx-auto" />
                  <p className="text-xs font-bold text-brand-muted tracking-widest uppercase">New slots opening soon</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section id="experience" className="py-12 sm:py-24 px-4 sm:px-6 bg-brand-primary relative overflow-hidden border-b border-brand-border/30">
        {/* Soft Red Combat Glow backdrop */}
        <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-red-600/5 rounded-full blur-[110px] pointer-events-none -z-10" />

        {/* Tactical graphics: MMA Cage on left, Boxing glove on right */}
        <MmaCageDecal className="absolute -left-36 -top-36 w-[600px] h-[600px] text-brand-accent/15 rotate-[45deg] pointer-events-none select-none" />
        <BoxingGloveGraphic className="absolute -right-16 bottom-[10%] w-80 h-80 text-brand-muted/15 -rotate-12 pointer-events-none select-none" />

        <div className="container max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
              <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-brand-accent mb-4 sm:mb-6 font-display">The Journey</h2>
              <h3 className="text-3xl sm:text-5xl font-display font-black leading-none tracking-tighter mb-6 sm:mb-8 text-white">
                PROFESSIONAL <br /> EXPERIENCE
              </h3>
              <p className="text-brand-muted mb-8">
                A track record of leadership and institutional development in combat sports across Bangladesh.
              </p>
              <div className="p-6 rounded-2xl bg-brand-secondary border border-brand-border">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-full bg-brand-primary text-brand-accent">
                    <Users className="w-5 h-5" />
                  </div>
                  <div className="text-sm font-bold text-white">Available for consultation</div>
                </div>
                <p className="text-xs text-brand-muted">Expertise in club management, event organization, and curriculum design.</p>
              </div>
            </div>
            
            <div className="lg:col-span-8 space-y-12">
              {experience.map((exp, idx) => (
                <div key={idx} className="relative pl-8 border-l border-brand-border pb-12 last:pb-0">
                  <div className="absolute left-[-5px] top-0 w-2 h-2 rounded-full bg-brand-accent" />
                  <div className="text-xs font-bold text-brand-muted uppercase tracking-widest mb-2">{exp.period}</div>
                  <div className="text-xl sm:text-3xl font-display font-black mb-1 group flex items-center gap-3 text-white">
                    {exp.role}
                  </div>
                  <div className="text-base sm:text-lg font-bold text-brand-accent mb-4">{exp.company}</div>
                  <p className="text-sm sm:text-base text-brand-muted leading-relaxed max-w-2xl">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-12 sm:py-24 px-4 sm:px-6 bg-brand-secondary/20 backdrop-blur-sm border-t border-b border-brand-border relative overflow-hidden">
        {/* Subtle arena ropes backdrop */}
        <BoxingRingDecal className="absolute left-1/2 -translate-x-1/2 bottom-[10%] w-full max-w-6xl text-white/5 pointer-events-none select-none" />

        <div className="container max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-brand-accent mb-3 sm:mb-4 font-display">Expertise</h2>
            <h3 className="text-3xl sm:text-5xl font-display font-black tracking-tighter text-white uppercase leading-none">TECHNICAL PROFICIENCY</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-x-12 sm:grid-cols-2 lg:grid-cols-2 gap-y-8 sm:gap-y-12 max-w-4xl mx-auto">
            {skills.map((skill, idx) => (
              <div key={idx} className="space-y-4">
                <div className="flex justify-between items-end">
                  <div className="text-lg font-bold tracking-tight uppercase text-white">{skill.name}</div>
                  <div className="text-sm font-mono text-brand-muted">{skill.level}%</div>
                </div>
                <div className="h-[2px] w-full bg-brand-secondary relative overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute h-full bg-brand-accent"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-12 sm:py-24 px-4 sm:px-6 bg-brand-primary relative overflow-hidden">
        {/* Spot light radial gradient */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[130px] pointer-events-none -z-10" />

        {/* MMA Glove on Left & Boxing Glove on Right */}
        <MmaGloveGraphic className="absolute -left-12 -bottom-12 w-80 h-80 text-brand-accent/15 -rotate-12 pointer-events-none select-none" />
        <BoxingGloveGraphic className="absolute -right-12 -top-12 w-80 h-80 text-brand-muted/15 rotate-45 pointer-events-none select-none" />

        <div className="container max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-brand-accent mb-3 sm:mb-4 font-display">Investment</h2>
            <h3 className="text-3xl sm:text-5xl font-display font-black tracking-tighter uppercase text-white">PRICING PLAN</h3>
          </div>
 
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {pricing.map((plan, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ scale: 1.01 }}
                className={`p-5 sm:p-8 lg:p-10 rounded-[1.5rem] lg:rounded-[2.5rem] border ${plan.highlight ? 'bg-brand-accent text-black border-brand-accent shadow-2xl shadow-brand-accent/10' : 'bg-brand-secondary border-brand-border text-white'} relative flex flex-col justify-between`}
              >
                <div>
                  {plan.badge && (
                    <div className="absolute top-5 right-5 sm:top-8 sm:right-8 px-2.5 py-0.5 sm:px-3 sm:py-1 bg-black text-brand-accent text-[9px] sm:text-[10px] font-black uppercase tracking-widest rounded-full">
                      {plan.badge}
                    </div>
                  )}
                  <div className={`text-[10px] sm:text-xs font-black uppercase tracking-widest mb-4 sm:mb-6 ${plan.highlight ? 'text-black/70' : 'text-brand-muted'}`}>
                    {plan.title}
                  </div>
                  <div className="flex items-baseline gap-1.5 sm:gap-2 mb-6 sm:mb-8 flex-wrap">
                    {plan.originalPrice && (
                      <span className={`text-base sm:text-lg line-through font-bold ${plan.highlight ? 'text-black/60' : 'text-brand-muted'}`}>{plan.originalPrice}</span>
                    )}
                    <span className="text-4xl sm:text-5xl lg:text-6xl font-display font-black tracking-tighter leading-none">{plan.price}</span>
                    <span className={`text-xs sm:text-sm font-bold ${plan.highlight ? 'text-black/70' : 'text-brand-muted'}`}>/ COURSE</span>
                  </div>
                  <ul className="space-y-4 sm:space-y-5 mb-8 sm:mb-10 lg:mb-12">
                    {plan.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3 sm:gap-4">
                        <CheckCircle2 className={`w-4 h-4 sm:w-5 sm:h-5 mt-0.5 shrink-0 ${plan.highlight ? 'text-black' : 'text-brand-accent'}`} />
                        <span className="text-sm sm:text-base font-medium leading-tight">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <a 
                  href="mailto:coachishtiak@gmail.com"
                  className={`w-full py-3.5 sm:py-5 rounded-xl sm:rounded-2xl font-black uppercase tracking-widest text-xs sm:text-sm flex items-center justify-center transition-all min-h-[44px] ${plan.highlight ? 'bg-brand-primary text-brand-accent hover:bg-black' : 'bg-brand-accent text-black hover:bg-brand-accent-hover'}`}
                >
                  Join Now
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview Section */}
      <section className="py-16 px-4 sm:py-32 sm:px-12 lg:px-24 bg-brand-secondary/30">
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
                src="https://picsum.photos/seed/gall-1/1200/800" 
                alt="WBC Refereeing" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-110"
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
                  src="https://picsum.photos/seed/gall-2/600/600" 
                  alt="Training Workshop" 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
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
                  src="https://picsum.photos/seed/gall-3/600/600" 
                  alt="Championship Night" 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
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
                src="https://picsum.photos/seed/gall-4/600/1000" 
                alt="Personal Training" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/95 via-transparent to-transparent p-6 sm:p-8 flex flex-col justify-end">
                <p className="text-xl sm:text-2xl font-bold font-display leading-tight text-white">Private Mentorship</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Elite Gear / Shop Preview Section */}
      <section className="py-16 px-4 sm:px-12 lg:px-24 bg-brand-primary">
        <div className="container max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 gap-6 sm:gap-8">
            <div>
              <h2 className="text-3xl sm:text-5xl md:text-7xl font-display font-black tracking-tight mb-4 sm:mb-6 text-white leading-none">
                ELITE <span className="text-brand-accent">GEAR</span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-brand-muted max-w-xl leading-relaxed">
                Hand-picked equipment and apparel designed for high-performance training. Tested in the gym, proven in the ring.
              </p>
            </div>
            <Link 
              href="/shop" 
              className="inline-flex items-center gap-3 bg-brand-accent text-black px-6 py-3.5 sm:px-8 sm:py-4 rounded-full font-bold hover:bg-brand-accent-hover transition-all group shadow-lg shadow-brand-accent/20 text-sm"
            >
              Shop All Equipment
              <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </Link>
          </div>
 
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Invictus Elite Gloves", price: "$89.99", img: "https://picsum.photos/seed/shop-1/800/800" },
              { name: "WBC Referee Tee", price: "$34.99", img: "https://picsum.photos/seed/shop-2/800/800" },
              { name: "Performance Wraps", price: "$14.99", img: "https://picsum.photos/seed/shop-3/800/800" }
            ].map((product, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-square rounded-3xl overflow-hidden bg-brand-secondary border border-brand-border mb-6">
                  <Image 
                    src={product.img} 
                    alt={product.name} 
                    fill 
                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-brand-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-brand-accent text-black px-6 py-2 rounded-full font-bold text-sm uppercase tracking-widest shadow-xl">Quick View</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg text-white group-hover:text-brand-accent transition-colors">{product.name}</span>
                  <span className="font-display font-black text-brand-accent/60">{product.price}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 sm:px-12 lg:px-24 bg-brand-secondary/10 border-t border-brand-border relative overflow-hidden">
        {/* Immersive Arena Fight Lights Spot gradients */}
        <div className="absolute top-[30%] left-[10%] w-[450px] h-[450px] bg-brand-accent/5 rounded-full blur-[100px] pointer-events-none -z-10" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-red-600/5 rounded-full blur-[100px] pointer-events-none -z-10" />

        {/* MMA Cage wireframe background anchor */}
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
              {/* Overlapping technical overlays */}
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                <Send className="w-32 h-32 text-brand-accent" />
              </div>
              <div className="absolute -right-20 -bottom-20 opacity-[0.14] pointer-events-none">
                <MmaGloveGraphic className="w-80 h-80 text-brand-accent !static" />
              </div>
              
              <form className="space-y-6 relative z-10" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs font-black uppercase tracking-widest text-brand-muted ml-1">Full Name</label>
                  <input 
                    type="text" 
                    id="name"
                    placeholder="John Doe"
                    className="w-full bg-brand-primary border border-brand-border rounded-2xl py-4 px-6 focus:outline-none focus:border-brand-accent transition-colors text-white placeholder:text-white/10"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-black uppercase tracking-widest text-brand-muted ml-1">Email Address</label>
                  <input 
                    type="email" 
                    id="email"
                    placeholder="john@example.com"
                    className="w-full bg-brand-primary border border-brand-border rounded-2xl py-4 px-6 focus:outline-none focus:border-brand-accent transition-colors text-white placeholder:text-white/10"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs font-black uppercase tracking-widest text-brand-muted ml-1">Your Message</label>
                  <textarea 
                    id="message"
                    rows={4}
                    placeholder="I'm interested in the 3-month MMA course..."
                    className="w-full bg-brand-primary border border-brand-border rounded-2xl py-4 px-6 focus:outline-none focus:border-brand-accent transition-colors text-white placeholder:text-white/10"
                    required
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full py-5 bg-brand-accent text-black font-black uppercase tracking-widest text-sm rounded-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-brand-accent/20 flex items-center justify-center gap-3 group"
                >
                  Send Message
                  <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 relative overflow-hidden bg-brand-primary border-t border-brand-border/30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#27272a66_0%,_#000000_70%)] -z-10" />
        
        {/* Background Boxing ropes running through the CTA */}
        <BoxingRingDecal className="absolute left-1/2 -translate-x-1/2 top-4 w-full text-brand-accent/20 pointer-events-none select-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl sm:text-5xl md:text-7xl font-display font-black tracking-tighter mb-8 sm:mb-12 uppercase leading-none text-white">
                READY TO TRAIN WITH <br /> THE <span className="text-brand-accent italic">BEST?</span>
              </h2>
              <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
                <a 
                  href="mailto:coachishtiak@gmail.com"
                  className="px-8 py-4 sm:px-12 sm:py-5 bg-brand-accent text-black font-black uppercase tracking-widest text-xs sm:text-sm rounded-full hover:scale-105 transition-transform shadow-2xl shadow-brand-accent/40"
                >
                  Book a Session
                </a>
                <a 
                  href="https://instagram.com/ishtiakofficial"
                  target="_blank"
                  className="px-8 py-4 sm:px-12 sm:py-5 border border-brand-border text-white font-black uppercase tracking-widest text-xs sm:text-sm rounded-full hover:bg-brand-secondary transition-all flex items-center gap-2"
                >
                  <Instagram className="w-4 h-4 text-brand-accent" /> Follow
                </a>
              </div>
            </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 sm:px-6 border-t border-brand-border bg-brand-secondary relative overflow-hidden">
        {/* Subtle decorative grid lines / details */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-accent/35 to-transparent" />
        
        <div className="container max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-12 text-center md:text-left">
            {/* Column 1: Brand Info */}
            <div className="border-b border-brand-border/30 pb-8 md:border-b-0 md:pb-0">
              <div className="font-display font-black text-2xl mb-4 text-white leading-none">
                INVICTUS <span className="text-brand-accent">.</span>
              </div>
              <p className="text-brand-muted text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
                Pioneering professional MMA & Boxing development in Bangladesh. 
                Elite training and guidance for dedicated athletes.
              </p>
            </div>

            {/* Column 2: Contact Details */}
            <div className="border-b border-brand-border/30 pb-8 md:border-b-0 md:pb-0">
              <h4 className="text-xs font-bold uppercase tracking-widest text-brand-accent mb-4 sm:mb-6">Contact Details</h4>
              <ul className="space-y-4 text-sm text-brand-muted">
                <li className="flex items-center justify-center md:justify-start gap-3">
                  <Mail className="w-4 h-4 text-brand-accent shrink-0" />
                  <a href="mailto:coachishtiak@gmail.com" className="hover:text-white transition-colors">coachishtiak@gmail.com</a>
                </li>
                <li className="flex items-center justify-center md:justify-start gap-3">
                  <Phone className="w-4 h-4 text-brand-accent shrink-0" />
                  <a href="tel:01622339080" className="hover:text-white transition-colors">016-2233-9080</a>
                </li>
                <li className="flex items-start justify-center md:justify-start gap-3 max-w-xs mx-auto md:mx-0">
                  <MapPin className="w-4 h-4 shrink-0 text-brand-accent mt-0.5" />
                  <span className="text-center md:text-left">46/B Dolphin Goli, Kalabagan, Dhaka</span>
                </li>
              </ul>
            </div>

            {/* Column 3: Social & Connect */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-brand-accent mb-4 sm:mb-6">Connect With Us</h4>
              <p className="text-brand-muted text-xs leading-relaxed mb-6 max-w-xs mx-auto md:mx-0">
                Follow Coach Ishtiak for daily training clips, fighter highlights, and scheduling updates.
              </p>
              <div className="flex items-center justify-center md:justify-start gap-3">
                <a 
                  href="https://instagram.com/ishtiakofficial" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full bg-brand-primary border border-brand-border/80 text-brand-muted hover:text-white hover:border-brand-accent focus:border-brand-accent flex items-center justify-center transition-all group min-w-[44px] min-h-[44px]"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform text-brand-accent" />
                </a>
                <a 
                  href="#"
                  className="w-11 h-11 rounded-full bg-brand-primary border border-brand-border/80 text-brand-muted hover:text-white hover:border-brand-accent focus:border-brand-accent flex items-center justify-center transition-all group min-w-[44px] min-h-[44px]"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5 group-hover:scale-110 transition-transform hover:text-brand-accent" />
                </a>
                <a 
                  href="#"
                  className="w-11 h-11 rounded-full bg-brand-primary border border-brand-border/80 text-brand-muted hover:text-white hover:border-brand-accent focus:border-brand-accent flex items-center justify-center transition-all group min-w-[44px] min-h-[44px]"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform hover:text-brand-accent" />
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-brand-border flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase font-bold tracking-[0.2em] text-brand-muted text-center md:text-left">
            <div>© 2024 INVICTUS MMA. ALL RIGHTS RESERVED.</div>
            <div className="flex justify-center md:justify-start gap-8">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
