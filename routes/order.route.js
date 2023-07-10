const express = require("express");
const { orderModel } = require("../model/order.model");

const orderRouter = express.Router();

orderRouter.post("/orders", async (req, res) => {
  try {
    const { user, restaurant, items, totalPrice, deliveryAddress } = req.body;
    const order = new orderModel({
      user,
      restaurant,
      items,
      totalPrice,
      deliveryAddress,
      status: "Placed",
    });
    await order.save();
    res.status(201).send({ message: "Order Successfully Placed" });
  } catch (error) {
    res.send({ error: "An error occurred" });
  }
});

orderRouter.get("/orders", async (req, res) => {

  const order = await orderModel.findOne({});
  res.status(200).send(order);
});

orderRouter.get("/orders/:id", async (req, res) => {
  const id = req.params.id;
  const order = await orderModel.findOne({ _id: id });
  res.status(200).send(order);
});

orderRouter.put("/orders/:id", async (req, res) => {
  const { status } = req.body;
  const id = req.params.id;
  const order = await orderModel.findOne({ _id: id });
  order.status = status;
  await order.save();
  res.status(204).send("Status Successfully Updated");
});

module.exports = {
  orderRouter,
};
