import { Link } from "react-router-dom";

export default function PriceDetails({
  totalDiscountedPrice,
  productQuantities,
  products,
  cart,
  addOrderStatus,
  handlePlaceOrder,
}) {
  return (
    <div className="col-md-4">
      <div className="py-3 px-3 rounded shadow my-3">
        <h4>
          <strong>{cart ? "PRICE DETAILS" : "YOUR ORDER"}</strong>
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
              (products.length > 0 ? (totalDiscountedPrice > 100 ? 0 : 5) : 0)
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
        {cart ? (
          <div className="d-grid gap-2 col-12 mx-auto text-center">
            <Link
              to="/checkout"
              className="bg-primary text-light py-2"
              type="button"
            >
              Checkout
            </Link>
          </div>
        ) : (
          <div className="d-grid gap-2 col-12 mx-auto text-center">
            <button
              className="bg-primary text-light py-2"
              type="button"
              onClick={() => handlePlaceOrder()}
              disabled={addOrderStatus === "loading"}
            >
              {addOrderStatus === "loading" ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm"
                    aria-hidden="true"
                  ></span>
                  <span role="status">Placing...</span>
                </>
              ) : (
                "Place Order"
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
