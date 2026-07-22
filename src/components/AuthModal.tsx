import React, { useState } from 'react';
import { X, Phone, Lock, User, ShieldCheck, CheckCircle2, ArrowRight, CreditCard, Smartphone, Building2, Banknote } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [mode, setMode] = useState<'login' | 'signup' | 'otp'>('login');
  const [mobileNumber, setMobileNumber] = useState('');
  const [fullName, setFullName] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobileNumber.length >= 10) {
      setMode('otp');
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setLoggedInUser(fullName || `User (${mobileNumber.slice(-4)})`);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoggedInUser(null);
    setMode('login');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-stone-100 relative">
        {/* Modal Header */}
        <div className="bg-stone-900 text-white p-5 flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-amber-600 rounded-lg flex items-center justify-center font-bold text-sm">
              V
            </div>
            <div>
              <h3 className="font-serif font-bold text-base">Veloce Customer Portal</h3>
              <p className="text-[10px] text-amber-400 font-medium">Dispatched from Chandigarh • Nationwide Delivery</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-white p-1 rounded-full transition-colors cursor-pointer"
            id="auth-modal-close-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {isLoggedIn ? (
            <div className="text-center py-4 space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-stone-900">Welcome Back, {loggedInUser}!</h4>
                <p className="text-xs text-stone-500 mt-1">Your account is verified. You get priority express shipping & instant UPI checkout on all orders.</p>
              </div>

              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 text-left space-y-2 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>Dispatch Hub:</span>
                  <span className="font-bold text-stone-800">Chandigarh (160017)</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Member Discount:</span>
                  <span className="font-bold text-amber-600">Extra 10% OFF Active</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Delivery Coverage:</span>
                  <span className="font-bold text-emerald-600">All India Serviceable</span>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="w-full bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs py-2.5 rounded-xl cursor-pointer transition-colors"
              >
                Log Out of Account
              </button>
            </div>
          ) : mode === 'login' || mode === 'signup' ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <h4 className="text-base font-bold text-stone-900">
                  {mode === 'login' ? 'Login with Mobile OTP' : 'Create Veloce Account'}
                </h4>
                <p className="text-xs text-stone-500 mt-0.5">
                  Enter your mobile number to receive a 4-digit verification code.
                </p>
              </div>

              {mode === 'signup' && (
                <div>
                  <label className="text-[11px] font-bold text-stone-700 block mb-1">Full Name</label>
                  <div className="flex items-center bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs">
                    <User className="w-4 h-4 text-stone-400 mr-2" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Gurpreet Singh"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="bg-transparent w-full focus:outline-none"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="text-[11px] font-bold text-stone-700 block mb-1">10-Digit Mobile Number</label>
                <div className="flex items-center bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs">
                  <span className="text-stone-500 font-bold mr-2">+91</span>
                  <input
                    type="tel"
                    required
                    pattern="[0-9]{10}"
                    placeholder="9876543210"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                    className="bg-transparent w-full focus:outline-none font-mono"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs py-3 rounded-xl shadow-md shadow-amber-600/20 flex items-center justify-center gap-2 cursor-pointer transition-all"
                id="auth-send-otp-btn"
              >
                <span>Get OTP Code</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-between text-xs text-stone-500 pt-2 border-t border-stone-100">
                <span>{mode === 'login' ? "Don't have an account?" : "Already registered?"}</span>
                <button
                  type="button"
                  onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                  className="text-amber-600 font-bold hover:underline cursor-pointer"
                >
                  {mode === 'login' ? 'Create Account' : 'Sign In'}
                </button>
              </div>

              {/* Accepted Indian Payment Info */}
              <div className="mt-6 pt-4 border-t border-stone-100">
                <p className="text-[10px] font-bold text-stone-500 uppercase tracking-wider mb-2">
                  Accepted Payments Across India:
                </p>
                <div className="grid grid-cols-4 gap-2 text-center text-[10px] text-stone-600">
                  <div className="bg-stone-50 p-2 rounded-lg border border-stone-200">
                    <Smartphone className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                    <span>UPI / GPay</span>
                  </div>
                  <div className="bg-stone-50 p-2 rounded-lg border border-stone-200">
                    <CreditCard className="w-4 h-4 text-sky-600 mx-auto mb-1" />
                    <span>RuPay & Cards</span>
                  </div>
                  <div className="bg-stone-50 p-2 rounded-lg border border-stone-200">
                    <Building2 className="w-4 h-4 text-purple-600 mx-auto mb-1" />
                    <span>NetBanking</span>
                  </div>
                  <div className="bg-stone-50 p-2 rounded-lg border border-stone-200">
                    <Banknote className="w-4 h-4 text-amber-600 mx-auto mb-1" />
                    <span>Cash on Delivery</span>
                  </div>
                </div>
              </div>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div>
                <h4 className="text-base font-bold text-stone-900">Enter Verification Code</h4>
                <p className="text-xs text-stone-500 mt-0.5">
                  Code sent to <span className="font-bold text-stone-800">+91 {mobileNumber}</span>
                </p>
              </div>

              <div className="flex justify-center gap-2 py-2">
                {[0, 1, 2, 3].map((idx) => (
                  <input
                    key={idx}
                    type="text"
                    maxLength={1}
                    required
                    value={otp[idx]}
                    onChange={(e) => {
                      const newOtp = [...otp];
                      newOtp[idx] = e.target.value;
                      setOtp(newOtp);
                      if (e.target.value && e.target.nextElementSibling) {
                        (e.target.nextElementSibling as HTMLInputElement).focus();
                      }
                    }}
                    className="w-12 h-12 text-center text-lg font-bold bg-stone-50 border border-stone-300 rounded-xl focus:border-amber-600 focus:outline-none"
                  />
                ))}
              </div>

              <button
                type="submit"
                className="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs py-3 rounded-xl shadow-md cursor-pointer transition-all"
                id="auth-verify-otp-btn"
              >
                Verify & Continue
              </button>

              <button
                type="button"
                onClick={() => setMode('login')}
                className="w-full text-center text-xs text-stone-500 hover:text-stone-800 cursor-pointer"
              >
                Change Mobile Number
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
