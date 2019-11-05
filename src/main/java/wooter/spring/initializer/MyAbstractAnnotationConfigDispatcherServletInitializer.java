package wooter.spring.initializer;

import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;
import wooter.spring.config.MyRabbitConfig;
import wooter.spring.config.MyRootConfig;
import wooter.spring.config.MyWebConfig;
import wooter.spring.config.MyWebSocketConfig;

import javax.servlet.Filter;

public class MyAbstractAnnotationConfigDispatcherServletInitializer extends AbstractAnnotationConfigDispatcherServletInitializer {

    @Override
    protected Class<?>[] getRootConfigClasses() {
        return new Class<?>[] { MyRootConfig.class, MyRabbitConfig.class};
    }

    @Override
    protected Class<?>[] getServletConfigClasses() {
        return new Class<?>[] { MyWebConfig.class, MyWebSocketConfig.class};
    }

    @Override
    protected String[] getServletMappings() {
        return new String[] { "/app/*" };
    }

    @Override
    protected Filter[] getServletFilters() {
        return new Filter[]{};
    }
}
