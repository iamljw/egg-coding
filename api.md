## router
```js
'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app;
    // egg框架提供的规则，没什么好说的
    router.resources('/api/v1/order', controller.order);
    // 创建多个实例
    router.post('/api/v1/order/createMany', controller.order.createMany);
    // 批量删除
    router.post('/api/v1/order/deleteMany', controller.order.deleteMany);
    // 批量更新
    router.post('/api/v1/order/updateMany', controller.order.updateMany);
    // 条件查询-取第一条
    router.post('/api/v1/order/findOne', controller.order.findOne);
    // 条件查询-取所有
    router.post('/api/v1/order/findByExample', controller.order.findByExample);
};
```
## rule
>验证规则如下，你可以根据具体情况DIY
```json
{
    "create": {
        // 创建实例规则
    },
    "update": {
        // 更新字段
    },
    "createMany": {
        "objs": {
            "type": "array",
            "rule": {
                // 同create
            }
        }
    },
    "deleteMany": {
        // 根据任意字段匹配
    },
    "updateMany": {
        "fields":{
            // 需要更新的字段
        },
        "where":{
            // 条件查询
        }
    }
}
```