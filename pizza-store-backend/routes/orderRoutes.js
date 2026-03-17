const express = require("express");
const router = express.Router();

const {
  placeOrder,
  getUserOrders,
  cancelOrder,
  getAllOrders,
  updateOrderStatus,
  getRevenue
} = require("../controllers/orderController");

const { protect, admin } = require("../middleware/authMiddleware");

router.post("/place", protect, placeOrder);

router.get("/myorders", protect, getUserOrders);

router.put("/cancel/:id", protect, cancelOrder);

router.get("/all", protect, admin, getAllOrders);

router.put("/status/:id", protect, admin, updateOrderStatus);

router.get("/revenue", protect, admin, getRevenue);

module.exports = router;