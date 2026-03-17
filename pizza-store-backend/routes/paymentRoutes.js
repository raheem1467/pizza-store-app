const express = require("express");
const router = express.Router();

const {
  makePayment,
  getUserPayments,
  getAllPayments
} = require("../controllers/paymentController");

const { protect, admin } = require("../middleware/authMiddleware");


router.post("/pay", protect, makePayment);

router.get("/mypayments", protect, getUserPayments);

router.get("/all", protect, admin, getAllPayments);

module.exports = router;