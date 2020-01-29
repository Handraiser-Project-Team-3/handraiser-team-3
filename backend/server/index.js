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
const classroom = require("./controllers/classroom");

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

  //user
  app.post("/api/user", user.addUser);
  app.patch("/api/user/:id", user.editUser);

  //classroom
  app.get("/api/class", classroom.list);
  app.post("/api/class", classroom.addClass);
  app.patch("/api/class", classroom.editClass);
  app.delete("/api/class/:id", classroom.deleteClass);

  // app.use(auth.headers);

  //other pages that need headers

  const port = 3001;
  server.listen(port, () => {
    console.clear();
    console.log(`Server is running at port ${port}`);
  });
});
