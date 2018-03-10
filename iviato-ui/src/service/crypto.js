const secret = 'iviato';

var Cryptr = require('cryptr'),
    cryptr = new Cryptr(secret);

function encrypt(clearText) {
    return cryptr.encrypt(clearText);
}

function decrypt(encrypted) {
    return cryptr.decrypt(encrypted);
} 
