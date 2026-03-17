import API from "../api/axios";

export const loginUser = (data) => API.post("/auth/login", data);

export const sendOTP = (data) => API.post("/auth/send-otp", data);

export const registerUser = (data) => API.post("/auth/register", data);

export const getProfile = () => API.get("/auth/profile");

export const updateProfile = (data) => API.put("/auth/profile", data);