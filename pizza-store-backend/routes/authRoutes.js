const express = require("express");
const router = express.Router();

const { register, login, getProfile, updateProfile } = require("../controllers/authController");
const { sendOTP } = require("../controllers/otpController");
const { protect } = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.post("/send-otp", sendOTP);

router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);

module.exports = router;