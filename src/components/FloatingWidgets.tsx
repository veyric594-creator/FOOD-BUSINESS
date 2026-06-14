/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { MessageSquare, Calendar, ChevronUp } from 'lucide-react';
import { restaurantDetails } from '../data';

interface FloatingWidgetsProps {
  onScrollToSection: (id: string) => void;
}

export default function FloatingWidgets({ onScrollToSection }: FloatingWidgetsProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWhatsAppChat = () => {
    const customMsg = encodeURIComponent("Hello! I am viewing Grand Flavors website and would like to inquire about dining table reservation options or today's kitchen specials. Thank you!");
    window.open(`https://wa.me/${restaurantDetails.whatsapp}?text=${customMsg}`, '_blank');
  };

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div id="floating-actions" className="fixed bottom-6 right-6 z-40 flex flex-col space-y-3.5">
      
      {/* Floating WhatsApp Chat Assistant */}
      <button
        id="widget-whatsapp"
        onClick={handleWhatsAppChat}
        className="w-12 h-12 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg transform hover:scale-105 active:scale-95 transition-all cursor-pointer relative group focus:outline-none"
        title="WhatsApp Live Chat Support"
      >
        <MessageSquare className="w-5.5 h-5.5" />
        {/* Hover Label */}
        <span className="absolute right-14 bg-black/90 text-white text-[10px] tracking-widest font-mono uppercase px-3 py-1.5 whitespace-nowrap border border-stone-800 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:inline duration-200">
          Chat With Us
        </span>
      </button>

      {/* Floating Table Reservation shortcut */}
      <button
        id="widget-reservation-scroll"
        onClick={() => onScrollToSection('reservation')}
        className="w-12 h-12 bg-gold hover:bg-gold-light text-black rounded-full flex items-center justify-center shadow-lg transform hover:scale-105 active:scale-95 transition-all cursor-pointer relative group focus:outline-none"
        title="Secure Table Reservation"
      >
        <Calendar className="w-5.5 h-5.5" />
        {/* Hover Label */}
        <span className="absolute right-14 bg-black/100 text-white text-[10px] tracking-widest font-mono uppercase px-3 py-1.5 whitespace-nowrap border border-gold/30 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:inline duration-200">
          Reserve Table
        </span>
      </button>

      {/* Back To Top Button */}
      {isVisible && (
        <button
          id="widget-backtotop"
          onClick={handleBackToTop}
          className="w-12 h-12 bg-stone-900 border border-stone-800 hover:border-gold text-gold rounded-full flex items-center justify-center shadow-lg transform hover:scale-105 active:scale-95 transition-all cursor-pointer focus:outline-none"
          title="Scroll Back To Top"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}

    </div>
  );
}
