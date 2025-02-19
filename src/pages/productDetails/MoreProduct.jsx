import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import useMessage from "../../customHooks/useMessage";
import useProductStatuses from "../../customHooks/useProductStatuses";
import useUpdateWishlist from "../../customHooks/useUpdateWishlist";
import useUpdateCart from "../../customHooks/useUpdateCart";
import useUnfilteredProducts from "../../customHooks/useUnfilteredProducts";

export default function MoreProduct({ id }) {
  const unfilteredProducts = useUnfilteredProducts();
  const message = useMessage();
  const { fetchStatus } = useProductStatuses();
  const { handleUpdateWishlist, wishlistId } = useUpdateWishlist();
  const { handleUpdateCart, cartId } = useUpdateCart();

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
          {unfilteredProducts
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
