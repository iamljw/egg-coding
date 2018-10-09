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

## Dependency Description

>eggjs based code building tool, orm framework using sequelize,
In order for the code to work properly, you should use the command `egg-coding i`to install the necessary dependencies before starting your application

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

```bash
$ npm i egg-coding -g
```

## Use
>Switch to the project root directory and use the tool
### Coding Standards
- The model is the same as the database table name, for example, app/model/student.js corresponds to the student table.
- Parameter validation rules are all placed in the ${baseDir}/app/rules directory
- Each model has a router file in the ${baseDir}/app/router directory and is eventually referenced in ${baseDir}/app/router.js

### egg-coding i
```bash
$ egg-coding i
```
>In addition to installing the dependencies declared in the package.json file, additional necessary dependencies are installed and saved to package.json

You can also use this tool to install dependencies, which is the same as NPM.

An example

install

```bash

$ egg-coding I MySQL

$ egg-coding I MySQL --save

$ egg-coding I MySQL --save-dev
```

### egg-coding init
```bash
$ egg-coding init
```
>Initialization file: app.js & config.default.js & plugin.js
### egg-coding model
```bash
$ egg-coding model model1 model2 model3...
```
>Create one or more models in the *${baseDir}/app/model* directory

**parameter**
- -f: Enforce, overwrite old file
### egg-coding curd
```bash
$ egg-coding curd -p /api/v1
```
>Generate the curd API, including router, rules, controller, service, errors, base_context_class

**All Controllers and Services inherit the base class provided by base_context_class**
**Parameter**
- -p: request root path, default is /api/v1
- -f: Enforce, overwrite old file
- -r: Generate ${baseDir}/app/router.js file
- -u: Update one or more models and regenerate related files
- -d: delete one or more models, and related files

**If you need more help, please use the following command:**
```
$ egg-coding -h
```
Subcommand:
```
$ egg-coding subcommand -h
```
## Asking questions
Please go to [egg issues] (https://github.com/iamljw/egg-coding/issues) for asynchronous communication.

## License

[MIT](LICENSE)