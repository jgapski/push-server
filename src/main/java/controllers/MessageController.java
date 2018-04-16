package controllers;

import resources.Message;
import resources.MyVectorIterator;
import java.util.Vector;

public class MessageController {
    private Vector<Message> messages;
    private static boolean isInstance = false;
    private static MessageController instance;

    private MessageController(){
        messages = new Vector<>();
        isInstance = true;
    }

    public static MessageController getInstance(){
        if (!isInstance) instance = new MessageController();
        return instance;
    }

    public boolean isMessageForUser(String user){
        MyVectorIterator<Message> MyVectorIterator = new MyVectorIterator<>(messages);
        Message tmp;
        while (MyVectorIterator.hasNext()){
            tmp = (Message) MyVectorIterator.next();
            if (tmp.getTo().equals(user)){
                return true;
            }
        }
        return false;
    }

    public void addMessage(Message msg){
        messages.add(msg);
    }

    public Vector<Message> getMessagesToUser(String user){
        Vector<Message> tmpMessages = new Vector<>();
        MyVectorIterator<Message> MyVectorIterator = new MyVectorIterator<>(messages);
        Message m;

        while (MyVectorIterator.hasNext()){
            m = (Message) MyVectorIterator.next();
            if(m.getTo().equals(user)){
                tmpMessages.add(m);
                MyVectorIterator.remove();
            }
        }
        return tmpMessages;
    }

    public void printMesssages(){
        MyVectorIterator<Message> iterator = new MyVectorIterator<>(messages);
        Message m;
        while (iterator.hasNext()){
            m = (Message) iterator.next();
            System.out.println("from: " + m.getFrom() + "   to: " + m.getTo() + "  content: " + m.getContent());
        }

    }

}
