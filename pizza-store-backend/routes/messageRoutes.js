const express = require("express");
const router = express.Router();

const {
  sendMessage,
  getUserMessages
} = require("../controllers/messageController");

const { protect, admin } = require("../middleware/authMiddleware");


router.post("/send", protect, admin, sendMessage);

router.get("/my", protect, getUserMessages);

module.exports = router;