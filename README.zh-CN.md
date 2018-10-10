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
## 前言

该工具只构建基础代码，对数据库的原子性操作，生成接口以及一些辅助代码，方便快速开发，不参与任何业务逻辑

## 依赖说明

基于eggjs和sequelize的代码构建工具，
为了代码能正常运行，在启动你的应用前应该使用命令`egg-coding i`安装必须的依赖

## 代码风格
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

## 安装
全局安装
```bash
$ npm i egg-coding -g
```

## 目录结构
构建完成后将会有以下目录结构
```
egg-project
├── package.json  
├── app.js
├── app  
|   ├── router.js
│   ├── base_context_class.js(提供基类，便于扩展)
│   ├── controller(控制层)
│   |   └── user.js
│   ├── service（业务逻辑层）
│   |   └── user.js
│   ├── router（路由）
│   |   └── user.js
│   ├── model（数据库模型）
│   |   └── user.js
│   ├── rules（参数验证规则）
│   |   └── user.json
│   ├── errors（DIY异常类）
│   |   └── client_error.js
│   ├── utils（工具）
│   |   └── date_format.js
├── config  
|   ├── plugin.js（插件列表）
|   ├── config.default.js（默认配置）
└── test
    ├── middleware  
    |   └── response_time.test.js  
    └── controller  
        └── home.test.js
```
## 开发规范
- 模型与数据库表名相同，例如app/model/student.js对应student表
- 每一个model在${baseDir}/app/router目录下都有一个router模块，并最终在${baseDir}/app/router.js中引用
- 开启时间戳和软删除
- 参数校验规则全部放在${baseDir}/app/rules目录下
- 所有controller和service都继承base_context_class提供的BaseController和BaseService
- 非代码异常都在errors/client_error.js中定义
- 时间戳统一格式化处理
- 使用插件egg-response发送响应数据
- 使用插件egg-error-handler处理异常
## 测试
默认提供的接口，其中order为表名
```js
'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app;
    router.resources('/api/v1/order', controller.order);
    router.post('/api/v1/order/createMany', controller.order.createMany);
    router.post('/api/v1/order/deleteMany', controller.order.deleteMany);
    router.post('/api/v1/order/updateMany', controller.order.updateMany);
    router.post('/api/v1/order/findOne', controller.order.findOne);
    router.post('/api/v1/order/findByExample', controller.order.findByExample);
};
```
## 快速开发
### 第一步
使用`egg-init`初始化一个项目
```bash
$ egg-init egg-project --type=simple
```
### 第二步
使用`egg-coding i`安装依赖包
```bash
$ egg-coding i
```
### 第三步
使用 `egg-coding init`初始化启动文件、默认配置、开启插件
```bash
$ egg-coding init
```
*按需修改默认配置*
### 第四步
使用`egg-coding model`创建数据库模型
```bash
$ egg-coding model model1 model2 model3...
```
*按需修改模型，编写表字段*
### 第五步
使用`egg-coding curd`构建代码
```bash
$ egg-coding curd -p /api/v1 -r
```
*按需修改验证规则*
### 本地调试
```bash
$ npm run dev
```
*默认端口为7834*,
整个过程不会超过10分钟

### 命令参数
使用`--help` 或 `-h`获取帮助
```bash
$ egg-coding -h
```
子命令
```
$ egg-coding i -h
$ egg-coding init -h
$ egg-coding model -h
$ egg-coding curd -h
```
## 提问交流
请到 [egg issues](https://github.com/iamljw/egg-coding/issues) 异步交流。

## License

[MIT](LICENSE)
