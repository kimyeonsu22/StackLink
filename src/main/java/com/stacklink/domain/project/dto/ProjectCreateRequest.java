package com.stacklink.domain.project.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Getter
@Setter
public class ProjectCreateRequest {

    private String projectname;

    private String content;

    private String projectCategory;

    private String projectType;

    private Integer recruitCount;

    private LocalDateTime deadlineAt;

    private LocalDateTime projectStartDate;

    private LocalDateTime projectEndDate;

    private Map<String, String> techStack;


    // !!! 필요한 기술 스택 담아야 함 !!!!
    private List<String> techNames;
}