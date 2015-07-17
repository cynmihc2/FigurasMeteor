var EXISTEN_FIGURAS = 'existenFiguras';
Session.setDefault(EXISTEN_FIGURAS, false);

Meteor.subscribe("figuras");

var lauraHerrera = Figuras.find({}).fetch();
console.log("Trae figuras");

console.log("Despues de subscribe");

algunCambioEnFigura();

/*
Template.figuras.rendered = function(){
    
    //console.log("Ingresa array Figuras");
    return Figuras.find({}, { sort:{timestamp: 1} });
},
*/



Template.figuras.helpers({
 
 
  figuras: function(){
    console.log("Ingresa array Figuras");
    return Figuras.find({}, { sort:{timestamp: 1} });
  },
  

  figurita: function(){
    
    console.log("Entra a helper figurita");
    

    //console.log("# Figuras en canvas: "+canvas._objects.length);
    /*
    canvas._objects.forEach(function(_this){
      // console.log('item canvas::');
      console.log('mongoId: '+_this.mongoId);
    });
  */

    //figura = (function() {

      var figurita ; 
      var figTransicion;

      switch(this.obj_type){
        case "rect":
          figurita = new fabric.Rect({
            width: this.width,
            height: this.height,
            //scaleX: this.scaleX,
            //scaleY: this.scaleY,
            
          });
          break;
        case "triangle":
          figurita = new fabric.Triangle({
            width: this.width,
            height: this.height,
            //scaleX: this.scaleX,
            //scaleY: this.scaleY
          });
          break;
        case "circle":
          figurita = new fabric.Circle({
            radius: this.width,
            scaleX: this.scaleX,
            scaleY: this.scaleY
          });
          break;
      };

    figurita.mongoId = this._id; 
    console.log("id de figurita: "+figurita.mongoId);
        add_canvas_figura.call(this,figurita);
    
  }
});

Template.elCanvas.helpers({
  dibujar: function(){
    console.log("Inicia llamado canvas rendered");
    Template.elCanvas.rendered();
    console.log("Finaliza llamado canvas rendered");
  }  
});

Template.elCanvas.events({
  "click .add-shape": function(e){
    var target = e.currentTarget || e.target;

    Meteor.call("addShape", $(target).data("shape"));
    console.log("imprime linea que va luego de add_fabric_thing");

  },

  
  "click .remove-shape": function(e){
    var activeObject = canvas.getActiveObject();
    var shapeId = activeObject.mongoId;

    Meteor.call("removeShape", shapeId, true);
    algunCambioEnFigura();
    /*
    if(ServerSession.get("eliminarFigura")){
    //AQUI DEPRONTO LLAMAR METODO PARA ELIMINAR DEL CANVAS
      console.log("Entra a server Session");
      canvas.remove(activeObject);
    }
    console.log("HOLA A TODOS");
    */
    
  },
  

  "click .color-shape": function(e){
    var temporal = e.currentTarget || e.target;
    var activeObject = canvas.getActiveObject();
    console.log("Objectico: "+activeObject);

    var eleccion = $(temporal).data("shape");
    console.log("Eleccion: "+eleccion);

    var shapeId = activeObject.mongoId;
  /*
  var dato = {
          angle: activeObject.angle,
          fill: activeObject.fill,
          height: activeObject.height,
          left: activeObject.left,
          mongoId: activeObject.mongoId,
          obj_type: activeObject.obj_type,
          originX: activeObject.originX,
          originY: activeObject.originY,
          scaleX: activeObject.scaleX,
          scaleY: activeObject.scaleY,
          top: activeObject.top,
          width: activeObject.width 
        };

    var objectSerialize = JSON.stringify(dato);
    console.log("EL OBJETO: "+objectSerialize);
    var deserealizedObj = JSON.parse(objectSerialize);    
    */
    Meteor.call("cambiarColor", shapeId, eleccion);
  },

  "click .compartir": function(){
    //var temporal = e.currentTarget || e.target;
    var activeObject = canvas.getActiveObject();
    var shapeId = activeObject.mongoId;
    var misFiguras = Figuras.find({}).fetch();
    //var eleccion = $(temporal).data("shape");
    //console.log("privadaCompartir: "+!!this.private);
    Meteor.call("compartirFig", shapeId, !!this.private);
    //Meteor.call("compartirFig", shapeId, false);

  }, 

  "click .ocultar": function(){
    //var temporal = e.currentTarget || e.target;
    var activeObject = canvas.getActiveObject();
    var shapeId = activeObject.mongoId;
    //var eleccion = $(temporal).data("shape");
    //console.log("privadaOcultar: "+!this.private);
    Meteor.call("compartirFig", shapeId, !this.private);
    //Meteor.call("compartirFig", shapeId, true);
  }

});

