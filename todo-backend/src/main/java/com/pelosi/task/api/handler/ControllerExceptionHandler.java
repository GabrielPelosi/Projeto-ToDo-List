package com.pelosi.task.api.handler;


import com.pelosi.task.exception.InvalidCredentialsException;
import com.pelosi.task.exception.TaskNotFoundException;
import com.pelosi.task.exception.UserNotAllowExecption;
import com.pelosi.task.exception.UserNotFoundExeception;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class ControllerExceptionHandler {

    @ExceptionHandler(InvalidCredentialsException.class)
    public ResponseEntity<?> handleInvalidCredentialException(InvalidCredentialsException ex) {
        return ResponseEntity.badRequest().body(ex.getMessage());
    }

    @ResponseStatus(value = HttpStatus.NOT_FOUND,reason = "Task not found")
    @ExceptionHandler(TaskNotFoundException.class)
    public void handleTaskNotFound(TaskNotFoundException ex) {
    }


    @ResponseStatus(value = HttpStatus.NOT_FOUND,reason = "User not found, email does not exists")
    @ExceptionHandler(UserNotFoundExeception.class)
    public ResponseEntity<?> handleUserNotFound(UserNotFoundExeception ex) {
        return ResponseEntity.badRequest().body(ex.getMessage());
    }


    @ExceptionHandler(UserNotAllowExecption.class)
    public ResponseEntity<?> handleUserNotAllow(UserNotAllowExecption ex) {
        return ResponseEntity.badRequest().body(ex.getMessage());
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<?> handleDataIntegrityViolationException(DataIntegrityViolationException ex){
        return ResponseEntity.badRequest().body("Email já utilizado!");
    }
}
