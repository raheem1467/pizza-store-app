const Payment = require("../models/Payment");
const Order = require("../models/Order");


exports.makePayment = async (req, res) => {

  const { orderId, paymentMethod } = req.body;

  const order = await Order.findById(orderId);

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  const payment = await Payment.create({
    orderId,
    userId: req.user._id,
    amount: order.totalAmount,
    paymentMethod,
    paymentStatus: "Completed"
  });

  order.paymentStatus = "Paid";
  await order.save();

  res.json({
    message: "Payment successful",
    payment
  });

};


exports.getUserPayments = async (req, res) => {

  const payments = await Payment.find({
    userId: req.user._id
  }).populate("orderId");

  res.json(payments);
};


exports.getAllPayments = async (req, res) => {

  const payments = await Payment.find()
    .populate("userId")
    .populate("orderId");

  res.json(payments);
};