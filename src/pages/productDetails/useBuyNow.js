import { useNavigate } from "react-router-dom";
import useUnfilteredProducts from "../../customHooks/useUnfilteredProducts";
import {
  setMessage,
  updateCartAsync,
  updateWishlistAsync,
} from "../../features/product/productSlice";
import { useDispatch } from "react-redux";

export default function useBuyNow() {
  const unfilteredProducts = useUnfilteredProducts();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleBuyNow = async (id) => {
    try {
      dispatch(setMessage({
        show: true,
        message: "Processing your order...",
        type: "success",
      }));

      const product = unfilteredProducts.find(prod => prod._id === id);
      
      if (product) {
        if (product.isWishlisted) {
          await dispatch(updateWishlistAsync(id)).unwrap();
        }
        
        if (!product.isAddedToCart) {
          await dispatch(updateCartAsync(id)).unwrap();
        }
        
        navigate("/checkout");
      } else {
        throw new Error("Product not found");
      }
    } catch (error) {
      console.error("Buy Now error:", error);
      dispatch(setMessage({
        show: true,
        message: "Failed to process your order. Please try again.",
        type: "warning",
      }));
      
      setTimeout(() => {
        dispatch(setMessage({ show: false, message: "", type: "warning" }));
      }, 3000);
    }
  };

  return handleBuyNow;
}