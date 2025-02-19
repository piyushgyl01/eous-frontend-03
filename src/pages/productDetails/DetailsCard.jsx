import { useNavigate } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import AssignmentReturnOutlinedIcon from "@mui/icons-material/AssignmentReturnOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import useProductStatuses from "../../customHooks/useProductStatuses";

export default function DetailsCard({
  product,
  id,
  productQuantities,
  updateQuantity,
  handleUpdateCart,
  cartId,
  handleBuyNow,
  wishlistId,
  handleUpdateWishlist,
}) {
  const navigate = useNavigate();
  const quantity = productQuantities[id] || 1;
  const {updateCartStatus} = useProductStatuses()

  return (
    <div className="row">
      <div className="col-md-5 mb-5">
        <div className="position-relative d-flex align-items-start flex-column gap-2 text-center">
          <div
            className="position-absolute top-0 end-0 m-2 bg-white rounded-circle d-flex justify-content-center align-items-center"
            style={{ width: "2rem", height: "2rem" }}
          >
            {wishlistId === id ? (
              <span
                className="spinner-border spinner-border-sm"
                aria-hidden="true"
              ></span>
            ) : (
              <FavoriteIcon
                onClick={() => handleUpdateWishlist(id)}
                className={
                  product?.isWishlisted ? "text-danger" : "text-secondary"
                }
              />
            )}
          </div>
          <img
            src={product?.productImg}
            className="img-fluid"
            alt={product?.productName}
          />
          <div className="d-grid gap-2 col-12 mx-auto">
            <div
              onClick={() => handleBuyNow(id)}
              className="bg-primary text-light py-2"
              type="button"
            >
              {updateCartStatus === "loading" ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm"
                      aria-hidden="true"
                    ></span>
                    <span role="status">Buying...</span>
                  </>
                ) : (
                  "Buy Now"
                )}
            </div>
            {product?.isAddedToCart ? (
              <button
                className="bg-success text-light py-2"
                type="button"
                onClick={() => navigate("/cart")}
              >
                Go to Cart
              </button>
            ) : (
              <button
                className="bg-secondary text-light py-2"
                type="button"
                onClick={() => handleUpdateCart(id)}
                disabled={cartId === id}
              >
                {cartId === id ? (
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
      <div className="col-md-6 ms-2">
        <h3>{product?.productName}</h3>
        <div className="d-flex justify-content-start">
          <p className="pt-1">{product?.productRating}</p>
          <span className="ms-1">
            {[...Array(5)].map((_, index) => {
              if (index < Math.floor(product?.productRating)) {
                return <StarIcon key={index} className="text-warning" />;
              } else if (
                index === Math.floor(product?.productRating) &&
                product?.productRating % 1 >= 0.5
              ) {
                return <StarHalfIcon key={index} className="text-warning" />;
              } else {
                return <StarOutlineIcon key={index} className="text-warning" />;
              }
            })}
          </span>
        </div>
        <div className="d-flex justify-content-start">
          <h1>
            <strong>${product?.productPrice * quantity}</strong>
          </h1>
          <h3 className="ps-3 pt-2 text-secondary text-decoration-line-through">
            ${product?.productPrice * quantity * 2}
          </h3>
        </div>
        <div className="mb-5">
          <h3 className="text-secondary">
            <strong>50% off</strong>
          </h3>
        </div>
        <div className="my-4 d-flex justify-content-start align-items-center">
          <h5 className="pt-2">
            <strong className="pe-3">Quantity:</strong>
          </h5>
          <div
            className="btn-group"
            role="group"
            aria-label="Basic mixed styles example"
          >
            <button
              onClick={() =>
                updateQuantity(id, (productQuantities[id] || 1) - 1)
              }
              type="button"
              className="btn btn-outline-secondary"
            >
              -
            </button>
            <button type="button" className="btn btn-outline-secondary">
              {productQuantities[id] || 1}
            </button>
            <button
              onClick={() =>
                updateQuantity(id, (productQuantities[id] || 1) + 1)
              }
              type="button"
              className="btn btn-outline-secondary"
            >
              +
            </button>
          </div>
        </div>
        <div className="my-5"></div>
        <hr />
        <div className="row d-flex align-items-center my-4">
          <div className="col-6 col-md-3 text-center mb-3">
            <AssignmentReturnOutlinedIcon
              color="primary"
              sx={{ fontSize: 40 }}
            />
            <p className="small mb-0">30 days Returnable</p>
          </div>
          <div className="col-6 col-md-3 text-center mb-3">
            <PaymentOutlinedIcon color="primary" sx={{ fontSize: 40 }} />
            <p className="small mb-0">Pay on Delivery</p>
          </div>
          <div className="col-6 col-md-3 text-center mb-3">
            <LocalShippingOutlinedIcon color="primary" sx={{ fontSize: 40 }} />
            <p className="small mb-0">Free Delivery</p>
          </div>
          <div className="col-6 col-md-3 text-center mb-3">
            <SecurityOutlinedIcon color="primary" sx={{ fontSize: 40 }} />
            <p className="small mb-0">Secure Payment</p>
          </div>
        </div>
        <hr />
        <div className="my-5"></div>
        <div className="my-5">
          <h5 className="pt-2">
            <strong className="mb-3">Product Description</strong>
          </h5>

          <ul className="list-group">
            {product?.productDescription.map((des) => (
              <li className="mt-1" key={des._id}>
                <strong>{des.title}: </strong> {des.details}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
