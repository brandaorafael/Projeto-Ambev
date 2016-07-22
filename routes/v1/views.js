module.exports = function (moduleViews){
  
  var controllers = moduleViews.controllers;

  return function(router){
    router.get("/", function(req, res){
    	controllers.home.get(req, res);
    });

    router.get("/mesas", function(req, res){
    	controllers.mesas.get(req, res);
    });
  }

}