const express = require("express");
const { authentication } = require("../middlewares/Authentication.middleware");
const { ProductModel } = require("../models/Products.model");
const { UserModel } = require("../models/Users.model");

const cartRouter = express.Router();

cartRouter.get("/", authentication, async (req, res) => {
  const userId = req.body.userId;
  // console.log(userId);
  try {
    const user = await UserModel.findOne({ _id: userId });
    // console.log(user);
    const cart = user.cart;
    res.send(cart);
  } catch (error) {
    return res.status(501).send({ message: error.message });
  }
});

cartRouter.post("/add/:id", authentication, async (req, res) => {
  const productId = req.params["id"];
  const userId = req.body.userId;
  console.log;
  const user = await UserModel.findOne({ _id: userId });
  if (!user) {
    return res.status(401).send({ message: "Access Denied" });
  }
  const product = await ProductModel.findOne({ _id: productId });
  const cart = user.cart;

  if (cart.some((el) => el.productId === productId)) {
    return res.status(409).send({ message: "Product already in cart" });
  } else {
    try {
      await UserModel.findOneAndUpdate(
        { _id: userId },
        {
          $push: {
            cart: {
              productId,
              quantity: 1,
              price: product.price,
            },
          },
        }
      );
      res.send({ message: "Product added to cart" });
    } catch (error) {
      return res.status(501).send({ message: error.message });
    }
  }
});

module.exports = {
  cartRouter,
};
