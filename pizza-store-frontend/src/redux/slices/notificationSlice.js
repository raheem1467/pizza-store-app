import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getNotifications, markNotificationsRead, deleteNotifications } from "../../services/notificationService";

export const fetchNotifications = createAsyncThunk(
  "notifications/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getNotifications();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const clearNotifications = createAsyncThunk(
  "notifications/clear",
  async (_, { rejectWithValue }) => {
    try {
      await markNotificationsRead();
      return true;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteAllNotifications = createAsyncThunk(
  "notifications/deleteAll",
  async (_, { rejectWithValue }) => {
    try {
      await deleteNotifications();
      return true;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    items: [],
    unreadCount: 0,
    loading: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.unreadCount = action.payload.filter((n) => !n.isRead).length;
      })
      .addCase(clearNotifications.fulfilled, (state) => {
        state.unreadCount = 0;
        state.items = state.items.map((n) => ({ ...n, isRead: true }));
      })
      .addCase(deleteAllNotifications.fulfilled, (state) => {
        state.items = [];
        state.unreadCount = 0;
      });
  },
});

export default notificationSlice.reducer;
