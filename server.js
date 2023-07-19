const express = require("express");
const bodyParser = require("body-parser");
var bcrypt = require("bcryptjs");
var cors = require("cors");
const knex = require("knex");
const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    port: 5432,
    user: "postgres",
    password: "test",
    database: "smart-brain",
  },
});
const register = require('./controllers/register.js');
const profile = require('./controllers/profile.js');
const image = require('./controllers/image.js');
const signin = require('./controllers/signin.js');
const app = express();
app.use(bodyParser.json());
app.use(cors());

const database = {
  users: [
    {
      id: "123",
      name: "muhi",
      email: "muhitan@gmail.com",
      password: "cookie",
      entries: 0,
      joined: new Date(),
    },
    {
      id: "321",
      name: "bekri",
      email: "bekri@gmail.com",
      password: "cookie123",
      entries: 0,
      joined: new Date(),
    },
  ],

  login: [
    {
      id: "987",
      hash: "",
      email: "muhitan@gmail.com",
    },
  ],
};

app.get("/", (req, res) => res.send(database.users));
app.post("/signin", signin.handleSignin(db, bcrypt));
app.post("/register", register.handlerRegister(db, bcrypt));
app.get("/profile/:id", profile.handleProfile(db));
app.put("/image", image.handleImage(db));

app.listen(3000, () => {
  console.log("running");
});
