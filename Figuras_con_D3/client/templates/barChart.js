// CUANDO SE RECARGA EL NAVEGADOR SE AGREGAN 10 COLUMNAS NUEVAS

Meteor.subscribe("barras");
Meteor.subscribe("resultados");
//Meteor.subscribe("figuras");
//var Bars = new Meteor.Collection();

Session.setDefault('barChartSort','none');
Session.setDefault('barChartSortModifier',undefined);

/*
var misFiguras = Figuras.find({}).fetch();
var longitud = misFiguras.length;
console.log("HIZO ALGO EN FIGURAS: "+longitud);
*/
//Meteor.startup(function(){
Template.barChart.helpers({

  traerFiguras: function(){
  miVector = [10,20,30,40,50,60,70,80,90,100];

  var misBarras = Bars.find({}).fetch();
  var longitud2 = misBarras.length;
  console.log("longitud Barras: "+longitud2);

  //if(Bars.find({}).count() != 0){
    /*
    Bars.insert({
        value:Math.floor(Math.random() * 25)
			  //value:miVector[i]
    });
    */
    
   // Figuras.aggregate([ { $group: { _id: "$fill", value:{$sum: 1} } }, {$out: Bars}]);

    //Figuras.insert({value: "Juan Manuel"});
    var misFiguras = Figuras.find({}).fetch();
    var longitud = misFiguras.length;
    console.log("HIZO ALGO EN FIGURAS: "+longitud);

  //};
  
   
//});
}, 

traerResultados: function(){
  var result = Resultados.find({}).fetch();
  var longResul = result.length;
  console.log("long de Resultados: "+longResul);
  var uno = result[6].figuras.length;
  var dos = result[6].figuras[1];
  

  for(i=0; i<result.length; i++){
  	var longInternalArray = result[i].figuras.length;
  	// BUSCAR COMO CAMBIAR figuras POR UN PARÁMETRO 
  	//for(j=0; j<longInternalArray; j++){
  		Bars.insert({"_id": result[i]._id, "value": longInternalArray});
  	//}
  }
  
}     

})

 

Template.barChart.events({
	'click #add':function(){
		Bars.insert({
			value:Math.floor(Math.random() * 25)
		});
	},
	'click #remove':function(){
		var toRemove = Random.choice(Bars.find().fetch());
		Bars.remove({_id:toRemove._id});
	},
	'click #randomize':function(){
		//loop through bars
		Bars.find({}).forEach(function(bar){
			//update the value of the bar
			Bars.update({_id:bar._id},{$set:{value:Math.floor(Math.random() * 25)}});
		});
	},
	'click #toggleSort':function(){
		if(Session.equals('barChartSort', 'none')){
			Session.set('barChartSort','asc');
			Session.set('barChartSortModifier',{sort:{value:1}});
		}else if(Session.equals('barChartSort', 'asc')){
			Session.set('barChartSort','desc');
			Session.set('barChartSortModifier',{sort:{value:-1}});
		}else{
			Session.set('barChartSort','none');
			Session.set('barChartSortModifier',{});
		}
	},
	'click rect':function(event, template){
		alert('you clicked a bar for document with _id=' + $(event.currentTarget).data("id"));
	}
});


Template.barChart.rendered = function(){  

	//Width and height
	var w = 600;
	var h = 250;
	
	var xScale = d3.scale.ordinal()
					.rangeRoundBands([0, w], 0.05);

	var yScale = d3.scale.linear()
					.range([0, h]);
	
	//Define key function, to be used when binding data
	var key = function(d) {
		return d._id;
	};
	
	//Create SVG element
	var svg = d3.select("#barChart")
				.attr("width", w)
				.attr("height", h);

	Deps.autorun(function(){
		var modifier = {fields:{value:1}};
		var sortModifier = Session.get('barChartSortModifier');
		if(sortModifier && sortModifier.sort)
			modifier.sort = sortModifier.sort;
		
		var dataset = Bars.find({},modifier).fetch();

		//Update scale domains
		xScale.domain(d3.range(dataset.length));
		yScale.domain([0, d3.max(dataset, function(d) { return d.value; })]);

		//Select…
		var bars = svg.selectAll("rect")
			.data(dataset, key);
		
		//Enter…
		bars.enter()
			.append("rect")
			.attr("x", w)
			.attr("y", function(d) {
				return h - yScale(d.value);
			})
			.attr("width", xScale.rangeBand())
			.attr("height", function(d) {
				return yScale(d.value);
			})
			.attr("fill", function(d) {
				return "rgb(0, 0, " + (d.value * 10) + ")";
			})
			.attr("data-id", function(d){
				return d._id;
			});

		//Update…
		bars.transition()
			// .delay(function(d, i) {
			// 	return i / dataset.length * 1000;
			// }) // this delay will make transistions sequential instead of paralle
			.duration(500)
			.attr("x", function(d, i) {
				return xScale(i);
			})
			.attr("y", function(d) {
				return h - yScale(d.value);
			})
			.attr("width", xScale.rangeBand())
			.attr("height", function(d) {
				return yScale(d.value);
			}).attr("fill", function(d) {
				return "rgb(0, 0, " + (d.value * 10) + ")";
			});

		//Exit…
		bars.exit()
			.transition()
			.duration(500)
			.attr("x", -xScale.rangeBand())
			.remove();



		//Update all labels

		//Select…
		var labels = svg.selectAll("text")
			.data(dataset, key);
		
		//Enter…
		labels.enter()
			.append("text")
			.text(function(d) {
				return d.value;
			})
			.attr("text-anchor", "middle")
			.attr("x", w)
			.attr("y", function(d) {
				return h - yScale(d.value) + 14;
			})						
		   .attr("font-family", "sans-serif")
		   .attr("font-size", "11px")
		   .attr("fill", "white");

		//Update…
		labels.transition()
			// .delay(function(d, i) {
			// 	return i / dataset.length * 1000;
			// }) // this delay will make transistions sequential instead of paralle
			.duration(500)
			.attr("x", function(d, i) {
				return xScale(i) + xScale.rangeBand() / 2;
			}).attr("y", function(d) {
				return h - yScale(d.value) + 14;
			}).text(function(d) {
				return d.value;
			});

		//Exit…
		labels.exit()
			.transition()
			.duration(500)
			.attr("x", -xScale.rangeBand())
			.remove();

	});
};