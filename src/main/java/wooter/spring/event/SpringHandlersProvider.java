package wooter.spring.event;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import java.util.concurrent.atomic.AtomicBoolean;

@Component
public class SpringHandlersProvider implements ApplicationListener<ContextRefreshedEvent> {

    private final Logger log = LoggerFactory.getLogger(getClass());

    private volatile AtomicBoolean isInit = new AtomicBoolean(false);

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        //防止重复触发
        if(!isInit.compareAndSet(false,true)) {
            return;
        }
        //do something
        log.error("ContextRefreshedEvent fire!");
    }
}
