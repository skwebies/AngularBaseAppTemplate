/// <reference path="../angular.js" />

angular.module("mainModule")
    .controller("MainController",
    [
        "$scope",
        "$rootScope",
        "$location",
        "$route",
        "Hub",
        "weatherService",

        function($scope, $rootScope,  $location, $route, Hub, weatherService) {
            $scope.$route = $route;


            $scope.data = {
                weather: []
            };


            weatherService.GetAllWeatherReport()
                .then(function (data) {
                    if (data != null) {
                        $scope.data.weather = data;
                    }
                });



             var path = 'http://localhost:65144/signalr'; //SignalR root path assigned
        var hub = new Hub('temperatureHub', {

            rootPath: path,

            listeners: {
                'receiveTemperature': function (temperature) {
                    var index = $scope.data.weather.map(function (temperature) {
                        return temperature.Id;
                    }).indexOf(temperature.Id);

                    $scope.data.weather[index].CityTemperature = temperature.CityTemperature;
                    $rootScope.$apply();

                    //console.log(temperature.CityTemperature);


                }
                //'broadcastTemperature': function (time, weather) {

                //    $rootScope.$broadcast('weatherService-data-event', {
                //        'time': time,
                //        'weather': weather


                //    });

                //}

            },

            methods: ['recieveTemperature'],

            //handle connection error
            errorHandler: function (error) {
                console.error(error);
            },

            //SignalR connection status to the log.
            stateChanged: function (state) {
                switch (state.newState) {
                    case $.signalR.connectionState.connecting:
                        console.log("signalR.connectionState.connecting" + state.newState);
                        break;
                    case $.signalR.connectionState.connected:
                        console.log("signalR.connectionState.connected" + state.newState);
                        break;
                    case $.signalR.connectionState.reconnecting:
                        console.log("signalR.connectionState.reconnecting" + state.newState);
                        break;
                    case $.signalR.connectionState.disconnected:
                        console.log("signalR.connectionState.disconnected" + state.newState);
                        break;
                }


            }



        });






            $scope.go = function(url) {
                $location.path(url);
            };
        }
    ]);