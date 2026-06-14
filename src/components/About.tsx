/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Utensils, Award, Leaf, Flame } from 'lucide-react';
import { motion } from 'motion/react';

export default function About() {
  return (
    <section
      id="about"
      className="py-24 bg-luxury-bg dark:bg-zinc-950 text-luxury-text dark:text-stone-300 transition-colors duration-300 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Core Narrative / Introduction */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="font-mono text-xs tracking-[0.3em] text-gold font-bold uppercase block mb-3">Our Legacy</span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-primary dark:text-white uppercase tracking-tight">
            Crafting Gastronomic Masterpieces
          </h2>
          <div className="w-16 h-[2px] bg-gold mx-auto mt-6 mb-8" />
          <p className="text-base sm:text-lg text-stone-600 dark:text-stone-400 font-light leading-relaxed">
            Since 2012, Grand Flavors has redefine the standards of modern high-end dining, fusing centuries-old multi-cuisine secret techniques with avant-garde culinary styles.
          </p>
        </div>

        {/* First Half Split: Chef Philosophy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <span className="font-mono text-xs text-gold font-semibold uppercase tracking-widest block mb-1">Philosophy</span>
            <h3 className="font-serif text-2xl sm:text-3.5xl font-bold text-primary dark:text-white capitalize mb-6">
              "Honesty on the plate, luxury in the details."
            </h3>
            <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed mb-6">
              Executive Chef Anand Vardhan believes that extraordinary meals stem from agricultural honesty. We partner directly with family orchards and biodynamic spice cultivators from across the Indian subcontinent, France, and China to harvest ingredients at their energetic peaks.
            </p>
            <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed mb-8">
              Every blend of saffron is quality-checked; every single naan flatbread is hand-rolled and cooked inside our custom tandoors fueled only by organic mesquite coals, and each sauce reduction undergoes forty-eight hours of precision simmering.
            </p>

            {/* Premium Benefits Grid Checklist */}
            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-stone-200 dark:border-stone-800">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-gold/10 text-gold rounded-full">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-primary dark:text-white">Michelin Criteria</h4>
                  <p className="text-stone-500 text-[11px]">Precision culinary balance</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-gold/10 text-gold rounded-full">
                  <Leaf className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-primary dark:text-white">100% Organic Spices</h4>
                  <p className="text-stone-500 text-[11px]">Pesticide-free provenance</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="relative pl-6 pb-6">
              <div className="absolute top-0 left-0 w-2/3 h-full border-t border-l border-gold/40 z-0" />
              <img
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1200&h=900&q=80"
                alt="Chef plating signature sauce"
                className="w-full h-[380px] object-cover object-center grayscale hover:grayscale-0 transition-all duration-700 relative z-10 shadow-2xl"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-4 -right-2 bg-primary text-white p-6 max-w-xs shadow-xl border border-gold/10 hidden sm:block z-20">
                <span className="font-serif italic text-gold text-2xl block mb-1">Chef Anand Vardhan</span>
                <span className="font-mono text-[9px] tracking-widest text-stone-400 uppercase">Executive Chef & Founder</span>
              </div>
            </div>
          </div>
        </div>

        {/* Second Half Split - The Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <div className="relative pr-6 pb-6">
              <div className="absolute top-0 right-0 w-2/3 h-full border-t border-r border-gold/40 z-0" />
              <img
                src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&h=800&q=80"
                alt="Grand Flavors restaurant private dining"
                className="w-full h-[380px] object-cover object-center relative z-10 shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          <div className="lg:col-span-5">
            <span className="font-mono text-xs text-gold font-semibold uppercase tracking-widest block mb-1">Interior & Mood</span>
            <h3 className="font-serif text-2xl sm:text-3.5xl font-bold text-primary dark:text-white capitalize mb-6">
              Dining is an Architectural Symphony
            </h3>
            <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed mb-6">
              Designed by standard Milanese designers, the Grand Flavors dining space balances heavy charcoal metals with golden acoustic panelings and cozy warm candlelights.
            </p>
            <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed mb-8">
              We cater selective seating zones, ranging from energetic social chef-front bar counters to ultra-private acoustic booths. Background music features bespoke soft ambient jazz scores suited for warm dinners.
            </p>

            <div className="flex items-center space-x-6">
              <div className="text-center px-6 py-4 bg-white dark:bg-stone-900 border border-gold/20 shadow-md">
                <span className="block text-3xl font-serif font-black text-gold">14+</span>
                <span className="block text-[10px] uppercase font-mono tracking-wider text-stone-500">Years of Honor</span>
              </div>
              <div className="text-center px-6 py-4 bg-white dark:bg-stone-900 border border-gold/20 shadow-md">
                <span className="block text-3xl font-serif font-black text-gold">4.9★</span>
                <span className="block text-[10px] uppercase font-mono tracking-wider text-stone-500">Google Rating</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
