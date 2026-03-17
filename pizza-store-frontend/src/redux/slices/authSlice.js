import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || null,
  role: localStorage.getItem("role") || null,
  name: localStorage.getItem("name") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.name = action.payload.name;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("role", action.payload.role);
      localStorage.setItem("name", action.payload.name);
    },
    logoutSuccess: (state) => {
      state.token = null;
      state.role = null;
      state.name = null;
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("name");
    },
    updateUserData: (state, action) => {
      state.name = action.payload.name;
      localStorage.setItem("name", action.payload.name);
    }
  },
});

export const { loginSuccess, logoutSuccess, updateUserData } = authSlice.actions;
export default authSlice.reducer;
