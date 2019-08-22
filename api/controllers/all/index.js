'use strict';

const 
    _wplay = require("../wplay/search"),
    _betplay = require("../betplay/search"),
    _codere = require("../codere/search");

    exports.find = (req, res)=>{
        _wplay.find({forAll : true, prevArr : {}})
        .then((data)=>{
            _codere.find({forAll : true, prevArr : data})
            .then((codereAns)=>{
                _betplay.find({forAll : true, prevArr : codereAns})
                .then((ans)=>{
                    res.send(ans);
                })
                .catch(()=>{
                    res.sendStatus(500);
                });
            })
            .catch(()=>{
                res.sendStatus(500);
            });
        })
        .catch(()=>{
            res.sendStatus(500);
        });
      }