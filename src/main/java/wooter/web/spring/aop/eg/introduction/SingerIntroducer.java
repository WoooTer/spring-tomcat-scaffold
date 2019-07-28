package wooter.web.spring.aop.eg.introduction;

import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.DeclareParents;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class SingerIntroducer {

    /**
     * value 指定了哪个类的bean将会被引入@DeclareParents 注解的接口。在上面的例子中，
     * Performance 后面的加号表示的是所有 Performance的子类型，而不是 Performance 本身。
     *
     * defaultImpl 属性就指定了一个明确的 Singer 接口的实现类，只有接口是没用的，所以就需要用他来提供引入一个接口的具体实现。
     *
     * 那最后 @DeclareParents 注解的 Singer 就是要被引入的接口(Singer)了。注意这里是静态的。
     */
    @DeclareParents(value = "wooter.web.spring.aop.eg.Performance+", defaultImpl = BackSinger.class)
    public static Singer singer;
}
