'use strict';

angular.module('ffmlApp.auth', ['ffmlApp.constants', 'ffmlApp.util', 'ngCookies', 'ui.router'])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
