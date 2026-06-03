package com.stacklink.domain.project.service;

import com.stacklink.domain.project.entity.Project;
import com.stacklink.domain.project.entity.ProjectFavorite;
import com.stacklink.domain.project.entity.ProjectFavoriteId;
import com.stacklink.domain.project.entity.User;
import com.stacklink.domain.project.repository.ProjectFavoriteRepository;
import com.stacklink.domain.project.repository.ProjectRepository;
import com.stacklink.domain.project.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ProjectFavoriteService {
    private final ProjectFavoriteRepository projectFavoriteRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    public boolean toggleFavorite(Long projectId, Long userId) {
        ProjectFavoriteId id = new ProjectFavoriteId(projectId, userId);

        if(projectFavoriteRepository.existsById(id)) {
            projectFavoriteRepository.deleteById(id);
            return false;
        }

        User user = userRepository.getReferenceById(userId);
        Project project = projectRepository.getReferenceById(projectId);

        ProjectFavorite favorite = new ProjectFavorite(user, project);

        projectFavoriteRepository.save(favorite);
        return true;
    }

    public List<ProjectFavorite> getFavorite(Long userId) {
        return projectFavoriteRepository.findByUser_Id(userId);
    }
}