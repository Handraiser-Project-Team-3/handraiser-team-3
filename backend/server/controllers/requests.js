module.exports = {
  list: (req, res) => {
    const { student_request } = req.app.get("db");

    student_request
      .find({ class_id: req.params.id })
      .then(list => res.status(200).send(list));
  },
  editRequest: (req, res) => {
    const { student_request } = req.app.get("db");

    student_request
      .update({ id: req.params.id }, req.body)
      .then(() => res.status(200).send({ message: "success" }));
  }
};
