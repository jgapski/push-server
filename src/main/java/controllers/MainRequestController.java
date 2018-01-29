package controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import resources.*;

@RestController
public class MainRequestController {

    private MessageController messageController = new MessageController();
    private UserController userController = new UserController();

    @CrossOrigin(origins = "http://localhost:63342")
    @RequestMapping("/login")
    public Answer login(@RequestParam(value="name") String name) {
        if (userController.isActive(name)) return new ServerAnswer("error");
        else {
            userController.addUser(name);
            return new ServerAnswer("ok");
        }
    }

    @CrossOrigin(origins = "http://localhost:63342")
    @RequestMapping("/get")
    public Answer get(@RequestParam(value="name") String name) {
        return new GetMessagesAnswer(messageController.getMessagesToUser(name));
    }


    @CrossOrigin(origins = "http://localhost:63342")
    @RequestMapping("/message")
    public Answer message( @RequestParam(value="from") String from,
                           @RequestParam(value="to") String to,
                           @RequestParam(value="content") String content
                           ) {
        Message msg = new Message(from,to,content);
        //System.out.println(from + " f    t " + to + " t    c " + content);
        messageController.addMessage(msg);
        String user = msg.getFrom();
        Answer ans;
        if (messageController.isMessageForUser(user)){
            ans = new ServerAnswer("ok");
            return new PiggyAnswer(ans,"true");
        }
        return new ServerAnswer("ok");
    }

    @CrossOrigin(origins = "http://localhost:63342")
    @RequestMapping("/logout")
    public Answer logout(@RequestParam(value="name") String name) {
        if (userController.isActive(name)) userController.deleteUser(name);
        return new ServerAnswer("ok");
    }
}
