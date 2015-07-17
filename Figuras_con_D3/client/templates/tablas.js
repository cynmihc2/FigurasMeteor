
Template.tablaReactiva.helpers({
  figuras: function(){
    return Figuras.find({}, { sort:{timestamp: 1} });
  },
  tableSettings: function(){
    return{
      fields:[
        { key: 'username', label: "Dueño Figura" },
        { key: 'obj_type', label: "Tipo" },
        { key: 'fill', label: "Color" },
        { key: 'angle', label: "Rotacion" }
      ]
    };
  }
})