package com.pelosi.task;

import com.pelosi.task.config.auditing.SpringSecurityAuditorAware;
import com.pelosi.task.domain.User;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing(auditorAwareRef = "auditorAware")
public class TaskApplication {

	@Bean
	public AuditorAware<User> auditorAware(){
		return new SpringSecurityAuditorAware();
	}

	public static void main(String[] args) {
		SpringApplication.run(TaskApplication.class, args);
	}

}
