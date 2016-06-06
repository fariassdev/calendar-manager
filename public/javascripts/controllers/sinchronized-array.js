var app = angular.module("firebaseArray", ["calendar-manager"]);
app.controller("arrayCtrl", function($scope, $firebaseArray) {
  var ref = new Firebase("https://calendar-manager.firebaseio.com/data");
  // create a synchronized array
  $scope.events = $firebaseArray(ref);

  //Función para guardar eventos
  $scope.addEvent = function() {
  	ref.push().set({
      title: $scope.newEvent.title,
      date: $scope.newEvent.date,
      user: $scope.newEvent.user
 	  });
    /* No me hace falta porque lo añade automáticamente al scope al estar bindeado con él */
    /*$scope.events.push({
      title: $scope.newEvent.title,
      date: $scope.newEvent.date,
      user: $scope.newEvent.user
    });*/
    console.log($scope.events);
  }
});