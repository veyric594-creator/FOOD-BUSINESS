/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type MenuCategory = 
  | 'Starters' 
  | 'South Indian' 
  | 'North Indian' 
  | 'Chinese' 
  | 'Biryani' 
  | 'Desserts' 
  | 'Beverages';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  isVeg: boolean;
  isPopular?: boolean;
  isChefRecommended?: boolean;
  image: string;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
}

export type ReservationStatus = 'Confirmed' | 'Pending' | 'Cancelled';

export interface Reservation {
  id: string;
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  specialRequests?: string;
  createdAt: string;
  status: ReservationStatus;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  image?: string;
  role?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Interior' | 'Dishes' | 'Moments' | 'All';
  image: string;
}
