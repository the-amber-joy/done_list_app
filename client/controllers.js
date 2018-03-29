

///////////////////////////////////////////////////////////////////////////////////
//                               CONTROLLERS
///////////////////////////////////////////////////////////////////////////////////

app.controller('MainController', ['$scope', '$location', 'userData', '$http', function($scope, $location, userData, $http){
    $scope.notSignedIn = true;
    $scope.signedIn = false;

    $scope.logoutUser = function(){
        $http.get('/logout').success(function () {
            $location.path('login');
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
            $location.path(response.data);
        });
    };
}]);

app.controller('RegisterController', ['$scope', '$http',  '$location', 'userData', function ($scope, $http, $location, userData){
    $scope.data = {};

    $scope.thankyou = false;

    $scope.showThankyou = function(){
        $scope.thankyou = true;
    };

    $scope.submitNewData = function(){
        $http.post('/register', $scope.data).then(function(request){
        });
    };
}]);

app.controller('MenuController', ['$scope', '$http', function ($scope, $http) {
    $http.get('/getUser').then(function(response){
        $scope.user = response;
    });
}]);

//entered taskList is posted back to the database, each index in the array will be a new row in 'tasks' table
app.controller('TaskEntryController', ['$scope', '$http', '$location', function ($scope, $http, $location) {

    $scope.submitTasks = function() {
        var taskObject = {tasks: $scope.taskList};
        $http.post('/taskEntry', taskObject)
    };

    $scope.showHistory = function(){
        $http.get('/history').success(function(){
            $location.path('history');
        })
    };
}]);

//app.controller('SelectTasksController', ['$scope', '$http', function ($scope, $http) {
//    //this is where i will retrieve all tasks associated with currentUser to populate a checklist so previous/repeating tasks can be selected again
//}]);

app.controller('HistoryController', ['$http', '$scope', function ($http, $scope) {
    $scope.tasks = [];
    $http.get('/history').then(function(response){
        $scope.tasks = response.data;
    });
}]);

app.controller('AncientHistoryController', ['$http', '$scope', function ($http, $scope) {
    $scope.oldTasks = [];
    $scope.getOldDates = function(){
        console.log("Date Range Selected:", $scope.startDate, " to ", $scope.endDate);
        $http.post('/ancient_history', {startDate: $scope.startDate, endDate: $scope.endDate}).then(function (response) {
            $scope.oldTasks = response.data;
        });
    };
}]);