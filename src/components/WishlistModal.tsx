import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistIds: string[];
  products: Product[];
  onRemoveFromWishlist: (id: string) => void;
  onAddToCart: (product: Product, sizeUK: number) => void;
  onSelectProduct: (product: Product) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  wishlistIds,
  products,
  onRemoveFromWishlist,
  onAddToCart,
  onSelectProduct
}) => {
  if (!isOpen) return null;

  const wishlistedProducts = products.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden shadow-2xl border border-stone-100">
        {/* Header */}
        <div className="bg-stone-900 text-white p-5 flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-rose-500/20 text-rose-400 rounded-xl">
              <Heart className="w-5 h-5 fill-rose-400" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base">Your Liked Shoes ({wishlistedProducts.length})</h3>
              <p className="text-[10px] text-stone-300">Saved footwear ready to order with fast All-India delivery</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-white p-1 rounded-full transition-colors cursor-pointer"
            id="wishlist-close-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {wishlistedProducts.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <Heart className="w-12 h-12 text-stone-300 mx-auto" />
              <h4 className="text-base font-bold text-stone-800">Your wishlist is empty</h4>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Explore our catalog and click the heart icon on any pair of shoes to save them here!
              </p>
              <button
                onClick={onClose}
                className="bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl cursor-pointer"
              >
                Explore Footwear Collection
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {wishlistedProducts.map((product) => {
                const defaultSize = product.availableSizesUK[0] || 8;
                return (
                  <div
                    key={product.id}
                    className="bg-stone-50 border border-stone-200 rounded-2xl p-3 flex gap-3 items-center group relative hover:border-amber-400 transition-all"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded-xl border border-stone-200 cursor-pointer"
                      onClick={() => {
                        onSelectProduct(product);
                        onClose();
                      }}
                    />

                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] text-amber-700 font-bold uppercase tracking-wider">
                        {product.category}
                      </span>
                      <h5
                        className="text-xs font-bold text-stone-900 truncate cursor-pointer hover:text-amber-600"
                        onClick={() => {
                          onSelectProduct(product);
                          onClose();
                        }}
                      >
                        {product.name}
                      </h5>
                      <p className="text-xs font-extrabold text-stone-900 mt-0.5">
                        ₹{product.price.toLocaleString('en-IN')}
                        <span className="text-[10px] text-stone-400 line-through ml-1.5 font-normal">
                          ₹{product.originalPrice.toLocaleString('en-IN')}
                        </span>
                      </p>

                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => {
                            onAddToCart(product, defaultSize);
                            onClose();
                          }}
                          className="bg-stone-900 hover:bg-amber-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 cursor-pointer transition-colors"
                          id={`wishlist-add-cart-${product.id}`}
                        >
                          <ShoppingBag className="w-3 h-3 text-amber-400" />
                          <span>Add to Cart</span>
                        </button>

                        <button
                          onClick={() => onRemoveFromWishlist(product.id)}
                          className="p-1 text-stone-400 hover:text-rose-600 transition-colors cursor-pointer"
                          title="Remove from Wishlist"
                          id={`wishlist-remove-${product.id}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {wishlistedProducts.length > 0 && (
          <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-between items-center text-xs">
            <span className="text-stone-500 font-medium">
              Free Express Delivery on all orders above ₹999
            </span>
            <button
              onClick={onClose}
              className="bg-stone-900 text-white font-bold px-4 py-2 rounded-xl hover:bg-stone-800 cursor-pointer"
            >
              Back to Catalog
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
