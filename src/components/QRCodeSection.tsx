/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { QrCode, Phone, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export default function QRCodeSection() {
  return (
    <section
      id="qrcode"
      className="py-24 bg-luxury-bg dark:bg-zinc-950 text-luxury-text dark:text-stone-300 transition-colors duration-300 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Grid Content Desk: Scan Benefits */}
          <div className="lg:col-span-7 space-y-6">
            <span className="font-mono text-xs tracking-[0.3em] text-gold font-bold uppercase block">
              Contactless Excellence
            </span>
            
            <h2 className="font-serif text-3xl sm:text-5xl font-bold uppercase tracking-tight text-primary dark:text-white leading-tight">
              Scan & Explore Our Digital Menu
            </h2>
            
            <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed max-w-2xl font-light">
              Arrived at Grand Flavors? Pull up your smartphone camera, aim at our elegant desk stand, and browse our real-time interactive seasonal specials, allergens information, and chef notes seamlessly.
            </p>

            {/* Core Benefits */}
            <div className="space-y-4 pt-4 max-w-lg">
              <div className="flex items-start space-x-3.5">
                <div className="text-emerald-500 shrink-0 mt-0.5">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-primary dark:text-white">✓ Contactless Table Menu</h4>
                  <p className="text-stone-500 text-xs font-light">Zero physical touching required. Safe, immaculate, and ultra-responsive.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="text-emerald-500 shrink-0 mt-0.5">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-primary dark:text-white">✓ Instant Table Ordering</h4>
                  <p className="text-stone-500 text-xs font-light">Prepare your favorite dishes inside your cart, then press send to directly alert our kitchen via WhatsApp.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="text-emerald-500 shrink-0 mt-0.5">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-primary dark:text-white">✓ Smart Daily Updates</h4>
                  <p className="text-stone-500 text-xs font-light">Dynamic price reductions, freshly harvested ingredients checklist, and limited catch-of-the-day specials.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Grid Content Desk: High-fidelity Desk Stand Mockup */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative p-8 bg-white dark:bg-zinc-900 border border-gold/30 shadow-2xl max-w-sm w-full text-center group">
              {/* Gold borders garnish */}
              <div className="absolute inset-2 border border-gold/15 pointer-events-none" />
              
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-black text-[9px] font-mono tracking-widest uppercase px-4 py-1 font-bold">
                Table Garnish Stand
              </div>

              <div className="pt-4 flex justify-center mb-6">
                <div className="w-10 h-10 border border-gold rounded-full flex items-center justify-center bg-gold/5">
                  <Sparkles className="w-5 h-5 text-gold" />
                </div>
              </div>

              <span className="font-serif text-lg font-bold tracking-wider text-primary dark:text-white uppercase block mb-1">
                Grand Flavors Menu
              </span>
              <span className="block text-[9px] tracking-widest font-mono text-stone-400 uppercase mb-6">
                Instant digital Access
              </span>

              {/* Handcrafted Highly Detailed SVG QR Code */}
              <div className="bg-stone-50 dark:bg-stone-950 p-6 border border-stone-200 dark:border-neutral-800 flex justify-center items-center max-w-[200px] mx-auto mb-6 group-hover:scale-102 transition-transform duration-300">
                <svg
                  viewBox="0 0 100 100"
                  className="w-36 h-36 text-primary dark:text-white stroke-current fill-none"
                  style={{ strokeWidth: 2, strokeLinecap: 'square' }}
                >
                  {/* Outer corner squares */}
                  <rect x="5" y="5" width="25" height="25" fill="none" strokeWidth={3} />
                  <rect x="11" y="11" width="13" height="13" fill="currentColor" />
                  
                  <rect x="70" y="5" width="25" height="25" fill="none" strokeWidth={3} />
                  <rect x="76" y="11" width="13" height="13" fill="currentColor" />
                  
                  <rect x="5" y="70" width="25" height="25" fill="none" strokeWidth={3} />
                  <rect x="11" y="76" width="13" height="13" fill="currentColor" />

                  {/* Alignment anchor */}
                  <rect x="74" y="74" width="10" height="10" fill="currentColor" />

                  {/* Abstract QR Grid Lanes */}
                  <path d="M 40,10 H 50 M 40,20 H 45 V 35 M 5,45 H 15 M 25,45 H 35 V 55 M 45,45 H 55 M 65,45 H 75 M 85,45 H 95" />
                  <path d="M 40,75 H 50 V 90 M 15,60 H 30 V 65 M 55,60 H 65 V 70 H 60 M 75,55 H 85 M 90,60 H 95" />
                  <path d="M 45,5 Q 50,20 55,5 M 40,30 H 60 v 5 M 80,35 H 90 Q 95,20 95,10" />
                  <path d="M 5,35 H 15 M 5,40 H 20 M 10,55 H 25 M 65,80 H 70 M 60,90 H 65" />
                  
                  {/* Decorative core brand signature dot in center */}
                  <circle cx="50" cy="50" r="5" className="fill-gold stroke-none" />
                </svg>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-mono tracking-widest text-gold font-bold uppercase block">
                  Scan camera App
                </span>
                <span className="text-[10px] text-stone-500 block">
                  Compatible with iPhone, iPad, & Android
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
