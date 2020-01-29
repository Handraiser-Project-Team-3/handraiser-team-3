const massive = require("massive");
const cors = require("cors");

const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const app = express();
const server = http.Server(app);
const io = socketIO(server);

// const auth = require("./controllers/auth");
const user = require("./controllers/users");
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

  //login & signup here
  app.get("/api/login", user.login);
  app.post("/api/user", user.addUser);
  app.patch("/api/user/:id", user.editUser);

  //chats
  app.post("/api/chats/create", chats.createChat);
  app.get("/api/chats/list", chats.chatList);
  app.post("/api/chats/message/create", chats.createMessage);
  app.get("/api/chats/participants/list", chats.participantList);

  // app.use(auth.headers);

  //other pages that need headers
  

  const port = 3001;
  server.listen(port, () => {
    console.clear();
    console.log(`Server is running at port ${port}`);
  });
});
