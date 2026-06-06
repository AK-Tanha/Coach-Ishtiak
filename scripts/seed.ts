import { getSupabaseAdmin } from '../lib/supabase-server';
const supabaseAdmin = getSupabaseAdmin();

async function seed() {
  console.log('Seeding database...');

  // Seed students
  const students = [
    { id: 'st-1', name: 'Tanvir Rahman', email: 'tanvir@gmail.com', phone: '01711223344', course: '3 Months Course', status: 'Active', enrolled_date: '2026-05-10', image: 'https://picsum.photos/seed/tanvir/800/800' },
    { id: 'st-2', name: 'Fahim Ahmed', email: 'fahim.ah@gmail.com', phone: '01822445566', course: 'Monthly Plan', status: 'Pending', enrolled_date: '2026-05-18', image: 'https://picsum.photos/seed/fahim/800/800' },
    { id: 'st-3', name: 'Imtiaz Hassan', email: 'imtiaz@hassan.info', phone: '01677338899', course: '3 Months Course', status: 'Active', enrolled_date: '2026-04-12', image: '' },
    { id: 'st-4', name: 'Anika Bushra', email: 'anika.bushra@outlook.com', phone: '01944112233', course: '3 Months Course', status: 'Active', enrolled_date: '2026-05-02', image: '' },
    { id: 'st-5', name: 'Raihan Kabir', email: 'raihan@kabir.net', phone: '01588667744', course: 'Monthly Plan', status: 'Canceled', enrolled_date: '2026-05-15', image: '' },
  ];

  for (const student of students) {
    const { error } = await supabaseAdmin.from('students').upsert(student, { onConflict: 'id' });
    if (error) console.error('Error seeding student:', error.message);
  }
  console.log(`Seeded ${students.length} students`);

  // Seed schedule
  const schedules = [
    { day: 'Saturday', classes: JSON.stringify([{ id: 'sat-1', time: '4:30 - 5:30 PM', activity: 'Personal Training (PT)' }]) },
    { day: 'Sunday', classes: JSON.stringify([{ id: 'sun-1', time: '4:00 - 5:00 PM', activity: 'Muay Thai' }, { id: 'sun-2', time: '5:30 - 7:00 PM', activity: 'MMA' }, { id: 'sun-3', time: '7:30 - 8:30 PM', activity: 'Boxing' }]) },
    { day: 'Tuesday', classes: JSON.stringify([{ id: 'tue-1', time: '3:00 - 4:30 PM', activity: 'Afternoon Class (AFT)' }, { id: 'tue-2', time: '5:30 - 7:00 PM', activity: 'MMA' }, { id: 'tue-3', time: '7:30 - 8:30 PM', activity: 'Boxing' }]) },
    { day: 'Wednesday', classes: JSON.stringify([{ id: 'wed-1', time: '4:00 - 5:15 PM', activity: 'Personal Training (PT)' }]) },
    { day: 'Thursday', classes: JSON.stringify([{ id: 'thu-1', time: '4:00 - 5:00 PM', activity: 'Muay Thai' }, { id: 'thu-2', time: '5:30 - 7:00 PM', activity: 'MMA' }]) },
  ];

  for (const s of schedules) {
    const { error } = await supabaseAdmin.from('schedules').upsert(s, { onConflict: 'day' });
    if (error) console.error('Error seeding schedule:', error.message);
  }
  console.log(`Seeded ${schedules.length} schedule days`);

  // Seed pricing
  const pricingPlans = [
    { id: 'plan-monthly', title: 'Monthly Plan', price: '3,000/-', original_price: '', features: JSON.stringify(['No Admission Fee', 'All Standard Classes', 'Access to MMA & Boxing']), highlight: false, badge: '' },
    { id: 'plan-quarterly', title: '3 Months Course', price: '8,000/-', original_price: '9,000/-', features: JSON.stringify(['Muay Thai & Boxing Focus', 'Intensive Training Course', 'Special Discounted Rate']), highlight: true, badge: 'Most Popular' },
  ];

  for (const p of pricingPlans) {
    const { error } = await supabaseAdmin.from('pricing_plans').upsert(p, { onConflict: 'id' });
    if (error) console.error('Error seeding pricing:', error.message);
  }
  console.log(`Seeded ${pricingPlans.length} pricing plans`);

  // Seed inquiries
  const inquiries = [
    { id: 'inq-1', name: 'Sadman Sakib', email: 'sadman@live.com', message: 'Is private one-on-one training with Coach Ishtiak available on Fridays?', date: '2026-05-20', read: false },
    { id: 'inq-2', name: 'Zarin Subah', email: 'zarin@gmail.com', message: 'Do you have any female-only batches?', date: '2026-05-19', read: true },
    { id: 'inq-3', name: 'Sajid Karim', email: 'sajid.kar@yahoo.com', message: 'Interested in MMA high-performance session.', date: '2026-05-18', read: true },
  ];

  for (const i of inquiries) {
    const { error } = await supabaseAdmin.from('inquiries').upsert(i, { onConflict: 'id' });
    if (error) console.error('Error seeding inquiry:', error.message);
  }
  console.log(`Seeded ${inquiries.length} inquiries`);

  // Seed products
  const products = [
    { name: 'Invictus Elite Boxing Gloves', price: 89.99, category: 'Equipment', image: 'https://picsum.photos/seed/gloves/800/800', rating: 4.9, description: 'Professional grade leather gloves.', specs: JSON.stringify({ material: 'Premium Full-Grain Cowhide', weight: '12oz, 14oz, 16oz', tier: 'Professional', durability: '98%', absorption: '96%' }) },
    { name: 'WBC Referee Commemorative Tee', price: 34.99, category: 'Apparel', image: 'https://picsum.photos/seed/shirt/800/800', rating: 4.8, description: 'Limited edition technical t-shirt.', specs: JSON.stringify({ material: '95% Cotton, 5% Elasthane', weight: 'Lightweight', tier: 'LTD Commemorative', durability: '92%', absorption: 'N/A' }) },
    { name: 'Invictus MMA Shinguards', price: 59.99, category: 'Equipment', image: 'https://picsum.photos/seed/shinguard/800/800', rating: 4.7, description: 'Multi-layered protective foam guards.', specs: JSON.stringify({ material: 'Sinthetic Syntek Leather', weight: 'Medium / Large', tier: 'Competition Spec', durability: '95%', absorption: '94%' }) },
    { name: '8-Week Combat Conditioning Program', price: 129.99, category: 'Digital', image: 'https://picsum.photos/seed/program/800/800', rating: 5.0, description: 'Comprehensive digital athletic guide.', specs: JSON.stringify({ material: 'Digital Interactive PDF', weight: 'Immediate Access', tier: 'Championship Blueprint', durability: 'Lifetime', absorption: '100% Effective' }) },
    { name: 'Classic Invictus Heavyweight Hoodie', price: 64.99, category: 'Apparel', image: 'https://picsum.photos/seed/hoodie/800/800', rating: 4.9, description: 'Heavyweight premium cotton fleece hoodie.', specs: JSON.stringify({ material: '100% Ring-Spun Cotton', weight: '480 GSM Premium', tier: 'Gym Premium', durability: '97%', absorption: 'N/A' }) },
    { name: 'Professional Elastic Hand Wraps', price: 14.99, category: 'Equipment', image: 'https://picsum.photos/seed/wraps/800/800', rating: 4.6, description: 'Premium length stretch cotton wraps.', specs: JSON.stringify({ material: 'Stretchable Woven Cotton', weight: '180-inch (Pair)', tier: 'Daily Standard', durability: '94%', absorption: '90%' }) },
  ];

  for (const p of products) {
    const { error } = await supabaseAdmin.from('products').insert(p);
    if (error) console.error('Error seeding product:', error.message);
  }
  console.log(`Seeded ${products.length} products`);

  // Seed experiences
  const experiences = [
    { id: 'exp-1', role: 'Owner / Head Coach', company: 'Xtreme MMA', period: '2014 - Present', description: 'Driving elite combat sports training and organizational growth since inception.' },
    { id: 'exp-2', role: 'Owner / Head Coach', company: 'Invictus BJJ & MMA', period: '2018 - Present', description: 'Leading a premier academy for Brazilian Jiu-Jitsu and Mixed Martial Arts.' },
    { id: 'exp-3', role: 'Boxing Coach', company: 'Bangladesh Army', period: '2021 - Present', description: 'Providing tactical boxing instructions for military personnel.' },
    { id: 'exp-4', role: 'Professional Boxing Referee', company: 'World Boxing Council (WBC)', period: '2022 - Present', description: 'WBC Ring Official Panel registered and certified.' },
    { id: 'exp-5', role: 'Official / Assistant Coach', company: 'Bangladesh Amateur Boxing Federation', period: '2018 - 2025', description: 'Contributing to national boxing development.' },
    { id: 'exp-6', role: 'Fighter Manager', company: 'One Warrior Series', period: '2018', description: 'Managed professional fighters in Singapore.' },
    { id: 'exp-7', role: 'Fighter Manager', company: 'ONE Championship', period: '2017', description: 'Managed professional athletes in Bangkok.' },
    { id: 'exp-8', role: 'Second (Cornerman)', company: 'ONE Championship', period: '2016', description: 'Served as professional cornerman in Myanmar.' },
  ];

  for (const e of experiences) {
    const { error } = await supabaseAdmin.from('experiences').upsert(e, { onConflict: 'id' });
    if (error) console.error('Error seeding experience:', error.message);
  }
  console.log(`Seeded ${experiences.length} experiences`);

  // Seed orders
  const orders = [
    { id: 'ord-1', athlete_name: 'Saadman Sakib', phone: '01819283746', email: 'saadman.sk@gmail.com', address: 'Dhanmondi Rd 27, Dhaka', items: 'Invictus Elite Boxing Gloves (Qty: 1)', total_price: 89.99, status: 'Pending', payment_method: 'bKash', date: '2026-05-22' },
    { id: 'ord-2', athlete_name: 'Zarin Subah', phone: '01722883399', email: 'zarin.sb@gmail.com', address: 'Gulshan-1, Dhaka', items: 'WBC Referee Commemorative Tee (Qty: 2)', total_price: 69.98, status: 'Shipped', payment_method: 'Nagad', date: '2026-05-20' },
  ];

  for (const o of orders) {
    const { error } = await supabaseAdmin.from('orders').upsert(o, { onConflict: 'id' });
    if (error) console.error('Error seeding order:', error.message);
  }
  console.log(`Seeded ${orders.length} orders`);

  console.log('Seeding complete!');
}

seed().catch(console.error);
