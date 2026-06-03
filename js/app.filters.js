angular.module('sylphairApp.filters', [])
angular.module('sylphairApp.filters')
  .filter('objectById', function ($rootScope) {
    return function (wantedObject, option1, option2) {
      if (wantedObject) {
        var result
        switch (option1) {
          case 'countries':
            result = $rootScope.countries.filter(function (obj) {
              return obj.id === wantedObject
            })
            break
          case 'aircrafts':
            console.log(option2);
            result = $rootScope.aircrafts.filter(function (obj) {
              return obj.id === wantedObject
            })
            break
          case 'languages':
            result = $rootScope.languages.filter(function (obj) {
              return obj.id === wantedObject
            })
            break
        }
        return result.length && result[0].name ? result[0].name : 'archived';
      }
    }
  })

  .filter('aircraftById', function () {
    // option2 should be the collection of aircrafts
    return function (wantedObject, option1, option2) {
      if (wantedObject) {
        var result
        switch (option1) {
          case 'aircrafts':
            result = option2.filter(function (obj) {
              return obj.id === wantedObject
            })
            break
        }
        return result.length && result[0].name ? result[0].name : 'archived';
      }
    }
  })

  .filter('dataRanges', function () {
    return function (datesData) {
      var substractDays = function (date, days) {
        return new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate() - days,
          date.getHours(),
          date.getMinutes(),
          date.getSeconds(),
          date.getMilliseconds()
        )
      }

      var parseDates = function (dates) {
        if(dates === null) return;
        var datesArray = [];
        var initialDate = new Date(dates[0].date);
        var endDate = new Date(dates[0].date);
        var dayStreak = 1;
        var auxDate;

        for (var i = 0; i < dates.length; i++) {
          var date = new Date(dates[i].date)
          /*date.getTime() === initialDate.getTime() ||*/
          if (substractDays(date, dayStreak).getTime() === initialDate.getTime()) {
            dayStreak++
            endDate = date
          } else {
            datesArray.push({
              from: initialDate,
              to: endDate
            })
            dayStreak = 1
            initialDate = date
          }
        }
        datesArray.push({
          from: initialDate,
          to: endDate
        })
        var newDateArray = [];
        for (var key in datesArray) {
          if (key > 0) {
            if (datesArray[key].to === datesArray[key - 1].to || datesArray[key].to === auxDate) {
              auxDate = datesArray[key].to;
              datesArray[key].to = datesArray[key].from;
            }
            newDateArray.push(datesArray[key]);
          }
        }
        return newDateArray
      }
      return parseDates(datesData)
    }
  })
  .filter('yesOrNo', function () {
    return function (leBoolean) {
      return leBoolean === true || leBoolean === 'true' ? 'yes' : 'no'
    }
  })
  .filter('gender', function () {
    return function (letter) {
      if (letter === 'F') {
        letter = 'Female'
      }
      if (letter === 'M') {
        letter = 'Male'
      }
      return letter
    }
  })
  .filter('tel', function () {
    return function (tel) {
      // tel = tel.replace(/\s/g, '')
      // return phone
      if (!tel) {
        return ''
      }
      var country, city, number
      var value = tel.toString().trim().replace(/^\+/, '')
      if (value.match(/[^0-9]/)) {
        return tel
      }

      switch (value.length) {
        case 10: // +1PPP####### -> C (PPP) ###-####
          country = 1
          city = value.slice(0, 3)
          number = value.slice(3)
          break

        case 11: // +CPPP####### -> CCC (PP) ###-####
          country = '+' + value[0]
          city = value.slice(1, 4)
          number = value.slice(4)
          break

        case 12: // +CCCPP####### -> CCC (PP) ###-####
          country = '+' + value.slice(0, 2)
          city = value.slice(2, 5)
          number = value.slice(5)
          break

        default:
          return tel
      }

      if (country === 1) {
        country = ''
      }

      number = number.slice(0, 3) + '-' + number.slice(3)
      return (country + ' (' + city + ') ' + number).trim()
    }
  })
