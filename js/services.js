angular.module("servicesModule",[])

.service("mainChatService",function () {
    var mainChatService = {};

    mainChatService.appTitle = "Fake Chat App";
    mainChatService.userName = "";

    mainChatService.setUserName = function (userName) {
        mainChatService.userName = userName;
    };

    mainChatService.validateName = function (name) {
        if (!name) return false;
        return true;
    };

    return mainChatService;
})

.service("messageManagerService", function () {
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

    messageManagerService.addUserBoard = function (userBoard) {
        messageManagerService.messageBoard.push(userBoard);
    };

    messageManagerService.findBoardByUserName = function (user) {
        element = _.find(messageManagerService.messageBoard, function (el) {
            return el.user === user;
        });
        return element;
    };

    messageManagerService.handleNewMessages = function (messages) {
        for (var index = 0; index < messages.length; index++){
            messageManagerService.addMessage(messages[index].from,messages[index]);
        }
    };

    messageManagerService.addMessage = function (user,msg) {
        var userBoard = messageManagerService.findBoardByUserName(user);
        if (userBoard) userBoard.messages.push(msg);
        else{
            userBoard = {user: user, messages: [msg]};
            messageManagerService.addUserBoard(userBoard);
        }
    };

    messageManagerService.addNewUser = function (newUser) {
        var tmp = {user:newUser, messages:[]};
        messageManagerService.messageBoard.push(tmp);
    };

    return messageManagerService;
})

.service("webCommunicationService", function () {
    webCommunicationService = {};

    webCommunicationService.ajaxRequest = function (request) {
        $.ajax({
            method: "POST",
            url: "http://localhost:8080/chat",
            data: JSON.stringify(request)
        }).done(function( data ) {
            alert("---    " + data);
            console.log(data);
        }).fail( function (jqXHR, textStatus) {
            console.log("ajax fail" + textStatus);
        });
    };

    webCommunicationService.sendMessage = function (user,message) {
        var request = {
            user: user,
            type: "msg",
            content : message
        };
        webCommunicationService.ajaxRequest(request);
    };


    webCommunicationService.getMessagesFromServer = function (user) {
        var request = {
            user: user,
            type: "get",
            content : ""
        };
        data = webCommunicationService.ajaxRequest(request);

    };

    webCommunicationService.logout = function(name){

    };

    return webCommunicationService;
});