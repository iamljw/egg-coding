'use strict';

const toCamelCase = require('../../lib/to_camel_case');
const fs = require('fs');

module.exports = {
    coding(data) {
        data.models.forEach(item => {
            const camelCase = toCamelCase(item);
            if (!data.force) {
                if (fs.existsSync(`app/model/${camelCase.underscore}.js`)) {
                    console.warn(`+ model ${camelCase.underscore} existed, use with argument '-f' to overwrite it.`);
                    return;
                }
            }
            fs.writeFileSync(`app/model/${camelCase.underscore}.js`, this.build(camelCase));
            console.info(`+ model ${camelCase.underscore}`);
        });
    },
    build(data) {
        return `'use strict';

const uuid = require('uuid');

module.exports = app => {
    const { STRING, INTEGER } = app.Sequelize;
    const ${data.Model} = app.model.define('${data.underscore}', {
        // TODO 1
        // id: { type: STRING(36), primaryKey: true },
        // uname: { type: STRING, allowNull: false, field: 'u_name' },
        // age: INTEGER
    }, {
        // TODO 2
        comment: 'xx表',
        hooks: {
            beforeValidate: obj => {
                if (obj.isNewRecord) {
                    if (!obj.id) {
                        obj.id = uuid();
                    }
                }
            }
        }
    });
    return ${data.Model};
};
`;
    }
};
