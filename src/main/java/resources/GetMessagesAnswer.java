package resources;

import java.util.ArrayList;

public class GetMessagesAnswer extends Answer {
    private ArrayList<Message> messages;

    public GetMessagesAnswer(ArrayList<Message> messages) {
        super("messages");
        this.messages =  new ArrayList<>(messages);
    }

    public ArrayList<Message> getMessages() {
        return messages;
    }

    public void setMessages(ArrayList<Message> messages) {
        this.messages = messages;
    }
}
