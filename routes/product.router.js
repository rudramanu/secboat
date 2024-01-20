const express = require("express");
const { ProductModel } = require("../models/Products.model");
const {
  authentication,
  isAdmin,
} = require("../middlewares/Authentication.middleware");

const productRouter = express.Router();

productRouter.get("/", async (req, res) => {
  try {
    const data = await ProductModel.find();
    return res.send(data);
  } catch (error) {
    return res.status(501).send({ message: error.message });
  }
});
productRouter.get("/category/:categoryId", async (req, res) => {
  const { categoryId } = req.params;
  try {
    const products = await ProductModel.find({
      category: categoryId,
    });
    return res.send(products);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

productRouter.post("/add", authentication, isAdmin, async (req, res) => {
  const payload = req.body;
  try {
    const product = new ProductModel(payload);
    await product.save();
    res.send({ message: "Product added" });
  } catch (error) {
    return res.status(501).send({ message: error.message });
  }
});

module.exports = {
  productRouter,
};
