/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Calendar, ChevronRight, ShoppingBag, Clock } from 'lucide-react';
import { restaurantDetails } from '../data';
import { motion } from 'motion/react';

interface HeroProps {
  onScrollToSection: (id: string) => void;
}

export default function Hero({ onScrollToSection }: HeroProps) {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-primary py-24"
    >
      {/* Background Graphic Blur Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1920&q=80"
          alt="Luxury dining atmosphere"
          className="w-full h-full object-cover object-center filter brightness-[0.25] scale-105 transition-all duration-1000 ease-out"
          referrerPolicy="no-referrer"
        />
        {/* Cinematic atmospheric overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-black/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Dynamic Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center space-x-2 px-4 py-1.5 border border-gold/40 bg-gold/10 backdrop-blur-md rounded-none mb-6 animate-pulse"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-gold" />
          <span className="text-[10px] sm:text-xs font-mono font-medium tracking-[0.25em] text-gold uppercase">
            AWARD-WINNING LUXURY MULTI-CUISINE
          </span>
        </motion.div>

        {/* Brand Main Heading */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-serif text-5xl sm:text-7xl lg:text-9xl font-bold tracking-tight text-white mb-6 uppercase"
        >
          {restaurantDetails.name}
        </motion.h1>

        {/* Elegant Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-sans text-lg sm:text-2xl font-light tracking-[0.15em] text-gold/90 max-w-3xl mx-auto mb-10"
        >
          "{restaurantDetails.tagline}"
        </motion.p>

        {/* Action Button Deck */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-lg mx-auto mb-12"
        >
          {/* Reserve CTA */}
          <button
            id="hero-reserve-cta"
            onClick={() => onScrollToSection('reservation')}
            className="w-full sm:w-auto px-8 py-4 bg-gold hover:bg-gold-light text-black text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 shadow-lg shadow-gold/15 cursor-pointer focus:outline-none flex items-center justify-center space-x-2"
          >
            <Calendar className="w-4 h-4" />
            <span>Reserve a Table</span>
          </button>

          {/* Ordering Callout */}
          <button
            id="hero-order-cta"
            onClick={() => onScrollToSection('menu')}
            className="w-full sm:w-auto px-8 py-4 border border-stone-500 hover:border-gold text-white hover:text-gold bg-black/30 hover:bg-gold/5 backdrop-blur-sm text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer focus:outline-none flex items-center justify-center space-x-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Order Online</span>
          </button>
        </motion.div>

        {/* Minimalist operating indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex flex-wrap justify-center items-center gap-6 text-stone-400 font-mono text-[10px] sm:text-xs tracking-widest pt-8 border-t border-stone-800/60 max-w-md mx-auto"
        >
          <span className="flex items-center space-x-1.5">
            <Clock className="w-3.5 h-3.5 text-gold" />
            <span>Open Daily: 12:00 PM - 10:30 PM</span>
          </span>
          <span className="hidden sm:inline text-gold">•</span>
          <span>Michelin Plated Standards</span>
        </motion.div>
      </div>

      {/* Decorative Slide-down Scroller Anchor */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center">
        <span className="text-[9px] tracking-[0.3em] font-mono text-stone-400 uppercase mb-2">Scroll To Discover</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-1.5 h-6 rounded-full bg-gold/50 flex justify-center py-0.5"
        >
          <div className="w-1 h-1 bg-gold rounded-full" />
        </motion.div>
      </div>
    </section>
  );
}
