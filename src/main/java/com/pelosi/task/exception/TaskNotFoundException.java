package com.pelosi.task.exception;

import javassist.NotFoundException;

public class TaskNotFoundException extends NotFoundException {
    public TaskNotFoundException(String msg) {
        super(msg);
    }
}
