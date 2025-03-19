import { useContext, createContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCartItems } from "../features/product/productSlice";

const CartContext = createContext();

const useQuantity = () => useContext(CartContext);

export default useQuantity;

export function CartProvider({ children }) {
  const [productQuantities, setProductQuantities] = useState({});
  const cartItems = useSelector(selectCartItems);
  
  // Synchronize quantities with cart items
  useEffect(() => {
    // Clean up quantities for products no longer in cart
    if (cartItems.length === 0) {
      // If cart is empty, reset all quantities
      setProductQuantities({});
    } else {
      // Remove quantities for products no longer in cart
      setProductQuantities(prevQuantities => {
        const newQuantities = { ...prevQuantities };
        
        // Keep only quantities for products still in cart
        Object.keys(newQuantities).forEach(productId => {
          if (!cartItems.some(item => item._id === productId)) {
            delete newQuantities[productId];
          }
        });
        
        // Ensure all cart items have a quantity
        cartItems.forEach(item => {
          if (!newQuantities[item._id]) {
            newQuantities[item._id] = 1;
          }
        });
        
        return newQuantities;
      });
    }
  }, [cartItems]);

  const updateQuantity = (productId, newQuantity) => {
    setProductQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(1, newQuantity),
    }));
  };
  
  const resetAllQuantities = () => {
    setProductQuantities({});
  };
  
  const setQuantityBatch = (quantitiesMap) => {
    setProductQuantities(quantitiesMap);
  };

  return (
    <CartContext.Provider value={{ 
      productQuantities, 
      updateQuantity, 
      resetAllQuantities,
      setQuantityBatch
    }}>
      {children}
    </CartContext.Provider>
  );
}