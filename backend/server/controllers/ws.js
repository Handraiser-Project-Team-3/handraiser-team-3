module.exports = {
  requests: (socket, db, io) => {
    let classroom = "";

    socket.on(`join_classroom`, ({ classId }) => {
      if (classId) {
        classroom = classId;
        socket.join(`${classroom}`);
      }
    });

    const newData = () =>
      db.student_request
        .find()
        .then(data => io.to(`${classroom}`).emit(`update_request_list`, data));

    socket.on(`add_request`, data => {
      db.student_request
        .insert(data, { deepInsert: true })
        .then(() => newData());
    });

    socket.on(`remove_request`, data => {
      db.student_request.destroy({ id: data.id }).then(() => newData());
    });

    socket.on(`update_request`, () => {
      newData();
    });
  },
  chat: (socket, db, io) => {}
};
