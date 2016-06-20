myApp.controller('calendar-options', ['$scope',  function($scope) {

    $scope.calendarOptions = {
        defaultDate: new Date(),
        minDate: new Date([2015, 1, 1]),
        maxDate: new Date([2020, 12, 31]),
        dayNamesLength: 9,
        multiEventDates: true,
        maxEventsPerDay: 1,
        eventClick: $scope.eventClick,
        dateClick: $scope.dateClick
    };

}]);