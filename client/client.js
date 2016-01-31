var app = angular.module('myApp', []);

console.log('client hit');

app.controller('MainController', ['$scope', function($scope){
    $scope.message = 'Hello World';
}]);

