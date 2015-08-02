angular.module('RecipeJSApp', [
        'ui.router',
        'header',
        'recipes',
        'users'
    ])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('init', {
                url: '/', // Make to navigate to index.html#/
                templateUrl: 'ngapp/header/header.tmpl.html',
                controller: 'RecipeJSCtrl'
            })
            ;
        // initial and fallback redirect
        $urlRouterProvider.otherwise('/');
    })
    .controller('RecipeJSCtrl', [function() {
        var recipeJSCtrl = this;
    }]);
//    .controller('RecipeJSCtrl', [function() {
//    }]);
