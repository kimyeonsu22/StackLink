package com.stacklink.service;

import com.stacklink.entity.ProjectFavorite;
import com.stacklink.entity.ProjectFavoriteId;
import com.stacklink.repository.ProjectFavoriteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class ProjectFavoriteService {
    private final ProjectFavoriteService projectFavoriteService;
    private final ProjectFavoriteRepository projectFavoriteRepository;

    public boolean toggleFavorite(Long projectId, Long userId) {
        ProjectFavoriteId id = new ProjectFavoriteId(projectId, userId);

        if(projectFavoriteRepository.existsById(id)) {
            projectFavoriteRepository.deleteById(id);
            return false;
        }

        ProjectFavorite favorite = ProjectFavorite.builder().id(id).build();
        return true;
    }
}
