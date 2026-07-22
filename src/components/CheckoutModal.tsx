import React, { useState } from 'react';
import { 
  X, CheckCircle2, ShieldCheck, QrCode, Smartphone, CreditCard, 
  Landmark, Truck, ArrowRight, ExternalLink, Lock, Check, Building2, User, KeyRound
} from 'lucide-react';
import { CartItem, ShippingAddress, PaymentMethodType, OrderDetails } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  discountAmount: number;
  appliedCoupon: string;
  onOrderPlaced: (order: OrderDetails) => void;
  userPincode: string;
}

interface BankOption {
  id: string;
  name: string;
  code: string;
  portalUrl: string;
  badge: string;
  color: string;
  bgLight: string;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  discountAmount,
  appliedCoupon,
  onOrderPlaced,
  userPincode
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<'address' | 'payment' | 'bank_portal' | 'confirmation'>('address');

  // Address State
  const [address, setAddress] = useState<ShippingAddress>({
    fullName: 'Gurpreet Singh',
    mobile: '9876543210',
    pincode: userPincode || '160017',
    flatAddress: 'House 1024, Sector 17-C',
    areaLocality: 'Sector 17 Main Plaza',
    city: 'Chandigarh',
    state: 'Chandigarh (UT)',
    addressType: 'Home'
  });

  // Payment Method State
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('upi');
  const [upiId, setUpiId] = useState('gurpreet@okaxis');
  
  // Specific Bank State
  const banks: BankOption[] = [
    {
      id: 'hdfc',
      name: 'HDFC Bank NetBanking',
      code: 'HDFC0000001',
      portalUrl: 'https://netbanking.hdfcbank.com/netbanking/',
      badge: 'Popular',
      color: 'bg-blue-900 border-blue-700 text-blue-100',
      bgLight: 'bg-blue-50 border-blue-200 text-blue-950'
    },
    {
      id: 'sbi',
      name: 'State Bank of India (SBI)',
      code: 'SBIN0000691',
      portalUrl: 'https://www.onlinesbi.sbi/',
      badge: 'Official',
      color: 'bg-sky-700 border-sky-600 text-sky-100',
      bgLight: 'bg-sky-50 border-sky-200 text-sky-950'
    },
    {
      id: 'icici',
      name: 'ICICI Bank iMobile',
      code: 'ICIC0000007',
      portalUrl: 'https://infinity.icicibank.com/',
      badge: 'Instant',
      color: 'bg-orange-800 border-orange-600 text-orange-100',
      bgLight: 'bg-orange-50 border-orange-200 text-orange-950'
    },
    {
      id: 'axis',
      name: 'Axis Bank Internet Banking',
      code: 'UTIB0000005',
      portalUrl: 'https://retail.axisbank.co.in/',
      badge: 'Fast',
      color: 'bg-rose-900 border-rose-700 text-rose-100',
      bgLight: 'bg-rose-50 border-rose-200 text-rose-950'
    },
    {
      id: 'kotak',
      name: 'Kotak Mahindra Bank',
      code: 'KKBK0000181',
      portalUrl: 'https://netbanking.kotak.com/',
      badge: '811 Verified',
      color: 'bg-red-800 border-red-600 text-red-100',
      bgLight: 'bg-red-50 border-red-200 text-red-950'
    },
    {
      id: 'pnb',
      name: 'Punjab National Bank (PNB)',
      code: 'PUNB0000200',
      portalUrl: 'https://netpnb.com/',
      badge: 'Public Sector',
      color: 'bg-amber-800 border-amber-600 text-amber-100',
      bgLight: 'bg-amber-50 border-amber-200 text-amber-950'
    },
    {
      id: 'bob',
      name: 'Bank of Baroda (bob World)',
      code: 'BARB0CHANDI',
      portalUrl: 'https://www.bobibanking.com/',
      badge: 'Trusted',
      color: 'bg-orange-700 border-orange-500 text-orange-100',
      bgLight: 'bg-orange-50 border-orange-200 text-orange-950'
    },
    {
      id: 'yes',
      name: 'YES Bank Online',
      code: 'YESB0000001',
      portalUrl: 'https://digital.yesbank.in/',
      badge: 'Digital',
      color: 'bg-blue-800 border-blue-600 text-blue-100',
      bgLight: 'bg-blue-50 border-blue-200 text-blue-950'
    },
    {
      id: 'idfc',
      name: 'IDFC FIRST Bank',
      code: 'IDFB0020101',
      portalUrl: 'https://my.idfcfirstbank.com/',
      badge: 'Zero Fee',
      color: 'bg-red-900 border-red-700 text-red-100',
      bgLight: 'bg-red-50 border-red-200 text-red-950'
    },
    {
      id: 'paytm_bank',
      name: 'Paytm Payments Bank',
      code: 'PYTM0123456',
      portalUrl: 'https://paytm.com/bank',
      badge: 'UPI Wallet',
      color: 'bg-cyan-800 border-cyan-600 text-cyan-100',
      bgLight: 'bg-cyan-50 border-cyan-200 text-cyan-950'
    }
  ];

