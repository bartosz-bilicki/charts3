(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('dataservice', dataservice);

  dataservice.$inject = ['$http', '$q', 'exception', 'logger'];
  /* @ngInject */
  function dataservice($http, $q, exception, logger) {
    var service = {
      getPeople: getPeople,
      getMessageCount: getMessageCount,
      getData: getData
    };

    return service;

    function getMessageCount() { return $q.when(72); }

  function getData() {
         return $http.get('/data.json')
           .then(success)
           .catch(fail);

         function success(response) {
           return response.data;
         }

         function fail(e) {
           return exception.catcher('XHR Failed for getPeople')(e);
         }

  }

    function getPeople() {
      return $http.get('/api/people')
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for getPeople')(e);
      }
    }
  }
})();
