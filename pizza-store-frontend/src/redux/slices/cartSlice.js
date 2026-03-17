import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCart, removeItem } from "../../services/cartService";
import { placeOrder } from "../../services/orderService";

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCart();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch cart");
    }
  }
);

export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      await removeItem(id);
      dispatch(fetchCart());
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to remove item");
    }
  }
);

export const checkoutCart = createAsyncThunk(
  "cart/checkoutCart",
  async (orderData, { dispatch, rejectWithValue }) => {
    try {
      const response = await placeOrder(orderData);
      dispatch(fetchCart());
      return response.data;
    } catch (error) {
       return rejectWithValue(error.response?.data || "Failed to place order");
    }
  }
);

const initialState = {
  cart: null,
  status: "idle",
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cart = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(checkoutCart.fulfilled, (state) => {
         // Upon successful checkout, local cart can be viewed as empty or we wait for fetchCart to update it
         state.status = "succeeded";
      });
  },
});

export default cartSlice.reducer;
