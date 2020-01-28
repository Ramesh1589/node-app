const io = require('socket.io-client')

let admin = io.connect('http://localhost:8000/admin')

// console.log("Admin", admin)
let socketId; 

admin.on('welcome', (data) => {
    console.log('Socket Id :: ', data.socketId)
    socketId = data.socketId
})

// admin.emit('sendMessage', { firstName: "Ramesh", lastName: "Rathod"})

admin.on('success', (data) => {
    console.log("Success Response :: ", {data})
})


// admin.on('msg', (data)=>{
//     console.log(data);
// })

let payload = { 
    receiver: 'Gp0UCU1J6x-olgSHAAAA',   //Receivers Socket Id
    sender: 'nXoo357br21xk-9zAAAB',     //senders Socket Id   
    message: "Sending Message...."     
}

admin.emit('message', payload)


admin.on('newMessageRequest', (data) =>{
    console.log("Message Response",data)
})  
