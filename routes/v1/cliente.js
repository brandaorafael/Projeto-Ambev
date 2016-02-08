module.exports = function (moduleCliente){
  
  controllers = moduleCliente.controllers;

  return function(router){
    router.post("/cliente/pedido", function(req, res){
    	controllers.pedido.post(req, res);
    });
  }

}