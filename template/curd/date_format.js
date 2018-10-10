'use strict';

const fs = require('fs');

module.exports = {
    coding() {
        if (!fs.existsSync('app/utils')) {
            fs.mkdirSync('app/utils');
        }
        fs.writeFileSync('app/utils/date_format.js', this.build());
    },
    build() {
        return `'use strict';

const moment = require('moment');

module.exports = obj => {
    if (obj.dataValues) {
        let { dataValues } = obj;
        if (dataValues instanceof Array) {
            dataValues = dataValues.map(obj => {
                for (const field of ['createdAt', 'updatedAt']) {
                    obj[field] = moment(obj[field]).format('YYYY-MM-DD HH:mm:ss');
                }
                return obj;
            });
        } else {
            for (const field of ['createdAt', 'updatedAt']) {
                dataValues[field] = moment(dataValues[field]).format('YYYY-MM-DD HH:mm:ss');
            }
        }
    } else if (obj instanceof Array) {
        obj = obj.map(item => {
            for (const field of ['createdAt', 'updatedAt']) {
                item[field] = moment(item[field]).format('YYYY-MM-DD HH:mm:ss');
            }
            return item;
        });
    } else {
        for (const field of ['createdAt', 'updatedAt']) {
            obj[field] = moment(obj[field]).format('YYYY-MM-DD HH:mm:ss');
        }
    }
};
`;
    }
};
