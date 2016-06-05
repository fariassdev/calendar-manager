angular.module('calendar-module', []).directive('simpleCalendar', function () {
  return {
    restrict: 'E',
    scope: {
      options: '=?',
      events: '=?'
    },
    templateUrl: 'templates/calendarTemplate.html',
    controller: ['$scope', function ($scope) {
      var MONTHS = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
      var WEEKDAYS = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
      var calculateSelectedDate, calculateWeeks, allowedDate, bindEvent;

      $scope.options = $scope.options || {};
      $scope.options.dayNamesLength = $scope.options.dayNamesLength || 1;
      $scope.options.multiEventDates = $scope.options.multiEventDates || false;
	    $scope.options.maxEventsPerDay = $scope.options.maxEventsPerDay || 3;

      $scope.onClick = function (date) {
        if (!date || date.disabled) { return; }
        if (date.event[0] != null) {
          $scope.options.eventClick(date);
        } else {
          $scope.options.dateClick(date);
        }
      };

      $scope.options.dateClick = function(date) {
        console.log("He pulsado en una fecha SIN EVENTO");
      };

      $scope.options.eventClick = function(date) {
        console.log("He pulsado en una fecha CON EVENTO");
        console.log(date.event[0].title); //Título
        console.log(date.event[0].date); //Fecha (puedo acceder a los métodos de Date de JS)
      };

      /* TEST CUSTOM DIALOG WHEN CLICK DATE WITHOUT EVENT */
      /*$scope.showAdvanced = function(ev) {
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;

        $mdDialog.show({
          controller: DialogController,
          templateUrl: 'templates/calendarTemplate.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true,
          fullscreen: useFullScreen
        })
        .then(function(answer) {
          $scope.status = 'You said the information was "' + answer + '".';
        }, function() {
          $scope.status = 'You cancelled the dialog.';
      });*/
      /* TEST CUSTOM DIALOG WHEN CLICK DATE WITHOUT EVENT */

      if ($scope.options.minDate) {
        $scope.options.minDate = new Date($scope.options.minDate);
      }

      if ($scope.options.maxDate) {
        $scope.options.maxDate = new Date($scope.options.maxDate);
      }

      bindEvent = function (date) { //Modificar para contemplar la posibilidad de ponerle Hora y Minuto
        if (!date || !$scope.events) { return; }
        date.event = [];
        $scope.events.forEach(function(event) {
          event.date = new Date(event.date);
          if (date.year === event.date.getFullYear() &&
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
            if ($scope.events) { bindEvent(week[dayNumber]); }
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

      $scope.$watch('options.defaultDate', function() {
        calculateSelectedDate();
      });

      $scope.$watch('events', function() {
        calculateWeeks();
      });

    }]
  }
});