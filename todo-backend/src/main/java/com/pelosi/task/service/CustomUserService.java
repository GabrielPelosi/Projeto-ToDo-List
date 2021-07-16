package com.pelosi.task.service;

import com.pelosi.task.model.RegisterRequest;
import com.pelosi.task.model.RegisterResponse;

import javax.mail.MessagingException;
import java.io.IOException;
import java.io.UnsupportedEncodingException;

public interface CustomUserService {

    RegisterResponse createUser(RegisterRequest registerRequest, String siteURL)
            throws IOException, MessagingException;
}
