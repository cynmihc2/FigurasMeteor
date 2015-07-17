var USER_MENU_KEY = 'userMenuOpen';
Session.setDefault(USER_MENU_KEY, false);


Template.principal.helpers({
    userMenuOpen: function(){
      return Session.get(USER_MENU_KEY);   
    }, 
    mostrarNombre: function(){
      var nombre = Meteor.user().username;
      //console.log("El nombre es: "+nombre);
      return nombre;
    }, 
});


Template.principal.events({
    'click .js-user-menu': function(){
      Session.set(USER_MENU_KEY, ! Session.get(USER_MENU_KEY));
    }, 
    'click .js-logout': function(){
      Meteor.logout();
    }
});