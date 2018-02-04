angular.module("servicesModule",[])

.service("mainChatService",function () {
    var mainChatService = {};

    mainChatService.appTitle = "Fake Chat App";
    mainChatService.userName = "";

    mainChatService.setUserName = function (userName) {
        mainChatService.userName = userName;
    };


    return mainChatService;
})

.service("messageManagerService", function () {
    var messageManagerService = {};

    messageManagerService.userName = "";

    messageManagerService.setUserName = function (userName) {
        messageManagerService.userName = userName;
    };

    messageManagerService.messageBoard = [];


    /*
    messageManagerService.messageBoard = [
        {user:"user1", event: false, messages:[
                {from:"user1", to:"me", content:"Hej"},
                {from:"me", to:"user1", content:"Uszanowanko!"},
                {from:"user1", to:"me", content:"Wyrazy Szacunku!"}
            ]},
        {user:"user2", event: false, messages:[
                {from:"user2", to:"me", content:"Hej"},
                {from:"me", to:"user2", content:"randomowa wiadomosc!"},
                {from:"user2", to:"me", content:"lorem ipsum"},
                {from:"me", to:"user2", content:"mesage"}

            ]}
    ];
    */

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
            userBoard = {user: user, event:true, messages: [msg]};
            messageManagerService.addUserBoard(userBoard);
        }
        userBoard.event = true;
    };

    messageManagerService.setUserEvent = function(name,value){
        var userBoard = messageManagerService.findBoardByUserName(name);
        userBoard.event = value;
    };

    messageManagerService.addNewUser = function (newUser) {
        var tmp = {user:newUser, event:false, messages:[]};
        messageManagerService.messageBoard.push(tmp);
    };


    messageManagerService.ajaxRequest = function (data,url) {

        $.ajax({
            method: "POST",
            url: "http://localhost:8080/" + url,
            data: data
        }).done(messageManagerService.afterAjax)
            .fail( function (jqXHR, textStatus) {
            console.log("ajax fail" + textStatus);
        });

    };

    messageManagerService.afterAjax = function(data){
        console.log(data);

        if (data.mtype === "status") {

        } else if (data.mtype === "messages") {
            console.log("messages");
            messageManagerService.handleNewMessages(data.messages);


        } else if (data.mtype === "piggy") {
            console.log("piggy");
            if (data.eventStatus === "true") {
                console.log("event");
                messageManagerService.getMessagesFromServer();
            }
        }

    };

    messageManagerService.sendMessage = function (message) {
        //messageManagerService.addMessage();
        messageManagerService.setUserEvent(message.to , false);
        messageManagerService.ajaxRequest(message,"message");
    };

    messageManagerService.getMessagesFromServer = function () {
        var user = messageManagerService.userName;
        var data = {name: user};
        messageManagerService.ajaxRequest(data,"get");

    };

    messageManagerService.logout = function(user){
        var data = {name: user};
        messageManagerService.ajaxRequest(data,"logout");
    };

    return messageManagerService;
});