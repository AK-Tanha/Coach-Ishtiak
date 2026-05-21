'use client';

import * as React from 'react';
import Link from 'next/link';
import { 
  Trophy, 
  MapPin, 
  Mail, 
  Phone, 
  Shield, 
  Users, 
  Clock, 
  Calendar, 
  Zap, 
  CheckCircle2, 
  Send, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  Search, 
  UserPlus, 
  ArrowLeft, 
  Filter, 
  Compass, 
  CircleAlert, 
  Check, 
  ChevronRight,
  TrendingUp,
  Sliders,
  DollarSign,
  Briefcase
} from 'lucide-react';

// Default mock data to populate localStorage if empty
const defaultSchedule = [
  { 
    day: "Saturday", 
    classes: [
      { id: "sat-1", time: "4:30 - 5:30 PM", activity: "Personal Training (PT)" }
    ]
  },
  { 
    day: "Sunday", 
    classes: [
      { id: "sun-1", time: "4:00 - 5:00 PM", activity: "Muay Thai" },
      { id: "sun-2", time: "5:30 - 7:00 PM", activity: "MMA" },
      { id: "sun-3", time: "7:30 - 8:30 PM", activity: "Boxing" }
    ]
  },
  { 
    day: "Tuesday", 
    classes: [
      { id: "tue-1", time: "3:00 - 4:30 PM", activity: "Afternoon Class (AFT)" },
      { id: "tue-2", time: "5:30 - 7:00 PM", activity: "MMA" },
      { id: "tue-3", time: "7:30 - 8:30 PM", activity: "Boxing" }
    ]
  },
  { 
    day: "Wednesday", 
    classes: [
      { id: "wed-1", time: "4:00 - 5:15 PM", activity: "Personal Training (PT)" }
    ]
  },
  { 
    day: "Thursday", 
    classes: [
      { id: "thu-1", time: "4:00 - 5:00 PM", activity: "Muay Thai" },
      { id: "thu-2", time: "5:30 - 7:00 PM", activity: "MMA" }
    ]
  }
];

