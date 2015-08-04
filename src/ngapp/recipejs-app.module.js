angular.module('RecipeJSApp', [
        'ui.router',
        'header',
        'recipes',
        'users',
        'templates-app'
    ])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('recipejs', {
                url: '/',
                views: {
                    'header': {
                        controller: 'HeaderCtrl as headerCtrl',
                        templateUrl: 'header/header.tmpl.html'
                    },
                    'users': {
                        controller: 'UsersCtrl as usersCtrl',
                        templateUrl: 'users/users.tmpl.html'
                    },
                    'recipes': {
                        controller: 'RecipesCtrl as recipesCtrl',
                        templateUrl: 'recipes/recipes.tmpl.html'
                    }
                }
            });
        // initial and fallback rewrite
        $urlRouterProvider.otherwise('/');
    });
