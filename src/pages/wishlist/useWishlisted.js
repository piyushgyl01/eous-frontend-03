import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  fetchWishlistedProductsAsync,
  selectWishlistItems,
} from "../../features/product/productSlice";

export default function useWishlisted() {
  const dispatch = useDispatch();

  const products = useSelector(selectWishlistItems);

  useEffect(() => {
    dispatch(fetchWishlistedProductsAsync());
  }, [dispatch]);

  return products;
}
