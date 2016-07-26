'use strict';

angular.module('ffmlApp', ['ffmlApp.auth', 'ffmlApp.admin', 'ffmlApp.constants', 'ngCookies',
    'ngResource', 'ngSanitize', 'ui.router', 'validation.match'
  ])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);
  });
