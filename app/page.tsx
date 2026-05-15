'use client';

import * as React from 'react';
import Image from 'next/image';
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
  CheckCircle2
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
    icon: <Shield className="w-6 h-6 text-blue-400" />
  },
  {
    title: "National Jiu-Jitsu Coach & Referee",
    description: "Received from Bangladesh Jiu Jitsu Association",
    year: "2021",
    icon: <Award className="w-6 h-6 text-amber-400" />
  },
  {
    title: "Boxing Coach Award",
    description: "Honored by Box Boxing Promotion, Kolkata, India",
    year: "2022",
    icon: <Trophy className="w-6 h-6 text-yellow-400" />
  },
  {
    title: "Bronze Medalist",
    description: "India Open International BJJ Championship",
    year: "2022",
    icon: <Star className="w-6 h-6 text-orange-400" />
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
    <main className="min-h-screen bg-neutral-950 text-neutral-100 overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-neutral-800/50 bg-neutral-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="font-display font-bold text-xl tracking-tighter">
            COACH <span className="text-neutral-500">ISHTIAK</span>
          </div>
            <div className="hidden md:flex gap-8 text-sm font-medium text-neutral-400">
              <a href="#about" className="hover:text-white transition-colors">About</a>
              <a href="#schedule" className="hover:text-white transition-colors">Schedule</a>
              <a href="#experience" className="hover:text-white transition-colors">Experience</a>
              <a href="#achievements" className="hover:text-white transition-colors">Achievements</a>
              <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            </div>
          <a 
            href="mailto:coachishtiak@gmail.com"
            className="px-5 py-2 bg-white text-black text-sm font-bold rounded-full hover:bg-neutral-200 transition-colors"
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
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-bold tracking-widest text-neutral-400 mb-6 uppercase">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                Available for elite coaching
              </div>
              <h1 className="font-display text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
                MASTERING THE <br />
                <span className="text-neutral-500 italic">ART OF COMBAT</span>
              </h1>
              <p className="text-lg md:text-xl text-neutral-400 max-w-xl mb-10 leading-relaxed">
                A Coach, A Student & An Athlete. <br />
                Experienced and accomplished combat sports coach with over a decade in MMA, BJJ, and Boxing. 
                Founder of key organizations driving sport development through elite training.
              </p>
              <div className="flex flex-wrap gap-4">
                 <div className="flex items-center gap-2 text-sm text-neutral-500">
                    <MapPin className="w-4 h-4" /> Kalabagan, Dhaka
                 </div>
                 <div className="flex items-center gap-2 text-sm text-neutral-500">
                    <Shield className="w-4 h-4 text-neutral-600" /> Invictus BJJ & MMA
                 </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative aspect-square rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-800 group"
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
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent z-10" />
                  <Image 
                    src={heroImages[currentSlide].url} 
                    alt={heroImages[currentSlide].caption} 
                    fill
                    className="w-full h-full object-cover grayscale brightness-75 transition-all duration-700"
                    priority
                  />
                  <div className="absolute bottom-12 left-8 z-20">
                    <div className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2">{heroImages[currentSlide].caption}</div>
                    <div className="text-4xl font-display font-black tracking-tighter">{heroImages[currentSlide].title}</div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Controls */}
              <div className="absolute bottom-8 right-8 z-30 flex gap-2">
                <button 
                  onClick={prevSlide}
                  className="p-3 rounded-full bg-neutral-900/50 border border-neutral-800 hover:bg-white hover:text-black transition-all"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button 
                  onClick={nextSlide}
                  className="p-3 rounded-full bg-neutral-900/50 border border-neutral-800 hover:bg-white hover:text-black transition-all"
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
                    className={`h-1 transition-all duration-500 rounded-full ${idx === currentSlide ? 'w-8 bg-white' : 'w-2 bg-white/20'}`}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats/Highlight Section */}
      <section className="py-12 border-y border-neutral-900 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-display font-black mb-1 tracking-tighter">10+</div>
              <div className="text-xs uppercase font-bold text-neutral-500 tracking-widest">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-display font-black mb-1 tracking-tighter">500+</div>
              <div className="text-xs uppercase font-bold text-neutral-500 tracking-widest">Total Students</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-display font-black mb-1 tracking-tighter">1st</div>
              <div className="text-xs uppercase font-bold text-neutral-500 tracking-widest">WBC Referee BD</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-display font-black mb-1 tracking-tighter">Founder</div>
              <div className="text-xs uppercase font-bold text-neutral-500 tracking-widest">BMMAA Bangladesh</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-5">
              <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-500 mb-6 font-display">Philosophy</h2>
              <h3 className="text-4xl md:text-5xl font-display font-black leading-tight tracking-tighter mb-8">
                Building champions inside and outside the cage.
              </h3>
            </div>
            <div className="lg:col-span-7">
              <div className="space-y-8 text-neutral-400 text-lg leading-relaxed">
                <p>
                  Recognized as Bangladesh&apos;s first WBC-certified boxing referee, my journey has been defined by a relentless 
                  pursuit of excellence and the development of combat sports on a national level. 
                  As the Founder and General Secretary of the <span className="text-white font-medium">Bangladesh Mixed Martial Arts Association (BMMAA)</span>, 
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
      <section id="achievements" className="py-24 px-6 bg-neutral-900/30">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-500 mb-6 font-display">Recognition</h2>
          <h3 className="text-5xl font-display font-black tracking-tighter uppercase">Key Achievements</h3>
        </div>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((item, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -10 }}
              className="p-8 rounded-2xl bg-neutral-900 border border-neutral-800/50 hover:border-neutral-700 transition-all group"
            >
              <div className="mb-6 inline-block p-3 rounded-xl bg-neutral-950 border border-neutral-800 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <div className="text-2xl font-display font-bold mb-2 leading-tight">{item.title}</div>
              <p className="text-neutral-500 text-sm mb-4 leading-relaxed">{item.description}</p>
              <div className="text-xs font-black tracking-widest text-neutral-600 uppercase italic">Year: {item.year}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Class Schedule Section */}
      <section id="schedule" className="py-24 px-6 border-y border-neutral-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-500 mb-4 font-display">Training Hours</h2>
              <h3 className="text-5xl font-display font-black tracking-tighter">WEEKLY CLASS SCHEDULE</h3>
            </div>
            <div className="p-4 rounded-xl bg-neutral-900 border border-red-900/30 flex items-center gap-4">
              <div className="p-2 rounded-full bg-red-950 text-red-500">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-neutral-400">Status</div>
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
                className="p-8 rounded-3xl bg-neutral-900/50 border border-neutral-800 hover:border-neutral-700 transition-colors"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-neutral-400" />
                  </div>
                  <h4 className="text-xl font-display font-black tracking-tight">{item.day}</h4>
                </div>
                <div className="space-y-4">
                  {item.classes.map((cls, cIdx) => (
                    <div key={cIdx} className="group">
                      <div className="text-xs font-mono text-neutral-500 mb-1">{cls.time}</div>
                      <div className="text-lg font-bold text-white group-hover:text-red-500 transition-colors">{cls.activity}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
            {/* Sunday has more classes, maybe highlight it */}
            <div className="hidden lg:block p-8 rounded-3xl border border-dashed border-neutral-800 flex items-center justify-center text-center">
               <div className="space-y-4">
                  <Zap className="w-8 h-8 text-neutral-700 mx-auto" />
                  <p className="text-xs font-bold text-neutral-600 tracking-widest uppercase">New slots opening soon</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section id="experience" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
              <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-500 mb-6 font-display">The Journey</h2>
              <h3 className="text-5xl font-display font-black leading-none tracking-tighter mb-8">
                PROFESSIONAL <br /> EXPERIENCE
              </h3>
              <p className="text-neutral-400 mb-8">
                A track record of leadership and institutional development in combat sports across Bangladesh.
              </p>
              <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-full bg-neutral-800 text-white">
                    <Users className="w-5 h-5" />
                  </div>
                  <div className="text-sm font-bold">Available for consultation</div>
                </div>
                <p className="text-xs text-neutral-500">Expertise in club management, event organization, and curriculum design.</p>
              </div>
            </div>
            
            <div className="lg:col-span-8 space-y-12">
              {experience.map((exp, idx) => (
                <div key={idx} className="relative pl-8 border-l border-neutral-800 pb-12 last:pb-0">
                  <div className="absolute left-[-5px] top-0 w-2 h-2 rounded-full bg-neutral-400" />
                  <div className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">{exp.period}</div>
                  <div className="text-3xl font-display font-black mb-1 group flex items-center gap-3">
                    {exp.role}
                  </div>
                  <div className="text-lg font-bold text-neutral-100 mb-4">{exp.company}</div>
                  <p className="text-neutral-400 leading-relaxed max-w-2xl">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-6 bg-neutral-900/20 backdrop-blur-sm border-t border-neutral-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-500 mb-4 font-display">Expertise</h2>
            <h3 className="text-5xl font-display font-black tracking-tighter">TECHNICAL PROFICIENCY</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-x-20 gap-y-12 max-w-4xl mx-auto">
            {skills.map((skill, idx) => (
              <div key={idx} className="space-y-4">
                <div className="flex justify-between items-end">
                  <div className="text-lg font-bold tracking-tight uppercase">{skill.name}</div>
                  <div className="text-sm font-mono text-neutral-500">{skill.level}%</div>
                </div>
                <div className="h-[2px] w-full bg-neutral-800 relative overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute h-full bg-white"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-6 bg-neutral-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-500 mb-4 font-display">Investment</h2>
            <h3 className="text-5xl font-display font-black tracking-tighter uppercase">PRICING PLAN</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {pricing.map((plan, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ scale: 1.02 }}
                className={`p-10 rounded-[2.5rem] border ${plan.highlight ? 'bg-white text-black border-white' : 'bg-neutral-900 border-neutral-800 text-white'} relative`}
              >
                {plan.badge && (
                  <div className="absolute top-8 right-8 px-3 py-1 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                    {plan.badge}
                  </div>
                )}
                <div className={`text-xs font-black uppercase tracking-widest mb-6 ${plan.highlight ? 'text-neutral-500' : 'text-neutral-500'}`}>
                  {plan.title}
                </div>
                <div className="flex items-baseline gap-2 mb-8">
                  {plan.originalPrice && (
                    <span className="text-lg text-neutral-400 line-through font-bold">{plan.originalPrice}</span>
                  )}
                  <span className="text-6xl font-display font-black tracking-tighter">{plan.price}</span>
                  <span className={`text-sm font-bold ${plan.highlight ? 'text-neutral-500' : 'text-neutral-500'}`}>/ COURSE</span>
                </div>
                <ul className="space-y-6 mb-12">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-4">
                      <CheckCircle2 className={`w-5 h-5 ${plan.highlight ? 'text-black' : 'text-white'}`} />
                      <span className="text-base font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
                <a 
                  href="mailto:coachishtiak@gmail.com"
                  className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center transition-all ${plan.highlight ? 'bg-black text-white hover:bg-neutral-800' : 'bg-white text-black hover:bg-neutral-200'}`}
                >
                  Join Now
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-900/20 via-neutral-950 to-neutral-950 -z-10" />
        <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl md:text-7xl font-display font-black tracking-tighter mb-12">
                READY TO TRAIN WITH <br /> THE <span className="text-neutral-500">BEST?</span>
              </h2>
              <div className="flex flex-wrap justify-center gap-6">
                <a 
                  href="mailto:coachishtiak@gmail.com"
                  className="px-12 py-5 bg-white text-black font-black uppercase tracking-widest text-sm rounded-full hover:scale-105 transition-transform"
                >
                  Book a Session
                </a>
                <a 
                  href="https://instagram.com/ishtiakofficial"
                  target="_blank"
                  className="px-12 py-5 border border-neutral-800 text-white font-black uppercase tracking-widest text-sm rounded-full hover:bg-neutral-900 transition-all flex items-center gap-2"
                >
                  <Instagram className="w-4 h-4" /> Follow
                </a>
              </div>
            </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-neutral-900 bg-neutral-950">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="font-display font-black text-2xl mb-6">ISHTIAK.</div>
              <p className="text-neutral-500 text-sm leading-relaxed max-w-xs">
                Pioneering professional MMA & Boxing development in Bangladesh. 
                Elite training for elite fighters.
              </p>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-6">Contact Details</h4>
              <ul className="space-y-4 text-sm text-neutral-500">
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4" /> coachishtiak@gmail.com
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4" /> 016-2233-9080
                </li>
                <li className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 shrink-0" /> 
                  <span>46/B Dolphin Goli, Kalabagan, Dhaka</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-6">Social</h4>
              <ul className="space-y-4 text-sm text-neutral-500">
                <li><a href="https://instagram.com/ishtiakofficial" className="hover:text-white transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-12 border-t border-neutral-900 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase font-bold tracking-[0.2em] text-neutral-600">
            <div>© 2024 ISHTIAK AHMED. ALL RIGHTS RESERVED.</div>
            <div className="flex gap-8">
                <a href="#" className="hover:text-neutral-400 transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-neutral-400 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
