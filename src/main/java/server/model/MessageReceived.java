package server.model;

public class MessageReceived {
    private String sender;
    private String content;

    private Pig pig;
    public MessageReceived() {
    }

    public MessageReceived(String sender, String content) {
        this.sender = sender;
        this.content = content;
    }

    public String getContent() {
        return content;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public Pig getPig() {
        return pig;
    }

    public void setPig(Pig pig) {
        this.pig = pig;
    }
}
