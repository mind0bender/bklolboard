require("dotenv").config();
const express = require("express");
const chalk = require("chalk");
const socket = require("socket.io");
const cors = require("cors");

const { ADMIN } = process.env;
const PORT = process.env.PORT || 8080;

let users = [];

const app = express();

app.use(express.static("public"));
app.use(cors());

app.get("/users", (req, res, next) => {
  if (req.query.ADMIN == ADMIN) {
    const ids = getIds();
    res.send({
      res: true,
      users: ids,
      msg: "users",
      length: ids.length,
    });
  } else {
    res.send({
      res: false,
      msg: "wrong password!",
      ADMIN: req.query.ADMIN,
    });
  }
});

const server = app.listen(PORT, () => {
  console.clear();
  console.log(
    chalk.cyanBright(`server started on PORT: ${PORT} at ${Date()}\n`)
  );
});

const io = socket(server);

io.sockets.on("connection", (soc) => {
  addUser(soc, (user) => {
    console.log(
      `${chalk.green(user.id)}`,
      user.username ? `==> ${chalk.whiteBright(user.username)}` : ``
    );
  });

  soc.on("disconnect", () => {
    removeUserById(soc.id);
    console.log(chalk.redBright(soc.id));
  });
});

const addUser = (user, cb) => {
  user.username = user.handshake.query.username;
  if (!user.username) {
    user.username = user.id;
  }
  user.emit("joinconfirmed", {
    id: user.id,
    username: user.username,
  });
  users.push(user);
  cb(user);
};

const getIds = () => {
  return users.map((user) => {
    return {
      id: user.id,
      username: user.username,
    };
  });
};

const getUserById = (id) => {
  for (let user of users) {
    if (user.id == id) {
      return user;
    }
  }
};

const removeUserById = (id) => {
  const user = getUserById(id);
  users.splice(users.indexOf(user), 1);
};
