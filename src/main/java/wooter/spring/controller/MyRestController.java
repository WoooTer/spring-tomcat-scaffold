package wooter.spring.controller;

import org.springframework.web.bind.annotation.*;
import wooter.pojo.Person;

@RestController
@RequestMapping("/rest")
public class MyRestController {

    @GetMapping("/hello")
    public String hello(){
        return "Hello Restfull!";
    }

    @PostMapping("/response-body")
    public Person responsebody(@RequestBody Person person) {
        return person;
    }
}
