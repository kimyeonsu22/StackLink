package com.stacklink.domain.project.service;

import com.stacklink.domain.project.dto.UserResponse;
import com.stacklink.domain.project.dto.UserUpdateRequest;
import com.stacklink.domain.project.entity.Career;
import com.stacklink.domain.project.entity.Tech;
import com.stacklink.domain.project.entity.TechUsers;
import com.stacklink.domain.project.entity.User;
import com.stacklink.domain.project.repository.CareerRepository;
import com.stacklink.domain.project.repository.TechRepository;
import com.stacklink.domain.project.repository.TechUsersRepository;
import com.stacklink.domain.project.repository.UserFollowRepository;
import com.stacklink.domain.project.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserFollowRepository userFollowRepository;
    private final TechUsersRepository techUsersRepository;
    private final TechRepository techRepository;
    private final CareerRepository careerRepository;
    private final PasswordEncoder passwordEncoder;

    // 마이페이지에서 내 정보 읽어오기 위해 만든 서비스
    @Transactional(readOnly = true)
    public UserResponse getMyProfile(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("유저 없음"));

        long followerCount = userFollowRepository.countByFollowing_Id(userId);
        long followingCount = userFollowRepository.countByFollower_Id(userId);

        // { techName: careerDetail } 형태로 변환
        Map<String, String> techStack = techUsersRepository.findByUser_Id(userId)
                .stream()
                .collect(Collectors.toMap(
                        tu -> tu.getTech().getTechName(),
                        tu -> tu.getCareer().getCareerDetail()
                ));

        return UserResponse.of(user, followerCount, followingCount, techStack);
    }

    // 회원정보 수정
    @Transactional
    public void updateMyProfile(Long userId, UserUpdateRequest req) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("유저 없음"));

        // 기본 정보 수정
        user.updateProfile(req.getUsername(), req.getNickname(), req.getPhoneNumber(), req.getPosition());

        // 비밀번호 변경 (입력한 경우만)
        if (StringUtils.hasText(req.getPassword())) {
            user.updatePassword(passwordEncoder.encode(req.getPassword()));
        }

        // 기술스택 수정 (기존 삭제 후 재삽입)
        techUsersRepository.deleteByUser_Id(userId);

        if (req.getTechStack() != null) {
            for (Map.Entry<String, String> entry : req.getTechStack().entrySet()) {
                Tech tech = techRepository.findByTechName(entry.getKey())
                        .orElseThrow(() -> new RuntimeException("기술스택 없음: " + entry.getKey()));
                Career career = careerRepository.findByCareerDetail(entry.getValue())
                        .orElseThrow(() -> new RuntimeException("경력 없음: " + entry.getValue()));
                techUsersRepository.save(new TechUsers(user, tech, career));
            }
        }
    }

    // 닉네임 중복 확인
    @Transactional(readOnly = true)
    public boolean isNicknameAvailable(String nickname) {
        return !userRepository.existsByNickname(nickname);
    }

    // 전화번호 중복 확인
    @Transactional(readOnly = true)
    public boolean isPhoneNumberAvailable(String phoneNumber) {
        return !userRepository.existsByPhoneNumber(phoneNumber);
    }
}
