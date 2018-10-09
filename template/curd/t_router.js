'use strict';

const fs = require('fs');
const shell = require('shelljs');

module.exports = {
    coding(data = {}) {
        if (!fs.existsSync('app/router')) {
            fs.mkdirSync('app/router');
        }
        if (fs.existsSync(`app/router/${data.underscore}.js`)) {
            if (!data.force) {
                return;
            }
        }
        fs.writeFile(`app/router/${data.underscore}.js`, this.build(data), err => {
            if (err) {
                /**
                 * logging
                 */
                shell.echo('[egg-coding curd] code router %s error: %s', data.underscore, err);
            }
        });
    },
    build(data = {}) {
        return `'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app;
    router.resources('${data.rootUrl}/${data.underscore}', controller.${data.model});
    router.post('${data.rootUrl}/${data.underscore}/createMany', controller.${data.model}.createMany);
    router.post('${data.rootUrl}/${data.underscore}/deleteMany', controller.${data.model}.deleteMany);
    router.post('${data.rootUrl}/${data.underscore}/updateMany', controller.${data.model}.updateMany);
    router.post('${data.rootUrl}/${data.underscore}/findOne', controller.${data.model}.findOne);
    router.post('${data.rootUrl}/${data.underscore}/findByExample', controller.${data.model}.findByExample);
};
`;
    }
};
