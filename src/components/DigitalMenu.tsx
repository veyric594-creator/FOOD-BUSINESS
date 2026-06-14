/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { Search, Filter, ShoppingBag, Leaf, Sparkles, Check } from 'lucide-react';
import { allMenuItems } from '../data';
import { MenuItem, MenuCategory } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface DigitalMenuProps {
  onAddToCart: (item: MenuItem) => void;
}

export default function DigitalMenu({ onAddToCart }: DigitalMenuProps) {
  // Navigation categories
  const categories: MenuCategory[] = [
    'Starters',
    'South Indian',
    'North Indian',
    'Chinese',
    'Biryani',
    'Desserts',
    'Beverages'
  ];

  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('Starters');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterVegOnly, setFilterVegOnly] = useState(false);
  const [filterNonVegOnly, setFilterNonVegOnly] = useState(false);

  // Micro layout animation states to track recently added items
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  // Trigger rapid cart notification click
  const handleAddToCartClick = (item: MenuItem) => {
    onAddToCart(item);
    setRecentlyAddedId(item.id);
    setTimeout(() => {
      setRecentlyAddedId(null);
    }, 1200);
  };

  // Perform search & filters memoized
  const filteredItems = useMemo(() => {
    return allMenuItems.filter((item) => {
      // 1. Category Filter of the Tab
      const matchesCategory = item.category === selectedCategory;

      // 2. Search Query Matching
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());

      // 3. Dietary Veg/Non-Veg Matching
      let matchesDietary = true;
      if (filterVegOnly) {
        matchesDietary = item.isVeg === true;
      } else if (filterNonVegOnly) {
        matchesDietary = item.isVeg === false;
      }

      return matchesCategory && matchesSearch && matchesDietary;
    });
  }, [selectedCategory, searchQuery, filterVegOnly, filterNonVegOnly]);

  const handleToggleVeg = () => {
    setFilterVegOnly(!filterVegOnly);
    setFilterNonVegOnly(false);
  };

  const handleToggleNonVeg = () => {
    setFilterNonVegOnly(!filterNonVegOnly);
    setFilterVegOnly(false);
  };

  return (
    <section
      id="menu"
      className="py-24 bg-luxury-bg dark:bg-zinc-900 text-luxury-text dark:text-stone-300 transition-colors duration-300 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-mono text-xs tracking-[0.3em] text-gold font-bold uppercase block mb-3">Grand flavors Culinary Room</span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold uppercase text-primary dark:text-white tracking-tight">
            Our Interactive digital Menu
          </h2>
          <div className="w-16 h-[2px] bg-gold mx-auto mt-6 mb-8" />
          <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed font-light">
            Browse through our multi-cuisine menu options, curated with hand-selected ingredients and cooked fresh upon your command. Add to cart to prepare a custom WhatsApp order.
          </p>
        </div>

        {/* Search, Filter Deck */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center mb-10 pb-6 border-b border-stone-200 dark:border-stone-800">
          
          {/* Elegant Search Bar */}
          <div className="lg:col-span-6 relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400">
              <Search className="w-4 h-4" />
            </span>
            <input
              id="menu-search-input"
              type="text"
              placeholder="Search for biryanis, paneer cookings, or custom desserts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 bg-white dark:bg-neutral-800 border border-stone-200 dark:border-neutral-700 focus:border-gold hover:border-gold text-xs sm:text-sm text-primary dark:text-white focus:outline-none transition-colors duration-200 rounded-none shadow-sm"
            />
          </div>

          {/* Sizing Filter Buttons */}
          <div className="lg:col-span-6 flex flex-wrap justify-end gap-3">
            
            {/* Vegetarian Tag Filter */}
            <button
              id="filter-veg-btn"
              onClick={handleToggleVeg}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-200 flex items-center space-x-2 border cursor-pointer focus:outline-none ${
                filterVegOnly
                  ? 'bg-emerald-600/10 border-emerald-500 text-emerald-600 dark:text-emerald-400'
                  : 'bg-white dark:bg-neutral-800 border-stone-200 dark:border-neutral-700 text-stone-500 dark:text-stone-400 hover:border-gold'
              }`}
            >
              <div className="w-3.5 h-3.5 border border-emerald-500 p-0.5 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              </div>
              <span>Vegetarian Only</span>
            </button>

            {/* Non-Vegetarian Tag Filter */}
            <button
              id="filter-nonveg-btn"
              onClick={handleToggleNonVeg}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-200 flex items-center space-x-2 border cursor-pointer focus:outline-none ${
                filterNonVegOnly
                  ? 'bg-rose-600/10 border-rose-500 text-rose-600 dark:text-rose-400'
                  : 'bg-white dark:bg-neutral-800 border-stone-200 dark:border-neutral-700 text-stone-500 dark:text-stone-400 hover:border-gold'
              }`}
            >
              <div className="w-3.5 h-3.5 border border-rose-500 p-0.5 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-rose-500" />
              </div>
              <span>Non-Vegetarian Only</span>
            </button>

            {/* Reset Filter Action */}
            {(filterVegOnly || filterNonVegOnly || searchQuery) && (
              <button
                id="filter-reset-btn"
                onClick={() => {
                  setFilterVegOnly(false);
                  setFilterNonVegOnly(false);
                  setSearchQuery('');
                }}
                className="px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-accent border border-accent/20 hover:bg-accent hover:text-white transition-all duration-200 cursor-pointer focus:outline-none"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Categories Tab Deck */}
        <div className="flex overflow-x-auto no-scrollbar gap-2 mb-12 pb-2 mask-grad justify-start md:justify-center border-b border-stone-200 dark:border-stone-800">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`tab-category-${cat.replace(/\s+/g, '-').toLowerCase()}`}
              onClick={() => setSelectedCategory(cat)}
              className={`shrink-0 px-6 py-4 text-xs sm:text-sm font-semibold tracking-widest uppercase border-b-2 cursor-pointer transition-all duration-300 focus:outline-none ${
                selectedCategory === cat
                  ? 'border-gold text-gold font-bold bg-gold/5'
                  : 'border-transparent text-stone-500 hover:text-primary dark:hover:text-white hover:border-stone-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Grid Deck */}
        <div className="relative min-h-[300px]">
          <AnimatePresence mode="wait">
            {filteredItems.length > 0 ? (
              <motion.div
                key={selectedCategory + filterVegOnly + filterNonVegOnly + searchQuery}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    id={`menu-item-card-${item.id}`}
                    className="bg-white dark:bg-neutral-800 border border-stone-200 dark:border-neutral-700/60 overflow-hidden flex flex-col justify-between group shadow-sm hover:shadow-xl transition-all duration-300 hover:border-gold/30"
                  >
                    
                    {/* Visual Photo Block */}
                    <div className="relative overflow-hidden h-56 bg-stone-100">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-all duration-700 ease-out"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />

                      {/* Absolute Badges Block */}
                      <div className="absolute top-4 left-4 flex flex-col space-y-2">
                        {/* Veg / Non-Veg Standard Label Indicator */}
                        <div className="bg-white/90 dark:bg-black/85 backdrop-blur-sm p-1.5 flex items-center justify-center rounded-none shadow-sm">
                          {item.isVeg ? (
                            <div className="w-5 h-5 border-2 border-emerald-500 p-0.5 flex items-center justify-center" title="Vegetarian">
                              <div className="w-2 h-2 rounded-full bg-emerald-500" />
                            </div>
                          ) : (
                            <div className="w-5 h-5 border-2 border-rose-500 p-0.5 flex items-center justify-center" title="Non-Vegetarian">
                              <div className="w-2 h-2 bg-rose-500" />
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="absolute top-4 right-4 flex flex-col space-y-1.5 items-end">
                        {item.isPopular && (
                          <span className="px-3 py-1 bg-gold text-black text-[9px] font-bold uppercase tracking-wider shadow-sm flex items-center space-x-1">
                            <Sparkles className="w-3 h-3" />
                            <span>MUST TRY</span>
                          </span>
                        )}
                        {item.isChefRecommended && (
                          <span className="px-3 py-1 bg-accent text-white text-[9px] font-bold uppercase tracking-wider shadow-sm">
                            CHEF'S PICK
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Content Block */}
                    <div className="p-6 flex-grow flex flex-col justify-between">
                      <div>
                        {/* Heading & Price Container */}
                        <div className="flex justify-between items-start mb-3 gap-2">
                          <h4 className="font-serif text-lg sm:text-xl font-bold text-primary dark:text-white uppercase tracking-tight group-hover:text-gold transition-colors duration-200">
                            {item.name}
                          </h4>
                          <span className="font-mono text-base font-bold text-gold shrink-0">
                            ${item.price.toFixed(2)}
                          </span>
                        </div>

                        {/* Description */}
                        <p className="text-stone-500 dark:text-stone-400 text-xs sm:text-sm font-light leading-relaxed mb-6 line-clamp-3">
                          {item.description}
                        </p>
                      </div>

                      {/* Add directly to Menu Order Tray */}
                      <button
                        id={`add-order-${item.id}`}
                        onClick={() => handleAddToCartClick(item)}
                        className={`w-full py-3 text-xs uppercase tracking-widest font-bold flex items-center justify-center space-x-2 transition-all duration-300 rounded-none border focus:outline-none cursor-pointer ${
                          recentlyAddedId === item.id
                            ? 'bg-emerald-600 border-emerald-600 text-white'
                            : 'bg-primary dark:bg-neutral-900 hover:bg-gold hover:text-black hover:border-gold text-white border-neutral-700/80'
                        }`}
                      >
                        {recentlyAddedId === item.id ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Added to Bag!</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Order Online</span>
                          </>
                        )}
                      </button>
                    </div>

                  </div>
                ))}
              </motion.div>
            ) : (
              /* No matching items found fallback state */
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 px-4 bg-white dark:bg-neutral-800 border border-stone-200 dark:border-neutral-700 max-w-md mx-auto"
              >
                <div className="p-3 bg-red-650/10 text-gold rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <Filter className="w-5 h-5 text-gold" />
                </div>
                <h3 className="font-serif text-lg font-bold text-primary dark:text-white uppercase mb-2">No Items Match Search</h3>
                <p className="text-zinc-500 dark:text-stone-400 text-xs leading-relaxed mb-6">
                  We currently do not offer this choice under the selected "{selectedCategory}" tab. Try searching other categories or clearing filters.
                </p>
                <button
                  id="reset-filters-inside"
                  onClick={() => {
                    setFilterVegOnly(false);
                    setFilterNonVegOnly(false);
                    setSearchQuery('');
                  }}
                  className="px-6 py-2.5 bg-gold hover:bg-gold-light text-black text-xs font-bold uppercase tracking-widest cursor-pointer"
                >
                  Show All Items
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
