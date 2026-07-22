import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { AiStylistModal } from './components/AiStylistModal';
import { AiChatbotDrawer } from './components/AiChatbotDrawer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTrackerModal } from './components/OrderTrackerModal';
import { PincodeCheckerModal } from './components/PincodeCheckerModal';
import { AuthModal } from './components/AuthModal';
import { WishlistModal } from './components/WishlistModal';
import { Footer } from './components/Footer';
import { ShoeCategory, Product, CartItem, OrderDetails } from './types';
import { PRODUCTS } from './data/products';
import { Sparkles, MessageSquare, Filter, SlidersHorizontal, ShieldCheck, Heart, ArrowUp, MapPin } from 'lucide-react';

export default function App() {
  const [products] = useState<Product[]>(PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState<ShoeCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: PRODUCTS[0],
      selectedSizeUK: 9,
      selectedColor: PRODUCTS[0].colors[0],
      quantity: 1
    }
  ]);
  const [wishlist, setWishlist] = useState<string[]>(['prod-2']);
  const [userPincode, setUserPincode] = useState('160017'); // Default Chandigarh PIN Code

  // Modals & Drawers state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isStylistOpen, setIsStylistOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderTrackerOpen, setIsOrderTrackerOpen] = useState(false);
  const [isPincodeModalOpen, setIsPincodeModalOpen] = useState(false);

  // Checkout discount state
  const [checkoutDiscount, setCheckoutDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [ordersHistory, setOrdersHistory] = useState<OrderDetails[]>([]);

  // Filtering Products
  const filteredProducts = products.filter((p) => {
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  // Cart operations
  const handleAddToCart = (product: Product, sizeUK: number, color?: string) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (ci) => ci.product.id === product.id && ci.selectedSizeUK === sizeUK
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      }

      return [
        ...prev,
        {
          product,
          selectedSizeUK: sizeUK,
          selectedColor: color || product.colors[0] || '',
          quantity: 1
        }
      ];
    });
  };

  const handleUpdateCartQuantity = (productId: string, sizeUK: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(productId, sizeUK);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.selectedSizeUK === sizeUK
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  const handleRemoveCartItem = (productId: string, sizeUK: number) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.product.id === productId && item.selectedSizeUK === sizeUK))
    );
  };

  const handleToggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const handleProceedToCheckout = (discount: number, coupon: string) => {
    setCheckoutDiscount(discount);
    setAppliedCoupon(coupon);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderPlaced = (newOrder: OrderDetails) => {
    setOrdersHistory((prev) => [newOrder, ...prev]);
    setCartItems([]);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans flex flex-col selection:bg-amber-200 selection:text-amber-900">
      
      {/* Header */}
      <Header
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        wishlistCount={wishlist.length}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenStylist={() => setIsStylistOpen(true)}
        onOpenPincodeChecker={() => setIsPincodeModalOpen(true)}
        onOpenOrderTracker={() => setIsOrderTrackerOpen(true)}
        userPincode={userPincode}
      />

      {/* Hero Section */}
      <HeroSection
        onSelectCategory={setSelectedCategory}
        onOpenStylist={() => setIsStylistOpen(true)}
      />

      {/* Main Catalog Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Section Heading & Category Filter Count */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                <MapPin className="w-3 h-3 text-amber-600" />
                Fast Express All-India Delivery
              </span>
            </div>
            <h2 className="text-2xl font-serif font-extrabold text-stone-900 flex items-center gap-2">
              <span>{selectedCategory === 'All' ? 'All Footwear Collections' : selectedCategory}</span>
              <span className="text-xs bg-stone-200 text-stone-700 px-2.5 py-0.5 rounded-full font-mono font-bold">
                {filteredProducts.length} Items
              </span>
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Handcrafted Juttis, Performance Sneakers & Brogues • UK Sizes 6-11 • Instant UPI & Cash on Delivery
            </p>
          </div>

          {/* Quick AI Stylist Banner Callout */}
          <button
            onClick={() => setIsStylistOpen(true)}
            className="bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-2 transition-all cursor-pointer"
            id="catalog-stylist-banner"
          >
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Need outfit matching advice? Try AI SoleMate</span>
          </button>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 p-8 space-y-3">
            <Filter className="w-10 h-10 text-stone-300 mx-auto" />
            <h3 className="text-base font-bold text-stone-800">No footwear found</h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              We couldn't find any products matching your search query "{searchQuery}". Try selecting 'All' or clearing filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="bg-stone-900 text-white text-xs font-bold px-4 py-2 rounded-xl cursor-pointer"
            >
              Reset Search & Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={setSelectedProduct}
                onAddToCart={(prod, size) => handleAddToCart(prod, size)}
                isWishlisted={wishlist.includes(product.id)}
                onToggleWishlist={handleToggleWishlist}
              />
            ))}
          </div>
        )}

      </main>

      {/* Floating AI Chatbot Button */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-6 right-6 z-40 bg-stone-900 hover:bg-amber-600 text-white p-3.5 rounded-full shadow-2xl transition-all hover:scale-110 flex items-center gap-2 cursor-pointer border-2 border-amber-500/50"
        title="SoleAI Footwear Assistant"
        id="floating-ai-chat-btn"
      >
        <MessageSquare className="w-6 h-6 text-amber-400" />
        <span className="hidden sm:inline font-bold text-xs pr-1">Ask SoleAI</span>
      </button>

      {/* Modals & Drawers */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(p, size, color) => handleAddToCart(p, size, color)}
        onOpenStylist={() => setIsStylistOpen(true)}
        userPincode={userPincode}
        onUpdatePincode={setUserPincode}
      />

      <AiStylistModal
        isOpen={isStylistOpen}
        onClose={() => setIsStylistOpen(false)}
        products={products}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      <AiChatbotDrawer
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        products={products}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={handleProceedToCheckout}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        discountAmount={checkoutDiscount}
        appliedCoupon={appliedCoupon}
        onOrderPlaced={handleOrderPlaced}
        userPincode={userPincode}
      />

      <OrderTrackerModal
        isOpen={isOrderTrackerOpen}
        onClose={() => setIsOrderTrackerOpen(false)}
        orders={ordersHistory}
      />

      <PincodeCheckerModal
        isOpen={isPincodeModalOpen}
        onClose={() => setIsPincodeModalOpen(false)}
        onSetPincode={setUserPincode}
        currentPincode={userPincode}
      />

      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistIds={wishlist}
        products={products}
        onRemoveFromWishlist={handleToggleWishlist}
        onAddToCart={(p, size) => handleAddToCart(p, size)}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />

      {/* Footer */}
      <Footer
        onSelectCategory={setSelectedCategory}
        onOpenStylist={() => setIsStylistOpen(true)}
        onOpenPincodeChecker={() => setIsPincodeModalOpen(true)}
        onOpenOrderTracker={() => setIsOrderTrackerOpen(true)}
      />

    </div>
  );
}
