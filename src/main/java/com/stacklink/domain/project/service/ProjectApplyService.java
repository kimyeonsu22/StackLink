package com.stacklink.domain.project.service;


import com.stacklink.domain.project.dto.ApplyRequest;
import com.stacklink.domain.project.dto.MyApplyResponse;
import com.stacklink.domain.project.dto.ProjectApplyResponse;
import com.stacklink.domain.project.entity.*;
import com.stacklink.domain.project.enums.ApplicationStatus;
import com.stacklink.domain.project.repository.ProjectApplyRepository;
import com.stacklink.domain.project.repository.ProjectMemberRepository;
import com.stacklink.domain.project.repository.ProjectRepository;
import com.stacklink.domain.project.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ProjectApplyService {
    private final ProjectApplyRepository projectApplyRepository;
    private final ProjectRepository projectRepository;
    private final ProjectMemberRepository projectMemberRepository;
    private final UserRepository userRepository;

    @Autowired
    public ProjectApplyService(ProjectApplyRepository projectApplyRepository, ProjectRepository projectRepository, ProjectMemberRepository projectMemberRepository, UserRepository userRepository) {
        this.projectApplyRepository = projectApplyRepository;
        this.projectRepository = projectRepository;
        this.projectMemberRepository = projectMemberRepository;
        this.userRepository = userRepository;
    }

    // 공고 지원
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
        apply.setStatus(ApplicationStatus.APPLIED);
        apply.setApplyAt(LocalDateTime.now());
        apply.setContent(req.getContent());
        apply.setPosition(req.getPosition());

        projectApplyRepository.save(apply);
    }

    // 지원 취소
    @Transactional
    public void cancelApply(Long userId, Long projectId) {
        ProjectApplyId applyId = new ProjectApplyId(userId, projectId);
        ProjectApply apply = projectApplyRepository.findById(applyId).orElseThrow(
                () -> new IllegalArgumentException("지원 내역이 없습니다."));

        projectApplyRepository.delete(apply);
    }

    // 마이페이지에서 내가 지원한 공고 목록 조회
    @Transactional(readOnly = true)
    public List<MyApplyResponse> getMyApplies(Long userId) {
        return projectApplyRepository.findByIdUserId(userId)
                .stream()
                .map(MyApplyResponse::from)
                .toList();
    }

    // 지원자 확인
    @Transactional(readOnly = true)
    public List<ProjectApplyResponse> getApplicants(Long projectId) {
        List<ProjectApply> applies = projectApplyRepository.findByIdProjectId(projectId);
        return applies.stream().map(ProjectApplyResponse::from).toList();
    }

    // 지원자 중 팀원 선택
    @Transactional
    public void acceptApplicant(Long userId, Long projectId, Long loginUserId) {
        Project project = projectRepository.findById(projectId).orElseThrow(() -> new IllegalArgumentException("프로젝트가 없습니다."));

        User loginUser = userRepository.findById(loginUserId).orElseThrow(() -> new IllegalArgumentException("사용자가 없습니다."));

        if(!project.getAuthor().equals(loginUser)){
            throw new IllegalStateException("프로젝트 작성자만 선택할 수 있습니다.");
        }

        ProjectApplyId applyId = new ProjectApplyId(userId, projectId);

        ProjectApply apply = projectApplyRepository.findById(applyId).orElseThrow(() -> new IllegalArgumentException("지원 내역이 없습니다."));

        if(projectMemberRepository.existsByProjectIdAndUserId(projectId, userId)){
            throw new IllegalArgumentException("이미 팀원입니다.");
        }

        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("사용자가 없습니다."));

        ProjectMember member = ProjectMember.builder()
                .project(project)
                .user(user)
                .joinedAt(LocalDateTime.now())
                .build();

        projectMemberRepository.save(member);

        apply.setStatus(ApplicationStatus.ACCEPTED);
    }
}
