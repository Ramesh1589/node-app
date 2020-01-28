const io = require('socket.io-client')

let chat = io.connect('http://localhost:8000')

chat.on('notify', (data) => {
    console.log('Socket Id :: ', data.socketId)
    socketId = data.socketId
})


chat.on('success', (data) => {
    console.log("Success Response :: ", {data})
})

