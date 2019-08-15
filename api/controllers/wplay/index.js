'use strict';

const wplay_finder = require("./search");

exports.find = function(req, res) {
    wplay_finder.find()
    .then(()=>{
        res.sendStatus(200);
    })
    .catch(()=>{
        res.sendStatus(500);
    })
}