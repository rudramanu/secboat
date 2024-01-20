const { BlacklistModel } = require("../models/Blacklist.model");

const jwt = require("jsonwebtoken");
require("dotenv").config();

const authentication = (req, res, next) => {
  let token = req.headers.authorization;
  console.log("token from back", token);
  if (!token) {
    return res.status(401).send({ message: "Access Denied" });
  }
  jwt.verify(token, "coder", async function (err, decoded) {
    if (err) {
      return res.status(404).send({ message: err.message });
    }
    console.log("dfdf", decoded);
    // dfdf {
    //   userId: '65aa4f928e9360d0c782f3af',
    //   email: 'rudra@mail.com',
    //   role: 'admin',
    //   iat: 1705661690
    // }
    req.body.userId = decoded.userId;
    req.body.role = decoded.role;

    try {
      const Blacklist = await BlacklistModel.findOne({ token });

      if (Blacklist) {
        return res.status(401).send({ message: "Login Again" });
      }
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
    next();
  });
};

const isAdmin = (req, res, next) => {
  const { role } = req.body;
  console.log("role", role);

  if (role !== "admin") {
    return res.status(403).send({ message: "Permission Denied" });
  }
  next();
};

module.exports = {
  authentication,
  isAdmin,
};
