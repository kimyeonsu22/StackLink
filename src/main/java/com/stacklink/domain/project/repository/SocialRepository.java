package com.stacklink.domain.project.repository;

import com.stacklink.domain.project.entity.Social;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface SocialRepository extends JpaRepository<Social, Long> {

    /** 플랫폼명 + 플랫폼 고유ID로 기존 연동 회원 조회 */
    Optional<Social> findByPlatformAndPlatformId(String platform, String platformId);
}