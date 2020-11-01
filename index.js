const express = require("express");
const http = require("http");
const socketio = require("socket.io");

const { addUser, getUser, getUserInRoom, removeUser } = require("./users");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on("connection", (socket) => {
  socket.on("join", ({ username, room }, callback) => {
    console.log(`${username} is in the house!`);
    const { err, user } = addUser({
      id: socket.id,
      username: username,
      room: room,
    });
    if (err) {
      return callback({ err });
    }
    console.log(user);
    socket.emit("message", {
      user: "BOT",
      text: `${user.username}, hope you brought pizza!`,
    });
    socket.broadcast
      .to(user.room)
      .emit("message", { user: "BOT", text: `${user.username} has joined!` });
    socket.join(user.room);

    io.to(user.room).emit("members", {
      room: user.room,
      users: getUserInRoom(user.room),
    });
  });

  socket.on("send message", (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit("message", { user: user.username, text: message });

    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    socket.broadcast
      .to(user.room)
      .emit("message", {
        user: "BOT",
        text: `${user.username} has left the chat!`,
      });
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server is running ${PORT}`));
