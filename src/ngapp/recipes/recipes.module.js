angular.module('recipes', [
    'shared.recipes.service'
])
.controller('RecipesCtrl', ['RecipeService', function (RecipeService) {
    var recipesCtrl = this;
    recipesCtrl.list = function() {
        return RecipeService.listRecipes();
    }
}])
.directive('recipe', [function() {
    return {
        templateUrl: 'recipes/recipe.tmpl.html'
    }
}]);
