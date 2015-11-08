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

		        var decipher = crypto.createDecipher(algorithm, doc['_id']);
		        var decrypted = decipher.update(encrypted_message, 'hex', 'utf8') + decipher.final('utf8');
		        console.log("Answer: " + decrypted);
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
					'chop': 3
				},{
					// 'refri': req.body.refri
					'refri': 2
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