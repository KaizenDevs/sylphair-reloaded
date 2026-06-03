(function () {
  'use strict';
  angular
    .module('sylphairApp')
    .factory('AttendantService', AttendantService)

  AttendantService.$inject = ['$translate'];

  function AttendantService($translate) {
    return {
      profile: profile,
      passport: passport,
      visa: visa,
      international: international,
      professional: professional,
      availability: availability
    }

    function profile(attendant) {
      var elementsMissing = "<hr/>";
      var countMising = 0;
      var showMissAlert = false
      var check_languages = [];

      // position
      if (attendant.profile[0].position === "" ||
        attendant.profile[0].position === null) {
        showMissAlert = true;
        elementsMissing = elementsMissing + $translate.instant('position_label') + '<br/>';
        countMising++;
      }
      // gender
      if (attendant.profile[0].gender === "" ||
        attendant.profile[0].gender === null) {
        showMissAlert = true;
        elementsMissing = elementsMissing + $translate.instant('gender_label') + '<br/>';
        countMising++;
      }
      // date_of_birth
      // if (attendant.profile[0].date_of_birth === "" ||
      //   attendant.profile[0].date_of_birth === null) {
      //   showMissAlert = true;
      //   elementsMissing = elementsMissing + 'date of birhtday <br/>';
      //   countMising++;
      // }

      if(attendant.profile[0].date_of_birth > new Date()){
        showMissAlert = true;
        elementsMissing = elementsMissing + 'Enter a valid date of birth <br/>';
        countMising++;
      }

      // nationality_id
      if (attendant.profile[0].nationality_id === "" ||
        attendant.profile[0].nationality_id === null) {
        showMissAlert = true;
        elementsMissing = elementsMissing + $translate.instant('nationality_label') + '<br/>';
        countMising++;
      }
      // country_code_id
      // if (attendant.profile[0].country_code_id === "" ||
      //   attendant.profile[0].country_code_id === null) {
      //   showMissAlert = true;
      //   elementsMissing = elementsMissing + 'country code <br/>';
      //   countMising++;
      // }
      // phone
      // if (attendant.profile[0].phone === "" ||
      //   attendant.profile[0].phone === null) {
      //   showMissAlert = true;
      //   elementsMissing = elementsMissing + 'phone number <br/>';
      //   countMising++;
      // }
      if (attendant.language_proficiencies_attributes.length > 0) {
        angular.forEach(attendant.language_proficiencies_attributes, function (value) {
          if (value.language_id === "" || value.language_id === null) {
            showMissAlert = true;
            elementsMissing = elementsMissing + $translate.instant('language_label') + '<br/>';
            countMising++;
          }
          if (!value.level || value.level === "" || value.level === null) {
            showMissAlert = true;
            elementsMissing = elementsMissing + $translate.instant('lang_level_label') + '<br/>';
            countMising++;
          }

          if(check_languages.indexOf(value.language_id) !== -1){
            showMissAlert = true;
            elementsMissing = elementsMissing + 'Duplicate languages <br/>';
            countMising++;
          }

          if(!value._destroy){
            check_languages.push(value.language_id)
          }

        })
      }

      if(attendant.profile[0].height < 0){
        showMissAlert = true;
        elementsMissing = elementsMissing + 'Height must be greater than 0 <br/>';
        countMising++;
      }

      if (showMissAlert && countMising > 0) {
        return {
          flag: true,
          msg: $translate.instant('error_modal_template_msg') + elementsMissing
        }
      }
      return {
        flag: false
      }
    }

    function passport(attendant) {
      var elementsMissing = "<hr/>";
      var countMising = 0;
      var breaking = false;
      var showMissAlert = false;

      if (attendant.passports_attributes.length > 0) {
        angular.forEach(attendant.passports_attributes, function (value) {
          if (!breaking && !value._destroy) {
            // country_of_issue_id
            if (value.country_of_issue_id === null || value.country_of_issue_id === "") {
              showMissAlert = true;
              elementsMissing = elementsMissing + $translate.instant('country_issue') + '<br/>';
              countMising++;
            }
            // issued_on
            if (value.issued_on === null || value.issued_on === "") {
              showMissAlert = true;
              elementsMissing = elementsMissing + $translate.instant('date_issue_label') + '<br/>';
              countMising++;
            }
            // expires_on
            if (value.expires_on === null || value.expires_on === "") {
              showMissAlert = true;
              elementsMissing = elementsMissing + $translate.instant('expires_date') + '<br/>';
              countMising++;
            }

            if (value.issued_on >= value.expires_on){
              showMissAlert = true;
              elementsMissing = elementsMissing + 'Expires on dates must be greater than Date of issue <br/>';
              countMising++;
            }

            if (value.issued_on > new Date()){
              showMissAlert = true;
              elementsMissing = elementsMissing + 'Date of issue cannot be greater than current date <br/>';
              countMising++;
            }

            if (countMising > 0) {
              breaking = true;
            }
          }
        });

        if (showMissAlert && countMising > 0) {
          return {
            flag: true,
            msg: $translate.instant('error_modal_template_msg') + elementsMissing
          }
        }
        return {
          flag: false
        }

      }
      // return {
      //   flag: true,
      //   msg: 'You should have at least one passport'
      // }
      // DONT REQUIRE PASSPORT
      return {
        flag: false
      }
    }

    function visa(attendant) {
      var elementsMissing = "<hr/>";
      var countMising = 0;
      var breaking = false;
      var showMissAlert = false;

      if (attendant.visas_attributes.length > 0) {
        angular.forEach(attendant.visas_attributes, function (value) {
          if (!breaking && !value._destroy) {
            // country_id
            if (value.country_id === null || value.country_id === "") {
              showMissAlert = true;
              elementsMissing = elementsMissing + $translate.instant('country_label') + '<br/>';
              countMising++;
            }
            // issued_on
            if (value.issued_on === null || value.issued_on === "") {
              showMissAlert = true;
              elementsMissing = elementsMissing + $translate.instant('date_issue_label') + '<br/>';
              countMising++;
            }
            // expires_on
            if (value.expires_on === null || value.expires_on === "") {
              showMissAlert = true;
              elementsMissing = elementsMissing + $translate.instant('valid_until') + '<br/>';
              countMising++;
            }

            if (value.issued_on >= value.expires_on){
              showMissAlert = true;
              elementsMissing = elementsMissing + 'Valid till must be greater than Date of issue <br/>';
              countMising++;
            }

            if (value.issued_on > new Date()){
              showMissAlert = true;
              elementsMissing = elementsMissing + 'Date of issue cannot be greater than current date <br/>';
              countMising++;
            }

            if (countMising > 0) {
              breaking = true;
            }
          }
        });

        if (showMissAlert && countMising > 0) {
          return {
            flag: true,
          msg: $translate.instant('error_modal_template_msg') + elementsMissing
          }
        }
        return {
          flag: false
        }

      }
      // return {
      //   flag: true,
      //   msg: 'You should have at least one visa'
      // }
      // DONT REQUIRE VISA
      return {
        flag: false
      }
    }

    function international(attendant) {
      var countMising = 0;
      var showMissAlert = false;

      // africa
      if (attendant.international_experiences[0].africa === null ||
        attendant.international_experiences[0].africa === "" ||
        attendant.international_experiences[0].africa === false) {
        showMissAlert = true;
        countMising++;
      }
      // asia
      if (attendant.international_experiences[0].asia === null ||
        attendant.international_experiences[0].asia === "" ||
        attendant.international_experiences[0].asia === false) {
        showMissAlert = true;
        countMising++;
      }
      // australia
      if (attendant.international_experiences[0].australia === null ||
        attendant.international_experiences[0].australia === "" ||
        attendant.international_experiences[0].australia === false) {
        showMissAlert = true;
        countMising++;
      }
      // caribbean
      if (attendant.international_experiences[0].caribbean === null ||
        attendant.international_experiences[0].caribbean === "" ||
        attendant.international_experiences[0].caribbean === false) {
        showMissAlert = true;
        countMising++;
      }
      // central_america
      if (attendant.international_experiences[0].central_america === null ||
        attendant.international_experiences[0].central_america === "" ||
        attendant.international_experiences[0].central_america === false) {
        showMissAlert = true;
        countMising++;
      }
      // eastern_europe
      if (attendant.international_experiences[0].eastern_europe === null ||
        attendant.international_experiences[0].eastern_europe === "" ||
        attendant.international_experiences[0].eastern_europe === false) {
        showMissAlert = true;
        countMising++;
      }
      // europe
      if (attendant.international_experiences[0].europe === null ||
        attendant.international_experiences[0].europe === "" ||
        attendant.international_experiences[0].europe === false) {
        showMissAlert = true;
        countMising++;
      }
      // india
      if (attendant.international_experiences[0].india === null ||
        attendant.international_experiences[0].india === "" ||
        attendant.international_experiences[0].india === false) {
        showMissAlert = true;
        countMising++;
      }
      // middle_east
      if (attendant.international_experiences[0].middle_east === null ||
        attendant.international_experiences[0].middle_east === "" ||
        attendant.international_experiences[0].middle_east === false) {
        showMissAlert = true;
        countMising++;
      }
      // north_america
      if (attendant.international_experiences[0].north_america === null ||
        attendant.international_experiences[0].north_america === "" ||
        attendant.international_experiences[0].north_america === false) {
        showMissAlert = true;
        countMising++;
      }
      // oceanic_crossings
      if (attendant.international_experiences[0].oceanic_crossings === null ||
        attendant.international_experiences[0].oceanic_crossings === "" ||
        attendant.international_experiences[0].oceanic_crossings === false) {
        showMissAlert = true;
        countMising++;
      }
      // pacific_crossings
      if (attendant.international_experiences[0].pacific_crossings === null ||
        attendant.international_experiences[0].pacific_crossings === "" ||
        attendant.international_experiences[0].pacific_crossings === false) {
        showMissAlert = true;
        countMising++;
      }
      // south_america
      if (attendant.international_experiences[0].south_america === null ||
        attendant.international_experiences[0].south_america === "" ||
        attendant.international_experiences[0].south_america === false) {
        showMissAlert = true;
        countMising++;
      }

      if (showMissAlert && countMising === 13) {
        return {
          flag: true,
          msg: $translate.instant('error_modal_experience_msg')
        }
      }
      return {
        flag: false
      }
    }

    function professional(attendant) {
      var elementsMissing = "<hr/>";
      var countMising = 0;
      var showMissAlert = false;

      // issuance_authority
      if (attendant.professional_experience[0].issuance_authority === "" ||
        attendant.professional_experience[0].issuance_authority === null) {
        showMissAlert = true;
        elementsMissing = elementsMissing + $translate.instant('issuing_auth_label') + '<br/>';
        countMising++;
      }
      // issuance_country_id
      if (attendant.professional_experience[0].issuance_country_id === "" ||
        attendant.professional_experience[0].issuance_country_id === null) {
        showMissAlert = true;
        elementsMissing = elementsMissing + $translate.instant('issuing_country_label') + '<br/>';
        countMising++;
      }
      // training_certification
      if (attendant.professional_experience[0].training_certification === "" ||
        attendant.professional_experience[0].training_certification === null) {
        showMissAlert = true;
        elementsMissing = elementsMissing + $translate.instant('certification_label') + '<br/>';
        countMising++;
      }
      if (attendant.aircraft_experiences_attributes.length > 0) {
        angular.forEach(attendant.aircraft_experiences_attributes, function (value) {
          if (value.aircraft_id === "" || value.aircraft_id === null) {
            showMissAlert = true;
            elementsMissing = elementsMissing + $translate.instant('aircraft_label') + ' ' + $translate.instant('qualification_label') + '<br/>';
            countMising++;
          }
        })
      }
      if (showMissAlert && countMising > 0) {
        /*$ionicPopup.alert({
          title: 'Something is missing!',
          template: 'You should complete the following information to go the next step.' + elementsMissing
        });*/
        return {
          flag: true,
          msg: $translate.instant('error_modal_template_msg') + elementsMissing,
        }
      }
      return {
        flag: false
      }
    }

    function availability(attendant) {
      var showAdditional = false;
      var countMising = 0;
      var showMissAlert = false;

      // full_time
      if (attendant.availability[0].full_time === null ||
        attendant.availability[0].full_time === "" ||
        attendant.availability[0].full_time === false) {
        showMissAlert = true;
        countMising++;
      }
      // part_time
      if (attendant.availability[0].part_time === null ||
        attendant.availability[0].part_time === "" ||
        attendant.availability[0].part_time === false) {
        showMissAlert = true;
        countMising++;
      }
      // freelancer
      if (attendant.availability[0].freelancer === null ||
        attendant.availability[0].freelancer === "" ||
        attendant.availability[0].freelancer === false) {
        showMissAlert = true;
        countMising++;
      }
      // other
      if (attendant.availability[0].other === null ||
        attendant.availability[0].other === "" ||
        attendant.availability[0].other === false) {
        showMissAlert = true;
        countMising++;
      } else {
        // availability_additional_info
        if (attendant.availability[0].availability_additional_info === null ||
          attendant.availability[0].availability_additional_info === "") {
          showAdditional = true;
          return {
            flag: true,
            msg: $translate.instant('error_modal_additional_info_msg')
          }
        }
      }

      if (showMissAlert && countMising === 4) {
        return {
          flag: true,
          msg: $translate.instant('error_modal_experience_msg')
        }
      } else if (showAdditional !== true) {
        return {
          flag: false
        }
      }
    }

  }

})();
