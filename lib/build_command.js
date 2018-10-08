'use strict';

const shell = require('shelljs');
const scanModel = require('./curd/scan_model');
const toCamelCase = require('./to_camel_case');
const curdCoding = require('../template/curd/template');
const baseRouter = require('../template/curd/base_router');
const initCoding = require('../template/init/template');

module.exports = {
    buildCurd(argv) {
        shell.echo('[egg-coding curd] ready to start...');
        let data = { rootUrl: argv.p, force: argv.f };
        /**
         * scan path ${baseDir}/app/model if -u not specified
         */
        let models = [];
        if (argv.u.length > 0) {
            models = argv.u;
            data.force = true;
        } else {
            models = scanModel();
            /**
             * logging
             */
            shell.echo('[egg-coding curd] find %d model. %s', models.length, models.join(', '));
        }
        models.forEach(item => {
            data = Object.assign(data, toCamelCase(item));
            /**
             * coding [router, errors, controller, service]
             */
            curdCoding(data);
        });
        if (argv.r) {
            /**
             * coding ${baseDir}/app/router.js
             */
            baseRouter.coding(models);
        }
        /**
         * It's done
         */
        shell.echo('[egg-coding curd] coding done.');
    },
    buildInit() {
        shell.echo('[egg-coding init] ready to start...');
        initCoding();
        /**
         * It's done
         */
        shell.echo('[egg-coding init] coding done.');
    }
};
