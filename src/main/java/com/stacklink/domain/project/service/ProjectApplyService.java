package com.stacklink.domain.project.service;


import com.stacklink.dto.ApplyRequest;
import com.stacklink.domain.project.entity.Project;
import com.stacklink.entity.ProjectApply;
import com.stacklink.entity.ProjectApplyId;
import com.stacklink.repository.ProjectApplyRepository;
import com.stacklink.domain.project.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class ProjectApplyService {
    private final ProjectApplyRepository projectApplyRepository;
    private final ProjectRepository projectRepository;

    @Autowired
    public ProjectApplyService(ProjectApplyRepository projectApplyRepository, ProjectRepository projectRepository){
        this.projectApplyRepository = projectApplyRepository;
        this.projectRepository = projectRepository;
    }

    @Transactional
    public void applyProject(Long userId, Long projectId, ApplyRequest req) {
        // 공고 존재 확인
        Project project = projectRepository.findById(projectId).orElseThrow(() -> new IllegalArgumentException("해당 공고가 존재하지 않습니다."));

        // 현재 모집 중인지 확인
        if(project.isClosed()){
            throw new IllegalStateException("모집이 마감된 공고입니다.");
        }

        ProjectApplyId projectApplyId = new ProjectApplyId(userId, projectId);

        boolean exists = projectApplyRepository.existsById(projectApplyId);

        // 중복 지원 불가
        if(exists){
            throw new IllegalStateException("이미 해당 공고에 지원했습니다.");
        }

        // 지원서작성
        ProjectApply apply = new ProjectApply();
        apply.setId(projectApplyId);
        apply.setStatus("APPLIED");
        apply.setApplyAt(LocalDateTime.now());
        apply.setContent(req.getContent());
        apply.setPosition(req.getPosition());

        projectApplyRepository.save(apply);
    }

    @Transactional
    public void cancelApply(Long userId, Long projectId, ApplyRequest req) {
        ProjectApplyId applyId = new ProjectApplyId(userId, projectId);
        ProjectApply apply = projectApplyRepository.findById(projectId).orElseThrow(
                () -> new IllegalArgumentException("지원 내역이 없습니다."));

        apply.setDeleted(true);

        projectApplyRepository.save(apply);
    }
}
