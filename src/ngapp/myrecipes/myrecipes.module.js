angular.module('myrecipes', [
    'shared.recipes.service'
])
.controller('MyRecipesCtrl', ['RecipeService', function (RecipeService) {
    var myRecipesCtrl = this;
    myRecipesCtrl.list = function() {
        return RecipeService.listRecipes();
    }
}]);
