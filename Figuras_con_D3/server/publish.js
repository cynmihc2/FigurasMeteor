Meteor.publish("barras", function(){
    return Bars.find({});
});

Meteor.publish("slices", function(){
    return Slices.find();
});

Meteor.publish("figuras", function(){
    return Figuras.find({
      $or:  [
        {private: {$ne: true} },
        {owner: this.userId}
      ]
    });
});

Meteor.publish("resultados", function(){
	return Resultados.find({});
});