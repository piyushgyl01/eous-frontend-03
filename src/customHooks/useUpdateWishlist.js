import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import useUnfilteredProducts from "./useUnfilteredProducts";
import {
  selectStatus,
  setMessage,
  updateCartAsync,
  updateWishlistAsync,
} from "../features/product/productSlice";

export default function useUpdateWishlist() {
    const dispatch = useDispatch();
    const unfilteredProducts = useUnfilteredProducts();
    const [wishlistId, setWishlistId] = useState(null);
    const { updateWishlistStatus } = useSelector(selectStatus);
  
    useEffect(() => {
      if (updateWishlistStatus === "success" && wishlistId) {
         setWishlistId(null);
        
        dispatch(
          setMessage({
            show: true,
            message: "Wishlist updated successfully",
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
      } else if (updateWishlistStatus === "error" && wishlistId) {
        // Clear wishlistId immediately when operation fails
        setWishlistId(null);
        
        dispatch(
          setMessage({
            show: true,
            message: "Error updating wishlist",
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
    }, [updateWishlistStatus, wishlistId, dispatch]);
  
    const handleUpdateWishlist = async (id) => {
      try {
        const filteredProduct = unfilteredProducts.filter(
          (prod) => prod._id === id
        );
  
        if (filteredProduct[0].isAddedToCart) {
          dispatch(updateCartAsync(id));
        }
  
        setWishlistId(id);
        await dispatch(updateWishlistAsync(id));
      } catch (error) {
        console.log("Updating wishlist error", error);
        setWishlistId(null); 
      }
    };
  
    return { handleUpdateWishlist, wishlistId };
  }