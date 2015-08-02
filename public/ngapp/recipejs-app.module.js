angular.module('RecipeJSApp', [
        'ui.router',
        'header',
        'recipes',
        'users'
    ])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('recipejs', {
                url: '/',
                views: {
                    'header': {
                        controller: 'HeaderCtrl as headerCtrl',
                        templateUrl: 'ngapp/header/header.tmpl.html'
                    },
                    'users': {
                        controller: 'UsersCtrl as usersCtrl',
                        templateUrl: 'ngapp/users/users.tmpl.html'
                    },
                    'recipes': {
                        controller: 'RecipesCtrl as recipesCtrl',
                        templateUrl: 'ngapp/recipes/recipes.tmpl.html'
                    }
                }
            });
        // initial and fallback rewrite
        $urlRouterProvider.otherwise('/');
    })
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
    }])
    .controller('UsersCtrl', [function () {
        var usersCtrl = this;
    }])
    .controller('RecipesCtrl', [function () {
        var recipesCtrl = this;
    }]);
