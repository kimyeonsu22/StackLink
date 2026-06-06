package com.stacklink.domain.project.repository;

import com.stacklink.domain.project.entity.ProjectTech;
import com.stacklink.domain.project.entity.ProjectTechId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectTechRepository extends JpaRepository<ProjectTech, ProjectTechId> {


}
