const io = require('socket.io-client')

let chat = io.connect('http://localhost:8000')

chat.on('notify', (data) => {
    console.log('Socket Id :: ', data.socketId)
    socketId = data.socketId
})


chat.on('success', (data) => {
    console.log("Success Response :: ", {data})
})


let payload = { 
    receiver: 'w8kGBkOE-gjDVbt4AAAB',   //Receivers Socket Id
    sender: 'B1Tq-mP5P4l3QJ9YAAAA',     //senders Socket Id   
    message: "Sending Message...."     
}

chat.emit('message', payload)


chat.on('newMessageRequest', (data) =>{
    console.log("Message Response",data)
})
