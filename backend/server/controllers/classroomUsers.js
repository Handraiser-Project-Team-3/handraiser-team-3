module.exports = {
  addClassroomUser: (req, res) => {
    const { classroom_users } = req.app.get("db");

    classroom_users
      .insert(req.body, { deepInsert: true })
      .then(() => res.status(200).send({ message: "success" }));
  },
  list: (req, res) => {
    const { classroom_users } = req.app.get("db");
    classroom_users.find().then(list => res.status(200).send(list));
  },
  classroomUserDetails: (req, res) => {
    const { classroom_users } = req.app.get("db");
    classroom_users
      .findOne({ id: req.params.id })
      .then(list => res.status(200).send(list));
  }
};
