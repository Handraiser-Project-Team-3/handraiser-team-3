const massive = require("massive");
const cors = require("cors");

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
  host: "localhost",
  port: 5432,
  database: "handraiser",
  user: "postgres",
  password: "handraiserdb"
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

  //classroom
  app.get("/api/class", classroom.list);
  app.post("/api/class", classroom.addClass);
  app.patch("/api/class", classroom.editClass);
  app.delete("/api/class/:id", classroom.deleteClass);

  //chats
  app.post("/api/chats/create", chats.createChat);
  app.get("/api/chats/list/:id", chats.chatList);
  app.post("/api/chats/message/create", chats.createMessage);
  app.get("/api/chats/participants/list/:chat_room_id", chats.participantList);
  app.get("/api/chats/messages/list/:id", chats.messagesList);
  app.delete("/api/chats/messages/delete/:id", chats.deleteMessages);
  app.patch("/api/chats/messages/edit/id", chats.editMessages);

  //other pages that need headers

  const port = 3001;
  server.listen(port, () => {
    console.clear();
    console.log(`Server is running at port ${port}`);
  });
});
