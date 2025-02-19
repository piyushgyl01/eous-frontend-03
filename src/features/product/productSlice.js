import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

export const fetchAllProductsAsync = createAsyncThunk(
  "products/fetchAllProducts",
  async () => {
    try {
      const response = await axios.get(`${baseUrl}/get-all-products`);

      return response.data;
    } catch (error) {
      console.error("Fetch Error: ", error);
      throw error;
    }
  }
);

export const fetchProductByIdAsync = createAsyncThunk(
  "products/fetchProductById",
  async (id) => {
    try {
      const response = await axios.get(`${baseUrl}/get-product/${id}`);

      return response.data;
    } catch (error) {
      console.error("Fetch Error: ", error);
      throw error;
    }
  }
);

export const fetchProductByCategoryAsync = createAsyncThunk(
  "products/fetchProductByCategory",
  async (category) => {
    try {
      const response = await axios.get(
        `${baseUrl}/get-all-products/${category}`
      );

      return response.data;
    } catch (error) {
      console.error("Fetch Error: ", error);
      throw error;
    }
  }
);

export const fetchWishlistedProductsAsync = createAsyncThunk(
  "products/fetchWishlistedProducts",
  async () => {
    try {
      const response = await axios.get(`${baseUrl}/get-wishlisted-products`);

      return response.data;
    } catch (error) {
      console.error("Fetch Error: ", error);
      throw error;
    }
  }
);

export const fetchCartProductsAsync = createAsyncThunk(
  "products/fetchCartProducts",
  async () => {
    try {
      const response = await axios.get(`${baseUrl}/get-cart-products`);

      return response.data;
    } catch (error) {
      console.error("Fetch Error: ", error);
      throw error;
    }
  }
);

export const updateWishlistAsync = createAsyncThunk(
  "products/updateWishlist",
  async (id) => {
    try {
      const response = await axios.put(`${baseUrl}/update-wishlist/${id}`);

      return response.data;
    } catch (error) {
      console.error("Fetch Error: ", error);
      throw error;
    }
  }
);

export const updateCartAsync = createAsyncThunk(
  "products/updateCartAsync",
  async (id) => {
    try {
      const response = await axios.put(`${baseUrl}/update-cart/${id}`);

      return response.data;
    } catch (error) {
      console.error("Fetch Error: ", error);
      throw error;
    }
  }
);

export const selectAllProducts = (state) => state.products.products;
export const selectSelectedProduct = (state) => state.products.selectedProduct;
export const selectCartItems = (state) => state.products.cartItems;
export const selectWishlistItems = (state) => state.products.wishlistItems;
export const selectStatus = (state) => state.products.status;
export const selectFilters = (state) => state.products.filters;

