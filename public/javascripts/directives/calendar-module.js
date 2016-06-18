angular.module('calendar-module', ['calendar-manager']).directive('simpleCalendar', function () {
    return {
        restrict: 'E',
        scope: {
            options: '=?',
            events: '=?'
        },
        templateUrl: 'templates/calendarTemplate.html',
        controller: ['$scope', function ($scope, firebase) {
            var ref = new Firebase("https://calendar-manager.firebaseio.com/");
            var MONTHS = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
            var WEEKDAYS = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
            var calculateSelectedDate, calculateWeeks, allowedDate, bindEvent;

            $scope.events = [];

            $scope.options = $scope.options || {};
            $scope.options.dayNamesLength = $scope.options.dayNamesLength || 1;
            $scope.options.multiEventDates = $scope.options.multiEventDates || false;
            $scope.options.maxEventsPerDay = $scope.options.maxEventsPerDay || 3;

            $scope.onClick = function ( date ) {
                if ( !date || date.disabled ) { return; }
                if (date.event.length > 0) {
                    $scope.options.eventClick( date );
                    $('#removeEventForm').modal('show');
                } else {
                    $scope.options.dateClick( date );
                    $('#addEventForm').modal('show');
                }
            };

            $scope.options.dateClick = function( date ) {
                $('#addEventForm').on('show.bs.modal', function (event) {
                    if ( $("#event-title-container").hasClass( "has-error" ) ) {
                        $("#event-title-container").removeClass("has-error");
                        $("#event-title-error-message").addClass("hidden");
                    }
                    $(".add-event-input").val("");
                    var fecha = date.year + "-" + (date.month+1) + "-" + date.day;
                    $scope.dateToAddEvent = fecha;
                    var modal = $(this);
                    fecha = new Date(date.year + "-" + (date.month+1) + "-" + date.day);
                    modal.find('.modal-title').text('Añadir evento al día: ' + WEEKDAYS[fecha.getDay()] + ", " + fecha.getDate() + ' de ' + MONTHS[fecha.getMonth()] + ' de ' + fecha.getFullYear());
                });
            };

            $scope.options.eventClick = function( date ) {
                $scope.selectedEvent = date.event[0];
                $scope.selectedEvent.hours = $scope.selectedEvent.date.getHours();
                $scope.selectedEvent.minutes = $scope.selectedEvent.date.getMinutes();
                if ( $scope.selectedEvent.color == null ) {
                    $scope.selectedEvent.color = "Por defecto";
                }
                $('#removeEventForm').on('show.bs.modal', function (event) {
                    var fecha = date.year + "-" + (date.month+1) + "-" + date.day;
                    $scope.dateToAddEvent = fecha;
                    var modal = $(this);
                    fecha = new Date(date.year + "-" + (date.month+1) + "-" + date.day);
                    modal.find('.modal-title').text('Eliminar evento del día: ' + WEEKDAYS[fecha.getDay()] + ", " + fecha.getDate() + ' de ' + MONTHS[fecha.getMonth()] + ' de ' + fecha.getFullYear());
                });
            };

            $scope.addEvent = function () {
                if ( !$("#event-title").val() ) {
                    $("#event-title-container").addClass( "has-error" );
                    $("#event-title-error-message").removeClass( "hidden" );
                } else {
                    var eventTitle = $("#event-title").val();
                    var eventHours = $("#event-hours").val();
                    var eventMinutes = $("#event-minutes").val();
                    var eventColor = $("#event-color").val();
                    console.log("Date a la que añadiré el evento: ", $scope.dateToAddEvent);
                    var newEventRef = $scope.dateToAddEvent + "_" + eventHours + ":" + eventMinutes + "_" + (Math.round(Math.random() * 100000000));
                    var dateStr = $scope.dateToAddEvent + " " + eventHours + ":" + eventMinutes;
                    if ( !$("#event-color").val() ) {
                        ref.child( newEventRef ).update({
                            title: eventTitle,
                            date: dateStr
                        });
                    } else {
                        ref.child( newEventRef ).update({
                            title: eventTitle,
                            date: dateStr,
                            color: eventColor
                        });
                    }
                    $('#addEventForm').modal('hide');
                }
            };

            $scope.removeEvent = function () {
                var eventToRemoveRef = ref.child( $scope.selectedEvent.key );
                eventToRemoveRef.remove();
                $('#removeEventForm').modal('hide');
            };

            $scope.getEventColor = function ( date ) {
                return date.event[0].color;
            };

            if ($scope.options.minDate) {
                $scope.options.minDate = new Date($scope.options.minDate);
            }

            if ($scope.options.maxDate) {
                $scope.options.maxDate = new Date($scope.options.maxDate);
            }

            bindEvent = function ( date ) {
                if ( !date || !$scope.events ) { return; }

                date.event = [];

                $scope.events.forEach( function( event ) {
                    event.date = new Date( event.date );

                    if ( date.year === event.date.getFullYear() &&
                        date.month === event.date.getMonth() &&
                        date.day === event.date.getDate()) {

                        date.event.push(event);

                    }

                });
            };

            allowedDate = function (date) {
                if (!$scope.options.minDate && !$scope.options.maxDate) {
                    return true;
                }
                var currDate = new Date([date.year, date.month + 1, date.day]);
                if ($scope.options.minDate && (currDate < $scope.options.minDate)) { return false; }
                if ($scope.options.maxDate && (currDate > $scope.options.maxDate)) { return false; }
                return true;
            };

            $scope.allowedPrevMonth = function () {
                var prevYear = null;
                var prevMonth = null;
                if (!$scope.options.minDate) { return true; }
                var currMonth = MONTHS.indexOf($scope.selectedMonth);
                if (currMonth === 0) {
                    prevYear = ($scope.selectedYear - 1);
                } else {
                    prevYear = $scope.selectedYear;
                }
                if (currMonth === 0) {
                    prevMonth = 11;
                } else {
                    prevMonth = (currMonth - 1);
                }
                if (prevYear < $scope.options.minDate.getFullYear()) { return false; }
                if (prevYear === $scope.options.minDate.getFullYear()) {
                    if (prevMonth < $scope.options.minDate.getMonth()) { return false; }
                }
                return true;
            };

            $scope.allowedNextMonth = function () {
                var nextYear = null;
                var nextMonth = null;
                if (!$scope.options.maxDate) { return true; }
                var currMonth = MONTHS.indexOf($scope.selectedMonth);
                if (currMonth === 11) {
                    nextYear = ($scope.selectedYear + 1);
                } else {
                    nextYear = $scope.selectedYear;
                }
                if (currMonth === 11) {
                    nextMonth = 0;
                } else {
                    nextMonth = (currMonth + 1);
                }
                if (nextYear > $scope.options.maxDate.getFullYear()) { return false; }
                if (nextYear === $scope.options.maxDate.getFullYear()) {
                    if (nextMonth > $scope.options.maxDate.getMonth()) { return false; }
                }
                return true;
            };

            calculateWeeks = function () {
                $scope.weeks = [];
                var week = null;
                var daysInCurrentMonth = new Date($scope.selectedYear, MONTHS.indexOf($scope.selectedMonth) + 1, 0).getDate();
                for (var day = 1; day < daysInCurrentMonth + 1; day += 1) {
                    var dayNumber = new Date($scope.selectedYear, MONTHS.indexOf($scope.selectedMonth), day).getDay();
                    week = week || [null, null, null, null, null, null, null];
                    week[dayNumber] = {
                        year: $scope.selectedYear,
                        month: MONTHS.indexOf($scope.selectedMonth),
                        day: day
                    };

                    if (allowedDate(week[dayNumber])) {
                        if ( $scope.events ) {
                            bindEvent( week[ dayNumber ] );
                        }
                    } else {
                        week[dayNumber].disabled = true;
                    }

                    if (dayNumber === 6 || day === daysInCurrentMonth) {
                        $scope.weeks.push(week);
                        week = undefined;
                    }
                }

                if ($scope.weeks.length == 6) {
                    var arrayWeeks = document.getElementsByClassName("week");
                    for (i=0;i<arrayWeeks.length;i++) {
                        angular.element(arrayWeeks[i]).addClass("six-rows");
                    }
                } else {
                    var arrayWeeks = document.getElementsByClassName("week");
                    for (i=0;i<arrayWeeks.length;i++) {
                        angular.element(arrayWeeks[i]).removeClass("six-rows");
                    }
                }

            };

            calculateSelectedDate = function () {
                if ($scope.options.defaultDate) {
                    $scope.options._defaultDate = new Date($scope.options.defaultDate);
                } else {
                    $scope.options._defaultDate = new Date();
                }

                $scope.selectedYear  = $scope.options._defaultDate.getFullYear();
                $scope.selectedMonth = MONTHS[$scope.options._defaultDate.getMonth()];
                $scope.selectedDay   = $scope.options._defaultDate.getDate();
                calculateWeeks();
            };

            $scope.weekDays = function (size) {
                return WEEKDAYS.map(function(name) { return name.slice(0, size) });
            };

            $scope.isDefaultDate = function (date) {
                if (!date) { return; }
                return date.year === $scope.options._defaultDate.getFullYear() &&
                    date.month === $scope.options._defaultDate.getMonth() &&
                    date.day === $scope.options._defaultDate.getDate()
            };

            $scope.prevMonth = function () {
                if (!$scope.allowedPrevMonth()) { return; }
                var currIndex = MONTHS.indexOf($scope.selectedMonth);
                if (currIndex === 0) {
                    $scope.selectedYear -= 1;
                    $scope.selectedMonth = MONTHS[11];
                } else {
                    $scope.selectedMonth = MONTHS[currIndex - 1];
                }
                calculateWeeks();
            };

            $scope.nextMonth = function () {
                if (!$scope.allowedNextMonth()) { return; }
                var currIndex = MONTHS.indexOf($scope.selectedMonth);
                if (currIndex === 11) {
                    $scope.selectedYear += 1;
                    $scope.selectedMonth = MONTHS[0];
                } else {
                    $scope.selectedMonth = MONTHS[currIndex + 1];
                }
                calculateWeeks();
            };

            $scope.$watch( 'options.defaultDate', function() {

                calculateSelectedDate();

            });

            $scope.$watch( 'events', function() {

                calculateWeeks();

            });

            // Retrieve new posts as they are added to our database
            ref.on("child_added", function(snapshot, prevChildKey) {
                var newEvent = snapshot.val();
                newEvent.key = snapshot.key();
                $scope.events.push(newEvent);
                calculateWeeks();
                $scope.$applyAsync();
            });

            // Get the data on a post that has been removed
            ref.on("child_removed", function(snapshot) {
                var deletedEvent = snapshot.val();
                var deletedEventDate = new Date(deletedEvent.date).getTime();
                angular.forEach( $scope.events, function( value, key ) {
                    if ( ( $scope.events[key].title === deletedEvent.title ) && ( $scope.events[key].date.getTime() === deletedEventDate ) ) {
                        $scope.events.splice(key, 1);
                        calculateWeeks();
                        $scope.$applyAsync();
                    }
                });
            });

        }]
    }
});