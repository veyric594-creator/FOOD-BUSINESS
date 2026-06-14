/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Phone, Mail, MapPin, Clock, Share2 } from 'lucide-react';
import { restaurantDetails } from '../data';

export default function ContactAndLocation() {
  return (
    <section
      id="location"
      className="py-24 bg-primary text-white overflow-hidden transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title block */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-mono text-xs tracking-[0.3em] text-gold font-bold uppercase block mb-3">Visit our Salon</span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white animate-pulse">
            Location & Contact
          </h2>
          <div className="w-16 h-[2px] bg-gold mx-auto mt-6 mb-8" />
          <p className="text-stone-450 text-sm leading-relaxed max-w-lg mx-auto font-light">
            Conveniently situated in the heartbeat of the Luxury District. Reach out to our concierge desk to organize your private event seating.
          </p>
        </div>

        {/* Dual Column grid display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Grid: Contact Information details card */}
          <div className="lg:col-span-5 bg-neutral-900 border border-stone-800 p-8 sm:p-10 flex flex-col justify-between shadow-2xl relative">
            {/* Corner visual border garnishment */}
            <div className="absolute inset-2 border border-stone-800 pointer-events-none" />

            <div className="space-y-8 relative z-10 text-left">
              <span className="font-serif text-2xl font-bold uppercase text-gold tracking-wide block border-b border-stone-800 pb-3">
                Concierge Desk
              </span>

              {/* Core Contact info cards desk */}
              <div className="space-y-6">
                
                {/* Physical address */}
                <div className="flex items-start space-x-4">
                  <div className="p-2.5 bg-gold/10 text-gold rounded-full shrink-0">
                    <MapPin className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="font-mono text-[10px] tracking-widest uppercase text-stone-400 font-bold mb-1">
                      Our Location Address
                    </h4>
                    <p className="text-stone-200 text-sm leading-relaxed font-light font-sans">
                      {restaurantDetails.address}
                    </p>
                  </div>
                </div>

                {/* Direct Phone line */}
                <div className="flex items-start space-x-4">
                  <div className="p-2.5 bg-gold/10 text-gold rounded-full shrink-0">
                    <Phone className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="font-mono text-[10px] tracking-widest uppercase text-stone-400 font-bold mb-1">
                      Direct phone Line
                    </h4>
                    <a
                      href={`tel:${restaurantDetails.phone}`}
                      className="text-stone-200 hover:text-gold text-sm font-light font-mono transition-colors"
                    >
                      {restaurantDetails.phone}
                    </a>
                  </div>
                </div>

                {/* Concierge Email */}
                <div className="flex items-start space-x-4">
                  <div className="p-2.5 bg-gold/10 text-gold rounded-full shrink-0">
                    <Mail className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="font-mono text-[10px] tracking-widest uppercase text-stone-400 font-bold mb-1">
                      Mail Inquiries
                    </h4>
                    <a
                      href={`mailto:${restaurantDetails.email}`}
                      className="text-stone-200 hover:text-gold text-sm font-light font-mono transition-colors break-words"
                    >
                      {restaurantDetails.email}
                    </a>
                  </div>
                </div>

              </div>

              {/* Social Channels card */}
              <div className="pt-6 border-t border-stone-800">
                <span className="font-mono text-[10px] tracking-widest uppercase text-stone-400 font-bold block mb-3">
                  Connect on Social
                </span>
                <div className="flex flex-wrap gap-2.5 text-xs text-stone-400">
                  <a
                    href={restaurantDetails.socials.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-1.5 border border-stone-800 hover:border-gold hover:text-gold tracking-wide transition-colors"
                  >
                     Instagram
                  </a>
                  <a
                    href={restaurantDetails.socials.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-1.5 border border-stone-800 hover:border-gold hover:text-gold tracking-wide transition-colors"
                  >
                     Facebook
                  </a>
                  <a
                    href={restaurantDetails.socials.twitter}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-1.5 border border-stone-800 hover:border-gold hover:text-gold tracking-wide transition-colors"
                  >
                     Twitter
                  </a>
                </div>
              </div>
            </div>

            {/* Operating standard statement */}
            <div className="relative z-10 pt-6 mt-8 border-t border-stone-850 flex items-center space-x-2 text-stone-500">
              <Clock className="w-4 h-4 text-gold shrink-0" />
              <span className="text-[10px] sm:text-xs">Valet parking services operates daily.</span>
            </div>
          </div>

          {/* Right Grid: Elegant map embed */}
          <div className="lg:col-span-7 bg-black min-h-[350px] relative border border-stone-800">
            {/* Interactive maps placeholder using responsive map framework standard iframe layout */}
            <iframe
              id="google-maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.142294584014!2d-73.98731968459375!3d40.75889497932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1624564883461!5m2!1sen!2sus"
              className="w-full h-full min-h-[350px] border-0 filter invert contrast-[1.1] grayscale hover:grayscale-0 rounded-none transition-all duration-700"
              allowFullScreen={false}
              loading="lazy"
              title="Grand Flavors Google Maps Location"
            />
          </div>

        </div>

      </div>
    </section>
  );
}
