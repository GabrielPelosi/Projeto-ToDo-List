package com.pelosi.task.service;

import com.pelosi.task.model.RegisterRequest;
import com.pelosi.task.model.RegisterResponse;

public interface CustomUserService {

    RegisterResponse createUser(RegisterRequest registerRequest);
}
