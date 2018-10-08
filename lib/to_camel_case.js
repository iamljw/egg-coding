'use strict';

module.exports = underscore => {
    const words = underscore.toLowerCase().split(/\_/);
    const Model = words.map(item => {
        return item.charAt(0)
            .toUpperCase()
            .concat(item.substr(1));
    }).join('');
    return {
        underscore,
        Model,
        model: Model.charAt(0).toLowerCase().concat(Model.substr(1))
    };
};
