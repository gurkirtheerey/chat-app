const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const cors = require("cors");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
let messages = [
  // { id: "gaf436fsdafsadf", message: "wow this is so cool" },
  // { id: "gaf436fsdafsadf", message: "hello der" },
  // {
  //   id: "33d1de49-5910-4709-94e3-32a102b4a6f1",
  //   message: "this is my message!!!",
  // },
];

app.get("/", (req, res, next) => res.send(messages));

const server = http.createServer(app);

const io = socketIO(server);

io.on("connection", (socket) => {
  console.log("New Client Connected!");
  socket.emit("join_room", "Welcome to Chat App!");

  socket.on("message", (message) => {
    messages.push(message);
    console.log("MESSAGES", messages);
    io.emit("message", message);
  });
});

server.listen(PORT, () => console.log(`LISTENING ON PORT ${PORT}`));
