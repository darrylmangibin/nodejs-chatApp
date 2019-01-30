const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const {generateLocationMessage} = require('./utils/message')
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');
const users = new Users()

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('new user connected')

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and Room are required')
        }
        socket.join(params.room);
        users.removeUser(socket.id)
        users.addUser(socket.id, params.name, params.room);
        
        io.to(params.room).emit('updateUserList', users.getUserList(params.room))

         socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'))

         socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`))

        callback()
    })

    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message)
        io.emit('newMessage', generateMessage(message.name, message.text))
        callback('This is from the server');
    })

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    })

    socket.on('disconnect', () => {
        console.log('User was disconnected')
        const user = users.removeUser(socket.id)
        if(user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room))
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`))
        }
    })
})

server.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})
