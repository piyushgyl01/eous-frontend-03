import { configureStore } from "@reduxjs/toolkit";
import { productsSlice } from "../features/product/productSlice";
import { addressSlice } from "../features/address/addressSlice";
import { ordersSlice } from "../features/order/orderSlice";

export default configureStore({
  reducer: {
    products: productsSlice.reducer,
    address: addressSlice.reducer,
    orders: ordersSlice.reducer,
  },
});
