import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { toast } from './use-toast';
import { api } from '@/services/apiService';

interface Product {
  id: string;
  productName: string;
  price: number;
  thumbnail: string | null;
  sku?: string;
  quantity?: number;
  Manufacturer?: {
    name: string;
  };
  Category?: {
    name: string;
  };
}

interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  product: Product;
}

export interface CartContextType {
  cartItems: CartItem[];
  cartCount: number;
  loading: boolean;
  addToCart: (productId: string, quantity: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, productId: string, quantity: number) => Promise<void>;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    setLoading(true);
    try {
      interface ApiProduct extends Product {
        Cart?: {
          id: string;
          quantity: number;
        };
      }

      const response = await api.get<{ data: { Products: ApiProduct[] } }>('cart/allItems');
      const products = response.data.Products || [];

      const transformedItems = products.map((item) => ({
        id: item?.Cart?.id || '',
        productId: item.id,
        quantity: item?.Cart?.quantity || 0,
        product: {
          id: item.id,
          productName: item.productName,
          price: item.price,
          thumbnail: item.thumbnail || null,
          sku: item.sku,
          quantity: item.quantity,
          Manufacturer: item.Manufacturer,
          Category: item.Category,
        },
      }));

      setCartItems(transformedItems);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
      setInitialized(true);
    }
  };

  const addToCart = async (productId: string, quantity: number) => {
    try {
      await api.post('cart/addToCart', { productId, quantity });
      await fetchCartItems();

      toast({
        title: 'Product added to cart successfully',
        description: 'Your product has been added to the cart successfully',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to add product to cart.',
      });
    }
  };

  const removeFromCart = async (itemId: string) => {
    try {
      await api.delete(`cart/remove/${itemId}`);
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));

      toast({
        title: 'Item removed from cart',
        description: 'Your item has been removed from the cart',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to remove item from cart.',
      });
    }
  };

  const updateQuantity = async (itemId: string, productId: string, quantity: number) => {
    try {
      await api.put('cart/updateQuantity', { itemId, quantity });
      setCartItems((prevItems) =>
        prevItems.map((item) => (item.id === itemId ? { ...item, quantity } : item))
      );
      toast({
        title: 'Quantity updated successfully',
        description: 'Your quantity has been updated successfully',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to update quantity.',
      });
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  if (!initialized) {
    return <>{children}</>;
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        loading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
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
