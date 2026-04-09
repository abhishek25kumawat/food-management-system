/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [restaurantId, setRestaurantId] = useState(null);

  const addToCart = (menuItem, restId) => {
    if (restaurantId && restaurantId !== restId) {
      setItems([{ ...menuItem, quantity: 1 }]);
      setRestaurantId(restId);
      return;
    }

    setRestaurantId(restId);
    setItems((prev) => {
      const index = prev.findIndex((item) => item._id === menuItem._id);
      if (index === -1) return [...prev, { ...menuItem, quantity: 1 }];
      return prev.map((item) =>
        item._id === menuItem._id ? { ...item, quantity: item.quantity + 1 } : item
      );
    });
  };

  const changeQuantity = (id, delta) => {
    setItems((prev) =>
      prev
        .map((item) => (item._id === id ? { ...item, quantity: item.quantity + delta } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setItems([]);
    setRestaurantId(null);
  };

  const totalAmount = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  return (
    <CartContext.Provider
      value={{ items, restaurantId, totalAmount, addToCart, changeQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return ctx;
};
