import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import menuReducer from "./slices/menuSlice";
import cartReducer from "./slices/cartSlice";
import orderReducer from "./slices/orderSlice";
import adminReducer from "./slices/adminSlice";
import notificationReducer from "./slices/notificationSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    menu: menuReducer,
    cart: cartReducer,
    orders: orderReducer,
    admin: adminReducer,
    notifications: notificationReducer,
  },
});

export default store;
