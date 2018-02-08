package controllers;

import java.util.ArrayList;
import java.util.Iterator;

public class UserController {
    private ArrayList<String> ActiveUsers;

    public UserController(){
        ActiveUsers = new ArrayList<>();
    }

    public boolean isActive(String name){
        Iterator<String> iterator = ActiveUsers.iterator();
        String user;
        while (iterator.hasNext()){
            user = iterator.next();
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
