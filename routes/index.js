'use strict';

module.exports = (app) => {
    let routeArry = [
        'auth', 'employee'
    ];
    for (var i = 0; i < routeArry.length; i++) {
        app.use('/api', require(`../components/${routeArry[i]}/index`));
    }
};