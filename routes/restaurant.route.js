const express = require("express");
const { restaurantModel } = require("../model/restaurant.model");

const restRouter = express.Router();

restRouter.post("/restaurants", async (req, res) => {
  const rest = new restaurantModel(req.body);
  await rest.save();
  res.send("Resturant Created");
});

restRouter.get("/restaurants", async (req, res) => {
  try {
    const restaurants = await restaurantModel.find();
    res.send(restaurants);
  } catch (error) {
    res.sendStatus(500);
  }
});

restRouter.get("/restaurants/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const restaurant = await restaurantModel.findById(id);
    if (!restaurant) {
      return res.sendStatus(404);
    }
    res.send(restaurant);
  } catch (error) {
    res.sendStatus(500);
  }
});

restRouter.post("/restaurants/:id/menu", async (req, res) => {
  const { id } = req.params;
  const { name, description, price, image } = req.body;
  try {
    const restaurant = await restaurantModel.findById(id);
    if (!restaurant) {
      return res.sendStatus(404);
    }
    const newItem = { name, description, price, image };
    restaurant.menu.push(newItem);
    await restaurant.save();
    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(500);
  }
});

restRouter.post("/restaurants/:id/menu", async (req, res) => {
  const id = req.params.id;
  const { name, description, price, image } = req.body;
  const rest = await restaurantModel.findOne({ _id: id });
  const newItem = {
    name,
    description,
    price,
    image,
  };
  rest.menu.push(newItem);
  await rest.save();
  res.status(201).send("Item Added Into Menu");
});

restRouter.delete("/restaurants/:id/menu/:mid", async (req, res) => {
  const id = req.params.id;
  const mid = req.params.mid;

  const rest = await restaurantModel.findOne({ _id: id });
  const menu = rest.menu;
  const index = menu.findIndex((i) => i._id.toString() == mid);
  menu.splice(index, 1);
  await rest.save();
  res.status(202).send("Item Deleted From Menu");
});

module.exports = {
  restRouter
};
