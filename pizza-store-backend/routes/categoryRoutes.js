const express = require("express");
const router = express.Router();

const {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory
} = require("../controllers/categoryController");

const { protect, admin } = require("../middleware/authMiddleware");

router.post("/", protect, admin, createCategory);

router.get("/", getCategories);

router.put("/:id", protect, admin, updateCategory);

router.delete("/:id", protect, admin, deleteCategory);

module.exports = router;