const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('new user connected')

    socket.emit('newMessage', {
        from: 'Darry',
        text: 'NO!!!',
        createdAt: 123
    })

    socket.emit('newEmail', {
        from: 'darryl@gmail.com',
        text: 'Hey',
        createdAt: 123
    });

    socket.on('createMessage', (message) => {
        console.log('createMessage', message)
    })

    socket.on('disconnect', () => {
        console.log('User was disconnected')
    })
})

server.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})
