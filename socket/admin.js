module.exports = function(io) {

    io.of('/admin').on('connection', socket => {
        
        let totalConnection = io.engine.clientsCount

        console.log(socket.client.id);
        socket.join(socket.client.id);

        // console.log("Total Socket Connections", socket.id, totalConnection)
    
        socket.emit('welcome', {status: 200, 'message': "Hi, Welcome my Chatbot", socketId: socket.id})
    
        // socket.on('sendMessage', (data) => {
            
        // console.log('Request Received From Client :: ', data)
           
        // return io.of('/admin').emit('success', {status: 200, data})
    
        // })

        // Socket Event for Specific User on /admin routes
        socket.on('message', (data) => {
            console.log('Message Request Receeved At  Sever ======> ', data)
            io.of('/admin').to(data.receiver).emit('newMessageRequest', data);
           // io.of('/admin').to(data.sender).emit('success', {status: 200, message: 'Message Sent Successfully'});
        })

        socket.on('disconnect', socketId=>{

            console.log("Total Socket Disconnections", socketId)

        });
    
    
    })
}