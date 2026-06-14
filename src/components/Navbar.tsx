/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, Calendar, Sun, Moon, Utensils } from 'lucide-react';
import { restaurantDetails } from '../data';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  cartCount: number;
  onOpenCart: () => void;
  onScrollToSection: (id: string) => void;
}

export default function Navbar({
  isDarkMode,
  toggleTheme,
  cartCount,
  onOpenCart,
  onScrollToSection,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Monitor page scroll to apply luxury gold borders / glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About us', id: 'about' },
    { name: 'Specials', id: 'specials' },
    { name: 'Menu', id: 'menu' },
    { name: 'Gallery', id: 'gallery' },
    { name: 'Reviews', id: 'reviews' },
    { name: 'Location', id: 'location' }
  ];

  const handleLinkClick = (id: string) => {
    setIsOpen(false);
    onScrollToSection(id);
  };

  return (
    <nav
      id="main-navbar"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-primary/95 dark:bg-black/95 shadow-lg border-b border-gold/20'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo & Name */}
          <button
            id="brand-logo-btn"
            onClick={() => handleLinkClick('home')}
            className="flex items-center space-x-2 group cursor-pointer text-left focus:outline-none"
          >
            <div className="w-10 h-10 border border-gold rounded-full flex items-center justify-center bg-black/40 group-hover:bg-gold/10 transition-colors duration-300">
              <Utensils className="w-5 h-5 text-gold" />
            </div>
            <div>
              <span className="block font-serif text-xl sm:text-2xl font-bold tracking-widest text-white">
                {restaurantDetails.name}
              </span>
              <span className="block text-[8px] sm:text-[10px] tracking-[0.3em] font-sans text-gold/80 uppercase">
                Haute Cuisine
              </span>
            </div>
          </button>

          {/* Desktop Navigation Link Deck */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                id={`nav-${link.id}`}
                onClick={() => handleLinkClick(link.id)}
                className="text-xs tracking-widest text-slate-200 hover:text-gold uppercase font-semibold transition-colors duration-200 cursor-pointer focus:outline-none"
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Right Side Accessories: Theme Toggle, Shopping Cart, Table Booking CTA */}
          <div className="hidden md:flex items-center space-x-4">
            
            {/* Dark & Light Theme Switcher */}
            <button
              id="theme-toggler"
              onClick={toggleTheme}
              className="p-2 border border-slate-700 hover:border-gold hover:bg-gold/10 rounded-full transition-all duration-200 text-slate-300 cursor-pointer focus:outline-none"
              title={isDarkMode ? 'Luxury Cream Light' : 'Atmospheric Midnight'}
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-gold" /> : <Moon className="w-4 h-4 text-gold" />}
            </button>

            {/* Micro Shopping Basket */}
            <button
              id="cart-basket-btn"
              onClick={onOpenCart}
              className="p-2 border border-slate-700 hover:border-gold bg-black/20 hover:bg-gold/10 rounded-full text-slate-200 relative transition-all duration-200 cursor-pointer focus:outline-none"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-white text-[9px] font-mono font-bold rounded-full flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Instant VIP Seating Booking Button */}
            <button
              id="header-booking-cta"
              onClick={() => onScrollToSection('reservation')}
              className="px-5 py-2.5 border border-gold hover:bg-gold hover:text-black text-gold text-xs uppercase tracking-widest font-bold rounded-none transition-all duration-300 shadow-md shadow-gold/5 cursor-pointer focus:outline-none"
            >
              Reserve a Table
            </button>
          </div>

          {/* Mobile Actions: Cart Trigger, Menu Toggle */}
          <div className="flex items-center space-x-2 lg:hidden">
            {/* Mobile Theme Toggle */}
            <button
              id="mobile-theme-toggle"
              onClick={toggleTheme}
              className="p-1.5 border border-slate-700 hover:border-gold rounded-full text-slate-300 cursor-pointer focus:outline-none"
            >
              {isDarkMode ? <Sun className="w-3.5 h-3.5 text-gold" /> : <Moon className="w-3.5 h-3.5 text-gold" />}
            </button>

            {/* Mobile Shopping Bag Trigger */}
            <button
              id="mobile-cart-toggle"
              onClick={onOpenCart}
              className="p-1.5 border border-slate-700 hover:border-gold bg-black/20 text-slate-200 relative rounded-full cursor-pointer focus:outline-none"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-accent text-white text-[8px] font-mono rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Hamburger Trigger */}
            <button
              id="mobile-menu-trigger"
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 border border-slate-700 text-slate-200 rounded-full cursor-pointer hover:border-gold focus:outline-none"
            >
              {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Glassmorphic Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-nav-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-primary/95 border-b border-gold/10"
          >
            <div className="px-4 pt-2 pb-6 space-y-3">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  id={`mobile-nav-${link.id}`}
                  onClick={() => handleLinkClick(link.id)}
                  className="block w-full text-left py-2.5 px-4 text-sm font-semibold tracking-wider text-slate-200 hover:text-gold hover:bg-gold/5 uppercase border-l-2 border-transparent hover:border-gold transition-colors duration-200 focus:outline-none"
                >
                  {link.name}
                </button>
              ))}
              
              <div className="pt-4 border-t border-slate-800 flex flex-col space-y-3 px-4">
                <button
                  id="mobile-booking-drawer-cta"
                  onClick={() => handleLinkClick('reservation')}
                  className="w-full py-3 bg-gold hover:bg-gold/90 text-black text-center font-bold text-xs uppercase tracking-widest transition-colors duration-200"
                >
                  Book Instant Table
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
