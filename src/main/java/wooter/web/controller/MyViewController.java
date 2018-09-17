package wooter.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class MyViewController {

    @RequestMapping("/home")
    public String handle(Model model) {
        model.addAttribute("message", "Hello World!");
        return "index";
    }
}
