import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  fetchAllProductsAsync,
  selectFilteredProducts,
} from "../features/product/productSlice";

export default function useFilteredProducts() {
  const dispatch = useDispatch();

  const filteredProducts = useSelector(selectFilteredProducts);

  useEffect(() => {
    dispatch(fetchAllProductsAsync());
  }, [dispatch]);

  return filteredProducts;
}
