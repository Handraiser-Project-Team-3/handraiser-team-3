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
      db.classroom_users
        .insert(
          { user_id: classData.user_id, class_id: classData.id },
          { deepInsert: true }
        )
        .then(() => res.status(200).send(classData));
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

    db.student_request.destroy({ class_id: req.params.id }).then(() =>
      db.classroom_users.destroy({ class_id: req.params.id }).then(() =>
        db.class.destroy(req.params.id).then(classData => {
          res.status(200).send(classData);
        })
      )
    );
  },
  classDetails: (req, res) => {
    const db = req.app.get("db");

    db.class
      .findOne({ id: req.params.id })
      .then(details => res.status(200).send(details));
  }
};
