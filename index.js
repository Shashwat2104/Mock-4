const express = require("express");
const { dbConnection } = require("./configs/db");
const { userRouter } = require("./routes/user.route");
const { restRouter } = require("./routes/restaurant.route");
const { orderRouter } = require("./routes/order.route");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Food Delivery App");
});

app.use("/api", userRouter);
app.use("/api", restRouter);
app.use("/api", orderRouter);

app.listen(4500, async () => {
  try {
    await dbConnection;
    console.log("Connected To DataBase");
  } catch (error) {
    console.log(error.message);
  }
  console.log("listening At port 4500");
});
