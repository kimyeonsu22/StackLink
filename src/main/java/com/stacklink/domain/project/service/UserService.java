package com.stacklink.domain.project.service;

import com.stacklink.domain.project.dto.UserResponse;
import com.stacklink.domain.project.entity.User;
import com.stacklink.domain.project.repository.UserFollowRepository;
import com.stacklink.domain.project.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserFollowRepository userFollowRepository;

    // 마이페이지에서 내 정보 읽어오기 위해 만든 서비스
    @Transactional(readOnly = true)
    public UserResponse getMyProfile(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("유저 없음"));

        long followerCount = userFollowRepository.countByFollowing_Id(userId);
        long followingCount = userFollowRepository.countByFollower_Id(userId);

        return UserResponse.of(user, followerCount, followingCount);
    }
}
