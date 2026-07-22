import React from 'react';
import { 
  ShieldCheck, Truck, RotateCcw, Sparkles, MapPin, Phone, Mail, 
  Footprints, Lock, Smartphone, CreditCard, Building2, Banknote, 
  Clock, MessageCircle, Ruler, Headphones, CheckCircle2, HelpCircle
} from 'lucide-react';
import { ShoeCategory } from '../types';

interface FooterProps {
  onSelectCategory: (cat: ShoeCategory) => void;
  onOpenStylist: () => void;
  onOpenPincodeChecker: () => void;
  onOpenOrderTracker: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenStylist,
  onOpenPincodeChecker,
  onOpenOrderTracker
}) => {
  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800 text-xs">
      
      {/* Top Value Proposition Strip */}
      <div className="border-b border-stone-800 bg-stone-900/80 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <ShieldCheck className="w-6 h-6 text-amber-500 mx-auto" />
            <h5 className="font-bold text-white text-xs">100% Handcrafted & Genuine</h5>
            <p className="text-[11px] text-stone-400">Authentic artisan & premium footwear</p>
          </div>
          <div className="space-y-1">
            <Truck className="w-6 h-6 text-sky-400 mx-auto" />
            <h5 className="font-bold text-white text-xs">Free Express All-India Shipping</h5>
            <p className="text-[11px] text-stone-400">Fast delivery across 25,000+ PIN codes</p>
          </div>
          <div className="space-y-1">
            <RotateCcw className="w-6 h-6 text-purple-400 mx-auto" />
            <h5 className="font-bold text-white text-xs">14-Day Easy Size Exchange</h5>
            <p className="text-[11px] text-stone-400">Hassle-free doorstep returns & swaps</p>
          </div>
          <div className="space-y-1">
            <Lock className="w-6 h-6 text-emerald-400 mx-auto" />
            <h5 className="font-bold text-white text-xs">100% Secure Payments</h5>
            <p className="text-[11px] text-stone-400">256-Bit Encrypted UPI, Cards & COD</p>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Brand Overview */}
        <div className="md:col-span-4 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-br from-amber-500 to-orange-600 text-stone-950 rounded-xl flex items-center justify-center shadow-md">
              <Footprints className="w-5 h-5" />
            </div>
            <span className="font-serif text-xl font-bold text-white tracking-wide">VELOCE</span>
          </div>

          <p className="text-stone-400 leading-relaxed text-xs">
            Your destination for premium handcrafted ethnic juttis, performance sneakers, formal brogues, and driving loafers. Delivering stylish, durable footwear nationwide with AI styling assistance.
          </p>

          <div className="pt-2 text-stone-400 space-y-2 text-xs">
            <p className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Chandigarh Hub • Express All-India Logistics</span>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Customer Helpline: <strong>+91 98765 43210</strong></span>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Email Support: <strong>support@velocefootwear.in</strong></span>
            </p>
          </div>
        </div>

        {/* Collections */}
        <div className="md:col-span-2 space-y-3">
          <h5 className="font-bold text-white text-xs uppercase tracking-wider border-b border-stone-800 pb-1.5">
            Collections
          </h5>
          <ul className="space-y-2 text-stone-400">
            <li>
              <button 
                onClick={() => {
                  onSelectCategory('Sneakers');
                  document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
                }} 
                className="hover:text-amber-400 transition-colors cursor-pointer"
              >
                Sneakers
              </button>
            </li>
            <li>
              <button 
                onClick={() => {
                  onSelectCategory('Ethnic Juttis');
                  document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
                }} 
                className="hover:text-amber-400 transition-colors cursor-pointer"
              >
                Ethnic Juttis
              </button>
            </li>
            <li>
              <button 
                onClick={() => {
                  onSelectCategory('Running & Sports');
                  document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
                }} 
                className="hover:text-amber-400 transition-colors cursor-pointer"
              >
                Sports & Running
              </button>
            </li>
            <li>
              <button 
                onClick={() => {
                  onSelectCategory('Formal Brogues');
                  document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
                }} 
                className="hover:text-amber-400 transition-colors cursor-pointer"
              >
                Formal Brogues
              </button>
            </li>
            <li>
              <button 
                onClick={() => {
                  onSelectCategory('Casual Loafers');
                  document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
                }} 
                className="hover:text-amber-400 transition-colors cursor-pointer"
              >
                Casual Loafers
              </button>
            </li>
            <li>
              <button 
                onClick={() => {
                  onSelectCategory('Sandals & Floaters');
                  document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
                }} 
                className="hover:text-amber-400 transition-colors cursor-pointer"
              >
                Sandals & Floaters
              </button>
            </li>
          </ul>
        </div>

        {/* 🌟 Redesigned Aesthetic Customer Care Section List */}
        <div className="md:col-span-3 space-y-3">
          <div className="flex items-center justify-between border-b border-stone-800 pb-1.5">
            <h5 className="font-bold text-white text-xs uppercase tracking-wider flex items-center gap-1.5">
              <Headphones className="w-3.5 h-3.5 text-amber-400" /> Customer Care
            </h5>
            <span className="text-[9px] bg-emerald-950 text-emerald-300 border border-emerald-500/30 px-1.5 py-0.2 rounded font-mono font-bold">
              24/7 SUPPORT
            </span>
          </div>

          <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-3.5 space-y-2.5">
            <ul className="space-y-2.5 divide-y divide-stone-800/80">
              
              <li className="pt-1 flex items-start gap-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="font-bold text-white hover:text-emerald-300 text-xs block">
                    WhatsApp Helpline
                  </a>
                  <p className="text-[10px] text-stone-400">Instant chat & size consultation (under 15 mins)</p>
                </div>
              </li>

              <li className="pt-2 flex items-start gap-2.5">
                <Truck className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <button onClick={onOpenOrderTracker} className="font-bold text-white hover:text-sky-300 text-xs text-left block cursor-pointer">
                    Track Order & Logistics
                  </button>
                  <p className="text-[10px] text-stone-400">Live BlueDart & Express Air status</p>
                </div>
              </li>

              <li className="pt-2 flex items-start gap-2.5">
                <RotateCcw className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <div>
                  <button onClick={onOpenPincodeChecker} className="font-bold text-white hover:text-purple-300 text-xs text-left block cursor-pointer">
                    14-Day Easy Exchange
                  </button>
                  <p className="text-[10px] text-stone-400">Free doorstep size replacement</p>
                </div>
              </li>

              <li className="pt-2 flex items-start gap-2.5">
                <Ruler className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <button onClick={onOpenPincodeChecker} className="font-bold text-white hover:text-amber-300 text-xs text-left block cursor-pointer">
                    UK 6 - 11 Size Guide
                  </button>
                  <p className="text-[10px] text-stone-400">Foot width & width measurement chart</p>
                </div>
              </li>

            </ul>
          </div>
        </div>

        {/* Accepted Payment Methods Section */}
        <div className="md:col-span-3 space-y-3">
          <div className="flex items-center justify-between border-b border-stone-800 pb-1.5">
            <h5 className="font-bold text-white text-xs uppercase tracking-wider">
              Payments
            </h5>
            <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
              <Lock className="w-3 h-3" /> Encrypted
            </span>
          </div>

          <p className="text-stone-400 text-[11px]">
            Direct secure payment links for major Indian portals:
          </p>

          {/* Payment Badges Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <a href="https://paytm.com" target="_blank" rel="noreferrer" className="bg-stone-900 border border-stone-800 rounded-xl p-2 flex items-center gap-2 hover:border-amber-500/50 transition-colors">
              <Smartphone className="w-4 h-4 text-sky-400 shrink-0" />
              <div>
                <span className="font-bold text-white text-[11px] block">Paytm</span>
                <span className="text-[9px] text-stone-400">Direct Link</span>
              </div>
            </a>

            <a href="https://pay.google.com" target="_blank" rel="noreferrer" className="bg-stone-900 border border-stone-800 rounded-xl p-2 flex items-center gap-2 hover:border-amber-500/50 transition-colors">
              <Smartphone className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <span className="font-bold text-white text-[11px] block">Google Pay</span>
                <span className="text-[9px] text-stone-400">Direct Link</span>
              </div>
            </a>

            <a href="https://www.phonepe.com" target="_blank" rel="noreferrer" className="bg-stone-900 border border-stone-800 rounded-xl p-2 flex items-center gap-2 hover:border-amber-500/50 transition-colors">
              <Smartphone className="w-4 h-4 text-purple-400 shrink-0" />
              <div>
                <span className="font-bold text-white text-[11px] block">PhonePe</span>
                <span className="text-[9px] text-stone-400">Direct Link</span>
              </div>
            </a>

            <a href="https://netbanking.hdfcbank.com" target="_blank" rel="noreferrer" className="bg-stone-900 border border-stone-800 rounded-xl p-2 flex items-center gap-2 hover:border-amber-500/50 transition-colors">
              <Building2 className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <span className="font-bold text-white text-[11px] block">NetBanking</span>
                <span className="text-[9px] text-stone-400">10+ Banks</span>
              </div>
            </a>

            <div className="col-span-2 bg-stone-900 border border-amber-600/30 rounded-xl p-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Banknote className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-bold text-white text-[11px]">Cash on Delivery</span>
              </div>
              <span className="bg-amber-500/20 text-amber-400 text-[9px] font-bold px-2 py-0.5 rounded-full">
                All-India
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-stone-900 py-4 px-4 sm:px-6 text-center text-stone-500 text-[11px]">
        <p>© 2026 Veloce Footwear. All rights reserved. Premium handcrafted & performance footwear delivered across India.</p>
      </div>
    </footer>
  );
};
