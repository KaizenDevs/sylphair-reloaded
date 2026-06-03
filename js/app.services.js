angular.module('sylphairApp.services', [])

  .factory('dataShare', function (localStorageService) {
    return {
      set: function (data) {
        localStorageService.set('temp_data', data)
      },
      get: function () {
        return localStorageService.get('temp_data')
      }
    }
  })

  .factory('NewDate', function () {
    var p = {}
    p.convertUTCDateToLocalDate = function (date) {
      var newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000)
      var offset = date.getTimezoneOffset() / 60
      var hours = date.getHours()
      newDate.setHours(hours - offset)
      return newDate
    }
    p.set = function (date) {
      if (date.length > 10) {
        date = date.split('T')[0]
      }
      return new Date(moment(date))
    }
    return p
  })

  .factory('Utils', function ($ionicPopup) {
    var Utils = {}
    Utils.logError = function (error) {throw error}
    Utils.showError = function (error) {
        if (error && error['data'] && error['data']['errors']) {
          var errors = error['data']['errors']
          var errorsResult = []

          angular.forEach(errors, function (value) {
            this.push(value + '\n')
          }, errorsResult)

          return $ionicPopup.alert({
            title: 'Error',
            template: errorsResult
          })

          Raven.captureMessage(errorsResult);
        }
      }

      Utils.addDate = function(messages) {
        return angular.forEach(messages, function (value) {
          var date = moment(value.created_at).fromNow();
          var daysAgo = date.split(' ');
          if (parseInt(daysAgo[0], 10) >= 7 && daysAgo[1] === 'days' || daysAgo[1] === 'months' ||
            daysAgo[1] === 'years' || daysAgo[1] === 'month' ||
            daysAgo[1] === 'year') {
            value.date = moment(value.created_at).format('lll');
          } else {
            value.date = moment(value.created_at).fromNow();
          }
        })
      }

      Utils.compare = function(obj1, obj2, value) {
        return obj1[value] === obj2[value]
      }

      Utils.removeDuplicates = function (myArr, prop) {
        var newArr = new Array;
        for (var key in myArr) {
          if (key != 0) {
            if (!Utils.compare(myArr[key], myArr[key -1], prop)) {
              newArr.push(myArr[key])
            }
          }
        }

        return newArr;
    }

     Utils.sortByKey = function(array, key) {
        if (!array) {return []}
        array.sort(function(a, b) {
          var x = a[key]; var y = b[key];
          return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });

        return Utils.removeDuplicates(array, 'id')
    }

    return Utils
  })

  .factory('allAircrafts', function ($http, CONFIG, lodash) {
    return {

      get: function () {
        return new Promise( function(resolve, reject) {
          console.log('allAircrafts factory called');
          $http.get(CONFIG.COMPLETE_API_URL + '/aircrafts',{ cache: false })
            .then(function (res) {
              var data = lodash.orderBy(res.data, ['name'], ['asc']);
              resolve(data);
            });
        });
        // $rootScope.$emit('simpleStorageUpdated', simpleStorage.getter(profileKey))
      }
    }
  })
  .factory('dataSelects', function ($http, CONFIG) {
    var p = {}

    p.getjson = function (JSONPath) {
      return $http.get(JSONPath, {
        cache: true
      })
    }

    p.get = function (collection) {
      var response

      switch (collection) {
        case 'profiles':
          response = p.getjson('json/profiles.json')
          break
        case 'countries':
          response = p.getjson('json/countries.json')
          break
        case 'pilot_positions':
          response = p.getjson('json/pilot/position.json')
          break
        case 'pilot_licenses_issuance_authorities':
          response = p.getjson('json/pilot/licenses_issuance_authorities.json')
          break
        case 'pilot_english_proficiency_level':
          response = p.getjson('json/pilot/english_proficiency_level.json')
          break
        case 'pilot_type_of_licenses_attributes':
          response = p.getjson('json/pilot/type_of_licenses.json')
          break
        case 'pilot_medical_issuance_authorities':
          response = p.getjson('json/pilot/medical_issuance_authorities.json')
          break
        case 'pilot_medical_type':
          response = p.getjson('json/pilot/medical_type.json')
          break
        case 'contract_types':
          response = p.getjson('json/pilot/contract_types.json')
          break
        case 'aircrafts':
          response = $http.get(
            CONFIG.COMPLETE_API_URL + '/aircrafts',
            { cache: false }
          )
          break
        case 'aircrafts__with_cache':
          // response = p.getjson('json/aircrafts.json')
          response = p.getjson(CONFIG.COMPLETE_API_URL + '/aircrafts')
          break
        case 'aircrafts_no_cache':
          response = $http.get(
            CONFIG.COMPLETE_API_URL + '/aircrafts',
            { cache: false }
          )
          break
        case 'languages':
          response = p.getjson('json/language_lists.json')
          break
        case 'language_levels':
          response = p.getjson('json/language_levels.json')
          break
        case 'gender':
          response = p.getjson('json/gender.json')
          break
        case 'gender_with_any':
          response = p.getjson('json/gender_with_any.json')
          break
        case 'mechanic_issuance_authorities':
          response = p.getjson('json/mechanic/issuance_authorities.json')
          break
        case 'mechanic_position':
          response = p.getjson('json/mechanic/position.json')
          break
        case 'flight_attendant_position':
          response = p.getjson('json/flight-attendant/position.json')
          break
      }
      return response
    }

    return p
  })
  .factory('traitInitializer', function () {
    return {
      get: function (trait) {
        var traitResponse
        switch (trait) {
          case 'user':
            traitResponse = {
              'name': '',
              'last_name': '',
              'password': '',
              'email': '',
              'role': '',
              'confirm_password': ''
            }
            break
          case 'pilot_allowance':
            traitResponse = {
              allowance: {
                description: '',
                education: false,
                housing: false,
                other: false,
                transportation: false
              }
            }
            break
          case 'pilot':
            traitResponse = {
              profile: [{
                user_id: '',
                nationality_id: '',
                country_code_id: '',
                position: '',
                date_of_birth: null,
                phone: '',
                skype: '',
                gender: '',
                cv_url: '',
                home_airport_country_id: '',
                home_airport: ''
              }],
              language_proficiencies_attributes: [{
                language_id: '',
                level_text: ''
              }],
              licenses_attributes: [{
                type_of: '',
                issuance_authority: '',
                issuance_country_id: '',
                number: '',
                english_proficiency_level: '',
                date_of_issue: null
              }],
              medical_attributes: [{
                valid_until: null,
                type_of: '',
                issuance_country_id: '',
                issuance_authority: ''
              }],
              flight_metrics: [{
                jet_hours: '',
                pic_hours: '',
                sic_hours: '',
                night_hours: '',
                flight_hours: '',
                instrument_hours: '',
                turbo_prop_hours: '',
                multi_engine_hours: '',
                single_engine_hours: ''
              }],
              special_operations_metrics: [{
                police_hours: '',
                bush_flying_hours: '',
                sightseeing_hours: '',
                banner_towing_hours: '',
                fire_fighting_hours: '',
                pipeline_patrol_hours: '',
                aerial_application_hours: '',
                additional_information: ''
              }],
              type_ratings_attributes: [{
                aircraft_id: '',
                last_flown_on: null,
                time_in_aircraft: '',
                pic_hours: '',
                sic_hours: '',
                current_till: null,
                part_135: false
              }],
              international_experiences: [{
                asia: false,
                india: false,
                africa: false,
                europe: false,
                australia: false,
                caribbean: false,
                middle_east: false,
                north_america: false,
                south_america: false,
                eastern_europe: false,
                central_america: false,
                oceanic_crossings: false,
                pacific_crossings: false,
                int_additional_info: ''
              }],
              passports_attributes: [{
                country_id: '',
                country_of_issue_id: '',
                issued_on: null,
                expires_on: null
              }],
              visas_attributes: [],
              availability: [{
                other: false,
                voluntary: false,
                freelancer: false,
                ferry_flights: false,
                price_per_day: '',
                seeking_employment: false,
                availability_additional_info: ''
              }],
              unavailable_days_attributes: []
            }
            break
            // end pilot case
          case 'mechanic':
            traitResponse = {
              profile: [{
                user_id: '',
                nationality_id: '',
                country_code_id: '',
                position: '',
                date_of_birth: null,
                phone: '',
                skype: '',
                gender: '',
                home_airport_country_id: '',
                home_airport: '',
                cv_url: ''
              }],
              language_proficiencies_attributes: [{
                language_id: 12,
                level: 4
              }],
              crew_member_positions_attributes: [{
                crew_member_id: '',
                position: ''
              }],
              passports_attributes: [{
                country_id: '',
                country_of_issue_id: '',
                issued_on: null,
                expires_on: null
              }],
              visas_attributes: [{
                country_id: '',
                issued_on: null,
                expires_on: null,
                additional_information: ''
              }],
              availability: [{
                full_time: '',
                part_time: '',
                freelancer: '',
                other: '',
                availability_additional_info: ''
              }],
              professional_experience: [{
                issuance_country_id: '',
                training_certification: '',
                issuance_authority: '',
                about_me: ''
              }],
              aircraft_experiences_attributes: [{
                aircraft_id: ''
              }],
              international_experiences: [{
                asia: false,
                india: false,
                africa: false,
                europe: false,
                australia: false,
                caribbean: false,
                middle_east: false,
                north_america: false,
                south_america: false,
                eastern_europe: false,
                central_america: false,
                oceanic_crossings: false,
                pacific_crossings: false,
                int_additional_info: ''
              }]
            }
            break
            // end mechanic case
          case 'flight_attendant':
            traitResponse = {
              profile: [{
                user_id: '',
                nationality_id: '',
                country_code_id: '',
                position: '',
                date_of_birth: null,
                phone: '',
                height: '',
                skype: '',
                gender: '',
                home_airport_country_id: '',
                home_airport: '',
                cv_url: ''
              }],
              language_proficiencies_attributes: [{
                language_id: '',
                level: ''
              }],
              passports_attributes: [{
                country_id: '',
                country_of_issue_id: '',
                issued_on: null,
                expires_on: null
              }],
              visas_attributes: [{
                country_id: '',
                issued_on: null,
                expires_on: null,
                additional_information: ''
              }],
              availability: [{
                full_time: '',
                part_time: '',
                freelancer: '',
                other: '',
                availability_additional_info: ''
              }],
              professional_experience: [{
                issuance_country_id: '',
                training_certification: '',
                issuance_authority: '',
                food_preparation: false
              }],
              aircraft_experiences_attributes: [{
                aircraft_id: ''
              }],
              international_experiences: [{
                asia: false,
                india: false,
                africa: false,
                europe: false,
                australia: false,
                caribbean: false,
                middle_east: false,
                north_america: false,
                south_america: false,
                eastern_europe: false,
                central_america: false,
                oceanic_crossings: false,
                pacific_crossings: false,
                int_additional_info: ''
              }]
            }
            break
            // end flight attendant case
          case 'pilot_job_seach':
            traitResponse = {
              aicraft: '',
              position: '',
              contract_type: ''
            }
            break
          case 'aom_pilot_search':
            traitResponse = {
              aircraft_id: '',
              position: '',
              time_on_type: '',
              country_id: ''
            }
            break
          case 'aircraft_experiences_attributes':
            traitResponse = {
              aircraft_id: ''
            }
            break
          case 'licenses_attributes':
            traitResponse = {
              type_of: '',
              issuance_authority: '',
              issuance_country_id: '',
              number: '',
              english_proficiency_level: '',
              date_of_issue: null
            }
            break
          case 'language_proficiencies_attributes':
            traitResponse = {
              language_id: '',
              level: ''
            }
            break
          case 'crew_member_positions_attributes':
            traitResponse = {
              crew_member_id: '',
              position: ''
            }
            break
          case 'medical_attributes':
            traitResponse = {
              valid_until: null,
              type_of: '',
              issuance_country_id: '',
              issuance_authority: ''
            }
            break
          case 'availability':
            traitResponse = {
              other: false,
              voluntary: false,
              freelancer: false,
              ferry_flights: false,
              price_per_day: '',
              seeking_employment: false,
              availability_additional_info: ''
            }
            break
          case 'type_ratings_attributes':
            traitResponse = {
              aircraft_id: '',
              last_flown_on: null,
              time_in_aircraft: '',
              pic_hours: '',
              sic_hours: '',
              current_till: null,
              part_135: false
            }
            break
          case 'international_experience':
            traitResponse = {
              asia: false,
              india: false,
              africa: false,
              europe: false,
              australia: false,
              caribbean: false,
              middle_east: false,
              north_america: false,
              south_america: false,
              eastern_europe: false,
              central_america: false,
              oceanic_crossings: false,
              pacific_crossings: false,
              int_additional_info: ''
            }
            break
          case 'passports_attributes':
            traitResponse = {
              country_id: '',
              country_of_issue_id: '',
              issued_on: null,
              expires_on: null
            }
            break
          case 'visas_attributes':
            traitResponse = {
              country_id: '',
              issued_on: null,
              expires_on: null,
              additional_information: ''
            }
            break
          case 'unavailable_days_attributes':
            traitResponse = {
              date_date: null
            }
            break
            // default:
            //   throw 'error: no trait, check traitInitializer cases factory in app.services.js'
        }
        return traitResponse
      }
    }
  })
  .factory('simpleStorage', function (
    localStorageService, $rootScope, traitInitializer, NewDate
  ) {
    var s = {}

    s.setter = function (key, val) {
      return localStorageService.set(key, val)
    }

    s.getter = function (key) {
      if (localStorageService.get(key) === null) {
        switch (key) {
          case 'createPilot':
            localStorageService.set(key, traitInitializer.get('pilot'))
            break
          case 'createMechanic':
            localStorageService.set(key, traitInitializer.get('mechanic'))
            break
          case 'createFlightAttendant':
            localStorageService.set(key, traitInitializer.get('flight_attendant'))
            break
          default:
            localStorageService.set(key, '')
        }
        return localStorageService.get(key)
      } else {
        var obj = localStorageService.get(key)
        var createKey = key.indexOf('create') !== -1

        // 4 level loops
        if (createKey) {
          for (var keyL2 in obj) {
            for (var keyL3 in obj[keyL2]) {
              for (var keyL4 in obj[keyL2][keyL3]) {
                if (obj[keyL2][keyL3][keyL4] !== '' && obj[keyL2][keyL3][keyL4] !== null) {
                  switch (keyL4) {
                    case 'date_of_birth':
                      obj[keyL2][keyL3][keyL4] = new Date(obj[keyL2][keyL3][keyL4]);
                      break
                    case 'date_of_issue':
                      obj[keyL2][keyL3][keyL4] = new Date(obj[keyL2][keyL3][keyL4]);
                      break
                    case 'valid_until':
                      obj[keyL2][keyL3][keyL4] = new Date(obj[keyL2][keyL3][keyL4]);
                      break
                    case 'last_flown_on':
                      obj[keyL2][keyL3][keyL4] = new Date(obj[keyL2][keyL3][keyL4]);
                      break
                    case 'current_till':
                      obj[keyL2][keyL3][keyL4] = new Date(obj[keyL2][keyL3][keyL4]);
                      break
                    case 'issued_on':
                      obj[keyL2][keyL3][keyL4] = new Date(obj[keyL2][keyL3][keyL4]);
                      break
                    case 'expires_on':
                      obj[keyL2][keyL3][keyL4] = new Date(obj[keyL2][keyL3][keyL4]);
                      break
                  }
                }
              }
            }
          }
        } else {
          for (keyL2 in obj) {
            for (keyL3 in obj[keyL2]) {
              for (keyL4 in obj[keyL2][keyL3]) {
                if (obj[keyL2][keyL3][keyL4] !== '' && obj[keyL2][keyL3][keyL4] !== null) {
                  switch (keyL4) {
                    case 'date_of_birth':
                      obj[keyL2][keyL3][keyL4] = NewDate.set(obj[keyL2][keyL3][keyL4]);
                      break
                    case 'date_of_issue':
                      obj[keyL2][keyL3][keyL4] = NewDate.set(obj[keyL2][keyL3][keyL4]);
                      break
                    case 'valid_until':
                      obj[keyL2][keyL3][keyL4] = NewDate.set(obj[keyL2][keyL3][keyL4]);
                      break
                    case 'last_flown_on':
                      obj[keyL2][keyL3][keyL4] = NewDate.set(obj[keyL2][keyL3][keyL4]);
                      break
                    case 'current_till':
                      obj[keyL2][keyL3][keyL4] = NewDate.set(obj[keyL2][keyL3][keyL4]);
                      break
                    case 'issued_on':
                      obj[keyL2][keyL3][keyL4] = NewDate.set(obj[keyL2][keyL3][keyL4]);
                      break
                    case 'expires_on':
                      obj[keyL2][keyL3][keyL4] = NewDate.set(obj[keyL2][keyL3][keyL4]);
                      break
                  }
                }
              }
            }
          }
        }
        return obj
      }
    }
    return s
  })

  .factory('simpleSave', function (simpleStorage, $rootScope) {
    return {
      // simpleSave.save('createPilot.profile.0.position_text', createPilot.profile[0].position_text)
      save: function (currentValue, newValue) {
        var parts = currentValue.split('.')
        var profileKey = parts[0]
        var nestedKey = parts[1]
        var nestedKeyIndex = parts[2]
        var insideNestedKeyValue = parts[3]
        var temp = simpleStorage.getter(profileKey)
        temp[nestedKey][nestedKeyIndex][insideNestedKeyValue] = newValue

        simpleStorage.setter(profileKey, temp)
        $rootScope.$emit('simpleStorageUpdated', simpleStorage.getter(profileKey))
      }
    }
  })

  .factory('nestedObjectHandler', function (
    simpleStorage, traitInitializer, $rootScope, $ionicScrollDelegate, $timeout, $ionicPopup, $translate
  ) {
    return {
      remove: function (index, profileKey, nestedForm) {
        var confirmPopup = $ionicPopup.confirm({
          title: $translate.instant('confirmation_modal_title_msg'),
          template: $translate.instant('confirmation_modal_msg'),
          okText: $translate.instant('modal_ok_btn'),
          cancelText: $translate.instant('cancel_label')
        })

        confirmPopup.then(function (res) {
          if (res) {
            var obj = simpleStorage.getter(profileKey)
            if (index > -1) {
              obj[nestedForm][index]._destroy='1';
              if(!obj[nestedForm][index].id){
                obj[nestedForm].splice(index, 1);
              }
            }
            simpleStorage.setter(profileKey, obj)
            $timeout(function () {
              $ionicScrollDelegate.resize()
            }, 50)
            $rootScope.$emit('simpleStorageUpdated', simpleStorage.getter(profileKey))
          }
        })
      },
      add: function (profileKey, objectKey) {
        var tempObject = simpleStorage.getter(profileKey)
        tempObject[objectKey].push(traitInitializer.get(objectKey))
        simpleStorage.setter(profileKey, tempObject)
        $rootScope.$emit('simpleStorageUpdated', simpleStorage.getter(profileKey))
        $timeout(function () {
          $ionicScrollDelegate.resize()
        }, 50)
      }
    }
  })

  .factory('sendProfileObject', function (localStorageService, NewDate) {
    return {
      cleanKey: function (key) {
        var obj = localStorageService.get(key)
        for (var keyL2 in obj) {
          for (var keyL3 in obj[keyL2]) {
            for (var keyL4 in obj[keyL2][keyL3]) {
              var cleanKey = keyL4.split('_').slice(0, -1).join('_')
              obj[keyL2][keyL3][cleanKey] = obj[keyL2][keyL3][keyL4]
              delete obj[keyL2][keyL3][keyL4]
            }
          }
        }
        return obj
      },
      cleanArrays: function (obj) {
        for (var keyL2 in obj) {
          switch (keyL2) {
            case 'profile':
              obj[keyL2] = obj[keyL2][0]
              break
            case 'international_experiences':
              obj[keyL2] = obj[keyL2][0]
              break
            case 'availability':
              obj[keyL2] = obj[keyL2][0]
              break
            case 'flight_metrics':
              obj[keyL2] = obj[keyL2][0]
              break
            case 'special_operations_metrics':
              obj[keyL2] = obj[keyL2][0]
              break
            case 'professional_experience':
              obj[keyL2] = obj[keyL2][0]
              break
          }
        }
        return obj
      },
      addArrays: function (obj) {
        for (var keyL2 in obj) {
          switch (keyL2) {
            case 'profile':
              obj[keyL2] = [obj[keyL2]]
              for (var keyL3 in obj[keyL2]) {
                for (var keyL4 in obj[keyL2][keyL3]) {
                  if (obj[keyL2][keyL3][keyL4] !== '' && obj[keyL2][keyL3][keyL4] !== null) {
                    switch (keyL4) {
                      case 'date_of_birth':
                        obj[keyL2][keyL3][keyL4] = NewDate.set(obj[keyL2][keyL3][keyL4]);
                        break
                      case 'date_of_issue':
                        obj[keyL2][keyL3][keyL4] = NewDate.set(obj[keyL2][keyL3][keyL4]);
                        break
                      case 'valid_until':
                        obj[keyL2][keyL3][keyL4] = NewDate.set(obj[keyL2][keyL3][keyL4]);
                        break
                      case 'last_flown_on':
                        obj[keyL2][keyL3][keyL4] = NewDate.set(obj[keyL2][keyL3][keyL4]);
                        break
                      case 'current_till':
                        obj[keyL2][keyL3][keyL4] = NewDate.set(obj[keyL2][keyL3][keyL4]);
                        break
                      case 'issued_on':
                        obj[keyL2][keyL3][keyL4] = NewDate.set(obj[keyL2][keyL3][keyL4]);
                        break
                      case 'expires_on':
                        obj[keyL2][keyL3][keyL4] = NewDate.set(obj[keyL2][keyL3][keyL4]);
                        break
                      case 'phone':
                        obj[keyL2][keyL3][keyL4] = parseInt(obj[keyL2][keyL3][keyL4], 10);
                        break
                    }
                  }
                }
              }
              break
            case 'language':
              obj[keyL2] = [obj[keyL2]]
              break
            case 'professional_experience':
              obj[keyL2] = [obj[keyL2]]
              break
            case 'international_experiences':
              obj[keyL2] = [obj[keyL2]]
              for (keyL3 in obj[keyL2]) {
                for (keyL4 in obj[keyL2][keyL3]) {
                  if (obj[keyL2][keyL3][keyL4] !== '' &&
                    obj[keyL2][keyL3][keyL4] !== null &&
                    keyL4 !== 'int_additional_info') {
                    obj[keyL2][keyL3][keyL4] = JSON.parse(obj[keyL2][keyL3][keyL4])
                  }
                }
              }
              break

            case 'licenses_attributes':
              obj[keyL2] = obj[keyL2]
              for (keyL3 in obj[keyL2]) {
                for (keyL4 in obj[keyL2][keyL3]) {
                  if (obj[keyL2][keyL3][keyL4] !== '' && obj[keyL2][keyL3][keyL4] !== null) {
                    switch (keyL4) {
                      case 'date_of_issue':
                        obj[keyL2][keyL3][keyL4] = NewDate.set(obj[keyL2][keyL3][keyL4]);
                        break
                        //  case 'number': obj[keyL2][keyL3][keyL4] = parseInt(obj[keyL2][keyL3][keyL4]);  break;
                    }
                  }
                }
              }
              break

            case 'medical_attributes':
              obj[keyL2] = obj[keyL2]
              for (keyL3 in obj[keyL2]) {
                for (keyL4 in obj[keyL2][keyL3]) {
                  if (obj[keyL2][keyL3][keyL4] !== '' && obj[keyL2][keyL3][keyL4] !== null) {
                    switch (keyL4) {
                      case 'valid_until':
                        obj[keyL2][keyL3][keyL4] = NewDate.set(obj[keyL2][keyL3][keyL4]);
                        break
                        //  case 'number': obj[keyL2][keyL3][keyL4] = parseInt(obj[keyL2][keyL3][keyL4]);  break;
                    }
                  }
                }
              }
              break

            case 'flight_metrics':
              obj[keyL2] = [obj[keyL2]]
              for (keyL3 in obj[keyL2]) {
                for (keyL4 in obj[keyL2][keyL3]) {
                  if (obj[keyL2][keyL3][keyL4] !== '' && obj[keyL2][keyL3][keyL4] !== null) {
                    obj[keyL2][keyL3][keyL4] = parseInt(obj[keyL2][keyL3][keyL4], 10)
                  }
                }
              }
              break

            case 'special_operations_metrics':
              obj[keyL2] = [obj[keyL2]]
              for (keyL3 in obj[keyL2]) {
                for (keyL4 in obj[keyL2][keyL3]) {
                  if (obj[keyL2][keyL3][keyL4] !== '' &&
                    obj[keyL2][keyL3][keyL4] !== null &&
                    keyL4 !== 'additional_information') {
                    obj[keyL2][keyL3][keyL4] = parseInt(obj[keyL2][keyL3][keyL4], 10)
                  }
                }
              }
              break
            case 'visas_attributes':
              obj[keyL2] = obj[keyL2]
              for (keyL3 in obj[keyL2]) {
                for (keyL4 in obj[keyL2][keyL3]) {
                  if (obj[keyL2][keyL3][keyL4] !== '' && obj[keyL2][keyL3][keyL4] !== null) {
                    switch (keyL4) {
                      case 'issued_on':
                        obj[keyL2][keyL3][keyL4] = NewDate.set(obj[keyL2][keyL3][keyL4]);
                        break
                      case 'expires_on':
                        obj[keyL2][keyL3][keyL4] = NewDate.set(obj[keyL2][keyL3][keyL4]);
                        break
                    }
                  }
                }
              }
              break

            case 'passports_attributes':
              obj[keyL2] = obj[keyL2]
              for (keyL3 in obj[keyL2]) {
                for (keyL4 in obj[keyL2][keyL3]) {
                  if (obj[keyL2][keyL3][keyL4] !== '' && obj[keyL2][keyL3][keyL4] !== null) {
                    switch (keyL4) {
                      case 'issued_on':
                        obj[keyL2][keyL3][keyL4] = NewDate.set(obj[keyL2][keyL3][keyL4])
                        break
                      case 'expires_on':
                        obj[keyL2][keyL3][keyL4] = NewDate.set(obj[keyL2][keyL3][keyL4])
                        break
                    }
                  }
                }
              }
              break

            case 'availability':
              obj[keyL2] = [obj[keyL2]]
              for (keyL3 in obj[keyL2]) {
                for (keyL4 in obj[keyL2][keyL3]) {
                  if (obj[keyL2][keyL3][keyL4] !== '' &&
                    obj[keyL2][keyL3][keyL4] !== null &&
                    keyL4 !== 'availability_additional_info') {
                    obj[keyL2][keyL3][keyL4] = JSON.parse(obj[keyL2][keyL3][keyL4])
                  }
                }
              }
              break
          }
        }
        return obj
      }
    }
  })

  .factory('toggler', function () {
    var toggler = {}
    toggler.inverter = function (state) {
      return (state) ? state = false : state = true
    }

    toggler.toggle = function (state) {
      return toggler.inverter(state)
    }

    return toggler
  })

  .factory('reset', function (localStorageService) {
    return {
      userData: function () {
        localStorageService.remove('user_data')
      },
      createFormsData: function () {
        localStorageService.remove('createFlightAttendant')
        localStorageService.remove('beforeSendFlightAttendant')
        localStorageService.remove('createPilot')
        localStorageService.remove('beforeSendPilot')
        localStorageService.remove('createMechanic')
        localStorageService.remove('beforeSendMechanic')
      }
    }
  })

  .factory('profileDataManagement', function (localStorageService, simpleStorage, traitInitializer) {
    var p = {}
    p.defineKey = function (userID, profile, action) {
      return action + profile + '_' + userID
    }

    p.get = function (userID, profile, action) {
      var key = action + profile + '_' + userID
      var obj = localStorageService.get(key)

      if (!obj && profile === 'Pilot') {
        localStorageService.set(key, traitInitializer.get('pilot'))
      }

      if (!obj && profile === 'Mechanic') {
        localStorageService.set(key, traitInitializer.get('mechanic'))
      }

      if (!obj && profile === 'FlightAttendant') {
        localStorageService.set(key, traitInitializer.get('flight_attendant'))
      }

      return simpleStorage.getter(key)
    }
    return p
  })

  .factory('ConnectivityMonitor', function ($rootScope, $cordovaNetwork) {
    return {
      isOnline: function () {
        if (ionic.Platform.isWebView()) {
          return $cordovaNetwork.isOnline()
        } else {
          return navigator.onLine
        }
      },
      isOffline: function () {
        if (ionic.Platform.isWebView()) {
          return !$cordovaNetwork.isOnline()
        } else {
          return !navigator.onLine
        }
      },
      startWatching: function () {
        if (ionic.Platform.isWebView()) {
          // $rootScope.$on('$cordovaNetwork:online', function (event, networkState) {
          //   console.log('went online')
          // })
          //
          // $rootScope.$on('$cordovaNetwork:offline', function (event, networkState) {
          //   console.log('went offline');
          // })
        } else {
          // window.addEventListener('online', function (e) {
          //   console.log('went online');
          // }, false)
          //
          // window.addEventListener('offline', function (e) {
          //   console.log('went offline');
          // }, false)
        }
      }
    }
  })

  .factory('ViewJobsService', function () {
    return {
      setView: setView,
      getView: getView,
      flag: false
    }

    function setView(flag) {
      this.flag = flag;
    }

    function getView() {
      return this.flag;
    }
  })
