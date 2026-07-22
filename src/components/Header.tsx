import React, { useState } from 'react';
import { 
  ShoppingBag, Heart, Search, Sparkles, MapPin, Package, 
  ShieldCheck, Footprints, User, Crown, ArrowUpRight, Tag
} from 'lucide-react';
import { ShoeCategory } from '../types';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  selectedCategory: ShoeCategory;
  onSelectCategory: (cat: ShoeCategory) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenAuth: () => void;
  onOpenStylist: () => void;
  onOpenPincodeChecker: () => void;
  onOpenOrderTracker: () => void;
  userPincode: string;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  wishlistCount,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onOpenCart,
  onOpenWishlist,
  onOpenAuth,
  onOpenStylist,
  onOpenPincodeChecker,
  onOpenOrderTracker,
  userPincode
}) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const categories: ShoeCategory[] = [
    'All',
    'Sneakers',
    'Ethnic Juttis',
    'Running & Sports',
    'Formal Brogues',
    'Casual Loafers',
    'Sandals & Floaters'
  ];

  const popularSearches = [
    'Handcrafted Punjabi Jutti',
    'Air Cushion Sneakers',
    'Pure Leather Brogues',
    'Wedding Mojaris',
    'Marathon Running Shoes'
  ];

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      
      {/* 1. Luxurious Top Announcement Ticker */}
      <div className="bg-gradient-to-r from-stone-950 via-amber-950 to-stone-950 text-stone-100 text-xs py-2 px-4 border-b border-amber-500/20 shadow-inner">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center text-center gap-2">
          
          <div className="flex items-center gap-2 mx-auto lg:mx-0">
            <span className="bg-gradient-to-r from-amber-400 to-amber-600 text-stone-950 font-black text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1 animate-pulse">
              <Crown className="w-3 h-3" /> Festive Sale
            </span>
            <span className="text-stone-300 text-xs font-medium">
              Flat 10% OFF on First Order • Code: <strong className="text-amber-300 font-mono tracking-wider bg-amber-900/40 px-1.5 py-0.5 rounded border border-amber-500/30">SOLE10</strong>
            </span>
          </div>

          <div className="flex items-center gap-4 text-stone-300 text-[11px] mx-auto lg:mx-0">
            <button 
              onClick={onOpenPincodeChecker}
              className="flex items-center gap-1.5 hover:text-amber-300 transition-colors bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded-full border border-white/10 cursor-pointer"
              id="header-pincode-btn"
            >
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Deliver to: <strong className="text-white font-mono">{userPincode || 'Check Delivery'}</strong></span>
            </button>
            
            <button 
              onClick={onOpenOrderTracker}
              className="flex items-center gap-1.5 hover:text-amber-300 transition-colors bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded-full border border-white/10 cursor-pointer"
              id="header-track-order-btn"
            >
              <Package className="w-3.5 h-3.5 text-amber-400" />
              <span>Track Order</span>
            </button>

            <span className="hidden xl:flex items-center gap-1.5 text-emerald-400 font-medium bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-500/30">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 100% Authentic Artisanal Footwear
            </span>
          </div>
        </div>
      </div>

      {/* 2. Main Header Bar */}
      <div className="bg-stone-900/95 backdrop-blur-xl border-b border-stone-800 shadow-xl relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => onSelectCategory('All')}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/30 group-hover:scale-105 transition-transform">
              <Footprints className="w-5 h-5 text-stone-950 -rotate-12 group-hover:rotate-0 transition-transform duration-300" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-2xl font-extrabold tracking-wider text-white group-hover:text-amber-400 transition-colors">
                  VELOCE
                </span>
                <span className="text-[9px] bg-amber-500/20 text-amber-300 border border-amber-500/40 px-1.5 py-0.2 rounded font-mono uppercase font-bold">
                  LUXURY
                </span>
              </div>
              <p className="text-[10px] text-stone-400 font-medium tracking-widest uppercase">
                Handcrafted Footwear
              </p>
            </div>
          </div>

          {/* Interactive Search Bar */}
          <div className="flex-1 max-w-lg hidden lg:block relative">
            <div 
              className={`flex items-center bg-stone-800/80 rounded-2xl px-4 py-2 border transition-all duration-300 ${
                isSearchFocused 
                  ? 'border-amber-500 ring-4 ring-amber-500/20 bg-stone-950 shadow-lg shadow-amber-500/10' 
                  : 'border-stone-700/80 hover:border-stone-600'
              }`}
            >
              <Search className={`w-4 h-4 mr-2.5 transition-colors ${isSearchFocused ? 'text-amber-400' : 'text-stone-400'}`} />
              <input
                type="text"
                placeholder="Search Bridal Juttis, Sneakers, Brogues, Loafers..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                className="bg-transparent text-xs text-white placeholder-stone-400 focus:outline-none w-full font-medium"
                id="header-search-input"
              />
              {searchQuery && (
                <button 
                  onClick={() => onSearchChange('')} 
                  className="text-stone-400 hover:text-white text-xs px-1.5 py-0.5 rounded-md bg-stone-700/50"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Suggestions Popup */}
            {isSearchFocused && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-stone-900 border border-stone-700 rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-400 uppercase tracking-wider mb-2">
                  <Tag className="w-3.5 h-3.5" /> Popular Searches
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {popularSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => {
                        onSearchChange(term);
                        setIsSearchFocused(false);
                      }}
                      className="text-xs bg-stone-800 hover:bg-amber-600 hover:text-white text-stone-300 px-3 py-1.5 rounded-xl border border-stone-700 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <span>{term}</span>
                      <ArrowUpRight className="w-3 h-3 text-stone-500 opacity-60" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* AI Stylist Button */}
            <button
              onClick={onOpenStylist}
              className="flex items-center gap-2 bg-gradient-to-r from-amber-500 via-amber-600 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-stone-950 font-bold text-xs px-3.5 py-2 rounded-2xl shadow-md transition-all hover:scale-105 cursor-pointer border border-amber-300/40"
              id="header-ai-stylist-btn"
            >
              <Sparkles className="w-4 h-4 text-stone-950" />
              <span className="hidden sm:inline">AI SoleMate</span>
              <span className="sm:hidden">Stylist</span>
            </button>

            {/* Wishlist */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2.5 text-stone-300 hover:text-rose-400 hover:bg-stone-800 rounded-2xl transition-all border border-stone-700/50 cursor-pointer group"
              title="View Wishlist"
              id="header-wishlist-btn"
            >
              <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white font-extrabold text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-md ring-2 ring-stone-900">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* User Auth */}
            <button
              onClick={onOpenAuth}
              className="p-2.5 text-stone-300 hover:text-amber-400 hover:bg-stone-800 rounded-2xl transition-all border border-stone-700/50 cursor-pointer"
              title="User Account"
              id="header-user-account-btn"
            >
              <User className="w-5 h-5" />
            </button>

            {/* Cart Drawer */}
            <button
              onClick={onOpenCart}
              className="flex items-center gap-2 bg-stone-100 hover:bg-white text-stone-950 font-bold text-xs px-3.5 py-2 rounded-2xl shadow-md transition-all cursor-pointer relative"
              id="header-cart-btn"
            >
              <ShoppingBag className="w-4.5 h-4.5 text-amber-600" />
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <span className="bg-amber-600 text-white font-extrabold text-[11px] px-2 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

          </div>
        </div>

        {/* Mobile Search input */}
        <div className="px-4 pb-3 lg:hidden">
          <div className="flex items-center bg-stone-800/90 rounded-xl px-3.5 py-2 border border-stone-700">
            <Search className="w-4 h-4 text-stone-400 mr-2 shrink-0" />
            <input
              type="text"
              placeholder="Search juttis, sneakers, loafers..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="bg-transparent text-xs text-white placeholder-stone-400 focus:outline-none w-full"
              id="mobile-search-input"
            />
          </div>
        </div>
      </div>

      {/* 3. Simple, Elegant, Icon-Free Category Navigation Strip (Matches User Screenshot) */}
      <nav className="bg-[#f8f8f8] border-b border-stone-200/90 overflow-x-auto no-scrollbar shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-2 sm:gap-4 py-2.5 whitespace-nowrap text-xs">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-4 py-1.5 rounded-full transition-all duration-200 cursor-pointer text-xs ${
                  isSelected
                    ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold shadow-md shadow-amber-600/30'
                    : 'text-stone-700 font-medium hover:text-stone-950 hover:bg-stone-200/60'
                }`}
                id={`cat-nav-${cat.replace(/\s+/g, '-').toLowerCase()}`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </nav>

    </header>
  );
};
