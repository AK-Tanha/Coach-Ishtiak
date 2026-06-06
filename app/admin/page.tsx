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
  Briefcase,
  Menu,
  X,
  ShoppingBag,
  Package
} from 'lucide-react';
import { auth as authApi, students as studentsApi, schedule as scheduleApi, pricing as pricingApi, inquiries as inquiriesApi, products as productsApi, orders as ordersApi, experience as experienceApi, content as contentApi } from '@/lib/api';

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
  { id: "st-1", name: "Tanvir Rahman", email: "tanvir@gmail.com", phone: "01711223344", course: "3 Months Course", status: "Active", enrolledDate: "2026-05-10", image: "https://picsum.photos/seed/tanvir/800/800" },
  { id: "st-2", name: "Fahim Ahmed", email: "fahim.ah@gmail.com", phone: "01822445566", course: "Monthly Plan", status: "Pending", enrolledDate: "2026-05-18", image: "https://picsum.photos/seed/fahim/800/800" },
  { id: "st-3", name: "Imtiaz Hassan", email: "imtiaz@hassan.info", phone: "01677338899", course: "3 Months Course", status: "Active", enrolledDate: "2026-04-12", image: "" },
  { id: "st-4", name: "Anika Bushra", email: "anika.bushra@outlook.com", phone: "01944112233", course: "3 Months Course", status: "Active", enrolledDate: "2026-05-02", image: "" },
  { id: "st-5", name: "Raihan Kabir", email: "raihan@kabir.net", phone: "01588667744", course: "Monthly Plan", status: "Canceled", enrolledDate: "2026-05-15", image: "" }
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

const defaultProducts = [
  {
    id: 1,
    name: "Invictus Elite Boxing Gloves",
    price: 89.99,
    category: "Equipment",
    image: "https://picsum.photos/seed/gloves/800/800",
    rating: 4.9,
    description: "Professional grade leather gloves used by Coach Ishtiaq in training sessions."
  },
  {
    id: 2,
    name: "WBC Referee Commemorative Tee",
    price: 34.99,
    category: "Apparel",
    image: "https://picsum.photos/seed/shirt/800/800",
    rating: 4.8,
    description: "Limited edition t-shirt celebrating Bangladesh's first WBC referee."
  },
  {
    id: 3,
    name: "Invictus MMA Shinguards",
    price: 59.99,
    category: "Equipment",
    image: "https://picsum.photos/seed/shinguard/800/800",
    rating: 4.7,
    description: "Triple-density foam for maximum protection during sparring."
  }
];

const defaultHeroSettings = {
  badge: "REGISTRATION OPEN • ELITE DIVISION",
  subheading: "MASTERING THE",
  title: "ART OF COMBAT",
  name: "COACH ISHTIAK",
  description: "A Coach, A Student & An Athlete. Over a decade forging champions in MMA, BJJ, and Boxing. Founder of core combat sport institutions in Bangladesh.",
  images: [
    {
      url: "https://picsum.photos/seed/coach-ishtiaq/1000/1000",
      caption: "First WBC Referee BD",
      title: "BANGLADESH"
    },
    {
      url: "https://picsum.photos/seed/mma-training-1/1000/1000",
      caption: "Head Coach",
      title: "INVICTUS"
    },
    {
      url: "https://picsum.photos/seed/boxing-match-1/1000/1000",
      caption: "Founder",
      title: "BMMAA"
    }
  ]
};

const defaultAboutSettings = {
  badge: "PROFILE • LEAD COACH",
  heading: "Philosophy",
  subheading: "Building champions inside and outside the cage.",
  para1: "Recognized as Bangladesh's first WBC-certified boxing referee, my journey has been defined by a relentless pursuit of excellence and the development of combat sports on a national level. As the Founder and General Secretary of the Bangladesh Mixed Martial Arts Association (BMMAA), I have pioneered the first organized MMA events in our nation.",
  para2: "My coaching methodology combines technical precision with mental fortitude. From tactical boxing instructions for the Bangladesh Army to leading high-performance training at Invictus BJJ, I focus on the holistic development of my athletes.",
  image: "https://picsum.photos/seed/coach-ishtiaq/800/1000"
};

const defaultExperience = [
  {
    id: "exp-1",
    role: "Owner / Head Coach",
    company: "Xtreme MMA",
    period: "2014 - Present",
    description: "Driving elite combat sports training and organizational growth since inception."
  },
  {
    id: "exp-2",
    role: "Owner / Head Coach",
    company: "Invictus BJJ & MMA",
    period: "2018 - Present",
    description: "Leading a premier academy for Brazilian Jiu-Jitsu and Mixed Martial Arts in Bangladesh."
  },
  {
    id: "exp-3",
    role: "Boxing Coach",
    company: "Bangladesh Army",
    period: "February 1, 2021 - Present",
    description: "Providing tactical boxing instructions and training for military personnel."
  },
  {
    id: "exp-4",
    role: "Professional Boxing Referee",
    company: "World Boxing Council (WBC)",
    period: "September 8, 2022 - Present",
    description: "WBC Ring Official Panel registered and certified as an Official Referee Level 1."
  },
  {
    id: "exp-5",
    role: "Official / Assistant Coach",
    company: "Bangladesh Amateur Boxing Federation",
    period: "2018 - 2025",
    description: "Former Assistant Coach (March 2018) and continues contributing to national boxing development."
  },
  {
    id: "exp-6",
    role: "Fighter Manager",
    company: "One Warrior Series",
    period: "2018",
    description: "Managed professional fighters in Singapore for the One Warrior Series."
  },
  {
    id: "exp-7",
    role: "Fighter Manager",
    company: "ONE Championship",
    period: "2017",
    description: "Managed professional athletes for ONE Championship in Bangkok, Thailand."
  },
  {
    id: "exp-8",
    role: "Second (Cornerman)",
    company: "ONE Championship",
    period: "2016",
    description: "Served as a professional seconds/cornerman in Myanmar events."
  }
];

