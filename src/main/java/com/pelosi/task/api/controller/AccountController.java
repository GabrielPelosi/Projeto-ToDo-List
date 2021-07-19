package com.pelosi.task.api.controller;

import com.pelosi.task.service.serviceImpl.UserServiceImpl;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
@RequiredArgsConstructor
public class AccountController {

    private final @NonNull UserServiceImpl userService;


    @GetMapping("/auth/verify/{code}")
    public String verifyUser(@PathVariable String code) {
        if (userService.verify(code)) {
            return "verify_success";
        } else {
            return "verify_fail";
        }
    }


}
