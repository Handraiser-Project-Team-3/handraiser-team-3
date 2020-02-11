module.exports = {
  requests: (socket, db, io) => {
    let classroom = "";

    socket.on(`join_classroom`, ({ classId }) => {
      if (classId) {
        classroom = classId;
        socket.join(`${classroom}`);
      }
    });

    const newData = notify =>
      db.student_request
        .find({ class_id: classroom })
        .then(data =>
          io.to(`${classroom}`).emit(`update_request_list`, data, notify)
        );

    socket.on(`add_request`, (data, user) => {
      db.student_request.insert(data, { deepInsert: true }).then(() => {
        newData(`${user.first_name} ${user.last_name} added a new request`);
      });
    });

    socket.on(`remove_request`, (data, user) => {
      db.student_request
        .destroy({ id: data.id })
        .then(() =>
          newData(`${user.first_name} ${user.last_name} removed a request`)
        );
    });

    socket.on(`update_request`, notify =>
      notify ? newData(notify) : newData()
    );
  },
  chat: (socket, db, io) => {
    let chatroom = "";
    socket.on(`join_chatroom`, ({ requestId, user }) => {
      if (requestId) {
        chatroom = requestId;
        socket.join(`${chatroom}`);
      }
    });
  }
};
