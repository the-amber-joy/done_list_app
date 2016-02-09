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
        .when('/logout', {
            redirectTo: 'views/login.html' //WHY IS THIS NOT REDIRECTING ON LOGOUT
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
app.controller('MainController', ['$scope', 'userData', '$http', function($scope, userData, $http){
    $scope.notSignedIn = true;
    $scope.signedIn = false;

    $scope.logout = function(){
        $http.get('/logout');
    };

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
            console.log('$scope.data on client.js:', $scope.data);
            $location.path(response.data);
        });
    };
}]);



app.controller('RegisterController', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    //this is where I send new usernames/passwords to postgres
    $scope.data = {};

    $scope.submitNewData = function(){
        $http.post('/', $scope.data).then(function(response){
            userData.setUser($scope.data.username);
            console.log('$scope.data.username is logged as:', $scope.data.username);
            $location.path(response.data);
        });
    };

}]);


app.controller('MenuController', ['$scope', '$http', function ($scope, $http) {
    $http.get('/getUser').then(function(response){
        console.log('MenuController /getUser response', response);
        $scope.user = response;
    })
}]);

//entered taskList is posted back to the database, each index in the array will be a new row in 'tasks' table
app.controller('TaskEntryController', ['$scope', '$http', '$location', 'userData', function ($scope, $http, userData) {
    $scope.user = {};
    $http.get('/getUser').then(function(response){
        console.log('TaskEntry /getUser response', response);
        $scope.user = response;
    });

    $scope.taskList = [];

    $scope.submitTasks = function(){
        $scope.sendData = {taskList: JSON.stringify($scope.taskList)};
        $http.post('/', JSON.stringify({taskList: $scope.taskList})).then(function(response){
            console.log('taskList array entered:', response.config.data);
            console.log('$scope.user.data is:', $scope.user.data);
        });
    };
}]);

app.controller('SelectTasksController', ['$scope', '$http', function ($scope, $http) {
    //this is where i will retrieve all tasks associated with currentUser to populate checklist
}]);

app.controller('HistoryController', ['$scope', function ($scope) {
    //this is where all tasks for the past week will be retrieved and displayed
}]);



///////////////////////////////////////////////////////////////////////////////////
//                               FACTORIES
///////////////////////////////////////////////////////////////////////////////////

app.factory('userData', ['$http', '$rootScope', '$timeout', function($http){

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
