package wooter.spring.aop;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import wooter.spring.aop.eg.Performance;
import wooter.spring.aop.eg.introduction.Singer;
import wooter.spring.config.MyAopConfig;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = {MyAopConfig.class})
public class AopTest {

    @Autowired
    Performance performance;

    @Test
    public void performanceTest() {
        performance.perform("跳舞");
    }
    @Test
    public void introductionTest(){
        Singer singer = (Singer) performance;
        singer.sing();
    }
}
