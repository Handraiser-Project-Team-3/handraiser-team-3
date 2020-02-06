module.exports = {
  requests: (socket, db, io) => {
    let requests = [];
    let user;

    socket.on(`save_requests`, data => {
      requests = data;
    });

    socket.on(`join_classroom`, obj => {
      if (username !== undefined) {
        user = obj;
        console.log(`user ${user.username} is online${user.classId}`);
        socket.join(`${user.classroom}`);
      }
    });

    const emitData = data => {
      io.to(`${user.classroom}`).emit(`update_request_list`, data);
    };

    const newData = () =>
      db.student_request.find().then(data => emitData(data));

    socket.on(`add_request`, data => {
      db.student_request
        .insert(data, { deepInsert: true })
        .then(inserted => emitData([...requests, inserted]));
    });

    socket.on(`remove_request`, data => {
      db.student_request.destroy({ id: data.id }).then(() => newData());
    });

    socket.on(`update_request`, () => {
      newData();
    });
  }
};
