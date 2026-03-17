import API from "../api/axios";

export const placeOrder = (data) =>
  API.post("/orders/place", data);

export const getOrders = () =>
  API.get("/orders/myorders");

export const cancelOrder = (id) =>
  API.put(`/orders/cancel/${id}`);