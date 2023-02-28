import React, { createContext, ReactNode, useContext, useState } from "react";

interface ProviderProps {
  children: ReactNode;
}

interface CartItem {
  id: number;
  quantity: number;
}

interface CartContext {
  addItem: (id: number) => void;
  removeItem: (id: number) => void;
  getQuantity: (id: number) => number;
  removeFromCart: (id: number) => void;
  totalQuantity: number;
  cartItems: CartItem[];
}

const CartContext = createContext({} as CartContext);

export const useCartContext = () => {
  return useContext(CartContext);
};

const CartProvider = ({ children }: ProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const totalQuantity = cartItems.reduce(
    (prev, item) => prev + item.quantity,
    0
  );

  const getQuantity = (id: number) => {
    return cartItems.find((item) => id === item.id)?.quantity || 0;
  };

  const addItem = (id: number) => {
    setCartItems((prevState) => {
      if (prevState.find((item) => item.id === id) == null) {
        return [...prevState, { id: id, quantity: 1 }];
      } else {
        return prevState.map((item) => {
          if (item.id !== id) {
            return item;
          } else {
            return { ...item, quantity: item.quantity + 1 };
          }
        });
      }
    });
  };

  const removeItem = (id: number) => {
    setCartItems((prevState) => {
      if (prevState.find((item) => item.id === id)?.quantity === 1) {
        return prevState.filter((item) => item.id !== id);
      } else {
        return prevState.map((item) => {
          if (item.id !== id) {
            return item;
          } else {
            return { ...item, quantity: item.quantity - 1 };
          }
        });
      }
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems((prevState) => {
        return prevState.filter(item => item.id === id);
    })
  }

  return (
    <CartContext.Provider
      value={{ cartItems, getQuantity, totalQuantity, addItem, removeItem, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};


export default CartProvider;
