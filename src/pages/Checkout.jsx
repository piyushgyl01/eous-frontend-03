import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteAddress,
  fetchAllAddresses,
  getAllAddresses,
  getAllAddressStatuses,
  postAddress,
  updateAddress,
} from "../features/address/addressSlice";
import {
  fetchAllProductsAsync,
  fetchCartProductsAsync,
  fetchWishlistedProductsAsync,
  selectAllProducts,
  selectCartItems,
  selectFilteredProducts,
  selectStatus,
  selectWishlistItems,
  updateCartAsync,
  updateWishlistAsync,
} from "../features/product/productSlice";
import { getAllOrdersStatuses, postOrder } from "../features/order/orderSlice";

import useQuantity from "../contexts/CartContext";

export default function Checkout() {
  //STATES
  const dispatch = useDispatch();

  const { productQuantities, updateQuantity } = useQuantity();

  const [wishlistId, setWishlistId] = useState(null);
  const [cartId, setCartId] = useState(null);
  const handleDecrement = (productId) => {
    updateQuantity(productId, (productQuantities[productId] || 1) - 1);
  };

  const handleIncrement = (productId) => {
    updateQuantity(productId, (productQuantities[productId] || 1) + 1);
  };

  //USE DISPATCH FUNCTION

  //USE SLECTOR TO GET ALL THE PRODUCTS FROM THE STORE
  const products = useSelector(selectCartItems);

  //DISPATCHING API CALL
  useEffect(() => {
    dispatch(fetchCartProductsAsync());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchAllProductsAsync());
  }, [dispatch]);

  //GETTING STATUS STATES FROM STORE
  const { fetchCartProductsStatus, updateCartStatus, updateWishlistStatus } =
    useSelector(selectStatus);

  //HANDLE UPDATE CART EFFECT
  useEffect(() => {
    if (updateCartStatus === "success") {
      setMessage({
        show: true,
        message: "Removed from the cart",
        type: "success",
      });

      const timer = setTimeout(() => {
        setMessage({ show: false, message: "", type: "warning" });
      }, 3000);
      setCartId(null);

      return () => clearTimeout(timer);
    } else if (updateCartStatus === "error") {
      setMessage({
        show: true,
        message: "Error adding product to the cart",
        type: "warning",
      });
      setCartId(null);
    }
  }, [updateCartStatus, cartId]);

  //HANDLE UPDATE WISHLIST EFFECT
  useEffect(() => {
    if (updateWishlistStatus === "success") {
      setMessage({
        show: true,
        message: "Moved to wishlist",
        type: "success",
      });

      const timer = setTimeout(() => {
        setMessage({ show: false, message: "", type: "warning" });
      }, 3000);
      setWishlistId(null);

      return () => clearTimeout(timer);
    } else if (updateWishlistStatus === "error") {
      setMessage({
        show: true,
        message: "Error adding product to the cart",
        type: "warning",
      });
      setWishlistId(null);
    }
  }, [updateWishlistStatus, wishlistId]);

  const unfilteredProducts = useSelector(selectAllProducts);

  //HANDLE UPDATE WISHLIST
  const handleUpdateWishlist = async (id) => {
    try {
      const filteredProduct = unfilteredProducts.filter(
        (prod) => prod._id === id
      );

      if (filteredProduct[0].isAddedToCart) {
        dispatch(updateCartAsync(id));
      }

      setWishlistId(id);
      await dispatch(updateWishlistAsync(id));
      // dispatch(fetchProductByIdAsync(id));
    } catch (error) {
      console.log("Updating wishlist error", error);
    }
  };

  // Calculate totals
  // const totalDiscountedPrice = products.reduce((acc, product) => {
  //   const qty = quantities[product._id] || 1;
  //   return acc + product.productPrice * qty;
  // }, 0);

  const totalDiscountedPrice = products.reduce((acc, product) => {
    const qty = productQuantities[product._id] || 1;
    return acc + product.productPrice * qty;
  }, 0);

  const totalOriginalPrice = products.reduce((acc, product) => {
    const qty = productQuantities[product._id] || 1;
    return acc + product.productPrice * 2 * qty;
  }, 0);

  const discount = totalOriginalPrice - totalDiscountedPrice;
  const deliveryCharges =
    products.length > 0 ? (totalDiscountedPrice > 100 ? 0 : 5) : 0;
  const totalAmount = totalDiscountedPrice + deliveryCharges;
  const savings = discount;

  //HANDLE UPDATE CART
  const handleUpdateCart = async (id) => {
    try {
      const filteredProduct = unfilteredProducts.filter(
        (prod) => prod._id === id
      );

      if (filteredProduct[0].isWishlisted) {
        dispatch(updateWishlistAsync(id));
      }

      setCartId(id);
      await dispatch(updateCartAsync(id));
      // dispatch(fetchProductByIdAsync(id));
    } catch (error) {
      console.log("Updating cart error", error);
    }
  };
  //STATES
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    country: "",
    street: "",
    town: "",
    province: "",
    zip: 0,
    phoneNumber: 0,
    email: "",
  });
  const [message, setMessage] = useState({
    show: false,
    message: "",
    type: "warning",
  });
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState(null);
  const [editAddressId, setEditAddressId] = useState(null);
  const handleAddressSelect = (address) => {
    setSelectedAddress(address._id);
    setFormData({
      firstName: address.firstName,
      lastName: address.lastName,
      country: address.country,
      street: address.street,
      town: address.town,
      province: address.province,
      zip: address.zip,
      phoneNumber: address.phoneNumber,
      email: address.email,
    });
  };
  const handleEditClick = (address) => {
    setFormData(address);
    setEditAddressId(address._id);
    setShowEditModal(true);
  };
  const handleModalClose = () => {
    setShowEditModal(false);
    setEditAddressId(null);
    setFormData({
      firstName: "",
      lastName: "",
      country: "",
      street: "",
      town: "",
      province: "",
      zip: 0,
      phoneNumber: 0,
      email: "",
    });
  };

  //USE DISPATCH FUNCTION

  //USE SLECTOR TO GET ALL THE PRODUCTS FROM THE STORE
  const addresses = useSelector(getAllAddresses);

  //DISPATCHING API CALL
  useEffect(() => {
    dispatch(fetchAllAddresses());
  }, [dispatch]);

  //GET ALL STATUSES FROM THE STORE
  const { fetchStatus, deleteStatus, updateStatus, addStatus } = useSelector(
    getAllAddressStatuses
  );

  //DELETE ADDRESS NOTIFICATION EFFECT
  useEffect(() => {
    if (deleteStatus === "success") {
      setMessage({
        show: true,
        message: "Address deleted successfully",
        type: "success",
      });

      const timer = setTimeout(() => {
        setMessage({ show: false, message: "", type: "warning" });
      }, 3000);

      return () => clearTimeout(timer);
    } else if (deleteStatus === "error") {
      setMessage({
        show: true,
        message: "Unable to delete the address",
        type: "warning",
      });
    }
  }, [deleteStatus]);

  //DELETE ADDRESS NOTIFICATION EFFECT
  useEffect(() => {
    if (updateStatus === "success") {
      setMessage({
        show: true,
        message: "Address updated successfully",
        type: "success",
      });

      const timer = setTimeout(() => {
        setMessage({ show: false, message: "", type: "warning" });
      }, 3000);

      return () => clearTimeout(timer);
    } else if (updateStatus === "error") {
      setMessage({
        show: true,
        message: "Unable to update the address",
        type: "warning",
      });
    }
  }, [updateStatus]);

  //DELETE ADDRESS NOTIFICATION EFFECT
  useEffect(() => {
    if (addStatus === "success") {
      setMessage({
        show: true,
        message: "Order placed successfully",
        type: "success",
      });

      setFormData({
        firstName: "",
        lastName: "",
        country: "",
        street: "",
        town: "",
        province: "",
        zip: 0,
        phoneNumber: 0,
        email: "",
      });

      const timer = setTimeout(() => {
        setMessage({ show: false, message: "", type: "warning" });
      }, 3000);

      return () => clearTimeout(timer);
    } else if (addStatus === "error") {
      setMessage({
        show: true,
        message: "Unable to place the order",
        type: "warning",
      });
    }
  }, [addStatus]);

  //HANDLE DELETE FUNCTION
  const handleDelete = (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this address?"
    );

    if (isConfirmed) {
      dispatch(deleteAddress(id));
    }
  };

  //HANDLE UPDATE FUNCTION
  const handleUpdate = () => {
    dispatch(updateAddress({ id: editAddressId, formData }));
    handleModalClose();
  };

  const { addOrderStatus } = useSelector(getAllOrdersStatuses);

  const navigate = useNavigate();

  useEffect(() => {
    if (addOrderStatus === "success") {
      // Remove all products from cart one by one
      const removeAllCartItems = async () => {
        try {
          // Loop through all products in cart and remove them
          for (const product of products) {
            await dispatch(updateCartAsync(product._id));
          }
          // Clear quantities from context
          products.forEach((product) => {
            updateQuantity(product._id, 1); // Reset quantities to 1
          });
          // Navigate to success page
          navigate("/order-placed");
        } catch (error) {
          console.error("Error clearing cart:", error);
        }
      };

      removeAllCartItems();
    } else if (addOrderStatus === "error") {
      setMessage({
        show: true,
        message: "Error placing order. Please try again.",
        type: "warning",
      });
    }
  }, [addOrderStatus, dispatch, navigate, products, updateQuantity]);

  const [orderData, setOrderData] = useState({
    items: [
      {
        item: "",
        quantity: 1,
        price: 0,
      },
    ],
  });

  const handlePlaceOrder = async () => {
    const requiredFields = [
      "firstName",
      "lastName",
      "street",
      "town",
      "province",
      "zip",
      "country",
      "phoneNumber",
      "email",
    ];

    // If no saved address is selected, validate the form
    if (!selectedAddress) {
      const emptyFields = requiredFields.filter((field) => !formData[field]);

      if (emptyFields.length > 0) {
        alert("Please fill in all address fields");
        return;
      }
    }

    const items = products.map((product) => ({
      item: product.productName,
      quantity: productQuantities[product._id] || 1,
      price: product.productPrice,
    }));

    // Create the actual order object
    const orderData = { items };

    try {
      if (selectedAddress === null) {
        // If it's a new address, first save it then place order
        await dispatch(postAddress(formData));
      }

      // Place the order
      await dispatch(postOrder(orderData));

      // Navigate to order success page
      navigate("/order-placed");
    } catch (error) {
      console.error("Error placing order:", error);
      setMessage({
        show: true,
        message: "Error placing order. Please try again.",
        type: "warning",
      });
    }
  };

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

      {/* Toast Notification */}
      {/* <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1050 }}>
        <div className="toast show align-items-center text-white bg-success border-0">
          <div className="d-flex">
            <div className="toast-body">Success message goes here</div>
            <button
              type="button"
              className="btn-close btn-close-white me-2 m-auto"
            ></button>
          </div>
        </div>
      </div> */}
    </div>
  );
}
