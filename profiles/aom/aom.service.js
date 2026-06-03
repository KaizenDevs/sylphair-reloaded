(function () {
    'use strict';
    angular
      .module('sylphairApp')
      .factory('AomService', AomService)
  
    AomService.$inject = ['$translate'];
  
    function AomService($translate) {
      return {
        jobPost: jobPost,
      }

      function jobPost(job) {
        var elementsMissing = "";
        var countMising = 0;
        var showMissAlert = false;
        var check_languages = [];
        var check_positions = [];

        if(job.start_date > job.end_date){
            elementsMissing = elementsMissing + 'End date must be greater than Start date <br/>'; 
            showMissAlert = true;
            countMising++;
          }
    
        if(job.start_date < new Date()){
            elementsMissing = elementsMissing + 'Start date must be greater than Current date <br/>'; 
            showMissAlert = true;
            countMising++;
        }

        if(job.monthly_salary < 0){
            elementsMissing = elementsMissing + 'Monthly salary <br/>'; 
            showMissAlert = true;
            countMising++;
        }

        if(job.time_on_type < 0){
            elementsMissing = elementsMissing + 'Minimum time required <br/>'; 
            showMissAlert = true;
            countMising++;
        }

        if (job.language_proficiencies_attributes && job.language_proficiencies_attributes.length > 0) {
          angular.forEach(job.language_proficiencies_attributes, function (value) {
            if(!value._destroy){
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
              
              check_languages.push(value.language_id)
            }
          })
        }
        if(job.job_type==='mechanic job'){
          if (job.job_positions_attributes && job.job_positions_attributes.length > 0) {
            angular.forEach(job.job_positions_attributes, function (value) {
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
                
                check_positions.push(value.position);
              }
            })
          }
  
          if (job.job_positions_attributes.length === 0) {
            showMissAlert = true;
            elementsMissing = elementsMissing + 'You must select a position<br/>';
            countMising++;
          }
        }
        
        if (showMissAlert && countMising > 0) {
          return {
            flag: true,
            msg: elementsMissing
          }
        }
        return {
          flag: false
        }
      }
}
})();