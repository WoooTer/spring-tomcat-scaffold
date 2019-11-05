package wooter.spring.rabbit;

import com.rabbitmq.client.Channel;
import org.springframework.amqp.core.AcknowledgeMode;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.listener.SimpleMessageListenerContainer;
import org.springframework.amqp.rabbit.listener.api.ChannelAwareMessageListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import wooter.spring.config.MyRabbitConfig;

@Component
public class MsgContainerConsumer {

    @Autowired
    MyRabbitConfig myRabbitConfig;

    @Bean
    public SimpleMessageListenerContainer checkSheetMessageContainer() {
        SimpleMessageListenerContainer container = new SimpleMessageListenerContainer(myRabbitConfig.connectionFactory());
        container.setQueues(myRabbitConfig.myQueue());
        container.setExposeListenerChannel(true);
        container.setAcknowledgeMode(AcknowledgeMode.AUTO);
        container.setMessageListener(new ChannelAwareMessageListener() {
            @Override
            public void onMessage(Message message, Channel channel) throws Exception{
                String messageBody = new String(message.getBody(), "UTF-8");
                System.out.println(messageBody);
            }
        });
        return container;
    }
}
