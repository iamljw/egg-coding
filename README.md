# egg-coding

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-coding.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-coding
[travis-image]: https://img.shields.io/travis/eggjs/egg-coding.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-coding
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/egg-coding.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/egg-coding?branch=master
[david-image]: https://img.shields.io/david/eggjs/egg-coding.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg-coding
[snyk-image]: https://snyk.io/test/npm/egg-coding/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-coding
[download-image]: https://img.shields.io/npm/dm/egg-coding.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-coding

<!--
Description here.
-->
## Foreword

The tool only builds the underlying code, atomic operations on the database, generates interfaces and some auxiliary code for quick development and does not participate in any business logic.

## Dependency Description

Code building tools based on eggjs and sequelize,
In order for the code to work, you should use the command `egg-coding i` to install the necessary dependencies before starting your application.

## Code Style
.eslintrc
```
{
  "extends": "eslint-config-egg",
  "rules": {
    "indent": [2, 4,{ "SwitchCase": 1 }],
    "comma-dangle": ["error", "never"],
    "array-bracket-spacing":["error","never"]
  }
  
}

```

## Installation
Global installation
```bash
$ npm i egg-coding -g
```

## Directory Structure
After the build is completed, there will be the following directory structure.
```
egg-project
├── package.json
├── app.js
├── app
| ├── router.js
│ ├── base_context_class.js (provides a base class for easy extension)
│ ├── controller (control layer)
│ | └── user.js
│ ├── service (business logic layer)
│ | └── user.js
│ ├── router
│ | └── user.js
│ ├── model (database model)
│ | └── user.js
│ ├── rules (parameter verification rules)
│ | └── user.json
│ ├── errors(DIY exception class)
│ | └── client_error.js
│ ├── utils (tool)
│ | └── date_format.js
├── config
| ├── plugin.js (plugin list)
| ├── config.default.js (default configuration)
└── test
    ├── middleware
    | └── response_time.test.js
    └──controller
        └── home.test.js
```
## Development Specifications
- The model is the same as the database table name, for example, app/model/student.js corresponds to the student table.
- Each model has a router module in the ${baseDir}/app/router directory and is eventually referenced in ${baseDir}/app/router.js
- Turn on timestamp and soft delete
- Parameter validation rules are all placed in the ${baseDir}/app/rules directory
- All controllers and services inherit the BaseController and BaseService provided by base_context_class
- Non-code exceptions are defined in errors/client_error.js
- Time stamp unified formatting
- Send response data using plugin egg-response
- Handling exceptions using the plugin egg-error-handler
## Testing
The interface provided by default, where order is the table name
```js
'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
Module.exports = app => {
    Const { router, controller } = app;
    Router.resources('/api/v1/order', controller.order);
    Router.post('/api/v1/order/createMany', controller.order.createMany);
    Router.post('/api/v1/order/deleteMany', controller.order.deleteMany);
    Router.post('/api/v1/order/updateMany', controller.order.updateMany);
    Router.post('/api/v1/order/findOne', controller.order.findOne);
    Router.post('/api/v1/order/findByExample', controller.order.findByExample);
};
```
[see more](api.md)
## Rapid development
### First step
Initialize a project with `egg-init`
```bash
$ egg-init egg-project --type=simple
```
### Second step
Install the dependency package with `egg-coding i`
```bash
$ egg-coding i
```
### third step
Use `egg-coding init` to initialize the startup file, default configuration, and enable the plugin
```bash
$ egg-coding init
```
*Modify the default configuration as needed*
### fourth step
Create a database model using `egg-coding model`
```bash
$ egg-coding model model1 model2 model3...
```
*Modify the model as needed, write table fields*
### Fifth step
Build code with `egg-coding curd`
```bash
$ egg-coding curd -p /api/v1 -r
```
*Modify verification rules as needed*
### Local debugging
```bash
$ npm run dev
```
*The default port is 7834*,
The whole process will not exceed 10 minutes

### Command Parameters
Get help with `--help` or `-h`
```bash
$ egg-coding -h
```
Subcommand
```
$ egg-coding i -h
$ egg-coding init -h
$ egg-coding model -h
$ egg-coding curd -h
```
## Asking questions
Please go to [egg issues] (https://github.com/iamljw/egg-coding/issues) for asynchronous communication.

## License

[MIT](LICENSE)