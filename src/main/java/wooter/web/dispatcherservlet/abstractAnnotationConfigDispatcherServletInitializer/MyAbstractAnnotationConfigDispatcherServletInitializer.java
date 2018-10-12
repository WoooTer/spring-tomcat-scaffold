package wooter.web.dispatcherservlet.abstractAnnotationConfigDispatcherServletInitializer;

import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;
import wooter.web.config.MyRootConfig;
import wooter.web.config.MyWebConfig;
import wooter.web.config.MyWebSocketConfig;

import javax.servlet.Filter;

public class MyAbstractAnnotationConfigDispatcherServletInitializer extends AbstractAnnotationConfigDispatcherServletInitializer {

    @Override
    protected Class<?>[] getRootConfigClasses() {
        return new Class<?>[] { MyRootConfig.class };
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
