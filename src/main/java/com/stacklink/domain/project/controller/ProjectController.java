package com.stacklink.domain.project.controller;

import com.stacklink.domain.project.dto.ProjectCreateRequest;
import com.stacklink.domain.project.dto.ProjectResponse;
import com.stacklink.domain.project.dto.ProjectUpdateRequest;
import com.stacklink.domain.project.entity.Project;
import com.stacklink.domain.project.entity.ProjectTech;
import com.stacklink.domain.project.entity.Tech;
import com.stacklink.domain.project.service.ProjectService;
import com.stacklink.domain.project.service.ProjectTechService;
import com.stacklink.domain.project.service.TechService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectService projectService;
    private final TechService techService;
    private final ProjectTechService projectTechService;

    @PostMapping
    public Long create(
            Authentication authentication,
            @RequestBody ProjectCreateRequest request
    ) {
        Long userId = Long.valueOf(authentication.getName());
        // 1. 기술 스택 이름을 통해 해당 기술 id 값 검색(select id from tech where tech_name = "JAVA" 등)
        Map<String, String> techStack = request.getTechStack();
        Object[] techKeySet = techStack.keySet().toArray(); // key 값 배열

        Tech [] techs = new Tech[techKeySet.length]; // tech_name 을 통한 tech id 값 확보
        for (int i = 0; i < techKeySet.length; i++) {
            techs[i] = techService.findByTechName((String)techKeySet[i]).get();
        }

        System.out.println(Arrays.stream(techs).map(Tech::getId).toList()); // id 값 확인
        // 2. 프로젝트 저장 및 프로젝트 id 값 반환
        Long projectId = projectService.createProject(userId, request);

        // 3. 기술 스택 id 값 리스트(기술 스택 여러개), 프로젝트 id 값 활용 project_tech 테이블에 데이터 저장
        for (int i = 0; i < techs.length; i++) {
            ProjectTech pt = ProjectTech.builder()
                    .tech(techs[i])
                    .project(Project.builder().id(projectId).build())
                    .careerDetail(techStack.get(techKeySet[i]))
                    .build();
            projectTechService.insertProjectTech(pt);
        }

        return projectId;
    }

    @GetMapping
    public List<ProjectResponse> getProjects() {
        return projectService.getProjects();
    }

    @GetMapping("/{projectId}")
    public ProjectResponse get(
            @PathVariable Long projectId
    ) {
        return projectService.getProject(projectId);
    }

    @PutMapping("/{projectId}")
    public void update(
            @PathVariable Long projectId,
            @RequestBody ProjectUpdateRequest request
    ) {
        projectService.updateProject(projectId, request);
    }

    // 프로젝트 마감
    @PatchMapping("/{projectId}/close")
    public ResponseEntity<String> close(Authentication authentication, @PathVariable Long projectId) {
        Long userId = Long.valueOf(authentication.getName());
        try {
            projectService.closeProject(userId, projectId);
            return ResponseEntity.ok("공고가 마감되었습니다.");
        } catch (IllegalStateException e) {
            return ResponseEntity.status(403).body(e.getMessage());
        }
    }

    @DeleteMapping("/{projectId}")
    public void delete(
            @PathVariable Long projectId
    ) {
        projectService.deleteProject(projectId);
    }

    // 내가 올린 공고 목록
    // 일단 jwt 토큰 방식 인증 방식으로 수정
    @GetMapping("/my")
    public ResponseEntity<List<ProjectResponse>> getMyProjects(Authentication authentication) {
        Long userId = Long.valueOf(authentication.getName());
        return ResponseEntity.ok(projectService.getMyProjects(userId));
    }

    // 핫한 공고 Top 5 (좋아요 * 2 + 지원자 수 * 5로 도출)
    @GetMapping("/top5")
    public List<ProjectResponse> getTop5Projects() {
        return projectService.getHotProjects();
    }

    // 공개 통계 (전체 공고수, 모집중, 지원자 수, 매칭률)
    @GetMapping("/stats")
    public Map<String, Object> getStats() {
        return projectService.getStats();
    }
}