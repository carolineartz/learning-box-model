'use strict';

angular.module('cssBoxModel')
    .controller('MainCtrl', function($scope) {
        //default values

        //adjustable values
        $scope.margin = {
            top: 20,
            right: 20,
            bottom: 20,
            left: 20
        }
        $scope.border = {
            top: 15,
            right: 15,
            bottom: 15,
            left: 15
        }
        $scope.padding = {
            top: 20,
            right: 20,
            bottom: 20,
            left: 20
        }

        $scope.box = {
            sizing: "content-box"
        }
        $scope.dimensions = {
            width: 220,
            height: 220
        }

        $scope.innerContent = {
            width: 220,
            height: 220
        }

        $scope.generatedDimensions = {
            width: 330,
            height: 330
        }


        //actual applied style values
        $scope.boxPosition = {
            left: 50,
            top: 56
        }

        $scope.styleMargin = {
            width: 300,
            height: 300,
            top: -50,
            left: -50
        }

        $scope.styleBorder = {
            width: 260,
            height: 260,
            top: -30,
            left: -30
        }

        $scope.stylePadding = {
            width: 242,
            height: 242,
            top: -20,
            left: -20
        }


        //watch for changes and calculate
        $scope.$watch(function() {
            $scope.boxPosition.top = $scope.margin.top +
                $scope.border.top +
                $scope.padding.top + 6;

            $scope.boxPosition.left = $scope.margin.left +
                $scope.border.left +
                $scope.padding.left;


            //Margin Styles
            $scope.styleMargin.width = $scope.margin.right +
                $scope.margin.left +
                $scope.border.right +
                $scope.border.left +
                $scope.padding.right +
                $scope.padding.left +
                getInnerWidth();

            $scope.styleMargin.height = $scope.margin.top +
                $scope.margin.bottom +
                $scope.border.top +
                $scope.border.bottom +
                $scope.padding.top +
                $scope.padding.bottom +
                getInnerHeight();

            $scope.styleMargin.top = ($scope.margin.top +
                $scope.border.top +
                $scope.padding.top) * -1;

            $scope.styleMargin.left = ($scope.margin.left +
                $scope.border.left +
                $scope.padding.left) * -1;


            //Border Styles
            $scope.styleBorder.width = $scope.border.right +
                $scope.border.left +
                $scope.padding.right +
                $scope.padding.left +
                getInnerWidth();

            $scope.styleBorder.height = $scope.border.top +
                $scope.border.bottom +
                $scope.padding.top +
                $scope.padding.bottom +
                getInnerHeight();

            $scope.styleBorder.top = ($scope.border.top +
                $scope.padding.top) * -1;

            $scope.styleBorder.left = ($scope.border.left +
                $scope.padding.left) * -1;


            //Padding Styles
            $scope.stylePadding.width = $scope.padding.right +
                $scope.padding.left +
                getInnerWidth() + 2;

            $scope.stylePadding.height = $scope.padding.top +
                $scope.padding.bottom +
                getInnerHeight() + 2;

            $scope.stylePadding.top = -$scope.padding.top;

            $scope.stylePadding.left = -$scope.padding.left;
            //Inner Content Styles- based on box-sizing
            $scope.innerContent.width = getInnerWidth();
            $scope.innerContent.height = getInnerHeight();

            $scope.generatedDimensions.width = getGeneratedDimensionsWidth();
            $scope.generatedDimensions.height = getGeneratedDimensionsHeight();
        });

        function getInnerWidth() {
            if ($scope.box.sizing === 'border-box') {
                return ($scope.dimensions.width -
                    $scope.border.right -
                    $scope.border.left -
                    $scope.padding.right -
                    $scope.padding.left);
            } else {
                return $scope.dimensions.width;
            }
        }

        function getInnerHeight() {
            if ($scope.box.sizing === 'border-box') {
                return ($scope.dimensions.height -
                    $scope.border.top -
                    $scope.border.bottom -
                    $scope.padding.top -
                    $scope.padding.bottom);
            } else {
                return $scope.dimensions.height;
            }
        }

        function getGeneratedDimensionsWidth() {
            if ($scope.box.sizing === 'border-box') {
                return ($scope.dimensions.width + $scope.margin.right + $scope.margin.left);
            } else {
                return ($scope.dimensions.width +
                    $scope.border.right +
                    $scope.border.left +
                    $scope.padding.right +
                    $scope.padding.left +
                    $scope.margin.left +
                    $scope.margin.right);
            }
        }

        function getGeneratedDimensionsHeight() {
            if ($scope.box.sizing === 'border-box') {
                return ($scope.dimensions.height + $scope.margin.top + $scope.margin.bottom);
            } else {
                return ($scope.dimensions.height +
                    $scope.border.top +
                    $scope.border.bottom +
                    $scope.padding.top +
                    $scope.padding.bottom +
                    $scope.margin.top +
                    $scope.margin.bottom);
            }
        }


    });
