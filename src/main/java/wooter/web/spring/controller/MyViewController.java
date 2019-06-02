package wooter.web.spring.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/view")
public class MyViewController {

    @RequestMapping("/hello")
    public String hello(Model model) {
        model.addAttribute("key", "value");
        return "helloJsp";
    }

    @RequestMapping("/websocket")
    public String websocket() {
        return "websocketPage";
    }
}
