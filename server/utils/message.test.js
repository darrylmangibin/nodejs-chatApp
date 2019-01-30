const expect = require('expect');
const {generateMessage} = require('./message');

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