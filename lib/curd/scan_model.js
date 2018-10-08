'use strict';

const path = require('path');
const fs = require('fs');

module.exports = () => {
    const model_path = 'app/model';
    const files = fs.readdirSync(model_path);
    return files.filter(item => {
        if (!fs.statSync(path.join(model_path, item)).isFile()) {
            return false;
        }
        if (path.extname(item) !== '.js') {
            return false;
        }
        return true;
    }).map(item => {
        return path.basename(item, '.js');
    });
};
