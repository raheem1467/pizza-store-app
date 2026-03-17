const express = require("express");
const router = express.Router();
const { getAllUsers, updateUserRole } = require("../controllers/userController");
const { protect, admin } = require("../middleware/authMiddleware");

// Admin Routes
router.get("/all", protect, admin, getAllUsers);
router.put("/role/:id", protect, admin, updateUserRole);

module.exports = router;
