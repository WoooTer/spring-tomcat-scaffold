package wooter.spring.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan({"wooter.spring.event", "wooter.spring.utils"})
public class MyRootConfig {

}
