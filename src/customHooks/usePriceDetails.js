import useQuantity from "../contexts/CartContext";
import useCartProducts from "./useCartProducts";

export default function usePriceDetails() {
  const { productQuantities, updateQuantity } = useQuantity();

  const handleDecrement = (productId) => {
    updateQuantity(productId, (productQuantities[productId] || 1) - 1);
  };

  const handleIncrement = (productId) => {
    updateQuantity(productId, (productQuantities[productId] || 1) + 1);
  };

  const products = useCartProducts();

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
    handleDecrement,
    handleIncrement,
    totalDiscountedPrice,
    totalOriginalPrice,
    discount,
    deliveryCharges,
    productQuantities,
  };
}
