package controllers;

import resources.MyVectorIterator;

import java.util.Vector;
import java.util.Iterator;

public class UserController {
    private Vector<String> ActiveUsers;

    public UserController(){
        ActiveUsers = new Vector<>();
    }

    public boolean isActive(String name){
        MyVectorIterator<String> iterator = new MyVectorIterator(ActiveUsers);
        String user;
        while (iterator.hasNext()){
            user = (String) iterator.next();
            if (user.equals(name)) return true;
        }
        return false;
    }

    public void deleteUser(String name){
        ActiveUsers.remove(ActiveUsers.indexOf(name));
    }

    public void addUser(String name){
        ActiveUsers.add(name);
    }
}
