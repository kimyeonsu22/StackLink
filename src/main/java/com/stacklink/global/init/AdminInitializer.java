package com.stacklink.global.init;

import com.stacklink.domain.project.entity.*;
import com.stacklink.domain.project.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AdminInitializer implements ApplicationRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${admin.email}")    private String adminEmail;
    @Value("${admin.password}") private String adminPassword;

    /** 서버 시작 시 관리자 계정이 없으면 1개 생성 (이미 있으면 skip) */
    @Override
    public void run(ApplicationArguments args) {
        if (userRepository.existsByEmail(adminEmail)) return;

        User admin = User.builder()
                .username("관리자")
                .password(passwordEncoder.encode(adminPassword))
                .nickname("admin")
                .email(adminEmail)
                .phoneNumber("000-0000-0000")
                .role(Role.ADMIN)
                .build();
        userRepository.save(admin);
    }
}