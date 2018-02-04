package resources;

import interfaces.Answer;
import interfaces.PiggybackDecorator;

public class PiggyAnswer implements PiggybackDecorator, Answer {
    private String mtype;
    private Answer answer;
    private String eventStatus;

    public PiggyAnswer(String mtype, Answer answer, String eventStatus) {
        this.mtype = mtype;
        this.answer = answer;
        this.eventStatus = eventStatus;
    }

    public String getMtype() {
        return mtype;
    }

    public void setMtype(String mtype) {
        this.mtype = mtype;
    }

    public Answer getAnswer() {
        return answer;
    }

    public void setAnswer(Answer answer) {
        this.answer = answer;
    }

    public String getEventStatus() {
        return eventStatus;
    }

    public void setEventStatus(String eventStatus) {
        this.eventStatus = eventStatus;
    }
}
