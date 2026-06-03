(function () {
  'use strict';
  angular
    .module('sylphairApp')
    .factory('PilotService', PilotService)

  PilotService.$inject = ['$translate'];

  function PilotService($translate) {
    return {
      profile: profile,
      passport: passport,
      visa: visa,
      international: international,
      rating: rating,
      availability: availability,
      medical: medical,
      license: license
    }

    function profile(pilot) {
      var elementsMissing = "<hr/>";
      var countMising = 0;
      var showMissAlert = false;
      var check_languages = [];

      // position
      if (pilot.profile[0].position === "" || pilot.profile[0].position === null) {
        showMissAlert = true;
        elementsMissing = elementsMissing + $translate.instant('position_label') + '<br/>';
        countMising++;
      }
      // gender
      if (pilot.profile[0].gender === "" || pilot.profile[0].gender === null) {
        showMissAlert = true;
        elementsMissing = elementsMissing + $translate.instant('gender_label') + '<br/>';
        countMising++;
      }
      // date_of_birth
      // if (pilot.profile[0].date_of_birth === "" ||
      //   pilot.profile[0].date_of_birth === null) {
      //   showMissAlert = true;
      //   elementsMissing = elementsMissing + 'date of birhtday <br/>';
      //   countMising++;
      // }
      // nationality_id

      if(pilot.profile[0].date_of_birth > new Date()){
        showMissAlert = true;
        elementsMissing = elementsMissing + 'Enter a valid date of birth <br/>';
        countMising++;
      }

      if (pilot.profile[0].nationality_id === "" ||
        pilot.profile[0].nationality_id === null) {
        showMissAlert = true;
        elementsMissing = elementsMissing + $translate.instant('nationality_label') + '<br/>';
        countMising++;
      }
      // country_code_id
      // if (pilot.profile[0].country_code_id === "" ||
      //   pilot.profile[0].country_code_id === null) {
      //   showMissAlert = true;
      //   elementsMissing = elementsMissing + 'country code <br/>';
      //   countMising++;
      // }
      // phone
      // if (pilot.profile[0].phone === "" ||
      //   pilot.profile[0].phone === null) {
      //   showMissAlert = true;
      //   elementsMissing = elementsMissing + 'phone number <br/>';
      //   countMising++;
      // }
      if (pilot.language_proficiencies_attributes.length > 0) {
        angular.forEach(pilot.language_proficiencies_attributes, function (value) {
          if (value.language_id === "" || value.language_id === null) {
            showMissAlert = true;
            elementsMissing = elementsMissing + $translate.instant('language_label') + '<br/>';
            countMising++;
          }
          if (!value.level || value.level === "" || value.level === null ) {
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

    function passport(pilot) {
      var elementsMissing = "<hr/>";
      var countMising = 0;
      var breaking = false;
      var showMissAlert = false;

      if (pilot.passports_attributes.length > 0) {
        angular.forEach(pilot.passports_attributes, function (value) {
          if (!breaking && !value._destroy) {
            // country_of_issue_id
            if (value.country_of_issue_id === null || value.country_of_issue_id === "") {
              showMissAlert = true;
              elementsMissing = elementsMissing + $translate.instant('issuing_country_label') + '<br/>';
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

    function visa(pilot) {
      var elementsMissing = "<hr/>";
      var countMising = 0;
      var breaking = false;
      var showMissAlert = false;

      if (pilot.visas_attributes.length > 0) {
        angular.forEach(pilot.visas_attributes, function (value) {
          if (!breaking && !value._destroy) {
            // country_id
            if (value.country_id === null || value.country_id === "") {
              showMissAlert = true;
              elementsMissing = elementsMissing +  $translate.instant('country_label') + '<br/>';
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

    function international(pilot) {
      var countMising = 0;
      var showMissAlert = false;

      // africa
      if (pilot.international_experiences[0].africa === null ||
        pilot.international_experiences[0].africa === "" ||
        pilot.international_experiences[0].africa === false) {
        showMissAlert = true;
        countMising++;
      }
      // asia
      if (pilot.international_experiences[0].asia === null ||
        pilot.international_experiences[0].asia === "" ||
        pilot.international_experiences[0].asia === false) {
        showMissAlert = true;
        countMising++;
      }
      // australia
      if (pilot.international_experiences[0].australia === null ||
        pilot.international_experiences[0].australia === "" ||
        pilot.international_experiences[0].australia === false) {
        showMissAlert = true;
        countMising++;
      }
      // caribbean
      if (pilot.international_experiences[0].caribbean === null ||
        pilot.international_experiences[0].caribbean === "" ||
        pilot.international_experiences[0].caribbean === false) {
        showMissAlert = true;
        countMising++;
      }
      // central_america
      if (pilot.international_experiences[0].central_america === null ||
        pilot.international_experiences[0].central_america === "" ||
        pilot.international_experiences[0].central_america === false) {
        showMissAlert = true;
        countMising++;
      }
      // eastern_europe
      if (pilot.international_experiences[0].eastern_europe === null ||
        pilot.international_experiences[0].eastern_europe === "" ||
        pilot.international_experiences[0].eastern_europe === false) {
        showMissAlert = true;
        countMising++;
      }
      // europe
      if (pilot.international_experiences[0].europe === null ||
        pilot.international_experiences[0].europe === "" ||
        pilot.international_experiences[0].europe === false) {
        showMissAlert = true;
        countMising++;
      }
      // india
      if (pilot.international_experiences[0].india === null ||
        pilot.international_experiences[0].india === "" ||
        pilot.international_experiences[0].india === false) {
        showMissAlert = true;
        countMising++;
      }
      // middle_east
      if (pilot.international_experiences[0].middle_east === null ||
        pilot.international_experiences[0].middle_east === "" ||
        pilot.international_experiences[0].middle_east === false) {
        showMissAlert = true;
        countMising++;
      }
      // north_america
      if (pilot.international_experiences[0].north_america === null ||
        pilot.international_experiences[0].north_america === "" ||
        pilot.international_experiences[0].north_america === false) {
        showMissAlert = true;
        countMising++;
      }
      // oceanic_crossings
      if (pilot.international_experiences[0].oceanic_crossings === null ||
        pilot.international_experiences[0].oceanic_crossings === "" ||
        pilot.international_experiences[0].oceanic_crossings === false) {
        showMissAlert = true;
        countMising++;
      }
      // pacific_crossings
      if (pilot.international_experiences[0].pacific_crossings === null ||
        pilot.international_experiences[0].pacific_crossings === "" ||
        pilot.international_experiences[0].pacific_crossings === false) {
        showMissAlert = true;
        countMising++;
      }
      // south_america
      if (pilot.international_experiences[0].south_america === null ||
        pilot.international_experiences[0].south_america === "" ||
        pilot.international_experiences[0].south_america === false) {
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

    function rating(pilot) {
      var elementsMissing = "<hr/>";
      var countMising = 0;
      var showMissAlert = false;

      var breaking = false;

      if (pilot.type_ratings_attributes.length > 0) {
        angular.forEach(pilot.type_ratings_attributes, function (value) {
          if (!breaking && !value._destroy) {
            // aircraft_id
            if (value.aircraft_id === null || value.aircraft_id === "") {
              showMissAlert = true;
              elementsMissing = elementsMissing + $translate.instant('aircraft_label') + '<br/>';
              countMising++;
            }
            // last_flown_on
            if (value.last_flown_on === null || value.last_flown_on === "") {
              showMissAlert = true;
              elementsMissing = elementsMissing + $translate.instant('pilot_last_flown_label') + '<br/>'
              countMising++;
            }

            if (value.last_flown_on > new Date()) {
              showMissAlert = true;
              elementsMissing = elementsMissing + $translate.instant('pilot_last_flown_date_error') + '<br/>';
              countMising++;
            }

            // time_in_aircraft
            if (value.time_in_aircraft === null || value.time_in_aircraft === "") {
              showMissAlert = true;
              elementsMissing = elementsMissing + $translate.instant('pilot_aircraft_time_label') + '<br/>'
              countMising++;
            }
            // pic_hours
            if (value.pic_hours === null || value.pic_hours === "") {
              showMissAlert = true;
              elementsMissing = elementsMissing + $translate.instant('pilot_pic_hours_label') + '<br/>'
              countMising++;
            }
            // sic_hours
            if (value.sic_hours === null || value.sic_hours === "") {
              showMissAlert = true;
              elementsMissing = elementsMissing + $translate.instant('pilot_sic_hours_label') + '<br/>'
              countMising++;
            }
            // current_till
            if (value.current_till === null || value.current_till === "") {
              showMissAlert = true;
              elementsMissing = elementsMissing + $translate.instant('pilot_current_till_label') + '<br/>'
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
      return {
        flag: true,
        msg: $translate.instant('error_modal_rating_msg')
      }
    }

    function availability(pilot) {
      var showAdditional = false;
      var countMising = 0;
      var showMissAlert = false;

      // seeking_employment
      if (pilot.availability[0].freelancer === null ||
        pilot.availability[0].freelancer === "" ||
        pilot.availability[0].freelancer === false) {
        showMissAlert = true;
        countMising++;
      } else {
        if (pilot.availability[0].price_per_day === null ||
          pilot.availability[0].price_per_day === "") {
          showAdditional = true;
          return {
            flag: true,
            msg: $translate.instant('error_modal_price_msg')
          }
        }
      }
      // ferry_flights
      if (pilot.availability[0].ferry_flights === null ||
        pilot.availability[0].ferry_flights === "" ||
        pilot.availability[0].ferry_flights === false) {
        showMissAlert = true;
        countMising++;
      }
      // seeking_employment
      if (pilot.availability[0].seeking_employment === null ||
        pilot.availability[0].seeking_employment === "" ||
        pilot.availability[0].seeking_employment === false) {
        showMissAlert = true;
        countMising++;
      }
      // voluntary
      if (pilot.availability[0].voluntary === null ||
        pilot.availability[0].voluntary === "" ||
        pilot.availability[0].voluntary === false) {
        showMissAlert = true;
        countMising++;
      }
      // other
      if (pilot.availability[0].other === null ||
        pilot.availability[0].other === "" ||
        pilot.availability[0].other === false) {
        showMissAlert = true;
        countMising++;
      } else {
        // availability_additional_info
        if (pilot.availability[0].availability_additional_info === null ||
          pilot.availability[0].availability_additional_info === "") {
          showAdditional = true;
          return {
            flag: true,
            msg: $translate.instant('error_modal_additional_info_msg')
          }
        }
      }

      if (showMissAlert && countMising >= 5) {
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

    function medical(pilot) {
      var elementsMissing = "<hr/>";
      var countMising = 0;
      var showMissAlert = false;

      var breaking = false;

      if (pilot.medical_attributes.length > 0) {
        angular.forEach(pilot.medical_attributes, function (value) {
          if (!breaking && !value._destroy) {
            // issuance_authority
            if (value.issuance_authority === null ||
              value.issuance_authority === "") {
              showMissAlert = true;
              elementsMissing = elementsMissing + $translate.instant('issuing_auth_label') + '<br/>';
              countMising++;
            }
            // issuance_country_id
            if (value.issuance_country_id === null ||
              value.issuance_country_id === "") {
              showMissAlert = true;
              elementsMissing = elementsMissing + $translate.instant('issuing_country_label') + '<br/>';
              countMising++;
            }
            // medical_type
            if (value.type_of === null || value.type_of === "") {
              showMissAlert = true;
              elementsMissing = elementsMissing + $translate.instant('pilot_medical_type') + '<br/>';
              countMising++;
            }
            // valid_until
            if (value.valid_until === null || value.valid_until === "") {
              showMissAlert = true;
              elementsMissing = elementsMissing + $translate.instant('valid_until') + '<br/>';
              countMising++;
            }
          }
        });
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

    function license(pilot) {
      var elementsMissing = "<hr/>";
      var countMising = 0;
      var showMissAlert = false
      var breaking = false;

      if (pilot.licenses_attributes.length > 0) {
        angular.forEach(pilot.licenses_attributes, function (value) {
          if (!breaking && !value._destroy) {
            // date_of_issue
            if (value.date_of_issue === null || value.date_of_issue === "") {
              showMissAlert = true;
              elementsMissing = elementsMissing + $translate.instant('date_issue_label') + '<br/>';
              countMising++;
            }

            if (value.date_of_issue > new Date()) {
              showMissAlert = true;
              elementsMissing = elementsMissing + 'Date of issue cannot be greater than current date <br/>';
              countMising++;
            }

            // english_proficiency_level
            if (value.english_proficiency_level === null || value.english_proficiency_level === "") {
              showMissAlert = true;
              elementsMissing = elementsMissing +  
                                $translate.instant('pilot_english_level_1') +
                                $translate.instant('pilot_english_level_2') + '<br/>';
              countMising++;
            }
            // issuance_authority
            if (value.issuance_authority === null || value.issuance_authority === "") {
              showMissAlert = true;
              elementsMissing = elementsMissing + $translate.instant('issuing_auth_label') + '<br/>';
              countMising++;
            }
            // issuance_country_id
            if (value.issuance_country_id === null || value.issuance_country_id === "") {
              showMissAlert = true;
              elementsMissing = elementsMissing + $translate.instant('issuing_country_label') + '<br/>';
              countMising++;
            }
            // number
            if (value.number === null || value.number === "") {
              showMissAlert = true;
              elementsMissing = elementsMissing + $translate.instant('pilot_license_number_label') + '<br/>';
              countMising++;
            }
            // type_of
            if (value.type_of === null || value.type_of === "") {
              showMissAlert = true;
              elementsMissing = elementsMissing + $translate.instant('pilot_license_type_label') + '<br/>';
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
      return {
        flag: true,
        msg: $translate.instant('error_modal_license_msg')
      }
    }

  }
})();
