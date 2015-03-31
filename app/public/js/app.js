'use strict';

angular
  .module('app', [])
  .controller('MainCtrl', function () {
    // nothing yet
  })
  .controller('JobListCtrl', ['$scope', function ($scope) {
    $scope.jobs = [{
      title: 'Sales Person',
      description: 'you will fight dragons'
    }, {
      title: 'Accountant',
      description: 'you will use the keyboard'
    }];
  }]);
