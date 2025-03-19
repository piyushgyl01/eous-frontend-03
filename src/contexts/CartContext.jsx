import { useContext, createContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCartItems } from "../features/product/productSlice";

const CartContext = createContext();

const useQuantity = () => useContext(CartContext);

export default useQuantity;

export function CartProvider({ children }) {
  const [productQuantities, setProductQuantities] = useState({});
  const cartProducts = useSelector(selectCartItems);

  // Reset quantities when cart is empty
  useEffect(() => {
    if (cartProducts.length === 0) {
      setProductQuantities({});
    } else {
      // Ensure all cart products have at least quantity 1
      const newQuantities = { ...productQuantities };
      let hasChanges = false;

      // Add entries for new cart items
      cartProducts.forEach((product) => {
        if (!newQuantities[product._id]) {
          newQuantities[product._id] = 1;
          hasChanges = true;
        }
      });

      // Remove entries for products no longer in cart
      Object.keys(newQuantities).forEach((productId) => {
        if (!cartProducts.some((p) => p._id === productId)) {
          delete newQuantities[productId];
          hasChanges = true;
        }
      });

      if (hasChanges) {
        setProductQuantities(newQuantities);
      }
    }
  }, [cartProducts, productQuantities]);

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) newQuantity = 1;

    setProductQuantities((prev) => ({
      ...prev,
      [productId]: newQuantity,
    }));
  };

  const resetQuantities = () => {
    setProductQuantities({});
  };

  return (
    <CartContext.Provider
      value={{
        productQuantities,
        updateQuantity,
        resetQuantities,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
