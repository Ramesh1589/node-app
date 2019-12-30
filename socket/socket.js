module.exports = io => {
    io.on("connection", function(socket) {
      console.log('=== Socket Connected ===');
      socket.on('incoming challenge', function(data){
        console.log(data);
      });
    });
  };