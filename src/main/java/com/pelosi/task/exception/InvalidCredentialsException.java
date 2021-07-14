package com.pelosi.task.exception;

public class InvalidCredentialsException extends IllegalArgumentException{
    public InvalidCredentialsException(String s) {
        super(s);
    }
}
