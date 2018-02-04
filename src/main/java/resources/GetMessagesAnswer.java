package resources;

import interfaces.Answer;

import java.util.ArrayList;

public class GetMessagesAnswer implements Answer {

    private String mtype;
    private ArrayList<Message> messages;

    public GetMessagesAnswer(ArrayList<Message> messages, String atype) {
        this.mtype = atype;
        this.messages =  new ArrayList<>(messages);
    }

    public String getMtype() {
        return mtype;
    }

    public void setMtype(String mtype) {
        this.mtype = mtype;
    }

    public ArrayList<Message> getMessages() {
        return messages;
    }

    public void setMessages(ArrayList<Message> messages) {
        this.messages = messages;
    }
}
