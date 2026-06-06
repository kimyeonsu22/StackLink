package com.stacklink.domain.project.service;

import com.stacklink.domain.project.entity.ProjectTech;
import com.stacklink.domain.project.entity.ProjectTechId;
import com.stacklink.domain.project.repository.ProjectTechRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class ProjectTechService {

    private final ProjectTechRepository projectTechRepository;

    public ProjectTechId insertProjectTech(ProjectTech projectTech){
        return projectTechRepository.save(projectTech).getId();
    }

}
