const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
  items: [
    {
      name: String,
      price: Number,
      quantity: Number,
    },
  ],
  totalPrice: Number,
  deliveryAddress: {
    street: String,
    city: String,
    state: String,
    country: String,
    zip: String,
  },

  status: {
    type: String,
    enum: ["Placed", "Preparing", "On The Way", "Delivered"],
  },
});

const orderModel = mongoose.model("Orders", orderSchema);

module.exports = {
  orderModel,
};
