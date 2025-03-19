import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllOrdersStatuses,
  postOrder,
} from "../../features/order/orderSlice";
import useQuantity from "../../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import useCheckoutHandlers from "./useCheckoutHandlers";
import useCartProducts from "../../customHooks/useCartProducts";
import useAddressContext from "../../contexts/AddressContext";
import usePriceDetails from "../../customHooks/usePriceDetails";
import {
  setMessage,
  updateCartAsync,
  fetchCartProductsAsync,
} from "../../features/product/productSlice";

export default function useOrderHandler() {
  const dispatch = useDispatch();
  const { formData, setFormData } = useAddressContext();
  const { productQuantities } = usePriceDetails();
  const { selectedAddress } = useCheckoutHandlers();
  const products = useCartProducts();
  const { updateQuantity, resetQuantities } = useQuantity();
  const { addOrderStatus } = useSelector(getAllOrdersStatuses);
  const navigate = useNavigate();

  // Handle order success
  useEffect(() => {
    if (addOrderStatus === "success") {
      dispatch(
        setMessage({
          show: true,
          message: "Order placed successfully",
          type: "success",
        })
      );

      // Reset form data
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

      // Clear message after delay
      setTimeout(() => {
        dispatch(
          setMessage({
            show: false,
            message: "",
            type: "warning",
          })
        );
      }, 3000);
    } else if (addOrderStatus === "error") {
      dispatch(
        setMessage({
          show: true,
          message: "Unable to place the order",
          type: "warning",
        })
      );
    }
  }, [addOrderStatus, dispatch, setFormData]);

  // Handle cart clearing after order placement
  useEffect(() => {
    if (addOrderStatus === "success") {
      const removeAllCartItems = async () => {
        try {
          // First reset all quantities 
          resetQuantities();
          
          // Then remove all products from cart
          for (const product of products) {
            await dispatch(updateCartAsync(product._id));
          }
          
          // Force refresh cart products list
          await dispatch(fetchCartProductsAsync());
          
        } catch (error) {
          console.error("Error clearing cart:", error);
        }
      };

      removeAllCartItems();
    } else if (addOrderStatus === "error") {
      dispatch(
        setMessage({
          show: true,
          message: "Error placing order. Please try again.",
          type: "warning",
        })
      );
    }
  }, [addOrderStatus, dispatch, navigate, products, resetQuantities]);

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

    if (selectedAddress === null) {
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

    const orderData = { items };

    try {
      await dispatch(postOrder(orderData));
      navigate("/order-placed");
    } catch (error) {
      console.error("Error placing order:", error);
      dispatch(
        setMessage({
          show: true,
          message: "Error placing order. Please try again.",
          type: "warning",
        })
      );
    }
  };

  return { handlePlaceOrder };
}