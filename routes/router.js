module.exports = function(app){
	var mysql = require('mysql');
	var connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '',
		database: 'hack-ambev'
	});


	app.get('/check', function(req, res){
		connection.connect(function(err){
			if(err){
				console.log("Error connecting");
				res.end();
			}
			connection.query('SELECT quantidade, nome_produto, mesa_id, bar_id FROM pedidos WHERE entregue = 0', function(err, results, fields){
				if(err){
					console.log("Error querying the pedidos table.");
					res.end()
				}
				console.log(results);
				res.send(results);
			});	
		});
	});

	app.get('/', function(req, res){
		res.render('index.ejs', {
			name: "Ambev"
		});
		// connection.connect(function(err) {
		//   	if (err) {
		//     	console.error('error connecting: ' + err.stack);
		//     	return;
		//   	}

		//   	console.log('connected as id ' + connection.threadId);
		// });

	});
	app.get('/test', function(req, res){
		res.render('index.ejs', {
			name: req.query.name
		});
	});
}