import React from 'react';
import { Sparkles, ShieldCheck, Truck, RotateCcw, Zap, ArrowRight, Award } from 'lucide-react';
import { ShoeCategory } from '../types';

interface HeroSectionProps {
  onSelectCategory: (cat: ShoeCategory) => void;
  onOpenStylist: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSelectCategory, onOpenStylist }) => {
  return (
    <section className="relative bg-gradient-to-br from-stone-900 via-stone-850 to-stone-950 text-white overflow-hidden py-10 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-stone-800">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        
        {/* Left Column Text & Call to Actions */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Festive Season & Wedding Footwear Collection 2026</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-extrabold tracking-tight text-white leading-tight">
            Elevate Your Stride with <br className="hidden sm:inline"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-300 to-amber-200">
              Handcrafted & Performance Footwear
            </span>
          </h1>

          <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-2xl">
            From handcrafted Zardozi embroidered Juttis for festive celebrations to high-octane street sneakers & carbon marathon runners. Engineered for superior weather resistance, perfect fit, and timeless comfort.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onSelectCategory('All')}
              className="bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-sm px-6 py-3 rounded-xl transition-all shadow-lg shadow-amber-600/25 flex items-center gap-2 cursor-pointer hover:scale-[1.02]"
              id="hero-explore-collection-btn"
            >
              Explore Collection <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenStylist}
              className="bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 font-semibold text-sm px-5 py-3 rounded-xl transition-all flex items-center gap-2 cursor-pointer hover:border-amber-500/50"
              id="hero-ai-stylist-btn"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              Try AI Outfit Matcher
            </button>
          </div>

          {/* Quick Badges Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-stone-800/80 text-xs text-stone-300">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>100% Genuine Artisan Leather</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Instant UPI & COD Available</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-sky-400 shrink-0" />
              <span>Dispatched from Chandigarh • All-India Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-purple-400 shrink-0" />
              <span>14-Day Easy Exchange Policy</span>
            </div>
          </div>
        </div>

        {/* Right Column Visual Showcase */}
        <div className="lg:col-span-5 relative">
          <div className="relative rounded-2xl overflow-hidden border border-stone-800 shadow-2xl bg-stone-900 group">
            <img
              src="https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=800"
              alt="Indian Streetwear & Heritage Showcase"
              className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90"
              referrerPolicy="no-referrer"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />

            <div className="absolute bottom-4 left-4 right-4 p-4 bg-stone-900/90 backdrop-blur-md rounded-xl border border-stone-800 flex items-center justify-between">
              <div>
                <p className="text-amber-400 text-xs font-semibold uppercase tracking-wider">Top Trending Footwear</p>
                <h4 className="text-white text-sm font-bold">AirSole '90 Heritage Street High-Tops</h4>
                <p className="text-stone-400 text-xs">₹4,999 <span className="line-through text-stone-500">₹6,999</span> (28% OFF)</p>
              </div>
              <button 
                onClick={() => onSelectCategory('Sneakers')}
                className="bg-amber-500 text-stone-900 text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-amber-400 transition-colors cursor-pointer"
                id="hero-featured-view-btn"
              >
                View
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
