const massive = require("massive");
const cors = require("cors");
require("dotenv").config();

const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const app = express();
const server = http.Server(app);
const io = socketIO(server);

const auth = require("./controllers/auth");
const user = require("./controllers/users");
const classroom = require("./controllers/classroom");
const chats = require("./controllers/chats");

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

  //login here
  app.post("/api/login", user.login);

  app.use(auth.headers);

  //user
  app.post("/api/user", user.addUser);
  app.patch("/api/user/:id", user.editUser);
  app.get("/api/user/list", user.usersList);

  //classroom
  app.get("/api/class", classroom.list);
  app.post("/api/class", classroom.addClass);
  app.patch("/api/class", classroom.editClass);
  app.delete("/api/class/:id", classroom.deleteClass);

  //chats
  app.post("/api/chats/message/create/:id", chats.createMessage);
  app.get("/api/chats/messages/list/:id", chats.messageList);
  app.delete("/api/chats/messages/delete/:id", chats.deleteMessages);
  app.patch("/api/chats/messages/edit/id", chats.editMessages);

  //other pages that need headers

  const port = 3001;
  server.listen(port, () => {
    console.clear();
    console.log(`Server is running at port ${port}`);
  });
});
