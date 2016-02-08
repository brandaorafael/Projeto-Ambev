module.exports = function(db){
	var mongo = db.mongo;
	var mongoURI = db.mongoURI;

	return {
		get: function(req, res){
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
		}
	}
}