'use strict';

const fs = require('fs');
const shell = require('shelljs');

module.exports = models => {
    /**
     * TODO:
     *      modify app/router.js
     *      d app/router/?.js
     *      d app/rules/?.json
     *      d app/controller/?.js
     *      d app/service/?.js
     *      d app/model/?.js
     */
    let baseRouter = fs.readFileSync('app/router.js', 'utf8');
    let len = models.length;
    models.forEach(item => {
        if (!fs.existsSync(`app/model/${item}.js`)) {
            shell.echo(`- NotFoundError: model ${item} is not found`);
            len--;
        } else {
            baseRouter = baseRouter.replace(`require('./router/${item}')(app);`, '');
            const files = [`app/router/${item}.js`];
            files.push(`app/rules/${item}.json`);
            files.push(`app/controller/${item}.js`);
            files.push(`app/service/${item}.js`);
            files.push(`app/model/${item}.js`);
            shell.rm('-rf', files);
            /**
             * logging
             */
            shell.echo('- %s have been removed.../', item);
        }
    });
    fs.writeFileSync('app/router.js', baseRouter);
    /**
     * logging
     */
    if (len > 0) {
        shell.echo('- app/router.js have been modified.../');
    }
    shell.echo('- remove %d model.', len);
};
