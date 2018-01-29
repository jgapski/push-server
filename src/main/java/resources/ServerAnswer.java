package resources;

public class ServerAnswer  extends Answer{
    private String status;

    public ServerAnswer(String status) {
        super("status");
        this.status = status;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
