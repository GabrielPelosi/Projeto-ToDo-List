package com.pelosi.task.api.controller;


import com.pelosi.task.config.security.JwtUtil;
import com.pelosi.task.exception.InvalidCredentialsException;
import com.pelosi.task.model.AuthRequest;
import com.pelosi.task.model.AuthResponse;
import com.pelosi.task.model.RegisterRequest;
import com.pelosi.task.model.RegisterResponse;
import com.pelosi.task.service.serviceImpl.UserServiceImpl;
import io.jsonwebtoken.impl.DefaultClaims;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/auth")
public class UserController {


    private final @NonNull UserServiceImpl userService;
    private final @NonNull AuthenticationManager authenticationManager;
    private final @NonNull JwtUtil jwtUtil;



    @PostMapping(value = "/register")
    public ResponseEntity<RegisterResponse> registerNewUser(@RequestBody RegisterRequest registerRequest,
                                                            HttpServletRequest request)
            throws UnsupportedEncodingException, MessagingException {

        String siteURL = request.getRequestURL().toString();
        String site = siteURL.replace(request.getServletPath(), "");
        return ResponseEntity.ok(userService.createUser(registerRequest, site));

    }

    @PostMapping(value = "/login")
    public ResponseEntity<AuthResponse> loginUser(@RequestBody AuthRequest authRequest){
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword())
            );
        } catch (Exception ex) {
            throw new InvalidCredentialsException("inavalid username/password");
        }

        return ResponseEntity.ok(AuthResponse.builder()
                .jwtToken(jwtUtil.generateToken(authRequest.getEmail()))
                .build());
    }

    @GetMapping(value = "/refresh-token")
    public ResponseEntity<?> refreshtoken(HttpServletRequest request) {
        // From the HttpRequest get the claims
        DefaultClaims claims = (io.jsonwebtoken.impl.DefaultClaims) request.getAttribute("claims");

        Map<String, Object> expectedMap = getMapFromIoJsonwebtokenClaims(claims);
        String token = jwtUtil.doGenerateRefreshToken(expectedMap, expectedMap.get("sub").toString());
        return ResponseEntity.ok(new AuthResponse(token));
    }

    public Map<String, Object> getMapFromIoJsonwebtokenClaims(DefaultClaims claims) {
        Map<String, Object> expectedMap = new HashMap<String, Object>();
        for (Map.Entry<String, Object> entry : claims.entrySet()) {
            expectedMap.put(entry.getKey(), entry.getValue());
        }
        return expectedMap;
    }



    @GetMapping("/verify/{code}")
    public String verifyUser(@PathVariable String code) {
        if (userService.verify(code)) {
            return "verify_success";
        } else {
            return "verify_fail";
        }
    }



}
