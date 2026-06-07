'use client'

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  ShoppingBag, 
  Search, 
  Star,
  Info,
  Plus,
  Minus,
  Trash2,
  X,
  Check,
  ShieldCheck,
  Zap,
  Tag,
  Sliders,
  Sparkles
} from 'lucide-react';
import { orders as ordersApi, products as productsApi, loadWithFallback } from '@/lib/api';
import { ShopProductsGridSkeleton } from '../../components/PageSkeletons';

const defaultProducts = [
  {
    id: 1,
    name: "Invictus Elite Boxing Gloves",
    price: 89.99,
    category: "Equipment",
    image: "https://picsum.photos/seed/gloves/800/800",
    rating: 4.9,
    description: "Professional grade leather gloves used by Coach Ishtiaq in training sessions. Engineered with triple-density foam and safe wrist lock straps.",
    specs: {
      material: "Premium Full-Grain Cowhide",
      weight: "12oz, 14oz, 16oz",
      tier: "Professional / Elite",
      durability: "98%",
      absorption: "96%"
    }
  },
  {
    id: 2,
    name: "WBC Referee Commemorative Tee",
    price: 34.99,
    category: "Apparel",
    image: "https://picsum.photos/seed/shirt/800/800",
    rating: 4.8,
    description: "Limited edition technical t-shirt celebrating Bangladesh's first WBC referee. Highly breathable, sweat-wicking lightweight athletic fit.",
    specs: {
      material: "95% Cotton, 5% Elasthane Blend",
      weight: "Lightweight",
      tier: "LTD Commemorative",
      durability: "92%",
      absorption: "N/A"
    }
  },
  {
    id: 3,
    name: "Invictus MMA Shinguards",
    price: 59.99,
    category: "Equipment",
    image: "https://picsum.photos/seed/shinguard/800/800",
    rating: 4.7,
    description: "Multi-layered protective foam guards offering high shock absorption. Ergonomically shaped for superior fit and minimal moving during heavy grappling/sparring.",
    specs: {
      material: "Sinthetic Syntek Leather",
      weight: "Medium / Large",
      tier: "Competition Spec",
      durability: "95%",
      absorption: "94%"
    }
  },
  {
    id: 4,
    name: "8-Week Combat Conditioning Program",
    price: 129.99,
    category: "Digital",
    image: "https://picsum.photos/seed/program/800/800",
    rating: 5.0,
    description: "A comprehensive digital athletic guide to peak physical combat performance. Contains day-to-day macro plans and strength routines certified by Coach Ishtiaq.",
    specs: {
      material: "Digital Interactive PDF / Video Guides",
      weight: "Immediate Access",
      tier: "Championship Blueprint",
      durability: "Lifetime Update",
      absorption: "100% Effective"
    }
  },
  {
    id: 5,
    name: "Classic Invictus Heavyweight Hoodie",
    price: 64.99,
    category: "Apparel",
    image: "https://picsum.photos/seed/hoodie/800/800",
    rating: 4.9,
    description: "Heavyweight premium cotton fleece hoodie featuring high-durability embroidered chest lockups. Tailored with a relaxed combat-athlete profile fit.",
    specs: {
      material: "100% Ring-Spun Heavyweight Cotton",
      weight: "480 GSM Premium",
      tier: "Gym Premium",
      durability: "97%",
      absorption: "N/A"
    }
  },
  {
    id: 6,
    name: "Professional Elastic Hand Wraps",
    price: 14.99,
    category: "Equipment",
    image: "https://picsum.photos/seed/wraps/800/800",
    rating: 4.6,
    description: "Premium length stretch cotton wraps providing high support to small knuckle joints and wrist segments during heavy bag sessions.",
    specs: {
      material: "Stretchable Woven Cotton Blend",
      weight: "180-inch (Pair)",
      tier: "Daily Standard",
      durability: "94%",
      absorption: "90%"
    }
  }
];

