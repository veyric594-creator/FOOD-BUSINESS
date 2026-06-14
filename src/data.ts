/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MenuItem, GalleryItem, Review } from './types';

export const restaurantDetails = {
  name: "GRAND FLAVORS",
  tagline: "Where Every Bite Creates Memories",
  phone: "+1 (555) 892-0199",
  whatsapp: "+15558920199", // International format without + for WhatsApp links
  email: "reservations@grandflavors.com",
  address: "742 Sterling Boulevard, Luxury District, NY 10021",
  coordinates: {
    lat: 40.7644,
    lng: -73.9734
  },
  openingHours: [
    { days: "Monday - Thursday", hours: "12:00 PM - 10:30 PM" },
    { days: "Friday - Saturday", hours: "11:30 AM - 11:30 PM" },
    { days: "Sunday", hours: "11:30 AM - 10:00 PM" }
  ],
  socials: {
    instagram: "https://instagram.com/grandflavors",
    facebook: "https://facebook.com/grandflavors",
    twitter: "https://twitter.com/grandflavors",
    tripadvisor: "https://tripadvisor.com/grandflavors"
  }
};

export const featuredDishes: MenuItem[] = [
  {
    id: "feat-1",
    name: "Royal Chicken Biryani",
    description: "Slow-cooked fragrant basmati rice with premium saffron, tender marinated free-range chicken, and signature royal spices, served with fresh cucumber raita.",
    price: 24.50,
    category: "Biryani",
    isVeg: false,
    isPopular: true,
    isChefRecommended: true,
    image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=800&h=600&q=80"
  },
  {
    id: "feat-2",
    name: "Artisanal Paneer Butter Masala",
    description: "House-made fresh cottage cheese cubes cooked in light charcoal tandoor, simmered in a velvety cream, organic tomato, and rich butter reduction with hints of dried fenugreek.",
    price: 19.50,
    category: "North Indian",
    isVeg: true,
    isPopular: true,
    isChefRecommended: false,
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&w=800&h=600&q=80"
  },
  {
    id: "feat-3",
    name: "Prawn Tempura Imperial",
    description: "Crispy, golden, light-battered jumbo ocean prawns seasoned with premium sea salt and fresh garlic, served alongside an exquisite sweet-chili soy reduction.",
    price: 22.00,
    category: "Starters",
    isVeg: false,
    isPopular: false,
    isChefRecommended: true,
    image: "https://images.unsplash.com/photo-1563612116625-300a57317af8?auto=format&fit=crop&w=800&h=600&q=80"
  },
  {
    id: "feat-4",
    name: "Spiced Dragon Chicken",
    description: "Wok-tossed battered chicken strips glazed with fiery artisan sriracha, sweet honey, premium dark soy sauce, fresh capsicum, and toasted sesame garnish.",
    price: 18.00,
    category: "Chinese",
    isVeg: false,
    isPopular: true,
    isChefRecommended: false,
    image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=800&h=600&q=80"
  },
  {
    id: "feat-5",
    name: "Decadent Chocolate Lava Cake",
    description: "Rich dark Belgian chocolate cake with a warm flowing molten center, dusted with premium cocoa, served with organic Madagascar vanilla bean gelato.",
    price: 12.00,
    category: "Desserts",
    isVeg: true,
    isPopular: true,
    isChefRecommended: true,
    image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=800&h=600&q=80"
  }
];

