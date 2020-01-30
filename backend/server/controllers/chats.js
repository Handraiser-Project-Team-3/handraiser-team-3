module.exports = {
  createMessage: (req, res) => {
    const db = req.app.get("db");

    db.users
      .findOne({ id: req.params.id })
      .then(user => {
        if (!user) {
          throw new Error("user does not exists");
        }
        db.messages
          .insert(req.body, { deepInsert: true })
          .then(message => res.status(200).json(message))
          .catch(() => res.status(500).end());
      })
      .catch(() => res.status(500).end());
  },
  messageList: (req, res) => {
    const db = req.app.get("db");

    db.messages
      .find()
      .then(data => res.status(200).json(data))
      .catch(() => res.status(500).end());
  },
  deleteMessages: (req, res) => {
    const db = req.app.get("db");
    db.messages
      .destroy({ id: req.params.id })
      .then(data => res.status(200).json(data))
      .catch(() => res.status(500).end());
  },

  editMessages: (req, res) => {
    const db = req.app.get("db");

    db.messages
      .update({ id: req.params.id }, req.body)
      .then(data => res.status(200).json(data))
      .catch(() => res.status(500).end());
  }
};
