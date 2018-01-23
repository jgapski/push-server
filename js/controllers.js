angular.module("controllersModule",[])

.controller("indexController",["$scope", "$location", "mainChatService" , function ($scope, $location, mainChatService) {
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

}])

.controller("mainAppController", ["$scope", "$location","$window", "mainChatService", "messageManagerService", "webCommunicationService",
    function ($scope, $location, $window, mainChatService, messageManagerService, webCommunicationService) {
    $scope.appTitle = mainChatService.appTitle;
    $scope.userName = mainChatService.userName;
    $scope.activeUser = "";
    $scope.newUser ="";

    if (!$scope.userName) $location.path("/");

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
            webCommunicationService.sendMessage($scope.userName,$scope.currentMessage);
            $scope.currentMessage.msg = "";
        }
    };

    $scope.addNewUser = function () {
        messageManagerService.addNewUser($scope.newUser);
        $scope.newUser="";
    };


    $window.onbeforeunload = function () {
        webCommunicationService.logout($scope.userName);
        return "A";
    }

}]);