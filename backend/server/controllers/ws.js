module.exports = {
  requests: (socket, db) => {
    let requests = [];
    socket.on("save_requests", data => {
      requests = data;
    });

    const emitData = data => {
      socket.broadcast.emit(`request_list`, data);
      socket.emit(`update_request_list`, data);
    };

    const newData = () =>
      db.student_request.find().then(data => emitData(data));

    socket.on("add_request", data => {
      db.student_request
        .insert(data, { deepInsert: true })
        .then(inserted => emitData([...requests, inserted]));
    });

    socket.on("remove_request", data => {
      db.student_request.destroy({ id: data.id }).then(() => newData());
    });

    socket.on("update_request", () => {
      newData();
    });
  }
};
