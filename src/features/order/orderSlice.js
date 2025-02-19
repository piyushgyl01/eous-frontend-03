import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

export const fetchAllOrders = createAsyncThunk(
  "orders/fetchAllOrders",
  async () => {
    try {
      const response = await axios.get(`${baseUrl}/get-orders`);

      return response.data;
    } catch (error) {
      console.error("Fetch Error: ", error);
      throw error;
    }
  }
);

export const postOrder = createAsyncThunk(
  "orders/postOrder",
  async (orderData) => {
    try {
      const response = await axios.post(`${baseUrl}/post-order`, orderData);

      return response.data;
    } catch (error) {
      console.error("Post order Error: ", error);
      throw error;
    }
  }
);

export const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    fetchStatus: "idle",
    addOrderStatus: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOrders.pending, (state) => {
        state.fetchStatus = "loading";
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.fetchStatus = "success";
        state.orders = action.payload;
        state.error = null;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.fetchStatus = "error";
        state.error = action.error.message;
      })

      .addCase(postOrder.pending, (state) => {
        state.addOrderStatus = "loading";
      })
      .addCase(postOrder.fulfilled, (state, action) => {
        state.addOrderStatus = "success";
        state.orders.push(action.payload);
        state.error = null;
      })
      .addCase(postOrder.rejected, (state, action) => {
        state.addOrderStatus = "error";
        state.error = action.error.message;
      });
  },
});

export const getAllOrders = (state) => state.orders.orders;

export const getAllOrdersStatuses = createSelector(
  (state) => state.orders.fetchStatus,
  (state) => state.orders.addOrderStatus,

  (fetchStatus, addOrderStatus) => ({
    fetchStatus,
    addOrderStatus,
  })
);

export default ordersSlice.reducer;
