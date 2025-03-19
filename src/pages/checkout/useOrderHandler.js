import { useEffect, useState } from "react";
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
} from "../../features/product/productSlice";

export default function useOrderHandler() {
  const dispatch = useDispatch();
  const { formData, setFormData } = useAddressContext();
  const { productQuantities } = usePriceDetails();
  const [isProcessingCart, setIsProcessingCart] = useState(false);

  const { selectedAddress } = useCheckoutHandlers();
  const products = useCartProducts();
  const { updateQuantity } = useQuantity();

  const { addOrderStatus } = useSelector(getAllOrdersStatuses);
  const navigate = useNavigate();

  // Handle order status changes
  useEffect(() => {
    if (addOrderStatus === "success") {
      dispatch(
        setMessage({
          show: true,
          message: "Order placed successfully",
          type: "success",
        })
      );

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

  // Clear cart after successful order
  useEffect(() => {
    if (addOrderStatus === "success" && !isProcessingCart) {
      const removeAllCartItems = async () => {
        setIsProcessingCart(true);
        try {
          // Create a copy of the current products to avoid mutation issues
          const productsToRemove = [...products];
          
          // Clear all quantities first to avoid price calculation issues
          productsToRemove.forEach((product) => {
            updateQuantity(product._id, 1);
          });
          
          // Then remove each product from cart
          for (const product of productsToRemove) {
            await dispatch(updateCartAsync(product._id)).unwrap();
          }
          
          // Navigate only after cart is fully cleared
          navigate("/order-placed");
        } catch (error) {
          console.error("Error clearing cart:", error);
          dispatch(
            setMessage({
              show: true,
              message: "Error processing order. Some items may remain in cart.",
              type: "warning",
            })
          );
        } finally {
          setIsProcessingCart(false);
        }
      };

      removeAllCartItems();
    }
  }, [addOrderStatus, dispatch, navigate, products, updateQuantity, isProcessingCart]);

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
      await dispatch(postOrder(orderData)).unwrap();
      // Navigation moved to the useEffect that processes cart clearing
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

  return { handlePlaceOrder, isProcessingCart };
}