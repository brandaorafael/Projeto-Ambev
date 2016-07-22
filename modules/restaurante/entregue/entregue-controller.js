module.exports = function(db){
	var mongo = db.mongo;
	var mongoURI = db.mongoURI;

	return {
		get: function(req, res){
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
			        res.send('Pedido Feito!');
		        	return db.close();
				});
			});	
		}
	}
}