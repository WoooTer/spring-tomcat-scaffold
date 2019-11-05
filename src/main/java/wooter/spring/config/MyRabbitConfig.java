package wooter.spring.config;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.ShutdownSignalException;
import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.annotation.EnableRabbit;
import org.springframework.amqp.rabbit.config.SimpleRabbitListenerContainerFactory;
import org.springframework.amqp.rabbit.connection.*;
import org.springframework.amqp.rabbit.core.RabbitAdmin;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.rabbit.listener.SimpleMessageListenerContainer;
import org.springframework.amqp.rabbit.listener.api.ChannelAwareMessageListener;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableRabbit
@ComponentScan("wooter.spring.rabbit")
public class MyRabbitConfig {

    @Bean
    public ConnectionFactory connectionFactory() {
        CachingConnectionFactory factory = new CachingConnectionFactory("47.98.118.73", 5672);
        factory.setUsername("auxyl");
        factory.setPassword("auxyl2019");

        factory.setPublisherConfirms(true);
        factory.setPublisherReturns(true);

        factory.addChannelListener(new ChannelListener() {
            @Override
            public void onCreate(Channel channel, boolean transactional) {
                System.out.println("channel on create");
            }
            @Override
            public void onShutDown(ShutdownSignalException signal) {
                System.out.println("channel on shutdown: " + signal.getMessage());
            }
        });
        return factory;
    }

    @Bean
    public AmqpAdmin amqpAdmin() {
        return new RabbitAdmin(connectionFactory());
    }

    @Bean
    public RabbitTemplate rabbitTemplate() {
        RabbitTemplate template = new RabbitTemplate(connectionFactory());
//        template.setChannelTransacted(true);
        return template;
    }

    @Bean
    public SimpleRabbitListenerContainerFactory rabbitListenerContainerFactory() {
        SimpleRabbitListenerContainerFactory factory = new SimpleRabbitListenerContainerFactory();
        factory.setConnectionFactory(connectionFactory());
        factory.setConcurrentConsumers(3);
        factory.setMaxConcurrentConsumers(10);
        return factory;
    }

    @Bean
    DirectExchange myDirectExchange() {
        return new DirectExchange("myDirectExchange");
    }

    @Bean
    public Queue myQueue() {
        return new Queue("myQueue");
    }

    @Bean
    Binding myRouteBinding() {
        return BindingBuilder.bind(myQueue()).to(myDirectExchange()).with("myRoutingKey");
    }

}
