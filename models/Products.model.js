const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  title: { type: String, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  gender: { type: String, enum: ["male", "female", "both"], default: "both" },
  price: { type: Number, required: true },
  description: { type: String, required: true },
});

const ProductModel = mongoose.model("product", ProductSchema);

module.exports = {
  ProductModel,
};
