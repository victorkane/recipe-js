angular.module('shared.users.service', [
    
])
    .factory('UserService', ['$http', function ($http) {
        var users = [];
        var currentUser = {};
        var grabUsers = function () {
            return $http.get('/api/users')
                .then(function (res) {
                    users = res.data;
                    console.log('Grabbed users from back-end');
                    console.log('Users: ', users);
                }, function (errResponse) {
                    console.error('users query error')
                });
        };
        return {
            listUsers: function () {
                console.log('list: Users: ', users);
                return users;
            },
            addUser: function (user) {
                $http.post('/api/users', user)
                    .then(grabUsers);
            },
            getCurrentUser: function () {
                return currentUser;
            },
            setCurrentUser: function (user) {
                currentUser = user;
                console.log('currentUser signed in user is: ', currentUser)
            },
            getUsers: function () {
                return grabUsers();
            }
        };
    }]);
