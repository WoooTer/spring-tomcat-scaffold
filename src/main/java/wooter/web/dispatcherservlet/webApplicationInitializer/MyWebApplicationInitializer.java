package wooter.web.dispatcherservlet.webApplicationInitializer;

import org.springframework.web.WebApplicationInitializer;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.springframework.web.servlet.DispatcherServlet;
import wooter.web.config.MyWebConfig;
import wooter.web.servlet.MySyncServlet;

import javax.servlet.ServletContext;
import javax.servlet.ServletRegistration;

public class MyWebApplicationInitializer implements WebApplicationInitializer {

    @Override
    public void onStartup(ServletContext servletCxt) {

        MySyncServlet mySyncServlet = new MySyncServlet();
        ServletRegistration.Dynamic mySyncServletRegistration = servletCxt.addServlet("mySyncServlet", mySyncServlet);
        mySyncServletRegistration.addMapping("/serv/sync");

    }

    @Deprecated
    private void initDispatcherServlet(ServletContext servletCxt){
        // Load Spring web application configuration
        AnnotationConfigWebApplicationContext ac = new AnnotationConfigWebApplicationContext();
        ac.setServletContext(servletCxt);
        ac.register(MyWebConfig.class);
        ac.refresh();

        // Create and register the DispatcherServlet
        DispatcherServlet servlet = new DispatcherServlet(ac);
        ServletRegistration.Dynamic registration = servletCxt.addServlet("dispatcher", servlet);
        registration.setLoadOnStartup(1);
        registration.addMapping("/dispatcher/*");
    }
}
