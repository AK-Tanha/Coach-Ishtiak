import type {
  Student,
  ScheduleDay,
  PricingPlan,
  Inquiry,
  Product,
  Order,
  Experience,
  HeroSettings,
  AboutSettings,
  GalleryImage,
  ApiResponse,
} from './types';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000');

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const url = `${BASE_URL}${endpoint}`;
    const token = getToken();

    const headers: Record<string, string> = {
      ...(options.headers as Record<string, string>),
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    if (!(options.body instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }

    const res = await fetch(url, {
      ...options,
      headers,
      credentials: 'include',
    });

    const data = await res.json();
    return data as ApiResponse<T>;
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error',
    };
  }
}

const TOKEN_KEY = 'invictus_admin_token';

function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return sessionStorage.getItem(TOKEN_KEY);
}

function setToken(token: string): void {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(TOKEN_KEY, token);
}

function clearToken(): void {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem(TOKEN_KEY);
}

// Auth
export const auth = {
  login: async (email: string, password: string) => {
    const result = await request<{ token: string; email: string; role: string }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (result.success && result.data?.token) {
      setToken(result.data.token);
    }
    return result;
  },

  verify: () =>
    request<{ email: string; role: string }>('/api/auth/verify', {
      method: 'POST',
    }),

  logout: async () => {
    clearToken();
    return request<void>('/api/auth/logout', { method: 'POST' });
  },
};

// Students
export const students = {
  list: () => request<Student[]>('/api/students'),

  create: (data: Partial<Student>) =>
    request<Student>('/api/students', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: string, data: Partial<Student>) =>
    request<Student>(`/api/students/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  remove: (id: string) =>
    request<void>(`/api/students/${id}`, {
      method: 'DELETE',
    }),
};

// Schedule
export const schedule = {
  list: () => request<ScheduleDay[]>('/api/schedule'),

  update: (data: ScheduleDay[]) =>
    request<ScheduleDay[]>('/api/schedule', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
};

// Pricing
export const pricing = {
  list: () => request<PricingPlan[]>('/api/pricing'),

  create: (data: Partial<PricingPlan>) =>
    request<PricingPlan>('/api/pricing', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (data: Partial<PricingPlan> & { id: string }) =>
    request<PricingPlan>('/api/pricing', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  remove: (id: string) =>
    request<void>(`/api/pricing?id=${id}`, {
      method: 'DELETE',
    }),
};

// Inquiries
export const inquiries = {
  list: () => request<Inquiry[]>('/api/inquiries'),

  create: (data: Partial<Inquiry>) =>
    request<Inquiry>('/api/inquiries', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  toggleRead: (id: string, read: boolean) =>
    request<Inquiry>('/api/inquiries', {
      method: 'PUT',
      body: JSON.stringify({ id, read }),
    }),

  remove: (id: string) =>
    request<void>(`/api/inquiries?id=${id}`, {
      method: 'DELETE',
    }),
};

// Products
export const products = {
  list: () => request<Product[]>('/api/products'),

  create: (data: Partial<Product>) =>
    request<Product>('/api/products', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: number, data: Partial<Product>) =>
    request<Product>(`/api/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  remove: (id: number) =>
    request<void>(`/api/products/${id}`, {
      method: 'DELETE',
    }),
};

// Orders
export const orders = {
  list: () => request<Order[]>('/api/orders'),

  create: (data: Partial<Order>) =>
    request<Order>('/api/orders', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateStatus: (id: string, status: string) =>
    request<Order>(`/api/orders/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    }),

  remove: (id: string) =>
    request<void>(`/api/orders/${id}`, {
      method: 'DELETE',
    }),
};

// Experience
export const experience = {
  list: () => request<Experience[]>('/api/experience'),

  create: (data: Partial<Experience>) =>
    request<Experience>('/api/experience', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: string, data: Partial<Experience>) =>
    request<Experience>(`/api/experience/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  remove: (id: string) =>
    request<void>(`/api/experience/${id}`, {
      method: 'DELETE',
    }),
};

// Content (Hero & About)
export const content = {
  getHero: () => request<HeroSettings>('/api/content/hero'),

  updateHero: (data: Partial<HeroSettings>) =>
    request<HeroSettings>('/api/content/hero', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  getAbout: () => request<AboutSettings>('/api/content/about'),

  updateAbout: (data: Partial<AboutSettings>) =>
    request<AboutSettings>('/api/content/about', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
};

// Gallery
export const gallery = {
  list: () => request<GalleryImage[]>('/api/gallery'),

  create: (data: { url: string; title: string; category: string }) =>
    request<GalleryImage>('/api/gallery', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  remove: (id: number) =>
    request<void>(`/api/gallery?id=${id}`, {
      method: 'DELETE',
    }),
};

// Upload
export const upload = {
  image: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return request<{ url: string; publicId?: string }>('/api/upload', {
      method: 'POST',
      body: formData,
    });
  },
};

// Helper to load initial data from API with localStorage fallback
export async function loadWithFallback<T>(
  fetcher: () => Promise<ApiResponse<T>>,
  storageKey: string,
  defaultValue: T
): Promise<T> {
  const result = await fetcher();
  if (result.success && result.data) {
    localStorage.setItem(storageKey, JSON.stringify(result.data));
    return result.data;
  }

  // Fallback to localStorage
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        // ignore
      }
    }
  }

  return defaultValue;
}
