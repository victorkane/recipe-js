angular.module('header', [
        'shared.recipes.service',
        'shared.users.service'
    ])
    .config(function ($stateProvider) {
        $stateProvider
            .state('recipejs.home', {
                url: '/',
                views: {
                    'header': {
                        controller: 'HeaderCtrl',
                        templateUrl: 'ngapp/header/header.tmpl.html'
                    },
                    'users': {
                        controller: 'UsersCtrl',
                        templateUrl: 'ngapp/users/users.tmpl.html'
                    }
                }
            });
    })
    .controller('HeaderCtrl', [function () {
        var headerCtrl = this;
    }])
    .controller('UsersCtrl', [function () {
        var usersCtrl = this;
    }]);
