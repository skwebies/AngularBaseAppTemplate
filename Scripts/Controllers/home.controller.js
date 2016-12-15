/// <reference path="../angular.js" />

angular.module("mainModule")
    .controller("HomeController",
    [

        "$scope",


        function ($scope) {
            $scope.title = "Weather Reports";

            //$scope.initialized = false;

            //$scope.$on('weatherService-data-event', function (evt, data) {
            //    if (!$scope.initialized) {
            //        $scope.data.weather = data.weather;


            //        $scope.initialized = true;
            //    }

            //    //$scope.data.setValue(0, 1, Math.round(data['']));


            //   // console.log($scope.data.weather);
            //});
        }
    ]);