.controller('listController', function($scope, $firebaseArray) {
	var ref = new Firebase("https://calendar-manager.firebaseio.com/");
	var fb = $firebase(ref);
	$scope.listItems = $firebaseArray(ref);

	$scope.listItems = [
		{nombre: "evento1", hecho: "false"},
		{nombre: "evento2", hecho: "true"},
		{nombre: "evento3", hecho: "false"},
	];
});