/*
Template.figuras.onCreated = function(){
  Template.elCanvas.rendered();
  console.log("SI FUNCIONA");
  console.log("Ingresa array Figuras");
  return Figuras.find({}, { sort:{timestamp: 1} });

}
*/
// Template.elCanvas.onCreated = function(){

// }



Template.elCanvas.rendered = function(){
  //Meteor.startup(function(){
  console.log("Template rendered");
  //console.log($('body').html());
  elObj = $('canvas').html();
  console.log("elObj: "+elObj);
  canvas = new fabric.Canvas('c');
  var hola = $('#c');
  console.log("hola es: "+hola);
  console.log($('#c').get(0));
  
  canvas.observe("object:modified", figura_modificada);
  canvas.observe("object:moving", moviendoObjeto);
 // canvas.observe("mouse:up", mouseLevantado);
  canvas.observe("object:selected", objetoSeleccionado);
  canvas.observe("object:rotating", rotandoObjeto);
  canvas.observe("object:scaling", escalandoObjeto);
  
  //});
}

/*
Meteor.setTimeout(Template.elCanvas.dibujar(), 1000);
console.log("Despues setTimeoutCanvas");
Meteor.setTimeout(Template.figuras.figuras(), 2000);
console.log("Despues setTimeoutFiguras");
*/


function add_canvas_figura(fig){
  
  figura_modificada(fig);
  fig.fill = this.fill;
  fig.setAngle(this.angle);
  fig.originX = 'center';
  fig.originY = 'center';
  fig.left = this.left;
  fig.top = this.top;
  fig.scaleX = this.scaleX;
  fig.scaleY = this.scaleY;
  fig.mongoId = this._id;
  fig.obj_type = this.obj_type;
  fig.owner = this.owner;
  fig.username = this.username;
  fig.private = this.private;
  
  console.log("_id en canvas: "+fig.mongoId);
  canvas.add(fig);
 
  console.log("LA FIGURA ES: "+fig);
  console.log("Agrega a canvas");
};


figura_modificada = function(fig){
    
    console.log("ENTRO A figura_modificada");
    
    
    // ACA QUEDE
    // IMPRIMIR ID DE FIGURA SIN MODIFICAR E ID DE FIGURA MODIFICADA
    console.log("fig: "+fig);
    
    if(fig.mongoId == undefined){
        console.log("Entra a IF de fig_Modificada");
        var figurota = fig.target;
        //var figurota = fig.memo.target;
        console.log("fig.memo.target : "+figurota);
        var id = figurota.mongoId;
        console.log("figurota.mongoId : "+figurota.mongoId);
        /*
          Figuras.update(figurota.mongoId,
            { $set:
                {
                  top: figurota.top,
                  left: figurota.left,
                  angle: figurota.angle,
                  scaleX: figurota.scaleX,
                  scaleY: figurota.scaleY,
                  width: figurota.width,
                  height: figurota.height,
                  fill: figurota.fill
                }
            } );
         */
        
        
        var data = {
          top: figurota.top,
          left: figurota.left,
          angle: figurota.getAngle(),
          fill: figurota.fill,
          mongoId: figurota.mongoId,
          owner: figurota.owner,
          username: figurota.username
          };
          if(figurota.obj_type === "circle"){
              data.scaleX = figurota.scaleX;
              data.scaleY = figurota.scaleY;
          }
          else{
              data.width = figurota.width;
              data.height = figurota.height;
          }
                 
        var dataSerialized = JSON.stringify(data);
        console.log("FIGURA SERIALIZADA: "+dataSerialized);
        Meteor.call("modificarFigura", dataSerialized, id); 
    }
    else{
      console.log("No hizo nada");
    }
        
};


