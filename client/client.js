var app = angular.module('myApp', ['ngRoute']);

console.log('client hit');

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/register', {
            templateUrl: 'views/register.html',
            controller: 'RegisterController'
        })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginController'
        })
        .when('/menu', {
            templateUrl: 'views/menu.html',
            controller: 'MenuController'
        })
        .when('/task_entry', {
            templateUrl: 'views/task_entry.html',
            controller: 'TaskEntryController'
        })
        .when('/select_tasks', {
            templateUrl: 'views/select_tasks.html',
            controller: 'SelectTasksController'
        })
        .when('/history', {
            templateUrl: 'views/history.html',
            controller: 'HistoryController'
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

app.controller('RegisterController', ['$scope', function ($scope) {

}]);

app.controller('LoginController', ['$scope', function ($scope) {

}]);

app.controller('MenuController', ['$scope', function ($scope) {

}]);

app.controller('SelectTasksController', ['$scope', function ($scope) {

}]);

app.controller('HistoryController', ['$scope', function ($scope) {

}])

