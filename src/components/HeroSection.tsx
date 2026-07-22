import React from 'react';
import { Sparkles, ShieldCheck, Truck, RotateCcw, Zap, ArrowRight, Award, CheckCircle2 } from 'lucide-react';
import { ShoeCategory } from '../types';

interface HeroSectionProps {
  onSelectCategory: (cat: ShoeCategory) => void;
  onOpenStylist: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSelectCategory, onOpenStylist }) => {
  const handleExploreAll = () => {
    onSelectCategory('All');
    document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative bg-gradient-to-br from-stone-950 via-stone-900 to-stone-950 text-white overflow-hidden py-10 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-stone-800">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        
        {/* Left Column Text & Call to Actions */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold px-3.5 py-1.5 rounded-full shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span>Festive Season & Wedding Footwear Collection 2026</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-extrabold tracking-tight text-white leading-tight">
            Elevate Your Stride with <br className="hidden sm:inline"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-300 to-amber-200">
              Handcrafted & Performance Footwear
            </span>
          </h1>

          <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
            From handcrafted Zardozi embroidered Juttis for festive celebrations to high-octane street sneakers & carbon marathon runners. Engineered for superior weather resistance, perfect fit, and timeless comfort.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={handleExploreAll}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-sm px-6 py-3.5 rounded-2xl transition-all shadow-xl shadow-amber-500/20 flex items-center gap-2 cursor-pointer hover:scale-[1.03] active:scale-[0.98]"
              id="hero-explore-collection-btn"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4 text-stone-950" />
            </button>

            <button
              onClick={onOpenStylist}
              className="bg-stone-900/90 hover:bg-stone-800 text-stone-200 border border-stone-700/80 font-semibold text-sm px-5 py-3.5 rounded-2xl transition-all flex items-center gap-2 cursor-pointer hover:border-amber-500/50"
              id="hero-ai-stylist-btn"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Try AI Outfit Matcher</span>
            </button>
          </div>

          {/* 🌟 Professional & Aesthetic Trust Badges Strip (Redesigned from Image) */}
          <div className="pt-6 border-t border-stone-800/80">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              
              {/* Badge 1 */}
              <div className="bg-stone-900/80 hover:bg-stone-850 border border-stone-800 hover:border-emerald-500/40 p-3 rounded-2xl transition-all duration-300 group shadow-sm flex items-center gap-3">
                <div className="w-9 h-9 bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">100% Genuine</h5>
                  <p className="text-[10px] text-stone-400">Artisan Leather & Craft</p>
                </div>
              </div>

              {/* Badge 2 */}
              <div className="bg-stone-900/80 hover:bg-stone-850 border border-stone-800 hover:border-amber-500/40 p-3 rounded-2xl transition-all duration-300 group shadow-sm flex items-center gap-3">
                <div className="w-9 h-9 bg-amber-950/60 border border-amber-500/30 text-amber-400 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">Instant Payment</h5>
                  <p className="text-[10px] text-stone-400">UPI & Cash on Delivery</p>
                </div>
              </div>

              {/* Badge 3 */}
              <div className="bg-stone-900/80 hover:bg-stone-850 border border-stone-800 hover:border-sky-500/40 p-3 rounded-2xl transition-all duration-300 group shadow-sm flex items-center gap-3">
                <div className="w-9 h-9 bg-sky-950/60 border border-sky-500/30 text-sky-400 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-white group-hover:text-sky-300 transition-colors">Express Dispatch</h5>
                  <p className="text-[10px] text-stone-400">Chandigarh • All India</p>
                </div>
              </div>

              {/* Badge 4 */}
              <div className="bg-stone-900/80 hover:bg-stone-850 border border-stone-800 hover:border-purple-500/40 p-3 rounded-2xl transition-all duration-300 group shadow-sm flex items-center gap-3">
                <div className="w-9 h-9 bg-purple-950/60 border border-purple-500/30 text-purple-400 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <RotateCcw className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors">14-Day Easy Exchange</h5>
                  <p className="text-[10px] text-stone-400">Doorstep Swaps & Return</p>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Right Column Visual Showcase */}
        <div className="lg:col-span-5 relative">
          <div className="relative rounded-3xl overflow-hidden border border-stone-800 shadow-2xl bg-stone-900 group">
            <img
              src="https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=800"
              alt="Indian Streetwear & Heritage Showcase"
              className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90"
              referrerPolicy="no-referrer"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />

            <div className="absolute bottom-4 left-4 right-4 p-4 bg-stone-900/90 backdrop-blur-md rounded-2xl border border-stone-800 flex items-center justify-between">
              <div>
                <p className="text-amber-400 text-xs font-semibold uppercase tracking-wider">Top Trending Footwear</p>
                <h4 className="text-white text-sm font-bold">AirSole '90 Heritage Street High-Tops</h4>
                <p className="text-stone-400 text-xs">₹4,999 <span className="line-through text-stone-500">₹6,999</span> (28% OFF)</p>
              </div>
              <button 
                onClick={() => {
                  onSelectCategory('Sneakers');
                  document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-amber-500 text-stone-900 text-xs font-bold px-3.5 py-2 rounded-xl hover:bg-amber-400 transition-colors cursor-pointer"
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
