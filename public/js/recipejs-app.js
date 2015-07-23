angular.module('recipeJSApp', [])
.controller('ControllerHeader', ['RecipeService', 'UserService', function(RecipeService, UserService) {
  var vm = this;
  vm.message = 'Welcome';
  vm.titletext = 'RecipeJS';
  vm.edition = 'First';
  vm.list = function() {
    return RecipeService.listRecipes();
  };
  vm.currentUserName = function() {
    var cuser = UserService.getCurrentUser();
    return cuser.name;
  };
  var init = function () {
    RecipeService.getRecipes();
  };
  init();
}])
.controller('ControllerRecipe', ['RecipeService', function(RecipeService) {
  var vm = this;
  vm.list = function() {
    return RecipeService.listRecipes();
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
  var theUsers = UserService.listUsers();
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
  var theUsers = UserService.listUsers();
  if (_.findIndex(theUsers, vm.newuser) < 0) {
    UserService.addUser(vm.newuser);
    console.log('User signed up: ', vm.newuser)
    // reset form and model
    vm.newuser = {};
  }
  else {
    console.log('Registered user attempted to sign up', vm.newuser)
  }
};
var init = function () {
  UserService.getUsers();
};
init();
}])
.factory('UserService', ['$http', function($http) {
  var users = [];
  var currentUser = {};
  return {
    listUsers: function() {
      console.log('list: Users: ', users);
      return users;
    },
    addUser: function(user) {
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
    getUsers: function() {
      $http.get('/api/users').then(function(res) {
        users = res.data;
        console.log('Grabbed users from back-end upon load');
        console.log('Users: ', users);
      }, function(errResponse) {
        console.error('users query error')
      });
    }
  };
}])
.service('RecipeService', ['$http', function($http) {
  var recipes = [];
  this.getRecipes = function() {
    $http.get('/api/recipes').then(function(res) {
      console.log('Grabbed recipes from back-end upon load');
      recipes = res.data;
    }, function(errResponse) {
      console.error('recipes query error')
    });
  };
  this.listRecipes = function() {
    return recipes;
  };
  this.addRecipe = function(recipe) {
    recipes.push(recipe);
  };
}]);
