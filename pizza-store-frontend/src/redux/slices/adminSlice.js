import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/axios";
import { getMenuItems } from "../../services/menuService";

// Admin Menu Thunks
export const fetchAdminMenu = createAsyncThunk(
  "admin/fetchAdminMenu",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getMenuItems();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch admin menu");
    }
  }
);

export const deleteAdminPizza = createAsyncThunk(
  "admin/deleteAdminPizza",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      await API.delete(`/menu/${id}`);
      dispatch(fetchAdminMenu());
      return id;
    } catch (error) {
       return rejectWithValue(error.response?.data || "Failed to delete pizza");
    }
  }
);

// Admin Orders Thunks
export const fetchAllOrders = createAsyncThunk(
  "admin/fetchAllOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/orders/all");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch all orders");
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "admin/updateOrderStatus",
  async ({ id, status, message }, { dispatch, rejectWithValue }) => {
    try {
      const response = await API.put(`/orders/status/${id}`, { status, message });
      dispatch(fetchAllOrders());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update order status");
    }
  }
);

// Revenue Thunks
export const fetchRevenue = createAsyncThunk(
  "admin/fetchRevenue",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/orders/revenue");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch revenue");
    }
  }
);

// User Management Thunks
export const fetchAllUsers = createAsyncThunk(
  "admin/fetchAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/users/all");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch users");
    }
  }
);

export const updateUserRole = createAsyncThunk(
  "admin/updateUserRole",
  async ({ id, role }, { dispatch, rejectWithValue }) => {
    try {
      const response = await API.put(`/users/role/${id}`, { role });
      dispatch(fetchAllUsers());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update user role");
    }
  }
);


const initialState = {
  menu: [],
  orders: [],
  users: [],
  revenue: null,
  status: "idle",
  error: null,
};


const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Menu
      .addCase(fetchAdminMenu.pending, (state) => { state.status = "loading"; })
      .addCase(fetchAdminMenu.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.menu = action.payload;
      })
      .addCase(fetchAdminMenu.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Fetch Orders
      .addCase(fetchAllOrders.pending, (state) => { state.status = "loading"; })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Fetch Revenue
      .addCase(fetchRevenue.pending, (state) => { state.status = "loading"; })
      .addCase(fetchRevenue.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.revenue = action.payload;
      })
      .addCase(fetchRevenue.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Fetch Users
      .addCase(fetchAllUsers.pending, (state) => { state.status = "loading"; })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default adminSlice.reducer;
