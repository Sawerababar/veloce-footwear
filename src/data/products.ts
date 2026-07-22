import { Product, PincodeDeliveryInfo } from '../types';

export const INDIAN_SIZE_CHART = [
  { uk: 6, us: 7, eu: 39, footCM: 24.5 },
  { uk: 7, us: 8, eu: 40.5, footCM: 25.4 },
  { uk: 8, us: 9, eu: 42, footCM: 26.2 },
  { uk: 9, us: 10, eu: 43, footCM: 27.1 },
  { uk: 10, us: 11, eu: 44.5, footCM: 27.9 },
  { uk: 11, us: 12, eu: 46, footCM: 28.8 },
];

export const SAMPLE_PINCODES: Record<string, PincodeDeliveryInfo> = {
  '160017': { pincode: '160017', city: 'Chandigarh', state: 'Chandigarh (UT)', isServiceable: true, estimatedDays: 1, codAvailable: true, courierPartner: 'Express Air Courier' },
  '160001': { pincode: '160001', city: 'Chandigarh Sector 1-11', state: 'Chandigarh (UT)', isServiceable: true, estimatedDays: 1, codAvailable: true, courierPartner: 'Express Air Courier' },
  '160022': { pincode: '160022', city: 'Chandigarh Sector 22', state: 'Chandigarh (UT)', isServiceable: true, estimatedDays: 1, codAvailable: true, courierPartner: 'Express Air Courier' },
  '110001': { pincode: '110001', city: 'New Delhi', state: 'Delhi', isServiceable: true, estimatedDays: 2, codAvailable: true, courierPartner: 'BlueDart Express' },
  '400001': { pincode: '400001', city: 'Mumbai', state: 'Maharashtra', isServiceable: true, estimatedDays: 2, codAvailable: true, courierPartner: 'Delhivery Surface' },
  '560001': { pincode: '560001', city: 'Bengaluru', state: 'Karnataka', isServiceable: true, estimatedDays: 2, codAvailable: true, courierPartner: 'Expressbees Air' },
  '302001': { pincode: '302001', city: 'Jaipur', state: 'Rajasthan', isServiceable: true, estimatedDays: 2, codAvailable: true, courierPartner: 'BlueDart' },
  '141001': { pincode: '141001', city: 'Ludhiana', state: 'Punjab', isServiceable: true, estimatedDays: 1, codAvailable: true, courierPartner: 'Delhivery Air' },
};

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: "AirSole '90 Heritage Street High-Tops",
    category: 'Sneakers',
    price: 4999,
    originalPrice: 6999,
    discountPercent: 28,
    rating: 4.8,
    reviewCount: 342,
    images: [
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800',
    ],
    description: "Designed for vibrant urban street style. Crafted with breathable full-grain leather, padded collar support, and high-grip rubber outsoles engineered for all-weather traction and everyday hustle.",
    material: "Full-Grain Synthetic Leather & Mesh",
    soleMaterial: "Phylon Cushioning & High-Traction Rubber",
    availableSizesUK: [6, 7, 8, 9, 10, 11],
    colors: ['Obsidian Black & Crimson', 'Pure Chalk White', 'Royal Navy'],
    isBestSeller: true,
    isNewArrival: false,
    tags: ['Streetwear', 'High-Top', 'Bestseller', 'College Favorite'],
    specifications: {
      'Closure': 'Lace-Up with Ankle Strap',
      'Weight': '380g per shoe (Size UK 8)',
      'Water Resistance': 'Splash Resistant',
      'Craftsmanship': 'Precision Stitched',
      'Ideal For': 'Casual Outings, Street Fashion, Daily Wear'
    },
    careInstructions: [
      'Wipe clean with a damp cotton cloth after wear',
      'Air dry naturally in shade; do not leave in direct sunlight',
      'Use white sneaker cleaner solution for midsoles'
    ],
    reviews: [
      {
        id: 'rev-1',
        userName: 'Aarav Sharma',
        location: 'Chandigarh Sector 17',
        rating: 5,
        date: '12 July 2026',
        comment: 'Absurdly comfortable! Wore them around Elante Mall and Sector 17 Plaza, received multiple compliments. Fits true to UK size 9.',
        verifiedPurchase: true,
        sizeBought: 'UK 9',
        fitAssessment: 'True to Size'
      },
      {
        id: 'rev-2',
        userName: 'Rohan Verma',
        location: 'Mohali, PB',
        rating: 5,
        date: '28 June 2026',
        comment: 'Brings authentic street vibes without breaking the bank. Delivered to Chandigarh area in just 1 day!',
        verifiedPurchase: true,
        sizeBought: 'UK 8',
        fitAssessment: 'True to Size'
      }
    ]
  },
  {
    id: 'prod-2',
    name: 'Rajwada Velvet Zardozi Embroidered Jutti',
    category: 'Ethnic Juttis',
    price: 2899,
    originalPrice: 3999,
    discountPercent: 27,
    rating: 4.9,
    reviewCount: 218,
    images: [
      'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&q=80&w=800',
    ],
    description: "Handcrafted by master artisans using royal velvet and intricate brass gold Zardozi embroidery. Features double-padded memory foam insoles so you can dance non-stop at wedding receptions and festive celebrations without shoe bites.",
    material: "Royal Silk Velvet & Brass Wire Threadwork",
    soleMaterial: "Pure Leather Sole with Cushioned Footbed",
    availableSizesUK: [6, 7, 8, 9, 10],
    colors: ['Emerald Royal Green', 'Maroon Velvet Gold', 'Royal Midnight Blue'],
    isBestSeller: true,
    isFestiveSpecial: true,
    tags: ['Wedding Special', 'Festive Gold', 'Zero Shoe Bite', 'Handcrafted'],
    specifications: {
      'Craft Style': 'Hand Embroidered Zardozi',
      'Insole': 'Orthopedic Double Layer Foam Padding',
      'Occasion': 'Weddings, Sangeet, Festive Celebrations',
      'Origin': 'Artisan Handcrafted',
      'Fit Note': 'Snug initial fit, molds gently to foot shape within 2 hours'
    },
    careInstructions: [
      'Store in provided cotton dust bag to protect brass threadwork',
      'Dry clean or gently wipe with dry soft brush only',
      'Keep away from moisture and water contact'
    ],
    reviews: [
      {
        id: 'rev-3',
        userName: 'Gurpreet Singh',
        location: 'Chandigarh Sector 35',
        rating: 5,
        date: '04 July 2026',
        comment: 'Ordered this for a wedding function in Chandigarh. Zero bite even after 5 hours of dancing! Gold embroidery looks super royal.',
        verifiedPurchase: true,
        sizeBought: 'UK 10',
        fitAssessment: 'True to Size'
      }
    ]
  },
  {
    id: 'prod-3',
    name: 'Gati Carbon Velocity Pro Running Shoes',
    category: 'Running & Sports',
    price: 6499,
    originalPrice: 8999,
    discountPercent: 28,
    rating: 4.7,
    reviewCount: 189,
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
    ],
    description: "Built for runners conquering morning lake tracks and marathons. Features an embedded 3D carbon propulsion plate, breathable Jacquard knit upper, and anti-slip road grips for high-speed stability.",
    material: "Jacquard Engineered Breathable Mesh",
    soleMaterial: "Nitrogen Infused Foam & Carbon Fiber Plate",
    availableSizesUK: [6, 7, 8, 9, 10, 11],
    colors: ['Neon Crimson & Silver', 'Cyber Lime & Charcoal', 'All-Black Stealth'],
    isBestSeller: false,
    isNewArrival: true,
    tags: ['Marathon Ready', 'Carbon Plate', 'Super Light', 'High Cushioning'],
    specifications: {
      'Heel Drop': '8mm',
      'Weight': '210g ultra lightweight',
      'Pronation': 'Neutral',
      'Ideal Use': 'Sukhna Lake Runs, Road Running, Marathons, Daily Gym',
      'Craftsmanship': 'Performance Engineered'
    },
    careInstructions: [
      'Remove inner sole and hand wash upper with mild shampoo',
      'Do not machine dry or expose to direct heat'
    ],
    reviews: [
      {
        id: 'rev-4',
        userName: 'Simran Kaur',
        location: 'Chandigarh Sector 8',
        rating: 5,
        date: '19 June 2026',
        comment: 'Pushed my 10K personal record at Sukhna Lake track! High energy return and super breathable mesh.',
        verifiedPurchase: true,
        sizeBought: 'UK 7',
        fitAssessment: 'True to Size'
      }
    ]
  },
  {
    id: 'prod-4',
    name: 'Sovereign Burnished Calfskin Leather Oxford',
    category: 'Formal Brogues',
    price: 5499,
    originalPrice: 7999,
    discountPercent: 31,
    rating: 4.9,
    reviewCount: 156,
    images: [
      'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800',
    ],
    description: "Crafted with hand-burnished calfskin leather and traditional Goodyear welt design. Ideal for executive boardrooms, corporate presentations, and formal evening gatherings.",
    material: "Full-Grain Burnished Natural Leather",
    soleMaterial: "Anti-Skid Leather Sole with Rubber Traction Pad",
    availableSizesUK: [6, 7, 8, 9, 10, 11],
    colors: ['Mahogany Chestnut Brown', 'Jet Black Sovereign', 'Tan Cognac'],
    isBestSeller: true,
    tags: ['Genuine Leather', 'Corporate Executive', 'Hand-Finished', 'Goodyear Style'],
    specifications: {
      'Style': 'Closed Lacing Oxford Brogue',
      'Lining': 'Breathable Soft Leather',
      'Footbed': 'Anatomical Cushion Arch Support',
      'Finish': 'Hand-Burnished Patina'
    },
    careInstructions: [
      'Polish with wax shoe cream every 2 weeks using horsehair brush',
      'Insert wooden shoe trees to maintain shape when idle'
    ],
    reviews: [
      {
        id: 'rev-5',
        userName: 'Siddharth Mehta',
        location: 'Chandigarh IT Park',
        rating: 5,
        date: '02 July 2026',
        comment: 'Pure elegance. Leather finish is top-tier like luxury boutique footwear. Looks striking with formal suits.',
        verifiedPurchase: true,
        sizeBought: 'UK 9',
        fitAssessment: 'True to Size'
      }
    ]
  },
  {
    id: 'prod-5',
    name: 'UrbanPulse Chunky Retro Dad Trainers',
    category: 'Sneakers',
    price: 3499,
    originalPrice: 4999,
    discountPercent: 30,
    rating: 4.6,
    reviewCount: 275,
    images: [
      'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1512374382149-233c42b6a83b?auto=format&fit=crop&q=80&w=800',
    ],
    description: "Chunky 90s nostalgia meets modern streetwear aesthetics. Features multi-paneled suede overlays, high-rebound EVA midsole, and reflective 3M details for late-night city walks.",
    material: "Suede, Mesh & Synthetic Leather Overlays",
    soleMaterial: "Sculpted Chunky EVA & Rubber Pods",
    availableSizesUK: [6, 7, 8, 9, 10, 11],
    colors: ['Cream, Grey & Mint Green', 'Triple White Retro', 'Blackout Obsidian'],
    isBestSeller: false,
    isNewArrival: true,
    tags: ['Chunky Sneaker', '3M Reflective', 'Street Style', 'Trending'],
    specifications: {
      'Sole Height': '4.5 cm raised stance',
      'Closure': 'Flat Cotton Laces',
      'Weight': '420g',
      'Design': 'Urban Retro'
    },
    careInstructions: [
      'Use suede brush for suede panels',
      'Spot clean mesh with foam detergent'
    ],
    reviews: [
      {
        id: 'rev-6',
        userName: 'Kabir Oberoi',
        location: 'Chandigarh Sector 10',
        rating: 5,
        date: '15 July 2026',
        comment: 'Solid build quality! Adds nice height boost and matches all relaxed streetwear outfits.',
        verifiedPurchase: true,
        sizeBought: 'UK 8',
        fitAssessment: 'True to Size'
      }
    ]
  },
  {
    id: 'prod-6',
    name: 'Kolhapuri Royale Hand-Braided Leather Sandals',
    category: 'Ethnic Juttis',
    price: 1999,
    originalPrice: 2799,
    discountPercent: 28,
    rating: 4.8,
    reviewCount: 310,
    images: [
      'https://images.unsplash.com/photo-1562183241-b937e95585b6?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&q=80&w=800',
    ],
    description: "Authentic vegetable-tanned handcrafted leather sandals. Enhanced with cushioned insoles and anti-slip rubber under-soles so you get traditional charm with modern comfort.",
    material: "100% Genuine Vegetable-Tanned Leather",
    soleMaterial: "Flexible Leather Base with Micro-Grip Rubber Pad",
    availableSizesUK: [6, 7, 8, 9, 10, 11],
    colors: ['Traditional Honey Tan', 'Dark Mahogany Brown', 'Jet Black'],
    isBestSeller: true,
    tags: ['Kolhapuri', '100% Leather', 'Authentic Artisan', 'Summer Casual'],
    specifications: {
      'Craft': 'Hand-braided toe loop, decorative tassels',
      'Features': 'Cushioned footbed',
      'Best Paired With': 'Kurta Sets, Linen Shirts, Jeans, Traditional Attire'
    },
    careInstructions: [
      'Apply natural oil occasionally to preserve soft texture',
      'Keep away from heavy rain soaking'
    ],
    reviews: [
      {
        id: 'rev-7',
        userName: 'Pranav Kulkarni',
        location: 'Chandigarh Sector 22',
        rating: 5,
        date: '10 July 2026',
        comment: 'Extremely comfortable from day 1! The cushioned heel pad makes a huge difference.',
        verifiedPurchase: true,
        sizeBought: 'UK 9',
        fitAssessment: 'True to Size'
      }
    ]
  },
  {
    id: 'prod-7',
    name: 'Heritage Tassel Suede Driving Loafers',
    category: 'Casual Loafers',
    price: 3899,
    originalPrice: 5299,
    discountPercent: 26,
    rating: 4.7,
    reviewCount: 142,
    images: [
      'https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&q=80&w=800',
    ],
    description: "Butter-soft suede loafers featuring hand-stitched apron toe and rubber pebble driver sole. Ideal for weekend getaways, evening gatherings, and smart casual office wear.",
    material: "Soft Suede Leather",
    soleMaterial: "Flexible Rubber Pebble Driver Pods",
    availableSizesUK: [6, 7, 8, 9, 10],
    colors: ['Navy Blue Suede', 'Camel Tan', 'Olive Forest'],
    isBestSeller: false,
    tags: ['Slip-On', 'Driver Loafer', 'Soft Suede', 'Smart Casual'],
    specifications: {
      'Style': 'Slip-On Tassel Loafer',
      'Insole': 'Memory Foam Sockliner',
      'Craft': 'Hand-Stitched Apron Toe'
    },
    careInstructions: [
      'Clean using suede eraser or rubber suede brush',
      'Use water repellent suede spray for stain protection'
    ],
    reviews: [
      {
        id: 'rev-8',
        userName: 'Harmanpreet Gill',
        location: 'Chandigarh Sector 15',
        rating: 5,
        date: '01 July 2026',
        comment: 'Feels like walking on clouds. Suede quality is rich and navy blue looks sharp with beige trousers.',
        verifiedPurchase: true,
        sizeBought: 'UK 8',
        fitAssessment: 'True to Size'
      }
    ]
  },
  {
    id: 'prod-8',
    name: 'MonsoonProof All-Weather Strap Floaters',
    category: 'Sandals & Floaters',
    price: 1499,
    originalPrice: 1999,
    discountPercent: 25,
    rating: 4.6,
    reviewCount: 420,
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=800',
    ],
    description: "Engineered specifically for all-weather durability and daily commutes. Quick-dry hydrophobic webbed straps, neoprene heel padding, and deep lugged anti-slip outsole for wet terrain.",
    material: "Quick-Dry Nylon Webbing & Neoprene",
    soleMaterial: "Dual-Density Anti-Slip Rubber EVA",
    availableSizesUK: [6, 7, 8, 9, 10, 11],
    colors: ['Tactical Olive & Black', 'All Black Stealth', 'Grey & Electric Blue'],
    isBestSeller: true,
    isMonsoonProof: true,
    tags: ['Weather Proof', 'Waterproof', 'Rugged Floaters', 'Daily Commute'],
    specifications: {
      'Waterproof': '100% Water Safe & Washable',
      'Strap System': 'Triple Adjustable Hook-and-Loop Velcros'
    },
    careInstructions: [
      'Rinse with freshwater after wet usage',
      'Air dry quickly in 15 minutes'
    ],
    reviews: [
      {
        id: 'rev-9',
        userName: 'Sujay Patil',
        location: 'Chandigarh Sector 7',
        rating: 5,
        date: '18 July 2026',
        comment: 'Essential for monsoon walks! Grips wet tiles and wet outdoor tracks without slipping.',
        verifiedPurchase: true,
        sizeBought: 'UK 9',
        fitAssessment: 'True to Size'
      }
    ]
  }
];

export const POPULAR_COUPONS = [
  { code: 'VELOCE10', discountPercent: 10, description: 'Extra 10% OFF on all heritage & performance footwear', maxDiscount: 500 },
  { code: 'FIRST10', discountPercent: 10, description: '10% OFF for first time order', maxDiscount: 300 },
  { code: 'UPI50', flatDiscount: 50, description: 'Flat ₹50 Instant Discount when paying via UPI', minOrder: 999 }
];
