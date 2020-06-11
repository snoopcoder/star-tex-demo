const express = require("express"),
  app = express(),
  http = require("http").createServer(app),
  io = require("socket.io")(http);

const host = "127.0.0.1";
const port = 7000;

let clients = [];

io.on("connection", (socket) => {
  console.log(`New socket ${socket.id} connected`);
  socket.emit("init", "success");

  socket.on("init", (id) => {
    clients.push({
      id,
      socket: socket.id,
    });
    console.log(`Client ${id} connected`);
  });

  socket.on("disconnect", () => {
    const clientIndex = clients.findIndex((item) => item.socket === socket.id);
    if (clientIndex !== -1) {
      const client = clients[clientIndex];
      console.log(`Client with id ${client.id} disconnected`);
      clients.splice(clientIndex, 1);
    }
  });
});

const sendBySocket = (id, message) => {
  const clientIndex = clients.findIndex((item) => item.id === id);
  if (clientIndex !== -1) {
    const client = clients[clientIndex];
    io.sockets.connected[client.socket].emit("message", message);
    return true;
  }
  return false;
};

http.listen(port, host, () =>
  console.log(`WebSocket listens on http://${host}:${port}`)
);

module.exports = sendBySocket;
