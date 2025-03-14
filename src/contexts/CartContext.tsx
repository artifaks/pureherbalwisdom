import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from '@/components/ui/use-toast';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string | null;
}

interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  isInCart: (id: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const { toast } = useToast();
  
  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('herbologyCart');
      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
    }
  }, []);
  
  // Save cart to localStorage when it changes
  useEffect(() => {
    try {
      localStorage.setItem('herbologyCart', JSON.stringify(items));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [items]);
  
  const addToCart = (item: CartItem) => {
    // Check if item is already in cart
    if (items.some(i => i.id === item.id)) {
      toast({
        title: 'Already in cart',
        description: `${item.name} is already in your cart.`,
        variant: 'default'
      });
      return;
    }
    
    setItems(prev => [...prev, item]);
    toast({
      title: 'Added to cart',
      description: `${item.name} added to your cart.`,
      variant: 'default'
    });
  };
  
  const removeFromCart = (id: string) => {
    const itemToRemove = items.find(item => item.id === id);
    setItems(prev => prev.filter(item => item.id !== id));
    
    if (itemToRemove) {
      toast({
        title: 'Removed from cart',
        description: `${itemToRemove.name} removed from your cart.`,
        variant: 'default'
      });
    }
  };
  
  const clearCart = () => {
    setItems([]);
    toast({
      title: 'Cart cleared',
      description: 'All items have been removed from your cart.',
      variant: 'default'
    });
  };
  
  const isInCart = (id: string) => {
    return items.some(item => item.id === id);
  };
  
  const totalItems = items.length;
  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);
  
  return (
    <CartContext.Provider value={{
      items,
      totalItems,
      totalPrice,
      addToCart,
      removeFromCart,
      clearCart,
      isInCart
    }}>
      {children}
    </CartContext.Provider>
  );
};
