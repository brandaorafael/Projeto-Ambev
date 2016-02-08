module.exports = function(db){
	var mongo = db.mongo;
	var mongoURI = db.mongoURI;

	return {
		get: function(req, res){

			var query = req.query.mesa;

			res.render('mesas.ejs', {
				mesa_id: 'Mesa 1'
			});
		}
	}
}