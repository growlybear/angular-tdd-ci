'use strict';

angular
  .module('app', [])
  .controller('TestCtrl', ['$scope', function ($scope) {
    $scope.poc = 'Angular too';
  }]);
