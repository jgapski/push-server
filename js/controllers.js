angular.module("controllersModule",[])

.controller("indexController",["$scope", "$location", "mainChatService", function ($scope, $location, mainChatService) {
    $scope.appTitle = mainChatService.appTitle;

    $scope.username = "";

    $scope.validateName = function () {


        if ($scope.username){
            $.ajax({
                method: "POST",
                url: "http://localhost:8080/login",
                data: {name: $scope.username}
            }).done(function( data ) {
                if (data.status === "ok") {
                    $scope.saveName();
                    } else alert("Username already taken");
            }).fail( function (jqXHR, textStatus) {
                console.log("ajax fail" + textStatus);
            });
        }

        //$scope.saveName();

    };

    $scope.saveName = function () {
        mainChatService.setUserName($scope.username);
        $location.path("/main");
        $scope.$apply();
    };

}])

.controller("mainAppController", ["$scope", "$location","$window", "mainChatService", "messageManagerService",
    function ($scope, $location, $window, mainChatService, messageManagerService) {
    $scope.appTitle = mainChatService.appTitle;
    $scope.userName = mainChatService.userName;
    $scope.activeUser = "";
    $scope.newUser ="";

    if (!$scope.userName) $location.path("/");
    else messageManagerService.setUserName($scope.userName);

    $scope.messageBoard = messageManagerService.messageBoard;

    $scope.setActiveUser = function (user) {
        $scope.activeUser = user;
        $scope.messagePrototype.to = user;
        messageManagerService.setUserEvent(user, false);
        //$scope.$apply();
    };

    $scope.messagePrototype = {
        from: $scope.userName,
        to:$scope.activeUser,
        content:""
    };

    $scope.sendMessage = function () {
        if ($scope.messagePrototype.content){
            messageManagerService.addMessage($scope.activeUser,_.clone($scope.messagePrototype));
            messageManagerService.sendMessage($scope.messagePrototype);
            $scope.messagePrototype.content = "";
        }
        //$scope.$apply();
    };

    $scope.addNewUser = function () {
        messageManagerService.addNewUser($scope.newUser);
        $scope.newUser="";
    };


    $window.onbeforeunload = function () {
        messageManagerService.logout($scope.userName);
    }

}]);