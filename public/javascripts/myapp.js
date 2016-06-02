angular.module('myApp', ['firebase'])

.controller('mainController', function($scope, $firebase) {
	// connect to firebase 
	var ref = new Firebase("https://calendar-manager.firebaseio.com/");  
	var fb = $firebase(ref);
	
	// sync as object 
	var syncObject = fb.$asObject();

	// three way data binding
	syncObject.$bindTo($scope, 'test');
	
	$scope.jsVariable = "El controlador está funcionando";
});