const ImageUploader = ({ 
  value, 
  onChange, 
  id 
}: { 
  value: string; 
  onChange: (base64: string) => void; 
  id: string;
}) => {
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-1.5">
      <label className="text-brand-muted font-bold tracking-wider uppercase text-[10px]">Upload Image File</label>
      <div 
        onClick={() => fileInputRef.current?.click()}
        className="border border-dashed border-brand-border hover:border-brand-accent/55 bg-brand-primary p-3 rounded-xl flex flex-col items-center justify-center cursor-pointer min-h-[70px] transition-all group"
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          id={id}
          accept="image/*" 
          className="hidden" 
          onChange={handleFileChange} 
        />
        {value ? (
          <div className="flex items-center gap-3 w-full">
            <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-brand-border bg-brand-primary">
              <img src={value} alt="Preview" className="object-cover w-full h-full" />
            </div>
            <div className="text-left text-[11px] text-brand-muted truncate flex-1 leading-normal">
              Image loaded successfully. Click to replace.
            </div>
            <button 
              type="button" 
              onClick={(e) => { e.stopPropagation(); onChange(''); }}
              className="text-red-400 hover:text-red-500 font-mono text-[9px] uppercase tracking-wider font-bold cursor-pointer"
            >
              Clear
            </button>
          </div>
        ) : (
          <div className="text-center group-hover:text-brand-accent transition-colors">
            <Plus className="w-4 h-4 text-brand-muted group-hover:text-brand-accent mx-auto mb-1 animate-pulse" />
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#cbcbcb]">Select file or Drag here</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [authLoading, setAuthLoading] = React.useState(true);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loginError, setLoginError] = React.useState('');
  
  // Dashboard states
  const [activeTab, setActiveTab ] = React.useState<'students' | 'schedule' | 'pricing' | 'inquiries' | 'products' | 'orders' | 'content' | 'experience'>('students');
  const [athleteSubTab, setAthleteSubTab] = React.useState<'list' | 'form'>('list');
  const [productSubTab, setProductSubTab] = React.useState<'list' | 'form'>('list');
  const [experienceSubTab, setExperienceSubTab] = React.useState<'list' | 'form'>('list');
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

  const [products, setProducts] = React.useState<any[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('invictus_products');
      return stored ? JSON.parse(stored) : defaultProducts;
    }
    return defaultProducts;
  });

  const [experienceData, setExperienceData] = React.useState<any[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('invictus_experience');
      return stored ? JSON.parse(stored) : defaultExperience;
    }
    return defaultExperience;
  });

  const [heroSettings, setHeroSettings] = React.useState<typeof defaultHeroSettings>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('invictus_hero_settings');
      return stored ? JSON.parse(stored) : defaultHeroSettings;
    }
    return defaultHeroSettings;
  });

  const [aboutSettings, setAboutSettings] = React.useState<typeof defaultAboutSettings>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('invictus_about_settings');
      return stored ? JSON.parse(stored) : defaultAboutSettings;
    }
    return defaultAboutSettings;
  });

  const [heroForm, setHeroForm] = React.useState<typeof defaultHeroSettings>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('invictus_hero_settings');
      return stored ? JSON.parse(stored) : defaultHeroSettings;
    }
    return defaultHeroSettings;
  });

  const [aboutForm, setAboutForm] = React.useState<typeof defaultAboutSettings>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('invictus_about_settings');
      return stored ? JSON.parse(stored) : defaultAboutSettings;
    }
    return defaultAboutSettings;
  });

  const [orders, setOrders] = React.useState<any[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('invictus_orders');
      if (stored) return JSON.parse(stored);
      // default mock orders
      const defaultOrders = [
        { id: "ord-1", athleteName: "Saadman Sakib", phone: "01819283746", email: "saadman.sk@gmail.com", address: "Dhanmondi Rd 27, Dhaka", items: "Invictus Elite Boxing Gloves (Qty: 1)", totalPrice: 89.99, status: "Pending", paymentMethod: "bKash", date: "2026-05-22" },
        { id: "ord-2", athleteName: "Zarin Subah", phone: "01722883399", email: "zarin.sb@gmail.com", address: "Gulshan-1, Dhaka", items: "WBC Referee Commemorative Tee (Qty: 2)", totalPrice: 69.98, status: "Shipped", paymentMethod: "Nagad", date: "2026-05-20" }
      ];
      return defaultOrders;
    }
    return [];
  });
  
  // Search & Filters
  const [studentSearch, setStudentSearch] = React.useState('');
  const [studentFilter, setStudentFilter] = React.useState('All');
  
  // Forms states
  const [newStudent, setNewStudent] = React.useState({ name: '', email: '', phone: '', course: '3 Months Course', status: 'Pending', image: '' });
  const [editingStudentId, setEditingStudentId] = React.useState<string | null>(null);
  const [editingStudentForm, setEditingStudentForm] = React.useState({ name: '', email: '', phone: '', course: '3 Months Course', status: 'Pending', image: '' });

  const [editingPlanId, setEditingPlanId] = React.useState<string | null>(null);
  const [editingPlanForm, setEditingPlanForm] = React.useState({ title: '', price: '', originalPrice: '', highlight: false, badge: '', features: '' });
  
  const [newProduct, setNewProduct] = React.useState({ name: '', price: '', category: 'Equipment', description: '', image: '', rating: '5.0' });
  const [editingProductId, setEditingProductId] = React.useState<number | null>(null);
  const [editingProductForm, setEditingProductForm] = React.useState({ name: '', price: '', category: 'Equipment', description: '', image: '', rating: '5.0' });

  const [newExperience, setNewExperience] = React.useState({ role: '', company: '', period: '', description: '' });
  const [editingExperienceId, setEditingExperienceId] = React.useState<string | null>(null);
  const [editingExperienceForm, setEditingExperienceForm] = React.useState({ role: '', company: '', period: '', description: '' });

  // Schedule quick add
  const [selectedDay, setSelectedDay] = React.useState('Sunday');
  const [newClassTime, setNewClassTime] = React.useState('');
  const [newClassActivity, setNewClassActivity] = React.useState('');

  // Schedule edit
  const [editingClassDay, setEditingClassDay] = React.useState<string | null>(null);
  const [editingClassId, setEditingClassId] = React.useState<string | null>(null);
  const [editingClassTime, setEditingClassTime] = React.useState('');
  const [editingClassActivity, setEditingClassActivity] = React.useState('');

  // Toast / System status notification
  const [systemNotification, setSystemNotification] = React.useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

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
      if (!localStorage.getItem('invictus_products')) {
        localStorage.setItem('invictus_products', JSON.stringify(defaultProducts));
      }
      if (!localStorage.getItem('invictus_hero_settings')) {
        localStorage.setItem('invictus_hero_settings', JSON.stringify(defaultHeroSettings));
      }
      if (!localStorage.getItem('invictus_about_settings')) {
        localStorage.setItem('invictus_about_settings', JSON.stringify(defaultAboutSettings));
      }
      if (!localStorage.getItem('invictus_experience')) {
        localStorage.setItem('invictus_experience', JSON.stringify(defaultExperience));
      }
      if (!localStorage.getItem('invictus_orders')) {
        const defaultOrders = [
          { id: "ord-1", athleteName: "Saadman Sakib", phone: "01819283746", email: "saadman.sk@gmail.com", address: "Dhanmondi Rd 27, Dhaka", items: "Invictus Elite Boxing Gloves (Qty: 1)", totalPrice: 89.99, status: "Pending", paymentMethod: "bKash", date: "2026-05-22" },
          { id: "ord-2", athleteName: "Zarin Subah", phone: "01722883399", email: "zarin.sb@gmail.com", address: "Gulshan-1, Dhaka", items: "WBC Referee Commemorative Tee (Qty: 2)", totalPrice: 69.98, status: "Shipped", paymentMethod: "Nagad", date: "2026-05-20" }
        ];
        localStorage.setItem('invictus_orders', JSON.stringify(defaultOrders));
      }
    }
  }, []);

  const triggerNotification = (text: string, type: 'success' | 'error' = 'success') => {
    setSystemNotification({ text, type });
    setTimeout(() => setSystemNotification(null), 3000);
  };

  const syncToStorage = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
    syncToApi(key, data);
  };

  const syncToApi = async (key: string, data: any) => {
    try {
      switch (key) {
        case 'invictus_students':
          // Individual CRUD is handled per-action; this is a bulk fallback
          break;
        case 'invictus_schedule':
          await scheduleApi.update(data);
          break;
        case 'invictus_pricing':
          // Handled per-action
          break;
        case 'invictus_inquiries':
          // Handled per-action
          break;
        case 'invictus_products':
          // Handled per-action
          break;
        case 'invictus_orders':
          // Handled per-action
          break;
        case 'invictus_experience':
          // Handled per-action
          break;
        case 'invictus_hero_settings':
          await contentApi.updateHero(data);
          break;
        case 'invictus_about_settings':
          await contentApi.updateAbout(data);
          break;
      }
    } catch (err) {
      console.warn(`API sync failed for ${key}:`, err);
    }
  };

  // Verify token on mount
  React.useEffect(() => {
    const checkAuth = async () => {
      const result = await authApi.verify();
      if (result.success) {
        setIsAuthenticated(true);
      }
      setAuthLoading(false);
    };
    checkAuth();
  }, []);

  // Auth check
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (!email || !password) {
      setLoginError('Email and password are required.');
      return;
    }

    const result = await authApi.login(email, password);
    if (result.success) {
      setIsAuthenticated(true);
      setLoginError('');
      triggerNotification('Access Granted. Session Initialized.', 'success');
    } else {
      setLoginError(result.error || 'Invalid credentials. Access Denied.');
    }
  };

  const handleLogout = async () => {
    await authApi.logout();
    setIsAuthenticated(false);
    setEmail('');
    setPassword('');
    triggerNotification('Security Lock Enabled. Logged out.');
  };

  const handleBypass = () => {
    setIsAuthenticated(true);
    triggerNotification('Bypass Mode Authorized.', 'success');
  };

  // Student Actions
  const handleAddStudent = async (e: React.FormEvent) => {
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
      status: newStudent.status as 'Active' | 'Pending' | 'Canceled',
      enrolledDate: new Date().toISOString().split('T')[0],
      image: newStudent.image || ""
    };
    const updated = [newlyCreated, ...students];
    setStudents(updated);
    syncToStorage('invictus_students', updated);
    studentsApi.create(newlyCreated).catch(console.warn);
    setNewStudent({ name: '', email: '', phone: '', course: '3 Months Course', status: 'Pending', image: '' });
    setAthleteSubTab('list');
    triggerNotification(`Athlete ${newlyCreated.name} successfully registered!`);
  };

  const startEditingStudent = (student: any) => {
    setEditingStudentId(student.id);
    setEditingStudentForm({
      name: student.name,
      email: student.email === 'N/A' || !student.email ? '' : student.email,
      phone: student.phone,
      course: student.course,
      status: student.status,
      image: student.image || ''
    });
    setAthleteSubTab('form');
    triggerNotification(`Editing record of: ${student.name}`);
  };

  const saveEditedStudent = async (id: string) => {
    if (!editingStudentForm.name || !editingStudentForm.phone) {
      triggerNotification('Name and Phone are required.', 'error');
      return;
    }
    const updated = students.map(s => {
      if (s.id === id) {
        return {
          ...s,
          name: editingStudentForm.name,
          email: editingStudentForm.email || 'N/A',
          phone: editingStudentForm.phone,
          course: editingStudentForm.course,
          status: editingStudentForm.status,
          image: editingStudentForm.image
        };
      }
      return s;
    });
    setStudents(updated);
    syncToStorage('invictus_students', updated);
    studentsApi.update(id, { ...editingStudentForm, status: editingStudentForm.status as 'Active' | 'Pending' | 'Canceled' }).catch(console.warn);
    setEditingStudentId(null);
    setAthleteSubTab('list');
    triggerNotification(`Athlete ${editingStudentForm.name} updated successfully.`);
  };

  const handleDeleteStudent = async (id: string, name: string) => {
    if (confirm(`Remove athlete ${name} registration record?`)) {
      const updated = students.filter(s => s.id !== id);
      setStudents(updated);
      syncToStorage('invictus_students', updated);
      studentsApi.remove(id).catch(console.warn);
      triggerNotification(`Removed record lock for ${name}.`);
    }
  };

  const handleToggleStudentStatus = async (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'Pending' ? 'Active' : currentStatus === 'Active' ? 'Canceled' : 'Pending';
    const updated = students.map(s => {
      if (s.id === id) {
        return { ...s, status: nextStatus };
      }
      return s;
    });
    setStudents(updated);
    syncToStorage('invictus_students', updated);
    studentsApi.update(id, { status: nextStatus }).catch(console.warn);
    triggerNotification(`Updated status to ${nextStatus}.`);
  };

  // Inquiry Actions
  const handleDeleteInquiry = async (id: string) => {
    const updated = inquiries.filter(i => i.id !== id);
    setInquiries(updated);
    syncToStorage('invictus_inquiries', updated);
    inquiriesApi.remove(id).catch(console.warn);
    triggerNotification('Inquiry record deleted.');
  };

  const handleToggleInquiryRead = async (id: string) => {
    const target = inquiries.find(i => i.id === id);
    const newRead = !target?.read;
    const updated = inquiries.map(i => {
      if (i.id === id) {
        return { ...i, read: newRead };
      }
      return i;
    });
    setInquiries(updated);
    syncToStorage('invictus_inquiries', updated);
    inquiriesApi.toggleRead(id, newRead).catch(console.warn);
  };

  // Schedule Actions
  const handleAddClass = async (e: React.FormEvent) => {
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
    scheduleApi.update(finalSchedule).catch(console.warn);
    setNewClassTime('');
    setNewClassActivity('');
    triggerNotification(`Added class info under ${selectedDay}.`);
  };

  const handleDeleteClass = async (day: string, classId: string) => {
    const updated = scheduleData.map(dayObj => {
      if (dayObj.day === day) {
        return {
          ...dayObj,
          classes: dayObj.classes.filter(c => c.id !== classId)
        };
      }
      return dayObj;
    }).filter(dayObj => dayObj.classes.length > 0);

    setScheduleData(updated);
    syncToStorage('invictus_schedule', updated);
    scheduleApi.update(updated).catch(console.warn);
    triggerNotification('Session timing removed from schedule.');
  };

  const startEditingClass = (day: string, cls: { id: string; time: string; activity: string }) => {
    setEditingClassDay(day);
    setEditingClassId(cls.id);
    setEditingClassTime(cls.time);
    setEditingClassActivity(cls.activity);
  };

  const cancelEditingClass = () => {
    setEditingClassDay(null);
    setEditingClassId(null);
    setEditingClassTime('');
    setEditingClassActivity('');
  };

  const saveEditedClass = async () => {
    if (!editingClassDay || !editingClassId || !editingClassTime || !editingClassActivity) {
      triggerNotification('Time and activity are required.', 'error');
      return;
    }
    const updated = scheduleData.map(dayObj => {
      if (dayObj.day === editingClassDay) {
        return {
          ...dayObj,
          classes: dayObj.classes.map(c =>
            c.id === editingClassId
              ? { ...c, time: editingClassTime, activity: editingClassActivity }
              : c
          ),
        };
      }
      return dayObj;
    });
    setScheduleData(updated);
    syncToStorage('invictus_schedule', updated);
    scheduleApi.update(updated).catch(console.warn);
    cancelEditingClass();
    triggerNotification('Class updated successfully.');
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

  const saveEditedPlan = async (id: string) => {
    const updatedPlan = {
      id,
      title: editingPlanForm.title,
      price: editingPlanForm.price,
      originalPrice: editingPlanForm.originalPrice || undefined,
      highlight: editingPlanForm.highlight,
      badge: editingPlanForm.badge || undefined,
      features: editingPlanForm.features.split('\n').map(f => f.trim()).filter(Boolean)
    };
    const updated = pricingData.map(p => p.id === id ? { ...p, ...updatedPlan } : p);
    setPricingData(updated);
    syncToStorage('invictus_pricing', updated);
    pricingApi.update(updatedPlan).catch(console.warn);
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

  // Shop Sales revenue
  const shopSalesRevenue = orders.reduce((acc, current) => {
    if (current.status === 'Canceled') return acc;
    return acc + (parseFloat(current.totalPrice) || 0);
  }, 0);

  // Product Actions
  const handleDeleteProduct = async (id: number, name: string) => {
    if (confirm(`Are you sure you want to remove ${name} from shop?`)) {
      const updated = products.filter(p => p.id !== id);
      setProducts(updated);
      syncToStorage('invictus_products', updated);
      productsApi.remove(id).catch(console.warn);
      triggerNotification(`Removed ${name} from store inventory.`);
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) {
      triggerNotification('Product Name and Price are required.', 'error');
      return;
    }
    const newlyCreated = {
      id: Date.now(),
      name: newProduct.name,
      price: parseFloat(newProduct.price) || 0,
      category: newProduct.category,
      description: newProduct.description || "Elite training product.",
      image: newProduct.image || "https://picsum.photos/seed/invictus-gear/800/800",
      rating: parseFloat(newProduct.rating) || 5.0
    };
    const updated = [newlyCreated, ...products];
    setProducts(updated);
    syncToStorage('invictus_products', updated);
    productsApi.create({ ...newlyCreated, price: newlyCreated.price, rating: newlyCreated.rating }).catch(console.warn);
    setNewProduct({ name: '', price: '', category: 'Equipment', description: '', image: '', rating: '5.0' });
    setProductSubTab('list');
    triggerNotification(`Successfully registered product: ${newlyCreated.name}`);
  };

  const startEditingProduct = (product: any) => {
    setEditingProductId(product.id);
    setEditingProductForm({
      name: product.name,
      price: product.price.toString(),
      category: product.category,
      description: product.description,
      image: product.image,
      rating: product.rating.toString()
    });
    setProductSubTab('form');
    triggerNotification(`Editing product: ${product.name}`);
  };

  const saveEditedProduct = async (id: number) => {
    if (!editingProductForm.name || !editingProductForm.price) {
      triggerNotification('Product Name and Price are required.', 'error');
      return;
    }
    const updated = products.map(p => {
      if (p.id === id) {
        return {
          ...p,
          name: editingProductForm.name,
          price: parseFloat(editingProductForm.price) || 0,
          category: editingProductForm.category,
          description: editingProductForm.description || "Elite training product.",
          image: editingProductForm.image || "https://picsum.photos/seed/invictus-gear/800/800",
          rating: parseFloat(editingProductForm.rating) || 5.0
        };
      }
      return p;
    });
    setProducts(updated);
    syncToStorage('invictus_products', updated);
    productsApi.update(id, { ...editingProductForm, price: parseFloat(editingProductForm.price), rating: parseFloat(editingProductForm.rating) }).catch(console.warn);
    setEditingProductId(null);
    setProductSubTab('list');
    triggerNotification(`Successfully updated product: ${editingProductForm.name}`);
  };

  // Experience Handlers
  const handleAddExperience = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExperience.role || !newExperience.company || !newExperience.period) {
      triggerNotification('Please fill in Role, Company, and Period.', 'error');
      return;
    }
    const newRecord = {
      id: 'exp-' + Date.now(),
      role: newExperience.role,
      company: newExperience.company,
      period: newExperience.period,
      description: newExperience.description || ''
    };
    const updated = [newRecord, ...experienceData];
    setExperienceData(updated);
    syncToStorage('invictus_experience', updated);
    experienceApi.create(newRecord).catch(console.warn);
    setNewExperience({ role: '', company: '', period: '', description: '' });
    setExperienceSubTab('list');
    triggerNotification('New Professional Experience record registered successfully!');
  };

  const startEditingExperience = (exp: any) => {
    setEditingExperienceId(exp.id);
    setEditingExperienceForm({
      role: exp.role || '',
      company: exp.company || '',
      period: exp.period || '',
      description: exp.description || ''
    });
    setExperienceSubTab('form');
  };

  const saveEditedExperience = async (id: string) => {
    if (!editingExperienceForm.role || !editingExperienceForm.company || !editingExperienceForm.period) {
      triggerNotification('Please fill in Role, Company, and Period.', 'error');
      return;
    }
    const updated = experienceData.map(exp => {
      if (exp.id === id) {
        return {
          ...exp,
          role: editingExperienceForm.role,
          company: editingExperienceForm.company,
          period: editingExperienceForm.period,
          description: editingExperienceForm.description
        };
      }
      return exp;
    });
    setExperienceData(updated);
    syncToStorage('invictus_experience', updated);
    experienceApi.update(id, editingExperienceForm).catch(console.warn);
    setEditingExperienceId(null);
    setExperienceSubTab('list');
    triggerNotification('Professional Experience details updated successfully!');
  };

  const handleDeleteExperience = async (id: string) => {
    if (confirm('Are you sure you want to delete this experience record?')) {
      const updated = experienceData.filter(exp => exp.id !== id);
      setExperienceData(updated);
      syncToStorage('invictus_experience', updated);
      experienceApi.remove(id).catch(console.warn);
      triggerNotification('Professional Experience record deleted successfully!');
    }
  };

  // Order Actions
  const handleToggleOrderStatus = async (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'Pending' ? 'Shipped' : currentStatus === 'Shipped' ? 'Delivered' : currentStatus === 'Delivered' ? 'Canceled' : 'Pending';
    const updated = orders.map(o => {
      if (o.id === id) {
        return { ...o, status: nextStatus };
      }
      return o;
    });
    setOrders(updated);
    syncToStorage('invictus_orders', updated);
    ordersApi.updateStatus(id, nextStatus).catch(console.warn);
    triggerNotification(`Order ${id} status updated to ${nextStatus}.`);
  };

  const handleDeleteOrder = async (id: string) => {
    if (confirm(`Remove order record ${id}?`)) {
      const updated = orders.filter(o => o.id !== id);
      setOrders(updated);
      syncToStorage('invictus_orders', updated);
      ordersApi.remove(id).catch(console.warn);
      triggerNotification(`Order ${id} record removed.`);
    }
  };

  const filteredStudents = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(studentSearch.toLowerCase()) || 
                          s.phone.includes(studentSearch) || 
                          s.email.toLowerCase().includes(studentSearch.toLowerCase());
    const matchesFilter = studentFilter === 'All' || s.status === studentFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-brand-primary text-white font-sans antialiased relative flex flex-col md:flex-row">
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#141417_1px,transparent_1px),linear-gradient(to_bottom,#141417_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-25 pointer-events-none -z-50" />
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand-accent/40 to-transparent z-50 pointer-events-none" />

      {/* Modern Status Notification Toast */}
      {systemNotification && (
        <div className={`fixed top-6 right-6 z-50 p-4 rounded-2xl border backdrop-blur-md max-w-sm shadow-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300 ${
          systemNotification.type === 'success' 
            ? 'bg-neutral-900/90 border-brand-accent/30 text-brand-accent shadow-brand-accent/5' 
            : 'bg-red-950/90 border-red-500/30 text-red-100 shadow-red-500/5'
        }`}>
          <Zap className="w-4 h-4 shrink-0 animate-pulse text-brand-accent" />
          <div className="text-xs font-mono font-bold uppercase tracking-wider">{systemNotification.text}</div>
        </div>
      )}

      {/* AUTHENTICATION PORTAL (IF NOT LOGGED IN) */}
      {authLoading ? (
        <div className="min-h-screen w-full flex items-center justify-center p-4 relative">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-brand-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-brand-muted text-xs font-mono">Verifying session...</p>
          </div>
        </div>
      ) : !isAuthenticated ? (
        <div className="min-h-screen w-full flex items-center justify-center p-4 relative">
          <div className="absolute top-12 left-12">
            <Link href="/" className="inline-flex items-center gap-2 text-xs font-mono font-bold text-brand-muted hover:text-brand-accent transition-colors">
              <ArrowLeft className="w-4 h-4" /> ← BACK TO HOME
            </Link>
          </div>

          <div className="w-full max-w-md p-8 sm:p-10 bg-brand-secondary/80 backdrop-blur-xl border border-brand-border/80 hover:border-brand-accent/20 transition-all duration-500 relative shadow-2xl rounded-[2.5rem]">
            <div className="mb-8 text-center sm:text-left">
              <div className="inline-flex p-4 rounded-full bg-brand-accent/10 border border-brand-accent/25 text-brand-accent mb-4">
                <Shield className="w-6 h-6 animate-pulse" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-display font-black uppercase tracking-tight text-white mb-1.5">
                COACH <span className="text-brand-accent">CONSOLE</span>
              </h1>
              <p className="text-xs font-bold text-brand-muted tracking-widest uppercase">
                INVICTUS ATHLETICS SECURE AUDIT
              </p>
            </div>

            {authLoading ? (
              <div className="text-center text-brand-muted text-xs font-mono animate-pulse py-8">
                Verifying session...
              </div>
            ) : (
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-brand-muted ml-1">
                  ADMIN EMAIL
                </label>
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@coachishtiak.com"
                  className="w-full h-[48px] bg-brand-primary border border-brand-border/80 rounded-xl px-4 font-mono focus:border-brand-accent focus:outline-none text-white transition-all text-sm"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-brand-muted ml-1">
                  PASSWORD
                </label>
                <input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full h-[48px] bg-brand-primary border border-brand-border/80 rounded-xl px-4 font-mono focus:border-brand-accent focus:outline-none text-white tracking-[0.2em] transition-all text-sm"
                  required
                />
              </div>

              {loginError && (
                <div className="p-3.5 bg-red-950/25 border border-red-500/30 text-red-200 text-xs font-mono font-bold flex items-center gap-2.5 rounded-xl">
                  <CircleAlert className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{loginError}</span>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3.5">
                <button
                  type="submit"
                  className="py-4 bg-brand-accent text-black font-black uppercase tracking-wider text-xs rounded-xl hover:bg-brand-accent-hover transition-colors min-h-[48px] cursor-pointer shadow-lg shadow-brand-accent/15"
                >
                  SIGN IN
                </button>
                <button
                  type="button"
                  onClick={handleBypass}
                  className="py-4 bg-transparent text-brand-muted hover:text-white font-mono uppercase tracking-widest text-[10px] rounded-xl border border-brand-border hover:border-white/20 transition-all h-[48px] cursor-pointer"
                >
                  BYPASS DEV
                </button>
              </div>
            </form>
            )}

            <div className="mt-8 pt-6 border-t border-brand-border/60 text-center text-xs text-brand-muted leading-relaxed">
              Designed for intuitive mobile-and-desktop coaching workflows. Instantly modify training plans, schedules, and approve athlete logs.
            </div>
          </div>
        </div>
      ) : (
        /* FULL ATHLETE & BRAND ACTION PLAN (LOGGED-IN VIEW) */
        <div className="min-h-screen w-full flex flex-col md:flex-row bg-brand-primary">
          
          {/* 1. PREMIUM COLLAPSIBLE/RESPONSIVE LEFT SIDEBAR (DESKTOP) */}
          <aside className="hidden md:flex flex-col w-72 h-screen sticky top-0 bg-brand-secondary border-r border-brand-border/50 p-6 shrink-0 justify-between z-40">
            <div className="space-y-8">
              {/* Brand Signature Banner */}
              <div className="px-2">
                <Link href="/" className="inline-block group">
                  <span className="text-xl font-display font-black tracking-tight text-white group-hover:text-brand-accent transition-colors">
                    INVICTUS <span className="text-brand-accent font-extrabold text-2xl">.</span>
                  </span>
                  <span className="block text-[10px] uppercase tracking-widest font-mono text-brand-muted mt-1 font-bold">
                    COACH ADMIN PORTAL
                  </span>
                </Link>
              </div>

              {/* Navigation Items (Action Links) */}
              <nav className="space-y-1">
                {[
                  { id: 'students', label: 'Athlete Leads', icon: Users, count: students.length },
                  { id: 'schedule', label: 'Weekly Schedule', icon: Calendar },
                  { id: 'pricing', label: 'Configure Plans', icon: Sliders },
                  { id: 'inquiries', label: 'Client Inbox', icon: Mail, count: inquiries.filter(i => !i.read).length, isInbox: true },
                  { id: 'products', label: 'Manage Shop', icon: ShoppingBag, count: products.length },
                  { id: 'orders', label: 'Shop Orders', icon: Package, count: orders.filter(o => o.status === 'Pending').length, isInbox: true },
                  { id: 'experience', label: 'Experience Timeline', icon: Briefcase },
                  { id: 'content', label: 'Hero & About CMS', icon: Compass },
                ].map((item) => {
                  const TabIcon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id as any)}
                      className={`w-full flex items-center justify-between px-4 py-3 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer ${
                        isActive
                          ? 'bg-brand-accent text-black font-black shadow-lg shadow-brand-accent/15'
                          : 'text-brand-muted hover:text-white hover:bg-white/[0.02]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <TabIcon className={`w-4 h-4 shrink-0 transition-colors ${isActive ? 'text-black' : 'text-brand-muted group-hover:text-white'}`} />
                        <span>{item.label}</span>
                      </div>
                      {item.count !== undefined && item.count > 0 && (
                        <span className={`px-2 py-0.5 text-[9px] font-mono font-bold rounded-full ${
                          isActive 
                            ? 'bg-black text-brand-accent' 
                            : item.isInbox 
                              ? 'bg-brand-accent text-black font-bold animate-pulse'
                              : 'bg-brand-primary border border-brand-border text-brand-muted'
                        }`}>
                          {item.count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Profile badge & System actions */}
            <div className="pt-6 border-t border-brand-border/60">
              <div className="flex items-center gap-3 px-2 mb-5">
                <div className="w-10 h-10 rounded-full bg-brand-accent/10 border border-brand-accent/25 flex items-center justify-center text-brand-accent font-black text-sm">
                  CI
                </div>
                <div>
                  <div className="text-xs font-bold text-white uppercase tracking-wider">Coach Ishtiak</div>
                  <div className="text-[9px] font-mono text-brand-muted uppercase">WBC Boxer & Coach</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <Link 
                  href="/"
                  className="px-3 py-2 border border-brand-border/60 hover:border-brand-accent/30 text-[9px] font-mono font-extrabold uppercase tracking-widest text-center text-brand-muted hover:text-white rounded-lg transition-all flex items-center justify-center min-h-[36px]"
                >
                  GO BACK
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 bg-red-500/10 border border-red-500/20 hover:bg-red-500 hover:border-red-500 hover:text-black text-[9px] font-mono font-extrabold uppercase tracking-widest text-center text-red-400 rounded-lg transition-all min-h-[36px] cursor-pointer"
                >
                  SEC_EXIT
                </button>
              </div>
            </div>
          </aside>

          {/* 2. RESPONSIVE MOBILE NOTIFICATION NAV BAR (MOBILE) */}
          <div className="md:hidden flex flex-col bg-brand-secondary border-b border-brand-border/50 sticky top-0 z-40">
            <div className="flex items-center justify-between p-4">
              <Link href="/" className="font-display font-black text-lg tracking-tight text-white uppercase">
                INVICTUS <span className="text-brand-accent">.</span>
              </Link>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleLogout}
                  className="px-2.5 py-1.5 border border-brand-border text-[9px] font-mono font-bold text-brand-muted rounded-lg hover:text-white uppercase transition-all"
                >
                  Exit
                </button>
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-2 border border-brand-border/60 text-brand-muted hover:text-white rounded-lg transition-all min-w-[36px] min-h-[36px] flex items-center justify-center cursor-pointer"
                >
                  {mobileMenuOpen ? <X className="w-4.5 h-4.5 text-brand-accent" /> : <Menu className="w-4.5 h-4.5" />}
                </button>
              </div>
            </div>

            {/* Mobile Navigation Drawer Dropdown */}
            {mobileMenuOpen && (
              <div className="bg-brand-primary border-t border-brand-border/60 px-4 py-3 divide-y divide-brand-border/40 space-y-2 animate-in slide-in-from-top-4 duration-200">
                <div className="py-2 space-y-1">
                  {[
                    { id: 'students', label: 'Athlete Leads', icon: Users, count: students.length },
                    { id: 'schedule', label: 'Weekly Schedule', icon: Calendar },
                    { id: 'pricing', label: 'Configure Plans', icon: Sliders },
                    { id: 'inquiries', label: 'Client Inbox', icon: Mail, count: inquiries.filter(i => !i.read).length, isInbox: true },
                    { id: 'products', label: 'Manage Shop', icon: ShoppingBag, count: products.length },
                    { id: 'orders', label: 'Shop Orders', icon: Package, count: orders.filter(o => o.status === 'Pending').length, isInbox: true },
                    { id: 'experience', label: 'Experience Timeline', icon: Briefcase },
                    { id: 'content', label: 'Hero & About CMS', icon: Compass },
                  ].map((item) => {
                    const TabIcon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveTab(item.id as any);
                          setMobileMenuOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                          isActive
                            ? 'bg-brand-accent text-black font-black'
                            : 'text-brand-muted hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <TabIcon className="w-4 h-4 shrink-0" />
                          <span>{item.label}</span>
                        </div>
                        {item.count !== undefined && item.count > 0 && (
                          <span className={`px-2 py-0.5 text-[9px] font-mono font-bold rounded ${
                            isActive ? 'bg-black text-brand-accent' : 'bg-brand-secondary border border-brand-border text-brand-muted'
                          }`}>
                            {item.count}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
                
                <div className="pt-3 pb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-brand-accent/10 border border-brand-accent/25 flex items-center justify-center text-brand-accent font-black text-xs">
                      CI
                    </div>
                    <span className="text-xs font-bold text-white">Coach Ishtiak</span>
                  </div>
                  <Link 
                    href="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-xs font-mono font-bold text-brand-accent hover:underline"
                  >
                    GO TO SITE →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* 3. DOCK CONTAINER & WORKSPACE SCREEN */}
          <div className="flex-1 min-w-0 flex flex-col overflow-y-auto">
            
            {/* Elegant Workspace Header for Desktop */}
            <header className="hidden md:flex items-center justify-between p-7 bg-brand-secondary/30 border-b border-brand-border/40">
              <div>
                <h1 className="text-sm font-black uppercase tracking-wider text-white">
                  {activeTab === 'students' && '👥 Athlete Leads Center'}
                  {activeTab === 'schedule' && '📅 Class & Timing Timetable'}
                  {activeTab === 'pricing' && '💎 Configure Package Plans'}
                  {activeTab === 'inquiries' && '📬 Dynamic Mail Inbox'}
                  {activeTab === 'products' && '📦 Shop Inventory Manager'}
                  {activeTab === 'orders' && '🛒 Store Orders Stream'}
                  {activeTab === 'experience' && '💼 Professional Experience Manager'}
                  {activeTab === 'content' && '🌐 Hero & About CMS'}
                </h1>
                <p className="text-xs text-brand-muted mt-0.5 font-sans">
                  Active directory synchronized directly to client modules.
                </p>
              </div>

              <div className="flex items-center gap-3 select-none">
                <span className="w-2.5 h-2.5 rounded-full bg-[#52fa7c] animate-ping shrink-0" />
                <span className="text-[10px] font-mono text-brand-muted uppercase tracking-wider">
                  BMMAA ACTIVE SYSTEM
                </span>
              </div>
            </header>

            {/* Core Content Body depending on active state tab */}
            <main className="flex-1 p-4 sm:p-8 space-y-8 max-w-7xl w-full mx-auto">
              
              {/* Quick Metrics Dashboard Row */}
              <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                <div className="p-5 bg-brand-secondary/40 border border-brand-border/80 rounded-2xl flex items-center gap-4 hover:border-brand-accent/30 hover:shadow-[0_0_20px_rgba(204,255,0,0.02)] transition-all duration-300 group">
                  <div className="p-3 bg-brand-accent/5 border border-brand-accent/20 text-brand-accent rounded-xl hidden sm:block group-hover:scale-105 transition-transform duration-300">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[9px] font-mono font-bold text-brand-muted uppercase tracking-widest">Athlete Inquiries</div>
                    <div className="text-xl sm:text-2xl font-display font-black text-white leading-none mt-1 sm:mt-1.5">{totalLeads}</div>
                  </div>
                </div>

                <div className="p-5 bg-brand-secondary/40 border border-brand-border/80 rounded-2xl flex items-center gap-4 hover:border-brand-accent/30 hover:shadow-[0_0_20px_rgba(204,255,0,0.02)] transition-all duration-300 group">
                  <div className="p-3 bg-[#52fa7c]/5 border border-[#52fa7c]/20 text-[#52fa7c] rounded-xl hidden sm:block group-hover:scale-105 transition-transform duration-300">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[9px] font-mono font-bold text-brand-muted uppercase tracking-widest">Active Approved</div>
                    <div className="text-xl sm:text-2xl font-display font-black text-[#52fa7c] leading-none mt-1 sm:mt-1.5">{activeStudentsCount}</div>
                  </div>
                </div>

                <div className="p-5 bg-brand-secondary/40 border border-brand-border/80 rounded-2xl flex items-center gap-4 hover:border-brand-accent/30 hover:shadow-[0_0_20px_rgba(204,255,0,0.02)] transition-all duration-300 group">
                  <div className="p-3 bg-amber-400/5 border border-amber-400/20 text-amber-400 rounded-xl hidden sm:block group-hover:scale-105 transition-transform duration-300">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[9px] font-mono font-bold text-brand-muted uppercase tracking-widest">Pending Review</div>
                    <div className="text-xl sm:text-2xl font-display font-black text-amber-400 leading-none mt-1 sm:mt-1.5">{pendingStudentsCount}</div>
                  </div>
                </div>

                <div className="p-5 bg-brand-secondary/40 border border-brand-border/80 rounded-2xl flex items-center gap-4 hover:border-brand-accent/30 hover:shadow-[0_0_20px_rgba(204,255,0,0.02)] transition-all duration-300 group flex-wrap">
                  <div className="p-3 bg-[#ccff00]/5 border border-[#ccff00]/20 text-brand-accent rounded-xl hidden sm:block group-hover:scale-105 transition-transform duration-300">
                    <DollarSign className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <div className="text-[9px] font-mono font-bold text-brand-muted uppercase tracking-widest">Aggregate Income Stream</div>
                    <div className="text-xl sm:text-2xl font-display font-black text-brand-accent leading-none mt-1 sm:mt-1.5">৳{(estimatedRevenue + shopSalesRevenue).toLocaleString()}</div>
                    <div className="text-[9px] font-mono text-brand-muted mt-1 font-bold">Gym: ৳{estimatedRevenue.toLocaleString()} | Shop: ৳{shopSalesRevenue.toLocaleString()}</div>
                  </div>
                </div>
              </section>

              {/* TAB 1: STUDENTS / LEADS MANAGEMENT */}
              {activeTab === 'students' && (
                <div className="space-y-6">
                  {/* Separate Page sub-navigation header for athlete list and form */}
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-brand-border/40 pb-5 mb-6">
                    <div>
                      <h3 className="text-xl font-display font-black uppercase text-white tracking-tight">
                        {athleteSubTab === 'list' ? 'Athlete Directory & Leads' : editingStudentId ? 'Edit Athlete Record' : 'Enroll New Athlete'}
                      </h3>
                      <p className="text-xs text-brand-muted font-mono tracking-wider mt-0.5 animate-pulse text-brand-accent">
                        {athleteSubTab === 'list' ? 'PROFILES AND ACTIVE REGISTRATION TIMINGS' : 'CRM DATABASE RECORD GENERATOR'}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setAthleteSubTab('list');
                          setEditingStudentId(null);
                        }}
                        className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all border min-h-[40px] cursor-pointer ${
                          athleteSubTab === 'list'
                            ? 'bg-brand-accent text-black font-black border-brand-accent shadow-sm shadow-brand-accent/20'
                            : 'bg-brand-secondary/80 border-brand-border text-brand-muted hover:text-white'
                        }`}
                      >
                        Athlete List
                      </button>
                      <button
                        onClick={() => {
                          setAthleteSubTab('form');
                          setEditingStudentId(null);
                          setNewStudent({ name: '', email: '', phone: '', course: '3 Months Course', status: 'Pending', image: '' });
                        }}
                        className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all border min-h-[40px] cursor-pointer ${
                          athleteSubTab === 'form' && !editingStudentId
                            ? 'bg-brand-accent text-black font-black border-brand-accent shadow-sm shadow-brand-accent/20'
                            : 'bg-brand-secondary/80 border-brand-border text-brand-muted hover:text-white'
                        }`}
                      >
                        + Register New
                      </button>
                    </div>
                  </div>

                  {athleteSubTab === 'form' ? (
                    /* Focused Athlete registration / edit form view */
                    <div className="max-w-2xl mx-auto w-full p-8 bg-brand-secondary/40 border border-brand-border/85 rounded-[2.5rem] relative shadow-2xl">
                      {editingStudentId ? (
                        <>
                          <div className="flex items-center justify-between border-b border-brand-border/40 pb-4 mb-6">
                            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-white flex items-center gap-2.5 font-display">
                              <Edit3 className="w-5 h-5 text-brand-accent animate-pulse" /> Edit Athlete Record
                            </h2>
                            <button
                              onClick={() => { setAthleteSubTab('list'); setEditingStudentId(null); }}
                              className="text-xs text-brand-muted hover:text-white font-mono uppercase tracking-widest flex items-center gap-1 cursor-pointer"
                            >
                              ← Back to List
                            </button>
                          </div>
                          
                          <form onSubmit={(e) => { e.preventDefault(); saveEditedStudent(editingStudentId); }} className="space-y-6 text-xs">
                            <div className="space-y-2">
                              <label className="text-brand-muted font-bold tracking-wider uppercase text-[10px]">Full Name *</label>
                              <input 
                                type="text" 
                                value={editingStudentForm.name}
                                onChange={(e) => setEditingStudentForm({...editingStudentForm, name: e.target.value})}
                                placeholder="e.g. Tanvir Rahman"
                                className="w-full bg-brand-primary border border-brand-border p-3.5 rounded-xl text-white text-sm focus:border-brand-accent focus:outline-none transition-colors"
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-brand-muted font-bold tracking-wider uppercase text-[10px]">Contact Phone *</label>
                              <input 
                                type="text" 
                                value={editingStudentForm.phone}
                                onChange={(e) => setEditingStudentForm({...editingStudentForm, phone: e.target.value})}
                                placeholder="e.g. 017-XXXX-XXXX"
                                className="w-full bg-brand-primary border border-brand-border p-3.5 rounded-xl text-white text-sm font-mono focus:border-brand-accent focus:outline-none transition-colors"
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-brand-muted font-bold tracking-wider uppercase text-[10px]">Email Address</label>
                              <input 
                                type="email" 
                                value={editingStudentForm.email}
                                onChange={(e) => setEditingStudentForm({...editingStudentForm, email: e.target.value})}
                                placeholder="e.g. fighter@gmail.com"
                                className="w-full bg-brand-primary border border-brand-border p-3.5 rounded-xl text-white text-sm focus:border-brand-accent focus:outline-none transition-colors"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <label className="text-brand-muted font-bold tracking-wider uppercase text-[10px]">Target Course</label>
                                <select 
                                  value={editingStudentForm.course}
                                  onChange={(e) => setEditingStudentForm({...editingStudentForm, course: e.target.value})}
                                  className="w-full bg-brand-primary border border-brand-border p-3.5 rounded-xl text-white focus:border-brand-accent focus:outline-none h-[48px] text-xs cursor-pointer"
                                >
                                  <option value="3 Months Course">3 Months Core</option>
                                  <option value="Monthly Plan">Monthly Plan</option>
                                </select>
                              </div>
                              <div className="space-y-2">
                                <label className="text-brand-muted font-bold tracking-wider uppercase text-[10px]">Status</label>
                                <select 
                                  value={editingStudentForm.status}
                                  onChange={(e) => setEditingStudentForm({...editingStudentForm, status: e.target.value})}
                                  className="w-full bg-brand-primary border border-brand-border p-3.5 rounded-xl text-white focus:border-brand-accent focus:outline-none h-[48px] text-xs cursor-pointer"
                                >
                                  <option value="Pending">Pending</option>
                                  <option value="Active">Active</option>
                                  <option value="Canceled">Canceled</option>
                                </select>
                              </div>
                            </div>

                            <ImageUploader 
                              id="edit-athlete-img"
                              value={editingStudentForm.image}
                              onChange={(val) => setEditingStudentForm({...editingStudentForm, image: val})}
                            />
                            
                            <div className="flex gap-3 pt-4">
                              <button 
                                type="submit"
                                className="flex-1 py-4 bg-brand-accent text-black font-extrabold uppercase tracking-widest rounded-xl hover:bg-brand-accent-hover transition-colors min-h-[48px] cursor-pointer shadow-md shadow-brand-accent/15 text-xs"
                              >
                                SAVE CHANGES
                              </button>
                              <button 
                                type="button"
                                onClick={() => { setAthleteSubTab('list'); setEditingStudentId(null); }}
                                className="px-6 py-4 bg-brand-primary border border-brand-border text-brand-muted hover:text-white font-mono text-xs rounded-xl min-h-[48px] cursor-pointer"
                              >
                                CANCEL
                              </button>
                            </div>
                          </form>
                        </>
                      ) : (
                        <>
                          <div className="flex items-center justify-between border-b border-brand-border/40 pb-4 mb-6">
                            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-white flex items-center gap-2.5 font-display">
                              <UserPlus className="w-5 h-5 text-brand-accent" /> Register Athlete
                            </h2>
                            <button
                              onClick={() => setAthleteSubTab('list')}
                              className="text-xs text-brand-muted hover:text-white font-mono uppercase tracking-widest flex items-center gap-1 cursor-pointer"
                            >
                              ← Back to List
                            </button>
                          </div>
                          
                          <form onSubmit={handleAddStudent} className="space-y-6 text-xs">
                            <div className="space-y-2">
                              <label className="text-brand-muted font-bold tracking-wider uppercase text-[10px]">Full Name *</label>
                              <input 
                                type="text" 
                                value={newStudent.name}
                                onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                                placeholder="e.g. Shakib Al Hasan"
                                className="w-full bg-brand-primary border border-brand-border p-3.5 rounded-xl text-white text-sm focus:border-brand-accent focus:outline-none transition-colors"
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-brand-muted font-bold tracking-wider uppercase text-[10px]">Contact Phone *</label>
                              <input 
                                type="text" 
                                value={newStudent.phone}
                                onChange={(e) => setNewStudent({...newStudent, phone: e.target.value})}
                                placeholder="e.g. 017-XXXX-XXXX"
                                className="w-full bg-brand-primary border border-brand-border p-3.5 rounded-xl text-white text-sm font-mono focus:border-brand-accent focus:outline-none transition-colors"
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-brand-muted font-bold tracking-wider uppercase text-[10px]">Email Address</label>
                              <input 
                                type="email" 
                                value={newStudent.email}
                                onChange={(e) => setNewStudent({...newStudent, email: e.target.value})}
                                placeholder="e.g. fighter@gmail.com"
                                className="w-full bg-brand-primary border border-brand-border p-3.5 rounded-xl text-white text-sm focus:border-brand-accent focus:outline-none transition-colors"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <label className="text-brand-muted font-bold tracking-wider uppercase text-[10px]">Target Course</label>
                                <select 
                                  value={newStudent.course}
                                  onChange={(e) => setNewStudent({...newStudent, course: e.target.value})}
                                  className="w-full bg-brand-primary border border-brand-border p-3.5 rounded-xl text-white focus:border-brand-accent focus:outline-none h-[48px] text-xs cursor-pointer"
                                >
                                  <option value="3 Months Course">3 Months Core</option>
                                  <option value="Monthly Plan">Monthly Plan</option>
                                </select>
                              </div>
                              <div className="space-y-2">
                                <label className="text-brand-muted font-bold tracking-wider uppercase text-[10px]">Initial Status</label>
                                <select 
                                  value={newStudent.status}
                                  onChange={(e) => setNewStudent({...newStudent, status: e.target.value})}
                                  className="w-full bg-brand-primary border border-brand-border p-3.5 rounded-xl text-white focus:border-brand-accent focus:outline-none h-[48px] text-xs cursor-pointer"
                                >
                                  <option value="Pending">Pending</option>
                                  <option value="Active">Active</option>
                                  <option value="Canceled">Canceled</option>
                                </select>
                              </div>
                            </div>

                            <ImageUploader 
                              id="new-athlete-img"
                              value={newStudent.image}
                              onChange={(val) => setNewStudent({...newStudent, image: val})}
                            />
                            
                            <button 
                              type="submit"
                              className="w-full py-4 mt-2 bg-brand-accent text-black font-extrabold uppercase tracking-widest rounded-xl hover:bg-brand-accent-hover transition-colors min-h-[48px] cursor-pointer shadow-md shadow-brand-accent/15 text-xs"
                            >
                              CONFIRM ENROLLMENT
                            </button>
                          </form>
                        </>
                      )}
                    </div>
                  ) : (
                    /* Full-width Athlete Leads Deck list */
                    <div className="w-full space-y-4">
                      {/* Search Bar & Status Filter Pill Swapper */}
                      <div className="p-4 bg-brand-secondary/40 border border-brand-border rounded-xl flex flex-col sm:flex-row gap-3 justify-between items-center shadow-md animate-in fade-in duration-300">
                        <div className="relative w-full sm:max-w-xs">
                          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
                          <input 
                            type="text" 
                            placeholder="Search athletes..."
                            value={studentSearch}
                            onChange={(e) => setStudentSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-brand-primary border border-brand-border rounded-xl text-xs text-white placeholder:text-brand-muted/70 focus:border-brand-accent focus:outline-none transition-colors"
                          />
                        </div>

                        <div className="flex gap-2 w-full sm:w-auto overflow-x-auto select-none no-scrollbar">
                          {['All', 'Active', 'Pending', 'Canceled'].map((filterVal) => (
                            <button
                              key={filterVal}
                              onClick={() => setStudentFilter(filterVal)}
                              className={`px-3.5 py-2 text-[10px] font-bold uppercase tracking-wider rounded-lg border transition-colors cursor-pointer min-h-[36px] ${
                                studentFilter === filterVal 
                                  ? 'bg-brand-accent text-black border-brand-accent font-extrabold shadow-sm' 
                                  : 'bg-brand-primary/80 border-brand-border text-brand-muted hover:text-white hover:border-white/20'
                              }`}
                            >
                              {filterVal}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Desktop Table View */}
                      <div className="hidden md:block overflow-hidden bg-brand-secondary/40 border border-brand-border rounded-2xl shadow-xl animate-in fade-in duration-300">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="bg-brand-secondary/90 border-b border-brand-border text-brand-muted text-[10px] font-bold uppercase tracking-wider">
                              <th className="p-4">Athlete Core details</th>
                              <th className="p-4">Contact Info</th>
                              <th className="p-4">Enrolled Course</th>
                              <th className="p-4">Approved Status</th>
                              <th className="p-4 text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-brand-border/40 text-sm">
                            {filteredStudents.length === 0 ? (
                              <tr>
                                <td colSpan={5} className="p-12 text-center text-brand-muted font-mono text-xs">
                                  No records found in database.
                                </td>
                              </tr>
                            ) : (
                              filteredStudents.map((athlete) => (
                                <tr key={athlete.id} className="hover:bg-brand-secondary/20 transition-colors">
                                  <td className="p-4">
                                    <div className="flex items-center gap-3">
                                      <div className="relative w-9 h-9 rounded-full overflow-hidden shrink-0 border border-brand-border bg-brand-primary flex items-center justify-center">
                                        {athlete.image ? (
                                          <img src={athlete.image} alt={athlete.name} className="object-cover w-full h-full" />
                                        ) : (
                                          <span className="text-[10px] font-mono tracking-wider font-extrabold text-brand-accent uppercase">
                                            {athlete.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                                          </span>
                                        )}
                                      </div>
                                      <div>
                                        <div className="font-bold text-white text-sm">{athlete.name}</div>
                                        <div className="text-[10px] text-brand-muted font-mono mt-0.5">REGISTERED: {athlete.enrolledDate}</div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="p-4">
                                    <div className="font-mono text-xs text-brand-muted">{athlete.phone}</div>
                                    <div className="text-xs text-brand-muted/75">{athlete.email}</div>
                                  </td>
                                  <td className="p-4">
                                    <span className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-brand-primary border border-brand-border/60 text-white/90">
                                      {athlete.course}
                                    </span>
                                  </td>
                                  <td className="p-4">
                                    <button
                                      onClick={() => handleToggleStudentStatus(athlete.id, athlete.status)}
                                      className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest transition-all border shrink-0 cursor-pointer ${
                                        athlete.status === 'Active' ? 'bg-[#52fa7c]/10 text-[#2ee159] border-[#2ee159]/30' :
                                        athlete.status === 'Pending' ? 'bg-amber-400/10 text-amber-500 border-amber-400/30' :
                                        'bg-neutral-800 text-brand-muted border-brand-border'
                                      }`}
                                    >
                                      {athlete.status}
                                    </button>
                                  </td>
                                  <td className="p-4 text-right">
                                    <div className="flex justify-end gap-2">
                                      <button 
                                        onClick={() => startEditingStudent(athlete)}
                                        className="p-2.5 rounded-xl border border-brand-border hover:border-brand-accent hover:text-brand-accent transition-colors text-brand-muted cursor-pointer min-h-[38px] min-w-[38px] flex items-center justify-center animate-in zoom-in-75 duration-300"
                                        title="Edit Athlete Record"
                                      >
                                        <Edit3 className="w-4 h-4" />
                                      </button>
                                      <button 
                                        onClick={() => handleDeleteStudent(athlete.id, athlete.name)}
                                        className="p-2.5 rounded-xl border border-brand-border hover:bg-red-500/10 hover:border-red-500 hover:text-red-500 transition-colors text-brand-muted group cursor-pointer min-h-[38px] min-w-[38px] flex items-center justify-center"
                                        title="Delete Record"
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      </div>

                      {/* Mobile Card Deck View */}
                      <div className="md:hidden space-y-4 animate-in fade-in duration-305">
                        {filteredStudents.length === 0 ? (
                          <div className="p-10 text-center text-brand-muted bg-brand-secondary border border-brand-border rounded-xl font-mono text-xs">
                            No records matching filter settings.
                          </div>
                        ) : (
                          filteredStudents.map((athlete) => (
                            <div key={athlete.id} className="p-5 bg-brand-secondary/40 border border-brand-border rounded-[1.5rem] space-y-4 shadow-sm">
                              <div className="flex justify-between items-start gap-3">
                                <div className="flex items-center gap-2.5">
                                  <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 border border-brand-border bg-brand-primary flex items-center justify-center">
                                    {athlete.image ? (
                                      <img src={athlete.image} alt={athlete.name} className="object-cover w-full h-full" />
                                    ) : (
                                      <span className="text-[9px] font-mono tracking-wider font-extrabold text-brand-accent uppercase">
                                        {athlete.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                                      </span>
                                    )}
                                  </div>
                                  <div>
                                    <h3 className="font-bold text-white leading-tight">{athlete.name}</h3>
                                    <div className="text-[9px] text-brand-muted font-mono mt-0.5">ENROLLED: {athlete.enrolledDate}</div>
                                  </div>
                                </div>
                                <button
                                  onClick={() => handleToggleStudentStatus(athlete.id, athlete.status)}
                                  className={`px-3 py-0.5 rounded-full text-[9px] font-bold uppercase border cursor-pointer ${
                                    athlete.status === 'Active' ? 'bg-[#52fa7c]/10 text-[#2ee159] border-[#52fa7c]/30' :
                                    athlete.status === 'Pending' ? 'bg-amber-400/10 text-amber-500 border-amber-400/30' :
                                    'bg-neutral-800 text-brand-muted border-brand-border'
                                  }`}
                                >
                                  {athlete.status}
                                </button>
                              </div>

                              <div className="grid grid-cols-2 gap-3 text-xs bg-brand-primary/40 border border-brand-border/40 p-3 rounded-xl">
                                <div>
                                  <div className="text-[8px] text-brand-muted uppercase tracking-wider mb-0.5">PHONE</div>
                                  <div className="text-white font-mono font-bold">{athlete.phone}</div>
                                </div>
                                <div>
                                  <div className="text-[8px] text-brand-muted uppercase tracking-wider mb-0.5">COURSE</div>
                                  <div className="text-brand-accent font-bold truncate">{athlete.course}</div>
                                </div>
                                <div className="col-span-2 border-t border-brand-border/30 pt-2 shrink-0">
                                  <div className="text-[8px] text-brand-muted uppercase tracking-wider mb-0.5">EMAIL ID</div>
                                  <div className="text-white/80 truncate font-sans">{athlete.email}</div>
                                </div>
                              </div>

                              <div className="flex gap-2">
                                <button 
                                  onClick={() => handleToggleStudentStatus(athlete.id, athlete.status)}
                                  className="flex-1 py-2.5 bg-brand-primary border border-brand-border text-[9px] font-bold tracking-widest text-white rounded-xl uppercase hover:bg-neutral-900 focus:outline-none min-h-[40px] cursor-pointer"
                                >
                                  CHANGE STATUS
                                </button>
                                <button 
                                  onClick={() => startEditingStudent(athlete)}
                                  className="w-10 h-10 bg-brand-primary border border-brand-border flex items-center justify-center text-brand-muted hover:text-brand-accent hover:border-brand-accent rounded-xl transition-colors min-h-[40px] min-w-[40px] cursor-pointer"
                                  aria-label="Edit Record"
                                >
                                  <Edit3 className="w-4 h-4" />
                                </button>
                                <button 
                                  onClick={() => handleDeleteStudent(athlete.id, athlete.name)}
                                  className="w-10 h-10 bg-brand-primary border border-brand-border flex items-center justify-center text-[#ff4c4c] hover:bg-red-500/10 hover:border-red-500 rounded-xl transition-colors min-h-[40px] min-w-[40px] cursor-pointer"
                                  aria-label="Delete Student"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: WEEKLY SCHEDULE MANAGER */}
              {activeTab === 'schedule' && (
                <div className="grid lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Column timing log addition form */}
                  <div className="lg:col-span-4 p-6 bg-brand-secondary/40 border border-brand-border/80 rounded-[2rem] shadow-lg">
                    <h2 className="text-xs font-black uppercase tracking-[0.2em] text-white border-b border-brand-border/40 pb-4 mb-5 flex items-center gap-2 font-display">
                      <Calendar className="w-4 h-4 text-brand-accent" /> ADD SESSION RECORD
                    </h2>

                    <form onSubmit={handleAddClass} className="space-y-4 text-xs">
                      <div className="space-y-1.5">
                        <label className="text-brand-muted font-bold tracking-wider uppercase text-[10px]">Day of the Week</label>
                        <select 
                          value={selectedDay}
                          onChange={(e) => setSelectedDay(e.target.value)}
                          className="w-full bg-brand-primary border border-brand-border p-3 rounded-xl text-white focus:outline-none focus:border-brand-accent h-[44px]"
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
                        <label className="text-brand-muted font-bold tracking-wider uppercase text-[10px]">Session Time Frame</label>
                        <input 
                          type="text" 
                          value={newClassTime}
                          onChange={(e) => setNewClassTime(e.target.value)}
                          placeholder="e.g. 5:30 - 7:00 PM"
                          className="w-full bg-brand-primary border border-brand-border p-3 rounded-xl text-white text-sm focus:outline-none focus:border-brand-accent transition-colors"
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-brand-muted font-bold tracking-wider uppercase text-[10px]">Activity / Module</label>
                        <input 
                          type="text" 
                          value={newClassActivity}
                          onChange={(e) => setNewClassActivity(e.target.value)}
                          placeholder="e.g. MMA / Tactical Muay Thai"
                          className="w-full bg-brand-primary border border-brand-border p-3 rounded-xl text-white text-sm focus:outline-none focus:border-brand-accent transition-colors"
                          required
                        />
                      </div>

                      <button 
                        type="submit"
                        className="w-full py-4 bg-brand-accent text-black font-bold uppercase tracking-widest rounded-xl hover:bg-brand-accent-hover transition-colors min-h-[44px] cursor-pointer shadow-md shadow-brand-accent/15"
                      >
                        ADD TO TIMETABLE
                      </button>
                    </form>
                  </div>

                  {/* Right Column timetables breakdown list */}
                  <div className="lg:col-span-8 space-y-6">
                    <div>
                      <h3 className="text-base font-bold uppercase text-white tracking-widest">Active Class Timetable</h3>
                    </div>

                    <div className="space-y-4">
                      {scheduleData.length === 0 ? (
                        <p className="p-10 text-center text-xs text-brand-muted border border-brand-border border-dashed rounded-2xl">
                          No scheduled class hours set. Add a session record to begin.
                        </p>
                      ) : (
                        scheduleData.map((dayGroup) => (
                          <div key={dayGroup.day} className="p-6 bg-brand-secondary/40 border border-brand-border/80 rounded-[1.8rem] space-y-3.5 shadow-md">
                            <div className="font-display font-black text-brand-accent text-sm border-b border-brand-border/40 pb-3 flex justify-between items-center uppercase tracking-wider">
                              <span>{dayGroup.day} Classes</span>
                            </div>

                            <div className="divide-y divide-brand-border/30">
                              {dayGroup.classes.map((cls) => (
                                <div key={cls.id} className="flex items-center justify-between py-3.5 hover:bg-white/[0.01]">
                                  {editingClassDay === dayGroup.day && editingClassId === cls.id ? (
                                    <div className="flex-1 flex items-center gap-2">
                                      <input
                                        type="text"
                                        value={editingClassTime}
                                        onChange={(e) => setEditingClassTime(e.target.value)}
                                        className="flex-1 bg-brand-primary border border-brand-accent p-2 rounded-lg text-white text-xs font-mono focus:outline-none"
                                        placeholder="Time"
                                      />
                                      <input
                                        type="text"
                                        value={editingClassActivity}
                                        onChange={(e) => setEditingClassActivity(e.target.value)}
                                        className="flex-[2] bg-brand-primary border border-brand-accent p-2 rounded-lg text-white text-xs focus:outline-none"
                                        placeholder="Activity"
                                      />
                                      <button
                                        onClick={saveEditedClass}
                                        className="p-2 bg-brand-accent text-black rounded-lg hover:bg-brand-accent-hover transition-colors min-w-[34px] min-h-[34px] flex items-center justify-center cursor-pointer"
                                        title="Save"
                                      >
                                        <Save className="w-3.5 h-3.5" />
                                      </button>
                                      <button
                                        onClick={cancelEditingClass}
                                        className="p-2 border border-brand-border text-brand-muted hover:text-white rounded-lg transition-colors min-w-[34px] min-h-[34px] flex items-center justify-center cursor-pointer"
                                        title="Cancel"
                                      >
                                        <X className="w-3.5 h-3.5" />
                                      </button>
                                    </div>
                                  ) : (
                                    <>
                                      <div className="flex gap-4.5 items-center">
                                        <div className="w-2 h-2 rounded-full bg-brand-accent shrink-0 shadow-[0_0_8px_rgba(204,255,0,0.5)]" />
                                        <div>
                                          <div className="text-xs font-mono text-brand-muted leading-none">{cls.time}</div>
                                          <div className="text-base font-bold text-white mt-1.5">{cls.activity}</div>
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <button
                                          onClick={() => startEditingClass(dayGroup.day, cls)}
                                          className="p-2.5 border border-brand-border hover:border-brand-accent hover:text-brand-accent rounded-xl transition-all min-w-[38px] min-h-[38px] flex items-center justify-center cursor-pointer text-brand-muted"
                                          title="Edit class"
                                        >
                                          <Edit3 className="w-3.5 h-3.5" />
                                        </button>
                                        <button
                                          onClick={() => handleDeleteClass(dayGroup.day, cls.id)}
                                          className="p-2.5 border border-brand-border hover:border-red-500 hover:text-red-500 rounded-xl transition-all min-w-[38px] min-h-[38px] flex items-center justify-center cursor-pointer text-brand-muted"
                                          title="Remove timing option"
                                        >
                                          <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                      </div>
                                    </>
                                  )}
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

              {/* TAB 3: PLANS & PRICING CONFIGS */}
              {activeTab === 'pricing' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-base font-bold uppercase text-white tracking-widest">Dynamic Package Pricing Plans</h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 items-start">
                    {pricingData.map((plan) => (
                      <div 
                        key={plan.id}
                        className={`p-6 sm:p-8 border rounded-[2rem] bg-brand-secondary/45 relative space-y-6 transition-all duration-500 shadow-xl ${
                          plan.highlight 
                            ? 'border-brand-accent/50 shadow-[0_0_30px_rgba(204,255,0,0.06)]' 
                            : 'border-brand-border/80'
                        }`}
                      >
                        {editingPlanId === plan.id ? (
                          /* FORM EDIT MODE IN CONSOLE MODULE */
                          <div className="space-y-4 text-xs font-mono">
                            <div className="flex gap-2.5 items-center">
                              <span className="px-2.5 py-1 bg-brand-accent text-black uppercase font-bold text-[9px] rounded-full">
                                EDIT FORMAT
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
                                  className="w-full bg-brand-primary border border-brand-border p-2.5 rounded-lg text-white font-sans text-sm focus:outline-none focus:border-brand-accent transition-colors"
                                />
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-brand-muted uppercase tracking-wider font-bold">Price Option</label>
                                <input 
                                  type="text"
                                  value={editingPlanForm.price}
                                  onChange={(e) => setEditingPlanForm({...editingPlanForm, price: e.target.value})}
                                  className="w-full bg-brand-primary border border-brand-border p-2.5 rounded-lg text-brand-accent font-sans text-sm focus:outline-none focus:border-brand-accent transition-colors"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 pb-2 border-b border-brand-border/40">
                              <div className="space-y-1.5">
                                <label className="text-brand-muted uppercase tracking-wider font-bold">Original Strikeout Price</label>
                                <input 
                                  type="text"
                                  value={editingPlanForm.originalPrice}
                                  onChange={(e) => setEditingPlanForm({...editingPlanForm, originalPrice: e.target.value})}
                                  placeholder="e.g. 9,000/-"
                                  className="w-full bg-brand-primary border border-brand-border p-2.5 rounded-lg text-white font-sans text-xs focus:outline-none focus:border-brand-accent transition-colors"
                                />
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-brand-muted uppercase tracking-wider font-bold">Ribbon Badge Banner</label>
                                <input 
                                  type="text"
                                  value={editingPlanForm.badge}
                                  onChange={(e) => setEditingPlanForm({...editingPlanForm, badge: e.target.value})}
                                  placeholder="e.g. Most Popular"
                                  className="w-full bg-brand-primary border border-brand-border p-2.5 rounded-lg text-white font-sans text-xs focus:outline-none focus:border-brand-accent transition-colors"
                                />
                              </div>
                            </div>

                            <div className="flex items-center gap-3 py-2.5 px-3 bg-brand-primary border border-brand-border rounded-xl">
                              <input 
                                type="checkbox"
                                id={`hl-${plan.id}`}
                                checked={editingPlanForm.highlight}
                                onChange={(e) => setEditingPlanForm({...editingPlanForm, highlight: e.target.checked})}
                                className="w-4 h-4 text-brand-accent accent-brand-accent shrink-0 rounded cursor-pointer"
                              />
                              <label htmlFor={`hl-${plan.id}`} className="font-bold text-white uppercase tracking-wider cursor-pointer font-sans text-[11px]">
                                Highlight & Recommend
                              </label>
                            </div>

                            <div className="space-y-1.5">
                              <label className="text-brand-muted uppercase tracking-wider font-bold">
                                Features (one bullet highlight per row)
                              </label>
                              <textarea 
                                rows={4}
                                value={editingPlanForm.features}
                                onChange={(e) => setEditingPlanForm({...editingPlanForm, features: e.target.value})}
                                placeholder="Bullet Points..."
                                className="w-full bg-brand-primary border border-brand-border p-3 rounded-lg font-sans text-sm tracking-normal focus:outline-none focus:border-brand-accent duration-200"
                              />
                            </div>

                            <div className="flex gap-2">
                              <button
                                onClick={() => saveEditedPlan(plan.id)}
                                className="flex-1 py-3 bg-brand-accent text-black font-bold uppercase text-xs rounded-xl flex items-center justify-center gap-2 hover:bg-brand-accent-hover transition-all min-h-[44px] cursor-pointer shadow-md shadow-brand-accent/15"
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
                          /* CARD DISPLAY MODE */
                          <div className="space-y-5">
                            <div className="flex justify-between items-start">
                              <div>
                                {plan.badge && (
                                  <span className="inline-block px-3 py-1 bg-brand-accent text-black font-bold uppercase text-[9px] tracking-widest rounded-full mb-3 shadow-sm">
                                    {plan.badge}
                                  </span>
                                )}
                                <h4 className="text-xl font-display font-black text-white uppercase tracking-tight">{plan.title}</h4>
                              </div>

                              <button 
                                onClick={() => startEditingPlan(plan)}
                                className="p-2.5 border border-brand-border hover:border-brand-accent hover:text-brand-accent rounded-xl text-brand-muted transition-all flex items-center justify-center gap-1.5 font-mono text-[9px] font-bold uppercase tracking-widest cursor-pointer min-h-[38px]"
                              >
                                <Edit3 className="w-3.5 h-3.5" /> EDIT FORMAT
                              </button>
                            </div>

                            <div className="flex items-baseline gap-2">
                              {plan.originalPrice && (
                                <span className="text-sm line-through text-brand-muted/70 font-bold">{plan.originalPrice}</span>
                              )}
                              <span className="text-3xl font-display font-black text-brand-accent">{plan.price}</span>
                              <span className="text-xs text-brand-muted uppercase font-bold">/ Course</span>
                            </div>

                            <ul className="space-y-3 pt-5 border-t border-brand-border/40 text-sm">
                              {plan.features.map((feature, fIdx) => (
                                <li key={fIdx} className="flex items-center gap-3 text-white/90">
                                  <CheckCircle2 className="w-4.5 h-4.5 text-brand-accent shrink-0" />
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>

                            {plan.highlight && (
                              <div className="p-3 bg-brand-accent/5 border border-brand-accent/20 rounded-xl text-center text-brand-accent text-[10px] font-bold uppercase tracking-widest">
                                ★ Featured Showcase package
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
                    <h3 className="text-base font-bold uppercase text-white tracking-widest">Client Contact Board Messages</h3>
                  </div>

                  <div className="space-y-4">
                    {inquiries.length === 0 ? (
                      <div className="p-16 text-center text-sm font-sans uppercase text-brand-muted bg-brand-secondary/40 border border-brand-border border-dashed rounded-2xl">
                        Your mailbox is currently clean. No new inquiries.
                      </div>
                    ) : (
                      inquiries.map((inq) => (
                        <div 
                          key={inq.id}
                          className={`p-6 bg-brand-secondary/45 border rounded-[2rem] space-y-4 transition-all duration-500 relative shadow-md ${
                            inq.read ? 'border-brand-border/80' : 'border-brand-accent/50 shadow-brand-accent/5'
                          }`}
                        >
                          {!inq.read && (
                            <div className="absolute top-5 right-5 bg-brand-accent text-black font-mono font-black text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md select-none">
                              UNREAD MESSAGE
                            </div>
                          )}

                          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-brand-border/40 pb-4">
                            <div>
                              <div className="flex items-center gap-2.5">
                                <span className="font-bold text-white text-base">{inq.name}</span>
                                <span className="text-[10px] font-mono text-brand-muted uppercase font-bold">({inq.date})</span>
                              </div>
                              <div className="text-xs text-brand-muted font-sans mt-0.5">{inq.email}</div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              <button
                                onClick={() => handleToggleInquiryRead(inq.id)}
                                className={`px-4 py-2 font-mono text-[9px] font-bold uppercase tracking-wider rounded-xl border transition-colors cursor-pointer min-h-[34px] ${
                                  inq.read 
                                    ? 'bg-brand-primary border-brand-border text-brand-muted hover:text-white hover:border-white/20' 
                                    : 'bg-brand-accent/10 border-brand-accent text-brand-accent hover:bg-brand-accent/20'
                                }`}
                              >
                                {inq.read ? 'UNREAD' : 'MARK READ'}
                              </button>
                              
                              <button
                                onClick={() => handleDeleteInquiry(inq.id)}
                                className="p-2 border border-brand-border text-brand-muted hover:text-red-500 hover:border-red-500 rounded-xl transition-colors min-w-[34px] min-h-[34px] flex items-center justify-center cursor-pointer"
                                title="Delete Message"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          <p className="text-sm text-brand-muted leading-relaxed font-sans bg-brand-primary/40 border border-brand-border/20 p-5 rounded-2xl italic">
                            &ldquo;{inq.message}&rdquo;
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* TAB 5: PRODUCTS / SHOP MANAGEMENT */}
              {activeTab === 'products' && (
                <div className="space-y-6">
                  {/* Separate Page sub-navigation header for products list and form */}
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-brand-border/40 pb-5 mb-6">
                    <div>
                      <h3 className="text-xl font-display font-black uppercase text-white tracking-tight">
                        {productSubTab === 'list' ? 'Store Catalog & Inventory' : editingProductId ? 'Edit Product Details' : 'Register New Gear'}
                      </h3>
                      <p className="text-xs text-brand-muted font-mono tracking-wider mt-0.5 animate-pulse text-brand-accent">
                        {productSubTab === 'list' ? 'STOREFRONT GEAR INVENTORY STOCKLIST' : 'CREATE HIGH-END PRODUCT DISPLAY'}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setProductSubTab('list');
                          setEditingProductId(null);
                        }}
                        className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all border min-h-[40px] cursor-pointer ${
                          productSubTab === 'list'
                            ? 'bg-brand-accent text-black font-black border-brand-accent shadow-sm shadow-brand-accent/20'
                            : 'bg-brand-secondary/80 border-brand-border text-brand-muted hover:text-white'
                        }`}
                      >
                        Product Catalog
                      </button>
                      <button
                        onClick={() => {
                          setProductSubTab('form');
                          setEditingProductId(null);
                          setNewProduct({ name: '', price: '', category: 'Equipment', description: '', image: '', rating: '5.0' });
                        }}
                        className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all border min-h-[40px] cursor-pointer ${
                          productSubTab === 'form' && !editingProductId
                            ? 'bg-brand-accent text-black font-black border-brand-accent shadow-sm shadow-brand-accent/20'
                            : 'bg-brand-secondary/80 border-brand-border text-brand-muted hover:text-white'
                        }`}
                      >
                        + Add Gear
                      </button>
                    </div>
                  </div>

                  {productSubTab === 'form' ? (
                    /* Focused Product Input Details Form */
                    <div className="max-w-2xl mx-auto w-full p-8 bg-brand-secondary/40 border border-brand-border/85 rounded-[2.5rem] relative shadow-2xl">
                      {editingProductId ? (
                        <>
                          <div className="flex items-center justify-between border-b border-brand-border/40 pb-4 mb-6">
                            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-white flex items-center gap-2.5 font-display2">
                              <Edit3 className="w-5 h-5 text-brand-accent animate-pulse" /> Edit Shop Product
                            </h2>
                            <button
                              onClick={() => { setProductSubTab('list'); setEditingProductId(null); }}
                              className="text-xs text-brand-muted hover:text-white font-mono uppercase tracking-widest flex items-center gap-1 cursor-pointer"
                            >
                              ← Back to Catalog
                            </button>
                          </div>
                          
                          <form onSubmit={(e) => { e.preventDefault(); saveEditedProduct(editingProductId); }} className="space-y-6 text-xs">
                            <div className="space-y-2">
                              <label className="text-brand-muted font-bold tracking-wider uppercase text-[10px]">Product Name *</label>
                              <input 
                                type="text" 
                                required
                                placeholder="e.g. Invictus Rashguard"
                                value={editingProductForm.name}
                                onChange={(e) => setEditingProductForm({...editingProductForm, name: e.target.value})}
                                className="w-full bg-brand-primary border border-brand-border p-3.5 rounded-xl text-white text-sm focus:border-brand-accent focus:outline-none transition-colors"
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <label className="text-brand-muted font-bold tracking-wider uppercase text-[10px]">Price (৳) *</label>
                                <input 
                                  type="number" 
                                  required
                                  step="0.01"
                                  placeholder="e.g. 1200"
                                  value={editingProductForm.price}
                                  onChange={(e) => setEditingProductForm({...editingProductForm, price: e.target.value})}
                                  className="w-full bg-brand-primary border border-brand-border p-3.5 rounded-xl text-white text-sm font-mono focus:border-brand-accent focus:outline-none transition-colors"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-brand-muted font-bold tracking-wider uppercase text-[10px]">Category *</label>
                                <select
                                  value={editingProductForm.category}
                                  onChange={(e) => setEditingProductForm({...editingProductForm, category: e.target.value})}
                                  className="w-full bg-brand-primary border border-brand-border p-3.5 rounded-xl text-white text-xs focus:border-brand-accent focus:outline-none transition-colors cursor-pointer h-[48px]"
                                >
                                  <option value="Apparel">Apparel</option>
                                  <option value="Equipment">Equipment</option>
                                  <option value="Digital">Digital</option>
                                </select>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <label className="text-brand-muted font-bold tracking-wider uppercase text-[10px]">Rating Code *</label>
                                <input 
                                  type="text" 
                                  placeholder="e.g. 4.9"
                                  value={editingProductForm.rating}
                                  onChange={(e) => setEditingProductForm({...editingProductForm, rating: e.target.value})}
                                  className="w-full bg-brand-primary border border-brand-border p-3.5 rounded-xl text-white text-sm font-mono focus:border-brand-accent focus:outline-none transition-colors"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-brand-muted font-bold tracking-wider uppercase text-[10px]">Product Image URL</label>
                                <input 
                                  type="text" 
                                  placeholder="e.g. https://picsum.photos/..."
                                  value={editingProductForm.image}
                                  onChange={(e) => setEditingProductForm({...editingProductForm, image: e.target.value})}
                                  className="w-full bg-brand-primary border border-brand-border p-3.5 rounded-xl text-white text-sm focus:border-brand-accent focus:outline-none transition-colors"
                                />
                              </div>
                            </div>

                            <ImageUploader 
                              id="edit-product-img"
                              value={editingProductForm.image}
                              onChange={(val) => setEditingProductForm({...editingProductForm, image: val})}
                            />

                            <div className="space-y-2">
                              <label className="text-brand-muted font-bold tracking-wider uppercase text-[10px]">Short Description</label>
                              <textarea 
                                rows={3}
                                placeholder="Briefly summarize what makes this gear standard elite..."
                                value={editingProductForm.description}
                                onChange={(e) => setEditingProductForm({...editingProductForm, description: e.target.value})}
                                className="w-full bg-brand-primary border border-brand-border p-3.5 rounded-xl text-white text-sm focus:border-brand-accent focus:outline-none transition-colors font-sans"
                              />
                            </div>

                            <div className="flex gap-3 pt-4">
                              <button 
                                type="submit"
                                className="flex-1 py-4 bg-brand-accent text-black font-extrabold uppercase tracking-widest rounded-xl hover:bg-brand-accent-hover transition-colors min-h-[48px] cursor-pointer shadow-md shadow-brand-accent/15 text-xs"
                              >
                                SAVE CHANGES
                              </button>
                              <button 
                                type="button"
                                onClick={() => { setProductSubTab('list'); setEditingProductId(null); }}
                                className="px-6 py-4 bg-brand-primary border border-brand-border text-brand-muted hover:text-white font-mono text-xs rounded-xl min-h-[48px] cursor-pointer"
                              >
                                CANCEL
                              </button>
                            </div>
                          </form>
                        </>
                      ) : (
                        <>
                          <div className="flex items-center justify-between border-b border-brand-border/40 pb-4 mb-6">
                            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-white flex items-center gap-2.5 font-display2">
                              <ShoppingBag className="w-5 h-5 text-brand-accent" /> Register Store Product
                            </h2>
                            <button
                              onClick={() => setProductSubTab('list')}
                              className="text-xs text-brand-muted hover:text-white font-mono uppercase tracking-widest flex items-center gap-1 cursor-pointer"
                            >
                              ← Back to Catalog
                            </button>
                          </div>
                          
                          <form onSubmit={handleAddProduct} className="space-y-6 text-xs">
                            <div className="space-y-2">
                              <label className="text-brand-muted font-bold tracking-wider uppercase text-[10px]">Product Name *</label>
                              <input 
                                type="text" 
                                required
                                placeholder="e.g. Invictus Rashguard"
                                value={newProduct.name}
                                onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                                className="w-full bg-brand-primary border border-brand-border p-3.5 rounded-xl text-white text-sm focus:border-brand-accent focus:outline-none transition-colors"
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <label className="text-brand-muted font-bold tracking-wider uppercase text-[10px]">Price (৳) *</label>
                                <input 
                                  type="number" 
                                  required
                                  step="0.01"
                                  placeholder="e.g. 1200"
                                  value={newProduct.price}
                                  onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                                  className="w-full bg-brand-primary border border-brand-border p-3.5 rounded-xl text-white text-sm focus:border-brand-accent focus:outline-none transition-colors"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-brand-muted font-bold tracking-wider uppercase text-[10px]">Category *</label>
                                <select
                                  value={newProduct.category}
                                  onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                                  className="w-full bg-brand-primary border border-brand-border p-3.5 rounded-xl text-white text-xs focus:border-brand-accent focus:outline-none transition-colors cursor-pointer h-[48px]"
                                >
                                  <option value="Apparel">Apparel</option>
                                  <option value="Equipment">Equipment</option>
                                  <option value="Digital">Digital</option>
                                </select>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <label className="text-brand-muted font-bold tracking-wider uppercase text-[10px]">Rating Code *</label>
                                <input 
                                  type="text" 
                                  placeholder="e.g. 4.9"
                                  value={newProduct.rating}
                                  onChange={(e) => setNewProduct({...newProduct, rating: e.target.value})}
                                  className="w-full bg-brand-primary border border-brand-border p-3.5 rounded-xl text-white text-sm font-mono focus:border-brand-accent focus:outline-none transition-colors"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-brand-muted font-bold tracking-wider uppercase text-[10px]">Product Image URL</label>
                                <input 
                                  type="text" 
                                  placeholder="e.g. https://picsum.photos/..."
                                  value={newProduct.image}
                                  onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                                  className="w-full bg-brand-primary border border-brand-border p-3.5 rounded-xl text-white text-sm focus:border-brand-accent focus:outline-none transition-colors"
                                />
                              </div>
                            </div>

                            <ImageUploader 
                              id="new-product-img"
                              value={newProduct.image}
                              onChange={(val) => setNewProduct({...newProduct, image: val})}
                            />

                            <div className="space-y-2">
                              <label className="text-brand-muted font-bold tracking-wider uppercase text-[10px]">Short Description</label>
                              <textarea 
                                rows={3}
                                placeholder="Briefly summarize what makes this gear standard elite..."
                                value={newProduct.description}
                                onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                                className="w-full bg-brand-primary border border-brand-border p-3.5 rounded-xl text-white text-sm focus:border-brand-accent focus:outline-none transition-colors font-sans"
                              />
                            </div>

                            <button 
                              type="submit"
                              className="w-full py-4 bg-brand-accent text-black font-extrabold uppercase tracking-widest text-xs rounded-xl hover:bg-brand-accent-hover transition-colors min-h-[48px] cursor-pointer shadow-lg shadow-brand-accent/10"
                            >
                              REGISTER PRODUCT RECORD
                            </button>
                          </form>
                        </>
                      )}
                    </div>
                  ) : (
                    /* Full-width Product Directory Table */
                    <div className="w-full space-y-4">
                      <div className="p-6 bg-brand-secondary/40 border border-brand-border/80 rounded-[2rem] shadow-xl animate-in fade-in duration-300">
                        <h3 className="text-xs font-black uppercase tracking-widest text-white border-b border-brand-border/40 pb-4 mb-4 font-display">
                          🏪 Store Inventory Inventory Directory ({products.length})
                        </h3>
                        
                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse text-xs">
                            <thead>
                              <tr className="border-b border-brand-border/60 text-brand-muted uppercase font-mono tracking-wider">
                                <th className="pb-3 p-2 font-bold">Product ID / Item Name</th>
                                <th className="pb-3 p-2 font-bold">Category</th>
                                <th className="pb-3 p-2 font-bold">Price</th>
                                <th className="pb-3 p-2 font-bold">Rating</th>
                                <th className="pb-3 p-2 font-bold text-right">Actions</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-brand-border/30">
                              {products.length === 0 ? (
                                <tr>
                                  <td colSpan={5} className="py-12 text-center text-brand-muted uppercase font-mono">
                                    No products found in stock.
                                  </td>
                                </tr>
                              ) : (
                                products.map((prod) => (
                                  <tr key={prod.id} className="hover:bg-white/[0.01]">
                                    <td className="py-4 p-2">
                                      <div className="flex items-center gap-3">
                                        <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-brand-border bg-brand-primary">
                                          <img src={prod.image} alt={prod.name} className="object-cover w-full h-full grayscale" />
                                        </div>
                                        <div>
                                          <div className="font-bold text-white text-sm">{prod.name}</div>
                                          <div className="text-[10px] font-mono text-brand-muted mt-0.5">ID: {prod.id}</div>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="py-4 p-2">
                                      <span className="px-2 py-0.5 bg-brand-primary border border-brand-border text-[9px] font-mono font-bold uppercase rounded text-brand-accent">
                                        {prod.category}
                                      </span>
                                    </td>
                                    <td className="py-4 p-2 font-bold text-white">৳{(prod.price || 0).toLocaleString()}</td>
                                    <td className="py-4 p-2 font-mono text-amber-400 font-bold">★ {prod.rating || "5.0"}</td>
                                    <td className="py-4 p-2 text-right">
                                      <div className="flex justify-end gap-2">
                                        <button 
                                          onClick={() => startEditingProduct(prod)}
                                          className="p-2 border border-brand-border text-brand-muted hover:border-brand-accent hover:text-brand-accent rounded-lg transition-colors cursor-pointer"
                                          title="Edit Product Details"
                                        >
                                          <Edit3 className="w-3.5 h-3.5" />
                                        </button>
                                        <button 
                                          onClick={() => handleDeleteProduct(prod.id, prod.name)}
                                          className="p-2 border border-brand-border text-brand-muted hover:text-red-500 hover:border-red-500 rounded-lg transition-colors cursor-pointer shrink-0"
                                          title="Delete Product"
                                        >
                                          <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                ))
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 6: SHOP ORDERS LIST */}
              {activeTab === 'orders' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-base font-bold uppercase text-white tracking-widest">Store Checkout Stream orders</h3>
                  </div>

                  <div className="space-y-4">
                    {orders.length === 0 ? (
                      <div className="p-16 text-center text-sm font-sans uppercase text-brand-muted bg-brand-secondary/40 border border-brand-border border-dashed rounded-2xl">
                        No orders have been submitted yet. Build connections inside.
                      </div>
                    ) : (
                      orders.map((ord) => (
                        <div 
                          key={ord.id}
                          className={`p-6 bg-brand-secondary/45 border rounded-[2rem] space-y-4 transition-all duration-500 relative shadow-md ${
                            ord.status === 'Pending' 
                              ? 'border-amber-400/40 shadow-amber-400/5' 
                              : ord.status === 'Shipped'
                                ? 'border-sky-500/30 shadow-sky-500/5'
                                : ord.status === 'Delivered'
                                  ? 'border-[#52fa7c]/30'
                                  : 'border-brand-border/80 opacity-75'
                          }`}
                        >
                          <div className="absolute top-5 right-5 flex items-center gap-2">
                            <span className={`font-mono font-black text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md select-none ${
                              ord.status === 'Pending' 
                                ? 'bg-amber-400 text-black' 
                                : ord.status === 'Shipped'
                                  ? 'bg-sky-400 text-black'
                                  : ord.status === 'Delivered'
                                    ? 'bg-emerald-400 text-black'
                                    : 'bg-zinc-800 text-zinc-400'
                            }`}>
                              {ord.status}
                            </span>
                          </div>

                          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-brand-border/40 pb-4">
                            <div>
                              <div className="flex items-center gap-2.5">
                                <span className="font-bold text-white text-base">{ord.athleteName}</span>
                                <span className="text-[10px] font-mono text-brand-muted uppercase font-bold">({ord.date})</span>
                              </div>
                              <div className="text-xs text-brand-muted font-sans mt-0.5">Phone: <span className="font-mono text-white">{ord.phone}</span> • Email: {ord.email}</div>
                              <div className="text-[11px] text-brand-muted tracking-tight font-sans mt-1">Shipping: <span className="text-white">{ord.address}</span></div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0">
                              <button
                                onClick={() => handleToggleOrderStatus(ord.id, ord.status)}
                                className="px-4 py-2 font-mono text-[9px] font-bold uppercase tracking-wider rounded-xl border border-brand-border hover:border-brand-accent text-brand-muted hover:text-brand-accent transition-colors cursor-pointer min-h-[34px]"
                              >
                                Cycle Status
                              </button>
                              
                              <button
                                onClick={() => handleDeleteOrder(ord.id)}
                                className="p-2 border border-brand-border text-brand-muted hover:text-red-500 hover:border-red-500 rounded-xl transition-colors min-w-[34px] min-h-[34px] flex items-center justify-center cursor-pointer"
                                title="Delete Order"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          <div className="flex items-center justify-between gap-4 bg-brand-primary/40 p-4 rounded-xl border border-brand-border/20">
                            <div className="text-xs font-mono font-bold text-brand-muted uppercase">
                              Purchased Items: <span className="text-white normal-case font-sans tracking-normal ml-1.5">{ord.items}</span>
                            </div>
                            <div className="text-right">
                              <div className="text-[9px] font-mono text-brand-muted uppercase">Total Paid ({ord.paymentMethod})</div>
                              <div className="text-base font-display font-black text-brand-accent">৳{(ord.totalPrice || 0).toLocaleString()}</div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* TAB 7: HERO & ABOUT CMS MANAGEMENT */}
              {activeTab === 'content' && (
                <div className="space-y-8 animate-in fade-in duration-300">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-brand-border/40 pb-5">
                    <div>
                      <h3 className="text-base font-bold uppercase text-white tracking-widest">Homepage Brand Section Content Manager</h3>
                      <p className="text-xs text-brand-muted mt-1 font-sans">Make immediate changes to your hero slides and biography philosophy sections.</p>
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-12 gap-8 items-start">
                    {/* Hero Section Edit Form */}
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
                            setHeroSettings(heroForm);
                            syncToStorage('invictus_hero_settings', heroForm);
                            await contentApi.updateHero(heroForm).catch(console.warn);
                            triggerNotification('Hero content segment has been pushed to live production portal!');
                          }}
                          className="w-full py-4 bg-brand-accent text-black font-black uppercase tracking-wider text-xs rounded-xl hover:bg-brand-accent-hover transition-colors min-h-[44px] cursor-pointer shadow-lg shadow-brand-accent/15 flex items-center justify-center gap-2"
                        >
                          <Save className="w-4 h-4 text-black" /> Save Hero Section
                        </button>
                      </div>
                    </div>

                    {/* About Section Edit Form */}
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
                            setAboutSettings(aboutForm);
                            syncToStorage('invictus_about_settings', aboutForm);
                            await contentApi.updateAbout(aboutForm).catch(console.warn);
                            triggerNotification('About Coach biography segment successfully updated!');
                          }}
                          className="w-full py-4 bg-brand-accent text-black font-black uppercase tracking-wider text-xs rounded-xl hover:bg-brand-accent-hover transition-colors min-h-[44px] cursor-pointer shadow-lg shadow-brand-accent/15 flex items-center justify-center gap-2"
                        >
                          <Save className="w-4 h-4 text-black" /> Save Biography Settings
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 8: EXPERIENCE TIMELINE MANAGEMENT */}
              {activeTab === 'experience' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  {/* Separate Page sub-navigation header for experience list and form */}
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-brand-border/40 pb-5 mb-6">
                    <div>
                      <h3 className="text-xl font-display font-black uppercase text-white tracking-tight">
                        {experienceSubTab === 'list' ? 'Professional Experience Timeline' : editingExperienceId ? 'Edit Experience Record' : 'Register New Experience'}
                      </h3>
                      <p className="text-xs text-[#cbcbcb] font-mono tracking-wider mt-0.5 animate-pulse text-brand-accent">
                        {experienceSubTab === 'list' ? 'DYNAMIC HOMEPAGE EXPERIENCES TIMELINE' : 'CREATE HIGH-END WORK RECORD'}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setExperienceSubTab('list');
                          setEditingExperienceId(null);
                        }}
                        className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all border min-h-[40px] cursor-pointer ${
                          experienceSubTab === 'list'
                            ? 'bg-brand-accent text-black font-black border-brand-accent shadow-sm shadow-brand-accent/20'
                            : 'bg-brand-secondary/80 border-brand-border text-brand-muted hover:text-white'
                        }`}
                      >
                        Experience Records
                      </button>
                      <button
                        onClick={() => {
                          setExperienceSubTab('form');
                          setEditingExperienceId(null);
                          setNewExperience({ role: '', company: '', period: '', description: '' });
                        }}
                        className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all border min-h-[40px] cursor-pointer ${
                          experienceSubTab === 'form' && !editingExperienceId
                            ? 'bg-brand-accent text-black font-black border-brand-accent shadow-sm shadow-brand-accent/20'
                            : 'bg-brand-secondary/80 border-brand-border text-brand-muted hover:text-white'
                        }`}
                      >
                        + Add Experience
                      </button>
                    </div>
                  </div>

                  {experienceSubTab === 'form' ? (
                    /* Focused Experience Input Details Form */
                    <div className="max-w-2xl mx-auto w-full p-8 bg-brand-secondary/40 border border-brand-border/85 rounded-[2.5rem] relative shadow-2xl">
                      {editingExperienceId ? (
                        <>
                          <div className="flex items-center justify-between border-b border-brand-border/40 pb-4 mb-6">
                            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-white flex items-center gap-2.5 font-display2">
                              <Edit3 className="w-5 h-5 text-brand-accent animate-pulse" /> Edit Experience Profile
                            </h2>
                            <button
                              onClick={() => { setExperienceSubTab('list'); setEditingExperienceId(null); }}
                              className="text-xs text-brand-muted hover:text-white font-mono uppercase tracking-widest flex items-center gap-1 cursor-pointer"
                            >
                              ← Back to Timeline
                            </button>
                          </div>
                          
                          <form onSubmit={(e) => { e.preventDefault(); saveEditedExperience(editingExperienceId); }} className="space-y-6 text-xs">
                            <div className="space-y-2">
                              <label className="text-brand-muted font-bold tracking-wider uppercase text-[10px]">Role / Designation *</label>
                              <input 
                                type="text" 
                                required
                                placeholder="e.g. Professional Boxing Referee"
                                value={editingExperienceForm.role}
                                onChange={(e) => setEditingExperienceForm({...editingExperienceForm, role: e.target.value})}
                                className="w-full bg-brand-primary border border-brand-border p-3.5 rounded-xl text-white text-sm focus:border-brand-accent focus:outline-none transition-colors"
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <label className="text-brand-muted font-bold tracking-wider uppercase text-[10px]">Company / Organization *</label>
                                <input 
                                  type="text" 
                                  required
                                  placeholder="e.g. World Boxing Council (WBC)"
                                  value={editingExperienceForm.company}
                                  onChange={(e) => setEditingExperienceForm({...editingExperienceForm, company: e.target.value})}
                                  className="w-full bg-brand-primary border border-brand-border p-3.5 rounded-xl text-white text-sm focus:border-brand-accent focus:outline-none transition-colors"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-brand-muted font-bold tracking-wider uppercase text-[10px]">Time Period *</label>
                                <input 
                                  type="text" 
                                  required
                                  placeholder="e.g. 2018 - Present"
                                  value={editingExperienceForm.period}
                                  onChange={(e) => setEditingExperienceForm({...editingExperienceForm, period: e.target.value})}
                                  className="w-full bg-brand-primary border border-brand-border p-3.5 rounded-xl text-white text-sm focus:border-brand-accent focus:outline-none transition-colors"
                                />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <label className="text-brand-muted font-bold tracking-wider uppercase text-[10px]">Short Description / Highlights</label>
                              <textarea 
                                rows={4}
                                placeholder="Details about coaching, achievements, reference events, etc."
                                value={editingExperienceForm.description}
                                onChange={(e) => setEditingExperienceForm({...editingExperienceForm, description: e.target.value})}
                                className="w-full bg-brand-primary border border-brand-border p-3.5 rounded-xl text-white text-sm focus:border-brand-accent focus:outline-none transition-colors font-sans"
                              />
                            </div>

                            <div className="flex gap-3 pt-4">
                              <button 
                                type="submit"
                                className="flex-1 py-4 bg-brand-accent text-black font-extrabold uppercase tracking-widest rounded-xl hover:bg-brand-accent-hover transition-colors min-h-[48px] cursor-pointer shadow-md shadow-brand-accent/15 text-xs"
                              >
                                SAVE CHANGES
                              </button>
                              <button 
                                type="button"
                                onClick={() => { setExperienceSubTab('list'); setEditingExperienceId(null); }}
                                className="px-6 py-4 bg-brand-primary border border-brand-border text-brand-muted hover:text-white font-mono text-xs rounded-xl min-h-[48px] cursor-pointer"
                              >
                                CANCEL
                              </button>
                            </div>
                          </form>
                        </>
                      ) : (
                        <>
                          <div className="flex items-center justify-between border-b border-brand-border/40 pb-4 mb-6">
                            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-white flex items-center gap-2.5 font-display2">
                              <Briefcase className="w-5 h-5 text-brand-accent" /> Register Experience Record
                            </h2>
                            <button
                              onClick={() => setExperienceSubTab('list')}
                              className="text-xs text-brand-muted hover:text-white font-mono uppercase tracking-widest flex items-center gap-1 cursor-pointer"
                            >
                              ← Back to Timeline
                            </button>
                          </div>
                          
                          <form onSubmit={handleAddExperience} className="space-y-6 text-xs">
                            <div className="space-y-2">
                              <label className="text-brand-muted font-bold tracking-wider uppercase text-[10px]">Role / Designation *</label>
                              <input 
                                type="text" 
                                required
                                placeholder="e.g. Owner / Head Coach"
                                value={newExperience.role}
                                onChange={(e) => setNewExperience({...newExperience, role: e.target.value})}
                                className="w-full bg-brand-primary border border-brand-border p-3.5 rounded-xl text-white text-sm focus:border-brand-accent focus:outline-none transition-colors"
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <label className="text-brand-muted font-bold tracking-wider uppercase text-[10px]">Company / Organization *</label>
                                <input 
                                  type="text" 
                                  required
                                  placeholder="e.g. Invictus BJJ & MMA"
                                  value={newExperience.company}
                                  onChange={(e) => setNewExperience({...newExperience, company: e.target.value})}
                                  className="w-full bg-brand-primary border border-brand-border p-3.5 rounded-xl text-white text-sm focus:border-brand-accent focus:outline-none transition-colors"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-brand-muted font-bold tracking-wider uppercase text-[10px]">Time Period *</label>
                                <input 
                                  type="text" 
                                  required
                                  placeholder="e.g. 2018 - Present"
                                  value={newExperience.period}
                                  onChange={(e) => setNewExperience({...newExperience, period: e.target.value})}
                                  className="w-full bg-brand-primary border border-brand-border p-3.5 rounded-xl text-white text-sm focus:border-brand-accent focus:outline-none transition-colors"
                                />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <label className="text-brand-muted font-bold tracking-wider uppercase text-[10px]">Short Description / Highlights</label>
                              <textarea 
                                rows={4}
                                placeholder="Details about coaching, achievements, reference events, etc."
                                value={newExperience.description}
                                onChange={(e) => setNewExperience({...newExperience, description: e.target.value})}
                                className="w-full bg-brand-primary border border-brand-border p-3.5 rounded-xl text-white text-sm focus:border-brand-accent focus:outline-none transition-colors font-sans"
                              />
                            </div>

                            <button 
                              type="submit"
                              className="w-full py-4 bg-brand-accent text-black font-extrabold uppercase tracking-widest text-xs rounded-xl hover:bg-brand-accent-hover transition-colors min-h-[48px] cursor-pointer shadow-lg shadow-brand-accent/10"
                            >
                              REGISTER RECORD
                            </button>
                          </form>
                        </>
                      )}
                    </div>
                  ) : (
                    /* Full-width Experience Directory Table */
                    <div className="w-full space-y-4">
                      <div className="p-6 bg-brand-secondary/40 border border-brand-border/80 rounded-[2rem] shadow-xl animate-in fade-in duration-300">
                        <h3 className="text-xs font-black uppercase tracking-widest text-white border-b border-brand-border/40 pb-4 mb-4 font-display flex items-center gap-2">
                          📋 Experience Timeline Stocklist ({experienceData.length})
                        </h3>
                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse text-xs">
                            <thead>
                              <tr className="border-b border-brand-border/60 text-brand-muted uppercase font-mono tracking-wider font-bold">
                                <th className="pb-3 p-2 font-bold">Role / Job Title</th>
                                <th className="pb-3 p-2 font-bold">Company / Organization</th>
                                <th className="pb-3 p-2 font-bold">Period</th>
                                <th className="pb-3 p-2 font-bold">Highlights Summary</th>
                                <th className="pb-3 p-2 font-bold text-right">Actions</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-brand-border/30">
                              {experienceData.length === 0 ? (
                                <tr>
                                  <td colSpan={5} className="py-8 text-center text-brand-muted font-mono uppercase tracking-wider">
                                    No experiences indexed. Register a record today!
                                  </td>
                                </tr>
                              ) : (
                                experienceData.map((exp) => (
                                  <tr key={exp.id} className="hover:bg-white/[0.01]">
                                    <td className="py-4 p-2 font-bold text-white text-sm leading-tight">
                                      {exp.role}
                                    </td>
                                    <td className="py-4 p-2">
                                      <span className="px-2.5 py-1 bg-brand-primary border border-brand-border text-[9px] font-mono font-bold uppercase rounded text-brand-accent">
                                        {exp.company}
                                      </span>
                                    </td>
                                    <td className="py-4 p-2 font-mono text-brand-muted">{exp.period}</td>
                                    <td className="py-4 p-2 text-brand-muted max-w-xs truncate">{exp.description || "(No description)"}</td>
                                    <td className="py-4 p-2 text-right">
                                      <div className="flex justify-end gap-2">
                                        <button 
                                          onClick={() => startEditingExperience(exp)}
                                          className="p-2 border border-brand-border hover:border-brand-accent text-brand-muted hover:text-brand-accent rounded-xl transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center cursor-pointer"
                                          title="Edit Entry"
                                        >
                                          <Edit3 className="w-4 h-4" />
                                        </button>
                                        <button 
                                          onClick={() => handleDeleteExperience(exp.id)}
                                          className="p-2 border border-brand-border hover:border-red-500 text-brand-muted hover:text-red-500 rounded-xl transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center cursor-pointer"
                                          title="Delete Entry"
                                        >
                                          <Trash2 className="w-4 h-4" />
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                ))
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

            </main>

            {/* Custom high-end footer alignment */}
            <footer className="py-6 border-t border-brand-border bg-brand-secondary/30 text-center text-[10px] font-mono text-brand-muted select-none">
              <div className="container max-w-7xl mx-auto px-4">
                INVICTUS ATHLETICS HQ DHAKA • COMPILABLE LOCAL CLIENT CONSOLE SECURE ROOT
              </div>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
}
