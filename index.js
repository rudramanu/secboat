const express = require("express");
const cors = require("cors");

const { connection } = require("./configs/db.js");

const { userRouter } = require("./routes/users.router.js");
const { cartRouter } = require("./routes/cart.router");
const { addressRouter } = require("./routes/address.router.js");
const { productRouter } = require("./routes/product.router.js");
const { ordersRouter } = require("./routes/orders.router");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Basic API Endpoint");
});

app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/cart", cartRouter);
app.use("/address", addressRouter);
app.use("/orders", ordersRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (error) {
    console.log(error);
    console.log("Cannot connect to DB");
  }
  console.log(`Server is running on port ${process.env.port}`);
});
