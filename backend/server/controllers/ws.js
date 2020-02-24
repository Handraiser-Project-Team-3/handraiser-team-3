module.exports = {
  websockets: (socket, db, io) => {
    let classroom = "";

    socket.on(`join_classroom`, ({ classId }) => {
      if (classId) {
        classroom = classId;
        socket.join(`${classroom}`);
      }
    });
    socket.on(`leave_class`, ({ classId }) => {
      socket.leave(`${classId}`);
    });

    const newClassroomUsers = () => {
      db.classroom_users.find().then(users => io.emit(`classroom_user`, users));
    };
    const newData = (notify, action) =>
      db.student_request.find({ class_id: classroom }).then(data => {
        io.to(`${classroom}`).emit(`update_request_list`, data, action);
        !!notify && socket.to(`${classroom}`).emit(`notify`, notify);
      });

    socket.on(`add_request`, (data, user) => {
      db.student_request.insert(data, { deepInsert: true }).then(() => {
        newData(`${user.first_name} ${user.last_name} requested for help`);
      });
    });

    socket.on(`remove_request`, (data, user) => {
      db.messages.destroy({ student_request_id: data.id }).then(() => {
        db.student_request
          .destroy({ id: data.id })
          .then(() =>
            newData(
              `${user.first_name} ${user.last_name} removed a request`,
              "remove"
            )
          );
      });
    });

    socket.on(`update_request`, ({ notify, action }) =>
      notify !== null
        ? action === "move_back"
          ? newData(notify, action)
          : newData(notify)
        : newData()
    );

    socket.on(`joined_class`, ({ user, className }) => {
      socket
        .to(`${classroom}`)
        .emit(
          `notify`,
          `${user.first_name} ${user.last_name} joined to class ${className}`
        );
    });

    socket.on(`add_message`, ({ message }) => {
      db.messages
        .insert(message, { deepInsert: true })
        .then(() => io.to(`${classroom}`).emit(`new_message`, message));
    });

    socket.on(`is_typing`, (user, room) => {
      socket.to(`${classroom}`).emit(`typing`, user, { data: room });
    });

    socket.on(`changed_privileges`, ({ id }) => {
      io.emit(`notify_user`, { id: id });
    });

    socket.on(`closed_class`, classDetails => {
      io.emit(`notify_class`, { data: classDetails });
    });
    socket.on(`remove_class_user`, ({ userId, classroomId }) => {
      db.student_request
        .find({ student_id: userId, class_id: Number(classroomId) })
        .then(requests => {
          return requests.map(x => {
            db.messages.destroy({ student_request_id: x.id });
          });
        })
        .then(() => {
          db.student_request
            .destroy({ student_id: userId, class_id: classroomId })
            .then(() => {
              db.classroom_users.destroy({ id: userId }).then(deleted => {
                io.emit(`notify_removed_user`, deleted[0]);
                newClassroomUsers();
                newData();
              });
            });
        });
    });
    socket.on(`add_mentors`, ({ newMentors, classId }, callBack) => {
      newMentors.map(mentor => {
        db.classroom_users
          .insert(
            { user_id: mentor.value, class_id: Number(classId) },
            { deepInsert: true }
          )
          .then(inserted => {
            newClassroomUsers();
            io.emit(`notify_assigned`, inserted);
            db.classroom_users
              .find({ class_id: classId })
              .then(users => callBack(users));
          });
      });
    });
  }
};
