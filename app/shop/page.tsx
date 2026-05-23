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
  Check
} from 'lucide-react';

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
  const [products, setProducts] = React.useState<any[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('invictus_products');
      if (stored) return JSON.parse(stored);
      localStorage.setItem('invictus_products', JSON.stringify(defaultProducts));
    }
    return defaultProducts;
  });
  const [filter, setFilter] = React.useState('All');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [cart, setCart] = React.useState<{ id: number; product: any; quantity: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = React.useState(false);
  const [checkoutForm, setCheckoutForm] = React.useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    paymentMethod: 'bKash'
  });

  const categories = ['All', 'Apparel', 'Equipment', 'Digital'];

  const filteredProducts = products.filter(p => {
    const matchesFilter = filter === 'All' || p.category === filter;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const addToCart = (product: any) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { id: product.id, product, quantity: 1 }];
    });
    setIsCartOpen(true);
    setCheckoutSuccess(false); // Reset checkout success state when adding new things
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const nextQty = item.quantity + delta;
        return nextQty > 0 ? { ...item, quantity: nextQty } : item;
      }
      return item;
    }));
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const newOrder = {
      id: "ord-" + Date.now().toString().slice(-6),
      athleteName: checkoutForm.name,
      phone: checkoutForm.phone,
      email: checkoutForm.email || "N/A",
      address: checkoutForm.address,
      items: cart.map(item => `${item.product.name} (Qty: ${item.quantity})`).join(", "),
      totalPrice: cartSubtotal,
      status: "Pending",
      paymentMethod: checkoutForm.paymentMethod,
      date: new Date().toISOString().split('T')[0]
    };

    if (typeof window !== 'undefined') {
      const existingOrdersStr = localStorage.getItem('invictus_orders');
      const existingOrders = existingOrdersStr ? JSON.parse(existingOrdersStr) : [];
      const updatedOrders = [newOrder, ...existingOrders];
      localStorage.setItem('invictus_orders', JSON.stringify(updatedOrders));
    }

    // Flush states
    setCart([]);
    setCheckoutSuccess(true);
    setCheckoutForm({ name: '', phone: '', email: '', address: '', paymentMethod: 'bKash' });
  };

  return (
    <main className="min-h-screen bg-brand-primary text-white relative overflow-x-hidden font-sans">
      
      {/* Dynamic Header */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-brand-primary/80 backdrop-blur-md border-b border-brand-border px-4 sm:px-6 py-4">
        <div className="container max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-brand-muted hover:text-brand-accent transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold text-xs uppercase tracking-widest font-mono">Back to Fight Lab</span>
          </Link>
          
          <div className="flex items-center gap-1.5">
            <span className="text-lg font-display font-black tracking-tighter text-white uppercase">INVICTUS <span className="text-brand-accent">STORE</span></span>
          </div>

          <div className="relative">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="p-2.5 hover:bg-brand-secondary rounded-2xl border border-brand-border hover:border-brand-accent transition-colors relative group min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5 group-hover:text-brand-accent transition-colors text-white" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-brand-accent text-black text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full animate-pulse shadow-md">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-28 pb-12 sm:pt-36 sm:pb-16 px-4 sm:px-12 lg:px-24">
        <div className="container max-w-7xl mx-auto">
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-display font-black tracking-tight mb-4 text-white uppercase leading-none">
            ELITE <span className="text-brand-accent">GEAR.</span>
          </h1>
          <p className="text-base sm:text-lg text-brand-muted max-w-2xl leading-relaxed mb-10">
            Premium gear, apparel, and digital plans certified or designed by General Secretary Coach Ishtiak. Built for champions.
          </p>

          {/* Filters & Search Controls */}
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 items-stretch lg:items-center justify-between border-y border-brand-border/65 py-6 select-none">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-5 py-2 sm:px-6 rounded-full text-[11px] font-bold uppercase tracking-wider border transition-all cursor-pointer min-h-[40px] flex items-center justify-center ${
                    filter === cat 
                      ? 'bg-brand-accent text-black border-brand-accent shadow-md shadow-brand-accent/15 font-black' 
                      : 'bg-transparent text-brand-muted border-brand-border hover:border-brand-accent/50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full lg:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
              <input 
                type="text" 
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-brand-secondary border border-brand-border rounded-full py-3.5 pl-12 pr-6 text-xs focus:outline-none focus:border-brand-accent transition-colors text-white"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Product list grid */}
      <section className="pb-24 sm:pb-32 px-4 sm:px-12 lg:px-24">
        <div className="container max-w-7xl mx-auto">
          {filteredProducts.length === 0 ? (
            <div className="py-24 text-center border border-dashed border-brand-border rounded-[2.5rem] bg-brand-secondary/10">
              <p className="text-brand-muted text-sm font-mono">No products match your search. Try adjusting filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product, idx) => (
                  <motion.div
                    layout
                    key={product.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className="group flex flex-col justify-between bg-brand-secondary/25 border border-brand-border/60 rounded-[2rem] p-5 hover:border-brand-accent/25 hover:shadow-[0_0_30px_rgba(204,255,0,0.02)] transition-all duration-300"
                  >
                    <div>
                      {/* Image Frame */}
                      <div className="relative aspect-square rounded-2xl overflow-hidden bg-brand-secondary border border-brand-border mb-5 group-hover:border-brand-accent/20 transition-colors">
                        <Image 
                          src={product.image} 
                          alt={product.name} 
                          fill 
                          className="object-cover grayscale brightness-[0.85] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-4 left-4 z-10">
                          <span className="bg-black/85 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-mono font-bold uppercase tracking-widest text-brand-accent border border-brand-accent/15">
                            {product.category}
                          </span>
                        </div>
                      </div>
                      
                      {/* Details */}
                      <div className="px-1 mb-6">
                        <div className="flex justify-between items-start gap-2 mb-1.5">
                          <h3 className="text-base font-bold text-white group-hover:text-brand-accent transition-all line-clamp-1">{product.name}</h3>
                          <span className="text-base font-display font-black text-brand-accent shrink-0">৳{product.price}</span>
                        </div>
                        
                        <p className="text-xs text-brand-muted font-sans line-clamp-2 leading-relaxed mb-3">
                          {product.description}
                        </p>

                        <div className="flex items-center gap-2 text-brand-muted">
                          <div className="flex items-center">
                            <Star className="w-3.5 h-3.5 fill-brand-accent text-brand-accent" />
                            <span className="text-[10px] font-bold ml-1 text-white">{product.rating}</span>
                          </div>
                          <span className="text-brand-border/80 text-xs">•</span>
                          <span className="text-[9px] font-bold font-mono uppercase tracking-widest text-brand-muted">INVICTUS_CERTIFIED</span>
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={() => addToCart(product)}
                      className="w-full py-3.5 bg-brand-primary border border-brand-border hover:border-brand-accent hover:text-brand-accent text-xs font-bold uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2.5 group/btn cursor-pointer min-h-[44px]"
                    >
                      <ShoppingBag className="w-4 h-4 text-brand-muted group-hover/btn:text-brand-accent transition-colors" /> Add to bag
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      {/* Cart Slider Drawer */}
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
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-brand-secondary z-50 border-l border-brand-border/50 flex flex-col justify-between shadow-2xl"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-brand-border/50 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <ShoppingBag className="w-5 h-5 text-brand-accent" />
                  <span className="font-display font-black text-sm uppercase tracking-wider text-white">YOUR SHOPPING CART</span>
                  <span className="px-2 py-0.5 rounded-full bg-brand-primary/80 border border-brand-border text-[9px] font-mono text-brand-accent">{cartCount}</span>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 border border-brand-border/60 hover:border-brand-accent text-brand-muted hover:text-brand-accent rounded-xl transition-all cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center"
                >
                  <X className="w-45 h-45" />
                </button>
              </div>

              {/* Drawer Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                
                {/* Checkout success screen */}
                {checkoutSuccess ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-4 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-[#52fa7c]/10 border border-[#52fa7c]/25 flex items-center justify-center text-[#52fa7c] mb-2 animate-bounce">
                      <Check className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-display font-black text-white uppercase tracking-tight">ORDER RECEIVED!</h3>
                    <p className="text-xs text-brand-muted leading-relaxed max-w-xs font-sans">
                      Your order has been logged into the Invictus Athlete Hub database. Coach Ishtiak or a representative will contact you shortly on your mobile phone to lock in delivery details.
                    </p>
                    <button 
                      onClick={() => {
                        setCheckoutSuccess(false);
                        setIsCartOpen(false);
                      }}
                      className="px-6 py-2.5 bg-brand-accent text-black font-bold uppercase text-[10px] tracking-widest rounded-xl hover:bg-brand-accent-hover transition-colors shadow-lg cursor-pointer max-w-[200px]"
                    >
                      CONTINUE SHOPPING
                    </button>
                  </div>
                ) : cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-4 text-brand-muted">
                    <ShoppingBag className="w-12 h-12 text-brand-border mb-4 stroke-[1.5]" />
                    <p className="text-sm font-semibold uppercase tracking-wider mb-1">Your bag is empty</p>
                    <p className="text-xs text-brand-muted/70 max-w-[220px]">Explore our elite gears and add items to begin checkout.</p>
                  </div>
                ) : (
                  <div className="space-y-6 divide-y divide-brand-border/30">
                    
                    {/* Items List */}
                    <div className="space-y-4">
                      {cart.map((item) => (
                        <div key={item.id} className="flex items-center gap-4 bg-brand-primary/20 border border-brand-border/50 p-3.5 rounded-2xl">
                          <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-brand-primary shrink-0">
                            <Image 
                              src={item.product.image} 
                              alt={item.product.name} 
                              fill 
                              className="object-cover grayscale"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-white text-xs truncate uppercase tracking-wide">{item.product.name}</h4>
                            <div className="text-[11px] text-brand-accent font-mono font-bold mt-1">৳{item.product.price}</div>
                            
                            {/* Quantity buttons */}
                            <div className="flex items-center gap-2.5 mt-2 select-none">
                              <button 
                                onClick={() => updateQuantity(item.id, -1)}
                                className="w-5 h-5 rounded-full border border-brand-border/60 flex items-center justify-center hover:border-brand-accent text-brand-muted hover:text-white transition-all cursor-pointer text-xs"
                              >
                                <Minus className="w-2.5 h-2.5" />
                              </button>
                              <span className="text-xs font-mono font-bold text-white text-center w-5">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.id, 1)}
                                className="w-5 h-5 rounded-full border border-brand-border/60 flex items-center justify-center hover:border-brand-accent text-brand-muted hover:text-white transition-all cursor-pointer text-xs"
                              >
                                <Plus className="w-2.5 h-2.5" />
                              </button>
                            </div>
                          </div>
                          
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="p-2 border border-brand-border/50 hover:border-red-500/30 text-brand-muted hover:text-red-400 rounded-xl transition-all cursor-pointer"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Checkout Form */}
                    <div className="pt-6 space-y-4">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-white border-b border-brand-border/40 pb-2 flex items-center gap-2">
                        📋 INVICTUS SECURE CHECKOUT
                      </h4>
                      
                      <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-3.5 text-xs text-left">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-brand-muted uppercase tracking-wider">Your Full Name *</label>
                          <input 
                            type="text" 
                            required
                            placeholder="e.g. Shakib Al Hasan"
                            value={checkoutForm.name}
                            onChange={(e) => setCheckoutForm({...checkoutForm, name: e.target.value})}
                            className="w-full bg-brand-primary border border-brand-border/85 p-2.5 rounded-xl text-white text-[13px] focus:outline-none focus:border-brand-accent duration-200"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-brand-muted uppercase tracking-wider">Contact Mobile Phone *</label>
                          <input 
                            type="text" 
                            required
                            placeholder="e.g. 01711-223344"
                            value={checkoutForm.phone}
                            onChange={(e) => setCheckoutForm({...checkoutForm, phone: e.target.value})}
                            className="w-full bg-brand-primary border border-brand-border/85 p-2.5 rounded-xl text-white text-[13px] font-mono focus:outline-none focus:border-brand-accent duration-200"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-brand-muted uppercase tracking-wider">Email Address</label>
                          <input 
                            type="email" 
                            placeholder="e.g. fighter@outlook.com"
                            value={checkoutForm.email}
                            onChange={(e) => setCheckoutForm({...checkoutForm, email: e.target.value})}
                            className="w-full bg-brand-primary border border-brand-border/85 p-2.5 rounded-xl text-white text-[13px] focus:outline-none focus:border-brand-accent duration-200"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-brand-muted uppercase tracking-wider">Delivery Shipping Address *</label>
                          <textarea 
                            required
                            rows={2}
                            placeholder="House, Street, Area, City (within Bangladesh)"
                            value={checkoutForm.address}
                            onChange={(e) => setCheckoutForm({...checkoutForm, address: e.target.value})}
                            className="w-full bg-brand-primary border border-brand-border/85 p-2.5 rounded-xl text-white text-[13px] focus:outline-none focus:border-brand-accent duration-200"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-brand-muted uppercase tracking-wider">Payment Method *</label>
                          <div className="grid grid-cols-3 gap-2 select-none pt-1">
                            {['bKash', 'Nagad', 'COD'].map((method) => (
                              <button
                                key={method}
                                type="button"
                                onClick={() => setCheckoutForm({...checkoutForm, paymentMethod: method})}
                                className={`py-2 px-1 text-[10px] font-black uppercase tracking-wider rounded-lg border text-center cursor-pointer transition-all ${
                                  checkoutForm.paymentMethod === method 
                                    ? 'bg-brand-accent text-black border-brand-accent font-extrabold shadow-sm' 
                                    : 'bg-brand-primary border-brand-border text-brand-muted hover:text-white hover:border-white/20'
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

              {/* Drawer Footer */}
              {!checkoutSuccess && cart.length > 0 && (
                <div className="p-6 border-t border-brand-border/50 bg-black/40 space-y-4">
                  <div className="space-y-1.5 font-mono text-xs">
                    <div className="flex justify-between items-center text-brand-muted uppercase font-bold text-[10px]">
                      <span>Subtotal amount:</span>
                      <span>৳{cartSubtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-brand-muted uppercase font-bold text-[10px]">
                      <span>In-country Delivery:</span>
                      <span className="text-emerald-400">FREE DELIVERY</span>
                    </div>
                    <div className="flex justify-between items-center text-white text-sm font-black uppercase tracking-wide border-t border-brand-border/40 pt-2">
                      <span>Total:</span>
                      <span className="text-brand-accent">৳{cartSubtotal.toLocaleString()}</span>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    form="checkout-form"
                    className="w-full py-4 bg-brand-accent text-black font-bold uppercase tracking-widest text-xs rounded-xl hover:bg-brand-accent-hover transition-colors shadow-md shadow-brand-accent/15 cursor-pointer flex items-center justify-center gap-2 min-h-[46px]"
                  >
                    PLACE ORDER NOW (৳{cartSubtotal.toLocaleString()})
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="border-t border-brand-border py-12 px-4 sm:py-20 sm:px-6 bg-brand-secondary/30 relative z-10 select-none text-[11px]">
        <div className="container max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-2 text-brand-muted">
            <Info className="w-4 h-4 text-brand-accent shrink-0" />
            <p className="font-bold uppercase tracking-wider">Ships within Bangladesh & International Regions</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 font-mono uppercase tracking-widest text-brand-muted font-bold">
            <a href="#" className="hover:text-brand-accent transition-colors">Returns</a>
            <a href="#" className="hover:text-brand-accent transition-colors">Privacy policy</a>
            <a href="#" className="hover:text-brand-accent transition-colors">Service Terms</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
