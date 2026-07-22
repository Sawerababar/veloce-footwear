export type ShoeCategory = 
  | 'All'
  | 'Sneakers'
  | 'Ethnic Juttis'
  | 'Running & Sports'
  | 'Formal Brogues'
  | 'Casual Loafers'
  | 'Sandals & Floaters';

export interface CustomerReview {
  id: string;
  userName: string;
  location: string; // e.g. "Mumbai, MH", "Delhi, DL", "Bengaluru, KA"
  rating: number; // 1 to 5
  date: string;
  comment: string;
  verifiedPurchase: boolean;
  sizeBought: string;
  fitAssessment: 'True to Size' | 'Runs Slightly Small' | 'Runs Slightly Large';
}

export interface Product {
  id: string;
  name: string;
  category: ShoeCategory;
  price: number; // In INR (₹)
  originalPrice: number; // In INR (₹)
  discountPercent: number;
  rating: number;
  reviewCount: number;
  images: string[];
  description: string;
  material: string;
  soleMaterial: string;
  availableSizesUK: number[]; // UK sizes e.g. [6, 7, 8, 9, 10, 11]
  colors: string[];
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  isFestiveSpecial?: boolean;
  isMonsoonProof?: boolean;
  tags: string[];
  specifications: Record<string, string>;
  careInstructions: string[];
  reviews: CustomerReview[];
}

export interface CartItem {
  product: Product;
  selectedSizeUK: number;
  selectedColor: string;
  quantity: number;
}

export interface PincodeDeliveryInfo {
  pincode: string;
  city: string;
  state: string;
  isServiceable: boolean;
  estimatedDays: number;
  codAvailable: boolean;
  courierPartner: string;
}

export type PaymentMethodType = 'upi' | 'cod' | 'card' | 'netbanking' | 'paylater';

export interface ShippingAddress {
  fullName: string;
  mobile: string;
  pincode: string;
  flatAddress: string;
  areaLocality: string;
  city: string;
  state: string;
  landmark?: string;
  addressType: 'Home' | 'Work';
}

export interface OrderDetails {
  orderId: string;
  date: string;
  items: CartItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethodType;
  paymentDetails: {
    upiId?: string;
    bankName?: string;
    cardLast4?: string;
    provider?: string;
  };
  pricing: {
    subtotal: number;
    discount: number;
    gstAmount: number;
    codFee: number;
    shippingFee: number;
    totalAmount: number;
  };
  status: 'Confirmed' | 'Packed' | 'Shipped' | 'Out for Delivery' | 'Delivered';
  trackingNumber: string;
  courierName: string;
  estimatedDelivery: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedProducts?: Product[];
}

export interface StylistRecommendation {
  summary: string;
  stylingTips: string[];
  colorPalette: string[];
  recommendedCategory: ShoeCategory;
  suggestedProductIds: string[];
  occasionMatch: string;
}
