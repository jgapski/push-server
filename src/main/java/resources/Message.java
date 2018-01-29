package resources;

public class Message {

    private String from;

    public String getContent() {
        return content;
    }

    private String to;

    public void setContent(String content) {
        this.content = content;
    }

    private String content;

    public Message(String f, String t, String c){
        from = f;
        to = t;
        content = c;
    }

    public  Message(){
        from = "me";
        to = "me";
        content = "elo";
    }

    public String getFrom() {
        return from;
    }

    public void setFrom(String from) {
        this.from = from;
    }

    public String getTo() {
        return to;
    }

    public void setTo(String to) {
        this.to = to;
    }
}
