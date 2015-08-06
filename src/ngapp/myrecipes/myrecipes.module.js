angular.module('myrecipes', [
        'shared.recipes.service'
    ])
    .controller('MyRecipesCtrl', ['RecipeService', 'UserService', '$filter', function (RecipeService, UserService, $filter) {
        var myRecipesCtrl = this;
        myRecipesCtrl.cuser = '';
        myRecipesCtrl.myRecipes = [];
        myRecipesCtrl.list = function () {
            return RecipeService.listRecipes();
        };
        myRecipesCtrl.listMyRecipes = function () {
            return RecipeService.listRecipes();
        };
        myRecipesCtrl.currentUserID = function () {
            myRecipesCtrl.cuser = UserService.getCurrentUser();
            if (myRecipesCtrl.cuser.id) {
                var theRecipes = RecipeService.listRecipes();
                myRecipesCtrl.myRecipes = $filter('filter')(theRecipes, {
                    userid: myRecipesCtrl.cuser.id
                });
            }
            return myRecipesCtrl.cuser.id;
        };
    }]);
