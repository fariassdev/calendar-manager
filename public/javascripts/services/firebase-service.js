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

    var addEvent = {
        titler: "",
        dater: "",
        userr: "",
        addEvent: function(titler,dater,userr){
            ref.push().set({
                title: titler,
                date: dater,
                user: userr
            });
        }
    }
    return addEvent;
    /*
    return {
        addEvent: function( titler, dater, userr ) {
            ref.push().set({
                title: titler,
                date: dater,
                user: userr
            });

            console.log( newCalendarEvent );

        }
    }*/
})
