import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchAllProductsAsync, selectFilteredProducts } from "../features/product/productSlice";

export default function useFilteredProducts() {
  //USE DISPATCH FUNCTION
  const dispatch = useDispatch();

  //USE SLECTOR TO GET ALL THE PRODUCTS FROM THE STORE
  const filteredProducts = useSelector(selectFilteredProducts);

  //DISPATCHING API CALL
  useEffect(() => {
    dispatch(fetchAllProductsAsync());
  }, [dispatch]);

  return filteredProducts;
}
