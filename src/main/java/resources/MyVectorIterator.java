package resources;

import interfaces.Iterator;

import java.util.Vector;

public class MyVectorIterator<E> implements Iterator {

    public MyVectorIterator(Vector vector) {
        this.vector = vector;
        this.currItem = 0;
    }

    private Vector vector;
    private int currItem = 0;

    @Override
    public Object next() {
        if (hasNext()) {
            return vector.get(currItem++);
        } else return null;
    }

    @Override
    public boolean hasNext() {
        if (currItem < vector.size()) return true;
        else return false;
    }

    @Override
    public void remove() {
        vector.remove(--currItem);
    }
}
