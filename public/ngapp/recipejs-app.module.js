angular.module('RecipeJSApp', [
        'ui.router',
        'header',
        'recipes',
        'users'
    ])
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('home', {
                url: '/', // Make to navigate to index.html#/
                templateUrl: 'ngapp/header/header.tmpl.html',
                controller: 'RecipeJSCtrl'
            })
            ;
    })
    .controller('RecipeJSCtrl', [function() {
        var recipeJSCtrl = this;
    }]);
//    .controller('RecipeJSCtrl', [function() {
//    }]);
