import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProductByIdAsync,
  selectSelectedProduct,
} from "../../features/product/productSlice";
import { useEffect } from "react";

export default function useProductDetails() {
  const dispatch = useDispatch();
  const product = useSelector(selectSelectedProduct);

  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchProductByIdAsync(id));
  }, [dispatch, id]);

  return { id, product };
}
