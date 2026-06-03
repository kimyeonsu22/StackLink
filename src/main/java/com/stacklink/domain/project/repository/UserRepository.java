package com.stacklink.domain.project.repository;

import com.stacklink.domain.project.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

import com.stacklink.domain.project.entity.Role;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User, Long> {

    /** 로그인/중복 검증용 username 조회 */
    Optional<User> findByUsername(String username);

    /** 이메일 중복 검증 및 소셜 로그인 매칭용 조회 */
    Optional<User> findByEmail(String email);

    /** 닉네임 중복 검증 */
    boolean existsByNickname(String nickname);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

    @Query("""
    SELECT u FROM User u
    WHERE (:keyword IS NULL OR u.nickname LIKE %:keyword%
           OR u.email LIKE %:keyword%
           OR u.username LIKE %:keyword%)
    AND   (:isDeleted IS NULL OR u.isDeleted = :isDeleted)
    ORDER BY u.createdAt DESC
""")
    Page<User> searchUsers(
            @Param("keyword")   String keyword,
            @Param("isDeleted") Boolean isDeleted,
            Pageable pageable
    );

    @Modifying
    @Query("UPDATE User u SET u.isDeleted = true, u.updatedAt = CURRENT_TIMESTAMP WHERE u.id = :id")
    void softDeleteById(@Param("id") Long id);

    @Modifying
    @Query("UPDATE User u SET u.isDeleted = false, u.updatedAt = CURRENT_TIMESTAMP WHERE u.id = :id")
    void restoreById(@Param("id") Long id);

    long countByIsDeleted(boolean isDeleted);
    long countByRole(Role role);
}