package com.stacklink.domain.user.repository;

import com.stacklink.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    /** 로그인/중복 검증용 username 조회 */
    Optional<User> findByUsername(String username);

    /** 이메일 중복 검증 및 소셜 로그인 매칭용 조회 */
    Optional<User> findByEmail(String email);

    /** 닉네임 중복 검증 */
    boolean existsByNickname(String nickname);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);
}