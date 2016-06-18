myApp.controller('calendar-options', ['$scope',  function($scope) {
    // Dates can be passed as strings or Date objects
    $scope.calendarOptions = {
        defaultDate: new Date(),
        minDate: new Date([2015, 1, 1]),
        maxDate: new Date([2020, 12, 31]),
        dayNamesLength: 9, // How to display weekdays (1 for "L", 2 for "Lu", 3 for "Lun"; 9 will show full day names; default is 9)
        multiEventDates: true, // Set the calendar to render multiple events in the same day or only one event, default is false
        maxEventsPerDay: 1, // Set how many events should the calendar display before showing the 'More Events' message, default is 3;
        eventClick: $scope.eventClick,
        dateClick: $scope.dateClick
    };

}]);