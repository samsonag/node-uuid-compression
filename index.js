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

  let convert = new Array (
    convertBase(rePlace.slice(0, 11), 16, 64, 8),
    convertBase(rePlace.slice(11, 21), 16, 64, 7),
    convertBase(rePlace.slice(21, 31), 16, 64, 7)
  )

  return convert.join('');;
}

uuidDecode = (encodedUuid) => {

  let convParts = new Array (
    convertBase(encodedUuid.slice(0, 8), 64, 16, 11),
    convertBase(encodedUuid.slice(8, 15), 64, 16, 10),
    convertBase(encodedUuid.slice(15, 23), 64, 16, 10)
  );

  let decodedUuid = convParts.join('').split('');

  decodedUuid.splice(12, 0, '4');

  let lowerCase = decodedUuid.join('').toLowerCase();
  
  let putTogether = new Array (
    lowerCase.slice(0, 8),
    lowerCase.slice(8, 12),
    lowerCase.slice(12, 16),
    lowerCase.slice(16, 20),
    lowerCase.slice(20, 32)
  )
    
  return putTogether.join('-');
}

module.exports = {
  encode: uuidEncode,
  decode: uuidDecode
}