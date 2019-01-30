const expect = require('expect');
const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        const name = 'Jen';
        const text = 'some message';
        const message = generateMessage(name, text);
        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({
            name,
            text
        })
    })
})

describe('generateLocationMessage', () => {
    it('should generate location object', () => {
        const name = 'ld'
        const latitude = 15
        const longitude = 19
        const url = `https://www.google.com/maps?q=15,19`
        const message = generateLocationMessage(name, latitude, longitude);

        expect(message.createdAt).toBeA('number')
        expect(message).toInclude({name, url})

    })
})