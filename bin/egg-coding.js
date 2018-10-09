#!/usr/bin/env node

'use strict';

const command = require('../lib/build_command');

require('yargs')
    .command('curd', 'build curd API and some related documents code', curd)
    .command('init', 'build config & plugin & app.js code', init)
    .command('model', 'build model code', model)
    .command('i', 'add & install necessary dependencies of you project.', install)
    .help('h')
    .alias('h', 'help')
    .argv;
/**
 * generate basic curd api
 * @param {*} yargs ..
 */
function curd(yargs) {
    const argv = yargs.reset()
        .option('p', {
            alias: 'path',
            describe: 'request root path.',
            type: 'string',
            default: '/api/v1'
        })
        .option('f', {
            alias: 'force',
            describe: 'if force is specified, it will overwrite existing files.',
            type: 'boolean',
            default: false
        })
        .option('r', {
            alias: 'base-router',
            describe: 'if base-router is specified, it will overwrite existing ${baseDir}/app/router.js.',
            type: 'boolean',
            default: false
        })
        .option('u', {
            alias: 'update',
            describe: 'Update specified models.',
            type: 'array',
            default: []
        })
        .option('d', {
            alias: 'destroy',
            describe: 'Destroy specified models.',
            type: 'array',
            default: []
        })
        .help('h')
        .alias('h', 'help')
        .argv;
    argv.length ? command.destroyCurd(argv.d) : command.buildCurd(argv);
}
/**
 * generate default configuration & plugin
 * @param {*} yargs ..
 */
function init(yargs) {
    yargs.reset()
        .help('h')
        .alias('h', 'help')
        .argv;
    command.buildInit();
}
/**
 * generate models
 * @param {*} yargs ..
 */
function model(yargs) {
    const argv = yargs.reset()
        .option('f', {
            alias: 'force',
            describe: 'if force is specified, it will overwrite existing files.',
            type: 'boolean',
            default: false
        })
        .help('h')
        .alias('h', 'help')
        .argv;
    command.buildModel(argv);
}
/**
 * generate models
 * @param {*} yargs ..
 */
function install(yargs) {
    const argv = yargs.reset()
        .option('s', {
            alias: 'save',
            describe: 'Saving dependencies information to package.json.',
            type: 'boolean',
            default: false
        })
        .option('', {
            alias: 'save-dev',
            describe: 'Saving devDependencies information to package.json.',
            type: 'boolean',
            default: false
        })
        .help('h')
        .alias('h', 'help')
        .argv;
    command.install(argv);
}
