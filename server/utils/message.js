const generateMessage = (name, text) => {
    return {
        name,
        text,
        createdAt: new Date().getTime()
    }
}

const generateLocationMessage = (name, latitude, longitude) => {
    return {
        name,
        url: `https://www.google.com/maps?q=${latitude},${longitude}`,
        createdAt: new Date().getTime()
    }
}

module.exports = {
    generateMessage,
    generateLocationMessage
}