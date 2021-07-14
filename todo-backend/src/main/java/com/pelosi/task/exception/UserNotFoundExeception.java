package com.pelosi.task.exception;

import org.springframework.security.core.userdetails.UsernameNotFoundException;

public class UserNotFoundExeception extends UsernameNotFoundException {
    public UserNotFoundExeception(String msg) {
        super(msg);
    }
}
