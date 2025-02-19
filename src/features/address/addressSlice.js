import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

export const fetchAllAddresses = createAsyncThunk(
  "address/fetchAllAddresses",
  async () => {
    try {
      const response = await axios.get(`${baseUrl}/get-address`);

      return response.data;
    } catch (error) {
      console.error("Fetch Error: ", error);
      throw error;
    }
  }
);

export const postAddress = createAsyncThunk(
  "address/postAddress",
  async (formData) => {
    try {
      const response = await axios.post(`${baseUrl}/post-address`, formData);

      return response.data;
    } catch (error) {
      console.error("Post Error: ", error);
      throw error;
    }
  }
);

export const updateAddress = createAsyncThunk(
  "address/updateAddress",
  async ({ id, formData }) => {
    try {
      const response = await axios.put(
        `${baseUrl}/put-address/${id}`,
        formData
      );

      return response.data;
    } catch (error) {
      console.error("Put Error: ", error);
      throw error;
    }
  }
);

export const deleteAddress = createAsyncThunk(
  "address/deleteAddress",
  async (id) => {
    try {
      const response = await axios.delete(`${baseUrl}/delete-address/${id}`);

      return { id };
    } catch (error) {
      console.error("Delete Error: ", error);
      throw error;
    }
  }
);

export const addressSlice = createSlice({
  name: "address",
  initialState: {
    address: [],
    fetchStatus: "idle",
    addStatus: "idle",
    deleteStatus: "idle",
    updateStatus: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllAddresses.pending, (state) => {
        state.fetchStatus = "loading";
      })
      .addCase(fetchAllAddresses.fulfilled, (state, action) => {
        state.fetchStatus = "success";
        state.address = action.payload;
        state.error = null;
      })
      .addCase(fetchAllAddresses.rejected, (state, action) => {
        state.fetchStatus = "error";
        state.error = action.error.message;
      })

      .addCase(postAddress.pending, (state) => {
        state.addStatus = "loading";
      })
      .addCase(postAddress.fulfilled, (state, action) => {
        state.addStatus = "success";
        state.address.push(action.payload);
        state.error = null;
      })
      .addCase(postAddress.rejected, (state, action) => {
        state.addStatus = "error";
        state.error = action.error.message;
      })

      .addCase(deleteAddress.pending, (state) => {
        state.deleteStatus = "loading";
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.deleteStatus = "success";
        state.address = state.address.filter(
          (adrs) => adrs._id !== action.payload.id
        );
        state.error = null;
      })
      .addCase(deleteAddress.rejected, (state, action) => {
        state.deleteStatus = "error";
        state.error = action.error.message;
      })

      .addCase(updateAddress.pending, (state) => {
        state.updateStatus = "loading";
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        state.updateStatus = "success";
        const updatedAddress = action.payload;
        const index = state.address.findIndex(
          (adrs) => adrs._id === updatedAddress._id
        );
        if (index !== -1) {
          state.address[index] = updatedAddress;
        }
        state.error = null;
      })
      .addCase(updateAddress.rejected, (state, action) => {
        state.updateStatus = "error";
        state.error = action.error.message;
      });
  },
});

export const getAllAddresses = (state) => state.address.address;

export const getAllAddressStatuses = createSelector(
  (state) => state.address.fetchStatus,
  (state) => state.address.addStatus,
  (state) => state.address.deleteStatus,
  (state) => state.address.updateStatus,

  (fetchStatus, addStatus, deleteStatus, updateStatus) => ({
    fetchStatus,
    addStatus,
    deleteStatus,
    updateStatus,
  })
);

export default addressSlice.reducer;
