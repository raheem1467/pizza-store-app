const express = require("express");
const router = express.Router();
const { getUserNotifications, markAsRead, clearAllNotifications } = require("../controllers/notificationController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getUserNotifications);
router.put("/mark-read", protect, markAsRead);
router.delete("/clear", protect, clearAllNotifications);

module.exports = router;
