var express = require('express'),
	bodyParser = require('body-parser'),
  	app = express(),
    port = process.env.PORT || 4000;
      
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); 

var routes = require('./api/routes/main'); //importing route
routes(app); //register the route

app.listen(port);

console.log('TRIBET RESTful API server started on: ' + port + ' ' + process.env.NODE_ENV);

app.use(express.static('public'));

app.use(function(req, res) {
res.status(404).send({url: req.originalUrl + ' not found'});
});


