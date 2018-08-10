const uuidV4 = require('uuid/v4');

convertBase = (value, from_base, to_base, expected) => {

  let range = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+!/'.split('');
  let from_range = range.slice(0, from_base);
  let to_range = range.slice(0, to_base);

  let dec_value = value.split('').reverse().reduce( (carry, digit, index) => {

    if (from_range.indexOf(digit) === -1) throw new Error('Invalid digit `' + digit + '` for base ' + from_base + '.');

    return carry += from_range.indexOf(digit) * (Math.pow(from_base, index));

  }, 0);

  let new_value = '';

  while (dec_value > 0) {
    new_value = to_range[dec_value % to_base] + new_value;
    dec_value = (dec_value - (dec_value % to_base)) / to_base;
  }

  let result = new_value || '0';

  return ((result == 0) ? result : checkLength(result, expected)).toString();
}

checkLength = (number, expectedLength) => {
  let result = '';
  if (number.length != expectedLength) {
    result = appendZero(number, expectedLength - number.length);
  }
  return (result == '') ? number.toString() : result.toString();
}

appendZero = (number, amount) => {
  let result = number.toString();
  for (let i = 0; i < amount; i++) {
    result = ('0' + result).toString();
  }
  return result
}

uuidEncode = (uuid) => {

  let fourOut = (uuid.slice(0, 14)) + (uuid.slice(15, 36));

  let rePlace = fourOut.toUpperCase().replace(/-/g, '');

  let convert1 = convertBase(rePlace.slice(0, 11), 16, 64, 8);
  let convert2 = convertBase(rePlace.slice(11, 21), 16, 64, 7);
  let convert3 = convertBase(rePlace.slice(21, 31), 16, 64, 7);

  let encodedUuid = convert1 + convert2 + convert3;

  return encodedUuid;
}

uuidDecode = (encodedUuid) => {

  let convert1 = convertBase(encodedUuid.slice(0, 8), 64, 16, 11);
  let convert2 = convertBase(encodedUuid.slice(8, 15), 64, 16, 10);
  let convert3 = convertBase(encodedUuid.slice(15, 23), 64, 16, 10);

  let decodedUuid = convert1 + convert2 + convert3;

  let cutFour1 = decodedUuid.slice(0, 12) + '4';
  let cutFour2 = decodedUuid.slice(12, 32);

  let put = cutFour1 + cutFour2;

  let lowerCase = put.toLowerCase();

  let cfm1 = lowerCase.slice(0, 8);
  let cfm2 = lowerCase.slice(8, 12);
  let cfm3 = lowerCase.slice(12, 16);
  let cfm4 = lowerCase.slice(16, 20);
  let cfm5 = lowerCase.slice(20, 32);

  let con1 = cfm1.concat('-', cfm2);
  let con2 = cfm3.concat('-', cfm4);
  let connect = con1.concat('-', con2);

  let uuid = connect.concat('-', cfm5);
  return uuid;
}

module.exports = {
  encode: uuidEncode,
  decode: uuidDecode
}