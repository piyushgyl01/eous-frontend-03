import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  fetchAllProductsAsync,
  selectAllProducts,
  selectStatus,
  updateCartAsync,
  updateWishlistAsync,
} from "../../features/product/productSlice";

import FavoriteIcon from "@mui/icons-material/Favorite";

export default function MoreProduct({ id }) {
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
  const products = useSelector(selectAllProducts);

  //DISPATCHING API CALL
  useEffect(() => {
    dispatch(fetchAllProductsAsync());
  }, [dispatch]);

  //GETTING STATUS STATES FROM STORE
  const { fetchStatus, updateCartStatus, updateWishlistStatus } =
    useSelector(selectStatus);

  //HANDLE UPDATE CART EFFECT
  useEffect(() => {
    if (updateCartStatus === "success") {
      setMessage({
        show: true,
        message: "Added to cart successfully",
        type: "success",
      });

      const timer = setTimeout(() => {
        setMessage({ show: false, message: "", type: "warning" });
      }, 3000);
      setCartId(null);

      return () => clearTimeout(timer);
    } else if (updateCartStatus === "error") {
      setMessage({
        show: true,
        message: "Error adding product to the cart",
        type: "warning",
      });
      setCartId(null);
    }
  }, [updateCartStatus, cartId]);

  //HANDLE UPDATE WISHLIST EFFECT
  useEffect(() => {
    if (updateWishlistStatus === "success") {
      setMessage({
        show: true,
        message: "Wishlist updated successfully",
        type: "success",
      });

      const timer = setTimeout(() => {
        setMessage({ show: false, message: "", type: "warning" });
      }, 3000);
      setWishlistId(null);

      return () => clearTimeout(timer);
    } else if (updateWishlistStatus === "error") {
      setMessage({
        show: true,
        message: "Error adding product to the cart",
        type: "warning",
      });
      setWishlistId(null);
    }
  }, [updateWishlistStatus, wishlistId]);

  //HANDLE UPDATE WISHLIST
  const handleUpdateWishlist = (id) => {
    setWishlistId(id);
    dispatch(updateWishlistAsync(id));
  };

  //HANDLE UPDATE CART
  const handleUpdateCart = (id) => {
    setCartId(id);
    dispatch(updateCartAsync(id));
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
          <h3>
            <strong>More builds you may like</strong>
          </h3>
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
          {products
            .filter((product) => product._id !== id)
            .map((product) => (
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
                          product.isWishlisted
                            ? "text-danger"
                            : "text-secondary"
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
