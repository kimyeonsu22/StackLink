package com.stacklink.domain.project.repository;

import com.stacklink.domain.project.entity.UserFollow;
import com.stacklink.domain.project.entity.UserFollowId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserFollowRepository extends JpaRepository<UserFollow, UserFollowId> {
    boolean existsByFollower_IdAndFollowing_Id(Long followerId, Long followingId);

    long countByFollower_Id(Long followerId);
    long countByFollowing_Id(Long followingId);

    List<UserFollow> findByFollower_Id(Long followerId);
    List<UserFollow> findByFollowing_Id(Long followingId);
}
