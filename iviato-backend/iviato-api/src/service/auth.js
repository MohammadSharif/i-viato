const config = require('config');
const request = require('request-promise');

const auth = config.get('auth0');

module.exports.authorize = async () => {
	const options = {
		method: 'POST',
		url: auth.url,
		headers: { 'content-type': 'application/json' },
		body: `{"client_id":"${auth.clientId}","client_secret":"${auth.clientSecret}","audience":"${auth.audience}","grant_type":"${auth.grant_type}"}`
	};

	try {
		const response = await request(options);
		let authToken = JSON.parse(response).access_token;
		if (authToken) {
			// console.log(authToken);
			return authToken;
		} else {
			return '';
		}
	}
	catch (error) {
		console.log(error);
		return '';
	}
};