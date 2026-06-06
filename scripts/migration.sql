-- Coach Ishtiak Backend Database Schema
-- Run this in your Supabase SQL editor

-- Students table
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

-- Schedule table (each row = one day's classes)
CREATE TABLE IF NOT EXISTS schedules (
  day TEXT PRIMARY KEY,
  classes JSONB NOT NULL DEFAULT '[]'
);

-- Pricing plans table
CREATE TABLE IF NOT EXISTS pricing_plans (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  price TEXT NOT NULL,
  original_price TEXT,
  features JSONB NOT NULL DEFAULT '[]',
  highlight BOOLEAN DEFAULT FALSE,
  badge TEXT
);

-- Inquiries table
CREATE TABLE IF NOT EXISTS inquiries (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  date TEXT NOT NULL,
  "read" BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Products table
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

-- Orders table
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

-- Experience table
CREATE TABLE IF NOT EXISTS experiences (
  id TEXT PRIMARY KEY,
  role TEXT NOT NULL,
  company TEXT NOT NULL,
  period TEXT NOT NULL,
  description TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Hero settings table (single row)
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

-- About settings table (single row)
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

-- Gallery images table
CREATE TABLE IF NOT EXISTS gallery_images (
  id SERIAL PRIMARY KEY,
  url TEXT NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default hero settings row if not exists
INSERT INTO hero_settings (id, badge, subheading, title, name, description, images)
SELECT 1, 'REGISTRATION OPEN • ELITE DIVISION', 'MASTERING THE', 'ART OF COMBAT', 'COACH ISHTIAK',
  'A Coach, A Student & An Athlete. Over a decade forging champions in MMA, BJJ, and Boxing. Founder of core combat sport institutions in Bangladesh.',
  '[{"url": "https://picsum.photos/seed/coach-ishtiaq/1000/1000", "caption": "First WBC Referee BD", "title": "BANGLADESH"}, {"url": "https://picsum.photos/seed/mma-training-1/1000/1000", "caption": "Head Coach", "title": "INVICTUS"}, {"url": "https://picsum.photos/seed/boxing-match-1/1000/1000", "caption": "Founder", "title": "BMMAA"}]'
WHERE NOT EXISTS (SELECT 1 FROM hero_settings WHERE id = 1);

-- Insert default about settings row if not exists
INSERT INTO about_settings (id, badge, heading, subheading, para1, para2, image)
SELECT 1, 'PROFILE • LEAD COACH', 'Philosophy', 'Building champions inside and outside the cage.',
  'Recognized as Bangladesh''s first WBC-certified boxing referee, my journey has been defined by a relentless pursuit of excellence and the development of combat sports on a national level. As the Founder and General Secretary of the Bangladesh Mixed Martial Arts Association (BMMAA), I have pioneered the first organized MMA events in our nation.',
  'My coaching methodology combines technical precision with mental fortitude. From tactical boxing instructions for the Bangladesh Army to leading high-performance training at Invictus BJJ, I focus on the holistic development of my athletes.',
  'https://picsum.photos/seed/coach-ishtiaq/800/1000'
WHERE NOT EXISTS (SELECT 1 FROM about_settings WHERE id = 1);

-- Insert default gallery images if table is empty
INSERT INTO gallery_images (url, title, category)
SELECT * FROM (VALUES
  ('https://picsum.photos/seed/mma1/800/1000', 'WBC Refereeing', 'Events'),
  ('https://picsum.photos/seed/mma2/1000/800', 'Sparring Session', 'Training'),
  ('https://picsum.photos/seed/mma3/800/800', 'Championship Belt', 'Awards'),
  ('https://picsum.photos/seed/mma4/1000/1200', 'Heavy Bag Work', 'Training'),
  ('https://picsum.photos/seed/mma5/1200/800', 'Team Photo', 'Events'),
  ('https://picsum.photos/seed/mma6/800/1000', 'Grappling Drill', 'Training'),
  ('https://picsum.photos/seed/mma7/1000/1000', 'WBC Certification', 'Awards'),
  ('https://picsum.photos/seed/mma8/800/1200', 'Cornering a Fight', 'Events'),
  ('https://picsum.photos/seed/mma9/1200/1000', 'Youth Program', 'Training')
) AS v(url, title, category)
WHERE (SELECT COUNT(*) FROM gallery_images) = 0;

-- Enable Row Level Security (optional, safe defaults)
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

-- Allow public read access for all tables (since API handles auth)
CREATE POLICY "Allow public read" ON students FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON schedules FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON pricing_plans FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON inquiries FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON products FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON orders FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON experiences FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON hero_settings FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON about_settings FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON gallery_images FOR SELECT USING (true);

-- Allow insert/update/delete via service role (API handles auth)
CREATE POLICY "Allow all insert" ON students FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow all update" ON students FOR UPDATE USING (true);
CREATE POLICY "Allow all delete" ON students FOR DELETE USING (true);

CREATE POLICY "Allow all insert" ON schedules FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow all update" ON schedules FOR UPDATE USING (true);
CREATE POLICY "Allow all delete" ON schedules FOR DELETE USING (true);

CREATE POLICY "Allow all insert" ON pricing_plans FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow all update" ON pricing_plans FOR UPDATE USING (true);
CREATE POLICY "Allow all delete" ON pricing_plans FOR DELETE USING (true);

CREATE POLICY "Allow all insert" ON inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow all update" ON inquiries FOR UPDATE USING (true);
CREATE POLICY "Allow all delete" ON inquiries FOR DELETE USING (true);

CREATE POLICY "Allow all insert" ON products FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow all update" ON products FOR UPDATE USING (true);
CREATE POLICY "Allow all delete" ON products FOR DELETE USING (true);

CREATE POLICY "Allow all insert" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow all update" ON orders FOR UPDATE USING (true);
CREATE POLICY "Allow all delete" ON orders FOR DELETE USING (true);

CREATE POLICY "Allow all insert" ON experiences FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow all update" ON experiences FOR UPDATE USING (true);
CREATE POLICY "Allow all delete" ON experiences FOR DELETE USING (true);

CREATE POLICY "Allow all insert" ON hero_settings FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow all update" ON hero_settings FOR UPDATE USING (true);
CREATE POLICY "Allow all delete" ON hero_settings FOR DELETE USING (true);

CREATE POLICY "Allow all insert" ON about_settings FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow all update" ON about_settings FOR UPDATE USING (true);
CREATE POLICY "Allow all delete" ON about_settings FOR DELETE USING (true);

CREATE POLICY "Allow all insert" ON gallery_images FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow all update" ON gallery_images FOR UPDATE USING (true);
CREATE POLICY "Allow all delete" ON gallery_images FOR DELETE USING (true);
