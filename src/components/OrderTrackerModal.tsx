import React, { useState } from 'react';
import { X, Search, Package, Truck, CheckCircle, Clock, MapPin } from 'lucide-react';
import { OrderDetails } from '../types';

interface OrderTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: OrderDetails[];
}

export const OrderTrackerModal: React.FC<OrderTrackerModalProps> = ({
  isOpen,
  onClose,
  orders
}) => {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<OrderDetails | null>(
    orders.length > 0 ? orders[0] : null
  );
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    const found = orders.find(
      o => o.orderId.toLowerCase() === query.trim().toLowerCase() ||
           o.shippingAddress.mobile.includes(query.trim())
    );
    setSearchedOrder(found || null);
  };

  const stages = [
    { label: 'Order Confirmed', date: 'Jul 21', completed: true },
    { label: 'Packed at Chandigarh Hub', date: 'Jul 21', completed: true },
    { label: 'In Transit via Express Air', date: 'Jul 22', completed: true },
    { label: 'Out for Delivery', date: 'Jul 23', completed: false },
    { label: 'Delivered to Doorstep', date: 'Jul 23', completed: false }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden border border-stone-200 my-auto relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-stone-900 p-4 sm:p-5 text-white flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-amber-500 text-stone-950 rounded-xl flex items-center justify-center font-bold">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base">Track Order Shipment</h3>
              <p className="text-[10px] text-stone-300">Live Express Delivery Status</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-stone-400 hover:text-white p-1 rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
            id="tracker-close-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              placeholder="Enter Order ID (e.g. VEL-892341) or Mobile Number"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2 text-xs text-stone-800 focus:outline-none focus:border-amber-600"
              id="tracker-search-input"
            />
            <button
              type="submit"
              className="bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs px-4 py-2 rounded-xl cursor-pointer"
              id="tracker-search-btn"
            >
              Track
            </button>
          </form>

          {/* Active Order Showcase */}
          {searchedOrder ? (
            <div className="space-y-4">
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-2 text-xs">
                <div className="flex items-center justify-between font-bold text-stone-900">
                  <span>Order ID: <strong className="font-mono text-amber-700">{searchedOrder.orderId}</strong></span>
                  <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full text-[10px]">
                    Status: {searchedOrder.status}
                  </span>
                </div>

                <div className="text-[11px] text-stone-600 space-y-1">
                  <p>• Courier Partner: <strong>{searchedOrder.courierName}</strong> (AWB: {searchedOrder.trackingNumber})</p>
                  <p>• Delivering to: <strong>{searchedOrder.shippingAddress.fullName}</strong> ({searchedOrder.shippingAddress.pincode})</p>
                  <p>• Expected Delivery: <strong>In 2-3 Days</strong></p>
                </div>
              </div>

              {/* Logistics Timeline */}
              <div className="space-y-3 pt-2">
                <h5 className="text-xs font-bold text-stone-900 uppercase">Live Logistics Timeline</h5>
                
                <div className="space-y-3 relative pl-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-200">
                  {stages.map((stg, i) => (
                    <div key={i} className="relative flex items-center justify-between text-xs">
                      <div className={`absolute -left-6 w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                        stg.completed ? 'bg-emerald-600 text-white' : 'bg-stone-200 text-stone-500'
                      }`}>
                        {stg.completed ? '✓' : i + 1}
                      </div>

                      <span className={`font-semibold ${stg.completed ? 'text-stone-900' : 'text-stone-400'}`}>
                        {stg.label}
                      </span>
                      <span className="text-[10px] text-stone-400">{stg.date}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ) : (
            <div className="text-center py-8 space-y-2 text-stone-500 text-xs">
              <Package className="w-10 h-10 mx-auto text-stone-300" />
              <p>{searched ? 'No order found matching your query.' : 'Enter your Order ID above to trace real-time delivery status across India.'}</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
