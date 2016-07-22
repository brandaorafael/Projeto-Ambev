module.exports = function(){
	var app = {};
	app.express 		= require('express');
	app.path 			= require('path');
	app.http 			= require('http');
	app.morgan         	= require('morgan');
	app.bodyParser     	= require('body-parser');
	app.methodOverride 	= require('method-override');

	//Db
	var db = {};
	db.mongo = require('mongodb').MongoClient;
	db.mongoURI = 'mongodb://localhost:27017/site';

	//Modulo Cliente
	var cliente = {};
	cliente.controllers = {};
	cliente.controllers.pedido = require(__dirname + '/modules/cliente/pedido/pedido-controller.js')(db);

	//Modulo Restaurante
	var restaurante = {};
	restaurante.controllers = {};
	restaurante.controllers.check = require(__dirname + '/modules/restaurante/check/check-controller.js')(db);
	restaurante.controllers.entregue = require(__dirname + '/modules/restaurante/entregue/entregue-controller.js')(db);

	//Modulo Views
	var views = {};
	views.controllers = {};
	views.controllers.home = require(__dirname + '/modules/views/home/home-controller.js')(db);
	views.controllers.mesas = require(__dirname + '/modules/views/mesas/mesas-controller.js')(db);

	//Rotas
	var routes = {};
	routes.routes = require(__dirname + '/routes/router.js')(app.express, routes);
	routes.v1 = {};
	routes.v1.cliente = require(__dirname + '/routes/v1/cliente.js')(cliente);
	routes.v1.restaurante = require(__dirname + '/routes/v1/restaurante.js')(restaurante);
	routes.v1.views = require(__dirname + '/routes/v1/views.js')(views);

	return {
		app: app,
		router: routes.routes
	}

}