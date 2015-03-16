'use strict';

angular.module('cssBoxModel')
    .controller('MainCtrl', function ($scope) {
        //set slider value as a number to have 1 slider
        // properties defined below
        $scope.slider3 = {
            val: 5.5,
            min: 0,
            max: 10,
            step: 0.5
        };
    });
