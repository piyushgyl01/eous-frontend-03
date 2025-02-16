import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchAllProductsAsync, selectAllProducts, selectFilteredProducts } from "../features/product/productSlice";

export default function useUnfilteredProducts() {
  //USE DISPATCH FUNCTION
  const dispatch = useDispatch();

  //USE SLECTOR TO GET ALL THE PRODUCTS FROM THE STORE
  const unfilteredProducts = useSelector(selectAllProducts);

  //DISPATCHING API CALL
  useEffect(() => {
    dispatch(fetchAllProductsAsync());
  }, [dispatch]);

  return unfilteredProducts;
}
