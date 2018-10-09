'use strict';

const fs = require('fs');
const shell = require('shelljs');

module.exports = {
    conding() {
        fs.writeFile('config/plugin.js', this.build(), err => {
            if (err) {
                /**
                 * logging
                 */
                shell.echo('[egg-coding init] code config/plugin.js error: %s', err);
            }
        });
    },
    build() {
        return `'use strict';

// had enabled by egg
// exports.static = true;

exports.sequelize = {
    enable: true,
    package: 'egg-sequelize'
};
exports.response = {
    enable: true,
    package: 'egg-response'
};
exports.validate = {
    enable: true,
    package: 'egg-validate'
};
exports.errorHandler = {
    enable: true,
    package: 'egg-error-handler'
};
`;
    }
};
