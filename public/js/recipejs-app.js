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
.controller('ControllerHeader', ['RecipeService', 'UserService', function(RecipeService, UserService) {
  var vm = this;
  vm.message = 'Welcome';
  vm.titletext = 'RecipeJS';
  vm.edition = 'First';
  vm.list = function() {
    return RecipeService.list();
  };
  vm.currentUserName = function() {
    var cuser = UserService.getCurrentUser();
    return cuser.name;
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
vm.user = {};
vm.newuser = {};
vm.signin = function() {
  // if email and password is matched, login ok
  var theUsers = UserService.list();
  //console.log(theUsers);
  if (_.findIndex(theUsers, vm.user) > -1) {
    vm.tab = 'off';
    UserService.setCurrentUser(vm.user);
    console.log('User signed in: ', vm.user)
  }
  else {
    vm.tab = 'signup';
    console.log('No registered user for ', vm.user)
  }
};
vm.signup = function() {
  var theUsers = UserService.list();
  if (_.findIndex(theUsers, vm.newuser) < 0) {
    UserService.add(vm.newuser);
    console.log('User signed up: ', vm.newuser)
    // reset form and model
    vm.newuser = {};
  }
  else {
    console.log('Registered user attempted to sign up', vm.newuser)
  }
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
      console.log('list: Users: ', users);
      return users;
    },
    add: function(user) {
      users.push(user);
      console.log('add: Users: ', users);
    },
    getCurrentUser: function() {
      return currentUser;
    },
    setCurrentUser: function(user) {
       currentUser = user;
       console.log('currentUser signed in user is: ', currentUser)
    },
  };
}])
.service('RecipeService', [RecipeService]);
