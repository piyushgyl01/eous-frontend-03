import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EmptyWishlist from "./EmptyWishlist";
import useWishlisted from "./useWishlisted";
import useProductStatuses from "../../customHooks/useProductStatuses";
import useMessage from "../../customHooks/useMessage";
import useUpdateWishlist from "../../customHooks/useUpdateWishlist";
import useUpdateCart from "../../customHooks/useUpdateCart";

export default function Wishlist() {
   const message = useMessage();
  const products = useWishlisted();
  const { fetchWishlistedProductsStatus } = useProductStatuses();
  const { handleUpdateWishlist, wishlistId } = useUpdateWishlist();
  const { handleUpdateCart, cartId } = useUpdateCart();

  return (
    <div className="container my-5">
      {products.length === 0 && <EmptyWishlist />}
      <main className="row">
        {products.length > 0 && fetchWishlistedProductsStatus === "loading" ? (
          <div className="text-center mt-4">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            {products.length > 0 && (
              <h1 className="text-center">My Wishlist ({products.length})</h1>
            )}
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

            {fetchWishlistedProductsStatus === "error" && (
              <div className="alert alert-danger mt-3" role="alert">
                Unable to load the products
              </div>
            )}
            {products.map((product) => (
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
                            <span role="status">Moving...</span>
                          </>
                        ) : (
                          "Move to Cart"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </main>
    </div>
  );
}
