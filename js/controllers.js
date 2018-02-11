angular.module("controllersModule",[])

.controller("indexController",["$scope", "$location", "mainChatService", function ($scope, $location, mainChatService) {
    $scope.appTitle = mainChatService.appTitle;
    $scope.userName = "";

    /**
     * validate at server-side if entered username is already taken
     */
    $scope.validateName = function () {
        console.log("login");
        if ($scope.userName){
            console.log("username correct");
            $.ajax({
                method: "POST",
                url: "http://localhost:8080/login",
                data: {name: $scope.userName}
            }).done(function( data ) {
                if (data.status === "ok") {
                    $scope.saveName();
                    } else alert("Username already taken");
            }).fail( function (jqXHR, textStatus) {
                console.log("ajax fail" + textStatus);
            });
        }

    };

    /**
     * saves validated username
     */
    $scope.saveName = function () {
        mainChatService.setUserName($scope.userName);
        $location.path("/main");
        $scope.$apply();
    };

}])

.controller("mainAppController", ["$scope", "$location", "$window", "$http", "mainChatService", "messageManagerService",
    function ($scope, $location, $window, $http, mainChatService, messageManagerService) {
    $scope.appTitle = mainChatService.appTitle;
    $scope.userName = mainChatService.userName;
    $scope.activeUser = "";
    $scope.newUser ="";

    $scope.messagePrototype = {
        from: $scope.userName,
        to:$scope.activeUser,
        content:"",

        clone : function () {
            var msg = {};
            msg.from = this.from;
            msg.to = this.to;
            msg.content  = this.content;

            return msg;
        }
    };

    $scope.messageBoard = messageManagerService.messageBoard;

        var vm = this;

    if (!$scope.userName) $location.path("/");

        /**
         * chages the current conwersation to the one with prowided user
         * @param user String desired user to have conversation with
         */
    $scope.setActiveUser = function (user) {
        $scope.activeUser = user;
        $scope.messagePrototype.to = user;
        messageManagerService.setUserEvent(user, false);
    };


        /**
         * send message to the serwer
         */
    $scope.sendMessage = function () {
        var message = $scope.messagePrototype.clone();
        if (message.content && message.to && message.from){
            vm.HTTPRequest(message,"message");
            messageManagerService.addMessage($scope.activeUser,message);
            $scope.messagePrototype.content = "";
            messageManagerService.setUserEvent($scope.activeUser, false);
        }
    };
        /**
         * add new User to the lists of conwersations
         */
    $scope.addNewUser = function () {
        if ($scope.newUser) {
            messageManagerService.addNewUser($scope.newUser);
            $scope.newUser="";
        }

    };

        /**
         * performs a http request
         * @param data data to be send (Js object)
         * @param url url suffix e.q 'login'
         */
    vm.HTTPRequest = function (data, url) {
        $http({
            method: "POST",
            url: "http://localhost:8080/" + url,
            data: data,
            params: data
        }).then(vm.afterHTTPRequest, function (jqXHR, textStatus) {
            console.log("ajax fail" + textStatus);
        })

    };
        /**
         * callback function, handles serwer response
         * @param response server response
         */
    vm.afterHTTPRequest = function(response){
        console.log(response.data);
        if (response.data.mtype === "status") {

        } else if (response.data.mtype === "messages") {
            console.log("messages");
            messageManagerService.handleNewMessages(response.data.messages);
        } else if (response.data.mtype === "piggy") {

            console.log("piggy");
            if (response.data.eventStatus === "true") {
                $scope.getMessagesFromServer();
            }
        }
    };
        /**
         * function creates a http request to get messages from serwer
         */
    $scope.getMessagesFromServer = function () {
        //var user = $scope.userName;
        var data = {name: $scope.userName};
        vm.HTTPRequest(data,"get");
    };

        /**
         * logs user out from the serwer
         * @param user
         */
    vm.logout = function(user){
        var data = {name: user};
        vm.HTTPRequest(data,"logout");
    };

        /**
         * function called when exiting application
         */
    $window.onbeforeunload = function () {
        vm.logout($scope.userName);
    };

}]);