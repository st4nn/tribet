'use strict';

const wplay_finder = require("./search");

exports.find = function(req, res) {
    wplay_finder.find()
    .then((data)=>{
        res.send(data)
    })
    .catch(()=>{
        res.sendStatus(500);
    })
}