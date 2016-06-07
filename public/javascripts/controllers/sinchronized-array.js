myApp.controller("arrayCtrl", ['$scope', '$firebaseArray', function($scope, $firebaseArray) {
  // create a synchronized array
  $scope.events = {};
  $scope.newEvent = {
    title: "",
    date: "",
    user: ""
  };
}]);