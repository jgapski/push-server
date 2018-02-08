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
    /**
     * adds an user with messages to the messasgeBoard
     * @param userBoard
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

    /**
     * adds a table of messages got from the serwer to the message board
     * @param messages a table of messaeges
     */
    messageManagerService.handleNewMessages = function (messages) {
        for (var index = 0; index < messages.length; index++){
            messageManagerService.addMessage(messages[index].from,messages[index]);
        }
    };

    /**
     * adds message to the userboard
     * @param user specifies userBoard
     * @param msg
     */
    messageManagerService.addMessage = function (user,msg) {
        var userBoard = messageManagerService.findBoardByUserName(user);
        if (userBoard) userBoard.messages.push(msg);
        else{
            userBoard = {user: user, event:true, messages: [msg]};
            messageManagerService.addUserBoard(userBoard);
        }
        userBoard.event = true;
    };

    /**
     * sets event value for specified userBoard
     * @param name
     * @param value
     */
    messageManagerService.setUserEvent = function(name,value){
        var userBoard = messageManagerService.findBoardByUserName(name);
        userBoard.event = value;
    };

    /**
     * adds new user to the messageBoard
     * @param newUser name of the user
     */
    messageManagerService.addNewUser = function (newUser) {
        var tmp = {user:newUser, event:false, messages:[]};
        messageManagerService.messageBoard.push(tmp);
    };

    return messageManagerService;
});