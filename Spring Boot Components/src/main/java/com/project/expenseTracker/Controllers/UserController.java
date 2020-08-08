package com.project.expenseTracker.Controllers;

import com.project.expenseTracker.Models.User;
import com.project.expenseTracker.Repository.UserRepo;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private UserRepo userRepo;

    public UserController(UserRepo userRepo1){
        super();
        this.userRepo=userRepo1;
    }

    @GetMapping("/allUsers")
    Collection<User> allUsers(){
        return (Collection<User>) userRepo.findAll();

    }

    @PostMapping("/login")
    ResponseEntity<?> validateLogin(@RequestBody User user){
        String password = user.getPassword();

        Optional<User> user1= userRepo.findById(user.getUsername());
        String username = user1.map(User::getUsername).toString().substring(9);
        String password1 = user1.map(User::getPassword).toString().substring(9);


        System.out.println("UserName: "+ username);
        if (username.equals("empty")){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }else {
            System.out.println("Password : " + password);
            System.out.println("Password1 : " + password1);

            int count = password1.length();
            password1=password1.substring(0,count-1);
            System.out.println("Password1 : " + password1);

            if(password.equals(password1)) {

                return user1.map(response -> ResponseEntity.ok().body(response))
                        .orElse(new ResponseEntity<>(HttpStatus.UNAUTHORIZED));
            }else
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/addUser")
    ResponseEntity<User> addUser(@RequestBody User user) throws URISyntaxException {
        User result = userRepo.save(user);

        return ResponseEntity.created(new URI(("/api/addUser")+result.getUsername())).body(result);
    }

}
