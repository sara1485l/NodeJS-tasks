const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    email: {
    type: String,
    required: true
    },
    rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
    },
    description: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 500
    },
    createdAt: {
    type: Date,
    default: Date.now
    }
});

const orderSchema = new mongoose.Schema({
    userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
    },
    products: [
    {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1 }
    }
    ],
    status: {
    type: String,
    enum: ["pending", "completed", "cancelled"],
    default: "pending"
    },
    review: reviewSchema
}, { timestamps: true });

const OrdersData = mongoose.model("Order", orderSchema);
module.exports = { OrdersData };
