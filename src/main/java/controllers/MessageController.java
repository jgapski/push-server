package controllers;

import resources.Message;

import java.util.ArrayList;

public class MessageController {
    private ArrayList<Message> messages;

    public MessageController(){
        messages = new ArrayList<>();
    }

    public boolean isMessageForUser(String user){
        for ( Message m : messages) {
            if(m.getTo().equals(user)) return true;
        }
        return false;
    }

    public void addMessage(Message msg){
        messages.add(msg);
    }

    public ArrayList<Message> getMessagesToUser(String user){
        ArrayList<Message> tmpMessages = new ArrayList<>();
        for ( Message m : messages) {
            if(m.getTo().equals(user)){
                tmpMessages.add(m);
                messages.remove(messages.indexOf(m));
            }
        }

        return tmpMessages;
    }

}
