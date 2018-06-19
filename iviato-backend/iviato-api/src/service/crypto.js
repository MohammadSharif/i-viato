const config = require('config');

const secret = config.get('encryption').secret;

const Cryptr = require('cryptr'),
	cryptr = new Cryptr(secret);

function encrypt(clearText) {
	return cryptr.encrypt(clearText);
}

function decrypt(encrypted) {
	return cryptr.decrypt(encrypted);
}

module.exports = {
	encrypt,
	decrypt,
}