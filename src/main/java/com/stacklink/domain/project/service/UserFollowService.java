package com.stacklink.domain.project.service;

import com.stacklink.domain.project.dto.FollowUserResponse;
import com.stacklink.domain.project.entity.User;
import com.stacklink.domain.project.entity.UserFollow;
import com.stacklink.domain.project.entity.UserFollowId;
import com.stacklink.domain.project.repository.UserFollowRepository;
import com.stacklink.domain.project.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UserFollowService {
    private final UserFollowRepository userFollowRepository;
    private final UserRepository userRepository;

    public UserFollowService(UserFollowRepository userFollowRepository, UserRepository userRepository) {
        this.userFollowRepository = userFollowRepository;
        this.userRepository = userRepository;
    }

    // 하나의 버튼으로 팔로우 <-> 언팔로우 진행
    @Transactional
    public boolean toggleFollow(Long followerId, Long followingId) {
        UserFollowId id = new UserFollowId(followerId, followingId);

        // 이미 팔로우의 경우 언팔로우 진행
        if (userFollowRepository.existsById(id)) {
            userFollowRepository.deleteById(id);
            return false;
        }

        if (followerId.equals(followingId)) {
            throw new IllegalArgumentException("자기 자신은 팔로우할 수 없습니다.");
        }

        User follower = userRepository.getReferenceById(followerId);
        User following = userRepository.getReferenceById(followingId);

        userFollowRepository.save(new UserFollow(follower, following));

        return true;
    }

    // 내가 팔로우하는 사람 조회
    // (마이 페이지 팔로우 리스트 출력 관련하여 수정함)
    @Transactional(readOnly = true)
    public List<FollowUserResponse> getFollowingList(Long userId){
        return userFollowRepository.findByFollower_Id(userId)
                .stream()
                .map(follow -> new FollowUserResponse(
                        follow.getFollowing().getId(),
                        follow.getFollowing().getNickname(),
                        follow.getFollowing().getPosition()
                )).toList();
    }

    // 나를 팔로우하는 사람 조회
    // (마이 페이지 팔로우 리스트 출력 관련하여 수정함)
    @Transactional(readOnly = true)
    public List<FollowUserResponse> getFollowerList(Long userId){
        return userFollowRepository.findByFollowing_Id(userId)
                .stream()
                .map(follow -> new FollowUserResponse(
                        follow.getFollower().getId(),
                        follow.getFollower().getNickname(),
                        follow.getFollower().getPosition()
                )).toList();
    }

}
