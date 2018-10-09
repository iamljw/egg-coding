'use strict';

const fs = require('fs');
const shell = require('shelljs');

module.exports = {
    conding() {
        fs.writeFile('app.js', this.build(), err => {
            if (err) {
                /**
                 * logging
                 */
                shell.echo('[egg-coding init] code app.js error: %s', err);
            }
        });
    },
    build() {
        return `'use strict';

module.exports = app => {

    app.beforeStart(async () => {
        // 将model同步到数据库
        await app.model.sync();
    });

};
`;
    }
};
