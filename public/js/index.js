const socket = io();

socket.on('connect', function () {
    console.log('connected to server')
})

socket.on('disconnect', function () {
    console.log('Disconnected from the server')
})

socket.on('newMessage', function(message) {
    console.log('newMessage', message)
    $(function() {
        var li = $('<li></li>');
        li.text(`${message.name}: ${message.text}`)

        $('#messages').append(li);
    })
})

$(function() {
    $('#message-form').on('submit', function(e) {
        e.preventDefault()
        socket.emit('createMessage', {
            name: 'User',
            text: $('[name=message]').val()
        }, function() {

        })
    })
})