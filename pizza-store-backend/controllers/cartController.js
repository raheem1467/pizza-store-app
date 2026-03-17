const Cart = require("../models/Cart");
const MenuItem = require("../models/MenuItem");


exports.addToCart = async (req, res) => {

  const { itemId, quantity } = req.body;

  const menuItem = await MenuItem.findById(itemId);

  if (!menuItem) {
    return res.status(404).json({ message: "Item not found" });
  }

  let cart = await Cart.findOne({ userId: req.user._id });

  if (!cart) {
    cart = new Cart({
      userId: req.user._id,
      items: []
    });
  }

  const itemIndex = cart.items.findIndex(
    item => item.itemId.toString() === itemId
  );

  if (itemIndex > -1) {
    cart.items[itemIndex].quantity += quantity;
  } else {

    cart.items.push({
      itemId,
      name: menuItem.name,
      price: menuItem.price,
      quantity
    });

  }

  cart.totalAmount = cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  await cart.save();

  res.json(cart);
};


exports.getCart = async (req, res) => {

  const cart = await Cart.findOne({ userId: req.user._id });

  res.json(cart);
};


exports.removeItem = async (req, res) => {

  const cart = await Cart.findOne({ userId: req.user._id });

  cart.items = cart.items.filter(
    item => item.itemId.toString() !== req.params.itemId
  );

  cart.totalAmount = cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  await cart.save();

  res.json(cart);
};


exports.clearCart = async (req, res) => {

  await Cart.findOneAndDelete({ userId: req.user._id });

  res.json({ message: "Cart cleared" });
};