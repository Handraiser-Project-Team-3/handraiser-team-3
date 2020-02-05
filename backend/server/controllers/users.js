const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const secret = require("../../secret");

module.exports = {
  login: (req, res) => {
    const { users } = req.app.get("db");

    const { email } = req.body;

    const getUserDetails = () =>
      users
        .findOne({
          email: email
        })
        .then(user => {
          const token = jwt.sign(user, secret);
          res.status(200).send(token);
        });

    users
      .findOne({
        email: email
      })
      .then(user => {
        if (!user) {
          return users
            .insert(
              {
                account_type_id: 3,
                ...req.body,
                user_status: true
              },
              { deepInsert: true }
            )
            .then(() => {
              getUserDetails();
            });
        }
        getUserDetails();
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
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        err.message
          ? res.status(400).json({ error: err.message })
          : res.status(500).end();
      });
  },
  usersList: (req, res) => {
    const { users } = req.app.get("db");

    users.find().then(data => res.status(200).json(data));
  },
  userDetails: (req, res) => {
    const { users } = req.app.get("db");

    users.findOne(req.params.id).then(user => res.status(200).send(user));
  }
};
