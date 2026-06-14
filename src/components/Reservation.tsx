/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from 'react';
import { Calendar as CalendarIcon, Clock, Users, Check, AlertCircle, Trash2, ShieldCheck } from 'lucide-react';
import { Reservation } from '../types';
import { motion, AnimatePresence } from 'motion/react';

export default function ReservationSystem() {
  // Booking Form States
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('18:00'); // Default to 6:00 PM dinner
  const [guests, setGuests] = useState(2);
  const [specialRequests, setSpecialRequests] = useState('');

  // App States
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [lastBooking, setLastBooking] = useState<Reservation | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorText, setErrorText] = useState('');

  // Available Time Slots representation
  const timeSlots = [
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', // Lunch
    '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30' // Dinner
  ];

  // Load existing bookings from local storage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('grand_flavors_bookings');
      if (saved) {
        setReservations(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Could not load bookings", e);
    }
  }, []);

  // Save bookings to local storage
  const saveBookings = (updatedList: Reservation[]) => {
    setReservations(updatedList);
    try {
      localStorage.setItem('grand_flavors_bookings', JSON.stringify(updatedList));
    } catch (e) {
      console.error("Could not save bookings", e);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorText('');

    // Input Validations
    if (!name.trim()) {
      setErrorText('Please enter your full name for the reservation card.');
      return;
    }
    if (!phone.replace(/\D/g, '')) {
      setErrorText('Please enter a valid, reachable contact phone number.');
      return;
    }
    if (!date) {
      setErrorText('Please select your preferred lunch or dinner date.');
      return;
    }

    // Compose custom new reservation item
    const newBooking: Reservation = {
      id: "GF-" + Math.floor(100000 + Math.random() * 900000), // Random custom Booking ID
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      date,
      time,
      guests,
      specialRequests: specialRequests.trim(),
      createdAt: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }),
      status: 'Confirmed'
    };

    const newList = [newBooking, ...reservations];
    saveBookings(newList);

    // Track active booking context for visual completion cards
    setLastBooking(newBooking);
    setIsSuccess(true);

    // Reset inputs
    setName('');
    setPhone('');
    setEmail('');
    setDate('');
    setSpecialRequests('');
    setGuests(2);
  };

  const handleCancelBooking = (bookingID: string) => {
    if (window.confirm("Are you sure you want to cancel this booking table reservation?")) {
      const updated = reservations.filter((r) => r.id !== bookingID);
      saveBookings(updated);
      if (lastBooking?.id === bookingID) {
        setLastBooking(null);
        setIsSuccess(false);
      }
    }
  };

  return (
    <section
      id="reservation"
      className="py-24 bg-primary text-white relative transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-mono text-xs tracking-[0.3em] text-gold font-bold uppercase block mb-3">Table booking center</span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white animate-pulse">
            Secure Table Reservation
          </h2>
          <div className="w-16 h-[2px] bg-gold mx-auto mt-6 mb-8" />
          <p className="text-stone-400 text-sm leading-relaxed font-light">
            Each seat represents a bespoke sensory dining opportunity. Lock in your preferred calendar date and time slot for instant verification.
          </p>
        </div>

        {/* Main interactive grid split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Grid: Booking Form / Success receipt card */}
          <div className="lg:col-span-7 bg-neutral-900 border border-gold/15 p-6 sm:p-10 shadow-2xl relative">
            <div className="absolute top-0 left-0 w-2 h-full bg-gold" />

            <AnimatePresence mode="wait">
              {isSuccess && lastBooking ? (
                /* Success Receipt Visual Frame */
                <motion.div
                  key="booking-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="space-y-6 text-center py-6"
                >
                  <div className="w-16 h-16 bg-emerald-600/15 border border-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-emerald-500" />
                  </div>
                  
                  <span className="font-mono text-xs tracking-widest text-gold uppercase font-bold block">
                    Reservation Secured!
                  </span>

                  <h3 className="font-serif text-2xl sm:text-3.5xl font-bold text-white uppercase">
                    Receipt ID: {lastBooking.id}
                  </h3>

                  <div className="p-6 bg-white/5 border border-stone-800 text-left max-w-md mx-auto space-y-3.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-stone-400 font-mono tracking-wider">GUEST NAME:</span>
                      <span className="font-mono font-bold text-white uppercase">{lastBooking.name}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-stone-400 font-mono tracking-wider">SEATS COUNT:</span>
                      <span className="font-mono font-bold text-gold">{lastBooking.guests} Guests</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-stone-400 font-mono tracking-wider">DATE & TIMING:</span>
                      <span className="font-mono font-bold text-white">{lastBooking.date} • {lastBooking.time}</span>
                    </div>
                    {lastBooking.specialRequests && (
                      <div className="pt-2.5 border-t border-stone-800 text-xs">
                        <span className="text-stone-400 block font-mono tracking-wider mb-1">CHEF REQUEST:</span>
                        <p className="text-stone-300 italic">"{lastBooking.specialRequests}"</p>
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-stone-400 max-w-sm mx-auto leading-relaxed font-light">
                    An automated confirmation card has been configured to your contact details. Please arrive 10 minutes prior to your booking. We look forward to serving you!
                  </p>

                  <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
                    <button
                      id="book-another-table-btn"
                      onClick={() => setIsSuccess(false)}
                      className="px-6 py-2.5 border border-stone-700 hover:border-gold text-white hover:text-gold text-xs uppercase tracking-widest font-bold cursor-pointer transition-colors"
                    >
                      Book Another Table
                    </button>
                    <button
                      id="cancel-just-made-btn"
                      onClick={() => handleCancelBooking(lastBooking.id)}
                      className="px-6 py-2.5 bg-accent/20 hover:bg-accent text-white text-xs uppercase tracking-widest font-bold cursor-pointer transition-colors"
                    >
                      Cancel Reservation
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* Primary Reservation Intake form */
                <motion.form
                  key="booking-form"
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <h3 className="font-serif text-xl sm:text-2xl font-bold uppercase text-white tracking-wide border-b border-stone-800 pb-3">
                    VIP Seating Details
                  </h3>

                  {errorText && (
                    <div className="p-3 bg-accent/15 border border-accent text-accent text-xs flex items-center space-x-2 rounded-none">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorText}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Customer Full Name */}
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400">
                        Your Full Name *
                      </label>
                      <input
                        id="booking-name"
                        type="text"
                        required
                        placeholder="e.g. Victoria Montgomery"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-white/5 border border-stone-800 focus:border-gold p-3 text-xs sm:text-sm text-white focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Email Contact info */}
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400">
                        Your Email Address
                      </label>
                      <input
                        id="booking-email"
                        type="email"
                        placeholder="e.g. victoria@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-white/5 border border-stone-800 focus:border-gold p-3 text-xs sm:text-sm text-white focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Contact Phone details */}
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400">
                        Contact Mobile Phone *
                      </label>
                      <input
                        id="booking-phone"
                        type="tel"
                        required
                        placeholder="e.g. +1 (555) 829-1029"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-white/5 border border-stone-800 focus:border-gold p-3 text-xs sm:text-sm text-white focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Sizing Guests count drop list */}
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400">
                        Total Table Guests Count
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gold">
                          <Users className="w-3.5 h-3.5" />
                        </span>
                        <select
                          id="booking-guests"
                          value={guests}
                          onChange={(e) => setGuests(Number(e.target.value))}
                          className="w-full bg-zinc-950 border border-stone-800 focus:border-gold p-3 pl-10 text-xs sm:text-sm text-white focus:outline-none transition-colors appearance-none cursor-pointer"
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                            <option key={num} value={num}>
                              {num} {num === 1 ? 'Guest Individual' : 'Guests Seating'}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Date picker */}
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400">
                        Reserve Dinner Date *
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gold">
                          <CalendarIcon className="w-3.5 h-3.5" />
                        </span>
                        <input
                          id="booking-date"
                          type="date"
                          required
                          min={new Date().toISOString().split('T')[0]} // Block previous dates
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="w-full bg-white/5 border border-stone-800 focus:border-gold p-3 pl-10 text-xs sm:text-sm text-white focus:outline-none transition-colors cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* Time slot picker */}
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400">
                        Reserve Time Slot
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gold">
                          <Clock className="w-3.5 h-3.5" />
                        </span>
                        <select
                          id="booking-time"
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                          className="w-full bg-zinc-950 border border-stone-800 focus:border-gold p-3 pl-10 text-xs sm:text-sm text-white focus:outline-none transition-colors appearance-none cursor-pointer"
                        >
                          {timeSlots.map((slot) => {
                            const hr = parseInt(slot.split(':')[0]);
                            const isAm = hr < 12;
                            const label = hr > 12 ? `${hr - 12}:${slot.split(':')[1]} PM` : hr === 12 ? `12:${slot.split(':')[1]} PM` : `${hr}:${slot.split(':')[1]} AM`;
                            return (
                              <option key={slot} value={slot}>
                                {label} {hr < 15 ? '(Lunch)' : '(Dinner)'}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400">
                      Celebration Notes or Special Chef Requests
                    </label>
                    <textarea
                      id="booking-requests"
                      rows={3}
                      placeholder="e.g. Wedding anniversary. Prefer a quiet window-side table if possible..."
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      className="w-full bg-white/5 border border-stone-800 focus:border-gold p-3 text-xs sm:text-sm text-white focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* Anti-spam safety disclosure badge */}
                  <div className="flex items-start space-x-2 pt-2 text-stone-500">
                    <ShieldCheck className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                    <span className="text-[10px] sm:text-xs leading-relaxed">
                      We protect your confidential privacy. Grand Flavors uses guest information strictly to confirm reservation statuses. No spam, guaranteed.
                    </span>
                  </div>

                  {/* Primary CTA Booking Button */}
                  <button
                    id="submit-booking-btn"
                    type="submit"
                    className="w-full py-4 bg-gold hover:bg-gold/95 text-black font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-md shadow-gold/10 cursor-pointer focus:outline-none"
                  >
                    Confirm Table Reservation
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Right Grid: Active Reservations history list */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="bg-stone-900/60 border border-stone-800 p-6 sm:p-8 flex-grow flex flex-col justify-between h-full">
              <div>
                <h3 className="font-serif text-lg font-bold text-white uppercase tracking-wider mb-1">
                  Active Booking Registry
                </h3>
                <span className="block font-mono text-[9px] text-gold tracking-widest uppercase mb-4">
                  Stored securely on your device
                </span>

                {reservations.length > 0 ? (
                  <div className="space-y-4 max-h-[360px] overflow-y-auto pr-2 no-scrollbar">
                    {reservations.map((booking) => (
                      <div
                        key={booking.id}
                        id={`listed-booking-${booking.id}`}
                        className="p-4 bg-black/45 border border-stone-800 hover:border-gold/30 transition-all duration-200 flex justify-between items-start"
                      >
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-serif text-sm font-bold text-white tracking-wide">
                              ID: {booking.id}
                            </span>
                            <span className="bg-emerald-600/10 text-emerald-500 border border-emerald-500/20 text-[8px] font-mono font-bold px-1.5 py-0.5">
                              {booking.status}
                            </span>
                          </div>
                          
                          <div className="text-[11px] text-stone-400 space-y-0.5 mt-2">
                            <p>👤 Name: {booking.name}</p>
                            <p>📅 Date: {booking.date} • {booking.time}</p>
                            <p>👥 Guests count: {booking.guests} Seats</p>
                          </div>
                        </div>

                        {/* Cancellation Trigger */}
                        <button
                          id={`cancel-booking-btn-${booking.id}`}
                          onClick={() => handleCancelBooking(booking.id)}
                          className="p-1 text-stone-500 hover:text-accent transition-colors"
                          title="Cancel Reservation receipt"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  /* History Fallback State */
                  <div className="text-center py-16 text-stone-600 dark:text-stone-500">
                    <Users className="w-10 h-10 mx-auto text-neutral-800 mb-3" />
                    <p className="font-serif text-xs uppercase font-bold tracking-widest">No Active Bookings</p>
                    <p className="text-[11px] max-w-xs mx-auto mt-1">If you make a reservation inside the form, they will instantly display listed here.</p>
                  </div>
                )}
              </div>

              {/* Opening Standards panel */}
              <div className="pt-6 border-t border-stone-800/80 mt-6 space-y-3.5">
                <span className="block font-sans text-xs tracking-widest text-gold uppercase font-bold text-center lg:text-left">
                  Corporate & Event inquiries
                </span>
                <p className="text-stone-400 text-xs leading-relaxed text-center lg:text-left font-light">
                  For parties exceeding 10 guests or custom private hall buyouts, please initiate contact directly with our Concierge Desk via <a href="mailto:reservations@grandflavors.com" className="text-gold underline">reservations@grandflavors.com</a>.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
