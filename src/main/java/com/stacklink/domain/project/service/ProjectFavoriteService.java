package com.stacklink.domain.project.service;

import com.stacklink.domain.project.dto.FavoriteProjectResponse;
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
        ProjectFavoriteId id = new ProjectFavoriteId(userId, projectId);
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("공고 없음"));

        if(projectFavoriteRepository.existsById(id)) {
            projectFavoriteRepository.deleteById(id);
            project.setFavoriteCount(project.getFavoriteCount() - 1);
            return false;
        }

        User user = userRepository.getReferenceById(userId);
        ProjectFavorite favorite = new ProjectFavorite(user, project);
        projectFavoriteRepository.save(favorite);
        project.setFavoriteCount(project.getFavoriteCount() + 1);
        return true;
    }

    // 마이페이지에서 유저가 좋아요한 공고 보여주기 위해
    public List<FavoriteProjectResponse> getFavorite(Long userId) {
        return projectFavoriteRepository.findByUser_Id(userId)
                .stream()
                .map(FavoriteProjectResponse::from)
                .toList();
    }
}