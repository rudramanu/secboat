const mongoose = require("mongoose");
const CartSchema = mongoose.Schema(
  {
    productId: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  { _id: false }
);

const OrderSchema = mongoose.Schema({
  order: { type: [CartSchema], required: true },
  price: { type: Number, required: true },
  placedAt: { type: Date, required: true },
  deliveredOn: Date,
  status: {
    type: String,
    enum: ["Placed", "Pending", "Delivered"],
    default: "Placed",
  },
  userId: { type: String, required: true },
});

const OrdersModel = mongoose.model("order", OrderSchema);

module.exports = {
  OrdersModel,
};
