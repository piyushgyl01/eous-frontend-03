import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from "react-router-dom";

export default function ProductCard({
  product,
  handleUpdateWishlist,
  wishlistId,
  handleUpdateCart,
  cartId,
  type,
}) {
  return (
    <div className="col-md-4 my-3 text-center">
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
          {type ? (
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
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
}
