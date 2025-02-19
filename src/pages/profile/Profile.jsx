import { useSelector } from "react-redux";
import {
  
  getAllAddressStatuses,
} from "../../features/address/addressSlice";
import useAddressContext from "../../contexts/AddressContext";
import useMessage from "../../customHooks/useMessage";
import useOrders from "./useOrders";
import useProfileHandler from "./useProfileHandler";

export default function Profile() {
  const { formData, setFormData } = useAddressContext();
  const { message } = useMessage();
  const {
    showEditModal,
    handleEditClick,
    handleModalClose,
    handlePostAddress,
  } = useProfileHandler();
  const orders = useOrders();
  const { fetchStatus, addStatus } = useSelector(getAllAddressStatuses);

  return (
    <>
      <div className="container py-5">
        {fetchStatus === "loading" ? (
          <div className="text-center mt-4">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <>
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
            <div className="d-flex justify-content-between mb-4">
              <h1>
                Welcome! <span className="text-primary">John Doe</span>
              </h1>
            </div>
            <div className="card shadow">
              <div className="card-body p-4">
                <h2 className="text-primary mb-4">Profile Information</h2>

                <div className="row g-4">
                  {/* Personal Details Section */}
                  <div className="col-12 col-md-6">
                    <div>
                      <div className="d-flex align-items-center mb-2">
                        <i className="bi bi-person-fill text-primary me-2"></i>
                        <h5 className="mb-0">Personal Details</h5>
                      </div>
                      <hr className="mb-3" />
                      <div className="ms-4">
                        <p>
                          <strong>First Name:</strong> John
                        </p>
                        <p>
                          <strong>Last Name:</strong> Doe
                        </p>
                        <p>
                          <strong>Email:</strong> john.doe@example.com
                        </p>
                        <p>
                          <strong>Phone:</strong> +1 234 567 8900
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-md-6">
                    <div>
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <div className="d-flex align-items-center">
                          <i className="bi bi-house-fill text-primary me-2"></i>
                          <h5 className="mb-0">Address Details</h5>
                        </div>
                        <button
                          onClick={() => handleEditClick()}
                          className="btn btn-primary btn-sm"
                        >
                          <i className="bi bi-plus-lg me-1"></i>Add New Address
                        </button>
                      </div>
                      <hr className="mb-3" />
                      <div className="ms-4">
                        <p>
                          <strong>Street:</strong> 123 Main Street
                        </p>
                        <p>
                          <strong>Town:</strong> Anytown
                        </p>
                        <p>
                          <strong>Province:</strong> State
                        </p>
                        <p>
                          <strong>Country:</strong> United States
                        </p>
                        <p>
                          <strong>ZIP Code:</strong> 12345
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="mt-2 text-secondary">
                      <small>Account created: January 1, 2024</small>
                      <br />
                      <small>Last updated: February 13, 2025</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card shadow mt-5">
              <div className="card-body p-4">
                <h2 className="text-primary mb-4">Order History</h2>

                {orders.map((order) => (
                  <div key={order._id} className="card mb-3">
                    <div className="card-header p-3 bg-light border-bottom">
                      <div className="row align-items-center">
                        <div className="col-md-4 mb-2 mb-md-0">
                          <div className="d-flex align-items-center">
                            <div className="me-2">
                              <i className="bi bi-box text-primary"></i>
                            </div>
                            <div>
                              <small className="text-muted d-block">
                                Order ID
                              </small>
                              <strong>{order._id}</strong>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4 mb-2 mb-md-0">
                          <div className="d-flex align-items-center">
                            <div className="me-2">
                              <i className="bi bi-calendar3 text-primary"></i>
                            </div>
                            <div>
                              <small className="text-muted d-block">
                                Order Date & Time
                              </small>
                              <strong>
                                {new Intl.DateTimeFormat("en-US", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: true,
                                }).format(new Date(order.createdAt))}
                              </strong>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-4 text-md-end">
                          <span
                            className={`badge ${
                              Math.random() > 0.5 ? "bg-warning" : "bg-success"
                            } rounded-pill px-3 py-2`}
                          >
                            <i
                              className={`bi ${
                                Math.random() > 0.5 ? "bi-clock" : "bi-bag"
                              } me-1`}
                            ></i>
                            {Math.random() > 0.5 ? "Processing" : "Ordered"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table table-borderless mb-0">
                          <thead className="text-secondary">
                            <tr>
                              <th>Item</th>
                              <th>Quantity</th>
                              <th>Price</th>
                              <th>Subtotal</th>
                            </tr>
                          </thead>
                          <tbody>
                            {order.items.map((item) => (
                              <tr key={item._id}>
                                <td>{item.item}</td>
                                <td>{item.quantity}</td>
                                <td>${item?.price?.toFixed(2)}</td>
                                <td>
                                  ${(item?.quantity * item?.price).toFixed(2)}
                                </td>
                              </tr>
                            ))}
                            <tr className="border-top">
                              <td colSpan="3" className="text-end">
                                <strong>Total:</strong>
                              </td>
                              <td>
                                <strong>
                                  $
                                  {order.items
                                    .reduce(
                                      (sum, item) =>
                                        sum + item.quantity * item.price,
                                      0
                                    )
                                    .toFixed(2)}
                                </strong>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        <div
          className={`mt-5 pt-3 modal fade ${
            showEditModal ? "show d-block" : ""
          }`}
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
                          setFormData({
                            ...formData,
                            street: e.target.value,
                          })
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
                          setFormData({
                            ...formData,
                            town: e.target.value,
                          })
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
                          setFormData({
                            ...formData,
                            email: e.target.value,
                          })
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
                  onClick={() => handlePostAddress()} 
                  >
                  {addStatus === "loading" ? "Adding..." : "Add Address"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
