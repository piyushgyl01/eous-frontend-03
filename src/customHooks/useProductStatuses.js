import { selectStatus } from "../features/product/productSlice";
import { useSelector } from "react-redux";

export default function useProductStatuses() {
  const {
    fetchStatus,
    fetchProductByIdStatus,
    fetchProductByCategoryStatus,
    fetchWishlistedProductsStatus,
    fetchCartProductsStatus,
    updateCartStatus,
    updateWishlistStatus,
  } = useSelector(selectStatus);

  return {
    fetchStatus,
    fetchProductByIdStatus,
    fetchProductByCategoryStatus,
    fetchWishlistedProductsStatus,
    fetchCartProductsStatus,
    updateCartStatus,
    updateWishlistStatus,
  };
}
