import { useContext } from "react";
import { createContext } from "react";
import { useState } from "react";

const CartContext = createContext();

const useQuantity = () => useContext(CartContext);

export default useQuantity;

export function CartProvider({ children }) {
  const [productQuantities, setProductQuantities] = useState({});

  const updateQuantity = (productId, newQuantity) => {
    setProductQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(1, newQuantity),
    }));
  };

  return (
    <CartContext.Provider value={{ productQuantities, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
}
