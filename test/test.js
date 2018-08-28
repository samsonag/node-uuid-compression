let nuuc = require('../index.js');
let expect = require('chai').expect;

let testData = {
    decode :{
        oneZero: '6c05dcf2-5d3c-4afd-bc35-24080e1270ad',
        twoZero: '007e5ee3-a2e4-49c2-abee-bfbf720486a8',
        allf:    'ffffffff-ffff-4fff-ffff-ffffffffffff',
        false:   '6c05dcf2-5d3c-4afd-bc3d-24080e1270ad'
    },
    encode: {
        e_oneZero: '1i1TpoNJChzl3Ka0WE4d2j',
        e_twoZero: '00VbxZek4d2g+w!Bzo18Qe',
        e_allf:    '3!!!!!!!F!!!!!!F!!!!!!',
        e_false:   '1i1TpoNJChzl3Ka0WE4d2j'
    }
}

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

  
