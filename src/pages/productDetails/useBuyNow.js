import { useNavigate } from "react-router-dom";
import useUnfilteredProducts from "../../customHooks/useUnfilteredProducts";
import {
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
      const filteredProduct = unfilteredProducts.filter(
        (prod) => prod._id === id
      );

      if (filteredProduct[0].isWishlisted) {
        dispatch(updateWishlistAsync(id));
      }

      await dispatch(updateCartAsync(id));
      navigate("/checkout");
    } catch (error) {
      console.log("Updating cart error", error);
    }
  };

  return handleBuyNow;
}
