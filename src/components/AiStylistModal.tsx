import React, { useState } from 'react';
import { X, Sparkles, Shirt, Palette, Calendar, ArrowRight, Check, RefreshCw } from 'lucide-react';
import { Product, StylistRecommendation } from '../types';

interface AiStylistModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const AiStylistModal: React.FC<AiStylistModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct
}) => {
  if (!isOpen) return null;

  const [outfitDescription, setOutfitDescription] = useState('');
  const [occasion, setOccasion] = useState('Wedding / Festive');
  const [colorTone, setColorTone] = useState('Gold / Earthy');
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<StylistRecommendation | null>(null);
  const [error, setError] = useState('');

  const occasions = [
    'Wedding / Sangeet / Festive',
    'College / Streetwear Casual',
    'Corporate / Formal Boardroom',
    'Marathon / Morning Run & Gym',
    'Weekend Getaway & Sundowner'
  ];

  const colorPresets = [
    'Maroon & Gold Royal',
    'Navy Blue & Charcoal',
    'Black & White Streetwear',
    'Pastel Beige & Cream',
    'Bright Neon / Vibrant'
  ];

  const handleGetRecommendation = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/stylist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          outfit: outfitDescription || `Standard outfit for ${occasion}`,
          occasion,
          colorTone,
          products: products.map(p => ({
            id: p.id,
            name: p.name,
            category: p.category,
            material: p.material,
            colors: p.colors,
            tags: p.tags
          }))
        })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch styling guidance');
      }

      const data: StylistRecommendation = await response.json();
      setRecommendation(data);
    } catch (err: any) {
      console.error('Stylist Error:', err);
      // Fallback local styling logic if network/API fails
      const matched = products.filter(p => {
        if (occasion.includes('Wedding')) return p.category === 'Ethnic Juttis';
        if (occasion.includes('College')) return p.category === 'Sneakers';
        if (occasion.includes('Corporate')) return p.category === 'Formal Brogues';
        if (occasion.includes('Marathon')) return p.category === 'Running & Sports';
        return p.category === 'Casual Loafers';
      });

      setRecommendation({
        summary: `For your ${occasion} outfit in ${colorTone} accents, pairing with structured Indian footwear will add royal sophistication and contrast.`,
        stylingTips: [
          'Match the metal undertones (Gold zardozi with warm kurta fabrics).',
          'Keep shoe polish or velvet finish crisp and clean.',
          'Choose cushioned soles for multi-hour standing at festivities.'
        ],
        colorPalette: [colorTone, 'Warm Gold', 'Rich Chestnut'],
        recommendedCategory: matched[0]?.category || 'Ethnic Juttis',
        suggestedProductIds: matched.map(p => p.id),
        occasionMatch: occasion
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden border border-stone-200 my-auto relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-stone-900 via-stone-850 to-stone-950 p-5 text-white flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-amber-500 to-orange-500 rounded-xl flex items-center justify-center text-stone-950 shadow-md">
              <Sparkles className="w-6 h-6 fill-current animate-pulse" />
            </div>
            <div>
              <h3 className="text-lg font-serif font-bold">AI SoleMate • Shoe & Outfit Stylist</h3>
              <p className="text-xs text-stone-300">Powered by Gemini AI for Fashion & Special Occasions</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-stone-400 hover:text-white p-1.5 rounded-full hover:bg-stone-800 transition-colors cursor-pointer"
            id="stylist-close-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Input Form */}
          <form onSubmit={handleGetRecommendation} className="space-y-4">
            {/* Occasion Selection */}
            <div>
              <label className="text-xs font-bold text-stone-800 flex items-center gap-1.5 mb-2">
                <Calendar className="w-4 h-4 text-amber-600" />
                Select Event or Occasion:
              </label>
              <div className="flex flex-wrap gap-2">
                {occasions.map((occ) => (
                  <button
                    key={occ}
                    type="button"
                    onClick={() => setOccasion(occ)}
                    className={`text-xs px-3 py-1.5 rounded-xl border font-semibold transition-all cursor-pointer ${
                      occasion === occ
                        ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                        : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    {occ}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Outfit Description */}
            <div>
              <label className="text-xs font-bold text-stone-800 flex items-center gap-1.5 mb-1">
                <Shirt className="w-4 h-4 text-amber-600" />
                Describe Your Outfit (Optional):
              </label>
              <input
                type="text"
                placeholder="e.g. Silk Maroon Kurta with Gold Dupatta, or Dark Navy Suit with Brown Belt"
                value={outfitDescription}
                onChange={(e) => setOutfitDescription(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-800 focus:outline-none focus:border-amber-600 focus:bg-white transition-all"
                id="stylist-outfit-input"
              />
            </div>

            {/* Color Tone Presets */}
            <div>
              <label className="text-xs font-bold text-stone-800 flex items-center gap-1.5 mb-2">
                <Palette className="w-4 h-4 text-amber-600" />
                Outfit Color Theme:
              </label>
              <div className="flex flex-wrap gap-2">
                {colorPresets.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setColorTone(preset)}
                    className={`text-xs px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                      colorTone === preset
                        ? 'bg-stone-900 text-amber-400 font-bold border-stone-900'
                        : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold text-xs py-3 rounded-2xl shadow-lg shadow-amber-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
              id="stylist-submit-btn"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Styling Your Footwear with Gemini AI...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-200" />
                  Generate AI Style & Shoe Match
                </>
              )}
            </button>
          </form>

          {/* AI Output Section */}
          {recommendation && (
            <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-5 space-y-4 animate-in fade-in">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>AI Stylist Advice</span>
              </div>

              <p className="text-xs text-stone-800 leading-relaxed font-medium">
                {recommendation.summary}
              </p>

              {/* Styling Tips */}
              <div>
                <h5 className="text-xs font-bold text-stone-900 mb-1.5">Pro Styling Tips:</h5>
                <ul className="space-y-1 text-xs text-stone-700">
                  {recommendation.stylingTips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-600 font-bold">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recommended Shoes Cards */}
              <div>
                <h5 className="text-xs font-bold text-stone-900 mb-2">Recommended Matching Footwear:</h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {products
                    .filter(p => recommendation.suggestedProductIds.includes(p.id))
                    .slice(0, 2)
                    .map((p) => (
                      <div
                        key={p.id}
                        onClick={() => {
                          onClose();
                          onSelectProduct(p);
                        }}
                        className="bg-white p-3 rounded-xl border border-stone-200 hover:border-amber-500 shadow-xs flex items-center gap-3 cursor-pointer transition-all"
                      >
                        <img src={p.images[0]} alt={p.name} className="w-14 h-14 rounded-lg object-cover" referrerPolicy="no-referrer" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-stone-900 truncate">{p.name}</p>
                          <p className="text-[11px] text-amber-700 font-extrabold mt-0.5">₹{p.price.toLocaleString('en-IN')}</p>
                          <span className="text-[10px] text-stone-500 bg-stone-100 px-1.5 py-0.5 rounded">
                            {p.category}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
