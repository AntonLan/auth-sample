package com.auth.sample.aspect;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.Arrays;

/**
 * The class manages the implementation of logging.
 * <p>
 * The spring-aspects used to add a components with the need for logging.
 *
 * @see Aspect
 * @see Pointcut
 * @see AfterReturning
 * @see AfterThrowing
 * @see Around
 */
@Aspect
@Component
public class LoggingHandler {

    private final Logger log = LoggerFactory.getLogger(this.getClass());

    @Pointcut("execution(* com.auth.sample.web.controller.v1.AuthRestController.*(..))")
    public void restClientController() {
    }

    @AfterReturning(pointcut = "restClientController()", returning = "result")
    public void logAfter(JoinPoint joinPoint, Object result) {
        log.info("Entering in Method :  " + joinPoint.getSignature().getName() +
                ", Class Name :  " + joinPoint.getSignature().getDeclaringTypeName() +
                ", Arguments :  " + Arrays.toString(joinPoint.getArgs()) +
                ", Target class : " + joinPoint.getTarget().getClass().getName());
    }

    @AfterThrowing(pointcut = "restClientController()", throwing = "exception")
    public void logAfterThrowing(JoinPoint joinPoint, Throwable exception) {
        log.error("An exception has been thrown in " + joinPoint.getSignature().getName() + "()");
        log.error("Cause : " + exception.getCause());
    }

    @Around("restClientController()")
    public Object logAround(ProceedingJoinPoint joinPoint) throws Throwable {
        long start = System.currentTimeMillis();
        try {
            String className = joinPoint.getSignature().getDeclaringTypeName();
            String methodName = joinPoint.getSignature().getName();
            Object result = joinPoint.proceed();
            long elapsedTime = System.currentTimeMillis() - start;
            log.info("Around method " + className + "." + methodName + " ()" + " execution time : " + elapsedTime + " ms");
            return result;
        } catch (IllegalArgumentException exception) {
            log.error("Illegal argument " + Arrays.toString(joinPoint.getArgs()) + " in " + joinPoint.getSignature().getName() + "()");
            throw exception;
        }
    }
}