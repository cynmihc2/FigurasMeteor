Meteor.methods({
	
	realizarConsulta: function(valor){
	  
      var consulta = [ { $group: { _id: "$fill", value:{$sum: 1} } }];
      var consulta2 = [{$group: { _id:"$fill", figuras: { $push: "$obj_type"}}}];
      var consulta3 = [{$group: {_id: "$obj_type", figuras: { $push: "$username" }}}];
      var resultado = Figuras.aggregate(consulta2);
      console.log("Valor de Resultado: "+resultado);
	  console.log("Realizó consulta");

	  for(i=0; i<resultado.length; i++){
  	  var longInternalArray = resultado[i].figuras.length;
  	  // BUSCAR COMO CAMBIAR figuras POR UN PARÁMETRO 
  	  //for(j=0; j<longInternalArray; j++){
  		Bars.insert({"_id": resultado[i]._id, "value": longInternalArray});
  	  //}
      }
	}

});

// Figuras.aggregate([ { $group: { _id: "$fill", value:{$sum: 1} } }, {$out: Bars}]);

    //Figuras.insert({value: "Juan Manuel"});