import { Link } from "react-router-dom";

export default function CartProduct({
  product,
  handleUpdateWishlist,
  wishlistId,
  handleUpdateCart,
  cartId,
  handleDecrement,
  handleIncrement,
  productQuantities,
}) {
  return (
    <div className="rounded shadow my-3">
      <div className="row p-4">
        <div className="col-md-5 d-flex align-items-center">
          <Link to={`/products/${product.productName}/${product._id}`}>
            <img
              src={product.productImg}
              className="img-fluid rounded"
              alt={product.productName}
            />
          </Link>
        </div>
        <div className="col-md-7 mt-4">
          <h4>{product?.productName}</h4>
          <div className="d-flex justify-content-start">
            <h3>
              <strong>
                ${product?.productPrice * (productQuantities[product._id] || 1)}
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
              <button type="button" className="btn btn-outline-secondary">
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
  );
}
