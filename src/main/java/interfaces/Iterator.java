package interfaces;

import java.util.Vector;

public interface Iterator<E> {
    public E next();
    public boolean hasNext();
    public void remove();
}
