-- Run this first in Supabase SQL Editor (click "Run" not "Explain")

CREATE TABLE IF NOT EXISTS students (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT DEFAULT 'N/A',
  phone TEXT NOT NULL,
  course TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Pending' CHECK (status IN ('Active', 'Pending', 'Canceled')),
  enrolled_date TEXT NOT NULL,
  image TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS schedules (
  day TEXT PRIMARY KEY,
  classes JSONB NOT NULL DEFAULT '[]'
);

CREATE TABLE IF NOT EXISTS pricing_plans (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  price TEXT NOT NULL,
  original_price TEXT,
  features JSONB NOT NULL DEFAULT '[]',
  highlight BOOLEAN DEFAULT FALSE,
  badge TEXT
);

CREATE TABLE IF NOT EXISTS inquiries (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  date TEXT NOT NULL,
  "read" BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  category TEXT NOT NULL,
  image TEXT DEFAULT '',
  rating DECIMAL(3,1) DEFAULT 5.0,
  description TEXT DEFAULT '',
  specs JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  athlete_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT DEFAULT 'N/A',
  address TEXT DEFAULT '',
  items TEXT NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'Pending',
  payment_method TEXT NOT NULL,
  date TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS experiences (
  id TEXT PRIMARY KEY,
  role TEXT NOT NULL,
  company TEXT NOT NULL,
  period TEXT NOT NULL,
  description TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS hero_settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  badge TEXT NOT NULL DEFAULT '',
  subheading TEXT NOT NULL DEFAULT '',
  title TEXT NOT NULL DEFAULT '',
  name TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  images JSONB NOT NULL DEFAULT '[]',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS about_settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  badge TEXT NOT NULL DEFAULT '',
  heading TEXT NOT NULL DEFAULT '',
  subheading TEXT NOT NULL DEFAULT '',
  para1 TEXT NOT NULL DEFAULT '',
  para2 TEXT NOT NULL DEFAULT '',
  image TEXT DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS gallery_images (
  id SERIAL PRIMARY KEY,
  url TEXT NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
