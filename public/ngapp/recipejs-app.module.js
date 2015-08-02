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
                        controller: 'HeaderCtrl',
                        templateUrl: 'ngapp/header/header.tmpl.html'
                    },
                    'users': {
                        controller: 'UsersCtrl',
                        templateUrl: 'ngapp/users/users.tmpl.html'
                    },
                    'recipes': {
                        controller: 'RecipesCtrl',
                        templateUrl: 'ngapp/recipes/recipes.tmpl.html'
                    }
                }
            });
            // initial and fallback rewrite
            $urlRouterProvider.otherwise('/');
    })
    .controller('HeaderCtrl', [function () {
        var headerCtrl = this;
    }])
    .controller('UsersCtrl', [function () {
        var usersCtrl = this;
    }])
    .controller('RecipesCtrl', [function () {
        var recipesCtrl = this;
    }]);
