package com.pelosi.task.validation;

import com.pelosi.task.domain.Task;
import com.pelosi.task.exception.UserNotAllowExecption;
import com.pelosi.task.service.serviceImpl.UserServiceImpl;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TaskUserValidator {

    private final @NonNull UserServiceImpl userService;


    public void validateTaskUser(Task task){
        String currentLoggedEmail = userService.getCurrentUser().getEmail();

         if(!task.getCreatedBy().getEmail().equals(currentLoggedEmail))
             throw new UserNotAllowExecption("Usuário não autorizado!");
    }
}
