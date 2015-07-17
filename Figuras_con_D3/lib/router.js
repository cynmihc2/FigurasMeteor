// AQUI EMPIEZA EL CODIGO QUE ESTABA EN EL EJEMPLO ORIGINAL

/*
Router.route('/', function () {
  this.render('charts');
});

Router.route('/chart2', function () {
  this.render('chart2');
});
*/
Router.configure({
  layoutTemplate: 'principal'
});


Router.map(function() {
	this.route('join');
	this.route('signin');
	this.route('distribuirDatos');
    this.route('visualizarDatos');
    this.route('barChart');
    this.route('pieChart');
    this.route('mostrarDatosUsuario');
	/*
	this.route('distribuirDatos', {
        
		name: 'distribuirDatos',
        
        onBeforeAction: function(){
        	$( document ).ready(function() {
              console.log( "ready!" );
            });
            this.next();
            
        },
        

        data: function(){
        	var datos = this.data;
        	console.log("datos: "+datos);
        },
        
        action: function(){
            console.log("Hola action");
            //this.render();
        },
        
        /*
        onAfterAction: function(){
        	console.log("HOLA");
        	
        	console.log("LAURA HERRERA");
			console.log($('body').html());
			//console.log($('canvas').html());
			//console.log(template.firstNode);
			var hola = $("#c");
			console.log("c es: "+hola);
			console.log($('#c').get(0));

			canvas = new fabric.Canvas('#c');
			
			this.render();
			
        },
        

	})
    */

});


