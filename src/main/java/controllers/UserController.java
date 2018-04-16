package controllers;

import resources.MyVectorIterator;
import java.util.Vector;

public class UserController {
    private Vector<String> ActiveUsers;
    private static boolean isInstance = false;
    private static UserController instance;

    private UserController(){
        ActiveUsers = new Vector<>();
        isInstance = true;
    }

    public static UserController getInstance() {
        if(!isInstance) instance = new UserController();
        return instance;
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
