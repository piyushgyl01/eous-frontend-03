import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  fetchAllProductsAsync,
  selectAllProducts,
  selectFilteredProducts,
  selectStatus,
  updateCartAsync,
  updateWishlistAsync,
} from "./productSlice";

import FavoriteIcon from "@mui/icons-material/Favorite";
import useFilteredProducts from "../../customHooks/useFilteredProducts";
import useUnfilteredProducts from "../../customHooks/useUnfilteredProducts";

export default function ProductList() {
  //STATES
  const [message, setMessage] = useState({
    show: false,
    message: "",
    type: "warning",
  });
  const [wishlistId, setWishlistId] = useState(null);
  const [cartId, setCartId] = useState(null);

  //USE DISPATCH FUNCTION
  const dispatch = useDispatch();

  //USE SLECTOR TO GET ALL THE PRODUCTS FROM THE STORE
  const filteredProducts = useFilteredProducts(); 

  //GETTING STATUS STATES FROM STORE
  const { fetchStatus, updateCartStatus, updateWishlistStatus } =
    useSelector(selectStatus);

  //HANDLE UPDATE CART EFFECT
  useEffect(() => {
    if (updateCartStatus === "success" && cartId) {
      setMessage({
        show: true,
        message: "Added to cart successfully",
        type: "success",
      });

      const timer = setTimeout(() => {
        setMessage({ show: false, message: "", type: "warning" });
        setCartId(null);
      }, 3000);

      return () => clearTimeout(timer);
    } else if (updateCartStatus === "error" && cartId) {
      setMessage({
        show: true,
        message: "Error adding product to the cart",
        type: "warning",
      });
      const timer = setTimeout(() => {
        setMessage({ show: false, message: "", type: "warning" });
        setCartId(null); 
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [updateCartStatus, cartId]);

  //HANDLE UPDATE WISHLIST EFFECT
  useEffect(() => {
    if (updateWishlistStatus === "success" && wishlistId) {
      setMessage({
        show: true,
        message: "Wishlist updated successfully",
        type: "success",
      });

      const timer = setTimeout(() => {
        setMessage({ show: false, message: "", type: "warning" });
        setWishlistId(null);
      }, 3000);

      return () => clearTimeout(timer);
    } else if (updateWishlistStatus === "error" && wishlistId) {
      setMessage({
        show: true,
        message: "Error adding product to the cart",
        type: "warning",
      });
      const timer = setTimeout(() => {
        setMessage({ show: false, message: "", type: "warning" });
        setWishlistId(null);  // Add timeout for error case too
      }, 3000);
  
      return () => clearTimeout(timer);
      }
  }, [updateWishlistStatus, wishlistId]);

  const unfilteredProducts = useUnfilteredProducts();

  //HANDLE UPDATE WISHLIST
  const handleUpdateWishlist = async (id) => {
    try {
      const filteredProduct = unfilteredProducts.filter(
        (prod) => prod._id === id
      );

      if (filteredProduct[0].isAddedToCart) {
        dispatch(updateCartAsync(id));
      }
      console.log("cart dispateched");

      setWishlistId(id);
      await dispatch(updateWishlistAsync(id));
      // dispatch(fetchProductByIdAsync(id));
    } catch (error) {
      console.log("Updating wishlist error", error);
    }
  };

  //HANDLE UPDATE CART
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
      // dispatch(fetchProductByIdAsync(id));
    } catch (error) {
      console.log("Updating cart error", error);
    }
  };

  return (
    <main className="row">
      {fetchStatus === "loading" ? (
        <div className="text-center mt-4">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <h1>Showing All Products</h1>
          <small>(Showing {filteredProducts.length} Products)</small>
          <div
            aria-live="polite"
            aria-atomic="true"
            className="position-fixed top-0 end-0 p-3"
            style={{ zIndex: 1900 }}
          >
            <div className="toast-container top-0 end-0 p-3">
              {message.show && (
                <div
                  className="toast show"
                  role="alert"
                  aria-live="assertive"
                  aria-atomic="true"
                >
                  <div className="toast-header">
                    <strong className="me-auto">
                      {message.type === "success" ? "Success" : "Warning"}
                    </strong>
                    <small className="text-body-secondary">just now</small>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setMessage({ ...message, show: false })}
                    ></button>
                  </div>
                  <div className="toast-body">{message.message}</div>
                </div>
              )}
            </div>
          </div>

          {fetchStatus === "error" && (
            <div className="alert alert-danger mt-3" role="alert">
              Unable to load the products
            </div>
          )}
          {filteredProducts.map((product) => (
            <div className="col-md-4 my-3 text-center" key={product._id}>
              <div className="card position-relative">
                <div
                  className="position-absolute top-0 end-0 m-2 bg-white rounded-circle d-flex justify-content-center align-items-center"
                  style={{ width: "2rem", height: "2rem" }}
                >
                  {wishlistId === product._id ? (
                    <span
                      className="spinner-border spinner-border-sm"
                      aria-hidden="true"
                    ></span>
                  ) : (
                    <FavoriteIcon
                      onClick={() => handleUpdateWishlist(product._id)}
                      className={
                        product.isWishlisted ? "text-danger" : "text-secondary"
                      }
                    />
                  )}
                </div>
                <Link to={`/products/${product.productName}/${product._id}`}>
                  <img
                    src={product.productImg}
                    className="card-img-top"
                    alt={product.productName}
                  />
                </Link>
                <div className="card-body">
                  <small className="card-title">{product.productName}</small>
                  <h4 className="mt-1">
                    <strong>${product.productPrice}</strong>
                  </h4>
                  <div className="d-grid mt-4">
                    {product.isAddedToCart ? (
                      <Link className="btn btn-primary" to="/cart">
                        Go to Cart
                      </Link>
                    ) : (
                      <button
                        className="btn btn-secondary"
                        type="button"
                        onClick={() => handleUpdateCart(product._id)}
                        disabled={cartId === product._id}
                      >
                        {cartId === product._id ? (
                          <>
                            <span
                              className="spinner-border spinner-border-sm"
                              aria-hidden="true"
                            ></span>
                            <span role="status">Adding...</span>
                          </>
                        ) : (
                          "Add to Cart"
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </main>
  );
}
