const mongoose = require("mongoose");
const CartSchema = mongoose.Schema(
  {
    productId: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  { _id: false }
);

const UserSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  password: { type: String, required: true },
  cart: {
    type: [CartSchema],
    default: [],
  },
  role: { type: String, enum: ["user", "admin"], default: "user" },
});

const UserModel = mongoose.model("user", UserSchema);

module.exports = {
  UserModel,
};
