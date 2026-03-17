import API from "../api/axios";

export const getMenuItems = () => API.get("/menu");