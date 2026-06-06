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
import { schedule as scheduleApi, pricing as pricingApi, content as contentApi, experience as experienceApi, products as productsApi, inquiries as inquiriesApi, loadWithFallback } from '@/lib/api';
import type { ScheduleDay, PricingPlan, Experience } from '@/lib/types';

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

const defaultHeroSettings = {
  badge: "REGISTRATION OPEN • ELITE DIVISION",
  subheading: "MASTERING THE",
  title: "ART OF COMBAT",
  name: "COACH ISHTIAK",
  description: "A Coach, A Student & An Athlete. Over a decade forging champions in MMA, BJJ, and Boxing. Founder of core combat sport institutions in Bangladesh.",
  images: heroImages
};

const defaultAboutSettings = {
  badge: "PROFILE • LEAD COACH",
  heading: "Philosophy",
  subheading: "Building champions inside and outside the cage.",
  para1: "Recognized as Bangladesh's first WBC-certified boxing referee, my journey has been defined by a relentless pursuit of excellence and the development of combat sports on a national level. As the Founder and General Secretary of the Bangladesh Mixed Martial Arts Association (BMMAA), I have pioneered the first organized MMA events in our nation.",
  para2: "My coaching methodology combines technical precision with mental fortitude. From tactical boxing instructions for the Bangladesh Army to leading high-performance training at Invictus BJJ, I focus on the holistic development of my athletes.",
  image: "https://picsum.photos/seed/coach-ishtiaq/800/1000"
};

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

