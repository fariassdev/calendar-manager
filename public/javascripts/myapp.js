var myApp = angular.module('myApp', ['firebase','calendar-module','ngMaterial']);

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

myApp.controller('UsersIndexController', ['$scope', function($scope) {
	  // ... code omitted ...
	  // Dates can be passed as strings or Date objects 
	$scope.calendarOptions = {
		defaultDate: new Date(),
		minDate: "2015-01-01",
		maxDate: new Date([2020, 12, 31]),
		dayNamesLength: 9, // How to display weekdays (1 for "M", 2 for "Mo", 3 for "Mon"; 9 will show full day names; default is 1)
		multiEventDates: true, // Set the calendar to render multiple events in the same day or only one event, default is false
		maxEventsPerDay: 3, // Set how many events should the calendar display before showing the 'More Events' message, default is 3;
		eventClick: $scope.eventClick,
		dateClick: $scope.dateClick
	};

	//var prueba = new Date(2016,6,5,8,1,2,3);
	$scope.events = [
	  {title: 'NY', date: new Date([2015, 12, 31])},
	  {title: 'ID', date: new Date([2015, 6, 4])},
	  {title: 'Evento de ejemplo', date: new Date()},
	  {title: 'Prueba con fechas', date: [2016,06,07]}
	];
}]);