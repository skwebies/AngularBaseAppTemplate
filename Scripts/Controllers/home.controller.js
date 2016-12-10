/// <reference path="../angular.js" />

angular.module("mainModule")
    .controller("HomeController",
    [
        "$scope",
        "weatherService",
        function($scope, weatherService) {
            $scope.title = "Weather Reports";

            $scope.weather = [];



            weatherService.GetAllWeatherReport()
                .then(function (data) {
                    if (data != null) {
                    $scope.weather = data;
                    console.log($scope.weather);
                    }

            });




        }
    ]);