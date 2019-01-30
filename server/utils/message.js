const moment = require('moment');

const generateMessage = (name, text) => {
    return {
        name,
        text,
        createdAt: moment().valueOf()
    }
}

const generateLocationMessage = (name, latitude, longitude) => {
    return {
        name,
        url: `https://www.google.com/maps?q=${latitude},${longitude}`,
        createdAt: moment().valueOf()
    }
}

module.exports = {
    generateMessage,
    generateLocationMessage
}