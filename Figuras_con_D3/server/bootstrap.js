Meteor.startup(function(){
  var lasFiguras = Figuras.find({}).fetch();

 //var resultados3 = Resultados3.find({}).fetch();

/*
  _.each(lasFiguras, function(figura){
    Bars.insert({
  		  idFigura: figura.mongoId, 
  		  idPropietario: figura.owner,
  		  nombrePropietario: figura.username
  	});  
  })
*/


});