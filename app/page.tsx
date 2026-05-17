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
  Send
} from 'lucide-react';
import { AnimatePresence } from 'motion/react';

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
    icon: <Shield className="w-6 h-6 text-brand-accent" />
  },
  {
    title: "National Jiu-Jitsu Coach & Referee",
    description: "Received from Bangladesh Jiu Jitsu Association",
    year: "2021",
    icon: <Award className="w-6 h-6 text-brand-accent" />
  },
  {
    title: "Boxing Coach Award",
    description: "Honored by Box Boxing Promotion, Kolkata, India",
    year: "2022",
    icon: <Trophy className="w-6 h-6 text-brand-accent" />
  },
  {
    title: "Bronze Medalist",
    description: "India Open International BJJ Championship",
    year: "2022",
    icon: <Star className="w-6 h-6 text-brand-accent" />
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
      <nav className="fixed top-0 w-full z-50 border-b border-brand-border/50 bg-brand-primary/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="font-display font-bold text-xl tracking-tighter">
            COACH <span className="text-brand-muted">ISHTIAK</span>
          </div>
            <div className="hidden md:flex gap-8 text-sm font-medium text-brand-muted">
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
          <a 
            href="mailto:coachishtiak@gmail.com"
            className="px-5 py-2 bg-brand-accent text-black text-sm font-bold rounded-full hover:bg-brand-accent-hover transition-colors shadow-lg shadow-brand-accent/20"
          >
            GET IN TOUCH
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-secondary border border-brand-border text-xs font-bold tracking-widest text-brand-muted mb-6 uppercase">
                <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
                Available for elite coaching
              </div>
              <h1 className="font-display text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8 text-white">
                MASTERING THE <br />
                <span className="text-brand-accent italic underline decoration-[#FCFF00]/30">ART OF COMBAT</span>
              </h1>
              <p className="text-lg md:text-xl text-brand-muted max-w-xl mb-10 leading-relaxed">
                A Coach, A Student & An Athlete. <br />
                Experienced and accomplished combat sports coach with over a decade in MMA, BJJ, and Boxing. 
                Founder of key organizations driving sport development through elite training.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-10">
                <a 
                  href="#contact" 
                  className="px-8 py-4 bg-brand-accent text-black font-black uppercase tracking-widest text-sm rounded-full hover:bg-brand-accent-hover transition-all shadow-xl shadow-brand-accent/20 flex items-center gap-2 group"
                >
                  Join Training
                  <Zap className="w-4 h-4 fill-black group-hover:scale-110 transition-transform" />
                </a>
                <a 
                  href="#schedule" 
                  className="px-8 py-4 border border-brand-border text-white font-black uppercase tracking-widest text-sm rounded-full hover:bg-brand-secondary transition-all"
                >
                  View Schedule
                </a>
              </div>

              <div className="flex flex-wrap gap-4">
                 <div className="flex items-center gap-2 text-sm text-brand-muted">
                    <MapPin className="w-4 h-4 text-brand-accent" /> Kalabagan, Dhaka
                 </div>
                 <div className="flex items-center gap-2 text-sm text-brand-muted">
                    <Shield className="w-4 h-4 text-brand-accent" /> Invictus BJJ & MMA
                 </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative aspect-square rounded-3xl overflow-hidden bg-brand-secondary border border-brand-border group"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-primary via-transparent to-transparent z-10" />
                  <Image 
                    src={heroImages[currentSlide].url} 
                    alt={heroImages[currentSlide].caption} 
                    fill
                    className="w-full h-full object-cover grayscale brightness-75 transition-all duration-700"
                    priority
                  />
                  <div className="absolute bottom-12 left-8 z-20">
                    <div className="text-xs font-bold uppercase tracking-widest text-brand-muted mb-2">{heroImages[currentSlide].caption}</div>
                    <div className="text-4xl font-display font-black tracking-tighter text-white">{heroImages[currentSlide].title}</div>
                  </div>
                </motion.div>
              </AnimatePresence>
 
              {/* Navigation Controls */}
              <div className="absolute bottom-8 right-8 z-30 flex gap-2">
                <button 
                  onClick={prevSlide}
                  className="p-3 rounded-full bg-brand-primary/50 border border-brand-border hover:bg-brand-accent hover:text-black transition-all"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button 
                  onClick={nextSlide}
                  className="p-3 rounded-full bg-brand-primary/50 border border-brand-border hover:bg-brand-accent hover:text-black transition-all"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
 
              {/* Progress Indicators */}
              <div className="absolute top-8 right-8 z-30 flex gap-1.5">
                {heroImages.map((_, idx) => (
                  <div 
                    key={idx}
                    className={`h-1 transition-all duration-500 rounded-full ${idx === currentSlide ? 'w-8 bg-brand-accent' : 'w-2 bg-white/20'}`}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats/Highlight Section */}
      <section className="py-12 border-y border-brand-border bg-brand-secondary">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-display font-black mb-1 tracking-tighter text-brand-accent">10+</div>
              <div className="text-xs uppercase font-bold text-brand-muted tracking-widest">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-display font-black mb-1 tracking-tighter text-brand-accent">500+</div>
              <div className="text-xs uppercase font-bold text-brand-muted tracking-widest">Total Students</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-display font-black mb-1 tracking-tighter text-brand-accent">1st</div>
              <div className="text-xs uppercase font-bold text-brand-muted tracking-widest">WBC Referee BD</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-display font-black mb-1 tracking-tighter text-brand-accent">Founder</div>
              <div className="text-xs uppercase font-bold text-brand-muted tracking-widest">BMMAA Bangladesh</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 overflow-hidden bg-brand-primary">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-5">
              <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-brand-accent mb-6 font-display">Philosophy</h2>
              <h3 className="text-4xl md:text-5xl font-display font-black leading-tight tracking-tighter mb-8 text-white">
                Building champions inside and outside the cage.
              </h3>
            </div>
            <div className="lg:col-span-7">
              <div className="space-y-8 text-brand-muted text-lg leading-relaxed">
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
      <section id="achievements" className="py-24 px-6 bg-brand-secondary/50">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-brand-accent mb-6 font-display">Recognition</h2>
          <h3 className="text-5xl font-display font-black tracking-tighter uppercase text-white">Key Achievements</h3>
        </div>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((item, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -10 }}
              className="p-8 rounded-2xl bg-brand-secondary border border-brand-border hover:border-brand-accent/50 transition-all group"
            >
              <div className="mb-6 inline-block p-3 rounded-xl bg-brand-primary border border-brand-border group-hover:scale-110 group-hover:bg-brand-accent transition-all">
                {/* Dynamically adjust icon color if it was using achievement mapping, but here they are hardcoded in the array above */}
                {/* The accomplishments array uses hardcoded Tailwind colors, I should probably update those too if I want full consistency, but let's see. */}
                {item.icon}
              </div>
              <div className="text-2xl font-display font-bold mb-2 leading-tight text-white">{item.title}</div>
              <p className="text-brand-muted text-sm mb-4 leading-relaxed">{item.description}</p>
              <div className="text-xs font-black tracking-widest text-brand-accent/80 uppercase italic">Year: {item.year}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Class Schedule Section */}
      <section id="schedule" className="py-24 px-6 border-y border-brand-border bg-brand-primary">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-brand-accent mb-4 font-display">Training Hours</h2>
              <h3 className="text-5xl font-display font-black tracking-tighter text-white">WEEKLY CLASS SCHEDULE</h3>
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
                className="p-8 rounded-3xl bg-brand-secondary border border-brand-border hover:border-brand-accent transition-colors"
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
      <section id="experience" className="py-24 px-6 bg-brand-primary">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
              <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-brand-accent mb-6 font-display">The Journey</h2>
              <h3 className="text-5xl font-display font-black leading-none tracking-tighter mb-8 text-white">
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
                  <div className="text-3xl font-display font-black mb-1 group flex items-center gap-3 text-white">
                    {exp.role}
                  </div>
                  <div className="text-lg font-bold text-brand-accent mb-4">{exp.company}</div>
                  <p className="text-brand-muted leading-relaxed max-w-2xl">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-6 bg-brand-secondary/20 backdrop-blur-sm border-t border-brand-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-brand-accent mb-4 font-display">Expertise</h2>
            <h3 className="text-5xl font-display font-black tracking-tighter text-white">TECHNICAL PROFICIENCY</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-x-20 gap-y-12 max-w-4xl mx-auto">
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
      <section id="pricing" className="py-24 px-6 bg-brand-primary">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-brand-accent mb-4 font-display">Investment</h2>
            <h3 className="text-5xl font-display font-black tracking-tighter uppercase text-white">PRICING PLAN</h3>
          </div>
 
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {pricing.map((plan, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ scale: 1.02 }}
                className={`p-10 rounded-[2.5rem] border ${plan.highlight ? 'bg-brand-accent text-black border-brand-accent' : 'bg-brand-secondary border-brand-border text-white'} relative`}
              >
                {plan.badge && (
                  <div className="absolute top-8 right-8 px-3 py-1 bg-black text-brand-accent text-[10px] font-black uppercase tracking-widest rounded-full">
                    {plan.badge}
                  </div>
                )}
                <div className={`text-xs font-black uppercase tracking-widest mb-6 ${plan.highlight ? 'text-black/70' : 'text-brand-muted'}`}>
                  {plan.title}
                </div>
                <div className="flex items-baseline gap-2 mb-8">
                  {plan.originalPrice && (
                    <span className={`text-lg line-through font-bold ${plan.highlight ? 'text-black/60' : 'text-brand-muted'}`}>{plan.originalPrice}</span>
                  )}
                  <span className="text-6xl font-display font-black tracking-tighter">{plan.price}</span>
                  <span className={`text-sm font-bold ${plan.highlight ? 'text-black/70' : 'text-brand-muted'}`}>/ COURSE</span>
                </div>
                <ul className="space-y-6 mb-12">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-4">
                      <CheckCircle2 className={`w-5 h-5 ${plan.highlight ? 'text-black' : 'text-brand-accent'}`} />
                      <span className="text-base font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
                <a 
                  href="mailto:coachishtiak@gmail.com"
                  className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center transition-all ${plan.highlight ? 'bg-brand-primary text-brand-accent hover:bg-black' : 'bg-brand-accent text-black hover:bg-brand-accent-hover'}`}
                >
                  Join Now
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview Section */}
      <section className="py-32 px-6 sm:px-12 lg:px-24 bg-brand-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div>
              <h2 className="text-5xl md:text-7xl font-display font-black tracking-tight mb-6 text-white">
                MOMENTS <span className="text-brand-accent italic">IN MOTION</span>
              </h2>
              <p className="text-xl text-brand-muted max-w-xl leading-relaxed">
                Take a look at our highlight events, training sessions, and the journey of combat sports in Bangladesh.
              </p>
            </div>
            <Link 
              href="/gallery" 
              className="inline-flex items-center gap-3 bg-brand-accent text-black px-8 py-4 rounded-full font-bold hover:bg-brand-accent-hover transition-all group shadow-lg shadow-brand-accent/20"
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
              className="md:col-span-2 relative rounded-3xl overflow-hidden group border border-brand-border shadow-xl"
            >
              <Image 
                src="https://picsum.photos/seed/gall-1/1200/800" 
                alt="WBC Refereeing" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/90 via-transparent to-transparent p-8 flex flex-col justify-end">
                <p className="text-xs font-bold uppercase tracking-widest text-brand-accent mb-1">International Presence</p>
                <p className="text-2xl font-bold font-display text-white">WBC Global Refereeing</p>
              </div>
            </motion.div>
            
            <div className="grid grid-rows-2 gap-4">
              <motion.div 
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                whileHover={{ scale: 0.98 }}
                className="relative rounded-3xl overflow-hidden group border border-brand-border shadow-lg"
              >
                <Image 
                  src="https://picsum.photos/seed/gall-2/600/600" 
                  alt="Training Workshop" 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/90 via-transparent to-transparent p-6 flex flex-col justify-end">
                  <p className="text-xl font-bold font-display leading-tight text-white">Elite Workshops</p>
                </div>
              </motion.div>
              <motion.div 
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 0.98 }}
                className="relative rounded-3xl overflow-hidden group border border-brand-border shadow-lg"
              >
                <Image 
                  src="https://picsum.photos/seed/gall-3/600/600" 
                  alt="Championship Night" 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/90 via-transparent to-transparent p-6 flex flex-col justify-end">
                  <p className="text-xl font-bold font-display leading-tight text-white">Championship Nights</p>
                </div>
              </motion.div>
            </div>
 
            <motion.div 
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 0.98 }}
              className="relative rounded-3xl overflow-hidden group border border-brand-border shadow-xl"
            >
              <Image 
                src="https://picsum.photos/seed/gall-4/600/1000" 
                alt="Personal Training" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/90 via-transparent to-transparent p-8 flex flex-col justify-end">
                <p className="text-xl font-bold font-display leading-tight text-white">Private Mentorship</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Elite Gear / Shop Preview Section */}
      <section className="py-32 px-6 sm:px-12 lg:px-24 bg-brand-primary">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div>
              <h2 className="text-5xl md:text-7xl font-display font-black tracking-tight mb-6 text-white">
                ELITE <span className="text-brand-accent">GEAR</span>
              </h2>
              <p className="text-xl text-brand-muted max-w-xl leading-relaxed">
                Hand-picked equipment and apparel designed for high-performance training. Tested in the gym, proven in the ring.
              </p>
            </div>
            <Link 
              href="/shop" 
              className="inline-flex items-center gap-3 bg-brand-accent text-black px-8 py-4 rounded-full font-bold hover:bg-brand-accent-hover transition-all group shadow-lg shadow-brand-accent/20"
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
      <section id="contact" className="py-32 px-6 bg-brand-secondary/10 border-t border-brand-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-brand-accent mb-6 font-display">Get Started</h2>
              <h3 className="text-5xl md:text-7xl font-display font-black tracking-tighter mb-8 text-white uppercase leading-none">
                COMMIT TO <br />
                <span className="text-brand-accent italic">BE FIT.</span>
              </h3>
              <p className="text-xl text-brand-muted max-w-md leading-relaxed mb-12">
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
              className="p-8 md:p-12 rounded-[2.5rem] bg-brand-secondary border border-brand-border shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                <Send className="w-32 h-32 text-brand-accent" />
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
      <section className="py-32 px-6 relative overflow-hidden bg-brand-primary">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#27272a66_0%,_#000000_70%)] -z-10" />
        <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl md:text-7xl font-display font-black tracking-tighter mb-12 uppercase leading-none text-white">
                READY TO TRAIN WITH <br /> THE <span className="text-brand-accent italic">BEST?</span>
              </h2>
              <div className="flex flex-wrap justify-center gap-6">
                <a 
                  href="mailto:coachishtiak@gmail.com"
                  className="px-12 py-5 bg-brand-accent text-black font-black uppercase tracking-widest text-sm rounded-full hover:scale-105 transition-transform shadow-2xl shadow-brand-accent/40"
                >
                  Book a Session
                </a>
                <a 
                  href="https://instagram.com/ishtiakofficial"
                  target="_blank"
                  className="px-12 py-5 border border-brand-border text-white font-black uppercase tracking-widest text-sm rounded-full hover:bg-brand-secondary transition-all flex items-center gap-2"
                >
                  <Instagram className="w-4 h-4 text-brand-accent" /> Follow
                </a>
              </div>
            </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-brand-border bg-brand-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="font-display font-black text-2xl mb-6 text-white leading-none">
                INVICTUS <span className="text-brand-accent">.</span>
              </div>
              <p className="text-brand-muted text-sm leading-relaxed max-w-xs">
                Pioneering professional MMA & Boxing development in Bangladesh. 
                Elite training for elite fighters.
              </p>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-brand-accent mb-6">Contact Details</h4>
              <ul className="space-y-4 text-sm text-brand-muted">
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-brand-accent" /> coachishtiak@gmail.com
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-brand-accent" /> 016-2233-9080
                </li>
                <li className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 shrink-0 text-brand-accent" /> 
                  <span>46/B Dolphin Goli, Kalabagan, Dhaka</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-brand-accent mb-6">Social</h4>
              <ul className="space-y-4 text-sm text-brand-muted">
                <li><a href="https://instagram.com/ishtiakofficial" className="hover:text-brand-accent transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-brand-accent transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-brand-accent transition-colors">Facebook</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-12 border-t border-brand-border flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase font-bold tracking-[0.2em] text-brand-muted">
            <div>© 2024 INVICTUS MMA. ALL RIGHTS RESERVED.</div>
            <div className="flex gap-8">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
