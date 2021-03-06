'use strict';
  function cdDojoService($q, cdApi, $http, Upload){
    function topfail(err){
      console.log(err);
    }
    var currentDojo = {};

    return {
      load: function(id, win, fail) {
        return cdApi.get('dojos/' + id, win, fail || topfail);
      },
      find: function(query, win, fail) {
        return cdApi.post('dojos/find', {query:query}, win, fail || topfail);
      },
      list: function(query, win, fail){
        return cdApi.post('dojos', {query:query}, win, fail || topfail);
      },
      myDojos: function (search, win, fail) {
        return $q(function(resolve, reject) {
          cdApi.post('dojos/my-dojos', {search: search}, resolve, reject);
        });
      },
      search: function(query) {
        return $q(function(resolve, reject) {
          cdApi.post('dojos/search', {query: query}, resolve, reject);
        });
      },
      manageDojos: function(query) {
        return $q(function(resolve, reject) {
          cdApi.post('dojos/manage-dojos', {query: query}, resolve, reject);
        });
      },
      save: function(dojo, win, fail) {
        dojo = angular.copy(dojo);
        if (dojo.id) {
          return cdApi.put('dojos/' + dojo.id, { dojo: dojo }, win, fail);
        }
        else {
          return cdApi.post('dojos/create', { dojo: dojo }, win, fail || topfail);
        }
      },
      uploadAvatar: function (dojoId, file){
        return Upload.upload({
          url: cdApi.baseUrl + 'dojos/' + dojoId + '/avatar',
          data: {file: file}
        });
      },
      // We should probably do that on the backend to avoid logging to console, srsly
      getAvatar: function(dojoId) {
        var bucketUrl = 'https://s3-eu-west-1.amazonaws.com/zen-dojo-images/' + dojoId;
        return $http.head('https://s3-eu-west-1.amazonaws.com/zen-dojo-images/' + dojoId).then(function successCallback(response) {
          //Nothing to do, it all works as expected, the image is stored online
          return bucketUrl;
        }, function errorCallback(response) {
          //File doesn't exists, we should fallback
          return $q.resolve('/img/avatars/dojo-default-logo.png');
        });
      },
      setDojo: function(dojo, win, fail) {
        currentDojo = dojo;
        if(currentDojo) return win(currentDojo);
        var err = new Error('Set Dojo Failed');
        fail(err);
      },
      getDojo: function() {
        return currentDojo;
      },
      delete: function(id, win, fail) {
        return cdApi.delete('dojos/' + id, win, fail);
      },
      dojosByCountry: function(query, win, fail) {
        return cdApi.post('dojos/by-country', {query: query}, win, fail || topfail);
      },
      bulkUpdate: function(dojos) {
        return $q(function(resolve, reject) {
          cdApi.post('dojos/bulk-update', {dojos: dojos}, resolve, reject);
        });
      },
      bulkDelete: function(dojos){
        return $q(function(resolve, reject) {
          cdApi.post('dojos/bulk-delete', {dojos: dojos}, resolve, reject);
        });
      },
      getStats: function(win, fail){
        return cdApi.post('dojos/stats', {}, win,  fail || topfail);
      },
      saveDojoLead: function(dojoLead, win, fail) {
        if(dojoLead.id) {
          cdApi.put('dojos/update-dojo-lead/' + dojoLead.id, { dojoLead: dojoLead }, win, fail || topfail);
        } else {
          cdApi.post('dojos/save-dojo-lead', { dojoLead: dojoLead }, win, fail || topfail);
        }
      },
      loadUserDojoLead: function(userId, win, fail) {
        return cdApi.get('dojos/user-dojo-lead/' + userId, win, fail || topfail);
      },
      loadDojoLead: function(id, win, fail) {
        return cdApi.get('dojos/dojo-lead/' + id, win, fail || topfail);
      },
      loadSetupDojoSteps: function(win, fail) {
        return cdApi.get('dojos/setup-steps', win, fail || topfail);
      },
      getUsersDojos: function(query, win, fail) {
        return cdApi.post('dojos/users', {query: query}, win, fail || topfail);
      },
      searchDojoLeads: function(query) {
        return $q(function(resolve, reject) {
          cdApi.post('dojos/search-dojo-leads', {query: query}, resolve, reject);
        });
      },
      getUsersDojosPromise: function(query){
        var deferred = $q.defer();
        cdApi.post('dojos/users', {query: query}, deferred.resolve, deferred.reject);
        return deferred.promise;
      },
      loadDojoUsers: function(query, win, fail) {
        return cdApi.post('dojos/load-dojo-users', {query: query}, win, fail || topfail);
      },
      exportDojoUsers: function(dojoId, win, fail) {
        return cdApi.get('dojos/export-users/' + dojoId, win, fail || topfail);
      },
      generateUserInviteToken: function(data, win, fail) {
        return cdApi.post('dojos/generate-user-invite-token', data, win, fail || topfail);
      },
      acceptUserInvite: function(data, win, fail) {
        return cdApi.post('dojos/accept-user-invite', { data: data }, win, fail || topfail);
      },
      requestInvite: function (data, win, fail) {
        return cdApi.post('dojos/request-user-invite', { data: data }, win, fail || topfail);
      },
      acceptUserRequest: function(data, win, fail) {
        return cdApi.post('dojos/accept-user-request', { data: data }, win, fail || topfail);
      },
      dojosForUser: function(userId, win, fail) {
        return cdApi.get('dojos/dojos-for-user/' + userId, win, fail || topfail);
      },
      saveUsersDojos: function(userDojo, win, fail) {
        return cdApi.post('dojos/save-usersdojos', {userDojo: userDojo}, win, fail || topfail);
      },
      removeUsersDojosLink: function(data, win, fail) {
        return cdApi.post('dojos/remove-usersdojos/' + data.userId + '/' + data.dojoId, {data: data}, win, fail || topfail);
      },
      getUserPermissions: function(win, fail) {
        return cdApi.get('dojos/user-permissions', win, fail || topfail);
      },
      getUserTypes: function(win, fail) {
        return cdApi.get('dojos/user-types', win, fail || topfail);
      },
      uncompletedDojos: function(win, fail){
        return cdApi.get('dojos/uncompleted', win, fail || topfail);
      },
      getDojoConfig: function(win, fail) {
        return cdApi.get('dojos/config', win, fail || topfail);
      },
      updateFounder: function(founder, win, fail) {
        return cdApi.post('dojos/update-founder', {founder: founder},  win, fail || topfail);
      },
      searchNearestDojos: function(query) {
        var deferred = $q.defer();
        cdApi.post('dojos/search-nearest-dojos', {query: query}, deferred.resolve, deferred.reject || topfail);
        return deferred.promise;
      },
      searchBoundingBox: function(query) {
        return $q(function(resolve, reject) {
          cdApi.post('dojos/search-bounding-box', {query: query}, resolve, reject);
        });
      },
      // from countries service
      listCountries: function(win, fail){
        return cdApi.get('countries', function (countries) {
          // Sort based on browser/OS's locale.
          countries.sort(function (a, b){
            var c = a.countryName.localeCompare(b.countryName);
            return c;
          });
          win(countries);
        }, fail || topfail);
      },
      listPlaces: function(search, win, fail) {
        return cdApi.post('countries/places', {search: search}, win, fail || topfail);
      },
      loadCountriesLatLongData: function(win, fail) {
        return cdApi.get('countries/lat-long', win, fail || topfail);
      },
      getContinentCodes: function(win, fail){
        return cdApi.get('countries/continents/codes', win, fail || topfail);
      },
      notifyAllMembers: function (data, win, fail) {
        return cdApi.post('dojos/notify-all-members', { data: data }, win, fail || topfail);
      },
    };
  }
angular.module('cpZenPlatform')
  .service('cdDojoService', ['$q', 'cdApi', '$http', 'Upload', cdDojoService])
;
