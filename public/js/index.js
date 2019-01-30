const socket = io();

socket.on('connect', function () {
    console.log('connected to server')
    socket.emit('createMessage', ({
        from: 'darryl',
        text: 'YES!!!'
    }))
})

socket.on('disconnect', function () {
    console.log('Disconnected from the server')
})

socket.on('newMessage', function(message) {
    console.log('newMessage', message)
})