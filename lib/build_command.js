'use strict';

const shell = require('shelljs');
const scanModel = require('./curd/scan_model');
const toCamelCase = require('./to_camel_case');
const curdCoding = require('../template/curd/template');
const baseRouter = require('../template/curd/base_router');
const destroy = require('../template/curd/destroy');
const initCoding = require('../template/init/template');
const modelCoding = require('../template/model/template');
const dep = require('./curd/dependencies');
const date_format = require('../template/curd/date_format');
const fs = require('fs');

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
        if (!fs.existsSync('app/utils/date_format.js')) {
            date_format.coding();
        }
        /**
         * It's done
         */
        shell.echo('[egg-coding curd] coding done.');
    },
    destroyCurd(models) {
        /**
         * running...
         */
        shell.echo('[egg-coding curd] ready to start...');
        /**
         * remove all documents related to models
         */
        destroy(models);
        /**
         * It's done
         */
        shell.echo('[egg-coding curd] It`s done.');
    },
    buildInit() {
        shell.echo('[egg-coding init] ready to start...');
        initCoding();
        /**
         * It's done
         */
        shell.echo('[egg-coding init] coding done.');
    },
    buildModel(argv) {
        shell.echo('[egg-coding model] ready to start...');
        argv._.shift();
        const data = { models: argv._, force: argv.f };
        modelCoding.coding(data);
        /**
         * It's done
         */
        shell.echo('[egg-coding model] coding done.');
    },
    install(argv) {
        argv._.shift();
        if (argv._.length > 0) {
            /**
             * install dependencies
             */
            argv._.forEach(item => {
                const cmd = argv.s ? `npm i ${item} --save` : argv['save-dev'] ? `npm i ${item} --save-dev` : `npm i ${item}`;
                shell.exec(cmd);
            });
        } else {
            /**
             * install necessary dependencies to project
             */
            shell.exec('npm i');
            shell.exec(`npm i ${dep.join(' ')} --save`);
        }
    }
};
