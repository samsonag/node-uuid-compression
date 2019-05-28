let nuuc = require('./index.js');

let uuid = '6c05dcf2-5d3c-4afd-bc35-24080e1270ad'
let e_uuid = nuuc.encode(uuid);
let d_uuid = nuuc.decode(e_uuid);

console.log(e_uuid);