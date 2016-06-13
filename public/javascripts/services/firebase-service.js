myApp.factory("dbService", ["$firebaseArray",
    function($firebaseArray) {

        var Events = $firebaseArray.$extend({
            getEvents: function() {

            }
        });

        return function() {

            return new Events();
        };

    }
]);
