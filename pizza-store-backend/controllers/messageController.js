const Message = require("../models/Message");


exports.sendMessage = async (req, res) => {

  const { userId, orderId, message } = req.body;

  const newMessage = await Message.create({
    userId,
    orderId,
    message
  });

  res.json(newMessage);
};


exports.getUserMessages = async (req, res) => {

  const messages = await Message.find({
    userId: req.user._id
  }).populate("orderId");

  res.json(messages);
};