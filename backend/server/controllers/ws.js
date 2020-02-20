module.exports = {
  websockets: (socket, db, io) => {
    let classroom = "";

    socket.on(`join_classroom`, ({ classId }) => {
      if (classId) {
        classroom = classId;
        socket.join(`${classroom}`);
      }
    });

    const newData = (notify, action) =>
      db.student_request.find({ class_id: classroom }).then(data => {
        io.to(`${classroom}`).emit(`update_request_list`, data, action);
        socket.to(`${classroom}`).emit(`notify`, notify);
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
      // db.class
      //   .find({ user_id: id })
      //   .then(classList => {
      //     classList.map(classDetails => {
      //       db.student_request
      //         .find({ class_id: classDetails.id })
      //         .then(studentReqList => {
      //           studentReqList.map(request => {
      //             db.messages
      //               .destroy({ student_request_id: request.id })
      //               .then(() => console.log("success messages"));
      //           });
      //         })
      //         .then(() =>
      //           db.student_request
      //             .destroy({ class_id: classDetails.id })
      //             .then(() =>
      //               db.classroom_users
      //                 .destroy({ class_id: classDetails.id })
      //                 .then(() => console.log("success class users"))
      //             )
      //         );
      //     });
      //   })
      //   .then(() => {
      //     db.class.destroy({ user_id: id }).then(data => {
      //       console.log("success class");
      //       data.map(deleted =>
      //         io.emit(`deleted_class`, { classList: deleted })
      //       );
      //     });
      //   });
    });
  }
};
