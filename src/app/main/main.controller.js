'use strict';
var app = angular.module('cssBoxModel');

app.controller('MainCtrl', function ($scope) {

    //models: default adjustable values
    $scope.padding = {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
        v: function () {
            return this.top + this.bottom;
        },
        h: function () {
            return this.right + this.left;
        }
    };

    $scope.border = {
        top: 15,
        right: 15,
        bottom: 15,
        left: 15,
        v: function () {
            return this.top + this.bottom;
        },
        h: function () {
            return this.right + this.left;
        }
    };

    $scope.margin = {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
        v: function () {
            return this.top + this.bottom;
        },
        h: function () {
            return this.right + this.left;
        }
    };

    $scope.box = {
        sizing: 'content-box'
    };

    $scope.dimensions = {
        width: 220,
        height: 220
    };

    $scope.innerContent = {
        width: getInnerWidth(),
        height: getInnerHeight()
    };

    $scope.generatedIncludeMargin = false;

    $scope.generatedBoxDimensions = {
        width: getGeneratedBoxDimensionsWidth(),
        height: getGeneratedBoxDimensionsHeight()
    };

    $scope.checkIncludeMargin = function() {
      $scope.generatedBoxDimensions.width = getGeneratedBoxDimensionsWidth();
      $scope.generatedBoxDimensions.height = getGeneratedBoxDimensionsHeight();
    };


    //actual applied style values
    $scope.boxPosition = {
        left: 50,
        top: 56
    };

    $scope.styleMargin = {
        width: 300,
        height: 300,
        top: -50,
        left: -50
    };

    $scope.styleBorder = {
        width: 260,
        height: 260,
        top: -30,
        left: -30
    };

    $scope.stylePadding = {
        width: 242,
        height: 242,
        top: -20,
        left: -20
    };

    //watch for changes applied to sliders and calculate rendered styles
    $scope.$watch(function () {
        $scope.boxPosition.top = calcBoxPositionTop() + 6;
        $scope.boxPosition.left = calcBoxPositionLeft();

        //Margin Styles
        $scope.styleMargin.width = $scope.margin.h() + $scope.styleBorder.width;
        $scope.styleMargin.height = $scope.margin.v() + $scope.styleBorder.height;
        $scope.styleMargin.top = -calcBoxPositionTop();
        $scope.styleMargin.left = -calcBoxPositionLeft();

        //Border Styles
        $scope.styleBorder.width = $scope.border.h() + $scope.stylePadding.width;
        $scope.styleBorder.height = $scope.border.v() + $scope.stylePadding.height;
        $scope.styleBorder.top = -($scope.border.top + $scope.padding.top);
        $scope.styleBorder.left = -($scope.border.left + $scope.padding.left);

        //Padding Styles
        $scope.stylePadding.width = $scope.padding.h() + getInnerWidth() + 2;
        $scope.stylePadding.height = $scope.padding.v() + getInnerHeight() + 2;
        $scope.stylePadding.top = -$scope.padding.top;
        $scope.stylePadding.left = -$scope.padding.left;

        //Inner Content Styles- based on box-sizing
        $scope.innerContent.width = getInnerWidth();
        $scope.innerContent.height = getInnerHeight();

        //Generated Dimensions- based on box-sizing
        $scope.generatedBoxDimensions.width = getGeneratedBoxDimensionsWidth();
        $scope.generatedBoxDimensions.height = getGeneratedBoxDimensionsHeight();
    });

    function getInnerWidth() {
        var width;
        if ($scope.box.sizing === 'border-box') {
            width =  $scope.dimensions.width -
                     $scope.border.h() -
                     $scope.padding.h();
        } else {
            width =  $scope.dimensions.width;
        }
        return (width > 0) ? width : 0;
    }

    function getInnerHeight() {
        var height;
        if ($scope.box.sizing === 'border-box') {
            height = $scope.dimensions.height -
                     $scope.border.v() -
                     $scope.padding.v();
        } else {
            height = $scope.dimensions.height;
        }
        return (height > 0) ? height : 0;
    }


    //if padding + border > dimension, return (padding + border - dimension) [+ margin]
    function getGeneratedBoxDimensionsWidth() {
        var width;
        if ($scope.box.sizing === 'border-box') {
            width = (getInnerWidth() === 0) ? calcPaddingBorderWidth() : $scope.dimensions.width;
        } else {
            width = $scope.dimensions.width + calcPaddingBorderWidth();
        }
        return ($scope.generatedIncludeMargin) ? width + $scope.margin.h() : width;
    }

    function getGeneratedBoxDimensionsHeight() {
        var height;
        if ($scope.box.sizing === 'border-box') {
            height = (getInnerHeight() === 0) ? calcPaddingBorderHeight() : $scope.dimensions.height;
        } else {
            height = $scope.dimensions.height + calcPaddingBorderHeight();
        }
        return ($scope.generatedIncludeMargin) ? height + $scope.margin.v() : height;
    }

    /*
     * Private: Helpers
     */
    function calcBoxPositionTop() {
        return $scope.margin.top + $scope.border.top + $scope.padding.top;
    }

    function calcBoxPositionLeft() {
        return $scope.margin.left + $scope.border.left + $scope.padding.left;
    }

    function calcPaddingBorderWidth() {
        return $scope.padding.h() + $scope.border.h();
    }

    function calcPaddingBorderHeight() {
        return $scope.padding.v() + $scope.border.v();
    }

});
