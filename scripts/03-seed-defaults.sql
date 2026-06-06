-- Run this third (only if tables are empty, uses IF NOT EXISTS style)

INSERT INTO hero_settings (id, badge, subheading, title, name, description, images)
SELECT 1, 'REGISTRATION OPEN • ELITE DIVISION', 'MASTERING THE', 'ART OF COMBAT', 'COACH ISHTIAK',
  'A Coach, A Student & An Athlete. Over a decade forging champions in MMA, BJJ, and Boxing. Founder of core combat sport institutions in Bangladesh.',
  '[{"url": "https://picsum.photos/seed/coach-ishtiaq/1000/1000", "caption": "First WBC Referee BD", "title": "BANGLADESH"}, {"url": "https://picsum.photos/seed/mma-training-1/1000/1000", "caption": "Head Coach", "title": "INVICTUS"}, {"url": "https://picsum.photos/seed/boxing-match-1/1000/1000", "caption": "Founder", "title": "BMMAA"}]'
WHERE NOT EXISTS (SELECT 1 FROM hero_settings WHERE id = 1);

INSERT INTO about_settings (id, badge, heading, subheading, para1, para2, image)
SELECT 1, 'PROFILE • LEAD COACH', 'Philosophy', 'Building champions inside and outside the cage.',
  'Recognized as Bangladesh''s first WBC-certified boxing referee, my journey has been defined by a relentless pursuit of excellence and the development of combat sports on a national level. As the Founder and General Secretary of the Bangladesh Mixed Martial Arts Association (BMMAA), I have pioneered the first organized MMA events in our nation.',
  'My coaching methodology combines technical precision with mental fortitude. From tactical boxing instructions for the Bangladesh Army to leading high-performance training at Invictus BJJ, I focus on the holistic development of my athletes.',
  'https://picsum.photos/seed/coach-ishtiaq/800/1000'
WHERE NOT EXISTS (SELECT 1 FROM about_settings WHERE id = 1);

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
