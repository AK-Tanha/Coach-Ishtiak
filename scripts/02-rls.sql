-- Run this second in Supabase SQL Editor

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
