'use strict';

const fs = require('fs');
const shell = require('shelljs');

module.exports = {
    coding(data = {}) {
        if (fs.existsSync('app/base_context_class.js')) {
            if (!data.force) {
                return;
            }
        }
        fs.writeFile('app/base_context_class.js', this.build(), err => {
            if (err) {
                /**
                 * logging
                 */
                shell.echo('[egg-coding curd] code client_error error: %s', err);
            }
        });
    },
    build() {
        return `'use strict';

const { Controller, Service } = require('egg');

class BaseController extends Controller {
    to_int(v) {
        if (typeof v === 'number') return v;
        return parseInt(v) || 0;
    }
}

class BaseService extends Service {

}

exports.BaseController = BaseController;
exports.BaseService = BaseService;
`;
    }
};
