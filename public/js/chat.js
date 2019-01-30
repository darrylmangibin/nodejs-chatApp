const socket = io();

function scrollToBottom() {
    var messages = $('#messages');
    var newMessage = messages.children('li:last-child');

    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();
    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}

socket.on('connect', function () {
    console.log('connected to server');
    const params = jQuery.deparam(window.location.search)
    socket.emit('join', params, function(err) {
        if(err) {
            alert(err)
            window.location.href = '/'
        } else {
            console.log('No Error')
        }
    })
})

socket.on('disconnect', function () {
    console.log('Disconnected from the server')
})

socket.on('updateUserList', function(users) {
    var ol = $('<ol></ol>')

    users.forEach(function(user) {
        ol.append($('<li></li>').text(user))
    })
    $('#users').html(ol);
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
        scrollToBottom()
    })
    
})
socket.on('newLocationMessage', function(message) {
    $(function() {
        var formattedTime = moment(message.createdAt).format('h:mm a')
        var template = $('#location-message-template').html();
        var html = Mustache.render(template, {
            name: message.name,
            url: message.url,
            createdAt: formattedTime
        })
        $('#messages').append(html);
        scrollToBottom()
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