module.exports = function(app){

	var mongoURI = 'mongodb://localhost:27017/site';

	var mongo = require('mongodb').MongoClient;

	app.get('/mesas', function(req, res){
		res.render('mesas.ejs', {
			mesa_id: 'Mesa 1'
		});
	});
	
	app.get('/check', function(req, res){
		
		if(req.query.mesa != null){
			var query = {
				mesa: req.query.mesa
			}

			mongo.connect(mongoURI, function(err, db) {
				db.collection('pedidos').find(query).toArray(function(err, doc){
					if (err) throw err;

					console.dir(doc);
					res.json(doc);
					return db.close();
				});
			});
		} else {
			var query = {}

			mongo.connect(mongoURI, function(err, db) {
				db.collection('pedidos').find(query).sort({'hora':1}).toArray(function(err, doc){
					if (err) throw err;

					var mesa = [];

					for(var i = 0; i < doc.length; i++){
						if(!doc[i].finalizado){
							mesa.push(doc[i].mesa);
						}
					}

					console.dir(mesa);
					res.send(mesa);
					return db.close();
				});
			});
		}	
	});

	app.get('/entregue', function(req, res){
		
		var query = {
			mesa: req.query.mesa
		}

		var update = {
			chop: 0,
			refri: 0,
			agua: 0,
			mesa: req.query.mesa,
			hora: new Date(),
			finalizado: true
		}

		mongo.connect(mongoURI, function(err, db) {
			db.collection('pedidos').update(query, update, function(err, data){
				if (err) throw err;

		        console.log("Pedido entregue");
		        res.send('Pedido entregue!');
		        return db.close();
			});
		});
	
	});

	app.post('/pedido', function(req, res){
		var query = {
			mesa: req.body.mesa
		}

		var update = {

			$inc: {
				// 'chop': req.body.chop,
				chop: parseInt(req.body.demo3[0]),
				// 'refri': req.body.refri
				refri: parseInt(req.body.demo3[1]),
				// 'agua': req.body.agua
				agua: parseInt(req.body.demo3[2])
			},

			$set: {

				mesa: req.body.mesa,

				hora: new Date(),

				finalizado: false
			}

		}

		mongo.connect(mongoURI, function(err, db) {
			db.collection('pedidos').update(query, update, {upsert: true}, function(err, data){
				if (err) throw err;

		        console.log("Pedido feito");
		        res.send('Pedido Feito!');
		        return db.close();
			});
		});

	});

	app.get('/', function(req, res){
		var query = req.query.mesa;

		res.render('index.ejs', {
			mesa: query
		});
	});

	app.get('/test', function(req, res){
		console.log('ajax working');
		var array = [1,2,3,4,5];
		res.send(array);
	});
}