export const selectFilteredProducts = createSelector(
  [selectAllProducts, selectFilters],
  (products, filters) => {
    return products
      .filter((product) => {
        // Price Range Filter
        const withinPriceRange =
          product.productPrice >= filters.priceRange.min &&
          product.productPrice <= filters.priceRange.max;

        // Category Filter
        const matchesCategory =
          filters.selectedCategories.length === 0 ||
          filters.selectedCategories.includes(product.category);

        // Rating Filter
        const matchesRating = product.productRating >= filters.selectedRating;

        const searchTerm = (filters.searchTerm || "").toLowerCase();
        const productName = (product.productName || "").toLowerCase();

        const matchesSearch = productName.includes(searchTerm);

        return (
          withinPriceRange && matchesCategory && matchesRating && matchesSearch
        );
      })
      .sort((a, b) => {
        // Sort Order
        if (filters.sortOrder === "lowToHigh") {
          return a.productPrice - b.productPrice;
        } else {
          return b.productPrice - a.productPrice;
        }
      });
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    selectedProduct: null,
    cartItems: [],
    wishlistItems: [],
    status: {
      fetchStatus: "idle",
      fetchProductByIdStatus: "idle",
      fetchProductByCategoryStatus: "idle",
      fetchWishlistedProductsStatus: "idle",
      fetchCartProductsStatus: "idle",
      updateCartStatus: "idle",
      updateWishlistStatus: "idle",
    },
    filters: {
      priceRange: { min: 0, max: 8000 },
      selectedCategories: [],
      selectedRating: 0,
      sortOrder: "lowToHigh",
      searchTerm: "",
    },
    error: null,
    message: {
      show: false,
      message: "",
      type: "warning",
    },
  },

  reducers: {
    // Price range filter
    setPriceRange: (state, action) => {
      state.filters.priceRange = action.payload;
    },

    // Category filter
    toggleCategory: (state, action) => {
      const category = action.payload;
      const index = state.filters.selectedCategories.indexOf(category);
      if (index === -1) {
        state.filters.selectedCategories.push(category);
      } else {
        state.filters.selectedCategories.splice(index, 1);
      }
    },

    // Rating filter
    setRating: (state, action) => {
      state.filters.selectedRating = action.payload;
    },

    // Sort order
    setSortOrder: (state, action) => {
      state.filters.sortOrder = action.payload;
    },

    // Reset all filters
    resetFilters: (state) => {
      state.filters = {
        priceRange: { min: 0, max: 8000 },
        selectedCategories: [],
        selectedRating: 0,
        sortOrder: "lowToHigh",
      };
    },

    setSearchTerm: (state, action) => {
      state.filters.searchTerm = action.payload;
    },

    setCategory: (state, action) => {
      state.filters.selectedCategories = [action.payload];
    },

    setMessage: (state, action) => {
      state.message = action.payload;
    },
  },
  //ASYNCHRONOUS ACTION HANDLERS
  extraReducers: (builder) => {
    builder

      //FETCH PRODUCT STATUS HANDLERS
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status.fetchStatus = "loading";
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status.fetchStatus = "success";
        state.products = action.payload;
      })
      .addCase(fetchAllProductsAsync.rejected, (state, action) => {
        state.status.fetchStatus = "error";
        state.error = action.error.message;
      })

      //FETCH PRODUCT BY ID STATUS HANDLERS
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status.fetchProductByIdStatus = "loading";
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status.fetchProductByIdStatus = "success";
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductByIdAsync.rejected, (state, action) => {
        state.status.fetchProductByIdStatus = "error";
        state.error = action.error.message;
      })

      //FETCH PRODUCT BY CATEGORY STATUS HANDLERS
      .addCase(fetchProductByCategoryAsync.pending, (state) => {
        state.status.fetchProductByCategoryStatus = "loading";
      })
      .addCase(fetchProductByCategoryAsync.fulfilled, (state, action) => {
        state.status.fetchProductByCategoryStatus = "success";
        state.products = action.payload;
      })
      .addCase(fetchProductByCategoryAsync.rejected, (state, action) => {
        state.status.fetchProductByCategoryStatus = "error";
        state.error = action.error.message;
      })

      //FETCH WISHLISTED PRODUCTS STATUS HANDLERS
      .addCase(fetchWishlistedProductsAsync.pending, (state) => {
        state.status.fetchWishlistedProductsStatus = "loading";
      })
      .addCase(fetchWishlistedProductsAsync.fulfilled, (state, action) => {
        state.status.fetchWishlistedProductsStatus = "success";
        state.wishlistItems = action.payload;
      })
      .addCase(fetchWishlistedProductsAsync.rejected, (state, action) => {
        state.status.fetchWishlistedProductsStatus = "error";
        state.error = action.error.message;
      })

      //FETCH CART PRODUCTS STATUS HANDLERS
      .addCase(fetchCartProductsAsync.pending, (state) => {
        state.status.fetchCartProductsStatus = "loading";
      })
      .addCase(fetchCartProductsAsync.fulfilled, (state, action) => {
        state.status.fetchCartProductsStatus = "success";
        state.cartItems = action.payload;
      })
      .addCase(fetchCartProductsAsync.rejected, (state, action) => {
        state.status.fetchCartProductsStatus = "error";
        state.error = action.error.message;
      })

      //UPDATE WISHLIST STATUS HANDLERS
      .addCase(updateWishlistAsync.pending, (state) => {
        state.status.updateWishlistStatus = "loading";
      })
      .addCase(updateWishlistAsync.fulfilled, (state, action) => {
        state.status.updateWishlistStatus = "success";
        const index = state.products.findIndex(
          (p) => p._id === action.payload._id
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
        if (action.payload.isWishlisted) {
          state.wishlistItems.push(action.payload);
        } else {
          state.wishlistItems = state.wishlistItems.filter(
            (item) => item._id !== action.payload._id
          );
        }
        if (
          state.selectedProduct &&
          state.selectedProduct._id === action.payload._id
        ) {
          state.selectedProduct = action.payload; // Update selectedProduct
        }
      })
      .addCase(updateWishlistAsync.rejected, (state, action) => {
        state.status.updateWishlistStatus = "error";
        state.error = action.error.message;
      })

      //UPDATE CART STATUS HANDLERS
      .addCase(updateCartAsync.pending, (state) => {
        state.status.updateCartStatus = "loading";
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        state.status.updateCartStatus = "success";
        const index = state.products.findIndex(
          (p) => p._id === action.payload._id
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
        if (action.payload.isAddedToCart) {
          state.cartItems.push(action.payload);
        } else {
          state.cartItems = state.cartItems.filter(
            (item) => item._id !== action.payload._id
          );
        }

        if (
          state.selectedProduct &&
          state.selectedProduct._id === action.payload._id
        ) {
          state.selectedProduct = action.payload; // Update selectedProduct
        }
      })
      .addCase(updateCartAsync.rejected, (state, action) => {
        state.status.updateCartStatus = "error";
        state.error = action.error.message;
      });
  },
});

export const selectTotalCartItems = createSelector(
  selectCartItems,
  (items) => items.length
);

export const selectTotalWishlistItems = createSelector(
  selectWishlistItems,
  (items) => items.length
);
export const {
  setPriceRange,
  toggleCategory,
  setRating,
  setSortOrder,
  resetFilters,
  setSearchTerm,
  setCategory,
  setMessage,
} = productsSlice.actions;

export default productsSlice.reducer;
