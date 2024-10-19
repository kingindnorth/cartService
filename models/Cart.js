// models/cart.js
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    customerId: String,
    items: [{
        productId: String,
        name: String,
        quantity: Number,
        price: Number,
        totalPrice: Number
    }],
    totalAmount: Number
});

const Cart = mongoose.model('Cart', cartSchema);