function algunCambioEnFigura(){
  var query=Figuras.find({}, { sort:{timestamp: 1} });
  console.log("Entra a algunCambioEnFigura");
  var handle = query.observeChanges({

    added: function (id, user) {
      console.log(" brings the total to  admins.");
    },

    changed: function (id, obj) {
      console.log("Some was changed "+obj);
      console.log(obj);
      console.log(canvas._objects.length);
  
      canvas.forEachObject(function(elem){
          if(elem.mongoId==id){
              canvas.remove(elem);
          }
      });
    }, 
    
    removed: function (id, obj) {
      console.log("Se elimino figura "+obj);
      console.log(obj);
      console.log(canvas._objects.length);
  
      canvas.forEachObject(function(elem){
          if(elem.mongoId==id){
              canvas.remove(elem);
          }
      });
    },
    
  });
}


escalandoObjeto = function(objeto){
  //var objetico = objeto.memo.target;
  var objetico = objeto.target;
  console.log("El objeto se esta escalando");
  var id = objetico.mongoId;
  var height = objetico.height;
  var width = objetico.width;
  var scaleX = objetico.scaleX;
  var scaleY = objetico.scaleY;
  Meteor.call("escalarFigura", id, height, width, scaleX, scaleY);
},

rotandoObjeto = function(objeto){
  console.log("Hola rotando");
  //if (Session.get("figuraActiva")){
    var objetico = objeto.target;
    var idObjeto = objetico.mongoId;
    var angulo = objetico.angle;
    Meteor.call("actualizarAngulo", idObjeto, angulo);
  //}
  
  console.log("El objeto se esta rotando ");
},


moviendoObjeto = function(objeto){
  //var objetico = objeto.memo.target;
  var objetico = objeto.target;
  console.log("El objeto se esta moviendo");
  if(Session.get("figuraActiva")){
    var id = objetico.mongoId;
    var top = objetico.top;
    var left = objetico.left;
    //insertarFiguraTransicion(id, objetico);
    Meteor.call("actualizarFigura", id, top, left);
  }
},

objetoSeleccionado = function(objeto){
  //var objetico = objeto.memo.target;
  var objetico = objeto.target;
  console.log("Presionó mouse");
  //Session.set("figuraActiva", objeto.memo.target.mongoId);
  Session.set("figuraActiva", objeto.target.mongoId);
  console.log("figuraActiva :"+Session.get("figuraActiva"));
},

mouseLevantado = function(){
  console.log("Levantó mouse");
  var id = Session.get("figuraActiva");
  //var figura = FigurasTransicion.findOne(id);
  Figuras.update(id, figura);
  Session.set("figuraActiva", undefined);
}

/*
Meteor.startup(function(){
  console.log("Laura Herrera");
  canvas = new fabric.Canvas('c');

  console.log($('c'));
  var hola = $('#c');
  console.log("hola es: "+hola);
  console.log($('#c').get(0));

  canvas.observe("object:modified", figura_modificada);
  canvas.observe("object:moving", moviendoObjeto);
 // canvas.observe("mouse:up", mouseLevantado);
  canvas.observe("object:selected", objetoSeleccionado);
  //canvas.observe("object:rotating", rotandoObjeto);
});
*/