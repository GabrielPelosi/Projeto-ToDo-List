package com.pelosi.task.service.serviceImpl;

import com.pelosi.task.config.security.JwtUtil;
import com.pelosi.task.domain.Role;
import com.pelosi.task.domain.User;
import com.pelosi.task.exception.UserNotFoundExeception;
import com.pelosi.task.model.RegisterRequest;
import com.pelosi.task.model.RegisterResponse;
import com.pelosi.task.repository.UserRepository;
import com.pelosi.task.service.CustomUserService;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserDetailsService, CustomUserService {

    private final @NonNull UserRepository userRepository;
    private final @NonNull JwtUtil jwtUtil;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<User> opUser = userRepository.findByEmail(email);

        if (opUser.isPresent()){
            return opUser.get();
        }else {
            throw new UserNotFoundExeception("Usuário não encontrado");
        }
    }


    public RegisterResponse createUser(RegisterRequest registerRequest){
        if (registerRequest.getPassword().isEmpty() ||
        registerRequest.getPassword().isBlank()){
            throw new IllegalArgumentException("Senha não pode estar vazia!");
        }
        User savedUser =  userRepository.save(
                User.builder().id(null)
                        .email(registerRequest.getEmail())
                        .password(new BCryptPasswordEncoder().encode(registerRequest.getPassword()))
                        .roles(List.of(Role.ROLE_USER))
                        .firstName(registerRequest.getFirstName())
                        .lastName(registerRequest.getLastName())
                        .build()
        );

        return RegisterResponse.builder()
                .id(savedUser.getId())
                .token(jwtUtil.generateToken(savedUser.getEmail()))
                .email(savedUser.getEmail())
                .firstName(savedUser.getFirstName())
                .lastName(savedUser.getLastName())
                .roles(savedUser.getRoles())
                .build();
    }


    public User getCurrentUser(){
        return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }
}
