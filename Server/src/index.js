const express = require("express");
const authService = require("./services/auth.service");
const app = express();
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const route = require("./Routes/index.route");
const ConnectDB = require("./config/db.config");
const { Server } = require("socket.io");
const port = process.env.PORT || 3002;

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(cors());
route(app);
ConnectDB();
const server = app.listen(port, () => {
  console.log("Server is running on port:" + port);
});
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});
let onlineUsers = [];
io.on("connection", (socket) => {
  // console.log("new connection", socket.id);
  socket.on("addNewUser", (userId) => {
    // !onlineUsers.some((user) => user.userId === userId) &&
    authService.updateOnline(userId, true);
    onlineUsers.push({
      userId,
      socketId: socket.id,
    });
    console.log("Online user", onlineUsers);

    io.emit("getonlineUsers", onlineUsers);
  });
  socket.on("sendMessage", (message) => {
    const user = onlineUsers.find(
      (user) => user.userId === message.recipientId
    );

    if (user) {
      io.to(user.socketId).emit("getMessage", message);
      io.to(user.socketId).emit("getNotification", {
        group_id: message.group_id,
        user_id: message.user_id,
        isRead: false,
        date: new Date(),
      });
    }
  });
  socket.on("sendMessageBox", (message) => {
    const members = message.members;
    const newMessage = message.newMessage;
    for (const member of members) {
      if (member !== newMessage.user_id) {
        const user = onlineUsers.find((user) => user.userId === member);

        if (user) {
          io.to(user.socketId).emit("getMessage", message.newMessage);
          io.to(user.socketId).emit("getNotification", {
            group_id: newMessage.group_id,
            user_id: newMessage.user_id,
            isRead: false,
            date: new Date(),
          });
        }
      }
    }
  });
  socket.on("callUser", (message) => {
    const user = onlineUsers.find(
      (user) => user.userId === message.recipientUser._id
    );
    if (user) {
      io.to(user.socketId).emit("CallAccpected", message);
    }
  });
  socket.on("createChat", (messages) => {
    const message = messages.newChatBox;

    const user = messages.user;
    const members = message.members;

    for (const member of members) {
      if (user._id !== member) {
        const use = onlineUsers.find((u) => u.userId === member);
        if (use) {
          io.to(use.socketId).emit("newBoxChat", message);
        }
      }
    }
  });
  socket.on("end", (data) => {
    console.log(data);
    // const user = onlineUsers.find((u) => u.userId === data._id);
    // if (user) io.to(user.socketId).emit("end", data);
  });

  socket.on("accept", (data) => {
    const toUser = data.caller;
    // console.log(data.recipientUser._id);
    const receiverId = toUser._id;

    const user = onlineUsers.find((u) => u.userId === receiverId);

    if (user) io.to(user.socketId).emit("accept", data);
  });
  socket.on("reject", (data) => {
    const to = data.to;
    const receiverId = to._id;
    const user = onlineUsers.find((u) => u.userId === receiverId);
    if (user) socket.to(user.socketId).emit("reject", data);
  });

  socket.on("answerCallUser", (data) => {});
  socket.on("disconnect", () => {
    const user = onlineUsers.find((u) => u.socketId === socket.id);
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    authService.updateOnline(user?.userId, false);
    // console.log("User disconnected", socket.id);
    console.log("Online users after disconnect", onlineUsers);
    io.emit("getonlineUsers", onlineUsers);
  });
});
