Meteor.publish("tasks", function(){
    return Tasks.find({
      $or: [
        {private: {$ne: true} },
        {owner: this.userId}
      ]
    });
});


Meteor.methods({
	hideCompleted : function(valor){
      ServerSession.set("hideCompleted", valor);
    },
    
    addTask: function (text) {
    
    Tasks.insert({
      text: text,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username
    });
  },
  deleteTask: function (taskId) {
    var task = Tasks.findOne(taskId);
    if (task.private && task.owner !== Meteor.userId()){
      //If the task is private, make sure only the owner can delete it
      throw new Meteor.Error("not-authorized");
    }
    Tasks.remove(taskId);
  },
  setChecked: function (taskId, setChecked) {
    var task = Tasks.find(taskId);
    if (task.private && task.owner !== Meteor.userId()){
      // If the task is private, make sure only the owner can check it off
      throw new Meteor.Error("not-authorized");
    }
    Tasks.update(taskId, { $set: { checked: setChecked} });
  },

  // Add a method to Meteor.methods called setPrivate

  setPrivate: function(taskId, setToPrivate){
    var task = Tasks.findOne(taskId);

    // Make sure only the task owner can make a task private
    if(task.owner !== Meteor.userId()){
      throw new Meteor.Error("not-authorized");
    }
    
    Tasks.update(taskId, {$set: {private:setToPrivate} });
  }	
});