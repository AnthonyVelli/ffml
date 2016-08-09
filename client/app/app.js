'use strict';

angular.module('ffmlApp', ['ffmlApp.auth', 'ffmlApp.admin', 'ffmlApp.constants', 'ngCookies',
    'ngResource', 'ngSanitize', 'ui.router', 'validation.match', 'ngMaterial', 'ngAria', 'ngAnimate'])
  .config(function($urlRouterProvider, $locationProvider, $mdThemingProvider) {
    $urlRouterProvider.otherwise('/');
    $mdThemingProvider.theme('default')
    	.primaryPalette('light-green', {
    		'default': '800',
    		'hue-1': 'A700',
    	})
    	.accentPalette('blue-grey', {
    		'default': '500'
    	})

    $locationProvider.html5Mode(true);
  });
