package wooter.spring.aop.eg;

import org.springframework.stereotype.Component;

@Component
public class Dancer implements Performance {

    @Override
    public void perform(String content) {
        System.out.println("表演开始：" + content);
    }
}
