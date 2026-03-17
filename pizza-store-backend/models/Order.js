const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    items: [
      {
        itemId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "MenuItem"
        },
        name: String,
        price: Number,
        quantity: Number
      }
    ],

    totalAmount: {
      type: Number
    },

    orderStatus: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected", "Preparing", "Delivered", "Cancelled"],
      default: "Pending"
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid"],
      default: "Pending"
    },

    deliveryMode: {
      type: String,
      enum: ["Delivery", "Pickup"]
    }

  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);