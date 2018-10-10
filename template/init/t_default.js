'use strict';

const fs = require('fs');
const shell = require('shelljs');

module.exports = {
    conding() {
        fs.writeFile('config/config.default.js', this.build(), err => {
            if (err) {
                /**
                 * logging
                 */
                shell.echo('[egg-coding init] code config/config.default.js error: %s', err);
            }
        });
    },
    build() {
        return `'use strict';

const { ClientError } = require('../app/errors/client_error');
const dateFormat = require('../app/utils/date_format');

module.exports = appInfo => {
    const config = exports = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1538915247520_2775';

    // add your config here
    config.middleware = [];

    // cluster
    config.cluster = {
        listen: {
            port: 7834,
            hostname: '0.0.0.0'
        }
    };

    // sequelize
    config.sequelize = {
        dialect: 'mysql',
        host: '127.0.0.1',
        port: 3306,
        username: 'root',
        password: '123456',
        database: 'egg-coding',
        define: {
            freezeTableName: true,
            paranoid: true,
            hooks: {
                afterFind: dateFormat
            }
        }
    };

    config.security = {
        csrf: {
            enable: false,
            ignoreJSON: true
        },
        domainWhiteList: ['', '127.0.0.1', '0.0.0.0']
    };

    // egg-error-handler
    config.errorHandler2 = {
        protection: true,
        tips: '未知错误',
        ignore: [ClientError]
    };

    return config;
};
`;
    }
};
