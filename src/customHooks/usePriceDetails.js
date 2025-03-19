import { useMemo, useEffect, useState } from "react";
import useQuantity from "../contexts/CartContext";
import useCartProducts from "./useCartProducts";

export default function usePriceDetails() {
  const { productQuantities, updateQuantity } = useQuantity();
  const products = useCartProducts();
  
  // State to track last stable calculation
  const [lastValidCalculation, setLastValidCalculation] = useState({
    totalOriginalPrice: 0,
    totalDiscountedPrice: 0,
    discount: 0,
    deliveryCharges: 0,
    totalAmount: 0
  });

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
    if (products.length === 0) {
      return {
        totalOriginalPrice: 0,
        totalDiscountedPrice: 0,
        discount: 0,
        deliveryCharges: 0,
        totalAmount: 0
      };
    }

    try {
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
    } catch (error) {
      console.error("Error calculating price details:", error);
      // Return last valid calculation if there's an error
      return lastValidCalculation;
    }
  }, [products, productQuantities, lastValidCalculation]);

  // Store last valid calculation
  useEffect(() => {
    if (priceCalculations.totalDiscountedPrice > 0) {
      setLastValidCalculation(priceCalculations);
    }
  }, [priceCalculations]);

  return {
    handleDecrement,
    handleIncrement,
    productQuantities,
    ...priceCalculations
  };
}