/* jshint ignore:start */
'use strict';

angular.module('sylphairMock').config(['$provide', function ($provide) {

  $provide.decorator('$http', ['$delegate', '$q', 'MOCK_DATA', function ($delegate, $q, MOCK_DATA) {

    var API_HOST = 'api.sylphairaviation.com';
    var currentRole = 'pilot';

    function makeResponse(data, status) {
      var deferred = $q.defer();
      var response = {
        data: data,
        status: status || 200,
        statusText: 'OK',
        headers: function () { return null; },
        config: {}
      };
      deferred.resolve(response);
      var promise = deferred.promise;
      promise.success = function (fn) {
        promise.then(function (r) { fn(r.data, r.status, r.headers, r.config); });
        return promise;
      };
      promise.error = function (fn) { return promise; };
      return promise;
    }

    function matchPath(url, pattern) {
      return url.indexOf(pattern) !== -1;
    }

    function mockRoute(url, method, config) {
      if (url.indexOf(API_HOST) === -1) {
        return null; // not an API call — pass through
      }

      // POST /sessions — login
      if (method === 'POST' && matchPath(url, '/sessions')) {
        var body = config.data || {};
        var session = body.session || {};
        var role = session.demo_role || 'pilot';
        currentRole = role;
        var user = MOCK_DATA.users[role] || MOCK_DATA.users['pilot'];
        return makeResponse(user);
      }

      // DELETE /sessions/:id — logout
      if (method === 'DELETE' && matchPath(url, '/sessions/')) {
        return makeResponse({});
      }

      // GET /users/reset_password
      if (method === 'GET' && matchPath(url, '/users/reset_password')) {
        return makeResponse({ message: 'Password reset email sent.' });
      }

      // GET /users/:id
      if (method === 'GET' && matchPath(url, '/users/')) {
        var userData = MOCK_DATA.users[currentRole] || MOCK_DATA.users['pilot'];
        return makeResponse(userData);
      }

      // GET /pilots/:id (specific pilot)
      if (method === 'GET' && /\/pilots\/\d+/.test(url)) {
        var pilotId = parseInt(url.match(/\/pilots\/(\d+)/)[1], 10);
        var found = null;
        for (var i = 0; i < MOCK_DATA.pilots.length; i++) {
          if (MOCK_DATA.pilots[i].id === pilotId) { found = MOCK_DATA.pilots[i]; break; }
        }
        return makeResponse(found || MOCK_DATA.pilots[0]);
      }

      // GET /pilots (list / search)
      if (method === 'GET' && matchPath(url, '/pilots')) {
        return makeResponse(MOCK_DATA.pilots);
      }

      // GET /crew_members/:id (specific)
      if (method === 'GET' && /\/crew_members\/\d+/.test(url)) {
        var crewId = parseInt(url.match(/\/crew_members\/(\d+)/)[1], 10);
        var foundCrew = null;
        for (var j = 0; j < MOCK_DATA.crew_members.length; j++) {
          if (MOCK_DATA.crew_members[j].id === crewId) { foundCrew = MOCK_DATA.crew_members[j]; break; }
        }
        return makeResponse(foundCrew || MOCK_DATA.crew_members[0]);
      }

      // GET /crew_members (list / search)
      if (method === 'GET' && matchPath(url, '/crew_members')) {
        return makeResponse(MOCK_DATA.crew_members);
      }

      // GET /jobs/:id (specific job)
      if (method === 'GET' && /\/jobs\/\d+/.test(url)) {
        var jobId = parseInt(url.match(/\/jobs\/(\d+)/)[1], 10);
        var foundJob = null;
        for (var k = 0; k < MOCK_DATA.jobs.length; k++) {
          if (MOCK_DATA.jobs[k].id === jobId) { foundJob = MOCK_DATA.jobs[k]; break; }
        }
        return makeResponse(foundJob || MOCK_DATA.jobs[0]);
      }

      // GET /jobs (list / search)
      if (method === 'GET' && matchPath(url, '/jobs')) {
        return makeResponse(MOCK_DATA.jobs);
      }

      // POST /jobs, PUT /jobs/:id
      if ((method === 'POST' || method === 'PUT') && matchPath(url, '/jobs')) {
        return makeResponse(MOCK_DATA.jobs[0]);
      }

      // GET /aircrafts
      if (method === 'GET' && matchPath(url, '/aircrafts')) {
        return makeResponse(MOCK_DATA.aircrafts);
      }

      // GET /conversations/:id (with messages)
      if (method === 'GET' && /\/conversations\/\d+/.test(url)) {
        return makeResponse(MOCK_DATA.conversation_detail);
      }

      // GET /conversations (list)
      if (method === 'GET' && matchPath(url, '/conversations')) {
        return makeResponse(MOCK_DATA.conversations);
      }

      // POST /conversations
      if (method === 'POST' && matchPath(url, '/conversations')) {
        return makeResponse({ id: 3, sender_id: 1, recipient_id: 5 });
      }

      // POST /messages
      if (method === 'POST' && matchPath(url, '/messages')) {
        return makeResponse({ id: 99, created_at: new Date().toISOString() });
      }

      // Fallback: return empty 200
      return makeResponse({});
    }

    function mockHttp(config) {
      var url = config.url || '';
      var method = (config.method || 'GET').toUpperCase();
      var mock = mockRoute(url, method, config);
      if (mock !== null) { return mock; }
      return $delegate(config);
    }

    // Copy all properties from real $http (defaults, pendingRequests, etc.)
    angular.extend(mockHttp, $delegate);

    mockHttp.get = function (url, config) {
      return mockHttp(angular.extend({}, config || {}, { method: 'GET', url: url }));
    };
    mockHttp.post = function (url, data, config) {
      return mockHttp(angular.extend({}, config || {}, { method: 'POST', url: url, data: data }));
    };
    mockHttp.put = function (url, data, config) {
      return mockHttp(angular.extend({}, config || {}, { method: 'PUT', url: url, data: data }));
    };
    mockHttp.delete = function (url, config) {
      return mockHttp(angular.extend({}, config || {}, { method: 'DELETE', url: url }));
    };
    mockHttp.patch = function (url, data, config) {
      return mockHttp(angular.extend({}, config || {}, { method: 'PATCH', url: url, data: data }));
    };

    return mockHttp;
  }]);

}]);
