'use client'

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  ShoppingBag, 
  Search, 
  Filter, 
  Star,
  ChevronRight,
  Info
} from 'lucide-react';

const products = [
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
  },
  {
    id: 4,
    name: "8-Week Combat Conditioning Program",
    price: 129.99,
    category: "Digital",
    image: "https://picsum.photos/seed/program/800/800",
    rating: 5.0,
    description: "A comprehensive digital guide to peak athletic performance."
  },
  {
    id: 5,
    name: "Classic Invictus Hoodie",
    price: 64.99,
    category: "Apparel",
    image: "https://picsum.photos/seed/hoodie/800/800",
    rating: 4.9,
    description: "Heavyweight cotton hoodie with embroidered logo."
  },
  {
    id: 6,
    name: "Professional Hand Wraps (Pair)",
    price: 14.99,
    category: "Equipment",
    image: "https://picsum.photos/seed/wraps/800/800",
    rating: 4.6,
    description: "Premium length elastic wraps for superior wrist support."
  }
];

export default function ShopPage() {
  const [filter, setFilter] = React.useState('All');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [cartCount, setCartCount] = React.useState(0);

  const categories = ['All', 'Apparel', 'Equipment', 'Digital'];

  const filteredProducts = products.filter(p => {
    const matchesFilter = filter === 'All' || p.category === filter;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const addToCart = () => setCartCount(prev => prev + 1);

  return (
    <main className="min-h-screen bg-brand-primary text-white">
      {/* Dynamic Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-primary/80 backdrop-blur-md border-b border-brand-border px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-brand-muted hover:text-brand-accent transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold text-sm uppercase tracking-widest">Back to Hub</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <span className="text-xl font-display font-black tracking-tighter text-white uppercase">INVICTUS <span className="text-brand-accent italic">STORE</span></span>
          </div>

          <div className="relative">
            <button className="p-2 hover:bg-brand-secondary rounded-full transition-colors relative group">
              <ShoppingBag className="w-6 h-6 group-hover:text-brand-accent transition-colors text-white" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-brand-accent text-black text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full animate-in zoom-in">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 sm:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-display font-black tracking-tight mb-8 text-white uppercase">
            ELITE <span className="text-brand-accent block sm:inline">GEAR.</span>
          </h1>
          <p className="text-xl text-brand-muted max-w-2xl leading-relaxed mb-12">
            Curated equipment and training resources designed for those who take their craft seriously. Battle-tested by Coach Ishtiaq.
          </p>

          {/* Controls */}
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between border-b border-brand-border pb-12">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest border transition-all ${
                    filter === cat 
                      ? 'bg-brand-accent text-black border-brand-accent shadow-lg shadow-brand-accent/20' 
                      : 'bg-transparent text-brand-muted border-brand-border hover:border-brand-accent/50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-accent" />
              <input 
                type="text" 
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-brand-secondary border border-brand-border rounded-full py-3 pl-12 pr-6 text-sm focus:outline-none focus:border-brand-accent transition-colors text-white"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="pb-32 px-6 sm:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, idx) => (
                <motion.div
                  layout
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className="group"
                >
                  <div className="relative aspect-square rounded-3xl overflow-hidden bg-brand-secondary border border-brand-border mb-6 group-hover:border-brand-accent/30 transition-colors">
                    <Image 
                      src={product.image} 
                      alt={product.name} 
                      fill 
                      className="object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute top-6 left-6 z-10">
                      <span className="bg-brand-primary/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-brand-accent border border-brand-accent/20">
                        {product.category}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-brand-primary/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-8 text-center pointer-events-none">
                      <p className="text-sm text-white leading-relaxed font-medium">
                        {product.description}
                      </p>
                    </div>
                    <button 
                      onClick={addToCart}
                      className="absolute bottom-6 right-6 z-20 bg-brand-accent text-black p-4 rounded-2xl shadow-xl translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 hover:scale-110 hover:bg-brand-accent-hover active:scale-95"
                    >
                      <ShoppingBag className="w-5 h-5 font-bold" />
                    </button>
                  </div>
                  
                  <div className="flex justify-between items-start px-2">
                    <div>
                      <h3 className="text-lg font-bold mb-1 group-hover:text-brand-accent transition-colors text-white">{product.name}</h3>
                      <div className="flex items-center gap-2 text-brand-muted mb-2">
                        <div className="flex items-center">
                          <Star className="w-3 h-3 fill-brand-accent text-brand-accent" />
                          <span className="text-[10px] font-bold ml-1 text-white">{product.rating}</span>
                        </div>
                        <span className="text-brand-border">•</span>
                        <span className="text-[10px] font-bold uppercase tracking-tighter">Verified Gear</span>
                      </div>
                    </div>
                    <span className="text-xl font-bold font-display text-brand-accent">${product.price}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredProducts.length === 0 && (
            <div className="py-40 text-center">
              <p className="text-brand-muted text-lg">No products found matching your search.</p>
            </div>
          )}
        </div>
      </section>

      {/* Footnote */}
      <footer className="border-t border-brand-border py-20 px-6 bg-brand-secondary/30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2 text-brand-muted">
            <Info className="w-4 h-4 text-brand-accent" />
            <p className="text-xs font-bold uppercase tracking-widest">Ships within Bangladesh & International Regions</p>
          </div>
          <div className="flex gap-8">
            <a href="#" className="text-xs font-bold uppercase tracking-widest text-brand-muted hover:text-brand-accent transition-colors">Returns</a>
            <a href="#" className="text-xs font-bold uppercase tracking-widest text-brand-muted hover:text-brand-accent transition-colors">Privacy</a>
            <a href="#" className="text-xs font-bold uppercase tracking-widest text-brand-muted hover:text-brand-accent transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
