/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, MouseEvent } from 'react';
import { ZoomIn, X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { galleryItems } from '../data';
import { GalleryItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';

export default function Gallery() {
  const [activeTab, setActiveTab] = useState<'All' | 'Interior' | 'Dishes' | 'Moments'>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Filter gallery items
  const filteredItems = galleryItems.filter((item) => {
    if (activeTab === 'All') return true;
    return item.category === activeTab;
  });

  const handleOpenLightbox = (item: GalleryItem) => {
    // Find the original index of the item inside the FILTERED menu
    const index = filteredItems.findIndex((fi) => fi.id === item.id);
    if (index !== -1) {
      setLightboxIndex(index);
    }
  };

  const handleCloseLightbox = () => {
    setLightboxIndex(null);
  };

  const handleNext = (e: MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev! + 1) % filteredItems.length);
    }
  };

  const handlePrev = (e: MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev! === 0 ? filteredItems.length - 1 : prev! - 1));
    }
  };

  return (
    <section
      id="gallery"
      className="py-24 bg-primary text-white overflow-hidden relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Block */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-mono text-xs tracking-[0.3em] text-gold font-bold uppercase block mb-3">Immersive Visuals</span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white">
            Grand Gallery of Impressions
          </h2>
          <div className="w-16 h-[2px] bg-gold mx-auto mt-6 mb-8" />
          <p className="text-stone-400 text-sm leading-relaxed font-light">
            Take a visual tour of our bespoke main salon design, tandoor bread-making highlights, and exquisite plates styled by Chef Anand.
          </p>
        </div>

        {/* Tab Selection Filter Line */}
        <div className="flex justify-center gap-3 mb-12 flex-wrap pb-2 border-b border-stone-800/60 max-w-lg mx-auto">
          {(['All', 'Interior', 'Dishes', 'Moments'] as const).map((tab) => (
            <button
              key={tab}
              id={`gallery-tab-${tab.toLowerCase()}`}
              onClick={() => {
                setActiveTab(tab);
                setLightboxIndex(null); // Prevent stales
              }}
              className={`px-5 py-2.5 text-xs font-semibold uppercase tracking-widest cursor-pointer transition-all duration-300 focus:outline-none ${
                activeTab === tab
                  ? 'text-gold border border-gold bg-gold/10 font-bold'
                  : 'text-stone-400 hover:text-white border border-transparent'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Masonry-Grid Layout Representation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                layout
                key={item.id}
                id={`gallery-masonry-item-${item.id}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35 }}
                className="relative group overflow-hidden border border-stone-800 bg-neutral-900 cursor-pointer shadow-md aspect-4/3"
                onClick={() => handleOpenLightbox(item)}
              >
                {/* Lazy-loaded Visual */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-all duration-700 ease-out grayscale group-hover:grayscale-0"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />

                {/* Ambient Golden Frame border inside on Hover */}
                <div className="absolute inset-x-3 inset-y-3 border border-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Hover overlay metadata */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="font-mono text-[9px] text-gold tracking-widest uppercase font-bold">
                      {item.category}
                    </span>
                    <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-white mt-1">
                      {item.title}
                    </h4>
                  </div>
                  <div className="absolute top-4 right-4 p-2 bg-black/45 border border-gold/20 text-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="w-3.5 h-3.5" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Rich Digital Lightbox Overlay modal */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <motion.div
              id="gallery-lightbox-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-md"
              onClick={handleCloseLightbox}
            >
              {/* Close Button Anchor */}
              <button
                id="close-lightbox-btn"
                onClick={handleCloseLightbox}
                className="absolute top-6 right-6 p-2 border border-stone-800 hover:border-gold rounded-full text-stone-300 hover:text-gold cursor-pointer z-50 focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Prev Arrow */}
              <button
                id="prev-lightbox-btn"
                onClick={handlePrev}
                className="absolute left-4 sm:left-8 p-3 border border-stone-800 hover:border-gold bg-black/45 rounded-full text-white hover:text-gold cursor-pointer z-50 focus:outline-none"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Content Photo View */}
              <motion.div
                key={lightboxIndex}
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                className="max-w-4xl w-full flex flex-col items-center justify-center relative z-40"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={filteredItems[lightboxIndex].image}
                  alt={filteredItems[lightboxIndex].title}
                  className="max-h-[75vh] w-auto object-contain border border-gold/10 shadow-2xl"
                  referrerPolicy="no-referrer"
                />
                
                {/* Photo Description Line */}
                <div className="text-center mt-5 bg-black/50 border border-stone-800 px-6 py-3.5 max-w-xl">
                  <span className="font-mono text-[9px] tracking-widest text-gold uppercase block mb-1">
                    {filteredItems[lightboxIndex].category} ( {lightboxIndex + 1} / {filteredItems.length} )
                  </span>
                  <p className="font-serif text-sm tracking-wide text-stone-200">
                    {filteredItems[lightboxIndex].title}
                  </p>
                </div>
              </motion.div>

              {/* Next Arrow */}
              <button
                id="next-lightbox-btn"
                onClick={handleNext}
                className="absolute right-4 sm:right-8 p-3 border border-stone-800 hover:border-gold bg-black/45 rounded-full text-white hover:text-gold cursor-pointer z-50 focus:outline-none"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
