package server.controller;

import server.model.Message;
import server.model.MessageReceived;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class MessageController {


    @MessageMapping("/senderInbox/{sender}")
    @SendTo("/topic/messages")
    public MessageReceived send(@DestinationVariable String sender, Message message) throws Exception {
        Thread.sleep(1000); // simulated delay
        return new MessageReceived(sender,message.getContent());
    }

    @MessageMapping("receiverInbox/{recipient}")
    @SendTo("/topic/messages")
    public MessageReceived receive(@DestinationVariable String recipient, Message message) throws InterruptedException {
        Thread.sleep(1000);
        MessageReceived messageReceived = new MessageReceived(message.getSender(), message.getContent());
        return messageReceived;
    }


}
