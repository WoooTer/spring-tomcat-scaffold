package wooter.web.spring.aop.eg;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class Audience {
    @Pointcut("execution(* wooter.web.spring.aop.eg.Performance.perform(..))")
    public void foundPerform(){}

    @Before("foundPerform()")
    public void slienceCellPhones(){
        System.out.println("关掉手机");
    }

    @Before("foundPerform()")
    public void takeSeats() {
        System.out.println("找到座位");
    }

    @AfterReturning("foundPerform() && args(content,..)")
    public void applause(String content) {
        System.out.println(content + "好好好！！鼓掌");
    }

    @AfterThrowing("foundPerform()")
    public  void demandRefund() {
        System.out.println("退票！ 退票！ ");
    }

    //环绕的 before和 after都会优先执行
    @Around("foundPerform()")
    public void watchPerformance(ProceedingJoinPoint jp) {
        try {
            System.out.println("手机静音");
            System.out.println("得到座位");
            jp.proceed();
            System.out.println("鼓掌!!!");
        } catch (Throwable e) {
            System.out.println("这演的啥啊！退票");
        }
    }
}
