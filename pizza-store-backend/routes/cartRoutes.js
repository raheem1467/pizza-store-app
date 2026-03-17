const express = require("express");
const router = express.Router();

const {
  addToCart,
  getCart,
  removeItem,
  clearCart
} = require("../controllers/cartController");

const { protect } = require("../middleware/authMiddleware");


router.post("/add", protect, addToCart);

router.get("/", protect, getCart);

router.delete("/remove/:itemId", protect, removeItem);

router.delete("/clear", protect, clearCart);

module.exports = router;