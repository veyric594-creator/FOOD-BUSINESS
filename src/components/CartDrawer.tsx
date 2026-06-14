/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, Send, Clock, Sparkles } from 'lucide-react';
import { CartItem } from '../types';
import { restaurantDetails } from '../data';
import { motion, AnimatePresence } from 'motion/react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  // Customer details for personalizing WhatsApp messages
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [errorField, setErrorField] = useState('');

  // Math totals
  const subtotal = cartItems.reduce((acc, curr) => acc + curr.item.price * curr.quantity, 0);
  const packagingFee = subtotal > 0 ? 3.00 : 0.00;
  const taxRate = 0.0825; // 8.25%
  const tax = subtotal * taxRate;
  const total = subtotal + packagingFee + tax;

  const handlePlaceOrder = (e: FormEvent) => {
    e.preventDefault();

    if (!customerName.trim()) {
      setErrorField('name');
      return;
    }
    if (!customerPhone.trim()) {
      setErrorField('phone');
      return;
    }
    setErrorField('');

    // Compile beautiful markdown message for WhatsApp API
    let orderDetailText = '';
    cartItems.forEach((item) => {
      orderDetailText += `• ${item.quantity}x _${item.item.name}_ ($${(item.item.price * item.quantity).toFixed(2)})\n`;
    });

    const formattedMessage = 
`👑 *GRAND FLAVORS — ONLINE ORDER*
━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 *CUSTOMER DETAILS*
• *Name:* ${customerName.trim()}
• *Phone:* ${customerPhone.trim()}

📦 *ORDER DETAIL*
${orderDetailText}
💵 *SUMMARY*
• *Subtotal:* $${subtotal.toFixed(2)}
• *Luxury Eco-Packaging:* $${packagingFee.toFixed(2)}
• *State Tax (8.25%):* $${tax.toFixed(2)}
• *TOTAL PAYABLE:* *$${total.toFixed(2)}*

✍️ *SPECIAL INSTRUCTIONS/PREFERENCES*
${specialInstructions.trim() ? `• "${specialInstructions.trim()}"` : '• _ None _'}
━━━━━━━━━━━━━━━━━━━━━━━━━━
⏰ _Requested cooking priority of 30-40 minutes_
_Thank you for dining with Grand Flavors!_`;

    const encodedText = encodeURIComponent(formattedMessage);
    const whatsappLink = `https://wa.me/${restaurantDetails.whatsapp}?text=${encodedText}`;
    
    // Launch WhatsApp
    window.open(whatsappLink, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur Overlay */}
          <motion.div
            id="cart-overlay-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity"
          />

          {/* Drawer Panel */}
          <motion.div
            id="cart-drawer-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: 'easeOut' }}
            className="fixed inset-y-0 right-0 max-w-md w-full bg-white dark:bg-neutral-900 shadow-2xl z-50 flex flex-col justify-between border-l border-gold/15"
          >
            {/* Header Area */}
            <div className="p-6 border-b border-stone-200 dark:border-neutral-800 flex items-center justify-between bg-primary text-white">
              <div className="flex items-center space-x-2.5">
                <ShoppingBag className="w-5 h-5 text-gold" />
                <h3 className="font-serif text-lg font-bold uppercase tracking-wider text-white">Your Dining Bag</h3>
                <span className="bg-gold text-black text-[10px] font-mono px-2 py-0.5 rounded-full font-bold">
                  {cartItems.length}
                </span>
              </div>
              <button
                id="close-cart-drawer-btn"
                onClick={onClose}
                className="p-1.5 border border-stone-700 hover:border-gold text-stone-400 hover:text-gold rounded-full transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* List Body Area */}
            <div className="flex-grow overflow-y-auto p-6 space-y-6 no-scrollbar">
              {cartItems.length > 0 ? (
                <>
                  {/* Cart Selected Items */}
                  <div className="space-y-4">
                    {cartItems.map((cartItem) => (
                      <div
                        key={cartItem.item.id}
                        id={`cart-item-${cartItem.item.id}`}
                        className="flex items-start space-x-4 pb-4 border-b border-stone-100 dark:border-neutral-800"
                      >
                        <img
                          src={cartItem.item.image}
                          alt={cartItem.item.name}
                          className="w-16 h-16 object-cover bg-stone-100 hover:scale-105 transition-transform"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-grow">
                          <div className="flex justify-between items-start gap-1">
                            <h4 className="font-serif text-sm font-semibold text-primary dark:text-white uppercase">
                              {cartItem.item.name}
                            </h4>
                            <button
                              id={`remove-cart-item-${cartItem.item.id}`}
                              onClick={() => onRemoveItem(cartItem.item.id)}
                              className="text-stone-400 hover:text-accent p-1 transition-colors"
                              title="Delete item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          
                          <div className="flex items-center space-x-1.5 mt-1">
                            {cartItem.item.isVeg ? (
                              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold uppercase flex items-center space-x-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                <span>VEG</span>
                              </span>
                            ) : (
                              <span className="text-[10px] text-rose-600 dark:text-rose-400 font-semibold uppercase flex items-center space-x-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                                <span>NON-VEG</span>
                              </span>
                            )}
                          </div>

                          <div className="flex justify-between items-center mt-3">
                            {/* Quantity Editor Controls */}
                            <div className="flex items-center border border-stone-200 dark:border-neutral-700 bg-stone-50 dark:bg-neutral-800">
                              <button
                                id={`dec-qty-${cartItem.item.id}`}
                                onClick={() => onUpdateQuantity(cartItem.item.id, cartItem.quantity - 1)}
                                className="p-1 px-2.5 text-stone-500 hover:text-primary dark:hover:text-white transition-colors"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-xs font-mono font-bold text-primary dark:text-white px-2.5">
                                {cartItem.quantity}
                              </span>
                              <button
                                id={`inc-qty-${cartItem.item.id}`}
                                onClick={() => onUpdateQuantity(cartItem.item.id, cartItem.quantity + 1)}
                                className="p-1 px-2.5 text-stone-500 hover:text-primary dark:hover:text-white transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                            
                            <span className="text-sm font-mono text-gold font-bold">
                              ${(cartItem.item.price * cartItem.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Customer Information Sheet inside the drawer */}
                  <form onSubmit={handlePlaceOrder} className="pt-4 border-t border-stone-200 dark:border-neutral-800 space-y-4">
                    <span className="block font-serif text-sm font-bold text-primary dark:text-white uppercase">
                      1. Deliver & Order Details
                    </span>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        id="cart-customer-name"
                        type="text"
                        required
                        placeholder="e.g. Victoria Montgomery"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className={`w-full p-2.5 text-xs bg-stone-50 dark:bg-neutral-800 border focus:outline-none focus:border-gold text-primary dark:text-white ${
                          errorField === 'name' ? 'border-accent' : 'border-stone-200 dark:border-neutral-700'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-1.5">
                        Contact / Mobile Phone *
                      </label>
                      <input
                        id="cart-customer-phone"
                        type="tel"
                        required
                        placeholder="e.g. +1 (555) 728-1029"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className={`w-full p-2.5 text-xs bg-stone-50 dark:bg-neutral-800 border focus:outline-none focus:border-gold text-primary dark:text-white ${
                          errorField === 'phone' ? 'border-accent' : 'border-stone-200 dark:border-neutral-700'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-1.5">
                        Chef Requests (e.g. No Spicy, Extra Lemons)
                      </label>
                      <textarea
                        id="cart-special-instructions"
                        rows={2}
                        placeholder="Slight spicy, pack cucumber raita separately..."
                        value={specialInstructions}
                        onChange={(e) => setSpecialInstructions(e.target.value)}
                        className="w-full p-2.5 text-xs bg-stone-50 dark:bg-neutral-800 border border-stone-200 dark:border-neutral-700 focus:outline-none focus:border-gold text-primary dark:text-white resize-none"
                      />
                    </div>
                  </form>
                </>
              ) : (
                /* Empty Cart State */
                <div className="text-center py-24 text-stone-400">
                  <ShoppingBag className="w-12 h-12 text-stone-300 dark:text-neutral-700 mx-auto mb-4" />
                  <p className="font-serif text-sm font-bold uppercase tracking-wider text-stone-500 mb-2">Your Bag is Empty</p>
                  <p className="text-xs max-w-xs mx-auto">Browse through our menu categories and add gourmet delicacies to get started with your checkout.</p>
                </div>
              )}
            </div>

            {/* Financial Totals & Checkout Actions */}
            {cartItems.length > 0 && (
              <div className="p-6 bg-stone-50 dark:bg-neutral-950 border-t border-stone-200 dark:border-neutral-800">
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-xs font-medium text-stone-500">
                    <span>Subtotal</span>
                    <span className="font-mono">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs font-medium text-stone-500">
                    <span>Luxury Eco-Packaging</span>
                    <span className="font-mono">${packagingFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs font-medium text-stone-500">
                    <span>Taxes & Duties (8.25%)</span>
                    <span className="font-mono">${tax.toFixed(2)}</span>
                  </div>
                  <div className="w-full h-[1px] bg-stone-200 dark:bg-neutral-800 my-2" />
                  <div className="flex justify-between text-sm font-bold text-primary dark:text-white">
                    <span className="uppercase tracking-wider">TOTAL AMOUNT</span>
                    <span className="font-mono text-gold text-base">${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Instant Order Button */}
                <button
                  id="checkout-whatsapp-btn"
                  onClick={handlePlaceOrder}
                  className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center space-x-2 rounded-none cursor-pointer focus:outline-none transition-all shadow-md shadow-emerald-500/10"
                >
                  <Send className="w-4 h-4 text-white" />
                  <span>Order via WhatsApp</span>
                </button>

                <button
                  id="clear-all-cart-btn"
                  onClick={onClearCart}
                  className="w-full mt-2.5 text-center text-[10px] text-stone-400 hover:text-accent font-semibold uppercase tracking-wider cursor-pointer"
                >
                  Empty Cart Details
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
