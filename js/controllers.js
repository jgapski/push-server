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

.controller("mainAppController", ["$scope", "$location","$window", "$http", "mainChatService", "messageManagerService",
    function ($scope, $location, $window, $http, mainChatService, messageManagerService) {
    $scope.appTitle = mainChatService.appTitle;
    $scope.userName = mainChatService.userName;
    $scope.activeUser = "";
    $scope.newUser ="";
    var vm = this;



    if (!$scope.userName) $location.path("/");

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
        if ($scope.messagePrototype.content && $scope.messagePrototype.to && $scope.messagePrototype.from){
            messageManagerService.addMessage($scope.activeUser,_.clone($scope.messagePrototype));
            vm.ajaxRequest(_.clone($scope.messagePrototype),"message");
            $scope.messagePrototype.content = "";
            messageManagerService.setUserEvent($scope.activeUser, false);
        }
    };

    $scope.addNewUser = function () {
        if ($scope.newUser) {
            messageManagerService.addNewUser($scope.newUser);
            $scope.newUser="";
        }

    };

    $window.onbeforeunload = function () {
        vm.logout($scope.userName);
    };

    vm.ajaxRequest = function (data,url) {

        $http({
            method: "POST",
            url: "http://localhost:8080/" + url,
            data: data,
            params: data
        }).then(vm.afterAjax, function (jqXHR, textStatus) {
            console.log("ajax fail" + textStatus);
        })

    };

    vm.afterAjax = function(response){
        console.log(response.data);
        if (response.data.mtype === "status") {
        } else if (response.data.mtype === "messages") {
            console.log("messages");
            messageManagerService.handleNewMessages(response.data.messages);
        } else if (response.data.mtype === "piggy") {
            console.log("piggy");
            if (response.data.eventStatus === "true") {
                console.log("event");
                vm.getMessagesFromServer();
            }
        }
        //$scope.apply();
    };
    vm.getMessagesFromServer = function () {
        var user = $scope.userName;
        var data = {name: user};
        vm.ajaxRequest(data,"get");
    };

    vm.logout = function(user){
        var data = {name: user};
        vm.ajaxRequest(data,"logout");
    };

}]);