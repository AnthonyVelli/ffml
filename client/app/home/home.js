'use strict';

angular.module('ffmlApp')
  .config(function($stateProvider) {
    $stateProvider.state('home', {
      url: '/home',
      template: '<home></home>'
    });
  });
