var app = angular.module("chatApp",["ngRoute", "controllersModule", "servicesModule"]);

app.config(['$routeProvider', function($routeProvider){

    $routeProvider
        .when("/",{
            templateUrl: "views/landing_page.html",
            controller: "indexController"
        })
        .when("/main",{
            templateUrl: "views/main.html",
            controller: "mainAppController"
        })
        .otherwise({
            redirectTo: "/"
        });
}]);