  const [selectedBank, setSelectedBank] = useState<BankOption>(banks[0]);
  const [bankCustomerId, setBankCustomerId] = useState('GURPREET9876');
  const [bankPassword, setBankPassword] = useState('••••••••');

  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<OrderDetails | null>(null);

  // Pricing calculations
  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const gstAmount = Math.round((subtotal - discountAmount) * 0.05);
  const codFee = paymentMethod === 'cod' ? 49 : 0;
  const shippingFee = subtotal >= 999 ? 0 : 99;
  const grandTotal = Math.max(0, subtotal - discountAmount + gstAmount + codFee + shippingFee);

  const handlePlaceOrder = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsProcessing(true);

    // Open actual payment portal link in new tab upon checkout
    if (paymentMethod === 'netbanking' && selectedBank.portalUrl) {
      window.open(selectedBank.portalUrl, '_blank');
    } else if (paymentMethod === 'upi') {
      if (upiId.includes('paytm')) window.open('https://paytm.com', '_blank');
      else if (upiId.includes('okaxis') || upiId.includes('gpay')) window.open('https://pay.google.com', '_blank');
      else if (upiId.includes('ybl') || upiId.includes('phonepe')) window.open('https://www.phonepe.com', '_blank');
      else window.open('https://www.bhimupi.org.in', '_blank');
    }

