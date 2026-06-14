/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, Award } from 'lucide-react';
import { reviews } from '../data';
import { motion, AnimatePresence } from 'motion/react';

export default function Reviews() {
  const [index, setIndex] = useState(0);

  // Auto scroll testimonials every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % reviews.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % reviews.length);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  return (
    <section
      id="reviews"
      className="py-24 bg-luxury-bg dark:bg-zinc-950 text-luxury-text dark:text-stone-300 transition-colors duration-300 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Title Block */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-mono text-xs tracking-[0.3em] text-gold font-bold uppercase block mb-3">Honorable Mentions</span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold uppercase tracking-tight text-primary dark:text-white">
            Guest Testimonials
          </h2>
          <div className="w-16 h-[2px] bg-gold mx-auto mt-6 mb-8" />
          <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed font-light">
            We are consistently ranked as one of the premier luxury multi-cuisine destinations in the city, thanks to our commitment to gastronomic excellence.
          </p>
        </div>

        {/* Dynamic Dual Grid Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Grid Column: Luxury rating summary metadata card */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left bg-white dark:bg-zinc-900 border border-gold/20 p-8 shadow-md">
            <Award className="w-10 h-10 text-gold mb-4" />
            <span className="block text-5xl font-serif font-black text-primary dark:text-white mb-2">4.9+ ★</span>
            <div className="flex text-gold mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current text-gold" />
              ))}
            </div>
            <h4 className="font-serif text-lg font-bold text-primary dark:text-white uppercase mb-2">Google Excellence Award</h4>
            <p className="text-stone-500 text-xs font-light leading-relaxed">
              Based on over 1,200 verified guest reviews on Google, OpenTable, and TripAdvisor. Recognized as top 1% globally.
            </p>
          </div>

          {/* Right Grid Column: Testimonials Slider */}
          <div className="lg:col-span-8 relative min-h-[300px] flex flex-col justify-between">
            <div className="absolute top-0 left-0 text-gold/15 pointer-events-none">
              <Quote className="w-24 h-24 stroke-[1]" />
            </div>

            {/* Slide Body */}
            <div className="relative z-10 pt-8 pl-0 md:pl-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-6"
                >
                  <p className="font-serif text-lg sm:text-2xl italic leading-relaxed text-stone-700 dark:text-stone-200">
                    "{reviews[index].comment}"
                  </p>
                  
                  <div className="flex items-center space-x-4">
                    {/* Circle avatar with customer initials */}
                    <div className="w-12 h-12 rounded-full border border-gold/40 flex items-center justify-center bg-black text-gold font-mono text-sm font-bold">
                      {reviews[index].name.split(' ').map(n => n[0]).join('')}
                    </div>

                    <div>
                      <span className="block font-serif text-sm sm:text-base font-bold text-primary dark:text-white tracking-wide">
                        {reviews[index].name}
                      </span>
                      {reviews[index].role && (
                        <span className="block text-stone-500 text-[10px] sm:text-xs font-mono uppercase tracking-wider mt-0.5">
                          {reviews[index].role}
                        </span>
                      )}
                      <span className="block text-stone-400 text-[9px] uppercase font-mono tracking-widest mt-0.5">
                        Reviewed: {reviews[index].date}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Slider Navigation arrows and indicators */}
            <div className="flex items-center justify-between mt-12 pt-6 border-t border-stone-200 dark:border-stone-800 md:ml-12">
              
              {/* Bullets indicator */}
              <div className="flex space-x-2">
                {reviews.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === i ? 'bg-gold w-6' : 'bg-stone-300 dark:bg-stone-700'
                    }`}
                    title={`Review slide ${i + 1}`}
                  />
                ))}
              </div>

              {/* Prev/Next arrows */}
              <div className="flex space-x-2">
                <button
                  id="prev-review-btn"
                  onClick={handlePrev}
                  className="p-2 border border-stone-200 dark:border-stone-800 hover:border-gold rounded-full text-stone-500 hover:text-gold cursor-pointer focus:outline-none transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  id="next-review-btn"
                  onClick={handleNext}
                  className="p-2 border border-stone-200 dark:border-stone-800 hover:border-gold rounded-full text-stone-500 hover:text-gold cursor-pointer focus:outline-none transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
