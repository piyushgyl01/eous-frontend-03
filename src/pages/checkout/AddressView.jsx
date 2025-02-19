import React from "react";

export default function AddressView({
  address,
  selectedAddress,
  handleAddressSelect,
  handleEditClick,
  handleDelete,
}) {
  return (
    <div className="col-md-6 mb-3">
      <div className="card border-primary">
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <div className="form-check">
              <label className="form-check-label">
                <input
                  className="form-check-input"
                  type="radio"
                  checked={selectedAddress === address._id}
                  onChange={() => handleAddressSelect(address)}
                />
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
  );
}
