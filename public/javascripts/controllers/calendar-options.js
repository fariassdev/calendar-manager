myApp.controller('calendar-options', ['$scope',  function($scope) {
    // Dates can be passed as strings or Date objects
    $scope.calendarOptions = {
        defaultDate: new Date(),
        minDate: "2015-01-01",
        maxDate: new Date([2020, 12, 31]),
        dayNamesLength: 9, // How to display weekdays (1 for "M", 2 for "Mo", 3 for "Mon"; 9 will show full day names; default is 1)
        multiEventDates: true, // Set the calendar to render multiple events in the same day or only one event, default is false
        maxEventsPerDay: 1, // Set how many events should the calendar display before showing the 'More Events' message, default is 3;
        eventClick: $scope.eventClick,
        dateClick: $scope.dateClick
    };

}]);