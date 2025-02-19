import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  fetchAllProductsAsync,
  selectAllProducts,
} from "../features/product/productSlice";

export default function useUnfilteredProducts() {
  const dispatch = useDispatch();

  const unfilteredProducts = useSelector(selectAllProducts);

  useEffect(() => {
    dispatch(fetchAllProductsAsync());
  }, [dispatch]);

  return unfilteredProducts;
}
