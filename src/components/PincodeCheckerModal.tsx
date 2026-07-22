import React, { useState } from 'react';
import { X, MapPin, Check, AlertCircle, Truck, ShieldCheck, Zap } from 'lucide-react';
import { PincodeDeliveryInfo } from '../types';
import { SAMPLE_PINCODES } from '../data/products';

interface PincodeCheckerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSetPincode: (pin: string) => void;
  currentPincode: string;
}

export const PincodeCheckerModal: React.FC<PincodeCheckerModalProps> = ({
  isOpen,
  onClose,
  onSetPincode,
  currentPincode
}) => {
  if (!isOpen) return null;

  const [inputPin, setInputPin] = useState(currentPincode || '110001');
  const [result, setResult] = useState<PincodeDeliveryInfo | null>(
    currentPincode ? (SAMPLE_PINCODES[currentPincode] || {
      pincode: currentPincode,
      city: 'Metro Area',
      state: 'Service Region',
      isServiceable: true,
      estimatedDays: 2,
      codAvailable: true,
      courierPartner: 'Express Air Courier'
    }) : SAMPLE_PINCODES['110001']
  );
  const [error, setError] = useState('');

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(inputPin)) {
      setError('Please enter a valid 6-digit PIN code');
      setResult(null);
      return;
    }

    setError('');
    onSetPincode(inputPin);

    if (SAMPLE_PINCODES[inputPin]) {
      setResult(SAMPLE_PINCODES[inputPin]);
    } else {
      setResult({
        pincode: inputPin,
        city: 'Your City',
        state: 'Service Area',
        isServiceable: true,
        estimatedDays: 2,
        codAvailable: true,
        courierPartner: 'Express Logistics'
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border border-stone-200 my-auto relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-stone-900 p-4 text-white flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-amber-400" />
            <h3 className="font-serif font-bold text-base">Check PIN Code Delivery</h3>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-white p-1 rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
            id="pincode-modal-close-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4 text-xs">
          <p className="text-stone-600">
            Enter your 6-digit PIN code to check express courier serviceability, estimated delivery timeline, and Cash on Delivery (COD) eligibility.
          </p>

          {/* Quick Select Cities */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold text-stone-700 block">Popular Quick Check:</span>
            <div className="flex flex-wrap gap-1.5">
              {[
                { city: 'Delhi NCR', pin: '110001' },
                { city: 'Mumbai', pin: '400001' },
                { city: 'Bengaluru', pin: '560001' },
                { city: 'Kolkata', pin: '700001' },
                { city: 'Jaipur', pin: '302001' }
              ].map((c) => (
                <button
                  key={c.pin}
                  type="button"
                  onClick={() => {
                    setInputPin(c.pin);
                    onSetPincode(c.pin);
                    setError('');
                    if (SAMPLE_PINCODES[c.pin]) {
                      setResult(SAMPLE_PINCODES[c.pin]);
                    }
                  }}
                  className={`px-2.5 py-1 rounded-lg border text-[11px] font-medium transition-colors cursor-pointer ${
                    inputPin === c.pin
                      ? 'bg-amber-600 text-white border-amber-600 font-bold'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-800 border-stone-200'
                  }`}
                >
                  📍 {c.city} ({c.pin})
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleCheck} className="flex gap-2">
            <input
              type="text"
              maxLength={6}
              placeholder="e.g. 110001, 400001, 560001"
              value={inputPin}
              onChange={(e) => setInputPin(e.target.value.replace(/\D/g, ''))}
              className="flex-1 bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2 text-stone-800 font-mono focus:outline-none focus:border-amber-600"
              id="pincode-modal-input"
            />
            <button
              type="submit"
              className="bg-amber-600 hover:bg-amber-500 text-white font-bold px-4 py-2 rounded-xl cursor-pointer"
              id="pincode-modal-submit"
            >
              Check
            </button>
          </form>

          {error && <p className="text-rose-600 font-semibold">{error}</p>}

          {result && (
            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl space-y-2 text-emerald-950">
              <div className="flex items-center gap-2 font-bold text-sm text-emerald-900">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Serviceable in {result.city}, {result.state} ({result.pincode})</span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-emerald-200 text-xs">
                <div>
                  <span className="text-stone-500 block">Est. Delivery:</span>
                  <strong className="text-stone-900">{result.estimatedDays} Business Days</strong>
                </div>
                <div>
                  <span className="text-stone-500 block">Courier:</span>
                  <strong className="text-stone-900">{result.courierPartner}</strong>
                </div>
                <div>
                  <span className="text-stone-500 block">COD Status:</span>
                  <strong className="text-emerald-700">Available</strong>
                </div>
                <div>
                  <span className="text-stone-500 block">Express Air:</span>
                  <strong className="text-amber-700">Supported</strong>
                </div>
              </div>
            </div>
          )}

          <button
            onClick={onClose}
            className="w-full bg-stone-900 text-white font-bold py-2.5 rounded-xl cursor-pointer"
            id="pincode-modal-done"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
