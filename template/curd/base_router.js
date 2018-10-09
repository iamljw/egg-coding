'use strict';

const fs = require('fs');
const shell = require('shelljs');

module.exports = {
    coding(models = []) {
        fs.writeFile('app/router.js', this.build(models), err => {
            if (err) {
                /**
                 * logging
                 */
                shell.echo('[egg-coding curd] code app/router.js error: %s', err);
            }
        });
    },
    build(models = []) {
        let include = '';
        models.forEach(item => {
            include = include.concat(`    require('./router/${item}')(app);\r\n`);
        });
        return `'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app;
    router.get('/', controller.home.index);
${include}
};
`;
    }
};
