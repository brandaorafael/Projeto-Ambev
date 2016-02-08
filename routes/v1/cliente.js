module.exports = function (moduleCliente){
  
  var controllers = moduleCliente.controllers;

  return function(router){
    router.post("/cliente/pedido", function(req, res){
    	controllers.pedido.post(req, res);
    });
  }

}