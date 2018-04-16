package resources;

import interfaces.Answer;

public class ServerAnswer  implements Answer {
    private String status;
    private String mtype;

    public ServerAnswer(String status, String atype) {
        this.mtype = atype;
        this.status = status;
    }

    public String getMtype() {
        return mtype;
    }

    public void setMtype(String mtype) {
        this.mtype = mtype;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
