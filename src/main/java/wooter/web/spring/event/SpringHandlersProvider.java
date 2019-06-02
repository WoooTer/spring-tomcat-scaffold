package wooter.web.spring.event;

import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import java.util.concurrent.atomic.AtomicBoolean;

@Component
public class SpringHandlersProvider implements ApplicationListener<ContextRefreshedEvent> {

    private volatile AtomicBoolean isInit = new AtomicBoolean(false);

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        //防止重复触发
        if(!isInit.compareAndSet(false,true)) {
            return;
        }
        //do something
        System.out.println("ContextRefreshedEvent fire!");
    }
}
