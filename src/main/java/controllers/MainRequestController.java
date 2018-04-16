package controllers;

import interfaces.Answer;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import resources.*;

@RestController
public class MainRequestController {

    private final String origin = "http://localhost:63343";
    private MessageController messageController = MessageController.getInstance();
    private UserController userController = UserController.getInstance();

    @CrossOrigin(origins = origin)
    @RequestMapping(value = "/login")
    public Answer login(@RequestParam(value="name") String name) {
        if (userController.isActive(name)) return new ServerAnswer("error","status");
        else {
            userController.addUser(name);
            return new ServerAnswer("ok", "status");
        }
    }

    @CrossOrigin(origins = origin)
    @RequestMapping("/get")
    public Answer get(@RequestParam(value="name") String name) {
        if(messageController.isMessageForUser(name)) {
            return new GetMessagesAnswer(messageController.getMessagesToUser(name), "messages");
        } else {
            return new ServerAnswer("ok", "status");
        }
    }


    @CrossOrigin(origins = origin)
    @RequestMapping("/message")
    public Answer message( @RequestParam(value="from") String from,
                           @RequestParam(value="to") String to,
                           @RequestParam(value="content") String content
                           ) {
        Message msg = new Message(from,to,content);
        messageController.addMessage(msg);
        String user = msg.getFrom();
        Answer ans;
        if (messageController.isMessageForUser(user)){
            ans = new ServerAnswer("ok", "status");
            return new PiggyAnswer("piggy", ans, "true");
        }
        return new ServerAnswer("ok", "status");
    }

    @CrossOrigin(origins = origin)
    @RequestMapping("/logout")
    public Answer logout(@RequestParam(value="name") String name) {
        System.out.println(name);
        if (userController.isActive(name)) userController.deleteUser(name);
        return new ServerAnswer("ok", "status");
    }
}
