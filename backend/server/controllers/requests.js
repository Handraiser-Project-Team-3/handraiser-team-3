module.exports = {
  list: (req, res) => {
    const { student_request } = req.app.get("db");

    student_request.find().then(list => res.status(200).send(list));
  }
};
