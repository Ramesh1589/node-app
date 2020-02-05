module.exports = function (io) {
  io.on("connection", function (socket) {
    console.log('=== Socket Connected ===', socket.client.id);
    let socketId = socket.client.id

    
    socket.on('username', function (username) {
      console.log("Incoming Rerquest", socket, client.id, username)
      socket.username = username;
      io.emit('is_online', '🔵 <i>' + socket.username + ' join the chat..</i>');
    });

    socket.on('disconnect', function (username) {
      io.emit('is_online', '🔴 <i>' + socket.username + ' left the chat..</i>');
    })

    socket.on('chat_message', function (message) {
      io.emit('chat_message', '<strong>' + socket.username + '</strong>: ' + message);
    });


  });
};