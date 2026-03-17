import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getOrders, cancelOrder } from "../../services/orderService";

export const fetchUserOrders = createAsyncThunk(
  "orders/fetchUserOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getOrders();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch orders");
    }
  }
);

export const cancelUserOrder = createAsyncThunk(
  "orders/cancelUserOrder",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      await cancelOrder(id);
      dispatch(fetchUserOrders());
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to cancel order");
    }
  }
);

const initialState = {
  orders: [],
  previousOrders: [],
  status: "idle",
  error: null,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    updatePreviousOrders: (state, action) => {
        state.previousOrders = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { updatePreviousOrders } = orderSlice.actions;

export default orderSlice.reducer;
