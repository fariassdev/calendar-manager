myApp.factory("dbService",function() {

    var ref = new Firebase("https://calendar-manager.firebaseio.com/data");

    var events;

    // Attach an asynchronous callback to read the data at our posts reference
    ref.on("value", function(snapshot) {
      console.log(snapshot.val());
      //events = snapshot.val();
      //console.log(events);
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });

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
