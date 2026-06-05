package com.stacklink.domain.project.repository;

import com.stacklink.domain.project.entity.Career;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CareerRepository extends JpaRepository<Career, Long> {
    Optional<Career> findByCareerDetail(String careerDetail);
}
