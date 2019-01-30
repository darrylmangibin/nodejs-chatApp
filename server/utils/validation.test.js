const expect = require('expect');

const {isRealString} = require('./validation');

describe('isRealString', () => {
    it('should reject non-string values', () => {
        var res = isRealString(98);
        expect(res).toBe(false)
    })

    if('should reject string wiht only space', () => {
        var res = isRealString('       ');
        expect(res).toBe(false)
    });
    it('should all string with none-space', () => {
        var res = isRealString('        asd          ')
    })
})