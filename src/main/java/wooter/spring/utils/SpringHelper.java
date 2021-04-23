package wooter.spring.utils;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;

@Component
public class SpringHelper implements ApplicationContextAware {

    @Autowired
    private static ApplicationContext context;

    public synchronized static Object getBean(String name) {
        return context.getBean(name);
    }

    public synchronized static <T> T getBean(Class<T> type) {
        return context.getBean(type);
    }

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        SpringHelper.context = applicationContext;
    }
}
