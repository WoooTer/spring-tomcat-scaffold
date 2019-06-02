package wooter.web.spring.rabbit;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

//@Component
public class MsgConsumer {

    @RabbitListener(queues = "myQueue")
    public void myQueue(String data) {
        System.out.println(data);
    }
}
