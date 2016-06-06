myApp.controller('calendar-options', ['$scope',  function($scope) {
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



    //Pruebas de array sincronizado con Firebase
    $scope.events = [
        {title: 'NY', date: new Date([2015, 12, 31])},
        {title: 'ID', date: new Date([2015, 6, 4])},
        {title: 'Evento de ejemplo', date: new Date()},
        {title: 'Prueba con fechas', date: [2016,06,07]},
        {title: 'Prueba con fechas2', date: [2016,06,07]}
    ];

    // all server changes are applied in realtime
    $scope.events = $firebaseArray(messagesRef);


}]);