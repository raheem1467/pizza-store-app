const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Notification = require("../models/Notification");

exports.placeOrder = async (req, res) => {

  const { deliveryMode } = req.body;

  const cart = await Cart.findOne({ userId: req.user._id });

  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  const order = await Order.create({
    userId: req.user._id,
    items: cart.items,
    totalAmount: cart.totalAmount,
    deliveryMode
  });

  await Cart.findOneAndDelete({ userId: req.user._id });

  res.json(order);
};


exports.getUserOrders = async (req, res) => {

  const orders = await Order.find({ userId: req.user._id });

  res.json(orders);
};
exports.cancelOrder = async (req, res) => {

  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  if (order.orderStatus !== "Pending") {
    return res.status(400).json({
      message: "Order cannot be cancelled after acceptance"
    });
  }

  order.orderStatus = "Cancelled";

  await order.save();

  res.json(order);

};


exports.getAllOrders = async (req, res) => {

  const orders = await Order.find().populate("userId");

  res.json(orders);
};


// exports.updateOrderStatus = async (req, res) => {

//   const order = await Order.findById(req.params.id);

//   order.orderStatus = req.body.status;

//   await order.save();

//   res.json(order);
// };
exports.updateOrderStatus = async (req, res) => {

  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  // once delivered or rejected, status cannot change
  if (order.orderStatus === "Delivered" || order.orderStatus === "Rejected") {
    return res.status(400).json({
      message: "Order already completed. Status cannot be changed."
    });
  }

  const { status, message: customMessage } = req.body;

  order.orderStatus = status;

  await order.save();

  // Build smart message: "Your order of Chicken Pizza, Coke has been Accepted"
  const itemNames = order.items && order.items.length > 0
    ? order.items.map(item => item.name).filter(name => name).join(", ")
    : `Order #${order._id.toString().slice(-5)}`;

  const smartMessage = customMessage || `🍕 Your order of ${itemNames} has been ${status}.`;

  console.log(`Generating Notification: ${smartMessage}`);

  // Create Notification
  await Notification.create({
    userId: order.userId,
    orderId: order._id,
    message: smartMessage
  });

  res.json(order);
};
exports.getRevenue = async (req, res) => {

  try {

    const orders = await Order.find({
      orderStatus: "Delivered"
    });

    let totalRevenue = 0;
    let monthlyRevenue = 0;

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    orders.forEach(order => {

      totalRevenue += order.totalAmount;

      const orderDate = new Date(order.createdAt);

      if (
        orderDate.getMonth() === currentMonth &&
        orderDate.getFullYear() === currentYear
      ) {
        monthlyRevenue += order.totalAmount;
      }

    });

    res.json({
      totalRevenue,
      monthlyRevenue,
      totalOrders: orders.length
    });

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};