package wooter.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/view")
public class MyViewController {

    @RequestMapping("/spittr")
    public String handle(Model model) {
        model.addAttribute("message", "Hello World!");
        return "views/spittr";
    }
}
