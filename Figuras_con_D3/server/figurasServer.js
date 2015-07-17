/*
Meteor.publish("figuras", function(){
    return Figuras.find({
      $or:  [
        {private: {$ne: true} },
        {owner: this.userId}
      ]
    });
});
*/


Meteor.methods({

  addShape: function(obj_type){

    console.log("obj_type: "+obj_type);
    if (obj_type === "rect" || obj_type === "triangle" || obj_type === "circle"){
      
      fill = "rgb(" + (random_range(70,200)) + ","
          + (random_range(70, 200)) + "," + (random_range(70,200)) + ")";
      scaleX = 1;
      scaleY = 1;
    
      if(obj_type === "circle"){

        scaleX = 0.5;
        scaleY = 0.5;
      }
    }

    
    Figuras.insert({
      obj_type: obj_type,
      timestamp: (new Date()).getTime(),
      left: random_range(30, 500),
      top: random_range(30, 250),
      width:random_range(30, 70),
      height: random_range(30, 70),
      scaleX: scaleX,
      scaleY: scaleY,
      angle: 0,
      fill: fill, 
      owner: Meteor.userId(),
      username: Meteor.user().username, 
      private: !! this.private

    });
  },

  cambiarColor: function(shapeId, color){
    /*
    console.log("Aqui vamos");
    console.log("Objecto: "+obj);
    var deserealizedObj = JSON.parse(obj);
    console.log("Objeto Deserealizado: "+deserealizedObj);
    console.log("deserealizedObj.mongoId: "+deserealizedObj.mongoId);
    console.log("deserealizedObj.obj_type: "+deserealizedObj.obj_type);
    */
    Figuras.update(shapeId, { $set: {fill:color} });

  },

  compartirFig: function(id, valor){
    Figuras.update(id, { $set: {private:valor} });
  },

  removeShape: function(shapeId, valor){
    Figuras.remove(shapeId);
    ServerSession.set("eliminarFigura", valor);
  },

  modificarFigura: function(fig, id){
    console.log("ENTRA A FIG_MODIFICADA");
    console.log("fig: "+fig);
    var deserealizedFig = JSON.parse(fig);
    console.log("Objeto Deserealizado: "+deserealizedFig);
    console.log("deserealizedFig.mongoId: "+deserealizedFig.mongoId);
       
         Figuras.update(id,
            { $set:
                deserealizedFig
            } );
  }, 

  actualizarFigura: function(id, top, left){
    Figuras.update(id, { $set: {top:top, left:left} });
  },

  escalarFigura: function(id, height, width, scaleX, scaleY){
    Figuras.update(id, { $set: {height:height, width:width,
                                scaleX: scaleX, scaleY: scaleY} });
  },

  actualizarAngulo: function(id, ang){
    Figuras.update(id, { $set: {angle:ang} });
  }

});