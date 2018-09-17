package wooter.web.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import wooter.web.pojo.Person;

@RestController
@RequestMapping("/rest")
public class MyRestController {

    @RequestMapping("/hello")
    public String hello(){
        return "Hello Restfull";
    }

    @PostMapping("/reqbody")
    public String add(@RequestBody Person person) {
        return "reqbody OK";
    }
}