export const allMenuItems: MenuItem[] = [
  // --- STARTERS ---
  {
    id: "star-1",
    name: "Crispy Avocado Beetroot Tartare",
    description: "Perfectly seasoned hand-cut ripe avocados combined with slow-roasted beetroot cubes, premium lime dressing, and crunchy microgreens.",
    price: 14.50,
    category: "Starters",
    isVeg: true,
    isChefRecommended: true,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&h=400&q=80"
  },
  {
    id: "star-2",
    name: "Clay Oven Paneer Tikka",
    description: "Handmade organic paneer blocks marinated in greek yogurt, golden mustard oil, and house-ground spices, charred to rich smoky perfection.",
    price: 16.00,
    category: "Starters",
    isVeg: true,
    isPopular: true,
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=500&h=400&q=80"
  },
  ...featuredDishes.filter(d => d.category === "Starters"),

  // --- SOUTH INDIAN ---
  {
    id: "south-1",
    name: "Golden Ghee Podi Masala Dosa",
    description: "Crispy, paper-thin fermented rice crepe smeared with fragrant spiced lentil gunpowder (podi) and pure organic A2 ghee, stuffed with tempered potato mass.",
    price: 15.00,
    category: "South Indian",
    isVeg: true,
    isPopular: true,
    isChefRecommended: true,
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=500&h=400&q=80"
  },
  {
    id: "south-2",
    name: "Heritage Idli & Medu Vada Combo",
    description: "Two steamed cloud-like rice cakes paired with a classic crispy savory lentil donut, served with traditional coconut, tomato, and tangy sambar stews.",
    price: 12.50,
    category: "South Indian",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=500&h=400&q=80"
  },

  // --- NORTH INDIAN ---
  ...featuredDishes.filter(d => d.category === "North Indian"),
  {
    id: "north-2",
    name: "Mughlai Butter Chicken",
    description: "Premium clay-oven boneless chicken tandoori tikka simmered gently in a fragrant gravy of fresh cream, organic tomatoes, cashew puree, and butter.",
    price: 22.50,
    category: "North Indian",
    isVeg: false,
    isPopular: true,
    isChefRecommended: true,
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=500&h=400&q=80"
  },
  {
    id: "north-3",
    name: "Artisanal Charcoal Garlic Naan",
    description: "Soft leavened tandoor flatbread brushed with hand-crushed fresh garlic, aromatic coriander greens, and warm clarified butter.",
    price: 4.50,
    category: "North Indian",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=500&h=400&q=80"
  },

  // --- CHINESE ---
  ...featuredDishes.filter(d => d.category === "Chinese"),
  {
    id: "chin-2",
    name: "Organic Vegetable Hakka Noodles",
    description: "High-heat wok-fried noodles tossed with crisp julienned seasonal vegetables, white pepper, premium dark soy, and toasted sesame aromatics.",
    price: 16.50,
    category: "Chinese",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=500&h=400&q=80"
  },
  {
    id: "chin-3",
    name: "Smoky Schezwan Egg Fried Rice",
    description: "Fluffy wok-tossed premium rice scrambled with organic eggs, fresh scallions, colorful vegetables, and fiery, complex house-made Schezwan chili paste.",
    price: 17.00,
    category: "Chinese",
    isVeg: false,
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=500&h=400&q=80"
  },

  // --- BIRYANI ---
  ...featuredDishes.filter(d => d.category === "Biryani"),
  {
    id: "biry-2",
    name: "Royal Jackfruit Veg Dum Biryani",
    description: "A gorgeous layers of fragrant Aged Basmati rice and tenderized young green jackfruit, slow-steamed under weight ('dum') with high-grade saffron and rose hydrosols.",
    price: 21.00,
    category: "Biryani",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=500&h=400&q=80"
  },

  // --- DESSERTS ---
  ...featuredDishes.filter(d => d.category === "Desserts"),
  {
    id: "dess-2",
    name: "Organic Rose Petal Saffron Kulfi",
    description: "Traditional slow-reduced Indian milk ice cream infused with hand-sourced Kashmir saffron, edible gold dust, organic organic rose syrup, and raw pistachios.",
    price: 11.00,
    category: "Desserts",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=500&h=400&q=80"
  },

  // --- BEVERAGES ---
  {
    id: "bev-1",
    name: "Emperor's Mango Cardamom Lassi",
    description: "Thick organic Greek yogurt blended with sweet Alphonso mango pulp, cracked green cardamom seeds, floral saffron threads, and hand-ground raw honey.",
    price: 7.50,
    category: "Beverages",
    isVeg: true,
    isPopular: true,
    image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=500&h=400&q=80"
  },
  {
    id: "bev-2",
    name: "Royal Saffron Cardamom Chai",
    description: "Rich black CTC tea leaves slow-brewed in premium country milk with crushed green ginger, cardamom pods, and pristine hand-selected Kashmir saffron.",
    price: 6.00,
    category: "Beverages",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=500&h=400&q=80"
  }
];

