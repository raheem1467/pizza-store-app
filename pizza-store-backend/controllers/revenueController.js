const Order = require("../models/Order");

exports.getMonthlyRevenue = async (req, res) => {

  try {

    const orders = await Order.find({
      orderStatus: "Delivered",
      paymentStatus: "Paid"
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