package com.pelosi.task.service.serviceImpl;

import com.google.common.base.Charsets;
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
import net.bytebuddy.utility.RandomString;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.*;
import java.util.List;
import java.util.Optional;

import com.google.common.io.Files;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserDetailsService, CustomUserService {

    private final @NonNull UserRepository userRepository;
    private final @NonNull JwtUtil jwtUtil;
    private final @NonNull JavaMailSender mailSender;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<User> opUser = userRepository.findByEmail(email);

        if (opUser.isPresent()){
            return opUser.get();
        }else {
            throw new UserNotFoundExeception("Usuário não encontrado");
        }
    }


    public RegisterResponse createUser(RegisterRequest registerRequest, String siteURL)
            throws IOException, MessagingException {
        if (registerRequest.getPassword().isEmpty() ||
        registerRequest.getPassword().isBlank()){
            throw new IllegalArgumentException("Senha não pode estar vazia!");
        }
        String randomCode = RandomString.make(64);
        User userToBeSaved = User.builder().id(null)
                .email(registerRequest.getEmail())
                .password(new BCryptPasswordEncoder().encode(registerRequest.getPassword()))
                .roles(List.of(Role.ROLE_USER))
                .firstName(registerRequest.getFirstName())
                .lastName(registerRequest.getLastName())
                .enabled(false)
                .verificationCode(randomCode)
                .build();

        User savedUser =  userRepository.save(userToBeSaved);

        sendVerificationEmail(userToBeSaved, siteURL);
        return RegisterResponse.builder()
                .id(savedUser.getId())
                .email(savedUser.getEmail())
                .firstName(savedUser.getFirstName())
                .lastName(savedUser.getLastName())
                .roles(savedUser.getRoles())
                .build();
    }


    public User getCurrentUser(){
        return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    private void sendVerificationEmail(User user, String siteURL)
            throws MessagingException, IOException {
        String toAddress = user.getEmail();
        String fromAddress = user.getEmail();
        String senderName = "pelosi.todo.app@gmail.com";
        String subject = "Ativar conta To-do list";

        Resource resource = new ClassPathResource("templates/emailContent.html");

        File file = resource.getFile();

        String content = Files.toString(file, Charsets.UTF_8);

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom(fromAddress, senderName);
        helper.setTo(toAddress);
        helper.setSubject(subject);

        content = content.replace("[[name]]", user.getFirstName());
        String verifyURL = siteURL + "/auth/verify/" + user.getVerificationCode();

        content = content.replace("[[URL]]", verifyURL);

        helper.setText(content, true);

        mailSender.send(message);

    }

    public boolean verify(String verificationCode) {
        User user = userRepository.findByVerificationCode(verificationCode);

        if (user == null || user.isEnabled()) {
            return false;
        } else {
            user.setVerificationCode(null);
            user.setEnabled(true);
            userRepository.save(user);

            return true;
        }

    }

}
