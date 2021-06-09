package com.poosh.app.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

@Configuration
@EnableScheduling
public class SpringConfig {

//    @Scheduled(cron = "0 */1 * * * *")
//    public void scheduleTaskUsingCronExpression() {
//        System.out.println("paula");
//    }
}
