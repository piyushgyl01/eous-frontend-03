import React from "react";

export default function ProfileCard({ handleEditClick }) {
  return (
    <div className="card shadow">
      <div className="card-body p-4">
        <h2 className="text-primary mb-4">Profile Information</h2>

        <div className="row g-4">
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
  );
}
