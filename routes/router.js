module.exports = function(app){

	var mongo = require('mongodb').MongoClient;


	app.get('/check', function(req, res){

		mongo.connect('mongodb://localhost:27017/site', function(err, db) {
			db.collection('pedidos').findOne(function(err, doc) {
        		if(err) throw err;

        		if (!doc) {
		            console.dir("No document found");
		            return db.close();
		        }
		        return db.close();
		    });
		});

	});


	app.get('/pedido', function(req, res){

		var query = {
			// mesa: req.query.mesa
		}

		var update = {
			pedido: [
				{
					// 'chop': req.body.chop
					'chop': 0
				},{
					// 'refri': req.body.refri
					'refri': 0
				},{
					// 'agua': req.body.agua
					'agua': 0
				}
			],

			finalizado: false
		}

		mongo.connect('mongodb://localhost:27017/site', function(err, db) {
			db.collection('pedidos').update(query, update, {upsert: true}, function(err, data){
				if (err) throw err;

		        console.log("Pedido feito");
		        res.send('Pedido Feito!' +
		        	'Seu pedido foi de ' + update.pedido[0].chop + ' chops, ' + update.pedido[1].refri + ' refri e ' + update.pedido[2].agua + ' agua');
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