import React, { useState } from 'react';
import { Star, Heart, ShoppingBag, Check, Sparkles, Truck, Tag } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, selectedSize: number) => void;
  isWishlisted?: boolean;
  onToggleWishlist?: (productId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  onAddToCart,
  isWishlisted = false,
  onToggleWishlist
}) => {
  const [selectedSize, setSelectedSize] = useState<number>(product.availableSizesUK[0] || 8);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedSize);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  return (
    <div 
      onClick={() => onQuickView(product)}
      className="bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-xl hover:border-amber-500/40 transition-all duration-300 flex flex-col group cursor-pointer relative"
      id={`product-card-${product.id}`}
    >
      {/* Badges Overlay */}
      <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-1.5 max-w-[80%]">
        {product.discountPercent > 0 && (
          <span className="bg-rose-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md shadow-xs">
            {product.discountPercent}% OFF
          </span>
        )}
        {product.isBestSeller && (
          <span className="bg-amber-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md shadow-xs">
            Bestseller
          </span>
        )}
        {product.isFestiveSpecial && (
          <span className="bg-purple-700 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md shadow-xs">
            Wedding
          </span>
        )}
        {product.isMonsoonProof && (
          <span className="bg-sky-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md shadow-xs">
            Rain Proof
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          if (onToggleWishlist) onToggleWishlist(product.id);
        }}
        className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-md transition-all cursor-pointer ${
          isWishlisted ? 'bg-rose-50 text-rose-600' : 'bg-white/80 text-stone-500 hover:text-rose-600 hover:bg-white'
        }`}
        title="Wishlist"
        id={`wishlist-toggle-${product.id}`}
      >
        <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-600' : ''}`} />
      </button>

      {/* Product Image */}
      <div className="relative aspect-4/3 bg-stone-100 overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-stone-900/5 group-hover:bg-transparent transition-colors" />
      </div>

      {/* Content Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
            <span className="font-medium text-amber-700 uppercase tracking-wider text-[11px]">
              {product.category}
            </span>
            <div className="flex items-center gap-1 font-semibold text-stone-700">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              <span className="text-stone-400 text-[10px]">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 className="text-sm font-bold text-stone-900 group-hover:text-amber-700 transition-colors line-clamp-1">
            {product.name}
          </h3>

          <p className="text-xs text-stone-500 line-clamp-1 mt-0.5">
            {product.material}
          </p>

          {/* Price */}
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-base font-extrabold text-stone-900">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-stone-400 line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
            <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
              Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Quick Size Select & Add Button */}
        <div className="pt-2 border-t border-stone-100 space-y-2" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between text-[11px] text-stone-500">
            <span className="font-medium">UK Size:</span>
            <div className="flex gap-1 overflow-x-auto no-scrollbar">
              {product.availableSizesUK.slice(0, 5).map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`w-6 h-6 rounded text-[10px] font-bold transition-all cursor-pointer ${
                    selectedSize === size
                      ? 'bg-amber-600 text-white'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                  id={`size-btn-${product.id}-${size}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className={`w-full py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
              addedAnimation
                ? 'bg-emerald-600 text-white'
                : 'bg-stone-900 hover:bg-stone-800 text-white shadow-xs'
            }`}
            id={`add-to-cart-${product.id}`}
          >
            {addedAnimation ? (
              <>
                <Check className="w-4 h-4 text-emerald-200" />
                Added to Cart
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
                Add to Cart (UK {selectedSize})
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
