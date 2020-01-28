const massive = require("massive");
const cors = require("cors");

const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const app = express();
const server = http.Server(app);
const io = socketIO(server);

const auth = require("./controllers/auth");
const user = require("./controllers/user");

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

  app.use(auth.headers);

  //other pages that need headers

  const port = 3001;
<<<<<<< HEAD
  server.listen(port, () => {
    console.clear();
    console.log(`Server is running at port ${port}`);
=======
  app.listen(port, () => {
    console.log(`Server is Ready on Port ${port}`);
>>>>>>> 2a3cb8cfbaa7ec1d432bde55036be02a04d5bd9e
  });
});
