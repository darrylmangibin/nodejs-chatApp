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
        from: 'Admin',
        text: 'Welcome'
    })

    socket.broadcast.emit('newMessage', {
        from:'Admin',
        text: 'new user found'
    })

    socket.on('createMessage', (message) => {
        console.log('createMessage', message)
        // io.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // })
        socket.broadcast.emit('newMessage', {
                from: message.from,
                text: message.text,
                createdAt: new Date().getTime()
        })
    })

    socket.on('disconnect', () => {
        console.log('User was disconnected')
    })
})

server.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})
