const User = require("../models/User");

// Get all users (Admin Only)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password").sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Update user role (Admin Only)
exports.updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.role = role || user.role;
    await user.save();

    res.json({ message: `User role updated to ${user.role}`, user });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