const defaultPricing = [
  {
    id: "plan-monthly",
    title: "Monthly Plan",
    price: "3,000/-",
    features: ["No Admission Fee", "All Standard Classes", "Access to MMA & Boxing"],
    highlight: false,
    badge: ""
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

const defaultStudents = [
  { id: "st-1", name: "Tanvir Rahman", email: "tanvir@gmail.com", phone: "01711223344", course: "3 Months Course", status: "Active", enrolledDate: "2026-05-10" },
  { id: "st-2", name: "Fahim Ahmed", email: "fahim.ah@gmail.com", phone: "01822445566", course: "Monthly Plan", status: "Pending", enrolledDate: "2026-05-18" },
  { id: "st-3", name: "Imtiaz Hassan", email: "imtiaz@hassan.info", phone: "01677338899", course: "3 Months Course", status: "Active", enrolledDate: "2026-04-12" },
  { id: "st-4", name: "Anika Bushra", email: "anika.bushra@outlook.com", phone: "01944112233", course: "3 Months Course", status: "Active", enrolledDate: "2026-05-02" },
  { id: "st-5", name: "Raihan Kabir", email: "raihan@kabir.net", phone: "01588667744", course: "Monthly Plan", status: "Canceled", enrolledDate: "2026-05-15" }
];

const defaultInquiries = [
  { id: "inq-1", name: "Sadman Sakib", email: "sadman@live.com", message: "Is private one-on-one training with Coach Ishtiak available on Fridays? I want to focus purely on WBC boxing prep.", date: "2026-05-20", read: false },
  { id: "inq-2", name: "Zarin Subah", email: "zarin@gmail.com", message: "Do you have any female-only batches or is it completely co-ed? I'm standard beginner at Muay Thai.", date: "2026-05-19", read: true },
  { id: "inq-3", name: "Sajid Karim", email: "sajid.kar@yahoo.com", message: "Joined boxing federation earlier, interested in MMA high-performance session starting next month. Please share registration details.", date: "2026-05-18", read: true }
];

interface PricingPlan {
  id: string;
  title: string;
  price: string;
  features: string[];
  highlight: boolean;
  badge?: string;
  originalPrice?: string;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('invictus_admin_auth') === 'true';
    }
    return false;
  });
  const [passcode, setPasscode] = React.useState('');
  const [loginError, setLoginError] = React.useState('');
  
  // Dashboard states
  const [activeTab, setActiveTab] = React.useState<'students' | 'schedule' | 'pricing' | 'inquiries'>('students');
  const [students, setStudents] = React.useState<typeof defaultStudents>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('invictus_students');
      return stored ? JSON.parse(stored) : defaultStudents;
    }
    return defaultStudents;
  });
  const [scheduleData, setScheduleData] = React.useState<typeof defaultSchedule>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('invictus_schedule');
      return stored ? JSON.parse(stored) : defaultSchedule;
    }
    return defaultSchedule;
  });
  const [pricingData, setPricingData] = React.useState<PricingPlan[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('invictus_pricing');
      return stored ? JSON.parse(stored) : defaultPricing;
    }
    return defaultPricing;
  });
  const [inquiries, setInquiries] = React.useState<typeof defaultInquiries>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('invictus_inquiries');
      return stored ? JSON.parse(stored) : defaultInquiries;
    }
    return defaultInquiries;
  });
  
  // Search & Filters
  const [studentSearch, setStudentSearch] = React.useState('');
  const [studentFilter, setStudentFilter] = React.useState('All');
  
  // Forms states
  const [newStudent, setNewStudent] = React.useState({ name: '', email: '', phone: '', course: '3 Months Course', status: 'Pending' });
  const [editingPlanId, setEditingPlanId] = React.useState<string | null>(null);
  const [editingPlanForm, setEditingPlanForm] = React.useState({ title: '', price: '', originalPrice: '', highlight: false, badge: '', features: '' });
  
  // Schedule quick add
  const [selectedDay, setSelectedDay] = React.useState('Sunday');
  const [newClassTime, setNewClassTime] = React.useState('');
  const [newClassActivity, setNewClassActivity] = React.useState('');

  // Toast / System status notification
  const [systemNotification, setSystemNotification] = React.useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Synchronize initial default values to localStorage if they do not exist
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      if (!localStorage.getItem('invictus_students')) {
        localStorage.setItem('invictus_students', JSON.stringify(defaultStudents));
      }
      if (!localStorage.getItem('invictus_schedule')) {
        localStorage.setItem('invictus_schedule', JSON.stringify(defaultSchedule));
      }
      if (!localStorage.getItem('invictus_pricing')) {
        localStorage.setItem('invictus_pricing', JSON.stringify(defaultPricing));
      }
      if (!localStorage.getItem('invictus_inquiries')) {
        localStorage.setItem('invictus_inquiries', JSON.stringify(defaultInquiries));
      }
    }
  }, []);

  const triggerNotification = (text: string, type: 'success' | 'error' = 'success') => {
    setSystemNotification({ text, type });
    setTimeout(() => setSystemNotification(null), 3000);
  };

  const syncToStorage = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  // Auth check
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === '1234' || passcode.toLowerCase() === 'admin') {
      setIsAuthenticated(true);
      sessionStorage.setItem('invictus_admin_auth', 'true');
      setLoginError('');
      triggerNotification('Access Granted. Session Initialized.', 'success');
    } else {
      setLoginError('Invalid Passcode or Command. Access Denied.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('invictus_admin_auth');
    setPasscode('');
    triggerNotification('Security Lock Enabled. Logged out.');
  };

  const handleBypass = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem('invictus_admin_auth', 'true');
    triggerNotification('Bypass Mode Authorized.', 'success');
  };

  // Student Actions
  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudent.name || !newStudent.phone) {
      triggerNotification('Name and Phone are mandatory.', 'error');
      return;
    }
    const newlyCreated = {
      id: "st-" + Date.now(),
      name: newStudent.name,
      email: newStudent.email || "N/A",
      phone: newStudent.phone,
      course: newStudent.course,
      status: newStudent.status,
      enrolledDate: new Date().toISOString().split('T')[0]
    };
    const updated = [newlyCreated, ...students];
    setStudents(updated);
    syncToStorage('invictus_students', updated);
    setNewStudent({ name: '', email: '', phone: '', course: '3 Months Course', status: 'Pending' });
    triggerNotification(`Athlete ${newlyCreated.name} successfully registered!`);
  };

  const handleDeleteStudent = (id: string, name: string) => {
    if (confirm(`Remove athlete ${name} registration record?`)) {
      const updated = students.filter(s => s.id !== id);
      setStudents(updated);
      syncToStorage('invictus_students', updated);
      triggerNotification(`Removed record lock for ${name}.`);
    }
  };

  const handleToggleStudentStatus = (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'Pending' ? 'Active' : currentStatus === 'Active' ? 'Canceled' : 'Pending';
    const updated = students.map(s => {
      if (s.id === id) {
        return { ...s, status: nextStatus };
      }
      return s;
    });
    setStudents(updated);
    syncToStorage('invictus_students', updated);
    triggerNotification(`Updated status to ${nextStatus}.`);
  };

  // Inquiry Actions
  const handleDeleteInquiry = (id: string) => {
    const updated = inquiries.filter(i => i.id !== id);
    setInquiries(updated);
    syncToStorage('invictus_inquiries', updated);
    triggerNotification('Inquiry record deleted.');
  };

  const handleToggleInquiryRead = (id: string) => {
    const updated = inquiries.map(i => {
      if (i.id === id) {
        return { ...i, read: !i.read };
      }
      return i;
    });
    setInquiries(updated);
    syncToStorage('invictus_inquiries', updated);
  };

  // Schedule Actions
  const handleAddClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClassTime || !newClassActivity) {
      triggerNotification('Provide class time and title.', 'error');
      return;
    }
    const updated = scheduleData.map(dayObj => {
      if (dayObj.day === selectedDay) {
        return {
          ...dayObj,
          classes: [...dayObj.classes, { id: "cls-" + Date.now(), time: newClassTime, activity: newClassActivity }]
        };
      }
      return dayObj;
    });
    
    // Check if the day exists in schedule, if not we add the day object
    const dayExists = scheduleData.some(d => d.day === selectedDay);
    let finalSchedule = updated;
    if (!dayExists) {
      finalSchedule = [...scheduleData, {
        day: selectedDay,
        classes: [{ id: "cls-" + Date.now(), time: newClassTime, activity: newClassActivity }]
      }];
    }

    setScheduleData(finalSchedule);
    syncToStorage('invictus_schedule', finalSchedule);
    setNewClassTime('');
    setNewClassActivity('');
    triggerNotification(`Added class info under ${selectedDay}.`);
  };

  const handleDeleteClass = (day: string, classId: string) => {
    const updated = scheduleData.map(dayObj => {
      if (dayObj.day === day) {
        return {
          ...dayObj,
          classes: dayObj.classes.filter(c => c.id !== classId)
        };
      }
      return dayObj;
    }).filter(dayObj => dayObj.classes.length > 0); // Cleanup days without classes if preferred, or keep them empty

    setScheduleData(updated);
    syncToStorage('invictus_schedule', updated);
    triggerNotification('Session timing removed from schedule.');
  };

  // Pricing Actions
  const startEditingPlan = (plan: PricingPlan) => {
    setEditingPlanId(plan.id);
    setEditingPlanForm({
      title: plan.title,
      price: plan.price,
      originalPrice: plan.originalPrice || '',
      highlight: plan.highlight,
      badge: plan.badge || '',
      features: plan.features.join('\n')
    });
  };

  const saveEditedPlan = (id: string) => {
    const updated = pricingData.map(p => {
      if (p.id === id) {
        return {
          ...p,
          title: editingPlanForm.title,
          price: editingPlanForm.price,
          originalPrice: editingPlanForm.originalPrice || undefined,
          highlight: editingPlanForm.highlight,
          badge: editingPlanForm.badge || undefined,
          features: editingPlanForm.features.split('\n').map(f => f.trim()).filter(Boolean)
        };
      }
      return p;
    });
    setPricingData(updated);
    syncToStorage('invictus_pricing', updated);
    setEditingPlanId(null);
    triggerNotification('Course pricing plan configured successfully!');
  };

  // UI Stats Helpers
  const totalLeads = students.length;
  const activeStudentsCount = students.filter(s => s.status === 'Active').length;
  const pendingStudentsCount = students.filter(s => s.status === 'Pending').length;
  
  // Calculate simulated monthly runrate
  const estimatedRevenue = students.reduce((acc, current) => {
    if (current.status !== 'Active') return acc;
    if (current.course === 'Monthly Plan') return acc + 3000;
    if (current.course === '3 Months Course') return acc + (8000 / 3); // Average monthly slice
    return acc;
  }, 0);

  const filteredStudents = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(studentSearch.toLowerCase()) || 
                          s.phone.includes(studentSearch) || 
                          s.email.toLowerCase().includes(studentSearch.toLowerCase());
    const matchesFilter = studentFilter === 'All' || s.status === studentFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-brand-primary text-white font-sans antialiased relative">
      {/* Background Decorative Layout Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20 pointer-events-none -z-50" />
      <div className="absolute top-0 left-0 w-full h-[6px] bg-[repeating-linear-gradient(45deg,#FCFF00_0,#FCFF00_15px,#000000_15px,#000000_30px)] z-50 pointer-events-none" />

      {/* Persistent Technical Status Notification Banner */}
      {systemNotification && (
        <div className={`fixed top-6 right-6 z-50 p-4 border-2 shadow-2xl flex items-center gap-3 backdrop-blur-md max-w-sm ${systemNotification.type === 'success' ? 'bg-black/90 border-brand-accent text-brand-accent' : 'bg-red-950/90 border-red-500 text-red-100'}`}>
          <Zap className="w-5 h-5 shrink-0 animate-bounce" />
          <div className="text-xs font-mono font-black uppercase tracking-wider">{systemNotification.text}</div>
        </div>
      )}

      {/* AUTH SCREEN FOR SECURITY GUARD */}
      {!isAuthenticated ? (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="absolute top-12 left-12 flex items-center gap-2">
            <Link href="/" className="inline-flex items-center gap-2 text-xs font-mono font-bold text-brand-muted hover:text-brand-accent transition-colors">
              <ArrowLeft className="w-4 h-4" /> [ BACK TO FIGHT LAB ]
            </Link>
          </div>

          <div className="w-full max-w-md p-6 sm:p-10 bg-brand-secondary border-2 border-brand-border hover:border-brand-accent/50 transition-colors duration-300 relative shadow-[10px_10px_0px_0px_#111111]">
            <div className="absolute top-0 right-0 py-2 px-3 text-[8px] font-mono text-brand-muted border-b border-l border-brand-border">
              SYSSEC_v1.0.8
            </div>

            <div className="mb-8 text-center sm:text-left">
              <div className="inline-flex p-3 rounded-full bg-brand-primary border border-brand-border text-brand-accent mb-4">
                <Shield className="w-6 h-6 animate-pulse" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-display font-black uppercase tracking-tight text-white mb-2">
                COACH <span className="text-brand-accent">CONSOLE</span>
              </h1>
              <p className="text-xs font-semibold text-brand-muted tracking-widest uppercase">
                INVICTUS ATHLETICS SECURITY PORTAL
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-brand-muted ml-1">
                  ADMIN PASSCODE / ROLE
                </label>
                <input 
                  type="password" 
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter Pin code (Default: 1234)"
                  className="w-full h-[48px] bg-brand-primary border border-brand-border text-center font-mono focus:border-brand-accent focus:outline-none text-white tracking-widest"
                  required
                />
              </div>

              {loginError && (
                <div className="p-3 bg-red-950/40 border border-red-500/50 text-red-200 text-xs font-mono font-bold flex items-center gap-2">
                  <CircleAlert className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{loginError}</span>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <button 
                  type="submit"
                  className="py-4 bg-brand-accent text-black font-black uppercase tracking-wider text-xs border border-transparent hover:bg-brand-accent-hover transition-colors min-h-[44px]"
                >
                  INITIALIZE
                </button>
                <button 
                  type="button"
                  onClick={handleBypass}
                  className="py-4 bg-brand-primary text-brand-muted font-bold font-mono uppercase tracking-wider text-[10px] border border-brand-border hover:text-white hover:border-white transition-colors min-h-[44px]"
                >
                  {"BYPASS // DEV"}
                </button>
              </div>
            </form>

            <div className="mt-8 pt-6 border-t border-brand-border text-center text-xs text-brand-muted leading-relaxed">
              *Designed for instant full-screen coaching workflows. Supports student registrations, schedules editing, and course structure setups.
            </div>
          </div>
        </div>
      ) : (
        /* ACTUAL LOGGED-IN ADMINISTRATIVE DASHBOARD PANEL */
        <div className="min-h-screen flex flex-col">
          {/* Dashboard Header */}
          <header className="border-b border-brand-border bg-brand-secondary px-4 sm:px-6 relative">
            <div className="container max-w-7xl mx-auto h-20 sm:h-24 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Link href="/" className="p-2 border border-brand-border hover:bg-brand-primary hover:border-brand-accent text-brand-muted hover:text-brand-accent transition-all rounded-lg shrink-0">
                  <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-lg sm:text-xl font-display font-black text-white uppercase tracking-tight">
                      COACH CONSOLE <span className="text-brand-accent">.</span>
                    </h1>
                    <span className="hidden sm:inline bg-brand-accent/10 border border-brand-accent/25 px-2 py-0.5 text-[8px] font-mono text-brand-accent font-black tracking-widest uppercase">
                      ACTIVE SESSION
                    </span>
                  </div>
                  <div className="text-[10px] font-mono font-bold text-brand-muted uppercase tracking-wider hidden sm:block">
                    INVICTUS BJJ, BOXING & MMA DHAKA
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button 
                  onClick={handleLogout}
                  className="px-4 py-2 sm:px-5 sm:py-2.5 bg-brand-primary border border-brand-border hover:border-red-500 hover:text-red-400 font-mono text-[10px] font-black uppercase tracking-widest rounded-lg transition-colors cursor-pointer"
                >
                  SECURE_EXIT
                </button>
              </div>
            </div>
          </header>

          {/* Quick Metrics Overview Row */}
          <section className="bg-black/60 border-b border-brand-border py-6 px-4">
            <div className="container max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-brand-secondary/40 border border-brand-border flex items-center gap-4 hover:border-brand-accent/20 transition-colors">
                <div className="p-3 bg-brand-accent/5 ring-1 ring-brand-accent/10 text-brand-accent rounded-xl hidden sm:block">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[9px] font-mono font-extrabold text-brand-muted uppercase tracking-widest">Total Students Logged</div>
                  <div className="text-2xl font-display font-black text-white leading-none mt-1">{totalLeads} <span className="text-xs text-brand-muted">MMA/BJJ</span></div>
                </div>
              </div>

              <div className="p-4 bg-brand-secondary/40 border border-brand-border flex items-center gap-4 hover:border-brand-accent/20 transition-colors">
                <div className="p-3 bg-brand-accent/5 ring-1 ring-brand-accent/10 text-brand-accent rounded-xl hidden sm:block">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[9px] font-mono font-extrabold text-brand-muted uppercase tracking-widest">Enrolled / Active</div>
                  <div className="text-2xl font-display font-black text-[#52fa7c] leading-none mt-1">{activeStudentsCount} <span className="text-xs text-brand-muted">Approved</span></div>
                </div>
              </div>

              <div className="p-4 bg-brand-secondary/40 border border-brand-border flex items-center gap-4 hover:border-brand-accent/20 transition-colors">
                <div className="p-3 bg-brand-accent/5 ring-1 ring-brand-accent/10 text-brand-accent rounded-xl hidden sm:block">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[9px] font-mono font-extrabold text-brand-muted uppercase tracking-widest">Pending Review</div>
                  <div className="text-2xl font-display font-black text-amber-400 leading-none mt-1">{pendingStudentsCount} <span className="text-xs text-brand-muted">New Leads</span></div>
                </div>
              </div>

              <div className="p-4 bg-brand-secondary/40 border border-brand-border flex items-center gap-4 hover:border-brand-accent/20 transition-colors">
                <div className="p-3 bg-brand-accent/5 ring-1 ring-brand-accent/10 text-brand-accent rounded-xl hidden sm:block">
                  <DollarSign className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[9px] font-mono font-extrabold text-brand-muted uppercase tracking-widest">Est. Monthly Revenue</div>
                  <div className="text-2xl font-display font-black text-brand-accent leading-none mt-1">৳ {estimatedRevenue.toLocaleString()}</div>
                </div>
              </div>
            </div>
          </section>

          {/* Interactive Navigation Tabs for Dashboard Options */}
          <section className="bg-brand-secondary border-b border-brand-border/60 sticky top-0 z-30">
            <div className="container max-w-7xl mx-auto px-4 sm:px-6">
              <div className="flex whitespace-nowrap overflow-x-auto gap-1 sm:gap-4 py-3 justify-start sm:justify-start">
                <button 
                  onClick={() => setActiveTab('students')}
                  className={`px-4 py-3 text-xs font-mono font-black uppercase tracking-widest border-b-2 transition-all cursor-pointer min-h-[44px] ${activeTab === 'students' ? 'border-brand-accent text-brand-accent bg-white/5' : 'border-transparent text-brand-muted hover:text-white'}`}
                >
                  🏹 ATHLETE LEADS ({students.length})
                </button>
                <button 
                  onClick={() => setActiveTab('schedule')}
                  className={`px-4 py-3 text-xs font-mono font-black uppercase tracking-widest border-b-2 transition-all cursor-pointer min-h-[44px] ${activeTab === 'schedule' ? 'border-brand-accent text-brand-accent bg-white/5' : 'border-transparent text-brand-muted hover:text-white'}`}
                >
                  📅 WEEKLY SCHEDULE
                </button>
                <button 
                  onClick={() => setActiveTab('pricing')}
                  className={`px-4 py-3 text-xs font-mono font-black uppercase tracking-widest border-b-2 transition-all cursor-pointer min-h-[44px] ${activeTab === 'pricing' ? 'border-brand-accent text-brand-accent bg-white/5' : 'border-transparent text-brand-muted hover:text-white'}`}
                >
                  💎 CONFIGURE PLANS
                </button>
                <button 
                  onClick={() => setActiveTab('inquiries')}
                  className={`px-4 py-3 text-xs font-mono font-black uppercase tracking-widest border-b-2 transition-all cursor-pointer min-h-[44px] ${activeTab === 'inquiries' ? 'border-brand-accent text-brand-accent bg-white/5' : 'border-transparent text-brand-muted hover:text-white'}`}
                >
                  📨 CLIENT INBOX ({inquiries.filter(i => !i.read).length})
                </button>
              </div>
            </div>
          </section>

          {/* Core Content Body depending on active tab status */}
          <main className="flex-1 container max-w-7xl mx-auto py-8 px-4 sm:px-6">

            {/* TAB 1: STUDENTS / LEADS MANAGEMENT */}
            {activeTab === 'students' && (
              <div className="space-y-8">
                {/* Responsive Setup Grid */}
                <div className="grid lg:grid-cols-12 gap-8 items-start">
                  {/* Left sub-column: Add student manual form */}
                  <div className="lg:col-span-4 p-5 sm:p-6 bg-brand-secondary border border-brand-border rounded-2xl relative">
                    <h2 className="text-sm font-black uppercase tracking-widest text-white border-b border-brand-border pb-4 mb-5 flex items-center gap-2">
                      <UserPlus className="w-4 h-4 text-brand-accent" /> REGISTER NEW ATHLETE
                    </h2>
                    
                    <form onSubmit={handleAddStudent} className="space-y-4 font-mono text-xs">
                      <div className="space-y-1.5">
                        <label className="text-brand-muted uppercase font-bold tracking-wider">Full Name *</label>
                        <input 
                          type="text" 
                          value={newStudent.name}
                          onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                          placeholder="e.g. Shakib Al Hasan"
                          className="w-full bg-brand-primary border border-brand-border p-3 rounded-lg text-white font-sans text-sm focus:border-brand-accent focus:outline-none"
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-brand-muted uppercase font-bold tracking-wider">Contact Phone *</label>
                        <input 
                          type="text" 
                          value={newStudent.phone}
                          onChange={(e) => setNewStudent({...newStudent, phone: e.target.value})}
                          placeholder="e.g. 017-XXXX-XXXX"
                          className="w-full bg-brand-primary border border-brand-border p-3 rounded-lg text-white focus:border-brand-accent focus:outline-none"
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-brand-muted uppercase font-bold tracking-wider">Email Address</label>
                        <input 
                          type="email" 
                          value={newStudent.email}
                          onChange={(e) => setNewStudent({...newStudent, email: e.target.value})}
                          placeholder="e.g. fighter@gmail.com"
                          className="w-full bg-brand-primary border border-brand-border p-3 rounded-lg text-white font-sans focus:border-brand-accent focus:outline-none"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3.5">
                        <div className="space-y-1.5">
                          <label className="text-brand-muted uppercase font-bold tracking-wider">Target Course</label>
                          <select 
                            value={newStudent.course}
                            onChange={(e) => setNewStudent({...newStudent, course: e.target.value})}
                            className="w-full bg-brand-primary border border-brand-border p-3 rounded-lg text-white font-sans focus:border-brand-accent focus:outline-none h-[44px]"
                          >
                            <option value="3 Months Course">3 Months Core</option>
                            <option value="Monthly Plan">Monthly Plan</option>
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-brand-muted uppercase font-bold tracking-wider">Initial Status</label>
                          <select 
                            value={newStudent.status}
                            onChange={(e) => setNewStudent({...newStudent, status: e.target.value})}
                            className="w-full bg-brand-primary border border-brand-border p-3 rounded-lg text-white font-sans focus:border-brand-accent focus:outline-none h-[44px]"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Active">Active</option>
                            <option value="Canceled">Canceled</option>
                          </select>
                        </div>
                      </div>
                      
                      <button 
                        type="submit"
                        className="w-full py-3.5 mt-2 bg-brand-accent text-black font-black uppercase tracking-wider rounded-xl hover:bg-brand-accent-hover transition-colors min-h-[44px] cursor-pointer"
                      >
                        LOG RECRUIT
                      </button>
                    </form>
                  </div>

                  {/* Right sub-column: Students list table & responsive deck */}
                  <div className="lg:col-span-8 space-y-4">
                    {/* Filter and Search Bar */}
                    <div className="p-4 bg-brand-secondary border border-brand-border rounded-2xl flex flex-col sm:flex-row gap-3 justify-between items-center">
                      <div className="relative w-full sm:max-w-xs">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
                        <input 
                          type="text" 
                          placeholder="Search athletes (name, phone, mail)..."
                          value={studentSearch}
                          onChange={(e) => setStudentSearch(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 bg-brand-primary border border-brand-border rounded-xl text-xs text-white focus:border-brand-accent focus:outline-none"
                        />
                      </div>

                      <div className="flex gap-2 w-full sm:w-auto overflow-x-auto select-none">
                        {['All', 'Active', 'Pending', 'Canceled'].map((filterVal) => (
                          <button
                            key={filterVal}
                            onClick={() => setStudentFilter(filterVal)}
                            className={`px-3 py-1.5 font-mono text-[10px] font-black uppercase tracking-wider rounded-lg border transition-colors cursor-pointer min-h-[36px] ${studentFilter === filterVal ? 'bg-brand-accent text-black border-brand-accent' : 'bg-brand-primary border-brand-border text-brand-muted hover:text-white'}`}
                          >
                            {filterVal}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Desktop & Tablet Table view (Hidden on mobile) */}
                    <div className="hidden md:block overflow-hidden bg-brand-secondary border border-brand-border rounded-2xl">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-black/40 border-b border-brand-border text-brand-muted text-[10px] font-mono font-black uppercase tracking-widest">
                            <th className="p-4">ATHLETE DETAILS</th>
                            <th className="p-4">CONTACTS</th>
                            <th className="p-4">PLAN / COURSE</th>
                            <th className="p-4">STATUS</th>
                            <th className="p-4 text-right">OPERATIONS</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-brand-border/40 text-sm">
                          {filteredStudents.length === 0 ? (
                            <tr>
                              <td colSpan={5} className="p-12 text-center text-brand-muted font-mono text-xs font-semibold">
                                {"// No athlete booking matched search parameters"}
                              </td>
                            </tr>
                          ) : (
                            filteredStudents.map((athlete) => (
                              <tr key={athlete.id} className="hover:bg-brand-border/10 transition-colors">
                                <td className="p-4">
                                  <div className="font-bold text-white text-base leading-tight">{athlete.name}</div>
                                  <div className="text-[10px] text-brand-muted font-mono mt-1 uppercase">Enrolled: {athlete.enrolledDate}</div>
                                </td>
                                <td className="p-4 py-3">
                                  <div className="font-mono text-xs text-brand-muted">{athlete.phone}</div>
                                  <div className="text-xs text-brand-muted/70">{athlete.email}</div>
                                </td>
                                <td className="p-4">
                                  <span className="px-2.5 py-1 text-xs font-bold rounded-md bg-brand-primary border border-brand-border">
                                    {athlete.course}
                                  </span>
                                </td>
                                <td className="p-4">
                                  <button
                                    onClick={() => handleToggleStudentStatus(athlete.id, athlete.status)}
                                    className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all border ${
                                      athlete.status === 'Active' ? 'bg-[#52fa7c]/10 text-[#2ee159] border-[#2ee159]/30' :
                                      athlete.status === 'Pending' ? 'bg-amber-400/10 text-amber-400 border-amber-400/30' :
                                      'bg-red-500/10 text-red-500 border-red-500/30'
                                    }`}
                                  >
                                    ● {athlete.status}
                                  </button>
                                </td>
                                <td className="p-4 text-right">
                                  <button 
                                    onClick={() => handleDeleteStudent(athlete.id, athlete.name)}
                                    className="p-2.5 rounded-lg border border-brand-border hover:bg-red-500/10 hover:border-red-500 hover:text-red-500 transition-colors text-brand-muted group cursor-pointer"
                                    aria-label="Delete Student"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>

                    {/* Mobile Card Deck View (Exclusively rendered on Mobile layout) */}
                    <div className="md:hidden space-y-4">
                      {filteredStudents.length === 0 ? (
                        <div className="p-12 text-center text-brand-muted bg-brand-secondary border border-brand-border rounded-xl font-mono text-xs font-semibold">
                          {"// No recruiting matches in criteria"}
                        </div>
                      ) : (
                        filteredStudents.map((athlete) => (
                          <div key={athlete.id} className="p-5 bg-brand-secondary border border-brand-border rounded-2xl space-y-4 relative">
                            <div className="flex justify-between items-start gap-4">
                              <div>
                                <h3 className="font-bold text-white text-base leading-tight">{athlete.name}</h3>
                                <div className="text-[9px] text-brand-muted font-mono mt-0.5 uppercase">JOINED: {athlete.enrolledDate}</div>
                              </div>
                              <button
                                onClick={() => handleToggleStudentStatus(athlete.id, athlete.status)}
                                className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider border shrink-0 ${
                                  athlete.status === 'Active' ? 'bg-[#52fa7c]/10 text-[#2ee159] border-[#52fa7c]/30' :
                                  athlete.status === 'Pending' ? 'bg-amber-400/10 text-amber-400 border-amber-400/30' :
                                  'bg-red-500/10 text-red-500 border-red-500/30'
                                }`}
                              >
                                ● {athlete.status}
                              </button>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-xs bg-brand-primary/50 p-3 border border-brand-border/40 font-mono">
                              <div>
                                <div className="text-[8px] text-brand-muted uppercase tracking-widest mb-0.5">[ PHONE ]</div>
                                <div className="text-white font-bold">{athlete.phone}</div>
                              </div>
                              <div>
                                <div className="text-[8px] text-brand-muted uppercase tracking-widest mb-0.5">[ COURSE KEY ]</div>
                                <div className="text-brand-accent font-bold truncate">{athlete.course}</div>
                              </div>
                              <div className="col-span-2 border-t border-brand-border/40 pt-2">
                                <div className="text-[8px] text-brand-muted uppercase tracking-widest mb-0.5">[ EMAIL ]</div>
                                <div className="text-white font-sans truncate">{athlete.email}</div>
                              </div>
                            </div>

                            <div className="flex gap-2">
                              <button 
                                onClick={() => handleToggleStudentStatus(athlete.id, athlete.status)}
                                className="flex-1 py-2.5 bg-brand-primary border border-brand-border text-[10px] font-mono leading-none tracking-wider font-extrabold text-white text-center rounded-xl hover:bg-neutral-900 focus:outline-none min-h-[44px]"
                              >
                                TOGGLE STATUS
                              </button>
                              <button 
                                onClick={() => handleDeleteStudent(athlete.id, athlete.name)}
                                className="w-11 h-11 bg-brand-primary border border-brand-border flex items-center justify-center text-brand-muted hover:text-red-500 hover:border-red-500 rounded-xl transition-colors min-h-[44px] min-w-[44px]"
                                aria-label="Delete Athlete"
                              >
                                <Trash2 className="w-4.5 h-4.5" />
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: WEEKLY SCHEDULE MANAGER */}
            {activeTab === 'schedule' && (
              <div className="grid lg:grid-cols-12 gap-10 items-start">
                {/* Left Form Column: Add timing item */}
                <div className="lg:col-span-4 p-5 sm:p-6 bg-brand-secondary border border-brand-border rounded-2xl">
                  <h2 className="text-sm font-black uppercase tracking-widest text-white border-b border-brand-border pb-4 mb-5 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-brand-accent" /> ADD SESSION RECORD
                  </h2>

                  <form onSubmit={handleAddClass} className="space-y-4 font-mono text-xs">
                    <div className="space-y-1.5">
                      <label className="text-brand-muted uppercase font-bold tracking-wider">Day of the Week</label>
                      <select 
                        value={selectedDay}
                        onChange={(e) => setSelectedDay(e.target.value)}
                        className="w-full bg-brand-primary border border-brand-border p-3 rounded-lg text-white font-sans focus:outline-none focus:border-brand-accent h-[44px]"
                      >
                        <option value="Saturday">Saturday</option>
                        <option value="Sunday">Sunday</option>
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-brand-muted uppercase font-bold tracking-wider">Session Time Frame</label>
                      <input 
                        type="text" 
                        value={newClassTime}
                        onChange={(e) => setNewClassTime(e.target.value)}
                        placeholder="e.g. 5:30 - 7:00 PM"
                        className="w-full bg-brand-primary border border-brand-border p-3 rounded-lg text-white font-sans text-sm focus:outline-none focus:border-brand-accent"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-brand-muted uppercase font-bold tracking-wider">Activity / Training Module</label>
                      <input 
                        type="text" 
                        value={newClassActivity}
                        onChange={(e) => setNewClassActivity(e.target.value)}
                        placeholder="e.g. MMA / Tactical Muay Thai"
                        className="w-full bg-brand-primary border border-brand-border p-3 rounded-lg text-white font-sans text-sm focus:outline-none focus:border-brand-accent"
                        required
                      />
                    </div>

                    <button 
                      type="submit"
                      className="w-full py-3.5 bg-brand-accent text-black font-black uppercase tracking-wider rounded-xl hover:bg-brand-accent-hover transition-colors min-h-[44px] cursor-pointer"
                    >
                      PUSH TO SCHEDULE
                    </button>
                  </form>
                </div>

                {/* Right Column: Weekly Breakdown List */}
                <div className="lg:col-span-8 space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold uppercase text-white">Current Active Timetable</h3>
                      <p className="text-xs text-brand-muted font-mono mt-1">{"// Persists dynamically to homepage display components"}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {scheduleData.length === 0 ? (
                      <p className="p-8 text-center text-xs text-brand-muted border-2 border-brand-border border-dashed font-mono uppercase">
                        No scheduled class hours set in panel.
                      </p>
                    ) : (
                      scheduleData.map((dayGroup) => (
                        <div key={dayGroup.day} className="p-5 bg-brand-secondary border border-brand-border rounded-2xl space-y-3">
                          <div className="font-display font-black text-white text-base border-b border-brand-border/40 pb-2 flex justify-between items-center text-brand-accent uppercase tracking-wider">
                            <span>{dayGroup.day}</span>
                            <span className="text-[9px] font-mono font-bold text-brand-muted tracking-widest">{"// Weekly Hour"}</span>
                          </div>

                          <div className="divide-y divide-brand-border/20">
                            {dayGroup.classes.map((cls) => (
                              <div key={cls.id} className="flex items-center justify-between py-3 hover:bg-white/2 animate-fade">
                                <div className="flex gap-4 items-center">
                                  <div className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
                                  <div>
                                    <div className="text-xs font-mono text-brand-muted leading-none">{cls.time}</div>
                                    <div className="text-sm font-bold text-white mt-1">{cls.activity}</div>
                                  </div>
                                </div>
                                <button
                                  onClick={() => handleDeleteClass(dayGroup.day, cls.id)}
                                  className="p-2 border border-brand-border text-brand-muted hover:text-red-500 hover:border-red-500 rounded-lg transition-all min-w-[36px] min-h-[36px] flex items-center justify-center cursor-pointer"
                                  title="Remove session"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: COURSE PLANS & PRICING CONFIGURATION */}
            {activeTab === 'pricing' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-bold uppercase text-white">Training Plans Structure</h3>
                  <p className="text-xs text-brand-muted font-mono mt-1">{"// Dynamically handles pricing levels, ribbons, and lists layout."}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-start">
                  {pricingData.map((plan) => (
                    <div 
                      key={plan.id}
                      className={`p-6 border-2 rounded-2xl bg-brand-secondary relative space-y-6 ${
                        plan.highlight ? 'border-brand-accent' : 'border-brand-border'
                      }`}
                    >
                      {editingPlanId === plan.id ? (
                        /* EDITOR EXPANDED CONTROLS FORM */
                        <div className="space-y-4 font-mono text-xs">
                          <div className="flex gap-2">
                            <span className="px-2 py-1 bg-brand-accent text-black font-mono uppercase font-black tracking-widest text-[8px]">
                              EDITING FORM
                            </span>
                            <span className="text-white/80 font-bold">{plan.title}</span>
                          </div>

                          <div className="grid grid-cols-2 gap-3 pb-2 border-b border-brand-border/40">
                            <div className="space-y-1.5">
                              <label className="text-brand-muted uppercase tracking-wider font-bold">Plan Name</label>
                              <input 
                                type="text"
                                value={editingPlanForm.title}
                                onChange={(e) => setEditingPlanForm({...editingPlanForm, title: e.target.value})}
                                className="w-full bg-brand-primary border border-brand-border p-2 rounded-lg font-sans text-sm focus:outline-none"
                              />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-brand-muted uppercase tracking-wider font-bold">Price Level</label>
                              <input 
                                type="text"
                                value={editingPlanForm.price}
                                onChange={(e) => setEditingPlanForm({...editingPlanForm, price: e.target.value})}
                                className="w-full bg-brand-primary border border-brand-border p-2 rounded-lg font-sans text-sm focus:outline-none text-brand-accent"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-3 mb-2">
                            <div className="space-y-1.5">
                              <label className="text-brand-muted uppercase tracking-wider font-bold">Strikeout Price</label>
                              <input 
                                type="text"
                                value={editingPlanForm.originalPrice}
                                onChange={(e) => setEditingPlanForm({...editingPlanForm, originalPrice: e.target.value})}
                                placeholder="Optional"
                                className="w-full bg-brand-primary border border-brand-border p-2 rounded-lg font-sans text-sm focus:outline-none"
                              />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-brand-muted uppercase tracking-wider font-bold">Badge Ribbons</label>
                              <input 
                                type="text"
                                value={editingPlanForm.badge}
                                onChange={(e) => setEditingPlanForm({...editingPlanForm, badge: e.target.value})}
                                placeholder="e.g. Best Value, Hot"
                                className="w-full bg-brand-primary border border-brand-border p-2 rounded-lg font-sans text-sm focus:outline-none"
                              />
                            </div>
                          </div>

                          <div className="flex items-center gap-3 py-2 bg-brand-primary border border-brand-border p-3 rounded-lg select-none">
                            <input 
                              type="checkbox"
                              id={`hl-${plan.id}`}
                              checked={editingPlanForm.highlight}
                              onChange={(e) => setEditingPlanForm({...editingPlanForm, highlight: e.target.checked})}
                              className="w-4.5 h-4.5 rounded text-brand-accent accent-brand-accent shrink-0"
                            />
                            <label htmlFor={`hl-${plan.id}`} className="font-bold text-white uppercase cursor-pointer">
                              Highlight on Landing Page
                            </label>
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-brand-muted uppercase tracking-wider font-bold">
                              Features (One Line Per Bullet)
                            </label>
                            <textarea 
                              rows={5}
                              value={editingPlanForm.features}
                              onChange={(e) => setEditingPlanForm({...editingPlanForm, features: e.target.value})}
                              placeholder="Bullet Points..."
                              className="w-full bg-brand-primary border border-brand-border p-3 rounded-lg font-sans text-sm tracking-normal focus:outline-none"
                            />
                          </div>

                          <div className="flex gap-2">
                            <button
                              onClick={() => saveEditedPlan(plan.id)}
                              className="flex-1 py-3 bg-brand-accent text-black font-black uppercase text-xs rounded-xl flex items-center justify-center gap-2 hover:bg-brand-accent-hover transition-colors min-h-[44px] cursor-pointer"
                            >
                              <Save className="w-4 h-4" /> SAVE CONFIG
                            </button>
                            <button
                              onClick={() => setEditingPlanId(null)}
                              className="px-4 py-3 bg-brand-primary border border-brand-border text-brand-muted hover:text-white font-mono text-xs rounded-xl min-h-[44px] cursor-pointer"
                            >
                              CANCEL
                            </button>
                          </div>
                        </div>
                      ) : (
                        /* CURRENT VALUE PREVIEW VIEW CARD */
                        <div className="space-y-6">
                          <div className="flex justify-between items-start">
                            <div>
                              {plan.badge && (
                                <span className="inline-block px-2.5 py-0.5 bg-brand-accent text-black font-mono font-black uppercase text-[8px] tracking-widest rounded-full mb-3">
                                  {plan.badge}
                                </span>
                              )}
                              <h4 className="text-xl font-display font-black text-white uppercase tracking-tight">{plan.title}</h4>
                            </div>

                            <button 
                              onClick={() => startEditingPlan(plan)}
                              className="p-2.5 border border-brand-border text-brand-muted hover:text-brand-accent hover:border-brand-accent rounded-lg transition-all flex items-center justify-center gap-1.5 min-w-[36px] min-h-[36px] uppercase font-mono text-[9px] font-black tracking-widest cursor-pointer"
                            >
                              <Edit3 className="w-3.5 h-3.5" /> EDIT_FMT
                            </button>
                          </div>

                          <div className="flex items-baseline gap-2">
                            {plan.originalPrice && (
                              <span className="text-sm line-through text-brand-muted font-bold">{plan.originalPrice}</span>
                            )}
                            <span className="text-3xl font-display font-black text-brand-accent">{plan.price}</span>
                            <span className="text-xs text-brand-muted uppercase font-bold">/ Course</span>
                          </div>

                          <ul className="space-y-3 pt-4 border-t border-brand-border/40 text-sm">
                            {plan.features.map((feature, fIdx) => (
                              <li key={fIdx} className="flex items-center gap-2.5 text-brand-muted">
                                <CheckCircle2 className="w-4 h-4 text-brand-accent shrink-0" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>

                          {plan.highlight && (
                            <div className="p-3 bg-brand-accent/5 border border-brand-accent/20 rounded-xl text-center text-brand-accent/90 text-[10px] font-mono uppercase font-black tracking-widest">
                              ⭐ Visual Showcase Target
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: CLIENT CONTACT INBOX */}
            {activeTab === 'inquiries' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold uppercase text-white">Client Inquiry Messages</h3>
                  <p className="text-xs text-brand-muted font-mono mt-1">{"// Submissions generated from homepage contact module input queries."}</p>
                </div>

                <div className="space-y-4">
                  {inquiries.length === 0 ? (
                    <div className="p-16 text-center text-sm font-mono uppercase text-brand-muted bg-brand-secondary border border-brand-border border-dashed rounded-2xl">
                      {"// No contact inquiries logged in mailbox"}
                    </div>
                  ) : (
                    inquiries.map((inq) => (
                      <div 
                        key={inq.id}
                        className={`p-5 sm:p-6 bg-brand-secondary border rounded-2xl space-y-4 transition-all relative ${
                          inq.read ? 'border-brand-border' : 'border-brand-accent shadow-lg shadow-brand-accent/5'
                        }`}
                      >
                        {!inq.read && (
                          <div className="absolute top-4 right-4 bg-brand-accent text-black font-mono font-black text-[9px] uppercase tracking-widest px-2 py-0.5 rounded">
                            UNREAD
                          </div>
                        )}

                        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-brand-border/30 pb-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-white text-base">{inq.name}</span>
                              <span className="text-[10px] font-mono text-brand-muted uppercase">({inq.date})</span>
                            </div>
                            <div className="text-xs text-brand-muted font-mono mt-0.5">{inq.email}</div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              onClick={() => handleToggleInquiryRead(inq.id)}
                              className={`px-3 py-1.5 font-mono text-[9px] font-black uppercase tracking-wider rounded-lg border transition-colors cursor-pointer min-h-[32px] ${
                                inq.read ? 'bg-brand-primary border-brand-border text-brand-muted hover:text-white' : 'bg-brand-accent/10 border-brand-accent text-brand-accent hover:bg-brand-accent/20'
                              }`}
                            >
                              {inq.read ? 'MARK_UNREAD' : 'MARK_READ'}
                            </button>
                            
                            <button
                              onClick={() => handleDeleteInquiry(inq.id)}
                              className="p-2 border border-brand-border text-brand-muted hover:text-red-500 hover:border-red-500 rounded-lg transition-colors min-w-[32px] min-h-[32px] flex items-center justify-center cursor-pointer"
                              title="Delete Message"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <p className="text-sm text-brand-muted leading-relaxed font-sans bg-brand-primary/40 border border-brand-border/20 p-4 rounded-xl italic">
                          &ldquo;{inq.message}&rdquo;
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

          </main>

          {/* Footer of console */}
          <footer className="py-6 border-t border-brand-border bg-brand-secondary text-center text-xs font-mono text-brand-muted">
            <div className="container max-w-7xl mx-auto px-4">
              <span>ADMIN CONSOLE ENG // COMPILABLE // FULL-STACK LOCAL SIMULATION ENG</span>
            </div>
          </footer>
        </div>
      )}
    </div>
  );
}
