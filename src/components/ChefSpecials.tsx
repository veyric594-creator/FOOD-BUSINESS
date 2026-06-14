/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Flame, Star, Check } from 'lucide-react';
import { chefSpecials } from '../data';
import { MenuItem } from '../types';

interface ChefSpecialsProps {
  onAddToCart: (item: MenuItem) => void;
}

export default function ChefSpecials({ onAddToCart }: ChefSpecialsProps) {
  return (
    <section
      id="specials"
      className="py-24 bg-primary text-white overflow-hidden relative"
    >
      {/* Subtle Golden Geometric Flourish in Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 blur-[120px] rounded-full pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title Block */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="font-mono text-xs tracking-[0.3em] text-gold font-bold uppercase block mb-3">La Grande Carte</span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white">
            Chef's Signature Specials
          </h2>
          <div className="w-16 h-[2px] bg-gold mx-auto mt-6 mb-8" />
          <p className="text-stone-400 font-sans text-xs sm:text-sm tracking-widest uppercase">
            Rare gastronomic selections designed for gourmands with sensitive tastes.
          </p>
        </div>

        {/* Dynamic Alternating Showcasing Cards */}
        <div className="space-y-24">
          {chefSpecials.map((special, index) => {
            // Pack regular MenuItem data out of special structure for Cart operations
            const menuItem: MenuItem = {
              id: special.id,
              name: special.name,
              description: special.story,
              price: special.price,
              category: "Biryani", // fallback category matching type MenuCategory
              isVeg: false,
              isChefRecommended: true,
              image: special.image
            };

            const isEven = index % 2 === 0;

            return (
              <div
                key={special.id}
                id={`special-card-${special.id}`}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center`}
              >
                {/* Image Showcase */}
                <div className={`lg:col-span-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="relative group overflow-hidden border border-gold/20 shadow-2xl">
                    <img
                      src={special.image}
                      alt={special.name}
                      className="w-full h-[400px] object-cover object-center transform group-hover:scale-105 transition-all duration-700 ease-out"
                      referrerPolicy="no-referrer"
                    />
                    {/* Visual Gold Framing Overlay */}
                    <div className="absolute inset-x-4 inset-y-4 border border-gold/15 pointer-events-none" />
                    
                    {/* Price and Recommendation Tags */}
                    <div className="absolute top-6 left-6 bg-accent border border-gold/20 px-4 py-2 flex items-center space-x-1.5 shadow-md">
                      <Flame className="w-4 h-4 text-gold" />
                      <span className="text-[10px] tracking-widest uppercase text-white font-mono font-bold">Chef's Pick</span>
                    </div>

                    <div className="absolute bottom-6 right-6 bg-black/85 backdrop-blur-md border border-gold/30 px-5 py-2">
                      <span className="text-gold font-mono font-bold tracking-widest text-lg">${special.price.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Content Storytelling */}
                <div className={`lg:col-span-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="flex text-gold">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current text-gold" />
                      ))}
                    </div>
                    <span className="text-stone-400 font-mono text-xs">({special.rating.toFixed(1)} Rating)</span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-4xl text-white font-bold mb-6">
                    {special.name}
                  </h3>

                  <p className="text-stone-300 text-sm leading-relaxed mb-6 italic">
                    "{special.story}"
                  </p>

                  {/* Curated Ingredients List */}
                  <div className="mb-8">
                    <span className="block font-sans text-xs tracking-widest text-gold uppercase font-bold mb-3">Key Ingredients</span>
                    <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                      {special.ingredients.map((ing, i) => (
                        <div key={i} className="flex items-center space-x-2 text-stone-300 text-xs font-light">
                          <Check className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                          <span>{ing}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Add to order CTA */}
                  <button
                    id={`add-special-cart-${special.id}`}
                    onClick={() => onAddToCart(menuItem)}
                    className="px-8 py-3.5 bg-transparent border border-gold text-gold hover:bg-gold hover:text-black transition-all duration-300 font-bold uppercase tracking-[0.15em] text-xs cursor-pointer focus:outline-none"
                  >
                    Add to Chef Order
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
