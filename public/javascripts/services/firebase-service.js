myApp.factory("dbService",function() {

    var ref = new Firebase("https://calendar-manager.firebaseio.com/data");

    return {
        addEvent: function( newCalendarEvent ) {
           /* ref.push().set({
                title: $scope.newEvent.title,
                date: $scope.newEvent.date,
                user: $scope.newEvent.user
            });*/

            console.log( newCalendarEvent );

        }
    }
})
