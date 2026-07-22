import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Bot, User, RefreshCw, HelpCircle } from 'lucide-react';
import { ChatMessage, Product } from '../types';

interface AiChatbotDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const AiChatbotDrawer: React.FC<AiChatbotDrawerProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct
}) => {
  if (!isOpen) return null;

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'assistant',
      text: 'Hello! I am Veloce AI, your footwear concierge. Need help finding the perfect size, checking PIN code delivery in Chandigarh (160017) or nationwide, or picking shoes for a special event?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const quickPrompts = [
    'Deliver to my PIN code?',
    'What size should I pick for UK 8?',
    'Best Juttis for Wedding & Sangeet?',
    'How does Cash on Delivery (COD) work?'
  ];

  const handleSendMessage = async (customText?: string) => {
    const query = customText || inputText;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customText) setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: messages.map(m => ({ sender: m.sender, text: m.text })),
          products: products.map(p => ({
            id: p.id,
            name: p.name,
            category: p.category,
            price: p.price,
            rating: p.rating
          }))
        })
      });

      if (!response.ok) {
        throw new Error('Failed to respond');
      }

      const data = await response.json();
      
      const assistantMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: data.reply || 'I am here to help you choose the best footwear!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedProducts: data.suggestedProductIds
          ? products.filter(p => data.suggestedProductIds.includes(p.id))
          : undefined
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error('Chat error:', err);
      // Fallback local response
      let fallbackText = "We offer 100% authentic footwear with free shipping on orders above ₹999, instant UPI payment, and Cash on Delivery (COD) across Chandigarh and nationwide.";
      if (query.toLowerCase().includes('size')) {
        fallbackText = "Our footwear follows standard shoe sizing (UK 6 to UK 11). Check out our Size Guide in product details for foot length in centimeters!";
      } else if (query.toLowerCase().includes('cod') || query.toLowerCase().includes('delivery')) {
        fallbackText = "We deliver via express air couriers in 1-2 days across Chandigarh (160017) and nationwide. Cash on Delivery is available for all major PIN codes!";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'assistant',
          text: fallbackText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 w-full max-w-sm sm:max-w-md bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col h-[520px] animate-in slide-in-from-bottom-5 duration-200">
      
      {/* Header */}
      <div className="bg-stone-900 p-4 text-white flex items-center justify-between border-b border-stone-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-amber-500 text-stone-950 rounded-xl flex items-center justify-center font-bold">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold flex items-center gap-1.5">
              Veloce AI Assistant
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
            </h4>
            <p className="text-[10px] text-stone-300">Live Express Footwear Assistant</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="text-stone-400 hover:text-white p-1 rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
          id="chat-drawer-close-btn"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-stone-50 text-xs">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
              msg.sender === 'user' ? 'bg-amber-600 text-white' : 'bg-stone-900 text-amber-400'
            }`}>
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div className={`max-w-[80%] rounded-2xl p-3 space-y-1.5 ${
              msg.sender === 'user'
                ? 'bg-amber-600 text-white rounded-tr-none'
                : 'bg-white border border-stone-200 text-stone-800 rounded-tl-none shadow-xs'
            }`}>
              <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
              
              {/* Suggested Product Cards inside chat */}
              {msg.suggestedProducts && msg.suggestedProducts.length > 0 && (
                <div className="pt-2 border-t border-stone-100 space-y-1.5">
                  <p className="font-bold text-[10px] text-stone-500 uppercase">Suggested Product:</p>
                  {msg.suggestedProducts.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => {
                        onClose();
                        onSelectProduct(p);
                      }}
                      className="bg-stone-50 p-2 rounded-xl border border-stone-200 flex items-center justify-between cursor-pointer hover:border-amber-500"
                    >
                      <div className="flex items-center gap-2">
                        <img src={p.images[0]} alt="" className="w-8 h-8 rounded object-cover" referrerPolicy="no-referrer" />
                        <div>
                          <p className="font-bold text-stone-900 text-[11px] truncate">{p.name}</p>
                          <p className="text-amber-700 text-[10px] font-extrabold">₹{p.price.toLocaleString('en-IN')}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <span className={`text-[9px] block text-right ${msg.sender === 'user' ? 'text-amber-200' : 'text-stone-400'}`}>
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 text-stone-500 text-xs italic">
            <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-600" />
            <span>SoleAI is thinking...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompt Pills */}
      <div className="px-3 py-2 bg-stone-100 border-t border-stone-200 overflow-x-auto whitespace-nowrap flex gap-1.5 no-scrollbar">
        {quickPrompts.map((qp, i) => (
          <button
            key={i}
            onClick={() => handleSendMessage(qp)}
            className="text-[10px] bg-white border border-stone-300 text-stone-700 hover:border-amber-600 hover:text-amber-900 px-2.5 py-1 rounded-full shrink-0 cursor-pointer transition-colors"
          >
            {qp}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="p-2.5 bg-white border-t border-stone-200 flex items-center gap-2"
      >
        <input
          type="text"
          placeholder="Ask about size, delivery, wedding shoes..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="flex-1 bg-stone-100 border border-stone-200 rounded-full px-3.5 py-2 text-xs text-stone-800 focus:outline-none focus:bg-white focus:border-amber-600"
          id="chat-input-field"
        />
        <button
          type="submit"
          disabled={!inputText.trim() || isLoading}
          className="w-9 h-9 bg-amber-600 hover:bg-amber-500 text-white rounded-full flex items-center justify-center disabled:opacity-50 transition-colors cursor-pointer shrink-0"
          id="chat-send-btn"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
};
