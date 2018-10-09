'use strict';

const fs = require('fs');
const shell = require('shelljs');

module.exports = {
    coding(data = {}) {
        if (fs.existsSync(`app/controller/${data.underscore}.js`)) {
            if (!data.force) {
                return;
            }
        }
        fs.writeFile(`app/controller/${data.underscore}.js`, this.build(data), err => {
            if (err) {
                /**
                 * logging
                 */
                shell.echo('[egg-coding curd] code controller %s error: %s', data.underscore, err);
            }
        });
    },
    build(data) {
        return `'use strict';

const { BaseController } = require('../base_context_class');
const createRule = require('../rules/${data.underscore}.json').create;
const createManyRule = require('../rules/${data.underscore}.json').createMany;
const deleteManyRule = require('../rules/${data.underscore}.json').deleteMany;
const updateManyRule = require('../rules/${data.underscore}.json').updateMany;
const updateRule = require('../rules/${data.underscore}.json').update;
const moment = require('moment');

class ${data.Model}Controller extends BaseController {
    /**
     * 创建
     */
    async create() {
        const { ctx, service } = this;
        ctx.validate(createRule);
        await service.${data.model}.create(ctx.request.body);
        ctx.successful('创建成功', { isData: false });
    }
    /**
     * 删除
     */
    async destroy() {
        const { ctx, service } = this;
        await service.${data.model}.destroy(ctx.params.id);
        ctx.successful('删除成功', { isData: false });
    }
    /**
     * 修改
     */
    async update() {
        const { ctx, service } = this;
        ctx.validate(updateRule);
        await service.${data.model}.update(ctx.params.id, ctx.request.body);
        ctx.successful('更新成功', { isData: false });
    }
    /**
     * 根据id查询记录
     */
    async show() {
        const { ctx, service } = this;
        const { dataValues } = await service.${data.model}.show(ctx.params.id);
        for (const field of ['createdAt', 'updatedAt']) {
            dataValues[field] = moment(dataValues[field]).format('YYYY-MM-DD HH:mm:ss');
        }
        ctx.successful(dataValues);
    }
    /**
     * 查询所有
     */
    async index() {
        const { ctx, service } = this;
        const { page, size } = ctx.query;
        const data = await service.${data.model}.index(parseInt(page), parseInt(size));
        data.rows = await data.rows.map(row => {
            for (const field of ['createdAt', 'updatedAt']) {
                row[field] = moment(row[field]).format('YYYY-MM-DD HH:mm:ss');
            }
            return row;
        });
        ctx.successful(data);
    }
    /**
     * 批量创建
     */
    async createMany() {
        const { ctx, service } = this;
        ctx.validate(createManyRule);
        await service.${data.model}.createMany(ctx.request.body);
        ctx.successful('批量创建成功', { isData: false });
    }
    /**
     * 批量删除
     */
    async deleteMany() {
        const { ctx, service } = this;
        ctx.validate(deleteManyRule);
        await service.${data.model}.deleteMany(ctx.request.body);
        ctx.successful('批量删除成功', { isData: false });
    }
    /**
     * 批量更新
     */
    async updateMany() {
        const { ctx, service } = this;
        ctx.validate(updateManyRule);
        const { fields, where } = ctx.request.body;
        await service.${data.model}.updateMany(fields, where);
        ctx.successful('批量更新成功', { isData: false });
    }
    /**
     * 条件查询，返回一条记录
     */
    async findOne() {
        const { ctx, service } = this;
        const { dataValues } = await service.${data.model}.findOne(ctx.request.body);
        for (const field of ['createdAt', 'updatedAt']) {
            dataValues[field] = moment(dataValues[field]).format('YYYY-MM-DD HH:mm:ss');
        }
        ctx.successful(dataValues);
    }
    /**
     * 条件查询,返回所有符合条件的记录
     */
    async findByExample() {
        const { ctx, service, to_int } = this;
        const { page, size } = ctx.query;
        const data = await service.${data.model}.findByExample(to_int(page), to_int(size), ctx.request.body);
        data.rows = await data.rows.map(row => {
            for (const field of ['createdAt', 'updatedAt']) {
                row[field] = moment(row[field]).format('YYYY-MM-DD HH:mm:ss');
            }
            return row;
        });
        ctx.successful(data);
    }
}

module.exports = ${data.Model}Controller;
`;
    }
};
