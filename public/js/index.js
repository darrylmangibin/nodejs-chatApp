const socket = io();

socket.on('connect', function () {
    console.log('connected to server')
})

socket.on('disconnect', function () {
    console.log('Disconnected from the server')
})

socket.on('newMessage', function(message) {
    $(function() {
        var formattedTime = moment(message.createdAt).format('h:mm a')
        var template = $('#message-template').html();
        var html = Mustache.render(template, {
            name: message.name,
            text: message.text,
            createdAt: formattedTime
        })
        $('#messages').append(html)
    })
    socket.on('newLocationMessage', function(message) {
        var formattedTime = moment(message.createdAt).format('h:mm a')
        var template = $('#location-message-template').html();
        var html = Mustache.render(template, {
            name: message.name,
            url: message.url,
            createdAt: formattedTime
        })
        $('#messages').append(html);
    })
})

$(function() {
    $('#message-form').on('submit', function(e) {
        e.preventDefault()
        var messageTextBox = $('[name=message]')
        socket.emit('createMessage', {
            name: 'User',
            text: messageTextBox.val()
        }, function() {
            messageTextBox.val('');
        })
    })

    var locationButton = $('#send-location');
    locationButton.on('click', function(e) {
        if(!navigator.geolocation) {
            return alert('Geolocation not supported by your browser')
        }

        locationButton.attr('disabled', 'disabled').text('Sending location...')

        navigator.geolocation.getCurrentPosition(function(position) {
            locationButton.removeAttr('disabled').text('Send Location')
            socket.emit('createLocationMessage', {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });

        }, function() {
            locationButton.removeAttr('disabled').text('Send Location').text('Send Location')
            alert('Unable to fetch location')
        })
    })
})