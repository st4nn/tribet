'use strict';

const _finder = require("./search");

exports.find = function(req, res) {
    _finder.find({})
    .then((data)=>{
        res.send(data)
    })
    .catch(()=>{
        res.sendStatus(500);
    })
}