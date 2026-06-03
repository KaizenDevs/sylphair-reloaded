(function () {
  'use strict';

  angular
    .module('sylphairApp')
    .factory('MechanicService', MechanicService);

  MechanicService.$inject = ['$translate'];

  function MechanicService($translate) {
    return {
      profile: profile,
      passport: passport,
      visa: visa,
      availability: availability,
      international: international,
      professional: professional
    }

    function profile(mechanic) {

      var elementsMissing = "<hr/>";
      var countMising = 0;
      var showMissAlert = false;
      var check_languages = [];
      var check_positions = [];

      // position
      // if (mechanic.profile[0].position === "" || mechanic.profile[0].position === null) {
      //   showMissAlert = true;
      //   elementsMissing = elementsMissing + $translate.instant('position_label') + '<br/>';
      //   countMising++;
      // }
      // gender
      if (mechanic.profile[0].gender === "" || mechanic.profile[0].gender === null) {
        showMissAlert = true;
        elementsMissing = elementsMissing + $translate.instant('gender_label') + '<br/>';
        countMising++;
      }
      // date_of_birth
      // if (mechanic.profile[0].date_of_birth === "" ||
      //   mechanic.profile[0].date_of_birth === null) {
      //   showMissAlert = true;
      //   elementsMissing = elementsMissing + 'date of birhtday <br/>';
      //   countMising++;
      // }

      if(mechanic.profile[0].date_of_birth > new Date()){
        showMissAlert = true;
        elementsMissing = elementsMissing + 'Enter a valid date of birth <br/>';
        countMising++;
      }

      // nationality_id
      if (mechanic.profile[0].nationality_id === "" ||
        mechanic.profile[0].nationality_id === null) {
        showMissAlert = true;
        elementsMissing = elementsMissing + $translate.instant('nationality_label') + '<br/>';
        countMising++;
      }
      // country_code_id
      // if (mechanic.profile[0].country_code_id === "" ||
      //   mechanic.profile[0].country_code_id === null) {
      //   showMissAlert = true;
      //   elementsMissing = elementsMissing + 'country code <br/>';
      //   countMising++;
      // }
      // phone
      // if (mechanic.profile[0].phone === "" ||
      //   mechanic.profile[0].phone === null) {
      //   showMissAlert = true;
      //   elementsMissing = elementsMissing + 'phone number <br/>';
      //   countMising++;
      // }
      if (mechanic.language_proficiencies_attributes.length > 0) {
        angular.forEach(mechanic.language_proficiencies_attributes, function (value) {
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

      if (mechanic.crew_member_positions_attributes && mechanic.crew_member_positions_attributes.length > 0) {
        angular.forEach(mechanic.crew_member_positions_attributes, function (value) {
          if(!value._destroy){
            if (value.position === "" || value.position === null) {
              showMissAlert = true;
              elementsMissing = elementsMissing + 'Position cannot be empty<br/>';
              countMising++;
            }
  
            if(check_positions.indexOf(value.position) !== -1){
              showMissAlert = true;
              elementsMissing = elementsMissing + 'Duplicate Position <br/>';
              countMising++;
            }
            
            check_positions.push(value.position)
          }
        })
      }

      if (mechanic.crew_member_positions_attributes.length === 0) {
        showMissAlert = true;
        elementsMissing = elementsMissing + 'You must select a position<br/>';
        countMising++;
      }

      if (showMissAlert && countMising > 0) {
        return {
          flag: true,
          msg: $translate.instant('error_modal_template_msg') + elementsMissing,
        };
      }
      return {
        flag: false
      };
    }

    function passport(mechanic) {
      var elementsMissing = "<hr/>";
      var countMising = 0;
      var breaking = false;
      var showMissAlert = false;

      if (mechanic.passports_attributes.length > 0) {
        angular.forEach(mechanic.passports_attributes, function (value) {
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
            msg: $translate.instant('error_modal_template_msg') + elementsMissing,

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

    function visa(mechanic) {
      var elementsMissing = "<hr/>";
      var countMising = 0;
      var breaking = false;
      var showMissAlert = false;

      if (mechanic.visas_attributes.length > 0) {
        angular.forEach(mechanic.visas_attributes, function (value) {
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
            msg: $translate.instant('error_modal_template_msg') + elementsMissing,
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

    function availability(mechanic) {
      var showAdditional = false;
      var countMising = 0;
      var showMissAlert = false;

      // full_time
      if (mechanic.availability[0].full_time === null ||
        mechanic.availability[0].full_time === "" ||
        mechanic.availability[0].full_time === false) {
        showMissAlert = true;
        countMising++;
      }
      // part_time
      if (mechanic.availability[0].part_time === null ||
        mechanic.availability[0].part_time === "" ||
        mechanic.availability[0].part_time === false) {
        showMissAlert = true;
        countMising++;
      }
      // freelancer
      if (mechanic.availability[0].freelancer === null ||
        mechanic.availability[0].freelancer === "" ||
        mechanic.availability[0].freelancer === false) {
        showMissAlert = true;
        countMising++;
      }
      // other
      if (mechanic.availability[0].other === null ||
        mechanic.availability[0].other === "" ||
        mechanic.availability[0].other === false) {
        showMissAlert = true;
        countMising++;
      } else {
        // availability_additional_info
        if (mechanic.availability[0].availability_additional_info === null ||
          mechanic.availability[0].availability_additional_info === "") {
          return {
            flag: true,
            msg: $translate.instant('error_modal_additional_info_msg')
          }
          showAdditional = true;
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
        };
      }
    }

    function international(mechanic) {
      var countMising = 0;
      var showMissAlert = false;

      // africa
      if (mechanic.international_experiences[0].africa === null ||
        mechanic.international_experiences[0].africa === "" ||
        mechanic.international_experiences[0].africa === false) {
        showMissAlert = true;
        countMising++;
      }
      // asia
      if (mechanic.international_experiences[0].asia === null ||
        mechanic.international_experiences[0].asia === "" ||
        mechanic.international_experiences[0].asia === false) {
        showMissAlert = true;
        countMising++;
      }
      // australia
      if (mechanic.international_experiences[0].australia === null ||
        mechanic.international_experiences[0].australia === "" ||
        mechanic.international_experiences[0].australia === false) {
        showMissAlert = true;
        countMising++;
      }
      // caribbean
      if (mechanic.international_experiences[0].caribbean === null ||
        mechanic.international_experiences[0].caribbean === "" ||
        mechanic.international_experiences[0].caribbean === false) {
        showMissAlert = true;
        countMising++;
      }
      // central_america
      if (mechanic.international_experiences[0].central_america === null ||
        mechanic.international_experiences[0].central_america === "" ||
        mechanic.international_experiences[0].central_america === false) {
        showMissAlert = true;
        countMising++;
      }
      // eastern_europe
      if (mechanic.international_experiences[0].eastern_europe === null ||
        mechanic.international_experiences[0].eastern_europe === "" ||
        mechanic.international_experiences[0].eastern_europe === false) {
        showMissAlert = true;
        countMising++;
      }
      // europe
      if (mechanic.international_experiences[0].europe === null ||
        mechanic.international_experiences[0].europe === "" ||
        mechanic.international_experiences[0].europe === false) {
        showMissAlert = true;
        countMising++;
      }
      // india
      if (mechanic.international_experiences[0].india === null ||
        mechanic.international_experiences[0].india === "" ||
        mechanic.international_experiences[0].india === false) {
        showMissAlert = true;
        countMising++;
      }
      // middle_east
      if (mechanic.international_experiences[0].middle_east === null ||
        mechanic.international_experiences[0].middle_east === "" ||
        mechanic.international_experiences[0].middle_east === false) {
        showMissAlert = true;
        countMising++;
      }
      // north_america
      if (mechanic.international_experiences[0].north_america === null ||
        mechanic.international_experiences[0].north_america === "" ||
        mechanic.international_experiences[0].north_america === false) {
        showMissAlert = true;
        countMising++;
      }
      // oceanic_crossings
      if (mechanic.international_experiences[0].oceanic_crossings === null ||
        mechanic.international_experiences[0].oceanic_crossings === "" ||
        mechanic.international_experiences[0].oceanic_crossings === false) {
        showMissAlert = true;
        countMising++;
      }
      // pacific_crossings
      if (mechanic.international_experiences[0].pacific_crossings === null ||
        mechanic.international_experiences[0].pacific_crossings === "" ||
        mechanic.international_experiences[0].pacific_crossings === false) {
        showMissAlert = true;
        countMising++;
      }
      // south_america
      if (mechanic.international_experiences[0].south_america === null ||
        mechanic.international_experiences[0].south_america === "" ||
        mechanic.international_experiences[0].south_america === false) {
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

    function professional(mechanic) {
      var elementsMissing = "<hr/>";
      var countMising = 0;
      var showMissAlert = false;

      // issuance_authority
      if (mechanic.professional_experience[0].issuance_authority === "" ||
        mechanic.professional_experience[0].issuance_authority === null) {
        showMissAlert = true;
        elementsMissing = elementsMissing + $translate.instant('issuing_auth_label') + '<br/>';
        countMising++;
      }
      // issuance_country_id
      if (mechanic.professional_experience[0].issuance_country_id === "" ||
        mechanic.professional_experience[0].issuance_country_id === null) {
        showMissAlert = true;
        elementsMissing = elementsMissing + $translate.instant('issuing_country_label') + '<br/>';
        countMising++;
      }
      // training_certification
      if (mechanic.professional_experience[0].training_certification === "" ||
        mechanic.professional_experience[0].training_certification === null) {
        showMissAlert = true;
        elementsMissing = elementsMissing + $translate.instant('certification_label') + '<br/>';
        countMising++;
      }
      if (mechanic.aircraft_experiences_attributes.length > 0) {
        angular.forEach(mechanic.aircraft_experiences_attributes, function (value) {
          console.log(value.aircraft_id);
          if (value.aircraft_id === "" || value.aircraft_id === null) {
            showMissAlert = true;
            elementsMissing = elementsMissing + $translate.instant('aircraft_label') + ' ' + $translate.instant('qualification_label') + '<br/>';
            countMising++;
          }
        })
      }
      if (showMissAlert && countMising > 0) {
        return {
          flag: true,
          msg: $translate.instant('error_modal_template_msg') + elementsMissing,
        }
      }
      return {
        flag: false
      }
    }

  }


})();
