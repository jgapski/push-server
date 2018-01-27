package server.model;

public class SimplePigFactory {
    public Pig createPig(String content){
        return new Pig(content);
    }
}
