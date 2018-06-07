'use strict';

// had enabled by egg
// exports.static = true;


// config/plugin.js
exports.nunjucks = {
    enable: true,
    package: 'egg-view-nunjucks'
};

// config/plugin.js
exports.mysql = {
    enable: true,
    package: 'egg-mysql',
};