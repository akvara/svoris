const CONFIG = require('../config.js');

let getHostUrl = function() {
    return process.env.NODE_ENV === 'development' ? CONFIG.default.devHost : CONFIG.default.apiHost;
};

let getBaseUrl = function() {
    return getHostUrl();
};

let getWeightUrl = function() {
    return getBaseUrl() + CONFIG.default.weightAddon + '/';
};

let getPressureUrl = function() {
    return getBaseUrl() + CONFIG.default.pressureAddon + '/';
};

module.exports = {
    getWeightUrl,
    getPressureUrl
};