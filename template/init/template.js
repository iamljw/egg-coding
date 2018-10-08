'use strict';

const config_default = require('./t_default');
const plugin = require('./t_plugin');
const appjs = require('./t_app');

module.exports = () => {
    config_default.conding();
    plugin.conding();
    appjs.conding();
};
