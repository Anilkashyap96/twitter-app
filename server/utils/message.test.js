var expect= require('expect');

var GenerateMessage = require('./message');

describe('GenerateMessage', ()=>{
    it('should be correct message object', ()=>{
        var from = 'Anil';
        var text = 'Some message';

        var message = GenerateMessage(from, text);

       // expect(message.createdAt).not.toBeNaN();
        //expect(message).toInclude({from, text});
    })
})