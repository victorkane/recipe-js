angular.module('myrecipes', [
        'shared.recipes.service'
    ])
    .controller('MyRecipesCtrl', ['RecipeService', 'UserService', function (RecipeService, UserService) {
        var myRecipesCtrl = this;
        myRecipesCtrl.list = function () {
            return RecipeService.listRecipes();
        };
        myRecipesCtrl.currentUserName = function () {
            var cuser = UserService.getCurrentUser();
            return cuser.name;
        };
    }]);
