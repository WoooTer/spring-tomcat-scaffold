package wooter.web.spring.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan({"wooter.web.spring.event"})
public class MyRootConfig {
}
