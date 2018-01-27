package server.model;

public class MessageReceived implements MessageDecorator{
    private Pig pig;
    private String sender;
    private String content;
    public MessageReceived(){};
    public MessageReceived(IMessage message){
        this.sender = message.getSender();
        this.content = message.getContent();
    }
    public void decorate(){
        this.pig = new SimplePigFactory().createPig("pig content");
    }
    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Pig getPig() {
        return pig;
    }

    public void setPig(Pig pig) {
        this.pig = pig;
    }

}
