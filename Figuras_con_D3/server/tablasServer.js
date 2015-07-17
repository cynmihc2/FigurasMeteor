Meteor.publish("graficos", function(){
    return Graficos.find();
});

/*
var data = 
      {
        cols: [{id: 'name', label: 'Name', type: 'string'},
               {id: 'salary', label: 'Salary', type: 'number'},
               {id: 'timeEmpl', label: 'Full Time Employee', type: 
                'boolean'}],
          rows: [{c:[{v: 'Mike'}, {v: '$10,000'}, {v: true}]},
               {c:[{v: 'Jim'}, {v: '$8,000'}, {v: false}]},
               {c:[{v: 'Alice'}, {v: '$12.500'}, {v: true}]},
               {c:[{v: 'Bob'}, {v: '$7,000'}, {v: true}]},
               {c:[{v: 'Leonel'}, {v: '$9,000'}, {v: true}]}
              ]
      };
          dataSerialized = data.toJSON();
//Graficos.insert(dataSerialized);
Graficos.insert(dataSerialized);
*/

Meteor.methods({
  mostrarTabla: function(valor){
    ServerSession.set("mostrarTabla", valor);
    console.log("Resultado: "+ServerSession.get("mostrarTabla"));
  },

  
  mostrarBarras: function(valor){
    ServerSession.set("mostrarBarras", valor);
    console.log("Resultado: "+ServerSession.get("mostrarBarras"));
  },
  
})