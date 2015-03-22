'use strict';

angular.module('cssBoxModel', ['ngAnimate', 'ngSanitize', 'ui.router','ui.slider'])

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'app/main/main.html',
            controller: 'MainCtrl'
        });

    $urlRouterProvider.otherwise('/');
})

.directive('labelPositionV', function() {
    return {
        restrict: 'AE',
        scope: {},
        link: function(scope, element, attrs, ctrl) {
            var id = attrs.id;
            attrs.$observe('labelPositionTop', function(value) {
                var styleTop = "<style> #" + id + "::before{top:" + ((value / 2.8) - 12) + "px;}</style>";
                angular.element(document).find('head').append(styleTop);
            });
            attrs.$observe('labelPositionBottom', function(value) {
                var styleBottom = "<style> #" + id + "::after{bottom:" + ((value / 3) - 13) + "px;}</style>";
                angular.element(document).find('head').append(styleBottom);
            });
        }
    };
})

.directive('labelPositionH', function() {
    return {
        restrict: 'AE',
        scope: {},
        link: function(scope, element, attrs, ctrl) {
            var id = attrs.id;
            attrs.$observe('labelPositionRight', function(value) {
                var styleRight = "<style> #" + id + "::after{right:" + (1*((value / 2.8) - 12)) + "px;}</style>";
                angular.element(document).find('head').append(styleRight);
            });
            attrs.$observe('labelPositionLeft', function(value) {
                var styleLeft = "<style> #" + id + "::before{left:" + (1*((value / 3)-6)) + "px;}</style>";
                angular.element(document).find('head').append(styleLeft);
            });

        }
    };
});
