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
.controller('ControllerUser', [function() {
var vm = this;
vm.emailFormat = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;
vm.submit = function() {
  console.log('User signed in: ', vm.user)
};
}])
.service('RecipeService', [RecipeService]);
