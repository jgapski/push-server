package controllers;

import java.util.ArrayList;

public class UserController {
    private ArrayList<String> ActiveUsers;

    public UserController(){
        ActiveUsers = new ArrayList<>();
    }

    public boolean isActive(String name){
        for (String user : ActiveUsers) {
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
