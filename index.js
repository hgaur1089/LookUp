const express = require("express");
const app = express();
const server = require("http").Server(app);
const UUID = require('./public/uuid');

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.set("view engine", "ejs");
const io = require("socket.io")(server, {
  cors: {
    origin: '*'
  }
});
const { ExpressPeerServer } = require("peer");
const peerServer = ExpressPeerServer(server, {
  debug: true,
});

app.use("/peerjs", peerServer);
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home");
})

app.get("/room", (req, res) => {
  res.redirect(`/${UUID()}`);
});

app.post("/room-link", (req, res) => {
  console.log(req.body);
  res.redirect(`/${req.body.link}`);
});

app.get("/:room", (req, res) => {
  res.render("room", { roomId: req.params.room });
});

io.on("connection", (socket) => {
  socket.on("join-room", (roomId, userId, userName) => {
    socket.join(roomId);
    socket.to(roomId).broadcast.emit("user-connected", userId);
    socket.on("message", (message) => {
      io.to(roomId).emit("createMessage", message, userName);
    });
  });
});

server.listen(process.env.PORT || 3000);

