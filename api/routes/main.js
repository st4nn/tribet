'use strict';


module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    const 
        all = require('../controllers/all'),
        codere = require('../controllers/codere'),
        wPlay = require('../controllers/wplay');

    app.route('/')
    .get(all.find);

    app.route('/wplay')
    .get(wPlay.find);

    app.route('/codere')
    .get(codere.find);
}