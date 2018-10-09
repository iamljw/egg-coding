'use strict';

const fs = require('fs');
const shell = require('shelljs');

module.exports = {
    coding(data = {}) {
        if (!fs.existsSync('app/errors')) {
            fs.mkdirSync('app/errors');
        }
        if (fs.existsSync('app/errors/client_error.js')) {
            if (!data.force) {
                return;
            }
        }
        fs.writeFile('app/errors/client_error.js', this.build(), err => {
            if (err) {
                /**
                 * logging
                 */
                shell.echo('[egg-coding curd] code client_error error: %s', err);
            }
        });
    },
    build() {
        return `'use strict';

class ClientError extends Error {
    constructor(message) {
        super();
        this.message = message;
        this.name = 'ClientError';
    }
}

class NotFoundError extends ClientError {
    constructor(message) {
        super(message);
        this.name = 'NotFoundError';
    }
}

class ExistedError extends ClientError {
    constructor(message) {
        super(message);
        this.name = 'ExistedError';
    }
}

module.exports = {
    ClientError,
    NotFoundError,
    ExistedError
};
`;
    }
};
