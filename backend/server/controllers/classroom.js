module.exports = {
  list: (req, res) => {
    const db = req.app.get("db");

    db.query("select * from class").then(list => {
      res.status(200).send(list);
    });
  },
  addClass: (req, res) => {
    const db = req.app.get("db");
    db.class.insert(req.body, { deepInsert: true }).then(() => {
      res.status(200).send({ message: "success" });
    });
  },
  editClass: (req, res) => {
    const db = req.app.get("db");
    db.class.update({ id: req.params.id }, req.body).then(() => {
      res.status(200).send({ message: "success" });
    });
  },
  deleteClass: (req, res) => {
    const db = req.app.get("db");
    db.class
      .destroy(req.params.id)
      .then(() => {
        res.status(200).send({ message: "success" });
      })
      .catch(err => {
        console.error(err);
      });
  }
};
