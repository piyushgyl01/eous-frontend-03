import React from "react";

export default function OrderCard({ order }) {
  return (
    <div key={order._id} className="card mb-3">
      <div className="card-header p-3 bg-light border-bottom">
        <div className="row align-items-center">
          <div className="col-md-4 mb-2 mb-md-0">
            <div className="d-flex align-items-center">
              <div className="me-2">
                <i className="bi bi-box text-primary"></i>
              </div>
              <div>
                <small className="text-muted d-block">Order ID</small>
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
                <small className="text-muted d-block">Order Date & Time</small>
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
                  <td>${(item?.quantity * item?.price).toFixed(2)}</td>
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
                        (sum, item) => sum + item.quantity * item.price,
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
  );
}
