package com.stacklink.domain.project.service;

import com.stacklink.domain.project.dto.AdminUserResponse;
import com.stacklink.domain.project.dto.PageResponse;
import com.stacklink.domain.project.entity.Role;
import com.stacklink.domain.project.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AdminUserService {

    private final UserRepository userRepository;

    public PageResponse<AdminUserResponse> getUsers(String keyword, String filter, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        Boolean isDeleted = switch (filter == null ? "" : filter) {
            case "deleted" -> true;
            case "active"  -> false;
            default        -> null;
        };
        String kw = (keyword == null || keyword.isBlank()) ? null : keyword.trim();
        return PageResponse.of(
                userRepository.searchUsers(kw, isDeleted, pageable).map(AdminUserResponse::fromEntity));
    }

    @Transactional
    public void banUser(Long id) {
        userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 회원입니다."));
        userRepository.softDeleteById(id);
    }

    @Transactional
    public void restoreUser(Long id) {
        userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 회원입니다."));
        userRepository.restoreById(id);
    }

    public Map<String, Long> getStats() {
        return Map.of(
                "total",   userRepository.count(),
                "active",  userRepository.countByIsDeleted(false),
                "deleted", userRepository.countByIsDeleted(true),
                "admins",  userRepository.countByRole(Role.ADMIN)
        );
    }
}