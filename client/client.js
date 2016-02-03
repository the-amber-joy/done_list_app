var app = angular.module('myApp', ['ngRoute']);

//console.log('client hit');

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/register', {
            templateUrl: 'views/register.html',
            controller: 'TaskEntryController'
        })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'TaskEntryController'
        })
        .when('/menu', {
            templateUrl: 'views/menu.html',
            controller: 'TaskEntryController'
        })
        .when('/taskEntry', {
            templateUrl: 'views/task_entry.html',
            controller: 'TaskEntryController'
        })
        .when('/selectTasks', {
            templateUrl: 'views/select_tasks.html',
            controller: 'TaskEntryController'
        })
        .when('/viewHistory', {
            templateUrl: 'views/history.html',
            controller: 'TaskEntryController'
        });

    //$routeProvider
    //    .when('login', {
    //        templateUrl: 'login.html',
    //        controller: 'LoginController',
    //        resolve: {
    //            //... optional?
    //        }
    //    })
    //    .otherwise({
    //        redirectTo: 'newUser' //this route/module needs to be defined
    //    });

    $locationProvider.html5Mode(true);
}]);

app.controller('TaskEntryController', ['$scope', function ($scope) {
    $scope.taskList = [];
}]);

