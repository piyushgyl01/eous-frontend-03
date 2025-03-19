import { useMemo } from "react";
import useQuantity from "../contexts/CartContext";
import useCartProducts from "./useCartProducts";

export default function usePriceDetails() {
  const { productQuantities, updateQuantity } = useQuantity();
  const products = useCartProducts();

  const handleDecrement = (productId) => {
    const currentQuantity = productQuantities[productId] || 1;
    if (currentQuantity > 1) {
      updateQuantity(productId, currentQuantity - 1);
    }
  };

  const handleIncrement = (productId) => {
    const currentQuantity = productQuantities[productId] || 1;
    updateQuantity(productId, currentQuantity + 1);
  };

  // Calculate all price-related values in a single place
  const priceCalculations = useMemo(() => {
    // Original price (before discount)
    const totalOriginalPrice = products.reduce((acc, product) => {
      const qty = productQuantities[product._id] || 1;
      return acc + product.productPrice * 2 * qty;
    }, 0);

    // Discounted price
    const totalDiscountedPrice = products.reduce((acc, product) => {
      const qty = productQuantities[product._id] || 1;
      return acc + product.productPrice * qty;
    }, 0);

    // Discount amount
    const discount = totalOriginalPrice - totalDiscountedPrice;
    
    // Delivery charges
    const deliveryCharges = 
      products.length > 0 ? (totalDiscountedPrice > 100 ? 0 : 5) : 0;
    
    // Final total
    const totalAmount = totalDiscountedPrice + deliveryCharges;
    
    return {
      totalOriginalPrice,
      totalDiscountedPrice,
      discount,
      deliveryCharges,
      totalAmount
    };
  }, [products, productQuantities]);

  return {
    handleDecrement,
    handleIncrement,
    productQuantities,
    ...priceCalculations
  };
}