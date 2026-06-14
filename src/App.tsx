/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import ChefSpecials from './components/ChefSpecials';
import DigitalMenu from './components/DigitalMenu';
import Gallery from './components/Gallery';
import Reviews from './components/Reviews';
import ReservationSystem from './components/Reservation';
import ContactAndLocation from './components/ContactAndLocation';
import QRCodeSection from './components/QRCodeSection';
import Footer from './components/Footer';
import FloatingWidgets from './components/FloatingWidgets';
import CartDrawer from './components/CartDrawer';
import { MenuItem, CartItem } from './types';
import { Utensils } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  // Global States
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Default to midnight dark mode on fresh session, matches luxury brand Guidelines
    const saved = localStorage.getItem('gf_theme');
    return saved ? saved === 'dark' : true;
  });

  // Loading animation simulation for optimal SEO landing feel
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Theme Synchronizer
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('gf_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('gf_theme', 'light');
    }
  }, [isDarkMode]);

  // Load cart data from local storage on load
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('grand_flavors_cart');
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    } catch {
      console.warn("Could not load cart cache");
    }
  }, []);

  // Sync cart contents with localStorage cache
  const updateCartAndPersist = (newCart: CartItem[]) => {
    setCartItems(newCart);
    try {
      localStorage.setItem('grand_flavors_cart', JSON.stringify(newCart));
    } catch {
      console.warn("Could not cache cart items");
    }
  };

  // 1. Add to Order Cart Action
  const handleAddToCart = (item: MenuItem) => {
    const existingIndex = cartItems.findIndex((ci) => ci.item.id === item.id);
    if (existingIndex !== -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += 1;
      updateCartAndPersist(updated);
    } else {
      updateCartAndPersist([...cartItems, { item, quantity: 1 }]);
    }
    // Subtle quality of life UX: sliding open the cart automatically
    setIsCartOpen(true);
  };

  // 2. Adjust Item Quantity Action
  const handleUpdateQuantity = (id: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(id);
      return;
    }
    const updated = cartItems.map((ci) => {
      if (ci.item.id === id) {
        return { ...ci, quantity: newQty };
      }
      return ci;
    });
    updateCartAndPersist(updated);
  };

  // 3. Remove Item Action
  const handleRemoveItem = (id: string) => {
    const updated = cartItems.filter((ci) => ci.item.id !== id);
    updateCartAndPersist(updated);
  };

  // 4. Reset Cart
  const handleClearCart = () => {
    updateCartAndPersist([]);
  };

  // 5. Navigate / Anchor Scrolling Action
  const handleScrollToSection = (id: string) => {
    const targetElement = document.getElementById(id);
    if (targetElement) {
      // Offset navbar height carefully for precise layout placements
      const navbarOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - navbarOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const totalCartCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <div className="min-h-screen bg-luxury-bg dark:bg-zinc-950 transition-colors duration-500 overflow-x-hidden selection:bg-gold selection:text-black">
      
      {/* Luxury Brand preloader overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            id="brand-loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-primary z-50 flex flex-col items-center justify-center p-4 text-center"
          >
            <div className="w-16 h-16 border-2 border-gold/20 border-t-gold rounded-full animate-spin flex items-center justify-center mb-6">
              <Utensils className="w-7 h-7 text-gold" />
            </div>
            
            <motion.span
              initial={{ letterSpacing: '0.15em', opacity: 0 }}
              animate={{ letterSpacing: '0.3em', opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="font-serif text-2xl font-black text-white uppercase tracking-widest block"
            >
              GRAND FLAVORS
            </motion.span>
            
            <span className="font-mono text-[9px] tracking-[0.25em] text-gold uppercase mt-2">
              Haute Cuisine Experience
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {!isLoading && (
        <>
          {/* Sticky Navigation Header */}
          <Navbar
            isDarkMode={isDarkMode}
            toggleTheme={() => setIsDarkMode(!isDarkMode)}
            cartCount={totalCartCount}
            onOpenCart={() => setIsCartOpen(true)}
            onScrollToSection={handleScrollToSection}
          />

          {/* Master Landing Panels */}
          <main id="main-content-flow">
            {/* 1. Immersive Hero Landing */}
            <Hero onScrollToSection={handleScrollToSection} />

            {/* 2. Brand Legacy Story splits */}
            <About />

            {/* 3. Chef Specials signatures */}
            <ChefSpecials onAddToCart={handleAddToCart} />

            {/* 4. Interactive Digital Menu list */}
            <DigitalMenu onAddToCart={handleAddToCart} />

            {/* 5. Contactless QR Desk Mockup */}
            <QRCodeSection />

            {/* 6. Dynamic masonry gallery lightbox */}
            <Gallery />

            {/* 7. Professional customer evaluations */}
            <Reviews />

            {/* 8. Verified reservation Booking Sheets */}
            <ReservationSystem />

            {/* 9. Location embeds and operational schedules */}
            <ContactAndLocation />
          </main>

          {/* Luxury Brand Footer */}
          <Footer onScrollToSection={handleScrollToSection} />

          {/* Sliding Cart items Drawer */}
          <CartDrawer
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onClearCart={handleClearCart}
          />

          {/* Floating actions (Back To Top, WhatsApp speed inquiries) */}
          <FloatingWidgets onScrollToSection={handleScrollToSection} />
        </>
      )}
    </div>
  );
}