export const chefSpecials = [
  {
    id: "special-1",
    name: "Golden Glazed Salmon Fillet",
    story: "Created by Chef de Cuisine Anand Vardhan during his tenure in Paris, this dish couples high-latitude cold water Atlantic crisp-skin salmon with Indian coastal aromatic enhancements.",
    ingredients: ["Atlantic Wild Salmon", "Local Saffron Infused Butter", "Fennel Pollen Crust", "Hand-harvested Sea Salt", "Kaffir Lime Velouté"],
    price: 36.50,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1200&h=800&q=80"
  },
  {
    id: "special-2",
    name: "Signature Rosemary Tandoori Lamb Rack",
    story: "Sourced sustainably and marinated for 48 hours in cold-ground Himalayan herbs, whole seed yoghurts, and local organic rosemary sprigs, then coal charred at 800 degrees.",
    ingredients: ["Sustainably-raised Lamb Rack", "Organic Rosemary Broth", "Spiced Greek Yoghurt", "Garlic Confit Cream", "Wild Berries Compote"],
    price: 42.00,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&h=800&q=80"
  }
];

export const reviews: Review[] = [
  {
    id: "rev-1",
    name: "Victoria Montgomery",
    rating: 5,
    comment: "An absolute masterclass in flavor balancing and opulent presentation. The Royal Chicken Biryani is visually breathtaking and tasting it was a spiritual experience.",
    date: "June 2, 2026",
    role: "Culinary Critic & Author"
  },
  {
    id: "rev-2",
    name: "Adrian Thorne",
    rating: 5,
    comment: "The decor, the meticulous service, and Chef Anand's Golden Glazed Salmon are worthy of multiple stars. This is easily the most rewarding dining experience in New York.",
    date: "May 28, 2026",
    role: "Investment Banker & Food Enthusiast"
  },
  {
    id: "rev-3",
    name: "Dr. Sameera Patel",
    rating: 5,
    comment: "Bringing my extended family here was a dream. The vegetarian dishes of Paneer Butter Masala and Ghee Podi Dosa match the purity of authentic Indian heritage, elevated beautifully.",
    date: "May 15, 2026",
    role: "Pediatrician"
  },
  {
    id: "rev-4",
    name: "Evelyn & Thomas",
    rating: 5,
    comment: "Our wedding anniversary reservation was treated with absolute royalty. Beautiful customized table cards, warm champagne toast, and exemplary dining service.",
    date: "April 30, 2026",
    role: "Local Residents"
  }
];

export const galleryItems: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Elegant Salon Dining Area",
    category: "Interior",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&h=600&q=80"
  },
  {
    id: "gal-2",
    title: "Candlelit Alcove Seating",
    category: "Interior",
    image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&h=600&q=80"
  },
  {
    id: "gal-3",
    title: "Flawless Salmon Plating Art",
    category: "Dishes",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&h=600&q=80"
  },
  {
    id: "gal-4",
    title: "Premium Grilled Seared Cuts",
    category: "Dishes",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&h=600&q=80"
  },
  {
    id: "gal-5",
    title: "Executive Chef Anand plating with tweezers",
    category: "Moments",
    image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&h=1000&q=80"
  },
  {
    id: "gal-6",
    title: "Gourmet Dessert Sugar Baking Precision",
    category: "Moments",
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&h=600&q=80"
  }
];
