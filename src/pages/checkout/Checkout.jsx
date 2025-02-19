import { useSelector } from "react-redux";
import { getAllAddressStatuses } from "../../features/address/addressSlice";
import { getAllOrdersStatuses } from "../../features/order/orderSlice";
import usePriceDetails from "../../customHooks/usePriceDetails";
import useCheckoutHandlers from "./useCheckoutHandlers";
import useAddress from "./useAddress";
import useOrderHandler from "./useOrderHandler";
import useAddressContext from "../../contexts/AddressContext";
import useCartProducts from "../cart/useCartProducts";

export default function Checkout() {
  const { totalDiscountedPrice, productQuantities } = usePriceDetails();
  const products = useCartProducts();
  const addresses = useAddress();
  const { fetchStatus, updateStatus } = useSelector(getAllAddressStatuses);
  const { formData, setFormData } = useAddressContext();
  const {
    handleDelete,
    handleUpdate,
    selectedAddress,
    showEditModal,
    editAddressId,
    handleAddressSelect,
    handleEditClick,
    handleModalClose,
  } = useCheckoutHandlers();
  const { handlePlaceOrder } = useOrderHandler();
  const { addOrderStatus } = useSelector(getAllOrdersStatuses);

  return (
    <div className="container py-5">
      {fetchStatus === "loading" ? (
        <div className="text-center mt-4">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <h1 className="text-center mb-4">Checkout</h1>
          <section className="mb-5">
            <h5 className="mb-4">Saved Addresses</h5>
            <div className="row">
              {addresses.map((address) => (
                <div className="col-md-6 mb-3" key={address._id}>
                  <div className="card border-primary">
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            checked={selectedAddress === address._id}
                            onChange={() => handleAddressSelect(address)}
                          />
                          <label className="form-check-label">
                            <h6>
                              {address.firstName} {address.lastName}
                            </h6>
                            <p className="mb-1">{address.street}</p>
                            <p className="mb-1">{address.town}</p>
                            <p className="mb-1">{address.country}</p>
                            <p className="mb-0">{address.phoneNumber}</p>
                          </label>
                        </div>
                        <div>
                          <button
                            className="btn btn-sm btn-outline-primary me-2"
                            onClick={() => handleEditClick(address)}
                          >
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button className="btn btn-sm btn-outline-danger">
                            <i
                              className="bi bi-trash"
                              onClick={() => handleDelete(address._id)}
                            ></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <div className="row">
            {/* Billing Details Form */}
            <div className="col-md-8">
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title mb-4">Billing Details</h5>
                  <form>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label">First Name</label>
                        <input
                          type="text"
                          className="form-control"
                          value={formData.firstName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              firstName: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Last Name</label>
                        <input
                          type="text"
                          className="form-control"
                          value={formData.lastName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              lastName: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div className="col-12">
                        <label className="form-label">Street Address</label>
                        <input
                          type="text"
                          className="form-control"
                          value={formData.street}
                          onChange={(e) =>
                            setFormData({ ...formData, street: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Town</label>
                        <input
                          type="text"
                          className="form-control"
                          value={formData.town}
                          onChange={(e) =>
                            setFormData({ ...formData, town: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Province</label>
                        <input
                          type="text"
                          className="form-control"
                          value={formData.province}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              province: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">ZIP Code</label>
                        <input
                          type="number"
                          className="form-control"
                          value={formData.zip}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              zip: parseFloat(e.target.value),
                            })
                          }
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Country</label>
                        <input
                          type="text"
                          className="form-control"
                          value={formData.country}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              country: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Phone</label>
                        <input
                          type="tel"
                          className="form-control"
                          value={formData.phoneNumber}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              phoneNumber: parseFloat(e.target.value),
                            })
                          }
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          required
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="col-md-4">
              <div className="py-3 px-3 rounded shadow my-3">
                <h4>
                  <strong>YOUR ORDER</strong>
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
              </div>
            </div>
          </div>
        </>
      )}

      {/* Edit Address Modal */}
      <div
        className={`modal fade ${showEditModal ? "show d-block" : ""}`}
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Address</h5>
              <button
                type="button"
                className="btn-close"
                onClick={handleModalClose}
              ></button>
            </div>
            <div className="modal-body">
              {/* Add form fields similar to main form */}{" "}
              <form>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({ ...formData, firstName: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Street Address</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.street}
                      onChange={(e) =>
                        setFormData({ ...formData, street: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Town</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.town}
                      onChange={(e) =>
                        setFormData({ ...formData, town: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Province</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.province}
                      onChange={(e) =>
                        setFormData({ ...formData, province: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">ZIP Code</label>
                    <input
                      type="number"
                      className="form-control"
                      value={formData.zip}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          zip: parseFloat(e.target.value),
                        })
                      }
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Country</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.country}
                      onChange={(e) =>
                        setFormData({ ...formData, country: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Phone</label>
                    <input
                      type="tel"
                      className="form-control"
                      value={formData.phoneNumber}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          phoneNumber: parseFloat(e.target.value),
                        })
                      }
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleModalClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={() => handleUpdate(editAddressId)}
              >
                {updateStatus === "loading" ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
