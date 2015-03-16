'use strict';

angular.module('cssBoxModel', ['ngAnimate', 'ngSanitize', 'ui.router', 'angular-slidezilla'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'app/main/main.html',
                controller: 'MainCtrl'
            });

        $urlRouterProvider.otherwise('/');
    });
