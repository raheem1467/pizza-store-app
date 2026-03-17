import API from "../api/axios";

export const addToCart = (data) => API.post("/cart/add", data);

export const getCart = () => API.get("/cart");

export const removeItem = (id) => API.delete(`/cart/remove/${id}`);