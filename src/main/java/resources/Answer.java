package resources;

public abstract class  Answer {

    private String atype;

    public Answer(String type) {
        this.atype = type;
    }

    public String getAtype() {
        return atype;
    }

    public void setAtype(String atype) {
        this.atype = atype;
    }
}
