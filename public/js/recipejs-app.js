angular.module('recipeJSApp', [])
.controller('ControllerHeader', [function() {
  var vm = this;
  vm.message = 'Welcome';
  vm.titletext = 'RecipeJS';
  vm.edition = 'First';
}])
.controller('ControllerRecipe', [function() {
  var vm = this;
  vm.recipes = [
    {title: "Baked Beans on Toast", new: true},
    {title: "French Toast", new: false},
    {title: "Rocky Mountain Egg", new: false},
  ];
}])
.controller('ControllerUser', [function() {
var vm = this;
vm.emailFormat = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;
vm.submit = function() {
  console.log('User signed in: ', vm.user)
};
}]);
