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
    mainChatService.userName = "";

    mainChatService.setUserName = function (userName) {
        mainChatService.userName = userName;
    };

    mainChatService.validateName = function (name) {
        if (name.length > 0){
            return true;
        }
        else return false;
    };

    return mainChatService;
});


app.service("messageManagerService", function () {
    var messageManagerService = {};

    messageManagerService.messageBoard = [
        {user:"user1", messages:[
                {from:"user1", to:"me", msg:"Hej"},
                {from:"me", to:"user1", msg:"Uszanowanko!"},
                {from:"user1", to:"me", msg:"Wyrazy Szacunku!"}
            ]},
        {user:"user2", messages:[
                {from:"user2", to:"me", msg:"Hej"},
                {from:"me", to:"user2", msg:"randomowa wiadomosc!"},
                {from:"user2", to:"me", msg:"lorem ipsum"},
                {from:"me", to:"user2", msg:"mesage"}

            ]}
    ];

    messageManagerService.findBoardByUserName = function (user) {
        element = _.find(messageManagerService.messageBoard, function (el) {
            return el.user === user;
        });
        return element;
    };

    messageManagerService.addMessage = function (user,msg) {
        var userBoard = messageManagerService.findBoardByUserName(user);
        userBoard.messages.push(msg);
    };

    messageManagerService.addNewUser = function (newUser) {
        var tmp = {user:newUser, messages:[]};
        messageManagerService.messageBoard.push(tmp);
    };

    return messageManagerService;
});


app.controller("indexController",["$scope", "$location", "mainChatService" , function ($scope, $location, mainChatService) {
    $scope.appTitle = mainChatService.appTitle;

    $scope.name = "";

    $scope.validateName = function () {
        if (mainChatService.validateName($scope.name)){
            $scope.saveName();
            $location.path("/main");
        }

    };

    $scope.saveName = function () {
        mainChatService.setUserName($scope.name);
    };

}]);

app.controller("mainAppController", ["$scope", "mainChatService", "messageManagerService", function ($scope, mainChatService, messageManagerService) {
    $scope.appTitle = mainChatService.appTitle;
    $scope.userName = mainChatService.userName;
    $scope.activeUser = "";
    $scope.newUser ="";

    $scope.messageBoard = messageManagerService.messageBoard;

    $scope.setActiveUser = function (user) {
        $scope.activeUser = user;
    };

    $scope.currentMessage = {
        from: $scope.userName,
        to:$scope.activeUser,
        msg:""
    };

    $scope.sendMessage = function () {
        if ($scope.currentMessage.msg){
            messageManagerService.addMessage($scope.activeUser,_.clone($scope.currentMessage));
            $scope.currentMessage.msg = "";
        }
    };

    $scope.addNewUser = function () {
        messageManagerService.addNewUser($scope.newUser);
        $scope.newUser="";
    };

}]);