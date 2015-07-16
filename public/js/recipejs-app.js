function RecipeService() {
  var recipes = [
    {title: "Baked Beans on Toast", new: true},
    {title: "French Toast", new: false},
    {title: "Rocky Mountain Egg", new: false},
  ];
  this.list = function() {
    return recipes;
  };
  this.add = function(recipe) {
    recipes.push(recipe);
  };
}

angular.module('recipeJSApp', [])
.controller('ControllerHeader', ['RecipeService', function(RecipeService) {
  var vm = this;
  vm.message = 'Welcome';
  vm.titletext = 'RecipeJS';
  vm.edition = 'First';
  vm.list = function() {
    return RecipeService.list();
  };
}])
.controller('ControllerRecipe', ['RecipeService', function(RecipeService) {
  var vm = this;
  vm.list = function() {
    return RecipeService.list();
  };
}])
.controller('ControllerUser', ['UserService', function(UserService) {
var vm = this;
vm.tab = 'signin';
vm.open = function(tab) {
  vm.tab = tab;
};
vm.emailFormat = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;
vm.user = [];
vm.submit = function() {
  console.log('User signed in: ', vm.user)
  UserService.setCurrentUser(vm.user);
};
}])
.factory('UserService', [function() {
  var users = [
    {email: 'victorkane@example.com', name: 'Victor Kane', password: '123456'},
    {email: 'henry@example.com', name: 'Henry James', password: 'abcdefg'},
    {email: 'mary@example.com', name: 'Mary McArthur', password: '11111111'},
    {email: 'judy@example.com', name: 'Judy Cromwell', password: 'fido'},
  ];
  var currentUser = {};
  return {
    list: function() {
      return users;
    },
    add: function(user) {
      users.push(user);
    },
    setCurrentUser: function(user) {
       currentUser = user;
       console.log('currentUser signed in user is: ', currentUser)
    },
  };
}])
.service('RecipeService', [RecipeService]);
