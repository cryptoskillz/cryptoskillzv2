console.log('[11tyStaticFramework] Using environment: ' + process.env.ELEVENTY_ENV);


var _CDN_URL, _API_URL;
var _PHONE_NUMBER = "(XXX) XXXX XXXXX"

//Set _API_URL here for different envs
//is _ROOT_URL used?
switch (process.env.ELEVENTY_ENV) {
    case 'local':
        _CDN_URL = '/assets/';
        _API_URL = 'http://localhost:1337/';
        _ROOT_URL = 'http://127.0.0.1:8080/';
        break;
    case 'prod':
        _CDN_URL = '/assets/';
        _API_URL = 'http://127.0.0.1:8080/';
        _ROOT_URL = 'https://www.cryptoskillz.com/';
        break;
    default:
        _CDN_URL = '/assets/';
        _API_URL = 'http://localhost:1337/';
        _ROOT_URL = "https://www.cryptoskillz.com/"
        break;
}


console.log('CDN url: ' + _CDN_URL);
console.log('API url: ' + _API_URL);

const todaysDate = new Date()
const currentYear = todaysDate.getFullYear()

module.exports = {
    environment: process.env.ELEVENTY_ENV,
    ROOT_URL: _ROOT_URL,
    API_URL: _API_URL,
    CDN_URL: _CDN_URL,
    ROOT_URL: _ROOT_URL,
    EMAIL: "cryptoskilz@protonmail.com",
    PHONE_NUMBER: _PHONE_NUMBER,
    ASSETBUMP: 1,
    CURRENTYEAR: currentYear

}