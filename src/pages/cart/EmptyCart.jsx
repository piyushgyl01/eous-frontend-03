import React from "react";
import { Link } from "react-router-dom";

export default function EmptyCart() {
  return (
    <div className="container mt-5 py-5 text-center">
      <i
        className="bi bi-cart-x-fill text-secondary mb-3"  
        style={{ fontSize: "4rem" }}
      ></i>
       <h4 className="mt-3 text-secondary fw-bold">  
        Your cart is empty.
      </h4>
      <p className="text-muted">Browse our products and add items to your cart.</p>
      <Link to="/products" className="btn btn-primary mt-3">  
          Browse Products
      </Link>
    </div>
  );
}