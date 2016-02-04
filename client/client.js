///////////////////////////////////////////////////////////////////////////////////
//                               ANGULAR!
///////////////////////////////////////////////////////////////////////////////////
var app = angular.module('myApp', ['ngRoute']);

///////////////////////////////////////////////////////////////////////////////////
//                               ROUTES
///////////////////////////////////////////////////////////////////////////////////
app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/login.html',
            controller: 'LoginController'
        })
        .when('/register', {
            templateUrl: 'views/register.html',
            controller: 'RegisterController'
        })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginController'
        })
        .when('/try_again', {
            templateUrl: 'views/try_again.html',
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
        })
        .otherwise({
            redirectTo: '/'
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


///////////////////////////////////////////////////////////////////////////////////
//                               CONTROLLERS
///////////////////////////////////////////////////////////////////////////////////
app.controller('MainController', ['$scope', 'userData', function($scope, userData){
    $scope.notSignedIn = true;
    $scope.signedIn = false;

    changeNavLinks = function(){
        if(userData.currentUser.username !== ''){
            $scope.notSignedIn = false;
            $scope.signedIn = true;
        }else{
            $scope.notSignedIn = true;
            $scope.signedIn = false;
        }
    };
}]);

app.controller('LoginController', ['$scope', '$http', '$location', 'userData', function ($scope, $http, $location, userData){
    $scope.data = {};

    $scope.submitData = function(){
        $http.post('/', $scope.data).then(function(response){
            userData.setUser($scope.data.username);
            console.log('$scope.data.username:', $scope.data.username);
            $location.path(response.data);
        });
    };
}]);

app.controller('RegisterController', ['$scope', '$http', function ($scope, $http) {
    //this is where I'll send new usernames/passwords to postgres
}]);


app.controller('MenuController', ['$scope', function ($scope) {
    $http.get('/getUser').then(function(response){
        console.log(response);
        $scope.user = response;
    })
}]);

app.controller('TaskEntryController', ['$scope', '$http', function ($scope, $http) {
    $scope.taskList = [];
    //this will need to be posted back to the database, each index in array will be a new row in 'tasks' table
}]);

app.controller('SelectTasksController', ['$scope', '$http', function ($scope, $http) {
    //this is where i will retrieve all tasks associtaed with currrentUser to populate checklist
}]);

app.controller('HistoryController', ['$scope', function ($scope) {
    //this is where all tasks for the past week will be retrieved and displayed
}]);



///////////////////////////////////////////////////////////////////////////////////
//                               FACTORIES
///////////////////////////////////////////////////////////////////////////////////
app.factory('userData', ['$http', '$rootScope', '$timeout', function($http, $rootScope, $timeout){

    var currentUser = {
        username: ''
    };

    var setUser = function(username){
        currentUser.username = username;
        changeNavLinks();
    };

    return {
        currentUser: currentUser,
        setUser: setUser
    };

}]);
