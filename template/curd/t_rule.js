'use strict';

const fs = require('fs');
const shell = require('shelljs');

module.exports = {
    coding(data) {
        if (!fs.existsSync('app/rules')) {
            fs.mkdirSync('app/rules');
        }
        if (fs.existsSync(`app/rules/${data.underscore}.json`)) {
            if (!data.force) {
                return;
            }
        }
        fs.writeFile(`app/rules/${data.underscore}.json`, this.build(), err => {
            if (err) {
                /**
                 * logging
                 */
                shell.echo('[egg-coding curd] code client_error error: %s', err);
            }
        });
    },
    build() {
        return `{
            "create": {
        
            },
            "update": {
                
            },
            "createMany": {
        
            },
            "deleteMany": {
        
            },
            "updateMany": {
                
            }
        }
        `;
    }
};
