<<<<<<< HEAD
/* code here */
=======
const express = require("express");
const massive = require("massive");
const cors = require("cors");

const auth = require("./controllers/auth");

massive({
  host: "localhost",
  port: 5432,
  database: "handraiser",
  user: "postgres",
  password: "handraiserdb"
}).then(db => {
  const app = express();

  app.set("db", db);
  app.use(express.json());
  app.use(cors());

  //login & signup here

  app.use(auth.headers);

  //other pages that need headers

  const port = 3001;

  app.listen(port, () => {
    console.log(`Server is Ready`);
  });
});
>>>>>>> c33adb4c6410a15370d415d7c6f89eb0b1308904
