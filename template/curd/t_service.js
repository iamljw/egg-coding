'use strict';

const fs = require('fs');
const shell = require('shelljs');

module.exports = {
    coding(data = {}) {
        if (!fs.existsSync('app/service')) {
            fs.mkdirSync('app/service');
        }
        if (fs.existsSync(`app/service/${data.underscore}.js`)) {
            if (!data.force) {
                return;
            }
        }
        fs.writeFile(`app/service/${data.underscore}.js`, this.build(data), err => {
            if (err) {
                /**
                 * logging
                 */
                shell.echo('[egg-coding curd] code service %s error: %s', data.underscore, err);
            }
        });
    },
    build(data) {
        return `'use strict';

const { BaseService } = require('../base_context_class');
const { NotFoundError, ExistedError } = require('../errors/client_error');

class ${data.Model}Service extends BaseService {
    /**
     * 创建
     * @param {object} obj 项目实体
     */
    async create(obj) {
        const isExist = await this.ctx.model.${data.Model}.findOne({
            where: obj
        });
        if (isExist) {
            throw new ExistedError('请勿重复创建');
        }
        await this.ctx.model.${data.Model}.create(obj);
    }
    /**
     * 删除
     * @param {string} id id
     */
    async destroy(id) {
        const obj = await this.show(id);
        await obj.destroy();
    }
    /**
     * 修改
     * @param {string} id id
     * @param {object} new_obj 新记录
     */
    async update(id, new_obj) {
        const old_obj = await this.show(id);
        await old_obj.update(new_obj);
    }
    /**
     * 根据id查询记录
     * @return {object} 对象实体
     * @param {string} id id
     */
    async show(id) {
        const obj = await this.ctx.model.${data.Model}.findById(id);
        if (!obj) {
            throw new NotFoundError(\`不存在id为\${id}的记录\`);
        }
        return obj;
    }
    /**
     * 查询所有
     * @return {object} 多个对象实体数组
     * @param {int} page 页码
     * @param {int} size 条数限制
     */
    async index(page, size) {
        return await this.ctx.model.${data.Model}.findAndCountAll({
            offset: (page - 1) * size,
            limit: size,
            raw: true
        });
    }
    /**
     * 批量创建
     * @param {Array} objs 实体对象数组
     */
    async createMany(objs) {
        objs.forEach(async item => {
            await this.ctx.model.${data.Model}.create(item);
        });
    }
    /**
     * 批量删除
     * @param {object} where 条件
     */
    async deleteMany(where) {
        await this.ctx.model.${data.Model}.destroy({
            where
        });
    }
    /**
     * 批量更新
     * @param {object} fields 字段信息
     * @param {*} where 条件
     */
    async updateMany(fields, where) {
        await this.ctx.model.${data.Model}.update(fields, {
            where
        });
    }
    /**
     * 根据条件查询，返回首条记录
     * @return {object} 实体对象
     * @param {object} where 条件
     */
    async findOne(where) {
        const obj = await this.ctx.model.${data.Model}.findOne({
            where
        });
        if (!obj) {
            throw new NotFoundError(\`不存在条件为\${where}的记录\`);
        }
        return obj;
    }
    /**
     * 根据条件查询，返回所有符合条件的记录
     * @return {object} 包含多个实体对象
     * @param {int} page 页码
     * @param {int} size 条数限制
     * @param {*} where 条件
     */
    async findByExample(page, size, where) {
        return await this.ctx.model.${data.Model}.findAndCountAll({
            offset: (page - 1) < 0 ? 0 : (page - 1) * size,
            limit: size,
            where,
            raw: true
        });
    }
}

module.exports = ${data.Model}Service;
`;
    }
};
