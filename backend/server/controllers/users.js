const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const secret = require("../../secret");

module.exports = {
  login: (req, res) => {
    const { users } = req.app.get("db");

    const { email } = req.body;

    users
      .findOne({
        email: email
      })
      .then(user => {
        if (!user) {
          users
            .insert(
              {
                account_type_id: 3,
                email: email
              },
              { deepInsert: true }
            )
            .then(() => {
              res.send({ message: "success" });
            });
        }
      });
  },
  addUser: (req, res) => {
    const { users } = req.app.get("db");

    const { email } = req.body;

    users
      .findOne({
        email: email
      })
      .then(user => {
        if (user) {
          throw new Error("email already exists");
        }

        users.insert(req.body, { deepInsert: true }).then(() => {
          res.send({ message: "success" });
        });
      })
      .catch(err => {
        err.message
          ? res.status(400).json({ error: err.message })
          : res.status(500).end();
      });
  },
  editUser: (req, res) => {
    const { users } = req.app.get("db");

    const { id } = req.params;

    users
      .update({ id: id }, req.body, { deepInsert: true })
      .then(() => {
        res.send({ message: "success" });
      })
      .catch(err => {
        err.message
          ? res.status(400).json({ error: err.message })
          : res.status(500).end();
      });
  }
};
