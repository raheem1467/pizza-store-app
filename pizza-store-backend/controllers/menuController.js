const MenuItem = require("../models/MenuItem");

exports.createMenuItem = async (req, res) => {

    try {

        const item = await MenuItem.create(req.body);

        res.status(201).json(item);

    } catch (err) {
        res.status(500).json(err);
    }

};


exports.getMenuItems = async (req, res) => {

    const items = await MenuItem.find();

    res.json(items);

};


exports.updateMenuItem = async (req, res) => {

    const item = await MenuItem.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.json(item);

};


exports.deleteMenuItem = async (req, res) => {

    await MenuItem.findByIdAndDelete(req.params.id);

    res.json({ message: "Deleted successfully" });

};