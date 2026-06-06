package com.stacklink.domain.project.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class ProjectUpdateRequest {

    private String projectname;

    private String content;

    private String projectCategory;

    private String projectType;

    private Integer recruitCount;

    private LocalDateTime deadlineAt;

    private LocalDateTime projectStartDate;

    private LocalDateTime projectEndDate;

    private List<String> techNames;
}