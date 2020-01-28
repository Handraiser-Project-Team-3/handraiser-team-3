const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const secret = require("../../secret");

module.exports = {
  create: (req, res) => {
    const db = req.app.get("db");
  },
  login: (req, res) => {
    res.status(200).send({ message: "ok" });
  }
};
