angular.module('header', [
        'shared.recipes.service',
        'shared.users.service'
    ])
    .controller('HeaderCtrl', ['RecipeService', 'UserService', function (RecipeService, UserService) {
        var headerCtrl = this;
        headerCtrl.message = 'Welcome';
        headerCtrl.titletext = 'RecipeJS';
        headerCtrl.edition = 'First';
        headerCtrl.list = function () {
            return RecipeService.listRecipes();
        };
        headerCtrl.currentUserName = function () {
            var cuser = UserService.getCurrentUser();
            return cuser.name;
        };
        var init = function () {
            RecipeService.getRecipes();
        };
        init();
    }]);
