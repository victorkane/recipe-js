angular.module('RecipeJSApp', [
        'ui.router',
        'header',
        'recipes',
        'users'
    ])
    .config(function ($stateProvider) {
        $stateProvider
            .state('recipejs', {
                url: '',
                abstract: true
            });
    })
    /*
    .controller('RecipeJSCtrl', [function () {
        var recipeJSCtrl = this;
    }]);
    */
//    .controller('RecipeJSCtrl', [function() {
//    }]);
