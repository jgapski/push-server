var app = angular.module("restaurantApp",[]);

app.service("menuItemsService",function () {
    var menuItemsService = {};


    menuItemsService.orderedItems = [
        {id: 1, mainItem: 'soup', additions: ['chips','baked potatoes','stuff','things'], drink: 'coke'}
    ];

    menuItemsService.mainItems = [
        {id: 1, itemName: 'soup'},
        {id: 2, itemName: 'steak'},
        {id: 3, itemName: 'ribs'},
        {id: 4, itemName: 'fish'},
        {id: 5, itemName: 'lobster'}
    ];

    menuItemsService.additions = [
        {id: 1, itemName: 'chips'},
        {id: 2, itemName: 'bashed potatoes'},
        {id: 3, itemName: 'baked potatoes'},
        {id: 4, itemName: 'fish'},
        {id: 5, itemName: 'lobster'}
    ];

    menuItemsService.drinks = [
        {id: 1, itemName: 'coke'},
        {id: 2, itemName: 'wine'},
        {id: 3, itemName: 'beer'},
        {id: 4, itemName: 'juice'},
        {id: 5, itemName: 'water'}
    ];

    return menuItemsService;

});

app.controller("mainAppController", ["$scope", "menuItemsService", function ($scope, menuItemsService) {
    $scope.appTitle = "Fake Restaurant App";
    $scope.item = "item";
    $scope.mainItems = menuItemsService.mainItems;
    $scope.additions = menuItemsService.additions;
    $scope.orderedItem = menuItemsService.orderedItems[0];
}]);

app.directive("mainCourseSelector", function () {
    return{
        restrict: "E",
        templateUrl: "elements/mainCourseSelector.html"
    }
});

app.directive("additionSelector", function () {
    return{
        restrict: "E",
        templateUrl: "elements/additionSelector.html"
    }
});

app.directive("orderedItem", function () {
    return{
        restrict: "E",
        templateUrl: "elements/orderedItem.html"
    }
});
