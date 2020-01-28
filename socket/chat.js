module.exports = function(io) {

    io.on('connection', socket => {

        // console.log('Socket', socket)
        console.log(socket.client.id);

        let socketId = socket.client.id
        
        socket.emit('notify', {status: 200, socketId })

        socket.on('message', (data) => {
  
            console.log('Message Request Receeved At  Sever ======> ', data)
  
            io.to(data.receiver).emit('newMessageRequest', data);
  
        })

        socket.on('disconnect', socketId=>{

            console.log("Total Socket Disconnections", socketId)

        });
    
    
    })
}