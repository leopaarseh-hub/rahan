'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Product } from '@/types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (p: Product) => void;
  updateQty: (id: number, delta: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  cartCount: number;
}

const CartContext = createContext<CartContextType>({
  cart: [], addToCart: () => {}, updateQty: () => {},
  removeFromCart: () => {}, clearCart: () => {}, cartCount: 0,
});

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('kian-cart');
      if (saved) setCart(JSON.parse(saved));
    } catch {}
  }, []);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('kian-cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (p: Product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === p.id);
      if (existing) return prev.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...p, qty: 1 }];
    });
  };

  const updateQty = (id: number, delta: number) =>
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i));

  const removeFromCart = (id: number) =>
    setCart(prev => prev.filter(i => i.id !== id));

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQty, removeFromCart, clearCart, cartCount }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
