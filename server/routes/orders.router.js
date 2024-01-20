const express = require("express");
const { authentication } = require("../middlewares/Authentication.middleware");
const { OrdersModel } = require("../models/Orders.model");
const { UserModel } = require("../models/Users.model");

const ordersRouter = express.Router();

ordersRouter.post("/place", authentication, async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await UserModel.findOne({ _id: userId });
    if (!user) {
      return res.status(401).send({ message: "Access Denied" });
    }

    const orders = user.cart;

    if (orders.length == 0 || !orders) {
      return res.status(404).send({ message: "Orders not found" });
    }
    let price = 0;
    orders.forEach((el) => {
      price = price + el.price;
    });
    const placedAt = Date.now();
    try {
      const order = new OrdersModel({
        order: orders,
        placedAt,
        price,
        userId,
      });
      await order.save();
      user.cart = [];
      await user.save();
      res.send({ message: "Order Placed Sucessfully" });
    } catch (error) {
      res.status(501).send({ message: error.message });
    }
  } catch (error) {
    res.status(501).send({ message: error.message });
  }
});

module.exports = {
  ordersRouter,
};
