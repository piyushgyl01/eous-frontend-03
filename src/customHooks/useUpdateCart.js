import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import useUnfilteredProducts from "./useUnfilteredProducts";
import {
  selectStatus,
  setMessage,
  updateCartAsync,
  updateWishlistAsync,
} from "../features/product/productSlice";

export default function useUpdateCart() {
  const dispatch = useDispatch();
  const unfilteredProducts = useUnfilteredProducts();
  const [cartId, setCartId] = useState(null);
  const { updateCartStatus } = useSelector(selectStatus);

  useEffect(() => {
    if (updateCartStatus === "success" && cartId) {
      setCartId(null);

      dispatch(
        setMessage({
          show: true,
          message: "Cart updated successfully",
          type: "success",
        })
      );

      setTimeout(() => {
        dispatch(
          setMessage({
            show: false,
            message: "",
            type: "warning",
          })
        );
      }, 3000);
    } else if (updateCartStatus === "error" && cartId) {
      setCartId(null);

      dispatch(
        setMessage({
          show: true,
          message: "Error adding product to the cart",
          type: "warning",
        })
      );

      setTimeout(() => {
        dispatch(
          setMessage({
            show: false,
            message: "",
            type: "warning",
          })
        );
      }, 3000);
    }
  }, [updateCartStatus, cartId, dispatch]);

  const handleUpdateCart = async (id) => {
    try {
      const filteredProduct = unfilteredProducts.filter(
        (prod) => prod._id === id
      );

      if (filteredProduct[0].isWishlisted) {
        dispatch(updateWishlistAsync(id));
      }

      setCartId(id);
      await dispatch(updateCartAsync(id));
    } catch (error) {
      console.log("Updating cart error", error);
      setCartId(null);
    }
  };

  return { handleUpdateCart, cartId };
}
