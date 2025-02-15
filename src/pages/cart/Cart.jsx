import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  fetchAllProductsAsync,
  fetchCartProductsAsync,
  selectAllProducts,
  selectCartItems,
  selectStatus,
  updateCartAsync,
  updateWishlistAsync,
} from "../../features/product/productSlice";

import EmptyCart from "./EmptyCart";
import useQuantity from "../../contexts/CartContext";

export default function Cart() {
  //STATES
  const [message, setMessage] = useState({
    show: false,
    message: "",
    type: "warning",
  });
  const { productQuantities, updateQuantity } = useQuantity();

  const [wishlistId, setWishlistId] = useState(null);
  const [cartId, setCartId] = useState(null);
  const handleDecrement = (productId) => {
    updateQuantity(productId, (productQuantities[productId] || 1) - 1);
  };

  const handleIncrement = (productId) => {
    updateQuantity(productId, (productQuantities[productId] || 1) + 1);
  };

  //USE DISPATCH FUNCTION
  const dispatch = useDispatch();

  //USE SLECTOR TO GET ALL THE PRODUCTS FROM THE STORE
  const products = useSelector(selectCartItems);

  //DISPATCHING API CALL
  useEffect(() => {
    dispatch(fetchCartProductsAsync());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchAllProductsAsync());
  }, [dispatch]);

  //GETTING STATUS STATES FROM STORE
  const { fetchCartProductsStatus, updateCartStatus, updateWishlistStatus } =
    useSelector(selectStatus);

  //HANDLE UPDATE CART EFFECT
  useEffect(() => {
    if (updateCartStatus === "success" && cartId) {
      setMessage({
        show: true,
        message: "Removed from the cart",
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
        message: "Moved to wishlist",
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
        setWishlistId(null); // Add timeout for error case too
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [updateWishlistStatus, wishlistId]);

  const unfilteredProducts = useSelector(selectAllProducts);

  //HANDLE UPDATE WISHLIST
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
      // dispatch(fetchProductByIdAsync(id));
    } catch (error) {
      console.log("Updating wishlist error", error);
    }
  };

  const totalDiscountedPrice = products.reduce((acc, product) => {
    const qty = productQuantities[product._id] || 1;
    return acc + product.productPrice * qty;
  }, 0);

  const totalOriginalPrice = products.reduce((acc, product) => {
    const qty = productQuantities[product._id] || 1;
    return acc + product.productPrice * 2 * qty;
  }, 0);

  const discount = totalOriginalPrice - totalDiscountedPrice;
  const deliveryCharges =
    products.length > 0 ? (totalDiscountedPrice > 100 ? 0 : 5) : 0;
  const totalAmount = totalDiscountedPrice + deliveryCharges;
  const savings = discount;

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
    <div className="container my-5">
      <main className="row">
        {products.length < 0 && fetchCartProductsStatus === "loading" ? (
          <div className="text-center mt-4">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            <h1 className="text-center">My Cart ({products.length})</h1>
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
            {fetchCartProductsStatus === "error" && (
              <div className="alert alert-danger mt-3" role="alert">
                Unable to load the products
              </div>
            )}
            <div className="col-md-8 ">
              {products.length === 0 && <EmptyCart />}
              {products.map((product) => (
                <div className=" rounded shadow my-3" key={product._id}>
                  <div className="row p-4">
                    <div className="col-md-5 d-flex align-items-center">
                      <Link
                        to={`/products/${product.productName}/${product._id}`}
                      >
                        <img
                          src={product.productImg}
                          className="img-fluid rounded"
                          alt={product.productName}
                        />
                      </Link>
                    </div>
                    <div className="col-md-7">
                      <h4>{product?.productName}</h4>
                      <div className="d-flex justify-content-start">
                        <h3>
                          <strong>
                            $
                            {product?.productPrice *
                              (productQuantities[product._id] || 1)}
                          </strong>
                        </h3>
                        <h5 className="ps-3 pt-1 text-secondary text-decoration-line-through">
                          $
                          {product?.productPrice *
                            (productQuantities[product._id] || 1) *
                            2}
                        </h5>
                      </div>
                      <div>
                        <h5 className="text-secondary">
                          <strong>50% off</strong>
                        </h5>
                      </div>
                      <div className="d-flex justify-content-start align-items-center">
                        <h5 className="pt-2">
                          <strong className="pe-3">Quantity:</strong>
                        </h5>
                        <div
                          className="btn-group"
                          role="group"
                          aria-label="Basic mixed styles example"
                        >
                          <button
                            onClick={() => handleDecrement(product._id)}
                            type="button"
                            className="btn btn-outline-secondary"
                          >
                            -
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline-secondary"
                          >
                            {productQuantities[product._id] || 1}
                          </button>
                          <button
                            onClick={() => handleIncrement(product._id)}
                            type="button"
                            className="btn btn-outline-secondary"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="d-grid gap-2 col-12 mx-auto text-center mt-5">
                        <button
                          className="bg-secondary text-light py-2"
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
                              <span role="status">Removing...</span>
                            </>
                          ) : (
                            "Remove from Cart"
                          )}
                        </button>
                        <button
                          className="border border-secondary text-secondary py-2"
                          type="button"
                          onClick={() => handleUpdateWishlist(product._id)}
                          disabled={wishlistId === product._id}
                        >
                          {wishlistId === product._id ? (
                            <>
                              <span
                                className="spinner-border spinner-border-sm"
                                aria-hidden="true"
                              ></span>
                              <span role="status">Moving...</span>
                            </>
                          ) : (
                            "Move to Wishlist"
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-md-4">
              <div className="py-3 px-3 rounded shadow my-3">
                <h4>
                  <strong>PRICE DETAILS</strong>
                </h4>
                <hr />
                <div className="d-flex justify-content-between">
                  <p>Price ({products.length} items)</p>
                  <p>
                    $
                    {products
                      .reduce((acc, product) => {
                        const qty = productQuantities[product._id] || 1;
                        return acc + product.productPrice * 2 * qty;
                      }, 0)
                      .toFixed(2)}
                  </p>
                </div>
                <div className="d-flex justify-content-between">
                  <p>Discount</p>
                  <p>
                    -$
                    {products
                      .reduce((acc, product) => {
                        const qty = productQuantities[product._id] || 1;
                        return acc + product.productPrice * qty;
                      }, 0)
                      .toFixed(2)}
                  </p>
                </div>
                <div className="d-flex justify-content-between">
                  <p>Delivery Charges</p>
                  <p>
                    $
                    {products.length > 0
                      ? (totalDiscountedPrice > 100 ? 0 : 5).toFixed(2)
                      : 0}
                  </p>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <h4>
                    <strong>TOTAL AMOUNT</strong>
                  </h4>
                  <p>
                    $
                    {(
                      products.reduce((acc, product) => {
                        const qty = productQuantities[product._id] || 1;
                        return acc + product.productPrice * qty;
                      }, 0) +
                      (products.length > 0
                        ? totalDiscountedPrice > 100
                          ? 0
                          : 5
                        : 0)
                    ).toFixed(2)}
                  </p>
                </div>
                <hr />
                <p>
                  You will save $
                  {products
                    .reduce((acc, product) => {
                      const qty = productQuantities[product._id] || 1;
                      return acc + product.productPrice * qty;
                    }, 0)
                    .toFixed(2)}{" "}
                  on this order
                </p>
                <div className="d-grid gap-2 col-12 mx-auto text-center">
                  <Link
                    to="/checkout"
                    className="bg-primary text-light py-2"
                    type="button"
                  >
                    Checkout
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
