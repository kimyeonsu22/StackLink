package com.stacklink.domain.project.repository;

import com.stacklink.domain.project.entity.TechProjects;
import com.stacklink.domain.project.entity.TechProjectsId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

// 기술_프로젝트 레포지토리
public interface TechProjectsRepository extends JpaRepository<TechProjects, TechProjectsId> {

    List<TechProjects> findByProject_Id(Long projectId);

    void deleteByProject_Id(Long projectId);
}
