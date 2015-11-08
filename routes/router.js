module.exports = function(app){

	var mongo = require('mongodb').MongoClient;


	app.get('/check', function(req, res){
		
		if(req.query.mesa != null){
			var query = {
				mesa: req.query.mesa
			}

			mongo.connect('mongodb://localhost:27017/site', function(err, db) {
				db.collection('pedidos').find(query).toArray(function(err, doc){
					if (err) throw err;

					console.dir(doc);
					res.json(doc);
					return db.close();
				});
			});
		} else {
			var query = {}

			mongo.connect('mongodb://localhost:27017/site', function(err, db) {
				db.collection('pedidos').find(query).sort({'hora':1}).toArray(function(err, doc){
					if (err) throw err;

					var mesa = [];

					for(var i = 0; i < doc.length; i++){
						if(!doc[i].finalizado){
							mesa.push(doc[i].mesa);
						}
					}

					console.dir(mesa);
					res.json(mesa);
					return db.close();
				});
			});
		}	
	});

	app.get('/entregue', function(req, res){
		
		if(req.query.mesa != null){
			var query = {
				mesa: req.query.mesa
			}

			mongo.connect('mongodb://localhost:27017/site', function(err, db) {
				db.collection('pedidos').find(query).toArray(function(err, doc){
					if (err) throw err;

					console.dir(doc);
					res.json(doc);
					return db.close();
				});
			});
		} else {
			var query = {}

			mongo.connect('mongodb://localhost:27017/site', function(err, db) {
				db.collection('pedidos').find(query).sort({'hora':1}).toArray(function(err, doc){
					if (err) throw err;

					var mesa = [];

					for(var i = 0; i < doc.length; i++){
						if(!doc[i].finalizado){
							mesa.push(doc[i].mesa);
						}
					}

					console.dir(mesa);
					res.json(mesa);
					return db.close();
				});
			});
		}	
	});


	app.get('/pedido', function(req, res){

		var query = {
			mesa: req.query.mesa
		}

		var update = {

			$inc: {
				// 'chop': req.body.chop,
				chop: 1,
				// 'refri': req.body.refri
				refri: 2,
				// 'agua': req.body.agua
				agua: 0
			},

			$set: {
				
				mesa: req.query.mesa,

				hora: new Date(),

				finalizado: false
			}

		}

		mongo.connect('mongodb://localhost:27017/site', function(err, db) {
			db.collection('pedidos').update(query, update, {upsert: true}, function(err, data){
				if (err) throw err;

		        console.log("Pedido feito");
		        res.send('Pedido Feito!' +
		        	'Seu pedido foi de ' + update.chop + ' chops, ' + update.refri + ' refri e ' + update.agua + ' agua');
		        return db.close();
			});
		});

	});

	app.get('/', function(req, res){
		res.render('index.ejs', {
			name: "Ambev"
		});
	});

	app.get('/test', function(req, res){
		res.render('index.ejs', {
			name: req.query.name
		});
	});
}