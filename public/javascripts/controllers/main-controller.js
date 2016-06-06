myApp.controller('mainController', function($scope, $firebase , $firebaseArray) {
    // connect to firebase
    var ref = new Firebase("https://calendar-manager.firebaseio.com/");
    /*ref.push().set({
     title: "Evento1",
     user: "Fernando",
     initDay: "11-01-2015"
     });
     ref.push().set({
     title: "Evento2",
     user: "Andrés",
     initDay: "11-01-2015"
     });*/
    //var fb = $firebase(ref);

    // sync as object
    //var syncObject = fb.$asObject();

    // three way data binding
    //syncObject.$bindTo($scope, 'test');

    //create sinchronized array
    /*$scope.events = $firebaseArray(ref);
     $scope.events.$add({
     title: "Evento de prueba",
     date: {
     year: 2016,
     month: 02,
     day: 03
     }
     });*/


    //$scope.jsVariable = "El controlador está funcionando";
});