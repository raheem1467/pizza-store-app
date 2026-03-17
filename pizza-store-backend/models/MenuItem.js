const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    price: {
        type: Number,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    image: {
        type: String,
        default: "https://images.unsplash.com/photo-1601924582975-7e7f5f9f3e33"
    },

    isAvailable: {
        type: Boolean,
        default: true
    }

}, { timestamps: true });

module.exports = mongoose.model("MenuItem", menuItemSchema);