module.exports = function (io) {
  io.on("connection", function (socket) {
    console.log('=== Socket Connected ===', socket.client.id);
    let socketId = socket.client.id

    socket.emit('notify', { status: 200, socketId })

  });
};