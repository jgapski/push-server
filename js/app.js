var app = angular.module("chatApp",["ngRoute"]);


app.config(['$routeProvider', function($routeProvider){

    $routeProvider
        .when("/",{
            templateUrl: "views/landing_page.html",
            controller: "indexController"
        })
        .when("/main",{
            templateUrl: "views/main.html",
            controller: "mainAppController"
        });
}]);

app.service("mainChatService",function () {
    var mainChatService = {};

    mainChatService.appTitle = "Fake Chat App";

    return mainChatService;
});



app.controller("indexController",["$scope", "mainChatService" , function ($scope, mainChatService) {
    $scope.appTitle = mainChatService.appTitle;
}]);

app.controller("mainAppController", ["$scope", "mainChatService", function ($scope, mainChatService) {
    $scope.appTitle = mainChatService.appTitle;
}]);