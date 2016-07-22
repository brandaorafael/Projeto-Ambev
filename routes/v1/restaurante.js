module.exports = function (moduleRestaurante){
  
  var controllers = moduleRestaurante.controllers;

  return function(router){
    router.get("/restaurante/check", function(req, res){
    	controllers.check.get(req, res);
    });

    router.get("/restaurante/entregue", function(req, res){
    	controllers.entregue.get(req, res);
    });
  }

}