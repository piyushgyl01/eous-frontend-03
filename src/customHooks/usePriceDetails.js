import { useCallback, useEffect, useMemo } from "react";
import useQuantity from "../contexts/CartContext";
import useCartProducts from "./useCartProducts";

export default function usePriceDetails() {
  const { productQuantities, updateQuantity } = useQuantity();
  const products = useCartProducts();

  // Memoize the decrement handler
  const handleDecrement = useCallback((productId) => {
    const currentQuantity = productQuantities[productId] || 1;
    if (currentQuantity > 1) {
      updateQuantity(productId, currentQuantity - 1);
    }
  }, [productQuantities, updateQuantity]);

  // Memoize the increment handler
  const handleIncrement = useCallback((productId) => {
    const currentQuantity = productQuantities[productId] || 1;
    updateQuantity(productId, currentQuantity + 1);
  }, [productQuantities, updateQuantity]);

  // Memoize price calculations to avoid recalculation during renders
  const priceData = useMemo(() => {
    const totalDiscountedPrice = products.reduce((acc, product) => {
      const qty = productQuantities[product._id] || 1;
      return acc + product.productPrice * qty;
    }, 0);

    const totalOriginalPrice = products.reduce((acc, product) => {
      const qty = productQuantities[product._id] || 1;
      return acc + product.productPrice * 2 * qty;
    }, 0);

    const discount = totalOriginalPrice - totalDiscountedPrice;
    const deliveryCharges =
      products.length > 0 ? (totalDiscountedPrice > 100 ? 0 : 5) : 0;
    const totalAmount = totalDiscountedPrice + deliveryCharges;
    const savings = discount;

    return {
      totalDiscountedPrice,
      totalOriginalPrice,
      discount,
      deliveryCharges,
      totalAmount,
      savings
    };
  }, [products, productQuantities]);

  return {
    handleDecrement,
    handleIncrement,
    ...priceData,
    productQuantities,
  };
}