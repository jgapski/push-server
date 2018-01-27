package server.controller;

import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import server.model.*;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class MessageController {

    @MessageMapping("/chat/login")
    @SendTo("/topic/users")
    public User addUser(@Payload User user,
                               SimpMessageHeaderAccessor headerAccessor) {
        // Add username in web socket session
        headerAccessor.getSessionAttributes().put("username", user.getName());

        return user;
    }

    @MessageMapping("inbox")
    @SendTo("/topic/messages")
    public MessageReceived send(Message message) throws InterruptedException {
        Thread.sleep(1000);
        MessageReceived messageReceived = new MessageReceived(message);
        return messageReceived;
    }

}
