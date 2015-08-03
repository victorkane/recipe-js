angular.module('recipes', [
    'shared.recipes.service'
])
.controller('RecipesCtrl', ['RecipeService', function (RecipeService) {
    var recipesCtrl = this;
    recipesCtrl.list = function() {
        return RecipeService.listRecipes();
    }
}]);
