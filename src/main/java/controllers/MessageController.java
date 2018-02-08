package controllers;

import resources.Message;

import java.util.ArrayList;
import java.util.Iterator;

public class MessageController {
    private ArrayList<Message> messages;

    public MessageController(){
        messages = new ArrayList<>();
    }

    public boolean isMessageForUser(String user){
        Iterator<Message> iterator = messages.iterator();
        Message tmp;
        while (iterator.hasNext()){
            tmp = iterator.next();
            if (tmp.getTo().equals(user)){
                return true;
            }
        }
        return false;
    }

    public void addMessage(Message msg){
        messages.add(msg);
    }

    public ArrayList<Message> getMessagesToUser(String user){
        ArrayList<Message> tmpMessages = new ArrayList<>();
        Iterator<Message> iterator = messages.iterator();
        Message m;

        while (iterator.hasNext()){
            m = iterator.next();
            if(m.getTo().equals(user)){
                tmpMessages.add(m);
                iterator.remove();
            }
        }
        return tmpMessages;
    }

}
