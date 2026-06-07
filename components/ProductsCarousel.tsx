'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';

interface Product {
  id: string | number;
  name: string;
  price: number | string;
  image?: string;
  img?: string;
}

interface ProductsCarouselProps {
  currentProducts: Product[];
  productIdx: number;
  itemWidth: number;
  carouselGap: number;
  isCarouselHovered: boolean;
  skipTransitionRef: React.MutableRefObject<boolean>;
  nextProduct: () => void;
  prevProduct: () => void;
  handleTransitionEnd: () => void;
  setIsCarouselHovered: (v: boolean) => void;
}

export default function ProductsCarousel({
  currentProducts,
  productIdx,
  itemWidth,
  carouselGap,
  skipTransitionRef,
  nextProduct,
  prevProduct,
  handleTransitionEnd,
  setIsCarouselHovered,
}: ProductsCarouselProps) {
  return (
    <section className="py-10 bg-brand-primary overflow-hidden relative">
      <div className="container max-w-7xl mx-auto px-4 sm:px-12 lg:px-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 gap-6 sm:gap-8">
          <div>
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-display font-black tracking-tight mb-4 sm:mb-6 text-white leading-none">
              ELITE <span className="text-brand-accent">GEAR</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-brand-muted max-w-xl leading-relaxed">
              Hand-picked equipment and apparel designed for high-performance training. Tested in the gym, proven in the ring.
            </p>
          </div>

          <div className="flex items-center gap-4 self-start md:self-end">
            <div className="flex gap-2">
              <button
                onClick={prevProduct}
                className="p-3 bg-brand-secondary/80 border border-brand-border text-white rounded-full transition-all cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center shadow-lg active:scale-95 hover:bg-brand-accent hover:text-black hover:border-brand-accent"
                aria-label="Previous products"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextProduct}
                className="p-3 bg-brand-secondary/80 border border-brand-border text-white rounded-full transition-all cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center shadow-lg active:scale-95 hover:bg-brand-accent hover:text-black hover:border-brand-accent"
                aria-label="Next products"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <Link
              href="/shop"
              className="inline-flex items-center gap-2.5 bg-brand-accent text-black px-5 py-3 rounded-full font-bold hover:bg-brand-accent-hover transition-all group shadow-lg shadow-brand-accent/20 text-xs sm:text-sm uppercase tracking-wider"
            >
              <span>Shop All</span>
              <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      <div
        className="relative w-full py-6"
        onMouseEnter={() => setIsCarouselHovered(true)}
        onMouseLeave={() => setIsCarouselHovered(false)}
      >
        <div
          className="flex"
          style={{
            transform: `translateX(calc(50% - (${itemWidth}px / 2) - (${productIdx} * (${itemWidth}px + ${carouselGap}px))))`,
            gap: `${carouselGap}px`,
            transition: skipTransitionRef.current ? 'none' : 'transform 500ms cubic-bezier(0.25, 1, 0.5, 1)'
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {(currentProducts.length > 0 ? [...currentProducts, ...currentProducts, ...currentProducts] : []).map((product, idx) => {
            const displayPrice = typeof product.price === 'number' ? `$${product.price.toFixed(2)}` : product.price;
            const displayImg = product.image || product.img || "/images/shop/placeholder.svg";
            const isActive = idx === productIdx;

            return (
              <Link
                href="/shop"
                key={`${product.id || idx}-${idx}`}
                style={{ width: `${itemWidth}px` }}
                className={`shrink-0 group block cursor-pointer transition-all duration-500 transform ${
                  isActive
                    ? 'scale-100 opacity-100 z-10'
                    : 'scale-[0.92] opacity-60 z-0'
                }`}
              >
                <div className={`relative aspect-square rounded-3xl overflow-hidden bg-brand-secondary border transition-all duration-500 mb-5 sm:mb-6 ${
                  isActive
                    ? 'border-brand-accent/70 shadow-2xl shadow-brand-accent/10'
                    : 'border-brand-border/60 shadow-none'
                }`}>
                  <Image
                    src={displayImg}
                    alt={product.name}
                    fill
                    className={`object-cover transition-all duration-700 ${
                      isActive
                    ? 'grayscale-0 scale-102'
                    : 'grayscale-[60%] scale-100 group-hover:scale-102 group-hover:grayscale-0'
                    }`}
                    loading="lazy"
                    quality={75}
                    referrerPolicy="no-referrer"
                  />

                  <div className={`absolute inset-0 bg-brand-primary/40 flex items-center justify-center transition-opacity duration-300 ${
                    isActive ? 'opacity-0 group-hover:opacity-100' : 'opacity-0'
                  }`}>
                    <span className="bg-brand-accent text-black px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-widest shadow-xl transition-all duration-300 scale-90 group-hover:scale-100">
                      Quick View
                    </span>
                  </div>
                </div>

                <div className={`flex justify-between items-start gap-4 transition-opacity duration-500 ${
                  isActive ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'
                }`}>
                  <span className="font-bold text-base sm:text-lg text-white group-hover:text-brand-accent transition-colors leading-snug">
                    {product.name}
                  </span>
                  <span className="font-display font-black text-brand-accent shrink-0 text-sm sm:text-base">
                    {displayPrice}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
