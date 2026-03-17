const express = require("express");
const router = express.Router();

const { getMonthlyRevenue } = require("../controllers/revenueController");

const { protect, admin } = require("../middleware/authMiddleware");

router.get("/monthly", protect, admin, getMonthlyRevenue);

module.exports = router;