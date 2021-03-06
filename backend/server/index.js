const massive = require("massive");
const cors = require("cors");
require("dotenv").config();

const express = require("express");
const http = require("http");
const socketio = require("socket.io");

const app = express();
const server = http.Server(app);
const io = socketio(server);

const auth = require("./controllers/auth");
const user = require("./controllers/users");
const classroom = require("./controllers/classroom");
const classroomUsers = require("./controllers/classroomUsers");
const requests = require("./controllers/requests");
const message = require("./controllers/messages");
const ws = require("./controllers/ws");

massive({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
}).then(db => {
  app.set("db", db);
  app.use(express.json());
  app.use(cors());

  // WS
  io.on("connection", socket => {
    let userDetails = undefined;
    socket.on(`online`, user => {
      db.users.update({ id: user.id }, { user_status: true }).then(user => {
        userDetails = user[0];
        db.classroom_users.find().then(list => {
          io.emit(`classroom_user`, list);
        });
      });
    });

    ws.websockets(socket, db, io);

    socket.once(`disconnect`, () => {
      if (userDetails !== undefined) {
        db.users
          .update({ id: userDetails.id }, { user_status: false })
          .then(signout => {
            db.classroom_users.find().then(list => {
              io.emit(`classroom_user`, list);
            });
          });
      }
    });
  });

  //login here
  app.post("/api/login", user.login);

  app.use(auth.headers);

  //user
  app.post("/api/user", user.addUser);
  app.patch("/api/user/:id", user.editUser);
  app.delete("/api/user/:id", user.deleteUser);
  app.get("/api/user/list", user.usersList);
  app.get("/api/user/:id", user.userDetails);

  //classroom
  app.get("/api/class", classroom.list);
  app.post("/api/class", classroom.addClass);
  app.patch("/api/class/:id", classroom.editClass);
  app.delete("/api/class/:id", classroom.deleteClass);
  app.get("/api/class/:id", classroom.classDetails);

  //classroom_users
  app.post("/api/classroom-users/", classroomUsers.addClassroomUser);
  app.get("/api/classroom-users/", classroomUsers.list);
  app.get("/api/classroom-users/:id", classroomUsers.classroomUserDetails);

  //student_requests
  app.get("/api/request/list/:id", requests.list);
  app.patch("/api/request/:id", requests.editRequest);

  //messages
  app.get("/api/messages/:id", message.list);

  server.listen(process.env.SERVER_PORT, () => {
    console.clear();
    console.log(`Server is running at port ${process.env.SERVER_PORT}`);
  });
});
