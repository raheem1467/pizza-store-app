const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order"
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    amount: {
      type: Number
    },

    paymentMethod: {
      type: String,
      enum: ["UPI", "Card", "Cash"]
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Completed"],
      default: "Pending"
    }

  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);