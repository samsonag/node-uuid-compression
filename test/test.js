// after fixing index.js, require correct file
// separate test suits for encode and decode
// extract data to external testData variable

var nuuc = require('../index.js');
var expect = require('chai').expect;
let testData = require('./testData.json');

describe('Decode uuid', function () {

    it('uuid with one zero', function () {
    
        let uuid = testData.decode.oneZero

        let e_uuid = nuuc.encode(uuid);
        
        expect(e_uuid).to.be.equal(testData.encode.e_oneZero);

    });

    it('uuid with two zeros', function () {
    
        let uuid = testData.decode.twoZero

        let e_uuid = nuuc.encode(uuid);

        expect(e_uuid).to.be.equal(testData.encode.e_twoZero);
    
    });
    
    it('uuid with all f', function () {
    
        let uuid = testData.decode.allf

        let e_uuid = nuuc.encode(uuid);
        
        expect(e_uuid).to.be.equal(testData.encode.e_allf);

    });

    it('false uuid', function () {
    
        let uuid = testData.decode.false

        let e_uuid = nuuc.encode(uuid);
        
        
        expect(e_uuid).to.be.not.equal(testData.encode.e_false);

    });

});

describe('Encode uuid', function () {

    it('uuid with one zero', function () {

        let uuid = testData.encode.e_oneZero

        let d_uuid = nuuc.decode(uuid);

        expect(d_uuid).to.be.equal(testData.decode.oneZero);

    });

    it('uuid with two zeros', function () {

        let uuid = testData.encode.e_twoZero

        let d_uuid = nuuc.decode(uuid);

        expect(d_uuid).to.be.equal(testData.decode.twoZero);

    });

    it('uuid with all f', function () {

        let uuid = testData.encode.e_allf

        let d_uuid = nuuc.decode(uuid);

        expect(d_uuid).to.be.equal(testData.decode.allf);

    });

    it('false uuid', function () {

        let uuid = testData.encode.e_false

        let d_uuid = nuuc.decode(uuid);
        
        expect(d_uuid).to.be.not.equal(testData.decode.false);

    });

});

describe('append zero', function () {
    it('one zero', function () {

        let amount = testData.zero.zeroOne;
        let number = testData.zero.needOneZero_hex;

        let a_zero = nuuc.zero(number, amount);

        expect(a_zero).to.be.equal(testData.zero.oneZero_hex);
    });
    it('two zero', function () {

        let amount = testData.zero.zeroTwo;
        let number = testData.zero.needTwoZero_hex;

        let a_zero = nuuc.zero(number, amount);

        expect(a_zero).to.be.equal(testData.zero.twoZero_hex);
    });
    it('all zero', function () {

        let amount = testData.zero.zeroAll;
        let number = testData.zero.needAllZero_hex;

        let a_zero = nuuc.zero(number, amount);

        expect(a_zero).to.be.equal(testData.zero.allZero_hex);
    });
    it('false', function () {

        let amount = testData.zero.zeroNegative;
        let number = testData.zero.needOneZero_hex;

        let a_zero = nuuc.zero(number, amount);

        expect(a_zero).to.be.not.equal(testData.zero.oneZero_hex);
    });
});

describe('check length', function () {
    it('normal length', function () {

        let expectedLength = testData.length.expect10;
        let number = testData.length.length10;

        let c_length = nuuc.length(number, expectedLength)

        expect(c_length).to.be.equal(testData.length.length10);
    });
    it('less length', function () {

        let expectedLength = testData.length.expect10;
        let number = testData.length.length9;

        let c_length = nuuc.length(number, expectedLength)

        expect (c_length).to.be.equal(testData.length.needLengthTo10);
    });
    it('negative length', function () {

        let expectedLength = testData.length.expectNegative;
        let number = testData.length.length10;

        let c_length = nuuc.length(number, expectedLength)

        expect (c_length).to.be.equal(testData.length.length10);
    });
    it('further length', function () {

        let expectedLength = testData.length.expect10;
        let number = testData.length.length11;

        let c_length = nuuc.length(number, expectedLength)

        expect (c_length).to.be.not.equal(testData.length.length10);
    });
});

describe('convert base', function () {
    it('convert hex', function () {
        let value = testData.base.hex;
        let from_base = testData.base.from_base
        let to_base = testData.base.to_base
        let expected = testData.base.expected_base64

        let cb_uuid = nuuc.base(value, from_base, to_base, expected);
        
        expect(cb_uuid).to.be.equal(testData.base.base64);
    });
    it('convert base64', function () {
        let value = testData.base.base64;
        let from_base = testData.base.to_base
        let to_base = testData.base.from_base
        let expected = testData.base.expected_hex

        let cb_uuid = nuuc.base(value, from_base, to_base, expected);
        
        expect(cb_uuid).to.be.equal(testData.base.hex);
    });
    it('convert less hex length', function () {
        let value = testData.base.lesshex;
        let from_base = testData.base.from_base
        let to_base = testData.base.to_base
        let expected = testData.base.expected_base64

        let cb_uuid = nuuc.base(value, from_base, to_base, expected);
        
        expect(cb_uuid).to.be.not.equal(testData.base.base64);
    });
    it('convert further hex length', function () {
        let value = testData.base.furtherhex;
        let from_base = testData.base.from_base
        let to_base = testData.base.to_base
        let expected = testData.base.expected_base64

        let cb_uuid = nuuc.base(value, from_base, to_base, expected);
        
        expect(cb_uuid).to.be.not.equal(testData.base.base64);
    });
    it('convert false', function () {
        let value = testData.base.convert_false;
        let from_base = testData.base.from_base
        let to_base = testData.base.to_base
        let expected = testData.base.expected_base64
        
        expect(nuuc.base(value, from_base, to_base, expected)).to.be.equal(testData.errorResult);
    });
});

describe('to base base10', function () {
    it('to base10 working', function () {
        expect(testData.base.base10).to.be.equal(nuuc.toTen(testData.base.hex, testData.range, testData.base.from_base));
    });
    it('to base10 error', function () {
        expect(testData.base.error_return).to.be.equal(nuuc.toTen(testData.base.convert_false, testData.range, testData.base.from_base));
    });

});
