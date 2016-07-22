module.exports = function(db){
	var mongo = db.mongo;
	var mongoURI = db.mongoURI;

	return {
		post: function(req, res){
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
					
					res.send('Pedido entregue!');
		        	return db.close();
				});
			});
		}
	}
}