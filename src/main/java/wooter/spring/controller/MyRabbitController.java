package wooter.spring.controller;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rabbit")
public class MyRabbitController {

    @Autowired
    RabbitTemplate rabbitTemplate;

    @GetMapping("/block")
    public String block(){
        rabbitTemplate.convertAndSend("myDirectExchange","myRoutingKey", "foo");
        String foo = (String) rabbitTemplate.receiveAndConvert("myQueue");
        return foo;
    }

    @GetMapping("/listener")
    public String listener(){
        try {
            rabbitTemplate.convertAndSend("myDirectExchange","myRoutingKey", "foo");
        } catch (Exception e){
            e.printStackTrace();
        }
        return "ok";
    }
}
