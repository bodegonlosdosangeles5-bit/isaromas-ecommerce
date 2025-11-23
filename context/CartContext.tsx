import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  variant?: {
    aroma: string;
    color?: string;
    size?: string;
    gender?: string;
  };
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity: number, variant?: CartItem['variant']) => void;
  removeFromCart: (productId: string, variant?: CartItem['variant']) => void;
  updateQuantity: (productId: string, quantity: number, variant?: CartItem['variant']) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  toggleCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('isaromas-cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart from local storage", e);
      }
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('isaromas-cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (product: Product, quantity: number, variant?: CartItem['variant']) => {
    setItems(prev => {
      const existingItemIndex = prev.findIndex(item => 
        item.product.id === product.id && 
        JSON.stringify(item.variant) === JSON.stringify(variant)
      );

      if (existingItemIndex > -1) {
        const newItems = [...prev];
        newItems[existingItemIndex].quantity += quantity;
        return newItems;
      } else {
        return [...prev, { product, quantity, variant }];
      }
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, variant?: CartItem['variant']) => {
    setItems(prev => prev.filter(item => 
      !(item.product.id === productId && JSON.stringify(item.variant) === JSON.stringify(variant))
    ));
  };

  const updateQuantity = (productId: string, quantity: number, variant?: CartItem['variant']) => {
    if (quantity <= 0) {
      removeFromCart(productId, variant);
      return;
    }
    setItems(prev => prev.map(item => {
      if (item.product.id === productId && JSON.stringify(item.variant) === JSON.stringify(variant)) {
        return { ...item, quantity };
      }
      return item;
    }));
  };

  const clearCart = () => setItems([]);

  const toggleCart = () => setIsCartOpen(prev => !prev);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ 
      items, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart, 
      totalItems, 
      totalPrice,
      isCartOpen,
      toggleCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
