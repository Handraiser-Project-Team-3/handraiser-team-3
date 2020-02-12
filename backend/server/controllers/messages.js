module.exports = {
  list: (req, res) => {
    const { messages } = req.app.get("db");
    messages
      .find({ student_request_id: req.params.id })
      .then(data => res.status(200).send(data));
  }
};
