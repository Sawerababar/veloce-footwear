import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, ShieldCheck, Check } from 'lucide-react';
import { CartItem } from '../types';
import { POPULAR_COUPONS } from '../data/products';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, size: number, newQty: number) => void;
  onRemoveItem: (productId: string, size: number) => void;
  onProceedToCheckout: (discountAmount: number, appliedCoupon: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout
}) => {
  if (!isOpen) return null;

  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>('VELOCE10'); // Default welcome discount
  const [couponError, setCouponError] = useState('');
  const [couponSuccessMsg, setCouponSuccessMsg] = useState('Welcome offer applied: Extra 10% OFF!');

  // Calculate Subtotal
  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  // Discount calculation
  let discountAmount = 0;
  if (appliedCoupon === 'VELOCE10' || appliedCoupon === 'DESIFOOTWEAR' || appliedCoupon === 'FIRST10') {
    discountAmount = Math.min(Math.round(subtotal * 0.1), 500);
  } else if (appliedCoupon === 'UPI50' && subtotal >= 999) {
    discountAmount = 50;
  }

  // GST 5%
  const gstAmount = Math.round((subtotal - discountAmount) * 0.05);

  // Shipping (Free above ₹999)
  const shippingFee = subtotal >= 999 || items.length === 0 ? 0 : 99;

  const totalAmount = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleApplyCoupon = (codeToApply?: string) => {
    const code = (codeToApply || couponCode).trim().toUpperCase();
    if (!code) return;

    const matched = POPULAR_COUPONS.find(c => c.code === code);
    if (!matched) {
      setCouponError('Invalid coupon code. Try VELOCE10 or FIRST10');
      return;
    }

    if (code === 'UPI50' && subtotal < 999) {
      setCouponError('UPI50 requires minimum order value of ₹999');
      return;
    }

    setAppliedCoupon(code);
    setCouponError('');
    setCouponSuccessMsg(`Coupon '${code}' applied successfully!`);
    setCouponCode('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex justify-end">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-200">
        
        {/* Header */}
        <div className="p-4 bg-stone-900 text-white flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            <h3 className="font-serif font-bold text-base">Your Bag ({items.reduce((a, b) => a + b.quantity, 0)} Items)</h3>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-white p-1 rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
            id="cart-drawer-close-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 divide-y divide-stone-100">
          {items.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-16 h-16 bg-stone-100 text-stone-400 rounded-full flex items-center justify-center mx-auto">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-stone-800 text-sm">Your shopping bag is empty</h4>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Explore our Sneakers, Ethnic Juttis, and Formals to add items to your cart.
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div key={`${item.product.id}-${item.selectedSizeUK}`} className="pt-3.5 first:pt-0 flex gap-3 items-center">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-20 h-20 rounded-xl object-cover border border-stone-200 shrink-0"
                  referrerPolicy="no-referrer"
                />

                <div className="flex-1 min-w-0 space-y-1">
                  <h4 className="text-xs font-bold text-stone-900 truncate">{item.product.name}</h4>
                  <div className="text-[11px] text-stone-500 flex items-center gap-2">
                    <span className="bg-stone-100 px-1.5 py-0.5 rounded font-bold text-stone-700">UK {item.selectedSizeUK}</span>
                    {item.selectedColor && <span>{item.selectedColor}</span>}
                  </div>
                  
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs font-extrabold text-stone-900">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </span>

                    {/* Quantity Controls */}
                    <div className="flex items-center border border-stone-300 rounded-lg bg-stone-50 overflow-hidden">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.selectedSizeUK, item.quantity - 1)}
                        className="p-1 hover:bg-stone-200 text-stone-700 transition-colors cursor-pointer"
                        id={`cart-minus-${item.product.id}`}
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-bold text-stone-800">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.selectedSizeUK, item.quantity + 1)}
                        className="p-1 hover:bg-stone-200 text-stone-700 transition-colors cursor-pointer"
                        id={`cart-plus-${item.product.id}`}
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.product.id, item.selectedSizeUK)}
                      className="text-stone-400 hover:text-rose-600 p-1 cursor-pointer"
                      title="Remove"
                      id={`cart-remove-${item.product.id}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Pricing & Coupons */}
        {items.length > 0 && (
          <div className="p-4 bg-stone-50 border-t border-stone-200 space-y-3">
            {/* Coupon Code Entry */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-stone-800 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5 text-amber-600" />
                Apply Promo Coupon:
              </label>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter Code (e.g. VELOCE10)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 bg-white border border-stone-300 rounded-xl px-3 py-1.5 text-xs text-stone-800 focus:outline-none focus:border-amber-600 uppercase font-mono"
                  id="coupon-input"
                />
                <button
                  onClick={() => handleApplyCoupon()}
                  className="bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold px-3 py-1.5 rounded-xl cursor-pointer"
                  id="apply-coupon-btn"
                >
                  Apply
                </button>
              </div>

              {couponError && <p className="text-[10px] text-rose-600">{couponError}</p>}
              {appliedCoupon && couponSuccessMsg && (
                <p className="text-[10px] text-emerald-700 font-bold flex items-center gap-1">
                  <Check className="w-3 h-3" /> {couponSuccessMsg}
                </p>
              )}
            </div>

            {/* Price Breakdown Table */}
            <div className="space-y-1 text-xs text-stone-600 border-t border-stone-200 pt-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-semibold text-stone-900">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Coupon Discount ({appliedCoupon}):</span>
                  <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>GST (5% Footwear):</span>
                <span>₹{gstAmount.toLocaleString('en-IN')}</span>
              </div>

              <div className="flex justify-between">
                <span>Delivery Charge:</span>
                <span>{shippingFee === 0 ? <strong className="text-emerald-700">FREE Shipping</strong> : `₹${shippingFee}`}</span>
              </div>

              <div className="flex justify-between text-sm font-extrabold text-stone-900 pt-2 border-t border-stone-300">
                <span>Grand Total:</span>
                <span className="text-amber-700">₹{totalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => onProceedToCheckout(discountAmount, appliedCoupon || '')}
              className="w-full bg-amber-600 hover:bg-amber-500 text-white text-sm font-bold py-3 rounded-2xl shadow-lg shadow-amber-600/20 flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.01]"
              id="proceed-to-checkout-btn"
            >
              Proceed to Checkout <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-1 text-[10px] text-stone-500 text-center">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Instant UPI • RuPay Cards • Cash on Delivery Guaranteed</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
