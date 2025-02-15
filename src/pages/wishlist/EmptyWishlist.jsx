import React from "react";
import { Link } from "react-router-dom"; 

export default function EmptyWishlist() {
  return (
    <div className="container mt-5 py-5 text-center">
      <i
        className="bi bi-heartbreak-fill text-secondary"
        style={{ fontSize: "4rem" }}
      ></i> 
       <h4 className="mt-3 text-secondary">Your wishlist is empty.</h4>
      <p className="text-muted">Start adding items you love!</p>
      <Link to="/products" className="btn btn-outline-primary mt-3">
          Shop Now
      </Link>
    </div>
  );
}