const defaultPricingData = [
  {
    id: "plan-monthly",
    title: "Monthly Plan",
    price: "3,000/-",
    features: ["No Admission Fee", "All Standard Classes", "Access to MMA & Boxing"],
    highlight: false
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

const defaultHomepageProducts = [
  { id: 1, name: "Invictus Elite Boxing Gloves", price: 89.99, image: "https://picsum.photos/seed/gloves/800/800" },
  { id: 2, name: "WBC Referee Commemorative Tee", price: 34.99, image: "https://picsum.photos/seed/shirt/800/800" },
  { id: 3, name: "Invictus MMA Shinguards", price: 59.99, image: "https://picsum.photos/seed/shinguard/800/800" },
  { id: 4, name: "8-Week Combat Conditioning Program", price: 129.99, image: "https://picsum.photos/seed/program/800/800" },
  { id: 5, name: "Classic Invictus Hoodie", price: 64.99, image: "https://picsum.photos/seed/hoodie/800/800" }
];

export default function PortfolioPage() {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [menuOpen, setMenuOpen] = React.useState(false);

  // Dynamic schedule, pricing, and contact states loaded from localStorage if browser-side
  const [currentSchedule, setCurrentSchedule] = React.useState(schedule);
  const [currentPricing, setCurrentPricing] = React.useState(defaultPricingData as PricingPlan[]);
  const [heroSettings, setHeroSettings] = React.useState(defaultHeroSettings);
  const [aboutSettings, setAboutSettings] = React.useState(defaultAboutSettings);
  const [currentExperience, setCurrentExperience] = React.useState(experience);

  // Elite Gear homepage local states & carousel limit configurations
  const [currentProducts, setCurrentProducts] = React.useState<any[]>(defaultHomepageProducts);
  const [productIdx, setProductIdx] = React.useState(defaultHomepageProducts.length);
  const [disableTransition, setDisableTransition] = React.useState(false);
  const [itemWidth, setItemWidth] = React.useState(440);
  const [carouselGap, setCarouselGap] = React.useState(24);
  const [isCarouselHovered, setIsCarouselHovered] = React.useState(false);

  const [formData, setFormData] = React.useState({ name: '', email: '', message: '' });
  const [formErrors, setFormErrors] = React.useState<{name?: string; email?: string; message?: string}>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [successToast, setSuccessToast] = React.useState(false);
  const [selectedScheduleDay, setSelectedScheduleDay] = React.useState<string>('All');
  const [achievementIdx, setAchievementIdx] = React.useState(0);
  const [isAchievementHovered, setIsAchievementHovered] = React.useState(false);
  const achievementsRef = React.useRef<HTMLDivElement>(null);
  const [experienceIdx, setExperienceIdx] = React.useState(0);
  const [isExperienceHovered, setIsExperienceHovered] = React.useState(false);
  const [showAllExperience, setShowAllExperience] = React.useState(false);

  const loadedRef = React.useRef(false);

  React.useEffect(() => {
    if (loadedRef.current) return;
    loadedRef.current = true;

    const loadAll = async () => {
      // Load schedule
      const scheduleResult = await loadWithFallback(
        () => scheduleApi.list(),
        'invictus_schedule',
        schedule
      );
      if (Array.isArray(scheduleResult)) {
        setCurrentSchedule(scheduleResult);
      }

      // Load pricing
      const pricingResult = await loadWithFallback(
        () => pricingApi.list(),
        'invictus_pricing',
        defaultPricingData
      );
      if (Array.isArray(pricingResult)) {
        setCurrentPricing(pricingResult);
      }

      // Load hero settings
      const heroResult = await loadWithFallback(
        () => contentApi.getHero(),
        'invictus_hero_settings',
        defaultHeroSettings
      );
      if (heroResult) setHeroSettings(heroResult as typeof defaultHeroSettings);

      // Load about settings
      const aboutResult = await loadWithFallback(
        () => contentApi.getAbout(),
        'invictus_about_settings',
        defaultAboutSettings
      );
      if (aboutResult) setAboutSettings(aboutResult as typeof defaultAboutSettings);

      // Load experience
      const expResult = await loadWithFallback(
        () => experienceApi.list(),
        'invictus_experience',
        experience
      );
      if (Array.isArray(expResult)) {
        setCurrentExperience(expResult);
      }

      // Load products
      const prodResult = await loadWithFallback(
        () => productsApi.list(),
        'invictus_products',
        defaultHomepageProducts
      );
      if (Array.isArray(prodResult) && prodResult.length > 0) {
        setCurrentProducts(prodResult);
      }
    };
    
    loadAll();
    
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setItemWidth(450);
        setCarouselGap(24);
      } else if (width >= 768) {
        setItemWidth(380);
        setCarouselGap(20);
      } else if (width >= 640) {
        setItemWidth(320);
        setCarouselGap(16);
      } else if (width >= 400) {
        setItemWidth(280);
        setCarouselGap(12);
      } else {
        setItemWidth(240);
        setCarouselGap(12);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentProducts.length]);

  const nextProduct = () => {
    if (disableTransition) return;
    setProductIdx((prev) => prev + 1);
  };

  const prevProduct = () => {
    if (disableTransition) return;
    setProductIdx((prev) => prev - 1);
  };

  const handleTransitionEnd = () => {
    const N = currentProducts.length;
    if (N === 0) return;
    
    setProductIdx((prev) => {
      if (prev >= N * 2) {
        setDisableTransition(true);
        return prev - N;
      } else if (prev < N) {
        setDisableTransition(true);
        return prev + N;
      }
      return prev;
    });
  };

  React.useEffect(() => {
    if (disableTransition) {
      const raf = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setDisableTransition(false);
        });
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [disableTransition]);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % (heroSettings.images?.length || 3));
    }, 5000);

    return () => clearInterval(timer);
  }, [heroSettings]);

  React.useEffect(() => {
    if (isCarouselHovered) return;
    const timer = setInterval(() => {
      setProductIdx((prev) => prev + 1);
    }, 3500);

    return () => clearInterval(timer);
  }, [isCarouselHovered]);

  // Achievements auto-play on mobile
  React.useEffect(() => {
    if (isAchievementHovered) return;
    const timer = setInterval(() => {
      setAchievementIdx((prev) => {
        const next = prev + 1;
        if (next >= achievements.length) return 0;
        return next;
      });
    }, 3000);
    return () => clearInterval(timer);
  }, [isAchievementHovered, achievements.length]);

  React.useEffect(() => {
    if (!achievementsRef.current) return;
    const container = achievementsRef.current;
    const cardWidth = container.scrollWidth / achievements.length;
    container.scrollTo({ left: cardWidth * achievementIdx, behavior: 'smooth' });
  }, [achievementIdx, achievements.length]);

  // Experience auto-play on mobile
  React.useEffect(() => {
    if (isExperienceHovered) return;
    const timer = setInterval(() => {
      setExperienceIdx((prev) => (prev + 1) % currentExperience.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [isExperienceHovered, currentExperience.length]);

  const validateForm = (): boolean => {
    const errors: {name?: string; email?: string; message?: string} = {};
    if (!formData.name || formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (!formData.message || formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors({});
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await inquiriesApi.create({
        name: formData.name,
        email: formData.email,
        message: formData.message,
      });
      setSuccessToast(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSuccessToast(false), 5000);
    } catch {
      setFormErrors({ message: 'Failed to send. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % (heroSettings.images?.length || 3));
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + (heroSettings.images?.length || 3)) % (heroSettings.images?.length || 3));

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
            <a href="#pricing" className="hover:text-brand-accent transition-colors">Pricing</a>
            <a href="#contact" className="hover:text-brand-accent transition-colors">Contact</a>
            <Link href="/admin" className="hover:text-brand-accent transition-colors flex items-center gap-1 font-bold text-brand-accent border-l border-brand-border/40 pl-6 shrink-0">
              Console 🛡️
            </Link>
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
              <div className="px-4 py-6 space-y-1 flex flex-col font-display font-bold uppercase tracking-widest text-xs">
                <a 
                  href="#about" 
                  onClick={() => setMenuOpen(false)}
                  className="py-3 sm:py-2.5 border-b border-brand-border/30 text-white hover:text-brand-accent transition-colors flex items-center justify-between min-h-[48px]"
                >
                  <span>About Coach</span>
                  <ChevronRight className="w-4 h-4 text-brand-accent/60" />
                </a>
                <a 
                  href="#schedule" 
                  onClick={() => setMenuOpen(false)}
                  className="py-3 sm:py-2.5 border-b border-brand-border/30 text-white hover:text-brand-accent transition-colors flex items-center justify-between min-h-[48px]"
                >
                  <span>Class Schedule</span>
                  <ChevronRight className="w-4 h-4 text-brand-accent/60" />
                </a>
                <Link 
                  href="/gallery" 
                  onClick={() => setMenuOpen(false)}
                  className="py-3 sm:py-2.5 border-b border-brand-border/30 text-white hover:text-brand-accent transition-colors flex items-center justify-between min-h-[48px]"
                >
                  <span>Gallery</span>
                  <ChevronRight className="w-4 h-4 text-brand-accent/60" />
                </Link>
                <Link 
                  href="/shop" 
                  onClick={() => setMenuOpen(false)}
                  className="py-3 sm:py-2.5 border-b border-brand-border/30 text-white hover:text-brand-accent transition-colors flex items-center justify-between min-h-[48px]"
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
                  className="py-3 sm:py-2.5 border-b border-brand-border/30 text-white hover:text-brand-accent transition-colors flex items-center justify-between min-h-[48px]"
                >
                  <span>Pricing plans</span>
                  <ChevronRight className="w-4 h-4 text-brand-accent/60" />
                </a>
                <a 
                  href="#contact" 
                  onClick={() => setMenuOpen(false)}
                  className="py-3 sm:py-2.5 border-b border-brand-border/30 text-white hover:text-brand-accent transition-colors flex items-center justify-between min-h-[48px]"
                >
                  <span>Get In Touch</span>
                  <ChevronRight className="w-4 h-4 text-brand-accent/60" />
                </a>
                <Link 
                  href="/admin" 
                  onClick={() => setMenuOpen(false)}
                  className="py-3 sm:py-2.5 text-brand-accent hover:text-white transition-colors flex items-center justify-between font-extrabold min-h-[48px]"
                >
                  <span>Coach Console 🛡️</span>
                  <ChevronRight className="w-4 h-4 text-brand-accent" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Mobile Menu Backdrop */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative pt-20 pb-12 sm:pt-44 sm:pb-20 px-4 sm:px-6 overflow-hidden border-b-2 border-brand-border bg-black">
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

        <div className="container max-w-7xl mx-auto relative px-4 sm:px-6">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-10 sm:gap-16 items-start">
            {/* Text Content: badge, heading, description - always first */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full"
            >
              <div className="hidden sm:inline-flex items-center gap-2.5 px-4.5 py-1.5 bg-brand-accent/10 border border-brand-accent/25 text-[10px] font-mono font-bold tracking-widest text-[#BFFF00] mb-6 sm:mb-8 rounded-full uppercase select-none transition-all duration-300 hover:border-brand-accent/40 hover:shadow-[0_0_15px_rgba(204,255,0,0.1)]">
                <span className="w-2 h-2 rounded-full bg-brand-accent animate-[pulse_1.5s_infinite] shrink-0" />
                {heroSettings.badge}
              </div>

              <h1 className="font-display mb-6 sm:mb-8 text-left">
                <span className="block text-[10px] sm:text-xs sm:text-sm font-mono font-bold tracking-[0.25em] text-brand-muted uppercase mb-3 leading-relaxed">
                  {heroSettings.subheading}
                </span>
                <span className="block text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tighter uppercase leading-[0.95] mb-4 sm:mb-5">
                  {heroSettings.title}
                </span>
                <span className="relative inline-block text-black bg-brand-accent px-4 py-2 sm:px-6 sm:py-3 rounded-2xl select-none text-2xl xs:text-3xl sm:text-5xl md:text-6xl font-display font-black leading-none uppercase tracking-tight shadow-xl shadow-brand-accent/20 transition-transform duration-300 hover:scale-102">
                  {heroSettings.name}
                </span>
              </h1>

              <p className="text-xs sm:text-sm md:text-lg text-brand-muted max-w-xl mb-0 leading-relaxed font-sans border-l-2 border-brand-border pl-4 whitespace-pre-line text-left">
                {heroSettings.description}
              </p>
            </motion.div>

            {/* Hero Image - second on mobile, adjacent to text on desktop */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative aspect-[4/5] sm:aspect-square rounded-[2rem] bg-brand-secondary/40 backdrop-blur-md border border-brand-border/85 overflow-hidden group select-none w-full max-w-md lg:max-w-none mx-auto shadow-2xl hover:shadow-[0_0_30px_rgba(204,255,0,0.03)] transition-all duration-500"
            >
              {/* Modern Badge Overlays */}
              <div className="absolute top-4 left-4 xs:top-5 xs:left-5 z-40 bg-black/75 backdrop-blur-md px-2.5 py-1.5 text-[8px] sm:text-[9px] font-mono text-brand-accent tracking-widest uppercase rounded-full border border-brand-accent/20 select-none">
                SLIDE {currentSlide + 1} &bull; OVERVIEW
              </div>
              
              <div className="absolute top-4 right-4 xs:top-5 xs:right-5 z-40 bg-black/75 backdrop-blur-md px-2.5 py-1.5 text-[8px] sm:text-[9px] font-mono text-white/95 tracking-widest uppercase rounded-full border border-white/10 select-none flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-pulse" />
                ACTIVE_PORTFOLIO
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
                  <Image 
                    src={heroSettings.images[currentSlide]?.url || "https://picsum.photos/seed/coach-ishtiaq/1000/1000"} 
                    alt={heroSettings.images[currentSlide]?.caption || "Slide Image"} 
                    fill
                    className="w-full h-full object-cover grayscale brightness-90 contrast-[1.05] group-hover:scale-105 transition-transform duration-700"
                    priority
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-16 left-5 xs:bottom-20 xs:left-6 sm:bottom-24 sm:left-10 z-20">
                    <div className="text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-widest text-[#BFFF00] mb-1.5 sm:mb-2">{heroSettings.images[currentSlide]?.caption}</div>
                    <div className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-display font-black tracking-tighter text-white uppercase leading-tight">{heroSettings.images[currentSlide]?.title}</div>
                  </div>
                </motion.div>
              </AnimatePresence>
 
              {/* Navigation Controls with modern rounded buttons */}
              <div className="absolute bottom-4 right-4 xs:bottom-6 xs:right-6 z-30 flex gap-2">
                <button 
                  onClick={prevSlide}
                  className="p-2.5 sm:p-3 bg-black/60 backdrop-blur-md border border-white/10 text-white rounded-full hover:bg-brand-accent hover:text-black hover:border-brand-accent transition-all cursor-pointer min-w-[38px] min-h-[38px] sm:min-w-[44px] sm:min-h-[44px] flex items-center justify-center shadow-lg active:scale-95"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button 
                  onClick={nextSlide}
                  className="p-2.5 sm:p-3 bg-black/60 backdrop-blur-md border border-white/10 text-white rounded-full hover:bg-brand-accent hover:text-black hover:border-brand-accent transition-all cursor-pointer min-w-[38px] min-h-[38px] sm:min-w-[44px] sm:min-h-[44px] flex items-center justify-center shadow-lg active:scale-95"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
 
              {/* Progress Indicators (Pills) */}
              <div className="absolute bottom-6 left-5 xs:bottom-8 xs:left-6 sm:bottom-10 sm:left-10 z-30 flex gap-1.5">
                {(heroSettings.images || []).map((_: any, idx: number) => (
                  <button 
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-1.5 transition-all duration-500 rounded-full cursor-pointer ${idx === currentSlide ? 'w-6 bg-brand-accent' : 'w-1.5 bg-white/30 hover:bg-white/50'}`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </motion.div>

            {/* CTA Buttons & Location Info - third on mobile, below text on desktop */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="w-full"
            >
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-5">
                <a 
                  href="#contact" 
                  className="px-6 py-3.5 sm:px-10 sm:py-4.5 bg-brand-accent hover:bg-brand-accent-hover text-black font-black uppercase tracking-widest text-xs sm:text-sm rounded-full transition-all duration-300 shadow-lg shadow-brand-accent/20 hover:shadow-brand-accent/40 active:scale-95 hover:-translate-y-0.5 flex items-center justify-center gap-2.5 group text-center min-h-[48px]"
                >
                  Join Training
                  <Zap className="w-4 h-4 fill-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
                <a 
                  href="#schedule" 
                  className="px-6 py-3.5 sm:px-10 sm:py-4.5 border border-brand-accent hover:border-brand-accent/50 bg-transparent hover:bg-white/[0.02] text-white font-bold uppercase tracking-widest text-xs sm:text-sm rounded-full transition-all duration-300 active:scale-95 hover:-translate-y-0.5 flex items-center justify-center gap-2.5 text-center min-h-[48px]"
                >
                  View Schedule
                </a>
              </div>

              <div className="grid grid-cols-2 max-w-md border border-brand-border/65 bg-brand-secondary/35 backdrop-blur-md rounded-2xl divide-x divide-brand-border/60 overflow-hidden shadow-lg shadow-black/40 mt-6">
                <div className="p-3.5 sm:p-4 flex flex-col justify-between hover:bg-brand-border/15 transition-colors">
                  <div className="text-[8px] sm:text-[9px] font-mono text-brand-muted tracking-widest font-black uppercase mb-1.5 sm:mb-2">LOCATION</div>
                  <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs sm:text-sm font-bold text-white leading-tight">
                    <MapPin className="w-3.5 h-3.5 text-brand-accent shrink-0" />
                    <span>KALABAGAN, DHAKA</span>
                  </div>
                </div>
                <div className="p-3.5 sm:p-4 flex flex-col justify-between hover:bg-brand-border/15 transition-colors">
                  <div className="text-[8px] sm:text-[9px] font-mono text-brand-muted tracking-widest font-black uppercase mb-1.5 sm:mb-2">HEADQUARTERS</div>
                  <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs sm:text-sm font-bold text-white leading-tight">
                    <Shield className="w-3.5 h-3.5 text-brand-accent shrink-0" />
                    <span>INVICTUS BJJ & MMA</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats/Highlight Section */}
      <section className="py-12 sm:py-20 border-y border-brand-border/40 bg-brand-primary/50 backdrop-blur-md relative overflow-hidden">
        {/* Decorative background grid effect */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-15" />
        
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="group relative p-6 sm:p-8 bg-brand-secondary/40 border border-brand-border hover:border-brand-accent/40 rounded-3xl transition-all duration-300 flex flex-col justify-center items-center text-center overflow-hidden hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40 min-h-[120px] sm:min-h-[160px]">
              <div className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-brand-accent tracking-tighter mb-2 leading-none">10+</div>
              <div className="text-[10px] sm:text-xs uppercase font-bold text-brand-muted tracking-widest leading-tight">Years Experience</div>
            </div>

            <div className="group relative p-6 sm:p-8 bg-brand-secondary/40 border border-brand-border hover:border-brand-accent/40 rounded-3xl transition-all duration-300 flex flex-col justify-center items-center text-center overflow-hidden hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40 min-h-[120px] sm:min-h-[160px]">
              <div className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-brand-accent tracking-tighter mb-2 leading-none">500+</div>
              <div className="text-[10px] sm:text-xs uppercase font-bold text-brand-muted tracking-widest leading-tight">Total Students</div>
            </div>

            <div className="group relative p-6 sm:p-8 bg-brand-secondary/40 border border-brand-border hover:border-brand-accent/40 rounded-3xl transition-all duration-300 flex flex-col justify-center items-center text-center overflow-hidden hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40 min-h-[120px] sm:min-h-[160px]">
              <div className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-brand-accent tracking-tighter mb-2 leading-none">1st</div>
              <div className="text-[10px] sm:text-xs uppercase font-bold text-brand-muted tracking-widest leading-tight">WBC Referee BD</div>
            </div>

            <div className="group relative p-6 sm:p-8 bg-brand-secondary/40 border border-brand-border hover:border-brand-accent/40 rounded-3xl transition-all duration-300 flex flex-col justify-center items-center text-center overflow-hidden hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40 min-h-[120px] sm:min-h-[160px]">
              <div className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-brand-accent tracking-tighter mb-2 leading-none uppercase">Founder</div>
              <div className="text-[10px] sm:text-xs uppercase font-bold text-brand-muted tracking-widest leading-tight">BMMAA Bangladesh</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 sm:py-28 px-4 sm:px-6 overflow-hidden bg-brand-primary relative">
        {/* Subtle Background Glow Spot */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[350px] h-[350px] bg-brand-accent/5 rounded-full blur-[80px] pointer-events-none -z-10" />
        
        {/* MMA Cage Wireframe Background Decal */}
        <MmaCageDecal className="absolute -right-28 -top-28 w-[500px] h-[500px] text-brand-accent/20 rotate-12 pointer-events-none select-none animate-pulse duration-[10s]" />
        <MmaCageDecal className="absolute -left-36 -bottom-36 w-[600px] h-[600px] text-brand-muted/10 -rotate-12 pointer-events-none select-none" />
 
        <div className="container max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Right Column: Title, Headline, and Descriptions - first on mobile */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="lg:col-span-7 flex flex-col justify-center order-1 lg:order-1"
            >
              <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-brand-accent mb-4 sm:mb-6 font-display">{aboutSettings.heading}</h2>
              
              <h3 className="text-2xl sm:text-4xl md:text-5xl font-display font-black leading-tight tracking-tighter mb-6 sm:mb-8 text-white uppercase">
                {aboutSettings.subheading}
              </h3>
  
              <div className="space-y-6 sm:space-y-8 text-brand-muted text-sm sm:text-base md:text-lg leading-relaxed font-sans">
                <p className="whitespace-pre-line">
                  {aboutSettings.para1}
                </p>
                <p className="whitespace-pre-line">
                  {aboutSettings.para2}
                </p>
              </div>
            </motion.div>

            {/* Left Column: Premium Coach Action Image - second on mobile */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-5 relative group order-2 lg:order-2"
            >
              <div className="relative h-[320px] sm:h-[480px] lg:h-[560px] w-full rounded-[2.5rem] overflow-hidden border border-brand-border/80 group-hover:border-brand-accent/40 transition-all duration-500 shadow-2xl shadow-black/60">
                <Image 
                  src={aboutSettings.image || "https://picsum.photos/seed/coach-ishtiaq/800/1000"} 
                  alt="Coach Ishtiak Philosophy"
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-103 brightness-95"
                  referrerPolicy="no-referrer"
                />
                {/* Visual design badge detailing */}
                <div className="absolute top-5 left-5 bg-black/80 backdrop-blur-md px-3.5 py-1.5 border border-white/10 rounded-full text-[9px] font-mono uppercase tracking-widest text-[#BFFF00]">
                  {aboutSettings.badge}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
 
      {/* Achievements Grid */}
      <section id="achievements" className="py-16 sm:py-28 px-4 sm:px-6 bg-brand-secondary/30 relative overflow-hidden border-t border-b border-brand-border/40">
        {/* Deep Yellow Glow Background Gradient */}
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-brand-accent/5 rounded-full blur-[100px] pointer-events-none -z-10" />
 
        {/* Technical Glove Decals to anchor the layout */}
        <BoxingGloveGraphic className="absolute -left-16 -bottom-16 w-80 h-80 text-brand-accent/15 rotate-12 pointer-events-none select-none" />
        <MmaGloveGraphic className="absolute -right-20 -top-20 w-80 h-80 text-brand-muted/10 -rotate-12 pointer-events-none select-none" />
 
        <div className="container max-w-7xl mx-auto text-center mb-12 sm:mb-20 relative z-10">
          <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-brand-accent mb-4 sm:mb-6 font-display">Recognition</h2>
          <h3 className="text-3xl sm:text-5xl font-display font-black tracking-tighter uppercase text-white">Key Achievements</h3>
        </div>
        <div 
          ref={achievementsRef}
          onMouseEnter={() => setIsAchievementHovered(true)}
          onMouseLeave={() => setIsAchievementHovered(false)}
          onTouchStart={() => setIsAchievementHovered(true)}
          onTouchEnd={() => setTimeout(() => setIsAchievementHovered(false), 3000)}
          className="container max-w-7xl mx-auto flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory relative z-10 [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {achievements.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <motion.div 
                key={idx}
                whileHover={{ y: -6, scale: 1.01 }}
                className="min-w-[80vw] sm:min-w-[45vw] md:min-w-0 snap-start p-8 rounded-[2rem] bg-brand-secondary/45 border border-purple-500/20 hover:border-brand-accent/40 transition-all duration-500 group shadow-lg shadow-black/40 cursor-default"
              >
                <div className="mb-6 inline-block p-3.5 rounded-2xl bg-brand-primary border border-brand-border/60 text-brand-accent group-hover:bg-brand-accent group-hover:text-black transition-all duration-500 shadow-sm">
                  <IconComponent className="w-5 h-5 transition-colors duration-500" />
                </div>
                <div className="text-xl font-display font-bold mb-3.5 leading-tight text-white group-hover:text-brand-accent transition-colors duration-300">{item.title}</div>
                <p className="text-brand-muted text-sm mb-5 leading-relaxed font-sans">{item.description}</p>
                <div className="text-[11px] font-mono font-bold tracking-widest text-brand-accent/85 uppercase">Year: {item.year}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Dot indicators - mobile only */}
        <div className="flex md:hidden items-center justify-center gap-2 mt-6 relative z-10">
          {achievements.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setAchievementIdx(idx)}
              className={`rounded-full transition-all duration-300 cursor-pointer ${
                idx === achievementIdx
                  ? 'w-6 h-2 bg-brand-accent'
                  : 'w-2 h-2 bg-brand-border hover:bg-brand-muted'
              }`}
              aria-label={`Go to achievement ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Class Schedule Section */}
      <section id="schedule" className="py-12 sm:py-24 px-4 sm:px-6 border-y border-brand-border bg-brand-primary relative overflow-hidden">
        {/* Subtle Backdrop Gradients */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[120px] pointer-events-none -z-10" />
        
        {/* Boxing Ring Rope Decal stretching behind schedule */}
        <BoxingRingDecal className="absolute left-1/2 -translate-x-1/2 top-[15%] w-full max-w-6xl text-brand-accent/20 pointer-events-none select-none" />

        <div className="container max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 sm:gap-8 mb-6 sm:mb-16">
            <div>
              <h2 className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-brand-accent mb-1 sm:mb-4 font-display">Training Hours</h2>
              <h3 className="text-xl sm:text-5xl font-display font-black tracking-tighter text-white uppercase leading-none">WEEKLY CLASS SCHEDULE</h3>
            </div>
            <div className="flex items-center gap-2 sm:gap-4 p-2.5 sm:p-4 rounded-xl bg-brand-secondary border border-brand-accent/30">
              <div className="p-1.5 sm:p-2 rounded-full bg-brand-accent text-black">
                <Clock className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
              </div>
              <div className="flex sm:flex-col items-center sm:items-start gap-1 sm:gap-0">
                <div className="text-[9px] sm:text-xs font-bold text-brand-muted">Status</div>
                <div className="text-[10px] sm:text-sm font-black text-white">ENROLLMENT OPEN</div>
              </div>
            </div>
          </div>
 
          {/* Day Switcher */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-6 sm:mb-10 border-b border-brand-border/40 pb-4 sm:pb-6">
            {['All', 'Sat', 'Sun', 'Tue', 'Wed', 'Thu'].map((day) => {
              const fullDay = day === 'All' ? 'All' : 
                day === 'Sat' ? 'Saturday' :
                day === 'Sun' ? 'Sunday' :
                day === 'Tue' ? 'Tuesday' :
                day === 'Wed' ? 'Wednesday' : 'Thursday';
              const isActive = selectedScheduleDay === fullDay;
              return (
                <button
                  key={day}
                  onClick={() => setSelectedScheduleDay(fullDay)}
                  className={`relative px-3 sm:px-5 py-2 sm:py-2.5 text-[10px] sm:text-xs font-black uppercase tracking-wider sm:tracking-widest transition-all rounded-full min-h-[36px] sm:min-h-[44px] cursor-pointer flex items-center justify-center border leading-none ${
                    isActive
                      ? 'bg-brand-accent text-black border-brand-accent shadow-md shadow-brand-accent/25'
                      : 'bg-brand-secondary/80 text-brand-muted border-brand-border/80 hover:text-white hover:border-brand-accent/40'
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
 
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <AnimatePresence mode="popLayout">
              {currentSchedule
                .filter((item: any) => selectedScheduleDay === 'All' || item.day === selectedScheduleDay)
                .map((item: any, idx: number) => {
                  const dayColors = ['text-brand-accent', 'text-amber-400', 'text-rose-400', 'text-sky-400', 'text-purple-400'];
                  const dayColor = dayColors[idx % dayColors.length];
                  return (
                  <motion.div 
                    layout
                    key={item.day}
                    initial={{ opacity: 0, scale: 0.95, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className="p-4 sm:p-8 rounded-2xl sm:rounded-3xl bg-brand-secondary/95 backdrop-blur-sm border border-brand-border hover:border-brand-accent hover:shadow-[0_0_20px_rgba(252,255,0,0.03)] transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-2.5 sm:gap-3 mb-4 sm:mb-6">
                      <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center transition-colors`}>
                        <Calendar className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${dayColor}`} />
                      </div>
                      <h4 className={`text-base sm:text-xl font-display font-black tracking-tight transition-colors group-hover:text-brand-accent ${dayColor}`}>{item.day}</h4>
                    </div>
                    <div className="space-y-3 sm:space-y-4">
                      {item.classes.map((cls: any, cIdx: number) => {
                        const activityColors = ['text-white', 'text-amber-200', 'text-rose-200', 'text-sky-200', 'text-purple-200', 'text-emerald-200'];
                        const activityColor = activityColors[cIdx % activityColors.length];
                        return (
                        <div key={cIdx} className="group cursor-default relative pl-2.5 sm:pl-3 border-l transition-colors hover:border-brand-accent" style={{ borderColor: ['rgba(204,255,0,0.3)', 'rgba(251,191,36,0.3)', 'rgba(244,63,94,0.3)', 'rgba(56,189,248,0.3)', 'rgba(167,139,250,0.3)', 'rgba(52,211,153,0.3)'][cIdx % 6] }}>
                          <div className="text-[11px] sm:text-xs font-mono text-brand-muted mb-0.5 sm:mb-1">{cls.time}</div>
                          <div className={`text-sm sm:text-lg font-bold transition-colors group-hover:text-brand-accent ${activityColor}`}>{cls.activity}</div>
                        </div>
                      )})}
                    </div>
                  </motion.div>
                )})}
            </AnimatePresence>
            
            {/* Opening slots placeholder card */}
            {selectedScheduleDay === 'All' && (
              <div className="flex p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-dashed border-brand-border flex-col items-center justify-center text-center min-h-[100px] sm:min-h-[200px]">
                <div className="space-y-2 sm:space-y-4">
                  <Zap className="w-5 h-5 sm:w-8 sm:h-8 text-brand-accent/40 mx-auto" />
                  <p className="text-[10px] sm:text-xs font-bold text-brand-muted tracking-widest uppercase leading-relaxed">New slots opening soon</p>
                </div>
              </div>
            )}
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
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-16">
            <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
              <h2 className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-brand-accent mb-2 sm:mb-6 font-display">The Journey</h2>
              <h3 className="text-2xl sm:text-5xl font-display font-black leading-none tracking-tighter mb-3 sm:mb-8 text-white">
                PROFESSIONAL <br /> EXPERIENCE
              </h3>
              <p className="text-xs sm:text-base text-brand-muted mb-4 sm:mb-8 leading-relaxed">
                A track record of leadership and institutional development in combat sports across Bangladesh.
              </p>
              <div className="hidden sm:block p-4 sm:p-6 rounded-2xl bg-brand-secondary border border-brand-border">
                <div className="flex items-center gap-3 sm:gap-4 mb-2 sm:mb-4">
                  <div className="p-2 sm:p-3 rounded-full bg-brand-primary text-brand-accent">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-white">Available for consultation</div>
                </div>
                <p className="text-[11px] sm:text-xs text-brand-muted leading-relaxed">Expertise in club management, event organization, and curriculum design.</p>
              </div>
            </div>
            
            {/* Desktop: full timeline with accordion */}
            <div className="hidden lg:block lg:col-span-8">
              {/* First 3 items always visible */}
              <div className="space-y-12">
                {currentExperience.slice(0, 3).map((exp: any, idx: number) => (
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

              {/* Accordion for remaining items */}
              {currentExperience.length > 3 && (
                <>
                  <motion.div 
                    initial={false}
                    animate={{ height: showAllExperience ? 'auto' : 0, opacity: showAllExperience ? 1 : 0 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-12 pt-12">
                      {currentExperience.slice(3).map((exp: any, idx: number) => (
                        <div key={idx} className="relative pl-8 border-l border-brand-border/60 pb-12 last:pb-0">
                          <div className="absolute left-[-5px] top-0 w-2 h-2 rounded-full bg-brand-accent/60" />
                          <div className="text-xs font-bold text-brand-muted uppercase tracking-widest mb-2">{exp.period}</div>
                          <div className="text-xl sm:text-3xl font-display font-black mb-1 group flex items-center gap-3 text-white">
                            {exp.role}
                          </div>
                          <div className="text-base sm:text-lg font-bold text-brand-accent mb-4">{exp.company}</div>
                          <p className="text-sm sm:text-base text-brand-muted leading-relaxed max-w-2xl">{exp.description}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  <button
                    onClick={() => setShowAllExperience(!showAllExperience)}
                    className="mt-8 inline-flex items-center gap-2 px-6 py-3.5 bg-brand-secondary border border-brand-border hover:border-brand-accent/40 text-white font-bold uppercase tracking-widest text-xs rounded-full transition-all duration-300 hover:bg-brand-accent hover:text-black group"
                  >
                    {showAllExperience ? 'Show Less' : `Show ${currentExperience.length - 3} More`}
                    <motion.span
                      animate={{ rotate: showAllExperience ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="inline-block"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </motion.span>
                  </button>
                </>
              )}
            </div>

            {/* Mobile: vertical carousel */}
            <div
              className="lg:hidden relative"
              onMouseEnter={() => setIsExperienceHovered(true)}
              onMouseLeave={() => setIsExperienceHovered(false)}
              onTouchStart={() => setIsExperienceHovered(true)}
              onTouchEnd={() => setTimeout(() => setIsExperienceHovered(false), 3000)}
            >
              <div className="relative overflow-hidden min-h-[200px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={experienceIdx}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                    className="relative pl-6 border-l-2 border-brand-accent/40"
                  >
                    <div className="absolute left-[-6px] top-0 w-2.5 h-2.5 rounded-full bg-brand-accent shadow-[0_0_8px_rgba(204,255,0,0.25)]" />
                    <div className="text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-1">
                      {currentExperience[experienceIdx]?.period}
                    </div>
                    <div className="text-lg font-display font-black mb-0.5 text-white">
                      {currentExperience[experienceIdx]?.role}
                    </div>
                    <div className="text-sm font-bold text-brand-accent mb-2">
                      {currentExperience[experienceIdx]?.company}
                    </div>
                    <p className="text-xs text-brand-muted leading-relaxed">
                      {currentExperience[experienceIdx]?.description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Dot indicators */}
              <div className="flex items-center justify-center gap-1.5 mt-4">
                {currentExperience.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setExperienceIdx(idx)}
                    className={`rounded-full transition-all duration-300 cursor-pointer ${
                      idx === experienceIdx
                        ? 'w-5 h-1.5 bg-brand-accent'
                        : 'w-1.5 h-1.5 bg-brand-border hover:bg-brand-muted'
                    }`}
                    aria-label={`Go to experience ${idx + 1}`}
                  />
                ))}
              </div>
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
            {currentPricing.map((plan: any, idx: number) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -6, scale: 1.01 }}
                className={`p-6 sm:p-8 lg:p-10 rounded-[2rem] border transition-all duration-500 relative flex flex-col justify-between bg-brand-secondary/45 ${
                  plan.highlight 
                    ? 'border-brand-accent/50 shadow-[0_0_35px_rgba(204,255,0,0.06)]' 
                    : 'border-brand-border/60'
                }`}
              >
                <div>
                  {plan.badge && (
                    <div className="absolute top-5 right-5 sm:top-8 sm:right-8 px-3 py-1 bg-brand-accent text-black text-[9px] font-black uppercase tracking-wider rounded-full shadow-lg shadow-brand-accent/15 select-none">
                      {plan.badge}
                    </div>
                  )}
                  <div className="text-[10px] sm:text-xs font-bold tracking-widest text-brand-muted uppercase mb-5">
                    {plan.title}
                  </div>
                  <div className="flex items-baseline gap-2 mb-6 sm:mb-8 flex-wrap">
                    {plan.originalPrice && (
                      <span className="text-base sm:text-lg line-through font-bold text-brand-muted/70">{plan.originalPrice}</span>
                    )}
                    <span className="text-4xl sm:text-5xl lg:text-5xl font-display font-black tracking-tighter leading-none text-white">{plan.price}</span>
                    <span className="text-xs sm:text-sm font-bold text-brand-muted">/ COURSE</span>
                  </div>
                  <ul className="space-y-4 sm:space-y-4.5 mb-8 sm:mb-10 lg:mb-12">
                    {plan.features.map((feature: string, fIdx: number) => (
                      <li key={fIdx} className="flex items-start gap-3 sm:gap-4.5">
                        <CheckCircle2 className="w-4.5 h-4.5 sm:w-5 sm:h-5 mt-0.5 shrink-0 text-brand-accent" />
                        <span className="text-sm sm:text-base font-medium leading-tight text-white/90">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <a 
                  href="mailto:coachishtiak@gmail.com"
                  className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center transition-all min-h-[48px] ${
                    plan.highlight 
                      ? 'bg-brand-accent text-black hover:bg-brand-accent-hover shadow-lg shadow-brand-accent/25' 
                      : 'bg-transparent border border-brand-border hover:border-brand-accent/40 text-white hover:bg-white/[0.01]'
                  }`}
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
      <section className="py-16 bg-brand-primary overflow-hidden relative">
        <div className="container max-w-7xl mx-auto px-4 sm:px-12 lg:px-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 gap-6 sm:gap-8">
            <div>
              <h2 className="text-3xl sm:text-5xl md:text-7xl font-display font-black tracking-tight mb-4 sm:mb-6 text-white leading-none">
                ELITE <span className="text-brand-accent">GEAR</span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-brand-muted max-w-xl leading-relaxed">
                Hand-picked equipment and apparel designed for high-performance training. Tested in the gym, proven in the ring.
              </p>
            </div>
            
            <div className="flex items-center gap-4 self-start md:self-end">
              <div className="flex gap-2">
                <button
                  onClick={prevProduct}
                  className="p-3 bg-brand-secondary/80 border border-brand-border text-white rounded-full transition-all cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center shadow-lg active:scale-95 hover:bg-brand-accent hover:text-black hover:border-brand-accent"
                  aria-label="Previous products"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextProduct}
                  className="p-3 bg-brand-secondary/80 border border-brand-border text-white rounded-full transition-all cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center shadow-lg active:scale-95 hover:bg-brand-accent hover:text-black hover:border-brand-accent"
                  aria-label="Next products"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <Link 
                href="/shop" 
                className="inline-flex items-center gap-2.5 bg-brand-accent text-black px-5 py-3 rounded-full font-bold hover:bg-brand-accent-hover transition-all group shadow-lg shadow-brand-accent/20 text-xs sm:text-sm uppercase tracking-wider"
              >
                <span>Shop All</span>
                <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Sliding Carousel Viewport stretching edge-to-edge */}
        <div 
          className="relative w-full py-6"
          onMouseEnter={() => setIsCarouselHovered(true)}
          onMouseLeave={() => setIsCarouselHovered(false)}
        >
          {/* Dynamic tracking lane centered using translateX math */}
          <div 
            className="flex"
            style={{ 
              transform: `translateX(calc(50% - (${itemWidth}px / 2) - (${productIdx} * (${itemWidth}px + ${carouselGap}px))))`,
              gap: `${carouselGap}px`,
              transition: disableTransition ? 'none' : 'transform 500ms cubic-bezier(0.25, 1, 0.5, 1)'
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {(currentProducts.length > 0 ? [...currentProducts, ...currentProducts, ...currentProducts] : []).map((product, idx) => {
              const displayPrice = typeof product.price === 'number' ? `$${product.price.toFixed(2)}` : product.price;
              const displayImg = product.image || product.img || "https://picsum.photos/seed/placeholder/800/800";
              const isActive = idx === productIdx;
              
              return (
                <Link 
                  href="/shop"
                  key={`${product.id || idx}-${idx}`}
                  style={{ width: `${itemWidth}px` }}
                  className={`shrink-0 group block cursor-pointer transition-all duration-500 transform ${
                    isActive 
                      ? 'scale-100 opacity-100 z-10' 
                      : 'scale-[0.88] opacity-35 z-0'
                  }`}
                >
                  <div className={`relative aspect-square rounded-3xl overflow-hidden bg-brand-secondary border transition-all duration-500 mb-5 sm:mb-6 ${
                    isActive 
                      ? 'border-brand-accent/70 shadow-2xl shadow-brand-accent/10' 
                      : 'border-brand-border/60 shadow-none'
                  }`}>
                    <Image 
                      src={displayImg} 
                      alt={product.name} 
                      fill 
                      className={`object-cover transition-all duration-700 ${
                        isActive 
                          ? 'grayscale-0 scale-102' 
                          : 'grayscale scale-100 group-hover:scale-102 group-hover:grayscale-[50%]'
                      }`}
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Active centered glow/quick view overlay */}
                    <div className={`absolute inset-0 bg-brand-primary/40 flex items-center justify-center transition-opacity duration-300 ${
                      isActive ? 'opacity-0 group-hover:opacity-100' : 'opacity-0'
                    }`}>
                      <span className="bg-brand-accent text-black px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-widest shadow-xl transition-all duration-300 scale-90 group-hover:scale-100">
                        Quick View
                      </span>
                    </div>
                  </div>

                  {/* Title & Price blocks fading slightly when keeping off-focus */}
                  <div className={`flex justify-between items-start gap-4 transition-opacity duration-500 ${
                    isActive ? 'opacity-100' : 'opacity-40 group-hover:opacity-80'
                  }`}>
                    <span className="font-bold text-base sm:text-lg text-white group-hover:text-brand-accent transition-colors leading-snug">
                      {product.name}
                    </span>
                    <span className="font-display font-black text-brand-accent shrink-0 text-sm sm:text-base">
                      {displayPrice}
                    </span>
                  </div>
                </Link>
              );
            })}
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
                      formErrors.message ? 'border-red-500/60' : 'border-brand-border'
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
