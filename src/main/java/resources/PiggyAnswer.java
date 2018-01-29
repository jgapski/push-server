package resources;

public class PiggyAnswer extends Answer {
    private Answer answer;
    private String eventStatus;

    public PiggyAnswer(Answer answer, String eventStatus) {
        super("piggy");
        this.answer = answer;
        this.eventStatus = eventStatus;
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
