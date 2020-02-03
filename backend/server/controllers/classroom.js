module.exports = {
  list: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.query;
    let request = `select * from class`;
    if (id) {
      request += ` where user_id=${req.query.id}`;
    }

    db.query(request).then(list => {
      res.status(200).send(list);
    });
  },
  addClass: (req, res) => {
    const db = req.app.get("db");
    db.class.insert(req.body, { deepInsert: true }).then(classData => {
      res.status(200).send(classData);
    });
  },
  editClass: (req, res) => {
    const db = req.app.get("db");
    db.class.update({ id: req.params.id }, req.body).then(classData => {
      res.status(200).send(classData);
    });
  },
  deleteClass: (req, res) => {
    const db = req.app.get("db");
    db.class.destroy(req.params.id).then(classData => {
      res.status(200).send(classData);
    });
  }
};
