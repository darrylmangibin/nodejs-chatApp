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
    socket.on('newLocationMessage', function(message) {
        var li = $('<li></li>');
        var a = $('<a target="_blank">My Current Location</a>')

        li.text(`${message.name}:`);
        a.attr('href', message.url);
        li.append(a);
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

    var locationButton = $('#send-location');
    locationButton.on('click', function(e) {
        if(!navigator.geolocation) {
            return alert('Geolocation not supported by your browser')
        }
        navigator.geolocation.getCurrentPosition(function(position) {
            socket.emit('createLocationMessage', {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });

        }, function() {
            alert('Unable to fetch location')
        })
    })
})