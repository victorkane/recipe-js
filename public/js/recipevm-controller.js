angular.module('recipeJSApp', [])
  .controller('RecipeVM', [function() {
  var vm = this;
  vm.message = 'Welcome';
  vm.titletext = 'RecipeJS';
  vm.edition = 'First';
  vm.recipes = [
    {title: "Baked Beans on Toast", new: true},
    {title: "French Toast", new: false},
    {title: "Rocky Mountain Egg", new: false},
  ];
  vm.username = '';
}]);
