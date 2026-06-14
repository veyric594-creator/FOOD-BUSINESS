/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter, Award, ArrowRight, Utensils, Check } from 'lucide-react';
import { restaurantDetails } from '../data';

interface FooterProps {
  onScrollToSection: (id: string) => void;
}

export default function Footer({ onScrollToSection }: FooterProps) {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setTimeout(() => {
        setEmail('');
      }, 2000);
    }
  };

  return (
    <footer
      id="main-footer"
      className="bg-primary text-stone-300 border-t border-gold/15 pt-20 pb-10 relative transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-stone-800/60 text-left">
          
          {/* Logo & Narrative Column */}
          <div className="lg:col-span-4 space-y-6">
            <button
              onClick={() => onScrollToSection('home')}
              className="flex items-center space-x-2 text-left focus:outline-none cursor-pointer"
            >
              <div className="w-10 h-10 border border-gold rounded-full flex items-center justify-center bg-black/40">
                <Utensils className="w-5 h-5 text-gold" />
              </div>
              <div>
                <span className="block font-serif text-2xl font-bold tracking-widest text-white">
                  {restaurantDetails.name}
                </span>
                <span className="block text-[9px] tracking-[0.25em] font-sans text-gold/85 uppercase">
                  Haute Cuisine
                </span>
              </div>
            </button>

            <p className="text-stone-400 text-xs sm:text-sm font-light leading-relaxed">
              Bespoke dining services designed for individuals with select taste palettes. Multi-cuisine expertise curated directly under Michelin criteria guidelines.
            </p>

            {/* Social handles links */}
            <div className="flex space-x-3 pt-2">
              <a
                href={restaurantDetails.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="p-2 border border-stone-800 hover:border-gold hover:text-gold rounded-full transition-all"
                title="Grand Flavors Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={restaurantDetails.socials.facebook}
                target="_blank"
                rel="noreferrer"
                className="p-2 border border-stone-800 hover:border-gold hover:text-gold rounded-full transition-all"
                title="Grand Flavors Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={restaurantDetails.socials.twitter}
                target="_blank"
                rel="noreferrer"
                className="p-2 border border-stone-800 hover:border-gold hover:text-gold rounded-full transition-all"
                title="Grand Flavors Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick links navigation deck */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Navigation
            </h4>
            <div className="flex flex-col space-y-3.5 text-xs sm:text-sm font-light">
              <button
                onClick={() => onScrollToSection('home')}
                className="text-stone-400 hover:text-gold text-left cursor-pointer transition-colors"
              >
                 Welcome Home
              </button>
              <button
                onClick={() => onScrollToSection('about')}
                className="text-stone-400 hover:text-gold text-left cursor-pointer transition-colors"
              >
                 Chef Philosophy
              </button>
              <button
                onClick={() => onScrollToSection('specials')}
                className="text-stone-400 hover:text-gold text-left cursor-pointer transition-colors"
              >
                Featured Specials
              </button>
              <button
                onClick={() => onScrollToSection('menu')}
                className="text-stone-400 hover:text-gold text-left cursor-pointer transition-colors"
              >
                 Interactive Menu
              </button>
              <button
                onClick={() => onScrollToSection('gallery')}
                className="text-stone-400 hover:text-gold text-left cursor-pointer transition-colors"
              >
                Impression Gallery
              </button>
            </div>
          </div>

          {/* Opening and business hours */}
          <div className="lg:col-span-3 space-y-6">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Dining Hours
            </h4>
            <div className="space-y-4 text-xs sm:text-sm font-light text-stone-450 text-[13px]">
              {restaurantDetails.openingHours.map((row, i) => (
                <div key={i} className="border-b border-stone-800/40 pb-2">
                  <span className="block font-medium text-stone-200">{row.days}</span>
                  <span className="block text-gold text-xs font-mono mt-1">{row.hours}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Dynamic Newsletter Subscription */}
          <div className="lg:col-span-3 space-y-6">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              The Club Bulletin
            </h4>
            <p className="text-stone-400 text-xs font-light leading-relaxed">
              Subscribe to receive private invitations to our seasonal wine tasting, truffle launch weekends, and holiday events.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2.5">
              <div className="relative">
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  placeholder="Insert secret email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-stone-800 focus:border-gold p-3 pr-11 text-xs text-white focus:outline-none transition-colors rounded-none placeholder:text-stone-650"
                />
                <button
                  id="submit-newsletter"
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-gold/15 text-gold cursor-pointer"
                  title="Subscribe to Newsletter club"
                >
                  {isSubscribed ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <ArrowRight className="w-3.5 h-3.5" />}
                </button>
              </div>

              {isSubscribed && (
                <span className="block text-[11px] text-emerald-400 font-mono">
                  ✓ Successfully subscribed to Club Bulletin!
                </span>
              )}
            </form>
          </div>

        </div>

        {/* Closing details column */}
        <div className="pt-10 flex flex-col sm:flex-row justify-between items-center text-stone-500 text-xs tracking-wide">
          
          {/* Copyright description */}
          <span className="text-center sm:text-left mb-4 sm:mb-0">
            © {new Date().getFullYear()} {restaurantDetails.name} haute Cuisine. All culinary rights reserved.
          </span>

          {/* Built badge credentials */}
          <div className="flex space-x-6">
            <span className="flex items-center space-x-1.5 font-mono text-[10px] text-stone-500 uppercase">
              <Award className="w-3.5 h-3.5 text-gold" />
              <span>Standard Michelin Compliance</span>
            </span>
            <span>-</span>
            <span className="font-mono text-[10px] text-stone-500 uppercase">
              Security Encrypted
            </span>
          </div>

        </div>
      </div>
    </footer>
  );
}
