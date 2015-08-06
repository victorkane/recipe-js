angular.module('myrecipes', [
        'shared.recipes.service'
    ])
    .controller('MyRecipesCtrl', ['RecipeService', 'UserService', function (RecipeService, UserService) {
        var myRecipesCtrl = this;
        myRecipesCtrl.cuser = '';
        myRecipesCtrl.list = function () {
             return RecipeService.listRecipes();
        };
        myRecipesCtrl.currentUserID = function () {
            myRecipesCtrl.cuser = UserService.getCurrentUser();
            return myRecipesCtrl.cuser.id;
        };
    }]);
