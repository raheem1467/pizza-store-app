import API from "../api/axios";

export const getNotifications = () => API.get("/notifications");

export const markNotificationsRead = () => API.put("/notifications/mark-read");

export const deleteNotifications = () => API.delete("/notifications/clear");
