import { Link } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";

export default function OrderPlaced() {
  return (
    <div className="container min-vh-100 d-flex align-items-center justify-content-center py-5">
      <div className="row w-100">
        <div className="col-md-8 mx-auto text-center">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-5">
              {/* Success Icon */}
              <div className="mb-4">
                <CheckCircleIcon
                  sx={{ fontSize: 80 }}
                  className="text-success"
                />
              </div>

              {/* Success Message */}
              <h1 className="display-4 mb-4">Order Placed Successfully!</h1>
              <p className="lead text-muted mb-4">
                Thank you for your purchase. Your order has been confirmed and
                will be delivered soon.
              </p>

              {/* Action Buttons */}
              <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                <Link to="/" className="btn btn-primary btn-lg px-4 gap-3">
                  Continue Shopping
                </Link>
                <Link
                  to="/profile"
                  className="btn btn-outline-secondary btn-lg px-4"
                >
                  View Orders
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