export default function ShopPage() {
  const [products, setProducts] = React.useState<any[]>(defaultProducts);
  const [loading, setLoading] = React.useState(true);
  const [filter, setFilter] = React.useState('All');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [cart, setCart] = React.useState<{ id: number; product: any; quantity: number; selectedSize?: string }[]>([]);
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = React.useState(false);
  const [checkoutForm, setCheckoutForm] = React.useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    paymentMethod: 'bKash'
  });

  // State for the product being viewed in detailed quick-view modal
  const [quickViewProduct, setQuickViewProduct] = React.useState<any | null>(null);
  const [selectedSize, setSelectedSize] = React.useState<string>('');

  const cartLoadedRef = React.useRef(false);

  React.useEffect(() => {
    if (typeof window !== 'undefined' && !cartLoadedRef.current) {
      const loadData = async () => {
        // Load products from API with fallback
        const result = await loadWithFallback(
          () => productsApi.list(),
          'invictus_products',
          defaultProducts
        );
        if (Array.isArray(result) && result.length > 0) {
          const merged = result.map((p: any) => {
            const def = defaultProducts.find(dp => dp.id === p.id);
            return {
              ...p,
              specs: p.specs || def?.specs || {
                material: "Industrial Sport-Grade Grade",
                weight: "Standard Fit",
                tier: "Elite Edition",
                durability: "95%",
                absorption: "90%"
              }
            };
          });
          setProducts(merged);
        }

        const storedCart = localStorage.getItem('invictus_cart');
        if (storedCart) {
          try {
            setCart(JSON.parse(storedCart));
          } catch (e) {
            // ignore
          }
        }
        cartLoadedRef.current = true;
        setLoading(false);
      };
      
      loadData();
    } else {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    if (typeof window !== 'undefined' && cartLoadedRef.current) {
      localStorage.setItem('invictus_cart', JSON.stringify(cart));
    }
  }, [cart]);

  const categories = ['All', 'Apparel', 'Equipment', 'Digital'];

  const filteredProducts = products.filter(p => {
    const matchesFilter = filter === 'All' || p.category === filter;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const addToCart = (product: any, customSize?: string) => {
    const finalSize = customSize || (product.category === 'Apparel' ? 'L' : product.category === 'Equipment' ? '14oz' : undefined);
    
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedSize === finalSize);
      if (existing) {
        return prev.map(item => (item.id === product.id && item.selectedSize === finalSize) ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { id: product.id, product, quantity: 1, selectedSize: finalSize }];
    });
    
    setIsCartOpen(true);
    setCheckoutSuccess(false);
  };

  const updateQuantity = (id: number, size: string | undefined, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id && item.selectedSize === size) {
        return { ...item, quantity: item.quantity + delta };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const removeFromCart = (id: number, size: string | undefined) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.selectedSize === size)));
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const newOrder = {
      id: "ord-" + Date.now().toString().slice(-6),
      athleteName: checkoutForm.name,
      phone: checkoutForm.phone,
      email: checkoutForm.email || "N/A",
      address: checkoutForm.address,
      items: cart.map(item => `${item.product.name} ${item.selectedSize ? `(${item.selectedSize})` : ''} - (Qty: ${item.quantity})`).join(", "),
      totalPrice: cartSubtotal,
      status: "Pending",
      paymentMethod: checkoutForm.paymentMethod,
      date: new Date().toISOString().split('T')[0]
    };

    // Save to API
    await ordersApi.create(newOrder).catch(console.warn);

    // Also save to localStorage as fallback
    if (typeof window !== 'undefined') {
      const existingOrdersStr = localStorage.getItem('invictus_orders');
      const existingOrders = existingOrdersStr ? JSON.parse(existingOrdersStr) : [];
      const updatedOrders = [newOrder, ...existingOrders];
      localStorage.setItem('invictus_orders', JSON.stringify(updatedOrders));
    }

    setCart([]);
    setCheckoutSuccess(true);
    setCheckoutForm({ name: '', phone: '', email: '', address: '', paymentMethod: 'bKash' });
  };

  const openQuickView = (product: any) => {
    setQuickViewProduct(product);
    if (product.category === 'Apparel') {
      setSelectedSize('L');
    } else if (product.category === 'Equipment') {
      setSelectedSize('14oz');
    } else {
      setSelectedSize('');
    }
  };

  return (
    <main className="min-h-screen bg-[#050507] text-white relative overflow-x-hidden font-sans selection:bg-brand-accent selection:text-black">
      
      {/* Decorative grids and organic neon ambient layers */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(204,255,0,0.06),transparent_65%)] pointer-events-none z-0" />
      <div className="absolute top-[400px] right-0 w-80 h-80 bg-brand-accent/5 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute top-[800px] left-[-100px] w-96 h-96 bg-brand-accent/3 rounded-full filter blur-[120px] pointer-events-none" />

      {/* Dynamic Header */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-[#050507]/80 backdrop-blur-md border-b border-brand-border/80 px-4 sm:px-6 py-4 transition-all duration-300">
        <div className="container max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-brand-muted hover:text-[#CCFF00] transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold text-xs uppercase tracking-widest font-mono">Fight Lab Hub</span>
          </Link>
          
          <div className="flex items-center gap-2">
            <span className="text-sm font-display font-black tracking-widest text-white uppercase sm:text-base">
              INVICTUS <span className="text-brand-accent inline-flex items-center gap-1">LAB <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" /></span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="p-2.5 hover:bg-brand-secondary rounded-2xl border border-brand-border hover:border-brand-accent transition-all duration-300 relative group min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5 group-hover:text-brand-accent transition-colors text-white" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-brand-accent text-black text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full animate-bounce shadow-[0_0_15px_rgba(204,255,0,0.4)]">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Infinite Tactical Marquee Header Block under Navbar */}
      <div className="mt-16 sm:mt-20 w-full bg-[#CCFF00] py-2 overflow-hidden select-none border-y border-black/10 relative z-10">
        <div className="flex whitespace-nowrap animate-[marquee_25s_linear_infinite] text-[10px] sm:text-xs font-mono font-black text-black uppercase tracking-wider">
          <span className="mx-4">INVICTUS COMBAT GEAR & APPAREL SPECIFICATIONS</span>
          <span className="mx-4">■</span>
          <span className="mx-4">CERTIFIED BY BANGLADESH&apos;S FIRST WBC REFEREE COACH ISHTIAK</span>
          <span className="mx-4">■</span>
          <span className="mx-4">ENGINEERED FOR HIGH INTENSITY IMPACT TRAINING</span>
          <span className="mx-4">■</span>
          <span className="mx-4">SHIPS ACROSS BANGLADESH & INTERNATIONAL REGIONS</span>
          <span className="mx-4">■</span>
          <span className="mx-4">INVICTUS COMBAT GEAR & APPAREL SPECIFICATIONS</span>
          <span className="mx-4">■</span>
          <span className="mx-4">CERTIFIED BY BANGLADESH&apos;S FIRST WBC REFEREE COACH ISHTIAK</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="pt-16 pb-12 sm:pt-24 sm:pb-16 px-4 sm:px-12 lg:px-24 relative z-10">
        <div className="container max-w-7xl mx-auto text-left">
          
          <div className="inline-flex items-center gap-2 bg-brand-secondary/60 border border-brand-border px-3.5 py-1.5 rounded-full mb-6">
            <Zap className="w-3.5 h-3.5 text-brand-accent fill-brand-accent/20 animate-pulse" />
            <span className="text-[10px] font-mono tracking-widest text-[#BFFF00] uppercase font-bold">ATHLETE ARMORY V4.0</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-8xl font-display font-black tracking-tight mb-4 text-white uppercase leading-none">
            ELITE <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-[#E1FF66]">GEAR LAB.</span>
          </h1>
          <p className="text-base sm:text-lg text-brand-muted max-w-2xl leading-relaxed mb-12 font-sans">
            Tactical equipment, high-performance fight apparel, and digital conditioning blueprints forged specifically for active combat athletes. Checked, approved, and utilized daily in Bangladesh&apos;s apex fight laboratory.
          </p>

          {/* Tactical Filters & Search Panel */}
          <div className="bg-[#0d0d11]/85 backdrop-blur-md rounded-3xl p-4 sm:p-6 border border-brand-border/90 flex flex-col lg:flex-row gap-5 items-stretch lg:items-center justify-between shadow-2xl">
            <div className="flex flex-wrap gap-2 text-xs">
              {categories.map((cat, index) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-5 py-2.5 sm:px-6 rounded-full font-bold uppercase tracking-wider border transition-all duration-300 cursor-pointer min-h-[44px] flex items-center justify-center gap-2 group ${
                    filter === cat 
                      ? 'bg-brand-accent text-black border-brand-accent shadow-[0_4px_15px_rgba(204,255,0,0.18)] font-black' 
                      : 'bg-[#15151b] text-brand-muted border-brand-border/60 hover:border-brand-accent/50 hover:text-white'
                  }`}
                >
                  <span className={`text-[9px] font-mono opacity-50 font-medium ${filter === cat ? 'text-black' : 'text-brand-muted'}`}>
                    [ 0{index + 1} ]
                  </span>
                  <span>{cat}</span>
                </button>
              ))}
            </div>

            <div className="relative w-full lg:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-brand-muted group-focus-within:text-brand-accent transition-colors" />
              <input 
                type="text" 
                placeholder="Query weapon specs or blueprints..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#15151b]/80 border border-brand-border/90 rounded-full py-3.5 pl-12 pr-6 text-xs focus:outline-none focus:border-brand-accent focus:bg-[#1c1c24] transition-all duration-300 text-white font-sans tracking-wide"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Specialized Store Showcase Grid */}
      <section className="pb-28 sm:pb-36 px-4 sm:px-12 lg:px-24 relative z-10">
        <div className="container max-w-7xl mx-auto">
          {loading ? (
            <ShopProductsGridSkeleton />
          ) : filteredProducts.length === 0 ? (
            <div className="py-24 text-center border border-dashed border-brand-border/60 rounded-[2.5rem] bg-brand-secondary/40 backdrop-blur-sm">
              <Sliders className="w-10 h-10 mx-auto mb-4 text-brand-muted/70 stroke-[1.2]" />
              <p className="text-brand-muted text-sm font-mono tracking-wide uppercase">No system blueprints match current parameters</p>
              <button 
                onClick={() => { setFilter('All'); setSearchQuery(''); }}
                className="mt-4 px-6 py-2.5 bg-brand-secondary border border-brand-border text-brand-accent font-bold text-xs rounded-full uppercase tracking-widest hover:border-brand-accent transition-all duration-300"
              >
                Reset Search Matrices
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product, idx) => {
                  const displaySpecs = product.specs || { material: "Sport Pro Material", tier: "Elite Level" };
                  
                  return (
                    <motion.div
                      layout
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.5, delay: idx * 0.04 }}
                      onClick={() => openQuickView(product)}
                      className="group flex flex-col justify-between bg-[#0d0d11]/80 backdrop-blur-md border border-brand-border hover:border-brand-accent/40 rounded-[2rem] p-5 hover:shadow-[0_12px_40px_rgba(204,255,0,0.03)] hover:-translate-y-1 transition-all duration-500 cursor-pointer text-left relative"
                    >
                      {/* Technical specifications tag in backdrop */}
                      <div className="absolute right-6 top-6 opacity-[0.03] text-white text-[70px] font-display font-black select-none pointer-events-none line-clamp-1 leading-none tracking-tighter">
                        INV-0{product.id}
                      </div>

                      <div>
                        {/* Upper Card Graphic Header */}
                        <div className="relative aspect-square rounded-[1.6rem] overflow-hidden bg-[#15151b] border border-brand-border/70 mb-5 group-hover:border-brand-accent/25 transition-all duration-500">
                          <Image 
                            src={product.image} 
                            alt={product.name} 
                            fill 
                            className="object-cover grayscale brightness-[0.82] transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-103 group-hover:brightness-95"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute top-4 left-4 z-10 flex gap-2">
                            <span className="bg-black/85 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[9px] font-mono font-extrabold uppercase tracking-widest text-[#BFFF00] border border-brand-accent/15">
                              {product.category}
                            </span>
                          </div>

                          <div className="absolute top-4 right-4 z-10">
                            <span className="bg-black/95 backdrop-blur-md px-2.5 py-1.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-widest text-white/90 border border-white/10 flex items-center gap-1">
                              <Star className="w-3 h-3 fill-brand-accent text-brand-accent" /> {product.rating}
                            </span>
                          </div>

                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-5">
                            <span className="w-full text-center bg-brand-accent text-black font-black uppercase tracking-widest py-3 rounded-xl text-xs translate-y-3 group-hover:translate-y-0 transition-transform duration-500 shadow-2xl">
                              EXPLORE MOLECULES
                            </span>
                          </div>
                        </div>
                        
                        {/* Technical Blueprint Information block */}
                        <div className="px-1.5 mb-6">
                          <div className="flex justify-between items-start gap-4 mb-2">
                            <h3 className="text-lg font-bold font-display text-white group-hover:text-brand-accent transition-colors duration-300 leading-snug line-clamp-1">
                              {product.name}
                            </h3>
                            <span className="text-lg font-display font-black text-brand-accent shrink-0">
                              ৳{product.price.toLocaleString()}
                            </span>
                          </div>
                          
                          <p className="text-xs text-brand-muted font-sans line-clamp-2 leading-relaxed mb-4">
                            {product.description}
                          </p>

                          {/* Technical Spec Summary Indicators inside Card */}
                          <div className="grid grid-cols-2 gap-2 border-t border-brand-border/40 pt-4 text-[10px] font-mono text-brand-muted/90">
                            <div className="flex flex-col">
                              <span className="text-[8px] uppercase tracking-wider text-brand-muted/50 mb-0.5 font-bold">MATERIAL SPECS</span>
                              <span className="text-white/95 font-medium truncate">{displaySpecs.material}</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[8px] uppercase tracking-wider text-brand-muted/50 mb-0.5 font-bold">GEAR LEVEL</span>
                              <span className="text-brand-accent font-medium truncate">{displaySpecs.tier}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product);
                        }}
                        className="w-full mt-4 py-3 bg-[#15151b] border border-brand-border hover:border-brand-accent hover:text-brand-accent text-[10px] font-black uppercase tracking-widest rounded-xl transition-all duration-300 flex items-center justify-center gap-2.5 group/btn cursor-pointer min-h-[44px]"
                      >
                        <ShoppingBag className="w-4 h-4 text-brand-muted group-hover/btn:text-brand-accent transition-colors" /> ADD TO BAG
                      </button>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      {/* Specialty Quick View Technical Modal Overlay */}
      <AnimatePresence>
        {quickViewProduct && (
          <>
            {/* Modal Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
              onClick={() => setQuickViewProduct(null)}
              className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 cursor-pointer"
            />

            {/* Modal Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed inset-x-4 top-[5%] md:top-[12%] bottom-[5%] md:bottom-auto max-w-4xl mx-auto bg-[#0d0d11] border border-brand-border rounded-[2.5rem] z-50 text-left overflow-y-auto shadow-2xl overflow-hidden flex flex-col md:grid md:grid-cols-12 max-h-[90vh]"
            >
              <button 
                onClick={() => setQuickViewProduct(null)}
                className="absolute top-5 right-5 z-20 p-2 bg-black/60 hover:bg-brand-accent border border-brand-border hover:border-brand-accent text-white hover:text-black rounded-full transition-all duration-300 cursor-pointer"
                aria-label="Close product view"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Product Visual Container (5 cols) */}
              <div className="md:col-span-5 relative aspect-square md:aspect-auto md:h-full min-h-[300px] md:min-h-[500px] bg-[#15151b] border-b md:border-b-0 md:border-r border-brand-border">
                <Image 
                  src={quickViewProduct.image} 
                  alt={quickViewProduct.name} 
                  fill 
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual indicators */}
                <div className="absolute bottom-5 left-5 right-5 bg-black/60 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-xs font-mono">
                  <div className="flex justify-between items-center text-[#BFFF00] font-bold mb-1 uppercase tracking-widest text-[9px]">
                    <span>SECURE MATRICES:</span>
                    <span>VERIFIED</span>
                  </div>
                  <div className="text-white/80 line-clamp-1 truncate text-[10px]">
                    INV-P0{quickViewProduct.id} {"-"} SEC_SERIAL_89A8B
                  </div>
                </div>
              </div>

              {/* Product Configurations Container (7 cols) */}
              <div className="md:col-span-7 p-6 sm:p-10 flex flex-col justify-between overflow-y-auto">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-[#CCFF00]/10 text-brand-accent border border-brand-accent/20 text-[9px] font-mono px-3 py-1 rounded-full uppercase tracking-wider font-extrabold">
                      {quickViewProduct.category}
                    </span>
                    <span className="text-brand-muted/70 text-xs">•</span>
                    <span className="text-white/60 font-mono text-[9px] uppercase tracking-widest font-bold">INVICTUS_LAB_APPROVED</span>
                  </div>

                  <h2 className="text-2xl sm:text-3.5xl font-display font-black text-white uppercase tracking-tight mb-2 leading-none">
                    {quickViewProduct.name}
                  </h2>

                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-2xl font-display font-black text-brand-accent">
                      ৳{quickViewProduct.price.toLocaleString()}
                    </span>
                    <span className="text-brand-border/80 text-lg">|</span>
                    <div className="flex items-center gap-1 bg-brand-secondary px-3 py-1 rounded-full border border-brand-border/60">
                      <Star className="w-3.5 h-3.5 fill-brand-accent text-brand-accent" />
                      <span className="text-[11px] font-bold tracking-wider font-mono text-white mt-0.5">{quickViewProduct.rating} Rating</span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-brand-muted font-sans leading-relaxed mb-6 border-b border-brand-border/40 pb-6">
                    {quickViewProduct.description}
                  </p>

                  <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-3 flex items-center gap-1.5 font-mono">
                    <Sliders className="w-3.5 h-3.5 text-brand-accent" /> SPEC LIST & MATRICES
                  </h3>

                  {/* Complete specifications checklist inside item details */}
                  <div className="grid grid-cols-2 gap-x-6 gap-y-3.5 text-xs font-mono text-brand-muted/90 border-b border-brand-border/40 pb-6 mb-6">
                    <div className="flex flex-col">
                      <span className="text-[8px] text-brand-muted/40 font-bold uppercase tracking-wider">COMPOSITION:</span>
                      <span className="text-white font-medium truncate mt-0.5">{quickViewProduct.specs?.material || "Sport Blend"}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[8px] text-brand-muted/40 font-bold uppercase tracking-wider">WEIGHT WEIGHT:</span>
                      <span className="text-white font-medium truncate mt-0.5">{quickViewProduct.specs?.weight || "Regular Fit"}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[8px] text-brand-muted/40 font-bold uppercase tracking-wider">IMPACT PROTECTION:</span>
                      <span className="text-brand-accent font-medium mt-0.5">{quickViewProduct.specs?.absorption || "N/A"}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[8px] text-brand-muted/40 font-bold uppercase tracking-wider">OUTWEAR DURABILITY:</span>
                      <span className="text-white font-medium mt-0.5">{quickViewProduct.specs?.durability || "High Performance"}</span>
                    </div>
                  </div>

                  {/* Sizing Controls if relevant */}
                  {quickViewProduct.category !== 'Digital' && (
                    <div className="mb-8 select-none">
                      <label className="block text-[10px] font-mono font-bold text-brand-muted uppercase tracking-wider mb-2.5">
                        SELECT GEAR ATTIRE SIZE / WEIGHT:
                      </label>
                      <div className="flex gap-2">
                        {(quickViewProduct.category === 'Apparel' ? ['S', 'M', 'L', 'XL'] : ['12oz', '14oz', '16oz']).map(item => (
                          <button
                            key={item}
                            onClick={() => setSelectedSize(item)}
                            className={`min-w-[50px] min-h-[40px] px-3 font-mono font-bold text-xs uppercase rounded-xl border flex items-center justify-center cursor-pointer transition-all duration-300 ${
                              selectedSize === item 
                                ? 'bg-[#CCFF00] border-brand-accent text-black font-black shadow-[0_0_12px_rgba(204,255,0,0.2)]'
                                : 'bg-[#15151b] border-brand-border/80 text-brand-muted hover:border-[#CCFF00]/40 hover:text-white'
                            }`}
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-brand-border/40">
                  <button 
                    onClick={() => {
                      addToCart(quickViewProduct, selectedSize || undefined);
                      setQuickViewProduct(null);
                    }}
                    className="flex-1 bg-brand-accent text-black font-mono font-extrabold py-4 rounded-2xl hover:bg-brand-accent-hover active:scale-[0.98] transition-all duration-300 cursor-pointer text-center text-xs uppercase tracking-widest flex items-center justify-center gap-2.5 shadow-lg shadow-brand-accent/10 min-h-[50px]"
                  >
                    <ShoppingBag className="w-4 h-4 fill-black/10" /> SECURE DEPLOYMENT TO BAG
                  </button>
                  
                  <button 
                    onClick={() => setQuickViewProduct(null)}
                    className="px-6 py-4 bg-[#15151b] border border-brand-border text-brand-muted hover:text-white rounded-2xl hover:border-white/20 transition-all duration-300 font-mono text-xs uppercase tracking-widest min-h-[50px] cursor-pointer text-center"
                  >
                    DISMISS SPECS
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Cart Sliding Drawer Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.65 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black z-50 cursor-pointer"
            />

            {/* Slide over */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 180 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-[#0d0d11] z-50 border-l border-brand-border flex flex-col justify-between shadow-2xl text-left"
            >
              {/* Drawer Title Block */}
              <div className="p-6 border-b border-brand-border/70 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <ShoppingBag className="w-5 h-5 text-brand-accent" />
                  <span className="font-display font-black text-sm uppercase tracking-wider text-white">YOUR SHOPPING CART</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-brand-primary/80 border border-brand-border text-[9px] font-mono text-brand-accent">{cartCount}</span>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 border border-brand-border/60 hover:border-[#CCFF00] text-brand-muted hover:text-[#CCFF00] rounded-xl transition-all cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center bg-[#15151b]"
                  aria-label="Close cart drawer"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                
                {checkoutSuccess ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-4 space-y-5">
                    <div className="w-16 h-16 rounded-full bg-[#CCFF00]/10 border border-[#CCFF00]/30 flex items-center justify-center text-brand-accent mb-2 animate-bounce shadow-[0_0_15px_rgba(204,255,0,0.1)]">
                      <Check className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-display font-black text-white uppercase tracking-tight">ORDER RECEIVED!</h3>
                    <p className="text-xs text-brand-muted leading-relaxed max-w-sm font-sans mx-auto">
                      Your order has been successfully logged into the Invictus Athlete order registers. General Secretary Coach Ishtiak or a local coordination agent will contact you shortly via mobile phone to confirm shipping details.
                    </p>
                    <button 
                      onClick={() => {
                        setCheckoutSuccess(false);
                        setIsCartOpen(false);
                      }}
                      className="px-6 py-3.5 bg-brand-accent text-black font-mono font-extrabold uppercase text-[10px] tracking-widest rounded-xl hover:bg-brand-accent-hover transition-all duration-300 shadow-md shadow-brand-accent/10 cursor-pointer mt-4"
                    >
                      RETURN TO ARMORY
                    </button>
                  </div>
                ) : cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-4 text-brand-muted">
                    <ShoppingBag className="w-12 h-12 text-brand-border/80 mb-4 stroke-[1.2]" />
                    <p className="text-xs font-bold uppercase tracking-wider mb-1 font-mono">Your armory bag is empty</p>
                    <p className="text-[11px] text-brand-muted/70 max-w-[240px] leading-relaxed">Search through the inventory lists and load certified gear to lock in checkout orders.</p>
                  </div>
                ) : (
                  <div className="space-y-6 divide-y divide-brand-border/50">
                    
                    {/* Active list container */}
                    <div className="space-y-4">
                      {cart.map((item, index) => (
                        <div key={`${item.id}-${item.selectedSize || index}`} className="flex items-center gap-4 bg-[#15151b]/40 border border-brand-border/60 p-3.5 rounded-2.5xl">
                          <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-[#15151b] border border-brand-border shrink-0">
                            <Image 
                              src={item.product.image} 
                              alt={item.product.name} 
                              fill 
                              className="object-cover grayscale"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-white text-xs truncate uppercase tracking-wider">{item.product.name}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              {item.selectedSize && (
                                <span className="bg-brand-secondary border border-brand-border text-[9px] font-mono px-2 py-0.5 rounded text-white/80 uppercase">
                                  Size: {item.selectedSize}
                                </span>
                              )}
                              <span className="text-[10px] text-brand-accent font-mono font-bold">
                                ৳{item.product.price.toLocaleString()}
                              </span>
                            </div>
                            
                            {/* Quantity selection modules */}
                            <div className="flex items-center gap-2.5 mt-2.5 select-none">
                              <button 
                                onClick={() => updateQuantity(item.id, item.selectedSize, -1)}
                                className="w-5 h-5 rounded-md border border-brand-border/80 flex items-center justify-center hover:border-brand-accent text-brand-muted hover:text-white transition-all cursor-pointer bg-[#15151b]"
                              >
                                <Minus className="w-2.5 h-2.5" />
                              </button>
                              <span className="text-xs font-mono font-bold text-white text-center w-5">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.id, item.selectedSize, 1)}
                                className="w-5 h-5 rounded-md border border-brand-border/80 flex items-center justify-center hover:border-brand-accent text-brand-muted hover:text-white transition-all cursor-pointer bg-[#15151b]"
                              >
                                <Plus className="w-2.5 h-2.5" />
                              </button>
                            </div>
                          </div>
                          
                          <button 
                            onClick={() => removeFromCart(item.id, item.selectedSize)}
                            className="p-2 border border-brand-border/50 hover:border-red-500/20 text-brand-muted hover:text-red-400 rounded-xl transition-all duration-300 bg-[#15151b]"
                            title="Remove specs from cart"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Integrated Checkout Parameters Form */}
                    <div className="pt-6 space-y-4">
                      <h4 className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-white border-b border-brand-border/50 pb-2 flex items-center gap-2.5">
                        <ShieldCheck className="w-4 h-4 text-brand-accent" /> INVICTUS TACTICAL PROTOCOL CHECKOUT
                      </h4>
                      
                      <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-4 text-xs">
                        <div className="space-y-1">
                          <label className="text-[9px] font-mono font-bold text-brand-muted uppercase tracking-wider">ATHLETE RECIPIENT NAME *</label>
                          <input 
                            type="text" 
                            required
                            placeholder="Shakib Al Hasan"
                            value={checkoutForm.name}
                            onChange={(e) => setCheckoutForm({...checkoutForm, name: e.target.value})}
                            className="w-full bg-[#15151b] border border-brand-border p-3 rounded-xl text-white text-[12px] focus:outline-none focus:border-brand-accent duration-300 placeholder:text-brand-muted/45 focus:bg-[#1c1c24]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9px] font-mono font-bold text-brand-muted uppercase tracking-wider">CONTACT DIRECT PHONE *</label>
                          <input 
                            type="text" 
                            required
                            placeholder="e.g. 01711223344"
                            value={checkoutForm.phone}
                            onChange={(e) => setCheckoutForm({...checkoutForm, phone: e.target.value})}
                            className="w-full bg-[#15151b] border border-brand-border p-3 rounded-xl text-white text-[12px] font-mono focus:outline-none focus:border-brand-accent duration-300 placeholder:text-brand-muted/45 focus:bg-[#1c1c24]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9px] font-mono font-bold text-brand-muted uppercase tracking-wider">SECURE EMAIL ADDRESS</label>
                          <input 
                            type="email" 
                            placeholder="fighter@gmail.com"
                            value={checkoutForm.email}
                            onChange={(e) => setCheckoutForm({...checkoutForm, email: e.target.value})}
                            className="w-full bg-[#15151b] border border-brand-border p-3 rounded-xl text-white text-[12px] focus:outline-none focus:border-brand-accent duration-300 placeholder:text-brand-muted/45 focus:bg-[#1c1c24]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[9px] font-mono font-bold text-[#8e8e93] uppercase tracking-wider">SHIPPING DELIVERY LOCATION *</label>
                          <textarea 
                            required
                            rows={2}
                            placeholder="House, Road, Block, Thana and Zip code within Bangladesh"
                            value={checkoutForm.address}
                            onChange={(e) => setCheckoutForm({...checkoutForm, address: e.target.value})}
                            className="w-full bg-[#15151b] border border-brand-border p-3 rounded-xl text-white text-[12px] focus:outline-none focus:border-brand-accent duration-300 placeholder:text-brand-muted/45 focus:bg-[#1c1c24]"
                          />
                        </div>

                        <div className="space-y-1 select-none">
                          <label className="text-[9px] font-mono font-bold text-brand-muted uppercase tracking-wider">LOCAL REVENUE CHANNELS *</label>
                          <div className="grid grid-cols-3 gap-2 pt-1 font-mono text-[9px]">
                            {['bKash', 'Nagad', 'COD'].map((method) => (
                              <button
                                key={method}
                                type="button"
                                onClick={() => setCheckoutForm({...checkoutForm, paymentMethod: method})}
                                className={`py-3 px-1 font-extrabold uppercase tracking-wider rounded-xl border text-center transition-all duration-300 flex items-center justify-center gap-1 min-h-[44px] cursor-pointer ${
                                  checkoutForm.paymentMethod === method 
                                    ? 'bg-brand-accent text-black border-brand-accent shadow-[0_4px_12px_rgba(204,255,0,0.15)]' 
                                    : 'bg-[#15151b] border-brand-border text-brand-muted hover:text-white hover:border-[#CCFF00]/40'
                                }`}
                              >
                                {method === 'COD' ? 'Cash Delivery' : method}
                              </button>
                            ))}
                          </div>
                        </div>
                      </form>
                    </div>

                  </div>
                )}
              </div>

              {/* Drawer Billing Summaries inside drawer */}
              {!checkoutSuccess && cart.length > 0 && (
                <div className="p-6 border-t border-brand-border bg-[#050507]/90 space-y-4">
                  <div className="space-y-2 font-mono text-[10px] uppercase tracking-wider text-brand-muted border-b border-brand-border/40 pb-3">
                    <div className="flex justify-between items-center text-brand-muted font-bold">
                      <span>Inventory Sum:</span>
                      <span className="text-white">৳{cartSubtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-brand-muted font-bold">
                      <span>Tactical Shipping:</span>
                      <span className="text-emerald-400">FREE OVERLAND</span>
                    </div>
                    <div className="flex justify-between items-center text-white text-xs font-black tracking-wide border-t border-brand-border/40 pt-2.5">
                      <span>System Subtotal:</span>
                      <span className="text-brand-accent text-sm">৳{cartSubtotal.toLocaleString()}</span>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    form="checkout-form"
                    className="w-full py-4 bg-brand-accent text-black font-mono font-black uppercase tracking-wider text-[11px] rounded-2xl hover:bg-[#b5ee00] transition-colors shadow-lg shadow-brand-accent/10 cursor-pointer flex items-center justify-center gap-2 min-h-[50px] active:scale-[0.98]"
                  >
                    PLACE TACTICAL DEPLOYMENT ORDER (৳{cartSubtotal.toLocaleString()})
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Footer detailing legal matrices */}
      <footer className="border-t border-brand-border py-14 px-4 sm:py-20 sm:px-6 bg-[#0a0a0d]/90 relative z-10 select-none text-[11px]">
        <div className="container max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-2.5 text-brand-muted">
            <Info className="w-4.5 h-4.5 text-brand-accent shrink-0 animate-pulse" />
            <p className="font-bold uppercase tracking-widest font-mono text-[10px]">Overland transport within Bangladesh // Authorized dispatch</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 font-mono uppercase tracking-widest text-brand-muted font-semibold text-[10px]">
            <a href="#" className="hover:text-brand-accent transition-colors">Tactical Returns</a>
            <a href="#" className="hover:text-brand-accent transition-colors">Privacy matrices</a>
            <a href="#" className="hover:text-brand-accent transition-colors">Terms of division</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
