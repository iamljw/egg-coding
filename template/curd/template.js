'use strict';

const router = require('./t_router');
const errors = require('./t_errors');
const controller = require('./t_controller');
const service = require('./t_service');
const baseContextClass = require('./t_base_context_class');
const rule = require('./t_rule');

module.exports = data => {
    router.coding(data);
    errors.coding(data);
    controller.coding(data);
    service.coding(data);
    baseContextClass.coding(data);
    rule.coding(data);
};
