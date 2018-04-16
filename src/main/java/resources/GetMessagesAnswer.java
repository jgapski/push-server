package resources;

import interfaces.Answer;

import java.util.Vector;

public class GetMessagesAnswer implements Answer {

    private String mtype;
    private Vector<Message> messages;

    public GetMessagesAnswer(Vector<Message> messages, String atype) {
        this.mtype = atype;
        this.messages =  new Vector<>(messages);
    }

    public String getMtype() {
        return mtype;
    }

    public void setMtype(String mtype) {
        this.mtype = mtype;
    }

    public Vector<Message> getMessages() {
        return messages;
    }

    public void setMessages(Vector<Message> messages) {
        this.messages = messages;
    }
}
