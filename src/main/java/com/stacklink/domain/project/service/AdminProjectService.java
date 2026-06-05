package com.stacklink.domain.project.service;

import com.stacklink.domain.project.dto.AdminProjectResponse;
import com.stacklink.domain.project.dto.PageResponse;
import com.stacklink.domain.project.enums.ApplicationStatus;
import com.stacklink.domain.project.repository.ProjectApplyRepository;
import com.stacklink.domain.project.repository.ProjectRepository;
import com.stacklink.domain.project.repository.TechProjectsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AdminProjectService {

    private final ProjectRepository projectRepository;
    private final TechProjectsRepository techProjectsRepository;
    private final ProjectApplyRepository projectApplyRepository;

    public PageResponse<AdminProjectResponse> getProjects(String keyword, String filter, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        Boolean isDeleted = null;
        Boolean isClosed  = null;
        switch (filter == null ? "" : filter) {
            case "deleted" -> isDeleted = true;
            case "closed"  -> { isDeleted = false; isClosed = true; }
            case "active"  -> { isDeleted = false; isClosed = false; }
        }
        String kw = (keyword == null || keyword.isBlank()) ? null : keyword.trim();
        return PageResponse.of(
                projectRepository.searchProjects(kw, isDeleted, isClosed, pageable)
                        .map(p -> AdminProjectResponse.fromEntity(
                                p,
                                techProjectsRepository.findByProject_Id(p.getId()),
                                projectApplyRepository.countByIdProjectIdAndStatusNot(p.getId(), ApplicationStatus.REJECTED)
                        )));
    }

    @Transactional
    public void deleteProject(Long id) {
        projectRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 공고입니다."));
        projectRepository.softDeleteById(id);
    }

    public Map<String, Long> getStats() {
        return Map.of(
                "total",   projectRepository.count(),
                "active",  projectRepository.countByIsDeleted(false),
                "deleted", projectRepository.countByIsDeleted(true),
                "closed",  projectRepository.countByIsClosed(true)
        );
    }
}