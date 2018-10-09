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

## 依赖说明

>基于eggjs的代码构建工具,orm框架使用sequelize，
为了代码能正常运行，请确保在你的项目中声明、安装了以下包：
1. egg-sequelize
2. mysql2
3. egg-validate
4. moment
5. egg-response
6. egg-error-handler
7. uuid

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

```bash
$ npm i egg-coding -g
```

## 使用
>切换到项目根目录再使用该工具
### 编码规范
- 模型与数据库表名相同，例如app/model/student.js对应student表
- 参数校验规则全部放在${baseDir}/app/rules目录下
- 每一个model在${baseDir}/app/router目录下都有一个router文件，并最终在${baseDir}/app/router.js中引用

### egg-coding init
```bash
$ egg-coding init
```
>初始化文件：app.js & config.default.js & plugin.js
### egg-coding model
```bash
$ egg-coding model model1 model2 model3...
```
>创建一个或多个model，在*${baseDir}/app/model*目录下

**参数**
- -f: 强制执行，会覆盖原有文件
### egg-coding curd
```bash
$ egg-coding curd -p /api/v1
```
>生成curd API，包括router、rules、controller、service、errors、base_context_class

**所有Controller和Service都继承base_context_class提供的基类**  
**参数**  
-   -p: 请求根路径，默认为/api/v1
-   -f: 强制执行，会覆盖原有文件
-   -r: 生成${baseDir}/app/router.js文件
-   -u: 更新一个或多个模型,重新生成相关文件
-   -d: 删除一个或多个模型，以及相关文件

**如果需要获取更多帮助, 请使用以下命令:**
```
$ egg-coding -h
```
子命令:
```
$ egg-coding 子命令 -h
```
## 提问交流
请到 [egg issues](https://github.com/iamljw/egg-coding/issues) 异步交流。

## License

[MIT](LICENSE)
