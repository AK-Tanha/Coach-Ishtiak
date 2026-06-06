export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  course: string;
  status: 'Active' | 'Pending' | 'Canceled';
  enrolledDate: string;
  image: string;
  created_at?: string;
}

export interface ScheduleDay {
  day: string;
  classes: ScheduleClass[];
}

export interface ScheduleClass {
  id: string;
  time: string;
  activity: string;
}

export interface PricingPlan {
  id: string;
  title: string;
  price: string;
  originalPrice?: string;
  features: string[];
  highlight: boolean;
  badge?: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
  read: boolean;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  description: string;
  specs?: Record<string, string>;
}

export interface Order {
  id: string;
  athleteName: string;
  phone: string;
  email: string;
  address: string;
  items: string;
  totalPrice: number;
  status: string;
  paymentMethod: string;
  date: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface HeroImage {
  url: string;
  caption: string;
  title: string;
}

export interface HeroSettings {
  badge: string;
  subheading: string;
  title: string;
  name: string;
  description: string;
  images: HeroImage[];
}

export interface AboutSettings {
  badge: string;
  heading: string;
  subheading: string;
  para1: string;
  para2: string;
  image: string;
}

export interface GalleryImage {
  id: number;
  url: string;
  title: string;
  category: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
  selectedSize?: string;
}
