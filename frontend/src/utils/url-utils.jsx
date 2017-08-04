var CONFIG = require('../config.js');

var getHostUrl = function() {
    return process.env.NODE_ENV === 'development' ? CONFIG.default.devHost : CONFIG.default.apiHost;
};

var getBaseUrl = function() {
    return getHostUrl();
};

var getWeightUrl = function() {
    return getBaseUrl() + CONFIG.default.weightAddon + '/';
};

module.exports = {
    getWeightUrl
};