    setTimeout(() => {
      const newOrder: OrderDetails = {
        orderId: `VEL-${Math.floor(100000 + Math.random() * 900000)}`,
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        items,
        shippingAddress: address,
        paymentMethod,
        paymentDetails: {
          upiId: paymentMethod === 'upi' ? upiId : undefined,
          bankName: paymentMethod === 'netbanking' ? selectedBank.name : undefined,
          provider: paymentMethod === 'netbanking' ? `${selectedBank.name} Portal (${selectedBank.portalUrl})` : undefined
        },
        pricing: {
          subtotal,
          discount: discountAmount,
          gstAmount,
          codFee,
          shippingFee,
          totalAmount: grandTotal
        },
        status: 'Confirmed',
        trackingNumber: `EX-${Math.floor(10000000 + Math.random() * 90000000)}`,
        courierName: 'Express Air Courier',
        estimatedDelivery: '1-2 Days'
      };

      setConfirmedOrder(newOrder);
      onOrderPlaced(newOrder);
      setIsProcessing(false);
      setStep('confirmation');
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden border border-stone-200 my-auto relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 p-4 sm:p-5 text-white flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500 text-stone-950 rounded-2xl flex items-center justify-center font-bold shadow-md shadow-amber-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base flex items-center gap-2">
                <span>Secure Express Bank Checkout</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded font-mono uppercase">
                  256-Bit SSL Encrypted
                </span>
              </h3>
              <p className="text-[11px] text-stone-300">Direct Bank Portal • UPI Apps • RuPay & Visa</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-stone-400 hover:text-white p-2 rounded-xl hover:bg-stone-800 transition-colors cursor-pointer"
            id="checkout-close-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Steps Progress Indicator */}
        <div className="bg-stone-100 px-6 py-2.5 border-b border-stone-200 flex items-center justify-between text-xs font-bold">
          <div className={`flex items-center gap-1.5 ${step === 'address' ? 'text-amber-700' : 'text-stone-500'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 'address' ? 'bg-amber-600 text-white' : 'bg-stone-300 text-stone-700'}`}>1</span>
            <span>Address</span>
          </div>

          <div className={`flex items-center gap-1.5 ${step === 'payment' || step === 'bank_portal' ? 'text-amber-700' : 'text-stone-500'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 'payment' || step === 'bank_portal' ? 'bg-amber-600 text-white' : 'bg-stone-300 text-stone-700'}`}>2</span>
            <span>Bank & Payment</span>
          </div>

          <div className={`flex items-center gap-1.5 ${step === 'confirmation' ? 'text-emerald-700' : 'text-stone-500'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 'confirmation' ? 'bg-emerald-600 text-white' : 'bg-stone-300 text-stone-700'}`}>3</span>
            <span>Order Placed</span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 max-h-[75vh] overflow-y-auto space-y-6">

          {/* STEP 1: ADDRESS */}
          {step === 'address' && (
            <form onSubmit={(e) => { e.preventDefault(); setStep('payment'); }} className="space-y-4">
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center gap-2">
                <Truck className="w-4 h-4 text-amber-600" /> Shipping Delivery Address
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-stone-700 block mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={address.fullName}
                    onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-800 focus:outline-none focus:border-amber-600 font-medium"
                    id="address-name-input"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-stone-700 block mb-1">10-Digit Mobile Number</label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={address.mobile}
                    onChange={(e) => setAddress({ ...address, mobile: e.target.value.replace(/\D/g, '') })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-800 focus:outline-none focus:border-amber-600 font-mono"
                    id="address-mobile-input"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-stone-700 block mb-1">6-Digit PIN Code</label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={address.pincode}
                    onChange={(e) => setAddress({ ...address, pincode: e.target.value.replace(/\D/g, '') })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-800 focus:outline-none focus:border-amber-600 font-mono font-bold text-amber-800"
                    id="address-pincode-input"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-stone-700 block mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-800 focus:outline-none focus:border-amber-600"
                    id="address-city-input"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-stone-700 block mb-1">State</label>
                  <input
                    type="text"
                    required
                    value={address.state}
                    onChange={(e) => setAddress({ ...address, state: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-800 focus:outline-none focus:border-amber-600"
                    id="address-state-input"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-stone-700 block mb-1">Flat / House No. / Building Name</label>
                <input
                  type="text"
                  required
                  value={address.flatAddress}
                  onChange={(e) => setAddress({ ...address, flatAddress: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-800 focus:outline-none focus:border-amber-600"
                  id="address-flat-input"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-stone-700 block mb-1">Street / Area / Locality</label>
                <input
                  type="text"
                  required
                  value={address.areaLocality}
                  onChange={(e) => setAddress({ ...address, areaLocality: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-800 focus:outline-none focus:border-amber-600"
                  id="address-area-input"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs py-3.5 rounded-2xl shadow-lg shadow-amber-600/20 flex items-center justify-center gap-2 cursor-pointer mt-4"
                id="address-submit-btn"
              >
                Proceed to Select Bank & Payment <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* STEP 2: PAYMENT METHODS WITH SPECIFIC BANK LINKS */}
          {step === 'payment' && (
            <form onSubmit={handlePlaceOrder} className="space-y-5">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center gap-2">
                  <Landmark className="w-4 h-4 text-amber-600" /> Select Payment Method & Specific Bank Link
                </h4>
                <button 
                  type="button" 
                  onClick={() => setStep('address')}
                  className="text-[11px] text-stone-500 hover:text-stone-900 underline"
                >
                  Edit Address
                </button>
              </div>

              {/* Payment Category Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                
                {/* 1. NetBanking */}
                <div
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                    paymentMethod === 'netbanking'
                      ? 'border-amber-600 bg-amber-50/90 ring-2 ring-amber-600/20'
                      : 'border-stone-200 bg-stone-50 hover:bg-stone-100'
                  }`}
                >
                  <Landmark className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                      <span>Specific Bank NetBanking</span>
                      <span className="bg-amber-600 text-white text-[9px] px-1 rounded font-bold">RECOMMENDED</span>
                    </h5>
                    <p className="text-[11px] text-stone-500">HDFC, SBI, ICICI, Axis, Kotak & Direct Portals</p>
                  </div>
                </div>

                {/* 2. UPI */}
                <div
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                    paymentMethod === 'upi'
                      ? 'border-amber-600 bg-amber-50/90 ring-2 ring-amber-600/20'
                      : 'border-stone-200 bg-stone-50 hover:bg-stone-100'
                  }`}
                >
                  <Smartphone className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-stone-900">UPI Instant App Authorization</h5>
                    <p className="text-[11px] text-stone-500">Google Pay, PhonePe, Paytm, BHIM</p>
                  </div>
                </div>

                {/* 3. Cards */}
                <div
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                    paymentMethod === 'card'
                      ? 'border-amber-600 bg-amber-50/90 ring-2 ring-amber-600/20'
                      : 'border-stone-200 bg-stone-50 hover:bg-stone-100'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-stone-900">Credit / Debit Card</h5>
                    <p className="text-[11px] text-stone-500">RuPay, Visa, Mastercard, Diners</p>
                  </div>
                </div>

                {/* 4. COD */}
                <div
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                    paymentMethod === 'cod'
                      ? 'border-amber-600 bg-amber-50/90 ring-2 ring-amber-600/20'
                      : 'border-stone-200 bg-stone-50 hover:bg-stone-100'
                  }`}
                >
                  <Truck className="w-5 h-5 text-stone-800 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-stone-900">Cash on Delivery (COD)</h5>
                    <p className="text-[11px] text-stone-500">Pay cash/UPI at doorstep</p>
                  </div>
                </div>

              </div>

              {/* SPECIFIC BANK SELECTION SECTION */}
              {paymentMethod === 'netbanking' && (
                <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                        <Building2 className="w-4 h-4 text-amber-600" />
                        Choose Your Specific Bank:
                      </h5>
                      <p className="text-[11px] text-stone-500">Each bank has its own authentic secure login portal link</p>
                    </div>
                    <span className="text-[10px] bg-stone-200 text-stone-800 font-mono px-2 py-0.5 rounded font-bold">
                      10 Registered Banks
                    </span>
                  </div>

                  {/* Bank Cards Grid with Links */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-56 overflow-y-auto pr-1">
                    {banks.map((b) => {
                      const isSelected = selectedBank.id === b.id;
                      return (
                        <div
                          key={b.id}
                          onClick={() => setSelectedBank(b)}
                          className={`p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                            isSelected
                              ? 'bg-amber-600 text-white border-amber-600 shadow-md ring-2 ring-amber-500/30'
                              : 'bg-white text-stone-800 border-stone-200 hover:bg-stone-100'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs">{b.name}</span>
                            <span className={`text-[9px] font-black px-1.5 py-0.2 rounded uppercase ${isSelected ? 'bg-stone-950 text-amber-400' : 'bg-stone-100 text-stone-600'}`}>
                              {b.badge}
                            </span>
                          </div>

                          <div className="flex items-center justify-between pt-1 border-t border-current/10 text-[10px]">
                            <span className="font-mono opacity-80">IFSC: {b.code}</span>
                            
                            <a
                              href={b.portalUrl}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className={`flex items-center gap-1 font-bold underline transition-colors ${
                                isSelected ? 'text-amber-200 hover:text-white' : 'text-amber-700 hover:text-amber-900'
                              }`}
                              title={`Visit official ${b.name} login link`}
                            >
                              <span>Official Link</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Selected Bank Specific Authorization Box */}
                  <div className="p-3.5 bg-white rounded-xl border border-amber-300 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Lock className="w-4 h-4 text-emerald-600" />
                        <span className="text-xs font-bold text-stone-900">
                          Sign-in to {selectedBank.name} Portal:
                        </span>
                      </div>

                      <a
                        href={selectedBank.portalUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] font-bold text-amber-700 hover:text-amber-900 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-300 flex items-center gap-1"
                      >
                        <span>Open {selectedBank.name} URL</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div>
                        <label className="text-[10px] font-bold text-stone-600 block mb-1">Customer ID / User ID:</label>
                        <div className="flex items-center bg-stone-50 border border-stone-300 rounded-lg px-2.5 py-1.5">
                          <User className="w-3.5 h-3.5 text-stone-400 mr-1.5" />
                          <input
                            type="text"
                            value={bankCustomerId}
                            onChange={(e) => setBankCustomerId(e.target.value)}
                            className="bg-transparent text-xs text-stone-800 font-mono focus:outline-none w-full"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-stone-600 block mb-1">NetBanking Password:</label>
                        <div className="flex items-center bg-stone-50 border border-stone-300 rounded-lg px-2.5 py-1.5">
                          <KeyRound className="w-3.5 h-3.5 text-stone-400 mr-1.5" />
                          <input
                            type="password"
                            value={bankPassword}
                            onChange={(e) => setBankPassword(e.target.value)}
                            className="bg-transparent text-xs text-stone-800 font-mono focus:outline-none w-full"
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        window.open(selectedBank.portalUrl, '_blank');
                      }}
                      className="w-full bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold py-2 rounded-xl flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                      Click here to Launch {selectedBank.name} Portal in New Tab
                    </button>
                  </div>
                </div>
              )}

              {/* UPI App Links Section */}
              {paymentMethod === 'upi' && (
                <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
                  <label className="text-xs font-bold text-stone-800 block">Select Specific UPI App or VPA:</label>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { name: 'Google Pay', handle: 'user@okaxis', url: 'https://pay.google.com', color: 'bg-emerald-50 text-emerald-900 border-emerald-300' },
                      { name: 'PhonePe', handle: 'user@ybl', url: 'https://www.phonepe.com', color: 'bg-purple-50 text-purple-900 border-purple-300' },
                      { name: 'Paytm', handle: 'user@paytm', url: 'https://paytm.com', color: 'bg-sky-50 text-sky-900 border-sky-300' },
                      { name: 'BHIM UPI', handle: 'user@upi', url: 'https://www.bhimupi.org.in', color: 'bg-amber-50 text-amber-900 border-amber-300' }
                    ].map((app) => (
                      <div
                        key={app.name}
                        onClick={() => setUpiId(app.handle)}
                        className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${app.color} ${upiId === app.handle ? 'ring-2 ring-amber-600 font-bold shadow-sm' : ''}`}
                      >
                        <div className="font-bold flex items-center justify-between">
                          <span>{app.name}</span>
                          <a href={app.url} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="text-stone-500 hover:text-stone-900">
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                        <span className="text-[10px] opacity-75 font-mono block mt-1">{app.handle}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2">
                    <label className="text-[10px] font-bold text-stone-600 block mb-1">Your Specific VPA Handle:</label>
                    <input
                      type="text"
                      required
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-800 font-mono focus:outline-none focus:border-amber-600"
                    />
                  </div>
                </div>
              )}

              {/* Cards Section */}
              {paymentMethod === 'card' && (
                <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
                  <label className="text-xs font-bold text-stone-800 block">Enter Card Info:</label>
                  <input
                    type="text"
                    placeholder="Card Number (4532 8921 7812 9012)"
                    defaultValue="4532 8921 7812 9012"
                    className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs font-mono"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input type="text" placeholder="MM/YY" defaultValue="08/28" className="bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs font-mono" />
                    <input type="password" placeholder="CVV" defaultValue="888" className="bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs font-mono" />
                  </div>
                </div>
              )}

              {/* Order Summary Line */}
              <div className="bg-stone-900 text-white p-4 rounded-2xl flex items-center justify-between text-xs">
                <div>
                  <span className="text-stone-300 font-medium">Grand Total Payable:</span>
                  <p className="text-amber-400 text-[10px]">
                    Method: {paymentMethod === 'netbanking' ? selectedBank.name : paymentMethod.toUpperCase()}
                  </p>
                </div>
                <span className="text-xl font-extrabold text-amber-400 font-serif">
                  ₹{grandTotal.toLocaleString('en-IN')}
                </span>
              </div>

              {/* Submit Payment Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-4 rounded-2xl shadow-xl shadow-emerald-600/20 flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
                id="place-order-btn"
              >
                {isProcessing ? (
                  <>Authorizing Payment with {paymentMethod === 'netbanking' ? selectedBank.name : 'Bank Network'}...</>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-200" />
                    Pay ₹{grandTotal.toLocaleString('en-IN')} & Complete Order
                  </>
                )}
              </button>
            </form>
          )}

          {/* STEP 3: CONFIRMATION RECEIPT */}
          {step === 'confirmation' && confirmedOrder && (
            <div className="space-y-5 text-stone-800 text-xs">
              <div className="text-center space-y-2 py-4 bg-emerald-50 rounded-2xl border border-emerald-200">
                <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="font-serif font-extrabold text-xl text-emerald-950">Payment & Order Confirmed!</h3>
                <p className="text-emerald-800 text-xs">
                  Order ID: <strong className="font-mono text-stone-900 bg-white px-2 py-0.5 rounded border border-emerald-300">{confirmedOrder.orderId}</strong>
                </p>
                {confirmedOrder.paymentDetails?.bankName && (
                  <p className="text-[11px] text-emerald-700 font-medium">
                    Authorized via: <strong>{confirmedOrder.paymentDetails.bankName}</strong>
                  </p>
                )}
              </div>

              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-2">
                <h5 className="font-bold text-stone-900">Shipment Details:</h5>
                <p><strong>Recipient:</strong> {confirmedOrder.shippingAddress.fullName} (+91-{confirmedOrder.shippingAddress.mobile})</p>
                <p><strong>Address:</strong> {confirmedOrder.shippingAddress.flatAddress}, {confirmedOrder.shippingAddress.areaLocality}, {confirmedOrder.shippingAddress.city}, {confirmedOrder.shippingAddress.state} - {confirmedOrder.shippingAddress.pincode}</p>
                <p><strong>Tracking No:</strong> <span className="font-mono">{confirmedOrder.trackingNumber}</span> ({confirmedOrder.courierName})</p>
              </div>

              <div className="space-y-2">
                <h5 className="font-bold text-stone-900">Items Ordered:</h5>
                <div className="divide-y divide-stone-100 border border-stone-200 rounded-xl bg-white overflow-hidden">
                  {confirmedOrder.items.map((item) => (
                    <div key={item.product.id} className="p-3 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <img src={item.product.images[0]} alt="" className="w-10 h-10 rounded object-cover" referrerPolicy="no-referrer" />
                        <div>
                          <p className="font-bold text-stone-900">{item.product.name}</p>
                          <p className="text-stone-500 text-[11px]">UK {item.selectedSizeUK} • Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <span className="font-bold text-stone-900">₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs py-3.5 rounded-2xl cursor-pointer"
                id="checkout-done-btn"
              >
                Back to Store
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
