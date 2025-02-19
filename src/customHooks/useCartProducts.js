import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  fetchCartProductsAsync,
  selectCartItems,
} from "../features/product/productSlice";

export default function useCartProducts() {
  const dispatch = useDispatch();

  const products = useSelector(selectCartItems);

  useEffect(() => {
    dispatch(fetchCartProductsAsync());
  }, [dispatch]);

  return products;
}
