const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('new user connected')

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'))

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'))

    socket.on('createMessage', (message) => {
        console.log('createMessage', message)
        socket.broadcast.emit('newMessage', generateMessage(message.name, message.text))
    })

    socket.on('disconnect', () => {
        console.log('User was disconnected')
    })
})

server.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})
