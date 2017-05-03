var add = require('../common.js');

describe('add unit test.', function(){
    it('2 + 3 = 5', function(){
        var result = add(2, 3);
        expect( result).to.be.equal( 5 );
    });
});