'use strict';

angular
  .module('app', ['ngResource'])
  .controller('MainCtrl', function () {
    // nothing yet
  })
  .controller('JobListCtrl', ['$scope', '$resource', function ($scope, $resource) {
    $scope.jobs = $resource('/api/jobs').query();
  }]);
