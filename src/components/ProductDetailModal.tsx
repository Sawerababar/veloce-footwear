import React, { useState } from 'react';
import { X, Star, ShoppingBag, Truck, MapPin, ShieldCheck, RotateCcw, Check, Heart, Sparkles, ChevronRight, Layers, Info } from 'lucide-react';
import { Product, PincodeDeliveryInfo } from '../types';
import { INDIAN_SIZE_CHART, SAMPLE_PINCODES } from '../data/products';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: number, color: string) => void;
  onOpenStylist: () => void;
  userPincode: string;
  onUpdatePincode: (pin: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onOpenStylist,
  userPincode,
  onUpdatePincode
}) => {
  if (!product) return null;

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<number>(product.availableSizesUK[0] || 8);
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0] || '');
  const [pincodeInput, setPincodeInput] = useState<string>(userPincode || '');
  const [pincodeResult, setPincodeResult] = useState<PincodeDeliveryInfo | null>(
    userPincode ? (SAMPLE_PINCODES[userPincode] || {
      pincode: userPincode,
      city: 'Chandigarh Area',
      state: 'Union Territory',
      isServiceable: true,
      estimatedDays: 1,
      codAvailable: true,
      courierPartner: 'Express Courier'
    }) : SAMPLE_PINCODES['160017']
  );
  const [pincodeError, setPincodeError] = useState<string>('');
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'care' | 'reviews'>('details');

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(pincodeInput)) {
      setPincodeError('Please enter a valid 6-digit PIN code');
      setPincodeResult(null);
      return;
    }
    setPincodeError('');
    onUpdatePincode(pincodeInput);
    if (SAMPLE_PINCODES[pincodeInput]) {
      setPincodeResult(SAMPLE_PINCODES[pincodeInput]);
    } else {
      setPincodeResult({
        pincode: pincodeInput,
        city: 'Your City',
        state: 'Service Region',
        isServiceable: true,
        estimatedDays: 2,
        codAvailable: true,
        courierPartner: 'Express Logistics'
      });
    }
  };

  const handleAddToCart = () => {
    onAddToCart(product, selectedSize, selectedColor);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden border border-stone-200 my-auto relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-stone-100 hover:bg-stone-200 text-stone-700 p-2 rounded-full transition-colors cursor-pointer"
          id="product-detail-close-btn"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[90vh] overflow-y-auto">
          
          {/* Left Column - Gallery */}
          <div className="md:col-span-6 bg-stone-100 p-4 sm:p-6 flex flex-col justify-between">
            <div>
              {/* Main Image Container */}
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-white border border-stone-200 shadow-xs mb-4">
                <img
                  src={product.images[selectedImageIndex] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />

                <div className="absolute top-3 left-3 bg-stone-900/80 text-white text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-md">
                  View {selectedImageIndex + 1} of {product.images.length}
                </div>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                      selectedImageIndex === idx ? 'border-amber-600 ring-2 ring-amber-600/30' : 'border-stone-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            </div>

            {/* AI Stylist Callout */}
            <div className="mt-6 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-amber-600 text-white rounded-xl flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900">Not sure what to wear with this?</h4>
                  <p className="text-[11px] text-stone-600">Ask our AI Stylist for wedding & casual outfit matching!</p>
                </div>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onOpenStylist();
                }}
                className="bg-stone-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-amber-600 transition-colors shrink-0 cursor-pointer"
                id="detail-ask-stylist-btn"
              >
                Match Outfit
              </button>
            </div>
          </div>

          {/* Right Column - Product Information & Buy Flow */}
          <div className="md:col-span-6 p-6 space-y-5 flex flex-col justify-between">
            <div>
              {/* Header Info */}
              <div className="flex items-center gap-2 text-xs text-amber-800 font-bold uppercase tracking-wider">
                <span>{product.category}</span>
                <span>•</span>
                <span>100% Authentic Handcrafted</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-serif font-extrabold text-stone-900 mt-1">
                {product.name}
              </h2>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-2 mt-2 text-xs">
                <div className="flex items-center text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-stone-300'}`}
                    />
                  ))}
                </div>
                <span className="font-bold text-stone-800">{product.rating}</span>
                <span className="text-stone-400">({product.reviewCount} customer reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 my-3">
                <span className="text-2xl font-extrabold text-stone-900">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-sm text-stone-400 line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                <span className="bg-rose-100 text-rose-800 text-xs font-extrabold px-2 py-0.5 rounded-full">
                  {product.discountPercent}% OFF
                </span>
              </div>

              {/* Color Selector */}
              {product.colors.length > 0 && (
                <div className="space-y-1.5 my-3">
                  <label className="text-xs font-bold text-stone-700">
                    Color Finish: <span className="text-stone-900 font-normal">{selectedColor}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`text-xs px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                          selectedColor === color
                            ? 'border-amber-600 bg-amber-50 text-amber-900 font-bold'
                            : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* UK/India Size Selector */}
              <div className="space-y-2 my-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-stone-900">Select UK / India Size:</span>
                  <button
                    onClick={() => setShowSizeGuide(!showSizeGuide)}
                    className="text-amber-700 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                    id="size-guide-toggle-btn"
                  >
                    <Info className="w-3.5 h-3.5" /> Size Guide & CM Chart
                  </button>
                </div>

                <div className="grid grid-cols-6 gap-2">
                  {product.availableSizesUK.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 rounded-xl text-xs font-extrabold border transition-all cursor-pointer ${
                        selectedSize === size
                          ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                          : 'bg-stone-50 text-stone-800 border-stone-200 hover:bg-stone-100'
                      }`}
                      id={`detail-size-btn-${size}`}
                    >
                      UK {size}
                    </button>
                  ))}
                </div>

                {/* Size Guide Chart Overlay */}
                {showSizeGuide && (
                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs mt-2 space-y-2 animate-in fade-in">
                    <h5 className="font-bold text-stone-900 text-[11px] uppercase">Indian Standard Shoe Size Chart</h5>
                    <div className="overflow-x-auto">
                      <table className="w-full text-[11px] text-left border-collapse">
                        <thead>
                          <tr className="border-b border-stone-200 text-stone-500 font-bold">
                            <th className="py-1">UK/India</th>
                            <th className="py-1">US</th>
                            <th className="py-1">EU</th>
                            <th className="py-1">Foot Length (cm)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {INDIAN_SIZE_CHART.map((row) => (
                            <tr key={row.uk} className={`border-b border-stone-100 ${row.uk === selectedSize ? 'bg-amber-100/60 font-bold text-amber-900' : ''}`}>
                              <td className="py-1">UK {row.uk}</td>
                              <td className="py-1">{row.us}</td>
                              <td className="py-1">{row.eu}</td>
                              <td className="py-1">{row.footCM} cm</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>

              {/* PIN Code Delivery Checker */}
              <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200 space-y-2 my-4">
                <div className="flex items-center gap-1.5 text-xs font-bold text-stone-900">
                  <MapPin className="w-4 h-4 text-amber-600" />
                  <span>Check Delivery Date & COD Availability</span>
                </div>

                <form onSubmit={handlePincodeCheck} className="flex gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="Enter 6-digit PIN code (e.g. 110001, 400001)"
                    value={pincodeInput}
                    onChange={(e) => setPincodeInput(e.target.value.replace(/\D/g, ''))}
                    className="flex-1 bg-white border border-stone-300 rounded-xl px-3 py-1.5 text-xs text-stone-800 focus:outline-none focus:border-amber-600"
                    id="pincode-check-input"
                  />
                  <button
                    type="submit"
                    className="bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold px-3 py-1.5 rounded-xl cursor-pointer"
                    id="pincode-check-submit"
                  >
                    Check
                  </button>
                </form>

                {pincodeError && <p className="text-[11px] text-rose-600 font-medium">{pincodeError}</p>}

                {pincodeResult && (
                  <div className="text-xs space-y-1 text-stone-700 pt-1 border-t border-stone-200">
                    <p className="font-semibold text-emerald-800 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      Serviceable in {pincodeResult.city}, {pincodeResult.state} ({pincodeResult.pincode})
                    </p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-stone-600">
                      <span>• Delivery in <strong>{pincodeResult.estimatedDays} Business Days</strong></span>
                      <span>• Courier: <strong>{pincodeResult.courierPartner}</strong></span>
                      <span>• COD: <strong className="text-emerald-700">Available</strong></span>
                    </div>
                  </div>
                )}
              </div>

              {/* Tabs: Description / Care / Reviews */}
              <div className="border-t border-stone-200 pt-3">
                <div className="flex border-b border-stone-200 text-xs font-bold text-stone-500">
                  <button
                    onClick={() => setActiveTab('details')}
                    className={`pb-2 mr-4 transition-colors cursor-pointer ${activeTab === 'details' ? 'border-b-2 border-amber-600 text-amber-800' : ''}`}
                  >
                    Description & Craft
                  </button>
                  <button
                    onClick={() => setActiveTab('care')}
                    className={`pb-2 mr-4 transition-colors cursor-pointer ${activeTab === 'care' ? 'border-b-2 border-amber-600 text-amber-800' : ''}`}
                  >
                    Care Guide
                  </button>
                  <button
                    onClick={() => setActiveTab('reviews')}
                    className={`pb-2 transition-colors cursor-pointer ${activeTab === 'reviews' ? 'border-b-2 border-amber-600 text-amber-800' : ''}`}
                  >
                    Reviews ({product.reviews.length})
                  </button>
                </div>

                <div className="py-3 text-xs text-stone-600 leading-relaxed max-h-32 overflow-y-auto">
                  {activeTab === 'details' && (
                    <div className="space-y-2">
                      <p>{product.description}</p>
                      <div className="grid grid-cols-2 gap-2 text-[11px] bg-stone-50 p-2 rounded-xl">
                        <div><strong className="text-stone-800">Upper:</strong> {product.material}</div>
                        <div><strong className="text-stone-800">Sole:</strong> {product.soleMaterial}</div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'care' && (
                    <ul className="list-disc list-inside space-y-1">
                      {product.careInstructions.map((inst, i) => (
                        <li key={i}>{inst}</li>
                      ))}
                    </ul>
                  )}

                  {activeTab === 'reviews' && (
                    <div className="space-y-2">
                      {product.reviews.map((rev) => (
                        <div key={rev.id} className="bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                          <div className="flex items-center justify-between font-bold text-stone-900 text-[11px]">
                            <span>{rev.userName} ({rev.location})</span>
                            <span className="text-amber-600">★ {rev.rating}/5</span>
                          </div>
                          <p className="text-[11px] text-stone-600 mt-1">"{rev.comment}"</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sticky Action Button */}
            <div className="pt-3 border-t border-stone-200">
              <button
                onClick={handleAddToCart}
                className={`w-full py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer ${
                  addedSuccess
                    ? 'bg-emerald-600 text-white'
                    : 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-600/30'
                }`}
                id="detail-add-to-cart-btn"
              >
                {addedSuccess ? (
                  <>
                    <Check className="w-5 h-5 text-emerald-200" />
                    Added to Your Bag!
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-amber-200" />
                    Add to Cart • UK {selectedSize} (₹{product.price.toLocaleString('en-IN')})
                  </>
                )}
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
