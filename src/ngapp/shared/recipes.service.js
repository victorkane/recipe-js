angular.module('shared.recipes.service', [
    
])
    .service('RecipeService', ['$http', function ($http) {
        var recipes = [];
        this.getRecipes = function () {
            $http.get('/api/recipes').then(function (res) {
                console.log('Grabbed recipes from back-end upon load');
                recipes = res.data;
            }, function (errResponse) {
                console.error('recipes query error')
            });
        };
        this.listRecipes = function () {
            return recipes;
        };
        this.addRecipe = function (recipe) {
            recipes.push(recipe);
        };
    }]);
