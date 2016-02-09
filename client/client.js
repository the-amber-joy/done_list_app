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
        //.when('/logout', {
        //    redirectTo: 'views/login.html'
        //})
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
app.controller('MainController', ['$scope', '$location', 'userData', '$http', function($scope, $location, userData, $http){
    $scope.notSignedIn = true;
    $scope.signedIn = false;


    var logoutUser = function(){
        $http.get('/logoutUser').then(function (response) {
            console.log('logout response to client:', response);
        })};

    changeNavLinks = function(){
        if (userData.currentUser.username !== '') {
            $scope.notSignedIn = false;
            $scope.signedIn = true;
        } else {
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
            //console.log('$scope.data on client.js:', $scope.data);
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
        //console.log('MenuController /getUser response', response);
        $scope.user = response;
    });
}]);

//entered taskList is posted back to the database, each index in the array will be a new row in 'tasks' table
app.controller('TaskEntryController', ['$scope', '$http', '$location', function ($scope, $http) {
    $scope.user = {};
    $http.get('/getUser').then(function(response){
        $scope.user = response;
    });


    $scope.submitTasks = function(){
        function toObject(arr) {
            var newObj = {};
            for (var i = 0; i < arr.length; i++) {
                newObj[i] = arr[i]
            }
            return newObj;
        }

        var taskObject = toObject($scope.taskList);

        $http.post('/', taskObject).then(function(response){
            console.log('$scope.taskList is:', $scope.taskList);
            console.log('response.config.data returns this:', response.config.data);
            console.log('var taskObject looks like this:', taskObject);
        });


        //$http.post('/', JSON.stringify({stuff:{stuff: $scope.taskList}})).then(function(response){
        //    console.log('$scope.taskList is:', $scope.taskList);
        //    console.log('response.config.data returns this:', response.config.data);
        //    console.log('var taskObject looks like this:', taskObject);
        //});
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