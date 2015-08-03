angular.module('users', [
        'shared.users.service'
    ])
    .controller('UsersCtrl', ['UserService', function (UserService) {
        var usersCtrl = this;
        usersCtrl.tab = 'signin';
        usersCtrl.open = function (tab) {
            usersCtrl.tab = tab;
        };
        usersCtrl.emailFormat = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;
        usersCtrl.user = {};
        usersCtrl.newuser = {};
        usersCtrl.signin = function () {
            // if email and password is matched, login ok
            var theUsers = UserService.listUsers();
            //console.log(theUsers);
            if (_.findIndex(theUsers, usersCtrl.user) > -1) {
                usersCtrl.tab = 'off';
                UserService.setCurrentUser(usersCtrl.user);
                console.log('User signed in: ', usersCtrl.user)
            } else {
                usersCtrl.tab = 'signup';
                console.log('No registered user for ', usersCtrl.user)
            }
        };
        usersCtrl.signup = function () {
            var theUsers = UserService.listUsers();
            if (_.findIndex(theUsers, usersCtrl.newuser) < 0) {
                UserService.addUser(usersCtrl.newuser);
                console.log('User signed up: ', usersCtrl.newuser)
                    // reset form and model
                usersCtrl.newuser = {};
            } else {
                console.log('Registered user attempted to sign up', usersCtrl.newuser)
            }
        };
        var init = function () {
            UserService.getUsers();
        };
        init();
    }]);
