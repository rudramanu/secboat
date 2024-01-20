const express = require("express");
const { authentication } = require("../middlewares/Authentication.middleware");
const { AddressModel } = require("../models/Address.model");
const addressRouter = express.Router();

addressRouter.post("/add", authentication, async (req, res) => {
  const { name, mobile, house, city, state, locality, pin, type } = req.body;
  if (!name || !mobile || !locality || !house || !city || !state || !pin) {
    return res.status(400).send({ message: "address fields not provided" });
  }
  try {
    const address = new AddressModel({
      name,
      mobile,
      house,
      city,
      state,
      locality,
      pin,
      type,
    });
    await address.save();
    return res.send({ message: "Address added" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

module.exports = {
  addressRouter,
};
