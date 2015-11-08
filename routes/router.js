module.exports = function(app){
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